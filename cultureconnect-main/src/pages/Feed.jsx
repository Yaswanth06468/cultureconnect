import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { API_BASE_URL } from '../config';

const Feed = () => {
    const [posts, setPosts] = useState([]);
    const [description, setDescription] = useState('');
    const [tag, setTag] = useState('');
    const [image, setImage] = useState(null);
    const [error, setError] = useState('');
    const [visibleComments, setVisibleComments] = useState({}); // { postId: [comments] }
    const [commentInputs, setCommentInputs] = useState({}); // { postId: "draft text" }
    const [events, setEvents] = useState([]);
    const navigate = useNavigate();

    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    const role = localStorage.getItem('role');

    useEffect(() => {
        fetchPosts();
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/api/events`);
            const data = await res.json();
            if (res.ok) {
                setEvents(data.slice(0, 3)); // Get top 3 upcoming
            }
        } catch (err) {
            console.error('Failed to fetch events');
        }
    };

    const fetchPosts = async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/api/posts`);
            const data = await res.json();
            if (res.ok) setPosts(data);
        } catch (err) {
            console.error('Failed to fetch posts');
        }
    };

    const handleLike = async (postId) => {
        if (!token) return navigate('/login');
        try {
            const res = await fetch(`${API_BASE_URL}/api/posts/${postId}/like`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                // Optimistically or explicitly refresh posts to get new like count
                fetchPosts();
            }
        } catch (err) {
            console.error('Failed to like post');
        }
    };

    const fetchComments = async (postId) => {
        try {
            const res = await fetch(`${API_BASE_URL}/api/posts/${postId}/comments`);
            const data = await res.json();
            if (res.ok) {
                setVisibleComments(prev => ({ ...prev, [postId]: data }));
            }
        } catch (err) {
            console.error('Failed to fetch comments');
        }
    };

    const handleCommentSubmit = async (e, postId) => {
        e.preventDefault();
        if (!token) return navigate('/login');

        const text = commentInputs[postId];
        if (!text) return;

        try {
            const res = await fetch(`${API_BASE_URL}/api/posts/${postId}/comments`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ text })
            });

            if (res.ok) {
                setCommentInputs(prev => ({ ...prev, [postId]: '' }));
                fetchComments(postId); // Refresh comments for this post
                fetchPosts(); // Refresh posts to update comment_count
            }
        } catch (err) {
            console.error('Failed to post comment');
        }
    };

    const handleDeletePost = async (postId) => {
        if (!window.confirm("Are you sure you want to delete this post?")) return;
        try {
            const res = await fetch(`${API_BASE_URL}/api/admin/posts/${postId}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                fetchPosts();
            } else {
                alert("Failed to delete post");
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleDeleteComment = async (commentId, postId) => {
        if (!window.confirm("Are you sure you want to delete this comment?")) return;
        try {
            const res = await fetch(`${API_BASE_URL}/api/admin/comments/${commentId}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                fetchComments(postId);
                fetchPosts();
            } else {
                alert("Failed to delete comment");
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handlePostSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!token) {
            navigate('/login');
            return;
        }

        if (!image || !description) {
            setError('Please provide an image and description');
            return;
        }

        const formData = new FormData();
        formData.append('image', image);
        formData.append('description', description);
        formData.append('tag', tag);

        try {
            const res = await fetch(`${API_BASE_URL}/api/posts`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });

            if (res.ok) {
                setDescription('');
                setTag('');
                setImage(null);
                document.getElementById('file-upload').value = '';
                fetchPosts(); // Refresh feed
            } else {
                const data = await res.json();
                setError(data.error || 'Failed to post');
            }
        } catch (err) {
            setError('Network error');
        }
    };

    return (
        <div className="min-h-screen pt-24 pb-12 theme-transition" style={{ backgroundColor: 'var(--theme-bg-primary)' }}>
        <div className="container mx-auto px-6 max-w-6xl">
            <h1 className="text-4xl font-serif font-bold text-text-primary mb-8 border-b-2 pb-4 theme-transition animate-slide-up-reveal" style={{ borderColor: 'var(--theme-border)' }}>
                <span>Cultural Feed</span>
            </h1>

            <div className="flex flex-col gap-10">
                {/* Main Feed Column */}
                <div className="w-full">
                    {/* Create Post Section */}
            {token ? (
                <div className="mb-12 p-6 border rounded-xl theme-transition" style={{ backgroundColor: 'var(--theme-card-bg)', borderColor: 'var(--theme-border)' }}>
                    <h2 className="text-2xl font-serif font-bold mb-4">Share Your Culture</h2>
                    {error && <p className="text-accent-terra font-bold mb-4">{error}</p>}

                    <form onSubmit={handlePostSubmit} className="flex flex-col gap-4">
                        <input
                            id="file-upload"
                            type="file"
                            accept="image/*"
                            onChange={(e) => setImage(e.target.files[0])}
                            className="p-2 border border-text-secondary theme-transition"
                            style={{ backgroundColor: 'var(--theme-input-bg)', color: 'var(--theme-text-primary)' }}
                        />
                        <textarea
                            placeholder="Describe your cultural moment..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="p-3 border border-text-secondary bg-bg-input text-text-primary min-h-[100px] theme-transition"
                        ></textarea>
                        <input
                            type="text"
                            placeholder="Tag (e.g., Food, Architecture, Dance)"
                            value={tag}
                            onChange={(e) => setTag(e.target.value)}
                            className="p-3 border border-text-secondary bg-bg-input text-text-primary theme-transition"
                        />
                        <button type="submit" className="self-start px-8 py-3 bg-btn text-btn font-bold hover:bg-accent-blue hover:text-white transition-all duration-300 theme-transition rounded-lg shadow-md">
                            Post
                        </button>
                    </form>
                </div>
            ) : (
                <div className="mb-12 p-6 border rounded-xl text-center theme-transition" style={{ backgroundColor: 'var(--theme-card-bg)', borderColor: 'var(--theme-border)' }}>
                    <p className="font-bold text-lg">Log in to share your own cultural moment.</p>
                </div>
            )}

            {/* Feed Section */}
            <div className="flex flex-col gap-12">
                {posts.length === 0 ? (
                    <p className="text-center text-text-secondary italic">No posts yet. Be the first to share!</p>
                ) : (
                    posts.map(post => (
                        <div key={post.id} className="border shadow-sm rounded-xl overflow-hidden theme-transition" style={{ backgroundColor: 'var(--theme-card-bg)', borderColor: 'var(--theme-border)' }}>
                            <div className="p-4 border-b flex justify-between items-center theme-transition" style={{ backgroundColor: 'var(--theme-bg-secondary)', borderColor: 'var(--theme-border)' }}>
                                <Link to={`/profile/${post.username}`} className="font-bold text-lg hover:text-accent-blue hover:underline">
                                    {post.username}
                                </Link>
                                <div className="flex items-center gap-4">
                                    <span className="text-xs text-text-muted">{new Date(post.created_at).toLocaleDateString()}</span>
                                    {role === 'admin' && (
                                        <button onClick={() => handleDeletePost(post.id)} className="text-xs font-bold text-accent-terra border border-accent-terra px-2 py-1 hover:bg-accent-terra hover:text-white transition-colors">
                                            Delete Post
                                        </button>
                                    )}
                                </div>
                            </div>
                            <img
                                src={post.image_url && post.image_url.startsWith('http') ? post.image_url : `${API_BASE_URL}${post.image_url}`}
                                alt={post.description}
                                className="w-full h-auto object-cover max-h-[600px] border-b border-black/10"
                            />
                            <div className="p-6">
                                <div className="inline-block px-3 py-1 mb-4 bg-accent-gold text-black text-xs font-bold uppercase border border-black">
                                    {post.tag}
                                </div>
                                <p className="text-text-primary leading-relaxed text-lg mb-6">
                                    {post.description}
                                </p>

                                {/* Social Actions */}
                                <div className="flex items-center gap-6 border-t border-black/10 pt-4">
                                    <button
                                        onClick={() => handleLike(post.id)}
                                        className="flex items-center gap-2 font-bold hover:text-accent-terra transition-colors"
                                    >
                                        <span>👍</span> {post.like_count || 0} Likes
                                    </button>
                                    <button
                                        onClick={() => fetchComments(post.id)}
                                        className="flex items-center gap-2 font-bold hover:text-accent-blue transition-colors"
                                    >
                                        <span>💬</span> {post.comment_count || 0} Comments
                                    </button>
                                </div>

                                {/* Comments Section */}
                                {visibleComments[post.id] && (
                                    <div className="mt-6 border-t pt-4 p-4 rounded-lg theme-transition" style={{ backgroundColor: 'var(--theme-bg-secondary)', borderColor: 'var(--theme-border)' }}>
                                        <div className="flex flex-col gap-3 mb-4 max-h-48 overflow-y-auto">
                                            {visibleComments[post.id].length === 0 ? (
                                                <p className="text-sm text-text-muted italic">No comments yet.</p>
                                            ) : (
                                                visibleComments[post.id].map(c => (
                                                    <div key={c.id} className="text-sm border-l-2 border-accent-blue pl-3 flex justify-between items-start">
                                                        <div>
                                                            <span className="font-bold">{c.username}: </span>
                                                            <span>{c.text}</span>
                                                        </div>
                                                        {role === 'admin' && (
                                                            <button onClick={() => handleDeleteComment(c.id, post.id)} className="text-accent-terra text-xs font-bold ml-2">
                                                                [X]
                                                            </button>
                                                        )}
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                        {token && (
                                            <form onSubmit={(e) => handleCommentSubmit(e, post.id)} className="flex gap-2">
                                                <input
                                                    type="text"
                                                    placeholder="Write a comment..."
                                                    value={commentInputs[post.id] || ''}
                                                    onChange={(e) => setCommentInputs(prev => ({ ...prev, [post.id]: e.target.value }))}
                                                    className="flex-1 p-2 border border-text-secondary text-sm"
                                                />
                                                <button type="submit" className="px-4 bg-text-primary text-bg-primary text-sm font-bold">
                                                    Post
                                                </button>
                                            </form>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>


                </div>
            </div>
        </div>
    );
};

export default Feed;

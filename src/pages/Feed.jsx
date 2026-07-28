import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { API_BASE_URL } from '../config';

const Feed = () => {
    const [posts, setPosts] = useState([]);
    const [description, setDescription] = useState('');
    const [tag, setTag] = useState('');
    const [image, setImage] = useState(null);
    const [error, setError] = useState('');
    const [isPosting, setIsPosting] = useState(false);
    const [visibleComments, setVisibleComments] = useState({}); // { postId: [comments] }
    const [commentInputs, setCommentInputs] = useState({}); // { postId: "draft text" }
    const [events, setEvents] = useState([]);
    const [shareMenuOpen, setShareMenuOpen] = useState(null); // postId or null
    const [copiedPostId, setCopiedPostId] = useState(null);
    const shareMenuRef = useRef(null);
    const navigate = useNavigate();

    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    const role = localStorage.getItem('role');

    // Close share menu on outside click
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (shareMenuRef.current && !shareMenuRef.current.contains(e.target)) {
                setShareMenuOpen(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const getPostShareUrl = (post) => {
        return `${window.location.origin}/feed#post-${post.id}`;
    };

    const getPostShareText = (post) => {
        return `🌍 Check out this cultural moment by ${post.username}: "${post.description.slice(0, 100)}${post.description.length > 100 ? '...' : ''}" on CultureConnect!`;
    };

    const handleShare = (platform, post) => {
        const url = encodeURIComponent(getPostShareUrl(post));
        const text = encodeURIComponent(getPostShareText(post));
        const rawUrl = getPostShareUrl(post);
        const rawText = getPostShareText(post);

        // Native app deep links (opens app directly on mobile)
        const appLinks = {
            whatsapp: `whatsapp://send?text=${text}%20${url}`,
            facebook: `fb://facewebmodal/f?href=${url}`,
            twitter: `twitter://post?message=${text}%20${url}`,
            linkedin: `linkedin://shareArticle?mini=true&url=${url}&summary=${text}`,
            telegram: `tg://msg_url?url=${rawUrl}&text=${rawText}`,
        };

        // Web fallback links (if app not installed)
        const webLinks = {
            whatsapp: `https://api.whatsapp.com/send?text=${text}%20${url}`,
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`,
            twitter: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
            linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
            telegram: `https://t.me/share/url?url=${url}&text=${text}`,
        };

        if (platform === 'copy') {
            navigator.clipboard.writeText(`${rawText} ${rawUrl}`);
            setCopiedPostId(post.id);
            setTimeout(() => setCopiedPostId(null), 2000);
        } else {
            // Try native app first, fall back to web after timeout
            const appLink = appLinks[platform];
            const webLink = webLinks[platform];

            // On mobile, try to open app directly
            const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

            if (isMobile) {
                // Try opening the native app via deep link
                const start = Date.now();
                window.location.href = appLink;

                // If app didn't open (still on page after 1.5s), fall back to web
                setTimeout(() => {
                    if (Date.now() - start < 2000) {
                        window.open(webLink, '_blank');
                    }
                }, 1500);
            } else {
                // On desktop, open web version in new tab
                window.open(webLink, '_blank', 'noopener,noreferrer,width=600,height=500');
            }
        }
        setShareMenuOpen(null);
    };

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

        if (!description) {
            setError('Please provide a description');
            return;
        }

        setIsPosting(true);
        const formData = new FormData();
        if (image) formData.append('image', image);
        formData.append('description', description);
        formData.append('tag', tag || 'General');

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
                const fileInput = document.getElementById('file-upload');
                if (fileInput) fileInput.value = '';
                fetchPosts(); // Refresh feed
            } else {
                const data = await res.json();
                setError(data.error || 'Failed to post. Please try again.');
            }
        } catch (err) {
            setError('Network error. Please check your connection and try again.');
        } finally {
            setIsPosting(false);
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
                        <button type="submit" disabled={isPosting} className="self-start px-8 py-3 bg-btn text-btn font-bold hover:bg-accent-blue hover:text-white transition-all duration-300 theme-transition rounded-lg shadow-md disabled:opacity-50 disabled:cursor-not-allowed">
                            {isPosting ? 'Posting...' : 'Post'}
                        </button>
                    </form>
                </div>

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
                                    {/* Share Icons */}
                                    <div className="flex items-center gap-1 ml-auto">
                                        <span className="text-xs font-bold text-text-muted mr-1 uppercase tracking-wider">Share</span>
                                        <button onClick={() => handleShare('whatsapp', post)} title="WhatsApp" className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-green-100 hover:scale-110 transition-all duration-200">
                                            <svg className="w-4 h-4 text-green-500" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                                        </button>
                                        <button onClick={() => handleShare('facebook', post)} title="Facebook" className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-blue-100 hover:scale-110 transition-all duration-200">
                                            <svg className="w-4 h-4 text-blue-600" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                                        </button>
                                        <button onClick={() => handleShare('twitter', post)} title="Twitter / X" className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-200 hover:scale-110 transition-all duration-200">
                                            <svg className="w-4 h-4 text-gray-800" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                                        </button>
                                        <button onClick={() => handleShare('linkedin', post)} title="LinkedIn" className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-blue-100 hover:scale-110 transition-all duration-200">
                                            <svg className="w-4 h-4 text-blue-700" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                                        </button>
                                        <button onClick={() => handleShare('telegram', post)} title="Telegram" className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-cyan-100 hover:scale-110 transition-all duration-200">
                                            <svg className="w-4 h-4 text-cyan-500" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
                                        </button>
                                        <button onClick={() => handleShare('copy', post)} title={copiedPostId === post.id ? 'Copied!' : 'Copy Link'} className={`w-8 h-8 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-200 ${copiedPostId === post.id ? 'bg-green-100' : 'hover:bg-gray-200'}`}>
                                            {copiedPostId === post.id ? (
                                                <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                                            ) : (
                                                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m9.86-2.54a4.5 4.5 0 00-1.242-7.244l-4.5-4.5a4.5 4.5 0 00-6.364 6.364L4.343 8.03" /></svg>
                                            )}
                                        </button>
                                    </div>
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

import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { API_BASE_URL } from '../config';

// ── Pure Cultural Demo Posts ──────────────────────────────────────────────────
const CULTURE_DEMO_POSTS = [
    {
        id: 'c-post-1',
        username: 'Priya_Bharatanatyam',
        user_avatar: 'P',
        tag: 'Classical Dance',
        created_at: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(), // 3 hours ago
        description: 'Immersed in the divine nritya and abhinaya during the sacred Natyanjali dance festival at Chidambaram. Every mudra connects thousands of years of Vedic philosophy to rhythmic tala. 💃🪷',
        image_url: 'https://images.unsplash.com/photo-1569851935333-6ca1448cc299?w=800&auto=format&fit=crop&q=80',
        like_count: 84,
        comment_count: 14,
        isDemo: true
    },
    {
        id: 'c-post-2',
        username: 'Varanasi_Aarti_Spiritual',
        user_avatar: 'V',
        tag: 'Spiritual Heritage',
        created_at: new Date(Date.now() - 1000 * 60 * 60 * 7).toISOString(), // 7 hours ago
        description: 'The celestial Maha Aarti at Dashashwamedh Ghat, Varanasi. The resonant sound of conch shells (shankha), Vedic hymns chanting, and glowing brass deepams over mother Ganga create an unforgettable spiritual aura. 🪔🙏🌊',
        image_url: 'https://images.unsplash.com/photo-1571536802807-3cab473954eb?w=800&auto=format&fit=crop&q=80',
        like_count: 126,
        comment_count: 22,
        isDemo: true
    },
    {
        id: 'c-post-3',
        username: 'Kerala_Kathakali_Heritage',
        user_avatar: 'K',
        tag: 'Folk Arts',
        created_at: new Date(Date.now() - 1000 * 60 * 60 * 15).toISOString(),
        description: 'Behind the scenes of Kathakali Chutti (makeup ritual). Applying natural mineral pigments like Manayola and Chayilyam takes over 4 hours before the dancer embodies the Mahabharata character on stage. 🎭👑',
        image_url: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&auto=format&fit=crop&q=80',
        like_count: 92,
        comment_count: 9,
        isDemo: true
    },
    {
        id: 'c-post-4',
        username: 'Adivasi_Warli_Arts',
        user_avatar: 'A',
        tag: 'Tribal Crafts',
        created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
        description: 'Documenting the sacred Warli wall paintings created by elder indigenous women of Dahanu. The circle represents the sun and moon, the triangle symbolizes mountains and sacred trees, and the square signifies sacred mother earth. 🎨🖌️🌾',
        image_url: 'https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?w=800&auto=format&fit=crop&q=80',
        like_count: 73,
        comment_count: 8,
        isDemo: true
    },
    {
        id: 'c-post-5',
        username: 'Kanjeevaram_MasterWeavers',
        user_avatar: 'K',
        tag: 'Handloom & Textiles',
        created_at: new Date(Date.now() - 1000 * 60 * 60 * 32).toISOString(),
        description: 'The Korvai interlocking technique in pure mulberry silk and gold zari thread. A single traditional bridal saree requires over 20 days of synchronized handloom work by two master artisans in Kanchipuram. 🧵🥻',
        image_url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&auto=format&fit=crop&q=80',
        like_count: 110,
        comment_count: 16,
        isDemo: true
    },
    {
        id: 'c-post-6',
        username: 'Rajasthan_RoyalHaveli',
        user_avatar: 'R',
        tag: 'Heritage Architecture',
        created_at: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
        description: 'The mesmerizing yellow sandstone Jharokhas (lattice balconies) of Patwon Ki Haveli in Jaisalmer. Designed to filter desert winds and create natural ventilation centuries before modern cooling. 🏰☀️',
        image_url: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&auto=format&fit=crop&q=80',
        like_count: 145,
        comment_count: 19,
        isDemo: true
    },
    {
        id: 'c-post-7',
        username: 'Sufi_Qawwali_Mehfil',
        user_avatar: 'S',
        tag: 'Music & Poetry',
        created_at: new Date(Date.now() - 1000 * 60 * 60 * 60).toISOString(),
        description: 'Ecstatic Thursday evening Qawwali session with the Nizami brothers. The harmonium melodies and clapping rhythms weaving Amir Khusrau’s sacred poetry into spiritual transcendence. 🎶🪕🕊️',
        image_url: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&auto=format&fit=crop&q=80',
        like_count: 104,
        comment_count: 11,
        isDemo: true
    },
    {
        id: 'c-post-8',
        username: 'Heritage_Culinary_Secrets',
        user_avatar: 'H',
        tag: 'Culinary Arts',
        created_at: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
        description: 'Traditional slow-cooking in earthern handis (Dum Pukht). Infusing rose water, saffron strands, and 24 hand-pounded spices into authentic Hyderabadi culinary heritage. 🍛🔥',
        image_url: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800&auto=format&fit=crop&q=80',
        like_count: 138,
        comment_count: 27,
        isDemo: true
    }
];

// ── Cultural Spotlight Events for the Feed ──────────────────────────────────
const CULTURE_FEED_EVENTS = [
    {
        id: 'feed-ev-1',
        title: 'Hyderabad Folk Festival',
        date: 'Today • 05:30 PM',
        location: 'Shilparamam Village, Hyderabad',
        category: 'Dance & Performances',
        price: '₹250',
        emoji: '💃',
        image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80'
    },
    {
        id: 'feed-ev-2',
        title: 'Navratri Garba & Dandiya Utsav',
        date: 'Tomorrow • 07:00 PM',
        location: 'GMDC Ground, Ahmedabad',
        category: 'Dance & Performances',
        price: '₹400',
        emoji: '🪘',
        image: 'https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?w=600&auto=format&fit=crop&q=80'
    },
    {
        id: 'feed-ev-3',
        title: 'Sufi Qawwali Night',
        date: 'This Weekend • 07:30 PM',
        location: 'Hazrat Nizamuddin Dargah, Delhi',
        category: 'Music Shows',
        price: 'FREE',
        emoji: '🎵',
        image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&auto=format&fit=crop&q=80'
    },
    {
        id: 'feed-ev-4',
        title: 'Warli Tribal Art Workshop',
        date: 'Sunday • 10:00 AM',
        location: 'Tribal Cultural Centre, Dahanu',
        category: 'Workshops',
        price: '₹350',
        emoji: '🎨',
        image: 'https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?w=600&auto=format&fit=crop&q=80'
    },
    {
        id: 'feed-ev-5',
        title: 'Yakshagana Folk Theatre',
        date: 'Saturday • 06:30 PM',
        location: 'Yakshamandir, Udupi',
        category: 'Theatre & Arts',
        price: '₹150',
        emoji: '🎭',
        image: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=600&auto=format&fit=crop&q=80'
    }
];

const CULTURE_TAGS = [
    'All Culture',
    'Classical Dance',
    'Spiritual Heritage',
    'Folk Arts',
    'Tribal Crafts',
    'Handloom & Textiles',
    'Heritage Architecture',
    'Music & Poetry',
    'Culinary Arts'
];

const Feed = () => {
    const [posts, setPosts] = useState([]);
    const [activeTag, setActiveTag] = useState('All Culture');
    const [description, setDescription] = useState('');
    const [tag, setTag] = useState('Classical Dance');
    const [image, setImage] = useState(null);
    const [error, setError] = useState('');
    const [isPosting, setIsPosting] = useState(false);
    const [visibleComments, setVisibleComments] = useState({});
    const [commentInputs, setCommentInputs] = useState({});
    const [events, setEvents] = useState(CULTURE_FEED_EVENTS);
    const [copiedPostId, setCopiedPostId] = useState(null);
    const [userLikes, setUserLikes] = useState({});
    const navigate = useNavigate();

    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

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

        const appLinks = {
            whatsapp: `whatsapp://send?text=${text}%20${url}`,
            facebook: `fb://facewebmodal/f?href=${url}`,
            twitter: `twitter://post?message=${text}%20${url}`,
            linkedin: `linkedin://shareArticle?mini=true&url=${url}&summary=${text}`,
            telegram: `tg://msg_url?url=${rawUrl}&text=${rawText}`,
        };

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
            const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
            if (isMobile) {
                const start = Date.now();
                window.location.href = appLinks[platform];
                setTimeout(() => {
                    if (Date.now() - start < 2000) {
                        window.open(webLinks[platform], '_blank');
                    }
                }, 1500);
            } else {
                window.open(webLinks[platform], '_blank', 'noopener,noreferrer,width=600,height=500');
            }
        }
    };

    useEffect(() => {
        fetchPosts();
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/api/events`);
            if (res.ok) {
                const data = await res.json();
                if (Array.isArray(data) && data.length > 0) {
                    const formatted = data.slice(0, 5).map(e => ({
                        id: e.id || e._id,
                        title: e.title,
                        date: e.date,
                        location: e.location,
                        category: e.category || 'Culture',
                        price: e.price === 0 ? 'FREE' : `₹${e.price}`,
                        emoji: '🎪',
                        image: e.image_url || 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&q=80'
                    }));
                    setEvents([...formatted, ...CULTURE_FEED_EVENTS.slice(formatted.length)]);
                }
            }
        } catch {
            setEvents(CULTURE_FEED_EVENTS);
        }
    };

    const fetchPosts = async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/api/posts`);
            if (res.ok) {
                const data = await res.json();
                if (Array.isArray(data) && data.length > 0) {
                    setPosts([...data, ...CULTURE_DEMO_POSTS]);
                } else {
                    setPosts(CULTURE_DEMO_POSTS);
                }
            } else {
                setPosts(CULTURE_DEMO_POSTS);
            }
        } catch {
            setPosts(CULTURE_DEMO_POSTS);
        }
    };

    const handleLike = async (postId, isDemo) => {
        if (!token) return navigate('/login');

        setUserLikes(prev => {
            const current = prev[postId] || false;
            return { ...prev, [postId]: !current };
        });

        setPosts(prev => prev.map(p => {
            if (p.id === postId) {
                const alreadyLiked = userLikes[postId] || false;
                const newCount = alreadyLiked ? Math.max(0, (p.like_count || 0) - 1) : (p.like_count || 0) + 1;
                return { ...p, like_count: newCount };
            }
            return p;
        }));

        if (!isDemo) {
            try {
                await fetch(`${API_BASE_URL}/api/posts/${postId}/like`, {
                    method: 'POST',
                    headers: { 'Authorization': `Bearer ${token}` }
                });
            } catch (err) {
                console.error('Failed to like post');
            }
        }
    };

    const fetchComments = async (postId, isDemo) => {
        if (visibleComments[postId]) {
            setVisibleComments(prev => ({ ...prev, [postId]: null }));
            return;
        }

        if (isDemo) {
            setVisibleComments(prev => ({
                ...prev,
                [postId]: [
                    { id: 'dc-1', username: 'HeritageScholar', text: 'Incredible preservation of traditional cultural heritage!' },
                    { id: 'dc-2', username: 'KalaPrem', text: 'The authenticity and devotion in this expression are deeply inspiring.' }
                ]
            }));
            return;
        }

        try {
            const res = await fetch(`${API_BASE_URL}/api/posts/${postId}/comments`);
            const data = await res.json();
            if (res.ok) {
                setVisibleComments(prev => ({ ...prev, [postId]: data }));
            }
        } catch {
            setVisibleComments(prev => ({ ...prev, [postId]: [] }));
        }
    };

    const handleCommentSubmit = async (e, postId, isDemo) => {
        e.preventDefault();
        if (!token) return navigate('/login');

        const text = commentInputs[postId];
        if (!text) return;

        const currentUsername = localStorage.getItem('username') || 'CulturalExplorer';

        if (isDemo) {
            setVisibleComments(prev => ({
                ...prev,
                [postId]: [...(prev[postId] || []), { id: 'usr-c-' + Date.now(), username: currentUsername, text }]
            }));
            setPosts(prev => prev.map(p => p.id === postId ? { ...p, comment_count: (p.comment_count || 0) + 1 } : p));
            setCommentInputs(prev => ({ ...prev, [postId]: '' }));
            return;
        }

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
                fetchComments(postId, false);
                fetchPosts();
            }
        } catch (err) {
            console.error('Failed to post comment');
        }
    };

    const handleDeletePost = async (postId, isDemo) => {
        if (!window.confirm("Are you sure you want to delete this post?")) return;
        if (isDemo) {
            setPosts(prev => prev.filter(p => p.id !== postId));
            return;
        }
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

    const handlePostSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!token) {
            navigate('/login');
            return;
        }

        if (!description) {
            setError('Please provide a description of your cultural moment');
            return;
        }

        setIsPosting(true);
        const formData = new FormData();
        if (image) formData.append('image', image);
        formData.append('description', description);
        formData.append('tag', tag || 'Classical Dance');

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
                setTag('Classical Dance');
                setImage(null);
                const fileInput = document.getElementById('file-upload');
                if (fileInput) fileInput.value = '';
                fetchPosts();
            } else {
                const newLocalPost = {
                    id: 'usr-p-' + Date.now(),
                    username: localStorage.getItem('username') || 'CulturalExplorer',
                    description,
                    tag: tag || 'Classical Dance',
                    created_at: new Date().toISOString(),
                    image_url: image ? URL.createObjectURL(image) : 'https://images.unsplash.com/photo-1569851935333-6ca1448cc299?w=800&auto=format&fit=crop&q=80',
                    like_count: 0,
                    comment_count: 0,
                    isDemo: true
                };
                setPosts(prev => [newLocalPost, ...prev]);
                setDescription('');
                setImage(null);
            }
        } catch {
            const newLocalPost = {
                id: 'usr-p-' + Date.now(),
                username: localStorage.getItem('username') || 'CulturalExplorer',
                description,
                tag: tag || 'Classical Dance',
                created_at: new Date().toISOString(),
                image_url: image ? URL.createObjectURL(image) : 'https://images.unsplash.com/photo-1569851935333-6ca1448cc299?w=800&auto=format&fit=crop&q=80',
                like_count: 0,
                comment_count: 0,
                isDemo: true
            };
            setPosts(prev => [newLocalPost, ...prev]);
            setDescription('');
            setImage(null);
        } finally {
            setIsPosting(false);
        }
    };

    const filteredPosts = posts.filter(post => {
        if (activeTag === 'All Culture') return true;
        return post.tag?.toLowerCase() === activeTag.toLowerCase();
    });

    return (
        <div className="min-h-screen pt-24 pb-16 theme-transition" style={{ backgroundColor: 'var(--theme-bg-primary)' }}>
            <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
                
                {/* Header Banner */}
                <div className="mb-8 pb-6 border-b theme-transition" style={{ borderColor: 'var(--theme-border)' }}>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2" style={{ backgroundColor: 'var(--theme-bg-accent)', color: 'var(--theme-accent-primary)' }}>
                                <span>🏛️</span> CULTURAL MOMENTS & STORIES
                            </div>
                            <h1 className="text-3xl sm:text-4xl font-serif font-black text-text-primary">
                                Cultural Community Feed
                            </h1>
                            <p className="text-sm text-text-muted mt-1 max-w-2xl">
                                Share and explore authentic cultural stories, folk arts, classical traditions, temple rituals, and upcoming gatherings from across regions.
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <Link
                                to="/events"
                                className="px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 shadow-sm hover:scale-105 transition-all"
                                style={{ backgroundColor: 'var(--theme-btn-bg)', color: 'var(--theme-btn-text)' }}
                            >
                                <span>🎪</span>
                                <span>Explore All Cultural Events</span>
                            </Link>
                        </div>
                    </div>

                    {/* Cultural Tag Filter Chips */}
                    <div className="flex gap-2 overflow-x-auto pt-6 pb-2 no-scrollbar">
                        {CULTURE_TAGS.map(t => {
                            const isSelected = activeTag === t;
                            return (
                                <button
                                    key={t}
                                    onClick={() => setActiveTag(t)}
                                    className="px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all flex-shrink-0"
                                    style={{
                                        backgroundColor: isSelected ? 'var(--theme-accent-primary)' : 'var(--theme-bg-secondary)',
                                        color: isSelected ? '#fff' : 'var(--theme-text-secondary)',
                                        border: `1px solid ${isSelected ? 'var(--theme-accent-primary)' : 'var(--theme-border)'}`
                                    }}
                                >
                                    {t}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* 2-Column Main Feed + Cultural Events Sidebar */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* Left/Main Column: Share Box & Feed Posts */}
                    <div className="lg:col-span-8 flex flex-col gap-8">
                        
                        {/* Share Your Culture Box */}
                        <div className="p-6 border rounded-2xl shadow-sm theme-transition" style={{ backgroundColor: 'var(--theme-card-bg)', borderColor: 'var(--theme-border)' }}>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-full flex items-center justify-center font-black text-sm" style={{ backgroundColor: 'var(--theme-bg-accent)', color: 'var(--theme-accent-primary)' }}>
                                    {localStorage.getItem('username')?.[0]?.toUpperCase() || '✨'}
                                </div>
                                <div>
                                    <h2 className="text-lg font-serif font-bold text-text-primary">Share a Cultural Moment</h2>
                                    <p className="text-xs text-text-muted">Preserve traditions, folk customs, classical art recitals, or regional heritage</p>
                                </div>
                            </div>

                            {error && <p className="text-accent-terra font-bold text-xs mb-3">{error}</p>}

                            <form onSubmit={handlePostSubmit} className="flex flex-col gap-4">
                                <textarea
                                    placeholder="Describe your cultural moment, classical art experience, or regional celebration…"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="p-3.5 border rounded-xl text-sm min-h-[90px] outline-none theme-transition"
                                    style={{ backgroundColor: 'var(--theme-bg-secondary)', borderColor: 'var(--theme-border)', color: 'var(--theme-text-primary)' }}
                                />

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <select
                                        value={tag}
                                        onChange={(e) => setTag(e.target.value)}
                                        className="p-2.5 border rounded-xl text-xs font-semibold outline-none theme-transition"
                                        style={{ backgroundColor: 'var(--theme-bg-secondary)', borderColor: 'var(--theme-border)', color: 'var(--theme-text-primary)' }}
                                    >
                                        {CULTURE_TAGS.filter(t => t !== 'All Culture').map(t => (
                                            <option key={t} value={t}>{t}</option>
                                        ))}
                                    </select>

                                    <label
                                        htmlFor="file-upload"
                                        className="p-2.5 border border-dashed rounded-xl text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer truncate theme-transition"
                                        style={{ backgroundColor: 'var(--theme-bg-secondary)', borderColor: 'var(--theme-border)', color: 'var(--theme-text-secondary)' }}
                                    >
                                        <span>📷</span>
                                        <span>{image ? image.name : 'Upload Cultural Photo'}</span>
                                    </label>
                                    <input
                                        id="file-upload"
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => setImage(e.target.files[0])}
                                        className="hidden"
                                    />
                                </div>

                                <div className="flex justify-between items-center pt-2">
                                    <span className="text-xs text-text-muted font-medium">Culture-only community guidelines apply 🕊️</span>
                                    <button
                                        type="submit"
                                        disabled={isPosting}
                                        className="px-6 py-2.5 font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md disabled:opacity-50"
                                        style={{ backgroundColor: 'var(--theme-btn-bg)', color: 'var(--theme-btn-text)' }}
                                    >
                                        {isPosting ? 'Publishing…' : '🌟 Publish Cultural Story'}
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Feed Posts Stream */}
                        <div className="flex flex-col gap-8">
                            {filteredPosts.length === 0 ? (
                                <div className="p-12 text-center border rounded-2xl theme-transition" style={{ backgroundColor: 'var(--theme-card-bg)', borderColor: 'var(--theme-border)' }}>
                                    <p className="text-2xl mb-2">🎭</p>
                                    <p className="text-text-primary font-bold">No cultural stories under "{activeTag}" yet.</p>
                                    <p className="text-xs text-text-muted mt-1">Be the first to share a moment celebrating this tradition!</p>
                                </div>
                            ) : (
                                filteredPosts.map((post, idx) => (
                                    <div key={post.id} className="flex flex-col gap-8">
                                        
                                        {/* In-feed Cultural Event Spotlight banner every 3 posts */}
                                        {idx > 0 && idx % 3 === 0 && events[idx % events.length] && (
                                            <div
                                                onClick={() => navigate('/events')}
                                                className="p-5 rounded-2xl border flex flex-col sm:flex-row items-center gap-4 cursor-pointer hover:shadow-lg transition-all"
                                                style={{
                                                    background: 'linear-gradient(135deg, rgba(193, 80, 46, 0.08) 0%, rgba(217, 119, 6, 0.08) 100%)',
                                                    borderColor: 'var(--theme-accent-primary)'
                                                }}
                                            >
                                                <img
                                                    src={events[idx % events.length].image}
                                                    alt={events[idx % events.length].title}
                                                    className="w-full sm:w-28 h-24 object-cover rounded-xl flex-shrink-0"
                                                />
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <span className="text-xs font-black text-white px-2.5 py-0.5 rounded-full" style={{ backgroundColor: 'var(--theme-accent-primary)' }}>
                                                            {events[idx % events.length].emoji} FEATURED CULTURAL EVENT
                                                        </span>
                                                        <span className="text-xs font-bold text-text-muted">{events[idx % events.length].date}</span>
                                                    </div>
                                                    <h3 className="font-serif font-bold text-base sm:text-lg text-text-primary leading-snug">
                                                        {events[idx % events.length].title}
                                                    </h3>
                                                    <p className="text-xs text-text-muted truncate mt-0.5">
                                                        📍 {events[idx % events.length].location} • <strong style={{ color: 'var(--theme-accent-primary)' }}>{events[idx % events.length].price}</strong>
                                                    </p>
                                                </div>
                                                <button
                                                    className="px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap shadow-sm"
                                                    style={{ backgroundColor: 'var(--theme-btn-bg)', color: 'var(--theme-btn-text)' }}
                                                >
                                                    View & Book Pass →
                                                </button>
                                            </div>
                                        )}

                                        {/* Individual Cultural Post Card */}
                                        <div
                                            id={`post-${post.id}`}
                                            className="border shadow-sm rounded-2xl overflow-hidden theme-transition"
                                            style={{ backgroundColor: 'var(--theme-card-bg)', borderColor: 'var(--theme-border)' }}
                                        >
                                            {/* Post Author Header */}
                                            <div className="p-4 border-b flex justify-between items-center theme-transition" style={{ backgroundColor: 'var(--theme-bg-secondary)', borderColor: 'var(--theme-border)' }}>
                                                <div className="flex items-center gap-3">
                                                    <div className="w-9 h-9 rounded-full flex items-center justify-center font-black text-xs border" style={{ backgroundColor: 'var(--theme-bg-accent)', borderColor: 'var(--theme-border)', color: 'var(--theme-accent-primary)' }}>
                                                        {post.username?.[0]?.toUpperCase() || 'C'}
                                                    </div>
                                                    <div>
                                                        <Link to={`/profile/${post.username}`} className="font-bold text-sm text-text-primary hover:text-accent-primary hover:underline">
                                                            {post.username}
                                                        </Link>
                                                        <div className="text-[11px] text-text-muted">
                                                            {new Date(post.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-3">
                                                    <span className="text-[11px] font-extrabold px-2.5 py-1 rounded-full border uppercase tracking-wider" style={{ backgroundColor: 'var(--theme-bg-accent)', borderColor: 'var(--theme-border)', color: 'var(--theme-accent-primary)' }}>
                                                        {post.tag || 'Culture'}
                                                    </span>
                                                    {role === 'admin' && (
                                                        <button onClick={() => handleDeletePost(post.id, post.isDemo)} className="text-xs font-bold text-accent-terra border border-accent-terra px-2 py-0.5 rounded hover:bg-accent-terra hover:text-white transition-colors">
                                                            Delete
                                                        </button>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Post Image */}
                                            {post.image_url && (
                                                <div className="relative overflow-hidden max-h-[520px] bg-black/5">
                                                    <img
                                                        src={post.image_url && post.image_url.startsWith('http') ? post.image_url : `${API_BASE_URL}${post.image_url}`}
                                                        alt={post.description}
                                                        className="w-full h-auto object-cover max-h-[520px]"
                                                        loading="lazy"
                                                    />
                                                </div>
                                            )}

                                            {/* Post Body */}
                                            <div className="p-5">
                                                <p className="text-text-primary leading-relaxed text-sm sm:text-base mb-5">
                                                    {post.description}
                                                </p>

                                                {/* Social Actions */}
                                                <div className="flex items-center gap-4 border-t pt-4 flex-wrap" style={{ borderColor: 'var(--theme-border)' }}>
                                                    <button
                                                        onClick={() => handleLike(post.id, post.isDemo)}
                                                        className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg transition-all"
                                                        style={{
                                                            backgroundColor: userLikes[post.id] ? 'var(--theme-bg-accent)' : 'transparent',
                                                            color: userLikes[post.id] ? 'var(--theme-accent-primary)' : 'var(--theme-text-secondary)'
                                                        }}
                                                    >
                                                        <span>{userLikes[post.id] ? '❤️' : '🤍'}</span>
                                                        <span>{post.like_count || 0} Likes</span>
                                                    </button>

                                                    <button
                                                        onClick={() => fetchComments(post.id, post.isDemo)}
                                                        className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg text-text-secondary hover:text-text-primary transition-all"
                                                    >
                                                        <span>💬</span>
                                                        <span>{post.comment_count || 0} Comments</span>
                                                    </button>

                                                    {/* Share Icons */}
                                                    <div className="flex items-center gap-1 ml-auto">
                                                        <button onClick={() => handleShare('whatsapp', post)} title="WhatsApp" className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-green-100 hover:scale-110 transition-all">
                                                            <svg className="w-3.5 h-3.5 text-green-500" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                                                        </button>
                                                        <button onClick={() => handleShare('facebook', post)} title="Facebook" className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-blue-100 hover:scale-110 transition-all">
                                                            <svg className="w-3.5 h-3.5 text-blue-600" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                                                        </button>
                                                        <button onClick={() => handleShare('twitter', post)} title="Twitter / X" className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-gray-200 hover:scale-110 transition-all">
                                                            <svg className="w-3.5 h-3.5 text-gray-800" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                                                        </button>
                                                        <button onClick={() => handleShare('copy', post)} title={copiedPostId === post.id ? 'Copied!' : 'Copy Link'} className={`w-7 h-7 rounded-full flex items-center justify-center hover:scale-110 transition-all ${copiedPostId === post.id ? 'bg-green-100' : 'hover:bg-gray-200'}`}>
                                                            {copiedPostId === post.id ? (
                                                                <svg className="w-3.5 h-3.5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                                                            ) : (
                                                                <svg className="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m9.86-2.54a4.5 4.5 0 00-1.242-7.244l-4.5-4.5a4.5 4.5 0 00-6.364 6.364L4.343 8.03" /></svg>
                                                            )}
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* Comments Box */}
                                                {visibleComments[post.id] && (
                                                    <div className="mt-4 border-t pt-4 p-4 rounded-xl theme-transition" style={{ backgroundColor: 'var(--theme-bg-secondary)', borderColor: 'var(--theme-border)' }}>
                                                        <div className="flex flex-col gap-3 mb-4 max-h-48 overflow-y-auto">
                                                            {visibleComments[post.id].length === 0 ? (
                                                                <p className="text-xs text-text-muted italic">No comments yet. Share your thoughts on this cultural post!</p>
                                                            ) : (
                                                                visibleComments[post.id].map(c => (
                                                                    <div key={c.id} className="text-xs border-l-2 pl-3 flex justify-between items-start" style={{ borderColor: 'var(--theme-accent-primary)' }}>
                                                                        <div>
                                                                            <span className="font-bold text-text-primary">{c.username}: </span>
                                                                            <span className="text-text-secondary">{c.text}</span>
                                                                        </div>
                                                                    </div>
                                                                ))
                                                            )}
                                                        </div>

                                                        {token ? (
                                                            <form onSubmit={(e) => handleCommentSubmit(e, post.id, post.isDemo)} className="flex gap-2">
                                                                <input
                                                                    type="text"
                                                                    placeholder="Share your appreciation or knowledge…"
                                                                    value={commentInputs[post.id] || ''}
                                                                    onChange={(e) => setCommentInputs(prev => ({ ...prev, [post.id]: e.target.value }))}
                                                                    className="flex-1 p-2 rounded-lg border text-xs outline-none"
                                                                    style={{ backgroundColor: 'var(--theme-card-bg)', borderColor: 'var(--theme-border)', color: 'var(--theme-text-primary)' }}
                                                                />
                                                                <button
                                                                    type="submit"
                                                                    className="px-3.5 py-1.5 rounded-lg text-xs font-bold"
                                                                    style={{ backgroundColor: 'var(--theme-btn-bg)', color: 'var(--theme-btn-text)' }}
                                                                >
                                                                    Comment
                                                                </button>
                                                            </form>
                                                        ) : (
                                                            <div className="text-center py-2">
                                                                <Link to="/login" className="text-xs font-bold text-accent-primary hover:underline">
                                                                    Log in to leave a comment
                                                                </Link>
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Right Sidebar: Upcoming Cultural Events & Gatherings */}
                    <div className="lg:col-span-4 flex flex-col gap-6 sticky top-24">
                        
                        {/* Cultural Events Widget Box */}
                        <div className="p-5 rounded-2xl border shadow-sm theme-transition" style={{ backgroundColor: 'var(--theme-card-bg)', borderColor: 'var(--theme-border)' }}>
                            <div className="flex items-center justify-between pb-4 mb-4 border-b" style={{ borderColor: 'var(--theme-border)' }}>
                                <div className="flex items-center gap-2">
                                    <span className="text-xl">🎪</span>
                                    <h2 className="font-serif font-black text-base text-text-primary">Upcoming Cultural Events</h2>
                                </div>
                                <Link to="/events" className="text-xs font-bold text-accent-primary hover:underline">
                                    View All →
                                </Link>
                            </div>

                            <div className="flex flex-col gap-3.5">
                                {events.slice(0, 5).map((ev) => (
                                    <div
                                        key={ev.id}
                                        onClick={() => navigate('/events')}
                                        className="p-3 rounded-xl border flex gap-3 cursor-pointer hover:scale-[1.02] transition-all"
                                        style={{ backgroundColor: 'var(--theme-bg-secondary)', borderColor: 'var(--theme-border)' }}
                                    >
                                        <img
                                            src={ev.image}
                                            alt={ev.title}
                                            className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                                        />
                                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                                            <div>
                                                <h4 className="font-bold text-xs text-text-primary truncate leading-tight">
                                                    {ev.title}
                                                </h4>
                                                <p className="text-[11px] text-text-muted truncate mt-0.5">
                                                    📍 {ev.location}
                                                </p>
                                            </div>
                                            <div className="flex items-center justify-between text-[10px] font-bold mt-1">
                                                <span className="text-accent-primary">{ev.date}</span>
                                                <span className="px-1.5 py-0.5 rounded bg-black/10 text-text-primary">{ev.price}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <Link
                                to="/events"
                                className="w-full mt-4 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all block text-center"
                                style={{ backgroundColor: 'var(--theme-bg-accent)', color: 'var(--theme-accent-primary)', border: '1px solid var(--theme-border)' }}
                            >
                                <span>🎟️</span>
                                <span>Browse All Cultural Gatherings</span>
                            </Link>
                        </div>

                        {/* Cultural Community Guidelines / Info Card */}
                        <div className="p-5 rounded-2xl border shadow-sm theme-transition" style={{ backgroundColor: 'var(--theme-bg-secondary)', borderColor: 'var(--theme-border)' }}>
                            <h3 className="font-serif font-bold text-sm text-text-primary mb-2 flex items-center gap-2">
                                <span>🕊️</span> Cultural Ethos & Guidelines
                            </h3>
                            <p className="text-xs text-text-secondary leading-relaxed mb-3">
                                CultureConnect is dedicated exclusively to celebrating regional heritage, indigenous traditions, classical fine arts, sacred festivals, and folkloric history.
                            </p>
                            <div className="flex flex-wrap gap-1.5 text-[10px] font-bold text-text-muted">
                                <span className="px-2 py-1 rounded bg-black/5">#ClassicalDance</span>
                                <span className="px-2 py-1 rounded bg-black/5">#FolkTraditions</span>
                                <span className="px-2 py-1 rounded bg-black/5">#VedicHeritage</span>
                                <span className="px-2 py-1 rounded bg-black/5">#HandloomArts</span>
                                <span className="px-2 py-1 rounded bg-black/5">#CulinaryHistory</span>
                            </div>
                        </div>

                    </div>

                </div>

            </div>
        </div>
    );
};

export default Feed;

import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { API_BASE_URL } from '../config';

// ── Mock cultural event posts ──────────────────────────────────────────────────
const MOCK_POSTS = [
  {
    id: 'mock-1',
    username: 'Priya_Kulkarni',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya',
    tag: 'Dance',
    created_at: '2026-10-05T18:30:00Z',
    like_count: 214,
    comment_count: 31,
    image_url: 'https://images.unsplash.com/photo-1611516491426-03025e6043c8?auto=format&fit=crop&w=900&q=80',
    description: '✨ Just attended the most breathtaking Bharatanatyam recital at Thanjavur temple premises tonight! The dancer\'s abhinaya was pure divine expression — every mudra told a story that transcended language. If you haven\'t witnessed classical Indian dance live, you are genuinely missing one of humanity\'s greatest art forms. 🙏 #Bharatanatyam #ClassicalDance #TamilNadu',
    event: 'Thanjavur Bharatanatyam Utsav 2026',
    location: '📍 Thanjavur, Tamil Nadu',
  },
  {
    id: 'mock-2',
    username: 'Arjun_Mehta88',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun',
    tag: 'Festival',
    created_at: '2026-10-04T10:00:00Z',
    like_count: 389,
    comment_count: 57,
    image_url: 'https://images.unsplash.com/photo-1578393098337-5594cce112db?auto=format&fit=crop&w=900&q=80',
    description: '🎨 Holi at Vrindavan this year was an otherworldly experience! Colors everywhere, the air smelled of gulal and flowers, strangers became family in seconds. This is why India is magical — one festival dissolves every barrier. Absolutely soaked but absolutely happy 😄 #Holi2026 #Vrindavan #ColorsOfIndia',
    event: 'Vrindavan Holi Mahotsav 2026',
    location: '📍 Vrindavan, Uttar Pradesh',
  },
  {
    id: 'mock-3',
    username: 'Lakshmi_Nair',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lakshmi',
    tag: 'Craft',
    created_at: '2026-10-03T14:00:00Z',
    like_count: 178,
    comment_count: 22,
    image_url: 'https://images.unsplash.com/photo-1602524816881-4b3a78cf9870?auto=format&fit=crop&w=900&q=80',
    description: '🌸 Onam at my grandmother\'s home in Thrissur — the pookalam (flower rangoli) took us four hours and 15 flower varieties to complete! We laid out a 12-course Onam Sadhya on banana leaves. This tradition is our family\'s heartbeat. Kerala never fails to fill your soul 🥹 #Onam2026 #Kerala #Sadhya #Pookalam',
    event: 'Onam Family Celebration 2026',
    location: '📍 Thrissur, Kerala',
  },
  {
    id: 'mock-4',
    username: 'Rahul_Sharma_Jaipur',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul',
    tag: 'Heritage',
    created_at: '2026-10-02T20:00:00Z',
    like_count: 502,
    comment_count: 84,
    image_url: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=900&q=80',
    description: '🏯 The Jaipur Literature & Culture Festival closing night at the City Palace was sheer grandeur. Under the stars, Kuchipudi dancers performed alongside Rajasthani folk musicians — two traditions meeting for the first time on one stage. Pure goosebumps. India\'s cultural wealth is INFINITE. #JaipurFest #Kuchipudi #RajasthanFolk',
    event: 'Jaipur Culture Festival — Night Finale',
    location: '📍 City Palace, Jaipur, Rajasthan',
  },
  {
    id: 'mock-5',
    username: 'Ananya_Das',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ananya',
    tag: 'Dance',
    created_at: '2026-10-01T16:00:00Z',
    like_count: 263,
    comment_count: 40,
    image_url: 'https://images.unsplash.com/photo-1543482862-68f4a59aff88?auto=format&fit=crop&w=900&q=80',
    description: '🌿 Bihu in Guwahati was electric this year! 600+ dancers performing simultaneously at Sarusajai Stadium — the dhol beats you feel in your chest, the mekhela chador colours make the whole ground look like a painting. Proud to be Assamese 💚 I recorded every minute! #BihuFestival #Assam #NortheastIndia',
    event: 'Rongali Bihu Cultural Utsav 2026',
    location: '📍 Sarusajai Stadium, Guwahati, Assam',
  },
  {
    id: 'mock-6',
    username: 'Vikram_Tiwari',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Vikram',
    tag: 'Festival',
    created_at: '2026-09-30T19:00:00Z',
    like_count: 441,
    comment_count: 66,
    image_url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=900&q=80',
    description: '🪔 Diwali Mela at Connaught Place, Delhi — fireworks, mithai stalls, dandiya circles, and diyas everywhere the eye can see. This isn\'t just a festival, it\'s a collective emotion. Met people from 12 different states all celebrating together as one. India is beautiful 🇮🇳 #Diwali2026 #DelhiDiwali #FestivalOfLights',
    event: 'Delhi Diwali Mela & Light Show 2026',
    location: '📍 Connaught Place, New Delhi',
  },
  {
    id: 'mock-7',
    username: 'Meera_Pillai',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Meera',
    tag: 'Music',
    created_at: '2026-09-28T17:00:00Z',
    like_count: 197,
    comment_count: 28,
    image_url: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=900&q=80',
    description: '🎶 Attended the Carnatic Music Sangamam in Chennai — a 6-hour concert featuring three generations of the same family performing together. The young grandson, barely 14, played the mridangam with precision that left the audience speechless. This is how culture lives on 🎵 #CarnaticMusic #Chennai #MusikaUtsav',
    event: 'Carnatic Music Sangamam — Tri-Gen Concert',
    location: '📍 Music Academy, Chennai, Tamil Nadu',
  },
  {
    id: 'mock-8',
    username: 'Siddharth_Kulkarni',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Siddharth',
    tag: 'Festival',
    created_at: '2026-09-26T21:00:00Z',
    like_count: 318,
    comment_count: 49,
    image_url: 'https://images.unsplash.com/photo-1574391884720-bbc3740c59d1?auto=format&fit=crop&w=900&q=80',
    description: '💃 Navratri in Ahmedabad is a completely different universe! The entire city becomes a dance floor from 9 PM to 4 AM for 9 nights straight. 50,000+ people doing Garba in perfect synchrony — even if you\'ve seen it 10 times it still blows your mind every single year. #Navratri2026 #Garba #Ahmedabad #Gujarat',
    event: 'Ahmedabad Navratri Garba Mahotsav 2026',
    location: '📍 GMDC Ground, Ahmedabad, Gujarat',
  },
  {
    id: 'mock-9',
    username: 'Divya_Krishnan',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Divya',
    tag: 'Craft',
    created_at: '2026-09-24T12:00:00Z',
    like_count: 152,
    comment_count: 19,
    image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=900&q=80',
    description: '🖌️ The Surajkund Crafts Mela never disappoints! Spent the whole day with Madhubani painters from Bihar, Warli artists from Maharashtra, and Pattachitra craftsmen from Odisha — all in one place. Bought a hand-painted silk sari directly from the weaver. This is what supporting local artisans looks like 🙌 #SurajkundMela #HandiCraft #MadeInIndia',
    event: 'Surajkund International Crafts Mela 2026',
    location: '📍 Surajkund, Faridabad, Haryana',
  },
  {
    id: 'mock-10',
    username: 'Karthik_Raju',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Karthik',
    tag: 'Food',
    created_at: '2026-09-22T13:00:00Z',
    like_count: 276,
    comment_count: 38,
    image_url: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=900&q=80',
    description: '🍛 The Andhra Food Festival at Hyderabad\'s Necklace Road had me trying 40+ regional dishes I\'d never even heard of! Royyala Vepudu (prawn fry), Pesarattu, Gongura Mutton, Bobbatlu... each dish carries the story of a different district. Food IS culture. I\'ll be back next year with a bigger appetite 😂 #AndhraFood #Hyderabad #FoodFestival',
    event: 'Andhra Regional Food Festival 2026',
    location: '📍 Necklace Road, Hyderabad, Telangana',
  },
];

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

    // Tag color map
    const TAG_COLORS = {
      Dance:    { bg: '#FFF0E8', border: '#F4A57A', text: '#B84A1C' },
      Festival: { bg: '#FEF3CD', border: '#F5C842', text: '#7A5C00' },
      Music:    { bg: '#E8F4FD', border: '#7DC5EF', text: '#1A5C8A' },
      Heritage: { bg: '#EDFAF1', border: '#6FCF97', text: '#1A6B3A' },
      Craft:    { bg: '#F3EAFF', border: '#B98FE0', text: '#5B2D8E' },
      Food:     { bg: '#FFF5F5', border: '#F08080', text: '#9B2335' },
      General:  { bg: '#F4F4F4', border: '#CCCCCC', text: '#555555' },
    };
    const getTagColor = (tag) => TAG_COLORS[tag] || TAG_COLORS.General;

    // Merge: real posts first (newest), then mock posts
    const allPosts = [
      ...posts.map(p => ({ ...p, isMock: false })),
      ...MOCK_POSTS.map(p => ({ ...p, isMock: true })),
    ];

    return (
        <div className="min-h-screen pt-24 pb-12 theme-transition" style={{ backgroundColor: 'var(--theme-bg-primary)' }}>
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">

            {/* ── Rich Page Hero Header ── */}
            <div className="mb-8 rounded-3xl overflow-hidden" style={{ border: '1px solid var(--theme-border)', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
              {/* Top accent gradient strip */}
              <div style={{ height: 5, background: 'linear-gradient(90deg, var(--theme-accent-primary), #E8975A, #C1502E, var(--theme-accent-jade))' }} />

              <div className="px-8 py-8" style={{ backgroundColor: 'var(--theme-card-bg)' }}>
                <div className="space-y-3">
                  {/* Badge pill */}
                  <span
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full"
                    style={{ background: 'var(--theme-bg-accent)', border: '1px solid var(--theme-border)', color: 'var(--theme-accent-primary)' }}
                  >
                    <span>🌍</span> CultureConnect Community
                  </span>

                  {/* Heading */}
                  <h1 className="font-serif font-black leading-tight" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', color: 'var(--theme-text-primary)' }}>
                    Cultural <span style={{ color: 'var(--theme-accent-primary)' }}>Feed</span>
                  </h1>

                  {/* Subtitle */}
                  <p className="text-sm leading-relaxed max-w-lg" style={{ color: 'var(--theme-text-secondary)' }}>
                    Real moments from festivals, dances, food trails &amp; heritage events — shared by people across India.
                  </p>
                </div>
              </div>
            </div>

            {/* Create Post Box */}
            <div className="mb-8 p-5 rounded-2xl border shadow-sm theme-transition" style={{ backgroundColor: 'var(--theme-card-bg)', borderColor: 'var(--theme-border)' }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-base font-bold" style={{ background: 'var(--theme-bg-accent)', color: 'var(--theme-accent-primary)', border: '1.5px solid var(--theme-border)' }}>
                  {username ? username[0].toUpperCase() : '?'}
                </div>
                <h2 className="text-base font-bold" style={{ color: 'var(--theme-text-primary)' }}>Share Your Cultural Moment</h2>
              </div>
              {error && <p className="text-sm font-bold mb-3" style={{ color: '#C1502E' }}>{error}</p>}
              <form onSubmit={handlePostSubmit} className="flex flex-col gap-3">
                <input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                  className="p-2 rounded-lg border text-sm theme-transition"
                  style={{ backgroundColor: 'var(--theme-input-bg)', color: 'var(--theme-text-primary)', borderColor: 'var(--theme-border)' }}
                />
                <textarea
                  placeholder="Describe your cultural moment..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="p-3 rounded-xl border text-sm min-h-[90px] resize-none theme-transition"
                  style={{ backgroundColor: 'var(--theme-input-bg)', color: 'var(--theme-text-primary)', borderColor: 'var(--theme-border)' }}
                />
                <input
                  type="text"
                  placeholder="Tag (e.g., Dance, Food, Festival, Heritage...)"
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                  className="p-3 rounded-xl border text-sm theme-transition"
                  style={{ backgroundColor: 'var(--theme-input-bg)', color: 'var(--theme-text-primary)', borderColor: 'var(--theme-border)' }}
                />
                <button
                  type="submit"
                  disabled={isPosting}
                  className="self-start px-6 py-2.5 rounded-xl font-bold text-sm transition-all hover:opacity-90 active:scale-95 disabled:opacity-50"
                  style={{ background: 'var(--theme-btn-bg)', color: 'var(--theme-btn-text)', boxShadow: '0 2px 8px rgba(193,80,46,0.2)' }}
                >
                  {isPosting ? 'Posting...' : '✨ Post'}
                </button>
              </form>
            </div>

            {/* Feed Posts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {allPosts.length === 0 ? (
                <p className="text-center py-16 italic" style={{ color: 'var(--theme-text-muted)' }}>No posts yet. Be the first to share!</p>
              ) : (
                allPosts.map(post => {
                  const tc = getTagColor(post.tag);
                  const imgSrc = post.isMock
                    ? post.image_url
                    : (post.image_url && post.image_url.startsWith('http') ? post.image_url : `${API_BASE_URL}${post.image_url}`);

                  return (
                    <div
                      key={post.id}
                      id={`post-${post.id}`}
                      className="rounded-2xl border overflow-hidden shadow-sm theme-transition"
                      style={{ backgroundColor: 'var(--theme-card-bg)', borderColor: 'var(--theme-border)' }}
                    >
                      {/* Post Header — Avatar + Username + Date */}
                      <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: 'var(--theme-border)', backgroundColor: 'var(--theme-bg-secondary)' }}>
                        <div className="flex items-center gap-3">
                          {post.avatar ? (
                            <img src={post.avatar} alt={post.username} className="w-10 h-10 rounded-full border-2" style={{ borderColor: 'var(--theme-border)' }} />
                          ) : (
                            <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm" style={{ background: 'var(--theme-bg-accent)', color: 'var(--theme-accent-primary)', border: '2px solid var(--theme-border)' }}>
                              {post.username ? post.username[0].toUpperCase() : 'U'}
                            </div>
                          )}
                          <div>
                            {post.isMock ? (
                              <span className="font-bold text-sm" style={{ color: 'var(--theme-text-primary)' }}>{post.username}</span>
                            ) : (
                              <Link to={`/profile/${post.username}`} className="font-bold text-sm hover:underline" style={{ color: 'var(--theme-text-primary)' }}>
                                {post.username}
                              </Link>
                            )}
                            <div className="text-xs mt-0.5" style={{ color: 'var(--theme-text-muted)' }}>
                              {new Date(post.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {/* Tag pill */}
                          <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ backgroundColor: tc.bg, color: tc.text, border: `1px solid ${tc.border}` }}>
                            {post.tag}
                          </span>
                          {role === 'admin' && !post.isMock && (
                            <button onClick={() => handleDeletePost(post.id)} className="text-xs font-bold px-2 py-1 rounded-lg border transition-colors hover:opacity-80" style={{ color: '#C1502E', borderColor: '#C1502E' }}>
                              Delete
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Event Banner (mock posts only) */}
                      {post.isMock && post.event && (
                        <div className="px-5 py-2.5 flex items-center gap-2 border-b" style={{ backgroundColor: 'var(--theme-bg-accent)', borderColor: 'var(--theme-border)' }}>
                          <span className="text-xs">🎪</span>
                          <div className="flex-1 min-w-0">
                            <span className="text-xs font-bold" style={{ color: 'var(--theme-text-primary)' }}>{post.event}</span>
                          </div>
                          <span className="text-xs flex-shrink-0" style={{ color: 'var(--theme-text-muted)' }}>{post.location}</span>
                        </div>
                      )}

                      {/* Post Image */}
                      {imgSrc && (
                        <img
                          src={imgSrc}
                          alt={post.description}
                          className="w-full object-cover"
                          style={{ maxHeight: 480 }}
                          onError={(e) => { e.target.style.display = 'none'; }}
                        />
                      )}

                      {/* Post Body */}
                      <div className="px-5 pt-4 pb-2">
                        <p className="text-sm leading-relaxed" style={{ color: 'var(--theme-text-primary)' }}>
                          {post.description}
                        </p>
                      </div>

                      {/* Social Actions */}
                      <div className="px-5 py-3 flex items-center gap-4 border-t" style={{ borderColor: 'var(--theme-border)' }}>
                        <button
                          onClick={() => !post.isMock && handleLike(post.id)}
                          className="flex items-center gap-1.5 text-sm font-semibold transition-colors hover:opacity-70"
                          style={{ color: 'var(--theme-text-secondary)' }}
                        >
                          <span>❤️</span>
                          <span>{post.like_count || 0}</span>
                        </button>
                        <button
                          onClick={() => !post.isMock && fetchComments(post.id)}
                          className="flex items-center gap-1.5 text-sm font-semibold transition-colors hover:opacity-70"
                          style={{ color: 'var(--theme-text-secondary)' }}
                        >
                          <span>💬</span>
                          <span>{post.comment_count || 0}</span>
                        </button>

                        {/* Share icons */}
                        <div className="flex items-center gap-0.5 ml-auto">
                          <span className="text-xs font-bold uppercase tracking-wider mr-1" style={{ color: 'var(--theme-text-muted)' }}>Share</span>
                          <button onClick={() => handleShare('whatsapp', post)} title="WhatsApp" className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-green-100 hover:scale-110 transition-all duration-200">
                            <svg className="w-4 h-4 text-green-500" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                          </button>
                          <button onClick={() => handleShare('facebook', post)} title="Facebook" className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-blue-100 hover:scale-110 transition-all duration-200">
                            <svg className="w-4 h-4 text-blue-600" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                          </button>
                          <button onClick={() => handleShare('twitter', post)} title="Twitter / X" className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-200 hover:scale-110 transition-all duration-200">
                            <svg className="w-4 h-4 text-gray-800" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
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

                      {/* Comments Section (real posts only) */}
                      {!post.isMock && visibleComments[post.id] && (
                        <div className="mx-5 mb-4 mt-1 rounded-xl p-4 border theme-transition" style={{ backgroundColor: 'var(--theme-bg-secondary)', borderColor: 'var(--theme-border)' }}>
                          <div className="flex flex-col gap-2 mb-3 max-h-40 overflow-y-auto">
                            {visibleComments[post.id].length === 0 ? (
                              <p className="text-xs italic" style={{ color: 'var(--theme-text-muted)' }}>No comments yet.</p>
                            ) : (
                              visibleComments[post.id].map(c => (
                                <div key={c.id} className="text-sm border-l-2 pl-3 flex justify-between items-start" style={{ borderColor: 'var(--theme-accent-primary)' }}>
                                  <div>
                                    <span className="font-bold">{c.username}: </span>
                                    <span style={{ color: 'var(--theme-text-secondary)' }}>{c.text}</span>
                                  </div>
                                  {role === 'admin' && (
                                    <button onClick={() => handleDeleteComment(c.id, post.id)} className="text-xs font-bold ml-2 opacity-60 hover:opacity-100" style={{ color: '#C1502E' }}>[X]</button>
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
                                className="flex-1 p-2 rounded-lg border text-xs theme-transition"
                                style={{ backgroundColor: 'var(--theme-input-bg)', color: 'var(--theme-text-primary)', borderColor: 'var(--theme-border)' }}
                              />
                              <button type="submit" className="px-4 rounded-lg text-xs font-bold transition-all hover:opacity-90" style={{ background: 'var(--theme-btn-bg)', color: 'var(--theme-btn-text)' }}>
                                Post
                              </button>
                            </form>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
        </div>
        </div>
    );
};

export default Feed;

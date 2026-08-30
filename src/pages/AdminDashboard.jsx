import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [stats, setStats] = useState(null);
    const [users, setUsers] = useState([]);
    const [loginLogs, setLoginLogs] = useState([]);
    const [adminPlaces, setAdminPlaces] = useState([]);
    const [activeTab, setActiveTab] = useState('overview');
    const [loading, setLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [deleteConfirm, setDeleteConfirm] = useState(null);
    const [deletePlaceConfirm, setDeletePlaceConfirm] = useState(null);
    const [lastUpdated, setLastUpdated] = useState(null);
    const [isPlaceModalOpen, setIsPlaceModalOpen] = useState(false);
    const [editingPlace, setEditingPlace] = useState(null);
    const [placeForm, setPlaceForm] = useState({
        name: '',
        city: 'Hyderabad',
        state: 'Telangana',
        category: 'Historical Monument',
        shortDescription: '',
        fullDescription: '',
        history: '',
        culturalSignificance: '',
        architecture: '',
        address: '',
        openingHours: '9:00 AM – 5:30 PM',
        entryFee: '₹25 for Indians; ₹300 for Foreigners',
        visitDuration: '1 – 2 hours',
        bestTimeToVisit: 'October to March',
        bannerImage: '',
        famousFor: ''
    });

    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    useEffect(() => {
        if (!token) {
            navigate('/login');
            return;
        }
        if (role !== 'admin') {
            setError(`Logged in as "${localStorage.getItem('username') || 'User'}", which does not have admin permissions.`);
            setLoading(false);
            return;
        }
        fetchAll();
    }, []);

    const fetchAll = async (showRefreshAnimation = false) => {
        if (showRefreshAnimation) setIsRefreshing(true);
        else setLoading(true);

        try {
            const headers = { 'Authorization': `Bearer ${token}` };
            const [statsRes, usersRes, logsRes, placesRes] = await Promise.allSettled([
                fetch(`${API_BASE_URL}/api/admin/dashboard-stats`, { headers }),
                fetch(`${API_BASE_URL}/api/admin/users`, { headers }),
                fetch(`${API_BASE_URL}/api/admin/login-logs?limit=200`, { headers }),
                fetch(`${API_BASE_URL}/api/places`),
            ]);

            if (statsRes.status === 'fulfilled' && statsRes.value.ok) {
                const statsData = await statsRes.value.json();
                setStats(statsData);
            }
            if (usersRes.status === 'fulfilled' && usersRes.value.ok) {
                const usersData = await usersRes.value.json();
                setUsers(usersData);
            }
            if (logsRes.status === 'fulfilled' && logsRes.value.ok) {
                const logsData = await logsRes.value.json();
                setLoginLogs(logsData);
            }
            if (placesRes.status === 'fulfilled' && placesRes.value.ok) {
                const placesData = await placesRes.value.json();
                if (Array.isArray(placesData)) setAdminPlaces(placesData);
            }

            setLastUpdated(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
        } catch (err) {
            setError('Failed to load admin telemetry data. Please ensure you are logged in as admin.');
        } finally {
            setLoading(false);
            setIsRefreshing(false);
        }
    };

    const handleDeleteUser = async (userId) => {
        try {
            const res = await fetch(`${API_BASE_URL}/api/admin/users/${userId}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                setUsers(prev => prev.filter(u => u.id !== userId));
                setDeleteConfirm(null);
            }
        } catch (err) {
            console.error('Delete failed', err);
        }
    };

    const handleDeletePlace = async (placeId) => {
        try {
            const res = await fetch(`${API_BASE_URL}/api/places/${placeId}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                setAdminPlaces(prev => prev.filter(p => (p.id || p._id) !== placeId));
                setDeletePlaceConfirm(null);
            }
        } catch (err) {
            console.error('Delete place failed', err);
        }
    };

    const handleOpenCreatePlace = () => {
        setEditingPlace(null);
        setPlaceForm({
            name: '',
            city: 'Hyderabad',
            state: 'Telangana',
            category: 'Historical Monument',
            shortDescription: '',
            fullDescription: '',
            history: '',
            culturalSignificance: '',
            architecture: '',
            address: '',
            openingHours: '9:00 AM – 5:30 PM',
            entryFee: '₹25 for Indians; ₹300 for Foreigners',
            visitDuration: '1 – 2 hours',
            bestTimeToVisit: 'October to March',
            bannerImage: '',
            famousFor: ''
        });
        setIsPlaceModalOpen(true);
    };

    const handleOpenEditPlace = (place) => {
        setEditingPlace(place);
        setPlaceForm({
            name: place.name || '',
            city: place.city || 'Hyderabad',
            state: place.state || 'Telangana',
            category: place.category || 'Historical Monument',
            shortDescription: place.shortDescription || '',
            fullDescription: place.fullDescription || '',
            history: place.history || '',
            culturalSignificance: place.culturalSignificance || '',
            architecture: place.architecture || '',
            address: place.address || '',
            openingHours: place.openingHours || '9:00 AM – 5:30 PM',
            entryFee: place.entryFee || '₹25 for Indians; ₹300 for Foreigners',
            visitDuration: place.visitDuration || '1 – 2 hours',
            bestTimeToVisit: place.bestTimeToVisit || 'October to March',
            bannerImage: place.bannerImage || (place.images && place.images[0]) || '',
            famousFor: place.famousFor || ''
        });
        setIsPlaceModalOpen(true);
    };

    const handleSavePlace = async (e) => {
        e.preventDefault();
        try {
            const url = editingPlace
                ? `${API_BASE_URL}/api/places/${editingPlace.id || editingPlace._id}`
                : `${API_BASE_URL}/api/places`;
            const method = editingPlace ? 'PUT' : 'POST';

            const payload = {
                ...placeForm,
                images: placeForm.bannerImage ? [placeForm.bannerImage] : []
            };

            const res = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                const data = await res.json();
                if (editingPlace) {
                    setAdminPlaces(prev => prev.map(p => (p.id || p._id) === (editingPlace.id || editingPlace._id) ? { ...p, ...payload } : p));
                } else if (data.place) {
                    setAdminPlaces(prev => [data.place, ...prev]);
                }
                setIsPlaceModalOpen(false);
            }
        } catch (err) {
            console.error('Save place failed', err);
        }
    };

    const formatDate = (d) => {
        if (!d) return '—';
        const dateObj = new Date(d);
        if (isNaN(dateObj.getTime())) return '—';
        return dateObj.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    };

    const formatRelativeTime = (d) => {
        if (!d) return '';
        const dateObj = new Date(d);
        const now = new Date();
        const diffMs = now - dateObj;
        const diffMins = Math.floor(diffMs / 60000);
        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins}m ago`;
        const diffHours = Math.floor(diffMins / 60);
        if (diffHours < 24) return `${diffHours}h ago`;
        const diffDays = Math.floor(diffHours / 24);
        if (diffDays < 7) return `${diffDays}d ago`;
        return dateObj.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' });
    };

    const filteredUsers = users.filter(u =>
        u.username?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredLogs = loginLogs.filter(l =>
        l.username?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Clean Line SVG Icons
    const Icons = {
        Users: () => (
            <svg className="w-5 h-5 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.109A12.018 12.018 0 0112 22.5c-2.91 0-5.523-1.035-7.545-2.754v-.09c0-1.113.285-2.16.786-3.07M12 18.75a6.002 6.002 0 00-6-6H4.5A2.25 2.25 0 002.25 15v2.25m18 0V15a2.25 2.25 0 00-2.25-2.25H18a6.002 6.002 0 00-6 6M15 7.5a3 3 0 11-6 0 3 3 0 016 0zm6.75 3a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm-16.5 0a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0z" />
            </svg>
        ),
        Key: () => (
            <svg className="w-5 h-5 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
            </svg>
        ),
        Document: () => (
            <svg className="w-5 h-5 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
        ),
        Chat: () => (
            <svg className="w-5 h-5 text-rose-600 dark:text-rose-400" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
        ),
        Calendar: () => (
            <svg className="w-5 h-5 text-sky-600 dark:text-sky-400" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
            </svg>
        ),
        Ticket: () => (
            <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-12v.75m0 3v.75m0 3v.75m0 3V18M3 7.5A1.5 1.5 0 014.5 6h15A1.5 1.5 0 0121 7.5v9a1.5 1.5 0 01-1.5 1.5h-15A1.5 1.5 0 013 16.5v-9z" />
            </svg>
        ),
        TrendUp: () => (
            <svg className="w-5 h-5 text-teal-600 dark:text-teal-400" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.94" />
            </svg>
        ),
        Lightning: () => (
            <svg className="w-5 h-5 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
            </svg>
        ),
        Refresh: () => (
            <svg className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
        )
    };

    // Fable-style Soft Avatar
    const getAvatarBg = (username) => {
        if (!username) return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300';
        const colors = [
            'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300 border-indigo-200/60 dark:border-indigo-800/40',
            'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300 border-emerald-200/60 dark:border-emerald-800/40',
            'bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300 border-amber-200/60 dark:border-amber-800/40',
            'bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300 border-rose-200/60 dark:border-rose-800/40',
            'bg-purple-50 text-purple-700 dark:bg-purple-950/50 dark:text-purple-300 border-purple-200/60 dark:border-purple-800/40',
            'bg-teal-50 text-teal-700 dark:bg-teal-950/50 dark:text-teal-300 border-teal-200/60 dark:border-teal-800/40',
        ];
        let hash = 0;
        for (let i = 0; i < username.length; i++) {
            hash = username.charCodeAt(i) + ((hash << 5) - hash);
        }
        return colors[Math.abs(hash) % colors.length];
    };

    const UserAvatar = ({ username, isAdmin }) => {
        const initials = username?.[0]?.toUpperCase() || '?';
        const bgStyle = getAvatarBg(username);
        return (
            <div className={`w-8 h-8 rounded-full border flex items-center justify-center font-bold text-xs ${bgStyle} relative flex-shrink-0`}>
                {initials}
                {isAdmin && (
                    <span className="absolute -top-0.5 -right-0.5 bg-amber-500 text-white rounded-full w-3.5 h-3.5 flex items-center justify-center text-[8px] border border-white dark:border-slate-900" title="Admin">
                        👑
                    </span>
                )}
            </div>
        );
    };

    // Fable Pastel Soft Badges
    const Badge = ({ type, children }) => {
        const styles = {
            posts: 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border-indigo-200/50 dark:border-indigo-900/30',
            comments: 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200/50 dark:border-emerald-900/30',
            bookings: 'bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border-purple-200/50 dark:border-purple-900/30',
            admin: 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-200/50 dark:border-amber-900/30',
            user: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700',
            default: 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700',
        };
        const styleClass = styles[type] || styles.default;
        return (
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${styleClass}`}>
                {children}
            </span>
        );
    };

    // Fable-Style Clean Pleasant Stat Card
    const StatCard = ({ value, label, icon, bgTint }) => (
        <div className="bg-[var(--theme-card-bg)] border border-[var(--theme-border)] rounded-2xl p-5 shadow-sm hover:border-[var(--theme-text-primary)]/20 transition-all duration-200 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-[var(--theme-text-muted)] tracking-tight">
                    {label}
                </span>
                <div className={`w-9 h-9 rounded-xl ${bgTint} flex items-center justify-center`}>
                    {icon}
                </div>
            </div>

            <div>
                <div className="text-2xl font-black text-[var(--theme-text-primary)] font-sans tracking-tight">
                    {value !== undefined && value !== null ? value.toLocaleString() : 0}
                </div>
            </div>
        </div>
    );

    // Fable-Style Serene Mini Chart
    const MiniChart = ({ data, colorClass, label }) => {
        if (!data || data.length === 0) {
            return (
                <div className="bg-[var(--theme-card-bg)] border border-[var(--theme-border)] rounded-2xl p-6 flex items-center justify-center min-h-[200px]">
                    <div className="text-center text-[var(--theme-text-muted)] text-xs">
                        No activity metrics recorded
                    </div>
                </div>
            );
        }

        const maxVal = Math.max(...data.map(d => d.count), 1);
        const totalCount = data.reduce((acc, curr) => acc + curr.count, 0);

        return (
            <div className="bg-[var(--theme-card-bg)] border border-[var(--theme-border)] rounded-2xl p-6 shadow-sm flex flex-col justify-between">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h3 className="text-sm font-bold text-[var(--theme-text-primary)]">{label}</h3>
                        <p className="text-[11px] text-[var(--theme-text-muted)]">30-day activity trend</p>
                    </div>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[var(--theme-bg-accent)] text-[var(--theme-text-primary)] border border-[var(--theme-border)]">
                        {totalCount} total
                    </span>
                </div>

                <div className="flex gap-1.5 h-28 items-end pt-2 pb-2">
                    {data.map((d, i) => {
                        const pct = Math.max((d.count / maxVal) * 100, 5);
                        return (
                            <div 
                                key={i} 
                                className="flex-1 flex flex-col items-center h-full justify-end group relative"
                            >
                                <div className="absolute bottom-full mb-1.5 hidden group-hover:block z-20 pointer-events-none">
                                    <div className="bg-slate-900 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow whitespace-nowrap">
                                        {d._id}: {d.count}
                                    </div>
                                </div>

                                <div 
                                    style={{ height: `${pct}%` }}
                                    className={`w-full rounded-t ${colorClass} opacity-85 group-hover:opacity-100 transition-all duration-200`}
                                />
                            </div>
                        );
                    })}
                </div>

                <div className="flex justify-between mt-3 text-[10px] font-medium text-[var(--theme-text-muted)]">
                    <span>{data[0]?._id}</span>
                    <span>{data[data.length - 1]?._id}</span>
                </div>
            </div>
        );
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center p-6" style={{ backgroundColor: 'var(--theme-bg-primary)' }}>
                <div className="text-center">
                    <div className="w-10 h-10 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
                    <p className="text-xs font-medium text-[var(--theme-text-muted)]">Loading Admin Dashboard...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center p-6" style={{ backgroundColor: 'var(--theme-bg-primary)' }}>
                <div className="bg-[var(--theme-card-bg)] border border-[var(--theme-border)] rounded-2xl p-8 max-w-sm w-full text-center shadow-sm">
                    <div className="text-3xl mb-3">🔒</div>
                    <h2 className="text-base font-bold text-[var(--theme-text-primary)] mb-1">Access Restricted</h2>
                    <p className="text-xs text-[var(--theme-text-muted)] mb-5">{error}</p>
                    <button 
                        onClick={() => { localStorage.clear(); navigate('/admin/login'); }}
                        className="w-full py-2.5 px-4 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-bold text-xs shadow-sm hover:opacity-90 transition-opacity cursor-pointer"
                    >
                        Sign In as Admin
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-8" style={{ backgroundColor: 'var(--theme-bg-primary)' }}>
            
            {/* Fable Style Clean Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--theme-border)] pb-6">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                        <span className="text-[11px] font-semibold text-[var(--theme-text-muted)] uppercase tracking-wider">
                            System Control • Live
                        </span>
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight text-[var(--theme-text-primary)]">
                        Admin Dashboard
                    </h1>
                    <p className="text-xs text-[var(--theme-text-muted)] mt-0.5">
                        Simple platform oversight, active user management, and session logs.
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    {lastUpdated && (
                        <span className="text-[11px] text-[var(--theme-text-muted)] hidden sm:inline-block">
                            Updated {lastUpdated}
                        </span>
                    )}
                    <button
                        onClick={() => fetchAll(true)}
                        disabled={isRefreshing}
                        className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-card-bg)] text-[var(--theme-text-primary)] hover:bg-[var(--theme-bg-accent)] transition-all font-semibold text-xs cursor-pointer shadow-sm disabled:opacity-50"
                    >
                        <Icons.Refresh />
                        <span>Refresh</span>
                    </button>
                </div>
            </div>

            {/* Fable Style Clean Metric Cards Grid */}
            {stats && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                    <StatCard 
                        value={stats.totalUsers} 
                        label="Total Users" 
                        icon={<Icons.Users />} 
                        bgTint="bg-indigo-50 dark:bg-indigo-950/40"
                    />
                    <StatCard 
                        value={stats.totalLogins} 
                        label="Total Logins" 
                        icon={<Icons.Key />} 
                        bgTint="bg-amber-50 dark:bg-amber-950/40"
                    />
                    <StatCard 
                        value={stats.totalPosts} 
                        label="Total Posts" 
                        icon={<Icons.Document />} 
                        bgTint="bg-emerald-50 dark:bg-emerald-950/40"
                    />
                    <StatCard 
                        value={stats.totalComments} 
                        label="Comments" 
                        icon={<Icons.Chat />} 
                        bgTint="bg-rose-50 dark:bg-rose-950/40"
                    />
                    <StatCard 
                        value={stats.totalEvents} 
                        label="Events" 
                        icon={<Icons.Calendar />} 
                        bgTint="bg-sky-50 dark:bg-sky-950/40"
                    />
                    <StatCard 
                        value={stats.totalBookings} 
                        label="Bookings" 
                        icon={<Icons.Ticket />} 
                        bgTint="bg-purple-50 dark:bg-purple-950/40"
                    />
                    <StatCard 
                        value={stats.recentSignups} 
                        label="Signups (7d)" 
                        icon={<Icons.TrendUp />} 
                        bgTint="bg-teal-50 dark:bg-teal-950/40"
                    />
                    <StatCard 
                        value={stats.recentLogins} 
                        label="Logins (7d)" 
                        icon={<Icons.Lightning />} 
                        bgTint="bg-orange-50 dark:bg-orange-950/40"
                    />
                </div>
            )}

            {/* Fable Clean Charts Section */}
            {stats && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    <MiniChart 
                        data={stats.dailyLogins} 
                        colorClass="bg-indigo-500 dark:bg-indigo-400" 
                        label="Daily Logins" 
                    />
                    <MiniChart 
                        data={stats.dailySignups} 
                        colorClass="bg-emerald-500 dark:bg-emerald-400" 
                        label="Daily Signups" 
                    />
                </div>
            )}

            {/* Fable Pill Navigation Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                <div className="inline-flex p-1 rounded-2xl bg-[var(--theme-bg-accent)] border border-[var(--theme-border)]">
                    {[
                        { id: 'overview', label: 'Overview' },
                        { id: 'places', label: 'Places & Monuments', count: adminPlaces.length },
                        { id: 'users', label: 'Users', count: users.length },
                        { id: 'logins', label: 'Login Audit Logs', count: loginLogs.length },
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => { setActiveTab(tab.id); setSearchTerm(''); }}
                            className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                                activeTab === tab.id
                                    ? 'bg-[var(--theme-card-bg)] text-[var(--theme-text-primary)] shadow-sm'
                                    : 'text-[var(--theme-text-muted)] hover:text-[var(--theme-text-primary)]'
                            }`}
                        >
                            <span>{tab.label}</span>
                            {tab.count !== undefined && (
                                <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-slate-200/60 dark:bg-slate-800 text-[var(--theme-text-muted)]">
                                    {tab.count}
                                </span>
                            )}
                        </button>
                    ))}
                </div>

                {activeTab !== 'overview' && (
                    <div className="relative w-full sm:w-72">
                        <input
                            type="text"
                            placeholder={activeTab === 'users' ? 'Filter users...' : 'Filter logs...'}
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            className="w-full px-3.5 py-2 rounded-xl border text-xs font-medium focus:outline-none focus:ring-1 focus:ring-slate-400 transition-all"
                            style={{
                                backgroundColor: 'var(--theme-input-bg)',
                                borderColor: 'var(--theme-border)',
                                color: 'var(--theme-text-primary)'
                            }}
                        />
                        {searchTerm && (
                            <button
                                onClick={() => setSearchTerm('')}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs"
                            >
                                ✕
                            </button>
                        )}
                    </div>
                )}
            </div>

            {/* TAB 1: OVERVIEW */}
            {activeTab === 'overview' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    {/* Recent Registrations */}
                    <div className="bg-[var(--theme-card-bg)] border border-[var(--theme-border)] rounded-2xl p-5 shadow-sm">
                        <div className="flex items-center justify-between mb-4 pb-3 border-b border-[var(--theme-border)]">
                            <h3 className="text-sm font-bold text-[var(--theme-text-primary)]">Recent Users</h3>
                            <button 
                                onClick={() => setActiveTab('users')}
                                className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
                            >
                                View all →
                            </button>
                        </div>
                        <div className="divide-y divide-[var(--theme-border)]/60">
                            {users.slice(0, 5).map((u) => (
                                <div key={u.id} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                                    <div className="flex items-center gap-3">
                                        <UserAvatar username={u.username} isAdmin={false} />
                                        <div>
                                            <div className="font-semibold text-xs text-[var(--theme-text-primary)]">{u.username}</div>
                                            <div className="text-[11px] text-[var(--theme-text-muted)]">Joined {formatRelativeTime(u.createdAt)}</div>
                                        </div>
                                    </div>
                                    <Badge type="posts">{u.postCount || 0} posts</Badge>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recent Logins */}
                    <div className="bg-[var(--theme-card-bg)] border border-[var(--theme-border)] rounded-2xl p-5 shadow-sm">
                        <div className="flex items-center justify-between mb-4 pb-3 border-b border-[var(--theme-border)]">
                            <h3 className="text-sm font-bold text-[var(--theme-text-primary)]">Recent Logins</h3>
                            <button 
                                onClick={() => setActiveTab('logins')}
                                className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
                            >
                                View logs →
                            </button>
                        </div>
                        <div className="divide-y divide-[var(--theme-border)]/60">
                            {loginLogs.slice(0, 5).map((l) => (
                                <div key={l._id} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                                    <div className="flex items-center gap-3">
                                        <UserAvatar username={l.username} isAdmin={l.isAdmin} />
                                        <div>
                                            <div className="font-semibold text-xs text-[var(--theme-text-primary)]">{l.username}</div>
                                            <div className="text-[11px] text-[var(--theme-text-muted)]">{formatRelativeTime(l.loginAt)}</div>
                                        </div>
                                    </div>
                                    <Badge type={l.isAdmin ? 'admin' : 'user'}>{l.isAdmin ? 'Admin' : 'User'}</Badge>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* TAB 2: USERS TABLE */}
            {activeTab === 'users' && (
                <div className="bg-[var(--theme-card-bg)] border border-[var(--theme-border)] rounded-2xl overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse text-left">
                            <thead>
                                <tr className="bg-[var(--theme-bg-accent)] border-b border-[var(--theme-border)]">
                                    <th className="px-5 py-3.5 text-[11px] font-bold uppercase tracking-wider text-[var(--theme-text-muted)]">User</th>
                                    <th className="px-5 py-3.5 text-[11px] font-bold uppercase tracking-wider text-[var(--theme-text-muted)]">Joined</th>
                                    <th className="px-5 py-3.5 text-[11px] font-bold uppercase tracking-wider text-[var(--theme-text-muted)]">Last Active</th>
                                    <th className="px-5 py-3.5 text-[11px] font-bold uppercase tracking-wider text-[var(--theme-text-muted)]">Posts</th>
                                    <th className="px-5 py-3.5 text-[11px] font-bold uppercase tracking-wider text-[var(--theme-text-muted)]">Comments</th>
                                    <th className="px-5 py-3.5 text-[11px] font-bold uppercase tracking-wider text-[var(--theme-text-muted)]">Bookings</th>
                                    <th className="px-5 py-3.5 text-[11px] font-bold uppercase tracking-wider text-[var(--theme-text-muted)] text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[var(--theme-border)]/50">
                                {filteredUsers.map((u) => (
                                    <tr key={u.id} className="hover:bg-[var(--theme-bg-accent)]/50 transition-colors">
                                        <td className="px-5 py-3.5 text-xs">
                                            <div className="flex items-center gap-3">
                                                <UserAvatar username={u.username} isAdmin={false} />
                                                <span className="font-semibold text-[var(--theme-text-primary)]">{u.username}</span>
                                            </div>
                                        </td>
                                        <td className="px-5 py-3.5 text-xs text-[var(--theme-text-muted)]">{formatDate(u.createdAt)}</td>
                                        <td className="px-5 py-3.5 text-xs text-[var(--theme-text-muted)]">{formatDate(u.lastLogin)}</td>
                                        <td className="px-5 py-3.5 text-xs"><Badge type="posts">{u.postCount || 0}</Badge></td>
                                        <td className="px-5 py-3.5 text-xs"><Badge type="comments">{u.commentCount || 0}</Badge></td>
                                        <td className="px-5 py-3.5 text-xs"><Badge type="bookings">{u.bookingCount || 0}</Badge></td>
                                        <td className="px-5 py-3.5 text-xs text-right">
                                            <button 
                                                onClick={() => setDeleteConfirm({ id: u.id, username: u.username })}
                                                className="text-[11px] font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/50 px-2.5 py-1 rounded-lg border border-rose-200/50 dark:border-rose-900/30 transition-all cursor-pointer"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {filteredUsers.length === 0 && (
                        <div className="text-center py-12 text-[var(--theme-text-muted)] text-xs">
                            No users matching "{searchTerm}"
                        </div>
                    )}
                </div>
            )}

            {/* TAB 3: LOGIN LOGS TABLE */}
            {activeTab === 'logins' && (
                <div className="bg-[var(--theme-card-bg)] border border-[var(--theme-border)] rounded-2xl overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse text-left">
                            <thead>
                                <tr className="bg-[var(--theme-bg-accent)] border-b border-[var(--theme-border)]">
                                    <th className="px-5 py-3.5 text-[11px] font-bold uppercase tracking-wider text-[var(--theme-text-muted)]">User</th>
                                    <th className="px-5 py-3.5 text-[11px] font-bold uppercase tracking-wider text-[var(--theme-text-muted)]">Role</th>
                                    <th className="px-5 py-3.5 text-[11px] font-bold uppercase tracking-wider text-[var(--theme-text-muted)]">Login Time</th>
                                    <th className="px-5 py-3.5 text-[11px] font-bold uppercase tracking-wider text-[var(--theme-text-muted)]">IP Address</th>
                                    <th className="px-5 py-3.5 text-[11px] font-bold uppercase tracking-wider text-[var(--theme-text-muted)]">User Agent</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[var(--theme-border)]/50">
                                {filteredLogs.map((l) => (
                                    <tr key={l._id} className="hover:bg-[var(--theme-bg-accent)]/50 transition-colors">
                                        <td className="px-5 py-3.5 text-xs">
                                            <div className="flex items-center gap-2.5">
                                                <UserAvatar username={l.username} isAdmin={l.isAdmin} />
                                                <span className="font-semibold text-[var(--theme-text-primary)]">{l.username}</span>
                                            </div>
                                        </td>
                                        <td className="px-5 py-3.5 text-xs">
                                            <Badge type={l.isAdmin ? 'admin' : 'user'}>{l.isAdmin ? 'Admin' : 'User'}</Badge>
                                        </td>
                                        <td className="px-5 py-3.5 text-xs text-[var(--theme-text-muted)]">{formatDate(l.loginAt)}</td>
                                        <td className="px-5 py-3.5 text-xs font-mono text-[var(--theme-text-muted)]">{l.ip || '127.0.0.1'}</td>
                                        <td className="px-5 py-3.5 text-[11px] text-[var(--theme-text-muted)] max-w-xs truncate" title={l.userAgent}>
                                            {l.userAgent || 'Web Browser'}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {filteredLogs.length === 0 && (
                        <div className="text-center py-12 text-[var(--theme-text-muted)] text-xs">
                            No logs matching "{searchTerm}"
                        </div>
                    )}
                </div>
            )}

            {/* TAB 4: PLACES & MONUMENTS TABLE */}
            {activeTab === 'places' && (
                <div className="space-y-4">
                    <div className="flex items-center justify-between gap-4 flex-wrap">
                        <span className="text-xs font-bold text-[var(--theme-text-muted)]">
                            Manage all cultural landmarks, monuments, and palaces.
                        </span>
                        <button
                            onClick={handleOpenCreatePlace}
                            className="px-4 py-2 rounded-xl text-xs font-bold bg-[var(--theme-accent-primary)] text-white hover:opacity-90 transition-all flex items-center gap-1.5 shadow-sm"
                        >
                            <span>➕</span> Add New Place
                        </button>
                    </div>

                    <div className="bg-[var(--theme-card-bg)] border border-[var(--theme-border)] rounded-2xl overflow-hidden shadow-sm">
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse text-left">
                                <thead>
                                    <tr className="bg-[var(--theme-bg-accent)] border-b border-[var(--theme-border)]">
                                        <th className="px-5 py-3.5 text-[11px] font-bold uppercase tracking-wider text-[var(--theme-text-muted)]">Place / Monument</th>
                                        <th className="px-5 py-3.5 text-[11px] font-bold uppercase tracking-wider text-[var(--theme-text-muted)]">City & State</th>
                                        <th className="px-5 py-3.5 text-[11px] font-bold uppercase tracking-wider text-[var(--theme-text-muted)]">Category</th>
                                        <th className="px-5 py-3.5 text-[11px] font-bold uppercase tracking-wider text-[var(--theme-text-muted)]">Timings & Fees</th>
                                        <th className="px-5 py-3.5 text-[11px] font-bold uppercase tracking-wider text-[var(--theme-text-muted)] text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[var(--theme-border)]/50">
                                    {adminPlaces
                                        .filter(p => 
                                            !searchTerm || 
                                            p.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                                            p.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                            p.category?.toLowerCase().includes(searchTerm.toLowerCase())
                                        )
                                        .map((p) => (
                                            <tr key={p.id || p._id} className="hover:bg-[var(--theme-bg-accent)]/50 transition-colors">
                                                <td className="px-5 py-3.5 text-xs">
                                                    <div className="flex items-center gap-3">
                                                        {p.bannerImage || (p.images && p.images[0]) ? (
                                                            <img 
                                                                src={p.bannerImage || p.images[0]} 
                                                                alt={p.name} 
                                                                className="w-10 h-10 rounded-lg object-cover border border-[var(--theme-border)] flex-shrink-0"
                                                            />
                                                        ) : (
                                                            <div className="w-10 h-10 rounded-lg bg-[var(--theme-bg-accent)] flex items-center justify-center text-sm font-bold text-[var(--theme-accent-primary)]">
                                                                🏛️
                                                            </div>
                                                        )}
                                                        <div>
                                                            <span className="font-bold text-[var(--theme-text-primary)] block">{p.name}</span>
                                                            <span className="text-[11px] text-[var(--theme-text-muted)] line-clamp-1">{p.shortDescription}</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-5 py-3.5 text-xs">
                                                    <span className="font-semibold text-[var(--theme-text-primary)]">{p.city}</span>
                                                    <span className="text-[11px] text-[var(--theme-text-muted)] block">{p.state}</span>
                                                </td>
                                                <td className="px-5 py-3.5 text-xs">
                                                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[var(--theme-bg-accent)] text-[var(--theme-accent-primary)] border border-[var(--theme-border)]">
                                                        {p.category}
                                                    </span>
                                                </td>
                                                <td className="px-5 py-3.5 text-xs text-[var(--theme-text-muted)]">
                                                    <div>{p.openingHours || '9:00 AM – 5:30 PM'}</div>
                                                    <div className="text-[10px] text-[var(--theme-text-secondary)]">{p.entryFee || 'Free / Nominal'}</div>
                                                </td>
                                                <td className="px-5 py-3.5 text-xs text-right whitespace-nowrap">
                                                    <button
                                                        onClick={() => handleOpenEditPlace(p)}
                                                        className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 px-2.5 py-1 rounded-lg border border-indigo-200/50 dark:border-indigo-900/30 transition-all cursor-pointer mr-2"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => setDeletePlaceConfirm({ id: p.id || p._id, name: p.name })}
                                                        className="text-[11px] font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/50 px-2.5 py-1 rounded-lg border border-rose-200/50 dark:border-rose-900/30 transition-all cursor-pointer"
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                        {adminPlaces.length === 0 && (
                            <div className="text-center py-12 text-[var(--theme-text-muted)] text-xs">
                                No places loaded. Click "Add New Place" to create one.
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Place Create/Edit Modal */}
            {isPlaceModalOpen && (
                <div 
                    className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-[9999] p-4 overflow-y-auto"
                    onClick={() => setIsPlaceModalOpen(false)}
                >
                    <div 
                        className="bg-[var(--theme-card-bg)] border border-[var(--theme-border)] rounded-2xl p-6 max-w-2xl w-full shadow-2xl my-8 max-h-[90vh] overflow-y-auto text-left"
                        onClick={e => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between mb-4 pb-3 border-b border-[var(--theme-border)]">
                            <h3 className="text-lg font-serif font-black text-[var(--theme-text-primary)]">
                                {editingPlace ? `Edit Place: ${editingPlace.name}` : 'Add New Place / Monument'}
                            </h3>
                            <button 
                                onClick={() => setIsPlaceModalOpen(false)}
                                className="w-8 h-8 rounded-full bg-[var(--theme-bg-accent)] flex items-center justify-center font-bold text-sm hover:bg-[var(--theme-accent-primary)] hover:text-white transition-all"
                            >
                                ✕
                            </button>
                        </div>

                        <form onSubmit={handleSavePlace} className="space-y-4 text-xs">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="font-bold text-[var(--theme-text-primary)] block mb-1">Place Name *</label>
                                    <input
                                        type="text"
                                        required
                                        value={placeForm.name}
                                        onChange={e => setPlaceForm({ ...placeForm, name: e.target.value })}
                                        className="w-full p-2.5 rounded-xl bg-[var(--theme-bg-accent)] border border-[var(--theme-border)] text-[var(--theme-text-primary)] focus:outline-none focus:border-[var(--theme-accent-primary)]"
                                        placeholder="e.g. Charminar"
                                    />
                                </div>
                                <div>
                                    <label className="font-bold text-[var(--theme-text-primary)] block mb-1">City *</label>
                                    <input
                                        type="text"
                                        required
                                        value={placeForm.city}
                                        onChange={e => setPlaceForm({ ...placeForm, city: e.target.value })}
                                        className="w-full p-2.5 rounded-xl bg-[var(--theme-bg-accent)] border border-[var(--theme-border)] text-[var(--theme-text-primary)] focus:outline-none focus:border-[var(--theme-accent-primary)]"
                                        placeholder="e.g. Hyderabad"
                                    />
                                </div>
                                <div>
                                    <label className="font-bold text-[var(--theme-text-primary)] block mb-1">State *</label>
                                    <input
                                        type="text"
                                        required
                                        value={placeForm.state}
                                        onChange={e => setPlaceForm({ ...placeForm, state: e.target.value })}
                                        className="w-full p-2.5 rounded-xl bg-[var(--theme-bg-accent)] border border-[var(--theme-border)] text-[var(--theme-text-primary)] focus:outline-none focus:border-[var(--theme-accent-primary)]"
                                        placeholder="e.g. Telangana"
                                    />
                                </div>
                                <div>
                                    <label className="font-bold text-[var(--theme-text-primary)] block mb-1">Category *</label>
                                    <select
                                        value={placeForm.category}
                                        onChange={e => setPlaceForm({ ...placeForm, category: e.target.value })}
                                        className="w-full p-2.5 rounded-xl bg-[var(--theme-bg-accent)] border border-[var(--theme-border)] text-[var(--theme-text-primary)] focus:outline-none focus:border-[var(--theme-accent-primary)]"
                                    >
                                        <option value="Historical Monument">Historical Monument</option>
                                        <option value="Fort & Palace">Fort & Palace</option>
                                        <option value="Temple & Spiritual">Temple & Spiritual</option>
                                        <option value="Museum & Heritage">Museum & Heritage</option>
                                        <option value="Nature & Scenic">Nature & Scenic</option>
                                        <option value="Cultural Center">Cultural Center</option>
                                        <option value="Modern Landmark">Modern Landmark</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="font-bold text-[var(--theme-text-primary)] block mb-1">Banner Image URL</label>
                                <input
                                    type="url"
                                    value={placeForm.bannerImage}
                                    onChange={e => setPlaceForm({ ...placeForm, bannerImage: e.target.value })}
                                    className="w-full p-2.5 rounded-xl bg-[var(--theme-bg-accent)] border border-[var(--theme-border)] text-[var(--theme-text-primary)] focus:outline-none focus:border-[var(--theme-accent-primary)]"
                                    placeholder="https://..."
                                />
                            </div>

                            <div>
                                <label className="font-bold text-[var(--theme-text-primary)] block mb-1">Short Description *</label>
                                <textarea
                                    required
                                    rows="2"
                                    value={placeForm.shortDescription}
                                    onChange={e => setPlaceForm({ ...placeForm, shortDescription: e.target.value })}
                                    className="w-full p-2.5 rounded-xl bg-[var(--theme-bg-accent)] border border-[var(--theme-border)] text-[var(--theme-text-primary)] focus:outline-none focus:border-[var(--theme-accent-primary)]"
                                    placeholder="1-2 sentences for place card..."
                                />
                            </div>

                            <div>
                                <label className="font-bold text-[var(--theme-text-primary)] block mb-1">Full Detailed Description *</label>
                                <textarea
                                    required
                                    rows="3"
                                    value={placeForm.fullDescription}
                                    onChange={e => setPlaceForm({ ...placeForm, fullDescription: e.target.value })}
                                    className="w-full p-2.5 rounded-xl bg-[var(--theme-bg-accent)] border border-[var(--theme-border)] text-[var(--theme-text-primary)] focus:outline-none focus:border-[var(--theme-accent-primary)]"
                                    placeholder="Detailed overview..."
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="font-bold text-[var(--theme-text-primary)] block mb-1">Historical Background</label>
                                    <textarea
                                        rows="2"
                                        value={placeForm.history}
                                        onChange={e => setPlaceForm({ ...placeForm, history: e.target.value })}
                                        className="w-full p-2.5 rounded-xl bg-[var(--theme-bg-accent)] border border-[var(--theme-border)] text-[var(--theme-text-primary)] focus:outline-none focus:border-[var(--theme-accent-primary)]"
                                        placeholder="When built, by whom, context..."
                                    />
                                </div>
                                <div>
                                    <label className="font-bold text-[var(--theme-text-primary)] block mb-1">Cultural Significance</label>
                                    <textarea
                                        rows="2"
                                        value={placeForm.culturalSignificance}
                                        onChange={e => setPlaceForm({ ...placeForm, culturalSignificance: e.target.value })}
                                        className="w-full p-2.5 rounded-xl bg-[var(--theme-bg-accent)] border border-[var(--theme-border)] text-[var(--theme-text-primary)] focus:outline-none focus:border-[var(--theme-accent-primary)]"
                                        placeholder="Traditions, festivals, significance..."
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="font-bold text-[var(--theme-text-primary)] block mb-1">Opening Hours</label>
                                    <input
                                        type="text"
                                        value={placeForm.openingHours}
                                        onChange={e => setPlaceForm({ ...placeForm, openingHours: e.target.value })}
                                        className="w-full p-2.5 rounded-xl bg-[var(--theme-bg-accent)] border border-[var(--theme-border)] text-[var(--theme-text-primary)] focus:outline-none focus:border-[var(--theme-accent-primary)]"
                                    />
                                </div>
                                <div>
                                    <label className="font-bold text-[var(--theme-text-primary)] block mb-1">Entry Fee</label>
                                    <input
                                        type="text"
                                        value={placeForm.entryFee}
                                        onChange={e => setPlaceForm({ ...placeForm, entryFee: e.target.value })}
                                        className="w-full p-2.5 rounded-xl bg-[var(--theme-bg-accent)] border border-[var(--theme-border)] text-[var(--theme-text-primary)] focus:outline-none focus:border-[var(--theme-accent-primary)]"
                                    />
                                </div>
                                <div>
                                    <label className="font-bold text-[var(--theme-text-primary)] block mb-1">Best Time to Visit</label>
                                    <input
                                        type="text"
                                        value={placeForm.bestTimeToVisit}
                                        onChange={e => setPlaceForm({ ...placeForm, bestTimeToVisit: e.target.value })}
                                        className="w-full p-2.5 rounded-xl bg-[var(--theme-bg-accent)] border border-[var(--theme-border)] text-[var(--theme-text-primary)] focus:outline-none focus:border-[var(--theme-accent-primary)]"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="font-bold text-[var(--theme-text-primary)] block mb-1">Address *</label>
                                <input
                                    type="text"
                                    required
                                    value={placeForm.address}
                                    onChange={e => setPlaceForm({ ...placeForm, address: e.target.value })}
                                    className="w-full p-2.5 rounded-xl bg-[var(--theme-bg-accent)] border border-[var(--theme-border)] text-[var(--theme-text-primary)] focus:outline-none focus:border-[var(--theme-accent-primary)]"
                                    placeholder="Street, Landmark, City, State PIN"
                                />
                            </div>

                            <div className="flex gap-3 pt-4 border-t border-[var(--theme-border)]">
                                <button
                                    type="button"
                                    onClick={() => setIsPlaceModalOpen(false)}
                                    className="flex-1 py-2.5 rounded-xl border border-[var(--theme-border)] font-bold text-[var(--theme-text-primary)] hover:bg-[var(--theme-bg-accent)] transition-all cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 py-2.5 rounded-xl bg-[var(--theme-accent-primary)] text-white font-bold hover:opacity-90 transition-all cursor-pointer shadow-md"
                                >
                                    {editingPlace ? 'Save Changes' : 'Create Place'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Place Delete Modal */}
            {deletePlaceConfirm && (
                <div 
                    className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-[9999] p-4" 
                    onClick={() => setDeletePlaceConfirm(null)}
                >
                    <div 
                        className="bg-[var(--theme-card-bg)] border border-[var(--theme-border)] rounded-2xl p-6 max-w-sm w-full shadow-lg text-center" 
                        onClick={e => e.stopPropagation()}
                    >
                        <h3 className="text-base font-bold text-[var(--theme-text-primary)] mb-2">Delete Place</h3>
                        <p className="text-xs text-[var(--theme-text-muted)] mb-5">
                            Are you sure you want to delete <strong className="text-[var(--theme-text-primary)]">{deletePlaceConfirm.name}</strong>? This action cannot be undone.
                        </p>
                        <div className="flex gap-2.5 justify-center">
                            <button 
                                onClick={() => setDeletePlaceConfirm(null)}
                                className="flex-1 py-2 px-3 rounded-xl border border-[var(--theme-border)] text-xs font-semibold text-[var(--theme-text-primary)] hover:bg-[var(--theme-bg-accent)] transition-colors cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={() => handleDeletePlace(deletePlaceConfirm.id)}
                                className="flex-1 py-2 px-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold transition-colors cursor-pointer"
                            >
                                Delete Place
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Account Delete Modal */}
            {deleteConfirm && (
                <div 
                    className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-[9999] p-4" 
                    onClick={() => setDeleteConfirm(null)}
                >
                    <div 
                        className="bg-[var(--theme-card-bg)] border border-[var(--theme-border)] rounded-2xl p-6 max-w-sm w-full shadow-lg text-center" 
                        onClick={e => e.stopPropagation()}
                    >
                        <h3 className="text-base font-bold text-[var(--theme-text-primary)] mb-2">Delete User Account</h3>
                        <p className="text-xs text-[var(--theme-text-muted)] mb-5">
                            Are you sure you want to delete <strong className="text-[var(--theme-text-primary)]">{deleteConfirm.username}</strong>? This action cannot be undone.
                        </p>
                        <div className="flex gap-2.5 justify-center">
                            <button 
                                onClick={() => setDeleteConfirm(null)}
                                className="flex-1 py-2 px-3 rounded-xl border border-[var(--theme-border)] text-xs font-semibold text-[var(--theme-text-primary)] hover:bg-[var(--theme-bg-accent)] transition-colors cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={() => handleDeleteUser(deleteConfirm.id)}
                                className="flex-1 py-2 px-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold transition-colors cursor-pointer"
                            >
                                Delete Account
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;

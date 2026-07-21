import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [stats, setStats] = useState(null);
    const [users, setUsers] = useState([]);
    const [loginLogs, setLoginLogs] = useState([]);
    const [activeTab, setActiveTab] = useState('overview');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [deleteConfirm, setDeleteConfirm] = useState(null);

    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    useEffect(() => {
        if (!token) {
            navigate('/login');
            return;
        }
        if (role !== 'admin') {
            setError(`Logged in as "${localStorage.getItem('username')}", which is not an admin account.`);
            setLoading(false);
            return;
        }
        fetchAll();
    }, []);

    const fetchAll = async () => {
        setLoading(true);
        try {
            const headers = { 'Authorization': `Bearer ${token}` };
            const [statsRes, usersRes, logsRes] = await Promise.all([
                fetch(`${API_BASE_URL}/api/admin/dashboard-stats`, { headers }),
                fetch(`${API_BASE_URL}/api/admin/users`, { headers }),
                fetch(`${API_BASE_URL}/api/admin/login-logs?limit=200`, { headers }),
            ]);
            if (!statsRes.ok || !usersRes.ok || !logsRes.ok) throw new Error('Unauthorized');
            setStats(await statsRes.json());
            setUsers(await usersRes.json());
            setLoginLogs(await logsRes.json());
        } catch (err) {
            setError('Failed to load admin data. Make sure you are logged in as admin.');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteUser = async (userId, username) => {
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
            console.error('Delete failed');
        }
    };

    const formatDate = (d) => {
        if (!d) return '—';
        return new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    };

    const filteredUsers = users.filter(u =>
        u.username?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredLogs = loginLogs.filter(l =>
        l.username?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (role !== 'admin' && !error) return null;    // Inline styles
    const s = {
        page: { minHeight: '100vh', padding: '110px 24px 80px', maxWidth: 1400, margin: '0 auto' },
        header: { marginBottom: 32 },
        title: { fontSize: 32, fontWeight: 800, fontFamily: 'var(--font-serif)', color: 'var(--theme-text-primary)', letterSpacing: '-0.02em', marginBottom: 6 },
        subtitle: { color: 'var(--theme-text-muted)', fontSize: 14, lineHeight: 1.5 },
        statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20, marginBottom: 32 },
        statCard: {
            background: 'var(--theme-card-bg)', border: '1px solid var(--theme-border)', borderRadius: 16, padding: '24px 20px',
            position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', backdropFilter: 'blur(8px)',
        },
        statIconContainer: {
            display: 'flex', alignItems: 'center', justifyContent: 'center', width: 40, height: 40, borderRadius: 10,
            background: 'var(--theme-bg-accent)', marginBottom: 12, border: '1px solid var(--theme-border)',
        },
        statValue: { fontSize: 28, fontWeight: 800, color: 'var(--theme-text-primary)', lineHeight: 1.1, fontFamily: 'var(--font-sans)' },
        statLabel: { fontSize: 11, fontWeight: 600, color: 'var(--theme-text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: 4 },
        tabs: { display: 'flex', gap: 4, marginBottom: 32, background: 'var(--theme-bg-accent)', borderRadius: 12, padding: 4, border: '1px solid var(--theme-border)', width: 'fit-content' },
        tab: (active) => ({
            padding: '8px 20px', borderRadius: 8, border: active ? '1px solid var(--theme-border)' : '1px solid transparent', cursor: 'pointer', fontWeight: 600, fontSize: 13,
            background: active ? 'var(--theme-card-bg)' : 'transparent',
            color: active ? 'var(--theme-text-primary)' : 'var(--theme-text-muted)',
            boxShadow: active ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
            transition: 'all 0.2s ease',
        }),
        searchBox: {
            width: '100%', padding: '10px 16px 10px 40px', borderRadius: 10, border: '1px solid var(--theme-border)',
            background: 'var(--theme-input-bg)', color: 'var(--theme-text-primary)', fontSize: 14, outline: 'none',
        },
        chartBar: (h, color) => ({ width: '100%', height: `${h}%`, background: color, borderRadius: '3px 3px 0 0', minHeight: 2, transition: 'height 0.5s ease' }),
    };

    // SVG Icons
    const UsersIcon = () => (
        <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.109A12.018 12.018 0 0112 22.5c-2.91 0-5.523-1.035-7.545-2.754v-.09c0-1.113.285-2.16.786-3.07M12 18.75a6.002 6.002 0 00-6-6H4.5A2.25 2.25 0 002.25 15v2.25m18 0V15a2.25 2.25 0 00-2.25-2.25H18a6.002 6.002 0 00-6 6M15 7.5a3 3 0 11-6 0 3 3 0 016 0zm6.75 3a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm-16.5 0a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0z" />
        </svg>
    );

    const KeyIcon = () => (
        <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
        </svg>
    );

    const DocumentIcon = () => (
        <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
    );

    const ChatIcon = () => (
        <svg className="w-5 h-5 text-rose-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
    );

    const CalendarIcon = () => (
        <svg className="w-5 h-5 text-sky-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
        </svg>
    );

    const TicketIcon = () => (
        <svg className="w-5 h-5 text-violet-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-12v.75m0 3v.75m0 3v.75m0 3V18M3 7.5A1.5 1.5 0 014.5 6h15A1.5 1.5 0 0121 7.5v9a1.5 1.5 0 01-1.5 1.5h-15A1.5 1.5 0 013 16.5v-9z" />
        </svg>
    );

    const TrendUpIcon = () => (
        <svg className="w-5 h-5 text-teal-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.94" />
        </svg>
    );

    const LightningIcon = () => (
        <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
        </svg>
    );

    // Helpers & Inner Components
    const getAvatarBg = (username) => {
        if (!username) return 'bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300';
        const colors = [
            'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border border-blue-200/50 dark:border-blue-800/30',
            'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400 border border-indigo-200/50 dark:border-indigo-800/30',
            'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400 border border-violet-200/50 dark:border-violet-800/30',
            'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-800/30',
            'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border border-amber-200/50 dark:border-amber-800/30',
            'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400 border border-rose-200/50 dark:border-rose-800/30',
        ];
        let hash = 0;
        for (let i = 0; i < username.length; i++) {
            hash = username.charCodeAt(i) + ((hash << 5) - hash);
        }
        return colors[Math.abs(hash) % colors.length];
    };

    const UserAvatar = ({ username, isAdmin }) => {
        const initials = username?.[0]?.toUpperCase() || '?';
        const bgClass = getAvatarBg(username);
        return (
            <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs ${bgClass} relative flex-shrink-0`}>
                {initials}
                {isAdmin && (
                    <span className="absolute -bottom-1 -right-1 bg-amber-500 text-white rounded-full p-0.5 text-[8px] leading-none" title="Admin">
                        👑
                    </span>
                )}
            </div>
        );
    };

    const Badge = ({ type, children }) => {
        const styles = {
            posts: 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/20',
            comments: 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/20',
            bookings: 'bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border border-amber-100 dark:border-amber-900/20',
            admin: 'bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border border-rose-100 dark:border-rose-900/20',
            user: 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900/20',
            default: 'bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800',
        };
        const styleClass = styles[type] || styles.default;
        return (
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide ${styleClass}`}>
                {children}
            </span>
        );
    };

    const StatCard = ({ value, label, icon }) => (
        <div 
            style={s.statCard} 
            className="hover:-translate-y-1 hover:shadow-md hover:border-[var(--theme-text-primary)]/20 transition-all duration-300"
        >
            <div style={s.statIconContainer}>{icon}</div>
            <div style={s.statValue}>{value}</div>
            <div style={s.statLabel}>{label}</div>
        </div>
    );

    const MiniChart = ({ data, color, label }) => {
        if (!data || data.length === 0) return <div style={{ color: 'var(--theme-text-muted)', fontSize: 13 }}>No data yet</div>;
        const maxVal = Math.max(...data.map(d => d.count), 1);
        return (
            <div className="bg-[var(--theme-card-bg)] border border-[var(--theme-border)] rounded-2xl p-6 flex flex-col justify-between backdrop-blur-sm shadow-sm">
                <div className="text-sm font-semibold text-[var(--theme-text-primary)] mb-4">{label}</div>
                <div className="flex gap-1.5 h-24 items-end">
                    {data.map((d, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center h-full justify-end group relative" title={`${d._id}: ${d.count}`}>
                            <div 
                                style={s.chartBar((d.count / maxVal) * 100, color)} 
                                className="hover:opacity-100 opacity-80 transition-opacity"
                            />
                            <span className="absolute bottom-full mb-1 scale-0 group-hover:scale-100 transition-all bg-[var(--theme-text-primary)] text-[var(--theme-bg-primary)] text-[10px] font-bold px-1.5 py-0.5 rounded shadow-sm whitespace-nowrap z-10 pointer-events-none">
                                {d._id}: {d.count}
                            </span>
                        </div>
                    ))}
                </div>
                <div className="flex justify-between mt-4 text-[10px] font-semibold text-[var(--theme-text-muted)] tracking-wider">
                    <span>{data[0]?._id?.slice(5)}</span>
                    <span>{data[data.length - 1]?._id?.slice(5)}</span>
                </div>
            </div>
        );
    };

    if (loading) {
        return (
            <div style={{ ...s.page, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 48, marginBottom: 16, animation: 'spin 1s linear infinite' }}>⚙️</div>
                    <div style={{ color: 'var(--theme-text-muted)', fontSize: 14 }}>Loading admin dashboard...</div>
                    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ ...s.page, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ textAlign: 'center', maxWidth: 400 }}>
                    <div style={{ fontSize: 48, marginBottom: 16 }}>🔒</div>
                    <div style={{ color: '#ff006e', fontWeight: 700, fontSize: 18, marginBottom: 8 }}>Access Denied</div>
                    <div style={{ color: 'var(--theme-text-muted)', fontSize: 14, marginBottom: 24 }}>{error}</div>
                    <button 
                        onClick={() => { localStorage.clear(); navigate('/login'); }}
                        style={{ padding: '12px 24px', borderRadius: 12, background: 'var(--theme-text-primary)', color: 'var(--theme-bg-primary)', border: 'none', fontWeight: 700, cursor: 'pointer' }}
                    >
                        Login as Admin
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div style={s.page}>
            {/* Header */}
            <div style={s.header}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, fontWeight: 700, color: 'var(--theme-text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>
                    <span>System</span>
                    <span>/</span>
                    <span>Admin Portal</span>
                </div>
                <h1 style={s.title}>Admin Dashboard</h1>
                <p style={s.subtitle}>Monitor platform metrics, manage registered users, and audit active sessions.</p>
            </div>

            {/* Stats Grid */}
            {stats && (
                <div style={s.statsGrid}>
                    <StatCard value={stats.totalUsers} label="Total Users" icon={<UsersIcon />} />
                    <StatCard value={stats.totalLogins} label="Total Logins" icon={<KeyIcon />} />
                    <StatCard value={stats.totalPosts} label="Total Posts" icon={<DocumentIcon />} />
                    <StatCard value={stats.totalComments} label="Comments" icon={<ChatIcon />} />
                    <StatCard value={stats.totalEvents} label="Events" icon={<CalendarIcon />} />
                    <StatCard value={stats.totalBookings} label="Bookings" icon={<TicketIcon />} />
                    <StatCard value={stats.recentSignups} label="Signups (7d)" icon={<TrendUpIcon />} />
                    <StatCard value={stats.recentLogins} label="Logins (7d)" icon={<LightningIcon />} />
                </div>
            )}

            {/* Mini Charts */}
            {stats && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20, marginBottom: 32 }}>
                    <MiniChart data={stats.dailyLogins} color="var(--theme-accent-purple, #be0aff)" label="Daily Logins (30 days)" />
                    <MiniChart data={stats.dailySignups} color="var(--theme-accent-terra, #ff006e)" label="Daily Signups (30 days)" />
                </div>
            )}

            {/* Tabs */}
            <div style={s.tabs}>
                {['overview', 'users', 'logins'].map(tab => (
                    <button key={tab} style={s.tab(activeTab === tab)} onClick={() => { setActiveTab(tab); setSearchTerm(''); }}>
                        {tab === 'overview' ? 'Overview' : tab === 'users' ? 'Users' : 'Login Logs'}
                    </button>
                ))}
            </div>

            {/* Search */}
            {activeTab !== 'overview' && (
                <div style={{ position: 'relative', marginBottom: 24, maxWidth: 400 }}>
                    <div style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', display: 'flex', alignItems: 'center', pointerEvents: 'none' }}>
                        <svg className="w-4 h-4 text-[var(--theme-text-muted)] opacity-60" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <input
                        style={s.searchBox}
                        className="focus:border-[var(--theme-text-primary)]/30 focus:ring-2 focus:ring-[var(--theme-text-primary)]/5"
                        placeholder={activeTab === 'users' ? 'Search users by username...' : 'Search logs by username...'}
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                </div>
            )}

            {/* Overview Tab */}
            {activeTab === 'overview' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Recent Users */}
                    <div className="bg-[var(--theme-card-bg)] border border-[var(--theme-border)] rounded-2xl p-6 shadow-sm flex flex-col backdrop-blur-sm">
                        <div className="text-base font-semibold mb-6 text-[var(--theme-text-primary)] flex items-center gap-2">
                            <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.109A12.018 12.018 0 0112 22.5c-2.91 0-5.523-1.035-7.545-2.754v-.09c0-1.113.285-2.16.786-3.07M12 18.75a6.002 6.002 0 00-6-6H4.5A2.25 2.25 0 002.25 15v2.25m18 0V15a2.25 2.25 0 00-2.25-2.25H18a6.002 6.002 0 00-6 6M15 7.5a3 3 0 11-6 0 3 3 0 016 0zm6.75 3a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm-16.5 0a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0z" />
                            </svg>
                            <span>Recent Users</span>
                        </div>
                        <div className="divide-y divide-[var(--theme-border)]/50">
                            {users.slice(0, 8).map((u) => (
                                <div key={u.id} className="flex items-center justify-between py-3.5 first:pt-0 last:pb-0">
                                    <div className="flex items-center gap-3">
                                        <UserAvatar username={u.username} isAdmin={false} />
                                        <div>
                                            <div className="font-bold text-sm text-[var(--theme-text-primary)]">{u.username}</div>
                                            <div className="text-xs text-[var(--theme-text-muted)] mt-0.5">Joined {formatDate(u.createdAt)}</div>
                                        </div>
                                    </div>
                                    <Badge type="posts">{u.postCount} posts</Badge>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recent Logins */}
                    <div className="bg-[var(--theme-card-bg)] border border-[var(--theme-border)] rounded-2xl p-6 shadow-sm flex flex-col backdrop-blur-sm">
                        <div className="text-base font-semibold mb-6 text-[var(--theme-text-primary)] flex items-center gap-2">
                            <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
                            </svg>
                            <span>Recent Logins</span>
                        </div>
                        <div className="divide-y divide-[var(--theme-border)]/50">
                            {loginLogs.slice(0, 8).map((l) => (
                                <div key={l._id} className="flex items-center justify-between py-3.5 first:pt-0 last:pb-0">
                                    <div className="flex items-center gap-3">
                                        <UserAvatar username={l.username} isAdmin={l.isAdmin} />
                                        <div>
                                            <div className="font-bold text-sm text-[var(--theme-text-primary)]">{l.username}</div>
                                            <div className="text-xs text-[var(--theme-text-muted)] mt-0.5">{formatDate(l.loginAt)}</div>
                                        </div>
                                    </div>
                                    <Badge type={l.isAdmin ? 'admin' : 'user'}>{l.isAdmin ? 'Admin' : 'User'}</Badge>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Users Tab */}
            {activeTab === 'users' && (
                <div className="border border-[var(--theme-border)] rounded-2xl overflow-hidden bg-[var(--theme-card-bg)] backdrop-blur-sm shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse text-left">
                            <thead>
                                <tr className="bg-[var(--theme-bg-accent)]/80 border-b border-[var(--theme-border)]">
                                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[var(--theme-text-muted)]">#</th>
                                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[var(--theme-text-muted)]">Username</th>
                                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[var(--theme-text-muted)]">Joined</th>
                                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[var(--theme-text-muted)]">Last Login</th>
                                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[var(--theme-text-muted)]">Posts</th>
                                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[var(--theme-text-muted)]">Comments</th>
                                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[var(--theme-text-muted)]">Bookings</th>
                                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[var(--theme-text-muted)] text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[var(--theme-border)]/50">
                                {filteredUsers.map((u, i) => (
                                    <tr key={u.id} className="hover:bg-[var(--theme-bg-accent)]/30 transition-colors">
                                        <td className="px-6 py-4 text-sm font-semibold text-[var(--theme-text-muted)]">{i + 1}</td>
                                        <td className="px-6 py-4 text-sm font-medium">
                                            <div className="flex items-center gap-3">
                                                <UserAvatar username={u.username} isAdmin={false} />
                                                <span className="font-bold text-[var(--theme-text-primary)]">{u.username}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-[var(--theme-text-secondary)]">{formatDate(u.createdAt)}</td>
                                        <td className="px-6 py-4 text-sm text-[var(--theme-text-secondary)]">{formatDate(u.lastLogin)}</td>
                                        <td className="px-6 py-4 text-sm"><Badge type="posts">{u.postCount} posts</Badge></td>
                                        <td className="px-6 py-4 text-sm"><Badge type="comments">{u.commentCount} comments</Badge></td>
                                        <td className="px-6 py-4 text-sm"><Badge type="bookings">{u.bookingCount} bookings</Badge></td>
                                        <td className="px-6 py-4 text-sm text-right">
                                            <button 
                                                className="text-xs font-semibold text-rose-500 hover:text-rose-700 bg-rose-500/10 hover:bg-rose-500/20 px-3 py-1.5 rounded-lg border border-rose-500/20 transition-all cursor-pointer"
                                                onClick={() => setDeleteConfirm({ id: u.id, username: u.username })}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {filteredUsers.length === 0 && <div className="text-center py-12 text-[var(--theme-text-muted)]">No users found</div>}
                </div>
            )}

            {/* Login Logs Tab */}
            {activeTab === 'logins' && (
                <div className="border border-[var(--theme-border)] rounded-2xl overflow-hidden bg-[var(--theme-card-bg)] backdrop-blur-sm shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse text-left">
                            <thead>
                                <tr className="bg-[var(--theme-bg-accent)]/80 border-b border-[var(--theme-border)]">
                                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[var(--theme-text-muted)]">#</th>
                                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[var(--theme-text-muted)]">User</th>
                                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[var(--theme-text-muted)]">Role</th>
                                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[var(--theme-text-muted)]">Login Time</th>
                                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[var(--theme-text-muted)]">IP Address</th>
                                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[var(--theme-text-muted)]">Browser / Device</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[var(--theme-border)]/50">
                                {filteredLogs.map((l, i) => (
                                    <tr key={l._id} className="hover:bg-[var(--theme-bg-accent)]/30 transition-colors">
                                        <td className="px-6 py-4 text-sm font-semibold text-[var(--theme-text-muted)]">{i + 1}</td>
                                        <td className="px-6 py-4 text-sm font-medium">
                                            <div className="flex items-center gap-3">
                                                <UserAvatar username={l.username} isAdmin={l.isAdmin} />
                                                <span className="font-bold text-[var(--theme-text-primary)]">{l.username}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm">
                                            <Badge type={l.isAdmin ? 'admin' : 'user'}>{l.isAdmin ? 'Admin' : 'User'}</Badge>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-[var(--theme-text-secondary)]">{formatDate(l.loginAt)}</td>
                                        <td className="px-6 py-4 text-sm font-mono text-[var(--theme-text-secondary)]">{l.ip || '—'}</td>
                                        <td className="px-6 py-4 text-xs text-[var(--theme-text-muted)] max-w-xs truncate" title={l.userAgent}>
                                            {l.userAgent || '—'}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {filteredLogs.length === 0 && <div className="text-center py-12 text-[var(--theme-text-muted)]">No login logs found</div>}
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {deleteConfirm && (
                <div 
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999]" 
                    onClick={() => setDeleteConfirm(null)}
                >
                    <div 
                        className="bg-[var(--theme-card-bg)] border border-[var(--theme-border)] rounded-2xl p-8 max-w-md w-full mx-4 shadow-xl text-center animate-scale-in" 
                        onClick={e => e.stopPropagation()}
                    >
                        <div className="w-12 h-12 bg-rose-500/10 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-[var(--theme-text-primary)] mb-2">Delete User Account</h3>
                        <p className="text-sm text-[var(--theme-text-muted)] mb-6 leading-relaxed">
                            Are you sure you want to delete <strong className="text-[var(--theme-text-primary)]">{deleteConfirm.username}</strong>? This action is permanent and will remove all their posts, comments, and bookings.
                        </p>
                        <div className="flex gap-3 justify-center">
                            <button 
                                onClick={() => setDeleteConfirm(null)}
                                className="px-5 py-2.5 rounded-xl border border-[var(--theme-border)] text-sm font-semibold text-[var(--theme-text-primary)] hover:bg-[var(--theme-bg-accent)] transition-colors cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={() => handleDeleteUser(deleteConfirm.id, deleteConfirm.username)}
                                className="px-5 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-sm font-semibold text-white transition-colors cursor-pointer shadow-sm"
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


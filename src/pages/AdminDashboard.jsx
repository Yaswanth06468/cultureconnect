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
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [deleteConfirm, setDeleteConfirm] = useState(null);
    const [lastUpdated, setLastUpdated] = useState(null);
    const [activeChart, setActiveChart] = useState('all'); // 'all', 'logins', 'signups'

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
            const [statsRes, usersRes, logsRes] = await Promise.all([
                fetch(`${API_BASE_URL}/api/admin/dashboard-stats`, { headers }),
                fetch(`${API_BASE_URL}/api/admin/users`, { headers }),
                fetch(`${API_BASE_URL}/api/admin/login-logs?limit=200`, { headers }),
            ]);

            if (!statsRes.ok || !usersRes.ok || !logsRes.ok) throw new Error('Unauthorized');
            
            const statsData = await statsRes.json();
            const usersData = await usersRes.json();
            const logsData = await logsRes.json();

            setStats(statsData);
            setUsers(usersData);
            setLoginLogs(logsData);
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

    // SVG Icons
    const Icons = {
        Users: () => (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.109A12.018 12.018 0 0112 22.5c-2.91 0-5.523-1.035-7.545-2.754v-.09c0-1.113.285-2.16.786-3.07M12 18.75a6.002 6.002 0 00-6-6H4.5A2.25 2.25 0 002.25 15v2.25m18 0V15a2.25 2.25 0 00-2.25-2.25H18a6.002 6.002 0 00-6 6M15 7.5a3 3 0 11-6 0 3 3 0 016 0zm6.75 3a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm-16.5 0a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0z" />
            </svg>
        ),
        Key: () => (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
            </svg>
        ),
        Document: () => (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
        ),
        Chat: () => (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
        ),
        Calendar: () => (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
            </svg>
        ),
        Ticket: () => (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-12v.75m0 3v.75m0 3v.75m0 3V18M3 7.5A1.5 1.5 0 014.5 6h15A1.5 1.5 0 0121 7.5v9a1.5 1.5 0 01-1.5 1.5h-15A1.5 1.5 0 013 16.5v-9z" />
            </svg>
        ),
        TrendUp: () => (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.94" />
            </svg>
        ),
        Lightning: () => (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
            </svg>
        ),
        Refresh: () => (
            <svg className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
        ),
        ShieldCheck: () => (
            <svg className="w-6 h-6 text-emerald-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751A11.959 11.959 0 0112 2.714z" />
            </svg>
        )
    };

    // User Avatar Helper
    const getAvatarBg = (username) => {
        if (!username) return 'from-slate-400 to-slate-600 text-white';
        const gradients = [
            'from-indigo-500 to-blue-600 text-white',
            'from-emerald-500 to-teal-600 text-white',
            'from-amber-500 to-orange-600 text-white',
            'from-rose-500 to-pink-600 text-white',
            'from-purple-500 to-indigo-600 text-white',
            'from-cyan-500 to-blue-600 text-white',
        ];
        let hash = 0;
        for (let i = 0; i < username.length; i++) {
            hash = username.charCodeAt(i) + ((hash << 5) - hash);
        }
        return gradients[Math.abs(hash) % gradients.length];
    };

    const UserAvatar = ({ username, isAdmin }) => {
        const initials = username?.[0]?.toUpperCase() || '?';
        const bgGradient = getAvatarBg(username);
        return (
            <div className={`w-9 h-9 rounded-xl bg-gradient-to-tr ${bgGradient} flex items-center justify-center font-bold text-xs shadow-sm relative flex-shrink-0 border border-white/20`}>
                {initials}
                {isAdmin && (
                    <span className="absolute -top-1 -right-1 bg-amber-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-[9px] shadow-sm border border-white dark:border-slate-900" title="System Administrator">
                        👑
                    </span>
                )}
            </div>
        );
    };

    const Badge = ({ type, children }) => {
        const styles = {
            posts: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20',
            comments: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
            bookings: 'bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20',
            admin: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
            user: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
            default: 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20',
        };
        const styleClass = styles[type] || styles.default;
        return (
            <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold border ${styleClass}`}>
                {children}
            </span>
        );
    };

    // Metric Stat Card Component
    const StatCard = ({ value, label, icon, subtext, accentColor, iconBg }) => (
        <div 
            className="group relative bg-[var(--theme-card-bg)] border border-[var(--theme-border)] rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between overflow-hidden backdrop-blur-md"
        >
            {/* Subtle Gradient Glow Bar at top */}
            <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${accentColor} opacity-80 group-hover:opacity-100 transition-opacity`} />
            
            <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-[var(--theme-text-muted)] uppercase tracking-wider">
                    {label}
                </span>
                <div className={`w-10 h-10 rounded-xl ${iconBg} flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform`}>
                    {icon}
                </div>
            </div>

            <div>
                <div className="text-3xl font-extrabold tracking-tight text-[var(--theme-text-primary)] font-sans leading-none mb-1.5">
                    {value !== undefined && value !== null ? value.toLocaleString() : 0}
                </div>
                {subtext && (
                    <div className="text-[11px] font-medium text-[var(--theme-text-muted)] flex items-center gap-1">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        {subtext}
                    </div>
                )}
            </div>
        </div>
    );

    // Interactive Mini Chart Component
    const MiniChart = ({ data, color, label, gradientFrom, gradientTo }) => {
        if (!data || data.length === 0) {
            return (
                <div className="bg-[var(--theme-card-bg)] border border-[var(--theme-border)] rounded-2xl p-6 flex items-center justify-center min-h-[220px]">
                    <div className="text-center text-[var(--theme-text-muted)] text-sm">
                        No chart telemetry recorded
                    </div>
                </div>
            );
        }

        const maxVal = Math.max(...data.map(d => d.count), 1);
        const totalCount = data.reduce((acc, curr) => acc + curr.count, 0);
        const avgCount = (totalCount / data.length).toFixed(1);

        return (
            <div className="bg-[var(--theme-card-bg)] border border-[var(--theme-border)] rounded-2xl p-6 flex flex-col justify-between backdrop-blur-md shadow-sm relative overflow-hidden">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h3 className="text-sm font-bold text-[var(--theme-text-primary)]">{label}</h3>
                        <p className="text-xs text-[var(--theme-text-muted)] mt-0.5">30-day aggregate activity</p>
                    </div>
                    <div className="text-right">
                        <span className="text-xs font-bold text-[var(--theme-text-primary)]">{totalCount} total</span>
                        <span className="block text-[10px] text-[var(--theme-text-muted)]">~{avgCount}/day avg</span>
                    </div>
                </div>

                <div className="flex gap-1.5 h-32 items-end pt-4 pb-2 border-b border-[var(--theme-border)]/40">
                    {data.map((d, i) => {
                        const pct = Math.max((d.count / maxVal) * 100, 4);
                        return (
                            <div 
                                key={i} 
                                className="flex-1 flex flex-col items-center h-full justify-end group relative"
                            >
                                {/* Hover Tooltip */}
                                <div className="absolute bottom-full mb-2 hidden group-hover:flex flex-col items-center z-20 pointer-events-none transition-all">
                                    <div className="bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-lg whitespace-nowrap">
                                        <span className="text-emerald-400">{d._id}</span>: {d.count}
                                    </div>
                                    <div className="w-2 h-2 bg-slate-900 rotate-45 -mt-1"></div>
                                </div>

                                {/* Dynamic Gradient Bar */}
                                <div 
                                    style={{ height: `${pct}%` }}
                                    className={`w-full rounded-t-sm bg-gradient-to-t ${color} opacity-85 group-hover:opacity-100 transition-all duration-300 group-hover:scale-y-105 shadow-sm`}
                                />
                            </div>
                        );
                    })}
                </div>

                <div className="flex justify-between mt-3 text-[11px] font-medium text-[var(--theme-text-muted)]">
                    <span>{data[0]?._id}</span>
                    <span>{data[Math.floor(data.length / 2)]?._id}</span>
                    <span>{data[data.length - 1]?._id}</span>
                </div>
            </div>
        );
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center p-6" style={{ backgroundColor: 'var(--theme-bg-primary)' }}>
                <div className="text-center max-w-sm">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-700 text-white flex items-center justify-center mx-auto mb-4 shadow-xl animate-bounce">
                        <Icons.ShieldCheck />
                    </div>
                    <h2 className="text-xl font-bold text-[var(--theme-text-primary)] mb-1">Authenticating & Loading</h2>
                    <p className="text-xs text-[var(--theme-text-muted)]">Fetching system metrics, user logs, and audit trails...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center p-6" style={{ backgroundColor: 'var(--theme-bg-primary)' }}>
                <div className="bg-[var(--theme-card-bg)] border border-[var(--theme-border)] rounded-3xl p-8 max-w-md w-full text-center shadow-xl backdrop-blur-md">
                    <div className="w-14 h-14 bg-rose-500/10 text-rose-500 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-rose-500/20">
                        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <h2 className="text-xl font-extrabold text-[var(--theme-text-primary)] mb-2">Access Control Restricted</h2>
                    <p className="text-xs text-[var(--theme-text-muted)] mb-6 leading-relaxed">{error}</p>
                    <button 
                        onClick={() => { localStorage.clear(); navigate('/admin/login'); }}
                        className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-bold text-sm shadow-md transition-all cursor-pointer"
                    >
                        Authenticate as Admin
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8" style={{ backgroundColor: 'var(--theme-bg-primary)' }}>
            
            {/* Header & Status Banner */}
            <div className="bg-[var(--theme-card-bg)] border border-[var(--theme-border)] rounded-3xl p-6 sm:p-8 shadow-sm backdrop-blur-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-emerald-500/10 via-teal-500/5 to-transparent rounded-full blur-3xl pointer-events-none"></div>
                
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                Live Telemetry Active
                            </span>
                            {lastUpdated && (
                                <span className="text-xs font-medium text-[var(--theme-text-muted)]">
                                    Refreshed at {lastUpdated}
                                </span>
                            )}
                        </div>
                        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-[var(--theme-text-primary)] font-sans">
                            Admin Command Center
                        </h1>
                        <p className="text-sm text-[var(--theme-text-muted)] mt-1 font-medium max-w-2xl">
                            Real-time platform metrics, user session activity, and database security governance.
                        </p>
                    </div>

                    <div className="flex items-center gap-3 flex-wrap">
                        <button
                            onClick={() => fetchAll(true)}
                            disabled={isRefreshing}
                            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-bg-accent)] text-[var(--theme-text-primary)] hover:bg-slate-200/50 dark:hover:bg-slate-800/50 transition-all font-semibold text-xs cursor-pointer shadow-sm disabled:opacity-50"
                        >
                            <Icons.Refresh />
                            <span>{isRefreshing ? 'Refreshing...' : 'Refresh Data'}</span>
                        </button>
                        
                        <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-emerald-500/30 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 text-emerald-700 dark:text-emerald-300 font-bold text-xs">
                            <Icons.ShieldCheck />
                            <span>Verified Administrator</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Metrics KPI Cards */}
            {stats && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                    <StatCard 
                        value={stats.totalUsers} 
                        label="Total Users" 
                        icon={<Icons.Users />} 
                        subtext="Registered platform accounts"
                        accentColor="from-indigo-500 to-blue-500"
                        iconBg="bg-indigo-500/10 text-indigo-600 dark:text-indigo-400"
                    />
                    <StatCard 
                        value={stats.totalLogins} 
                        label="Total Logins" 
                        icon={<Icons.Key />} 
                        subtext="Cumulative audit log entries"
                        accentColor="from-amber-500 to-orange-500"
                        iconBg="bg-amber-500/10 text-amber-600 dark:text-amber-400"
                    />
                    <StatCard 
                        value={stats.totalPosts} 
                        label="Total Posts" 
                        icon={<Icons.Document />} 
                        subtext="User feed contributions"
                        accentColor="from-emerald-500 to-teal-500"
                        iconBg="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                    />
                    <StatCard 
                        value={stats.totalComments} 
                        label="Comments" 
                        icon={<Icons.Chat />} 
                        subtext="Community discussions"
                        accentColor="from-rose-500 to-pink-500"
                        iconBg="bg-rose-500/10 text-rose-600 dark:text-rose-400"
                    />
                    <StatCard 
                        value={stats.totalEvents} 
                        label="Events" 
                        icon={<Icons.Calendar />} 
                        subtext="Cultural meetups & activities"
                        accentColor="from-sky-500 to-blue-500"
                        iconBg="bg-sky-500/10 text-sky-600 dark:text-sky-400"
                    />
                    <StatCard 
                        value={stats.totalBookings} 
                        label="Bookings" 
                        icon={<Icons.Ticket />} 
                        subtext="Event tickets & registrations"
                        accentColor="from-violet-500 to-purple-500"
                        iconBg="bg-violet-500/10 text-violet-600 dark:text-violet-400"
                    />
                    <StatCard 
                        value={stats.recentSignups} 
                        label="Signups (7d)" 
                        icon={<Icons.TrendUp />} 
                        subtext="New user acquisition"
                        accentColor="from-teal-500 to-emerald-500"
                        iconBg="bg-teal-500/10 text-teal-600 dark:text-teal-400"
                    />
                    <StatCard 
                        value={stats.recentLogins} 
                        label="Logins (7d)" 
                        icon={<Icons.Lightning />} 
                        subtext="Weekly active logins"
                        accentColor="from-orange-500 to-amber-500"
                        iconBg="bg-orange-500/10 text-orange-600 dark:text-orange-400"
                    />
                </div>
            )}

            {/* Visual Charts Section */}
            {stats && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <MiniChart 
                        data={stats.dailyLogins} 
                        color="from-indigo-600 via-indigo-500 to-cyan-400" 
                        label="Daily Logins (30 days)" 
                    />
                    <MiniChart 
                        data={stats.dailySignups} 
                        color="from-emerald-600 via-teal-500 to-emerald-400" 
                        label="Daily Signups (30 days)" 
                    />
                </div>
            )}

            {/* Tabs Navigation & Search Controls */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
                <div className="inline-flex p-1.5 rounded-2xl bg-[var(--theme-bg-accent)] border border-[var(--theme-border)] shadow-inner">
                    {[
                        { id: 'overview', label: 'Overview' },
                        { id: 'users', label: 'Registered Users', count: users.length },
                        { id: 'logins', label: 'Login Audit Logs', count: loginLogs.length },
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => { setActiveTab(tab.id); setSearchTerm(''); }}
                            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                                activeTab === tab.id
                                    ? 'bg-[var(--theme-card-bg)] text-[var(--theme-text-primary)] shadow-sm border border-[var(--theme-border)]'
                                    : 'text-[var(--theme-text-muted)] hover:text-[var(--theme-text-primary)]'
                            }`}
                        >
                            <span>{tab.label}</span>
                            {tab.count !== undefined && (
                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                                    activeTab === tab.id
                                        ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
                                        : 'bg-slate-500/10 text-slate-500'
                                }`}>
                                    {tab.count}
                                </span>
                            )}
                        </button>
                    ))}
                </div>

                {activeTab !== 'overview' && (
                    <div className="relative w-full sm:w-80">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </span>
                        <input
                            type="text"
                            placeholder={activeTab === 'users' ? 'Search by username...' : 'Search logs by username...'}
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-10 py-2.5 rounded-xl border text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/30 transition-all"
                            style={{
                                backgroundColor: 'var(--theme-input-bg)',
                                borderColor: 'var(--theme-border)',
                                color: 'var(--theme-text-primary)'
                            }}
                        />
                        {searchTerm && (
                            <button
                                onClick={() => setSearchTerm('')}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs font-bold"
                            >
                                ✕
                            </button>
                        )}
                    </div>
                )}
            </div>

            {/* TAB CONTENT: Overview */}
            {activeTab === 'overview' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Recent Registered Users */}
                    <div className="bg-[var(--theme-card-bg)] border border-[var(--theme-border)] rounded-3xl p-6 shadow-sm backdrop-blur-md flex flex-col justify-between">
                        <div>
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                                        <Icons.Users />
                                    </div>
                                    <div>
                                        <h3 className="text-base font-extrabold text-[var(--theme-text-primary)]">Recent Registrations</h3>
                                        <p className="text-xs text-[var(--theme-text-muted)]">Latest accounts added to platform</p>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => setActiveTab('users')}
                                    className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
                                >
                                    View All →
                                </button>
                            </div>

                            <div className="divide-y divide-[var(--theme-border)]/50">
                                {users.slice(0, 6).map((u) => (
                                    <div key={u.id} className="flex items-center justify-between py-3.5 first:pt-0 last:pb-0">
                                        <div className="flex items-center gap-3">
                                            <UserAvatar username={u.username} isAdmin={false} />
                                            <div>
                                                <div className="font-bold text-sm text-[var(--theme-text-primary)]">{u.username}</div>
                                                <div className="text-[11px] text-[var(--theme-text-muted)]">Joined {formatRelativeTime(u.createdAt)}</div>
                                            </div>
                                        </div>
                                        <Badge type="posts">{u.postCount || 0} posts</Badge>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Recent Audit Login Logs */}
                    <div className="bg-[var(--theme-card-bg)] border border-[var(--theme-border)] rounded-3xl p-6 shadow-sm backdrop-blur-md flex flex-col justify-between">
                        <div>
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                                        <Icons.Key />
                                    </div>
                                    <div>
                                        <h3 className="text-base font-extrabold text-[var(--theme-text-primary)]">Live Login Audit Stream</h3>
                                        <p className="text-xs text-[var(--theme-text-muted)]">Recent authentication attempts</p>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => setActiveTab('logins')}
                                    className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
                                >
                                    View All Logs →
                                </button>
                            </div>

                            <div className="divide-y divide-[var(--theme-border)]/50">
                                {loginLogs.slice(0, 6).map((l) => (
                                    <div key={l._id} className="flex items-center justify-between py-3.5 first:pt-0 last:pb-0">
                                        <div className="flex items-center gap-3">
                                            <UserAvatar username={l.username} isAdmin={l.isAdmin} />
                                            <div>
                                                <div className="font-bold text-sm text-[var(--theme-text-primary)]">{l.username}</div>
                                                <div className="text-[11px] text-[var(--theme-text-muted)]">{formatRelativeTime(l.loginAt)} • IP: {l.ip || '127.0.0.1'}</div>
                                            </div>
                                        </div>
                                        <Badge type={l.isAdmin ? 'admin' : 'user'}>{l.isAdmin ? 'Admin' : 'User'}</Badge>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* TAB CONTENT: Users Table */}
            {activeTab === 'users' && (
                <div className="bg-[var(--theme-card-bg)] border border-[var(--theme-border)] rounded-3xl overflow-hidden shadow-sm backdrop-blur-md">
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse text-left">
                            <thead>
                                <tr className="bg-[var(--theme-bg-accent)]/80 border-b border-[var(--theme-border)]">
                                    <th className="px-6 py-4 text-[11px] font-extrabold uppercase tracking-wider text-[var(--theme-text-muted)]">User</th>
                                    <th className="px-6 py-4 text-[11px] font-extrabold uppercase tracking-wider text-[var(--theme-text-muted)]">Joined Date</th>
                                    <th className="px-6 py-4 text-[11px] font-extrabold uppercase tracking-wider text-[var(--theme-text-muted)]">Last Login</th>
                                    <th className="px-6 py-4 text-[11px] font-extrabold uppercase tracking-wider text-[var(--theme-text-muted)]">Posts</th>
                                    <th className="px-6 py-4 text-[11px] font-extrabold uppercase tracking-wider text-[var(--theme-text-muted)]">Comments</th>
                                    <th className="px-6 py-4 text-[11px] font-extrabold uppercase tracking-wider text-[var(--theme-text-muted)]">Bookings</th>
                                    <th className="px-6 py-4 text-[11px] font-extrabold uppercase tracking-wider text-[var(--theme-text-muted)] text-right">Governance Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[var(--theme-border)]/40">
                                {filteredUsers.map((u) => (
                                    <tr key={u.id} className="hover:bg-[var(--theme-bg-accent)]/40 transition-colors">
                                        <td className="px-6 py-4 text-sm font-medium">
                                            <div className="flex items-center gap-3">
                                                <UserAvatar username={u.username} isAdmin={false} />
                                                <div>
                                                    <span className="font-bold text-[var(--theme-text-primary)] block">{u.username}</span>
                                                    <span className="text-[10px] text-[var(--theme-text-muted)] font-mono">ID: {u.id?.slice(0, 8)}...</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-xs font-medium text-[var(--theme-text-secondary)]">
                                            {formatDate(u.createdAt)}
                                        </td>
                                        <td className="px-6 py-4 text-xs font-medium text-[var(--theme-text-secondary)]">
                                            {formatDate(u.lastLogin)}
                                        </td>
                                        <td className="px-6 py-4 text-xs">
                                            <Badge type="posts">{u.postCount || 0} posts</Badge>
                                        </td>
                                        <td className="px-6 py-4 text-xs">
                                            <Badge type="comments">{u.commentCount || 0} comments</Badge>
                                        </td>
                                        <td className="px-6 py-4 text-xs">
                                            <Badge type="bookings">{u.bookingCount || 0} bookings</Badge>
                                        </td>
                                        <td className="px-6 py-4 text-xs text-right">
                                            <button 
                                                onClick={() => setDeleteConfirm({ id: u.id, username: u.username })}
                                                className="inline-flex items-center gap-1 text-xs font-bold text-rose-600 dark:text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 px-3 py-1.5 rounded-lg border border-rose-500/20 transition-all cursor-pointer"
                                            >
                                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                                <span>Delete User</span>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {filteredUsers.length === 0 && (
                        <div className="text-center py-16 text-[var(--theme-text-muted)]">
                            <div className="text-3xl mb-2">🔍</div>
                            <div className="text-sm font-bold">No registered users matched "{searchTerm}"</div>
                        </div>
                    )}
                </div>
            )}

            {/* TAB CONTENT: Login Audit Logs Table */}
            {activeTab === 'logins' && (
                <div className="bg-[var(--theme-card-bg)] border border-[var(--theme-border)] rounded-3xl overflow-hidden shadow-sm backdrop-blur-md">
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse text-left">
                            <thead>
                                <tr className="bg-[var(--theme-bg-accent)]/80 border-b border-[var(--theme-border)]">
                                    <th className="px-6 py-4 text-[11px] font-extrabold uppercase tracking-wider text-[var(--theme-text-muted)]">User</th>
                                    <th className="px-6 py-4 text-[11px] font-extrabold uppercase tracking-wider text-[var(--theme-text-muted)]">Role</th>
                                    <th className="px-6 py-4 text-[11px] font-extrabold uppercase tracking-wider text-[var(--theme-text-muted)]">Timestamp</th>
                                    <th className="px-6 py-4 text-[11px] font-extrabold uppercase tracking-wider text-[var(--theme-text-muted)]">IP Address</th>
                                    <th className="px-6 py-4 text-[11px] font-extrabold uppercase tracking-wider text-[var(--theme-text-muted)]">User Agent / Client</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[var(--theme-border)]/40">
                                {filteredLogs.map((l) => (
                                    <tr key={l._id} className="hover:bg-[var(--theme-bg-accent)]/40 transition-colors">
                                        <td className="px-6 py-4 text-sm font-medium">
                                            <div className="flex items-center gap-3">
                                                <UserAvatar username={l.username} isAdmin={l.isAdmin} />
                                                <span className="font-bold text-[var(--theme-text-primary)]">{l.username}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-xs">
                                            <Badge type={l.isAdmin ? 'admin' : 'user'}>{l.isAdmin ? 'Administrator' : 'Standard User'}</Badge>
                                        </td>
                                        <td className="px-6 py-4 text-xs font-medium text-[var(--theme-text-secondary)]">
                                            {formatDate(l.loginAt)}
                                        </td>
                                        <td className="px-6 py-4 text-xs font-mono text-[var(--theme-text-secondary)]">
                                            <span className="bg-slate-500/10 px-2 py-0.5 rounded text-[11px]">
                                                {l.ip || '127.0.0.1'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-xs text-[var(--theme-text-muted)] max-w-xs truncate font-mono" title={l.userAgent}>
                                            {l.userAgent || 'Web Browser'}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {filteredLogs.length === 0 && (
                        <div className="text-center py-16 text-[var(--theme-text-muted)]">
                            <div className="text-3xl mb-2">📜</div>
                            <div className="text-sm font-bold">No login logs found for "{searchTerm}"</div>
                        </div>
                    )}
                </div>
            )}

            {/* Account Deletion Modal */}
            {deleteConfirm && (
                <div 
                    className="fixed inset-0 bg-slate-950/70 backdrop-blur-md flex items-center justify-center z-[9999] p-4 animate-fade-in" 
                    onClick={() => setDeleteConfirm(null)}
                >
                    <div 
                        className="bg-[var(--theme-card-bg)] border border-[var(--theme-border)] rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl text-center relative overflow-hidden" 
                        onClick={e => e.stopPropagation()}
                    >
                        <div className="w-14 h-14 bg-rose-500/15 text-rose-600 dark:text-rose-400 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-rose-500/30">
                            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>
                        
                        <h3 className="text-xl font-extrabold text-[var(--theme-text-primary)] mb-2">Confirm Account Termination</h3>
                        <p className="text-xs text-[var(--theme-text-muted)] mb-6 leading-relaxed">
                            Are you sure you want to permanently delete user <strong className="text-rose-500 font-bold">{deleteConfirm.username}</strong>? This will remove all their posts, comments, bookings, and login logs from the database.
                        </p>
                        
                        <div className="flex gap-3 justify-center">
                            <button 
                                onClick={() => setDeleteConfirm(null)}
                                className="flex-1 py-3 px-4 rounded-xl border border-[var(--theme-border)] text-xs font-bold text-[var(--theme-text-primary)] hover:bg-[var(--theme-bg-accent)] transition-colors cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={() => handleDeleteUser(deleteConfirm.id)}
                                className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-rose-600 to-red-700 hover:from-rose-700 hover:to-red-800 text-white text-xs font-bold transition-all shadow-md cursor-pointer"
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

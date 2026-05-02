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

    if (role !== 'admin' && !error) return null;

    // Inline styles
    const s = {
        page: { minHeight: '100vh', padding: '100px 24px 60px', maxWidth: 1400, margin: '0 auto' },
        header: { marginBottom: 40 },
        title: { fontSize: 36, fontWeight: 900, fontFamily: 'var(--font-serif)', background: 'linear-gradient(135deg, #ff006e, #be0aff, #3333ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: 6 },
        subtitle: { color: 'var(--theme-text-muted)', fontSize: 14, letterSpacing: '0.05em' },
        statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 32 },
        statCard: (accent) => ({
            background: 'var(--theme-card-bg)', border: '1px solid var(--theme-border)', borderRadius: 16, padding: '24px 20px',
            position: 'relative', overflow: 'hidden', transition: 'transform 0.3s, box-shadow 0.3s',
        }),
        statAccent: (color) => ({ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: color }),
        statValue: { fontSize: 32, fontWeight: 900, fontFamily: 'var(--font-serif)', color: 'var(--theme-text-primary)', lineHeight: 1.1 },
        statLabel: { fontSize: 12, fontWeight: 600, color: 'var(--theme-text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: 6 },
        tabs: { display: 'flex', gap: 4, marginBottom: 24, background: 'var(--theme-card-bg)', borderRadius: 12, padding: 4, border: '1px solid var(--theme-border)', width: 'fit-content' },
        tab: (active) => ({
            padding: '10px 24px', borderRadius: 10, border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 13,
            background: active ? 'linear-gradient(135deg, #ff006e, #be0aff)' : 'transparent',
            color: active ? '#fff' : 'var(--theme-text-secondary)', transition: 'all 0.3s',
        }),
        searchBox: {
            width: '100%', maxWidth: 400, padding: '12px 16px 12px 44px', borderRadius: 12, border: '1px solid var(--theme-border)',
            background: 'var(--theme-input-bg)', color: 'var(--theme-text-primary)', fontSize: 14, outline: 'none', marginBottom: 20,
        },
        table: { width: '100%', borderCollapse: 'separate', borderSpacing: '0 8px' },
        th: { padding: '12px 16px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: 'var(--theme-text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' },
        td: { padding: '14px 16px', fontSize: 14, color: 'var(--theme-text-primary)', background: 'var(--theme-card-bg)', borderTop: '1px solid var(--theme-border)', borderBottom: '1px solid var(--theme-border)' },
        tdFirst: { borderLeft: '1px solid var(--theme-border)', borderTopLeftRadius: 12, borderBottomLeftRadius: 12 },
        tdLast: { borderRight: '1px solid var(--theme-border)', borderTopRightRadius: 12, borderBottomRightRadius: 12 },
        badge: (color) => ({ display: 'inline-block', padding: '4px 10px', borderRadius: 20, fontSize: 11, fontWeight: 700, background: color + '22', color }),
        deleteBtn: { padding: '6px 14px', borderRadius: 8, border: '1px solid #ff006e44', background: 'transparent', color: '#ff006e', fontSize: 12, fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s' },
        chartBar: (h, color) => ({ width: '100%', height: `${h}%`, background: color, borderRadius: '6px 6px 0 0', minHeight: 4, transition: 'height 0.5s ease' }),
        modalOverlay: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 },
        modalBox: { background: 'var(--theme-card-bg)', border: '1px solid var(--theme-border)', borderRadius: 20, padding: 32, maxWidth: 400, width: '90%', textAlign: 'center' },
    };

    const StatCard = ({ value, label, accent, icon }) => (
        <div style={s.statCard(accent)} className="hover:scale-[1.03] hover:shadow-lg">
            <div style={s.statAccent(accent)} />
            <div style={{ fontSize: 22, marginBottom: 8 }}>{icon}</div>
            <div style={s.statValue}>{value}</div>
            <div style={s.statLabel}>{label}</div>
        </div>
    );

    const MiniChart = ({ data, color, label }) => {
        if (!data || data.length === 0) return <div style={{ color: 'var(--theme-text-muted)', fontSize: 13 }}>No data yet</div>;
        const maxVal = Math.max(...data.map(d => d.count), 1);
        return (
            <div style={{ background: 'var(--theme-card-bg)', border: '1px solid var(--theme-border)', borderRadius: 16, padding: 24 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--theme-text-primary)', marginBottom: 16 }}>{label}</div>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, height: 100 }}>
                    {data.map((d, i) => (
                        <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end' }} title={`${d._id}: ${d.count}`}>
                            <div style={s.chartBar((d.count / maxVal) * 100, color)} />
                        </div>
                    ))}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 10, color: 'var(--theme-text-muted)' }}>
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
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                    <span style={{ fontSize: 28 }}>🛡️</span>
                    <h1 style={s.title}>Admin Dashboard</h1>
                </div>
                <p style={s.subtitle}>Welcome back, ADMIN — here's your platform overview</p>
            </div>

            {/* Stats Grid */}
            {stats && (
                <div style={s.statsGrid}>
                    <StatCard value={stats.totalUsers} label="Total Users" accent="#be0aff" icon="👥" />
                    <StatCard value={stats.totalLogins} label="Total Logins" accent="#3333ff" icon="🔑" />
                    <StatCard value={stats.totalPosts} label="Total Posts" accent="#ff006e" icon="📝" />
                    <StatCard value={stats.totalComments} label="Comments" accent="#00fbff" icon="💬" />
                    <StatCard value={stats.totalEvents} label="Events" accent="#fbff00" icon="📅" />
                    <StatCard value={stats.totalBookings} label="Bookings" accent="#ff8800" icon="🎫" />
                    <StatCard value={stats.recentSignups} label="Signups (7d)" accent="#00ff88" icon="📈" />
                    <StatCard value={stats.recentLogins} label="Logins (7d)" accent="#ff00cc" icon="🔥" />
                </div>
            )}

            {/* Mini Charts */}
            {stats && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 32 }}>
                    <MiniChart data={stats.dailyLogins} color="linear-gradient(180deg, #be0aff, #3333ff)" label="📊 Daily Logins (30 days)" />
                    <MiniChart data={stats.dailySignups} color="linear-gradient(180deg, #ff006e, #ff8800)" label="📊 Daily Signups (30 days)" />
                </div>
            )}

            {/* Tabs */}
            <div style={s.tabs}>
                {['overview', 'users', 'logins'].map(tab => (
                    <button key={tab} style={s.tab(activeTab === tab)} onClick={() => { setActiveTab(tab); setSearchTerm(''); }}>
                        {tab === 'overview' ? '📋 Overview' : tab === 'users' ? '👥 Users' : '🔑 Login Logs'}
                    </button>
                ))}
            </div>

            {/* Search */}
            {activeTab !== 'overview' && (
                <div style={{ position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 14, top: 12, fontSize: 18, opacity: 0.4 }}>🔍</span>
                    <input
                        style={s.searchBox}
                        placeholder={activeTab === 'users' ? 'Search users...' : 'Search login logs...'}
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                </div>
            )}

            {/* Overview Tab */}
            {activeTab === 'overview' && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: 20 }}>
                    {/* Recent Users */}
                    <div style={{ background: 'var(--theme-card-bg)', border: '1px solid var(--theme-border)', borderRadius: 16, padding: 24 }}>
                        <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, color: 'var(--theme-text-primary)' }}>👥 Recent Users</div>
                        {users.slice(0, 8).map((u, i) => (
                            <div key={u.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: i < 7 ? '1px solid var(--theme-border)' : 'none' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                    <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg, #ff006e, #be0aff)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: 14 }}>
                                        {u.username?.[0]?.toUpperCase()}
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--theme-text-primary)' }}>{u.username}</div>
                                        <div style={{ fontSize: 11, color: 'var(--theme-text-muted)' }}>Joined {formatDate(u.createdAt)}</div>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: 6 }}>
                                    <span style={s.badge('#be0aff')}>{u.postCount} posts</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Recent Logins */}
                    <div style={{ background: 'var(--theme-card-bg)', border: '1px solid var(--theme-border)', borderRadius: 16, padding: 24 }}>
                        <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, color: 'var(--theme-text-primary)' }}>🔑 Recent Logins</div>
                        {loginLogs.slice(0, 8).map((l, i) => (
                            <div key={l._id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: i < 7 ? '1px solid var(--theme-border)' : 'none' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                    <div style={{ width: 36, height: 36, borderRadius: '50%', background: l.isAdmin ? 'linear-gradient(135deg, #fbff00, #ff8800)' : 'linear-gradient(135deg, #3333ff, #00fbff)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>
                                        {l.isAdmin ? '👑' : '👤'}
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--theme-text-primary)' }}>{l.username}</div>
                                        <div style={{ fontSize: 11, color: 'var(--theme-text-muted)' }}>{formatDate(l.loginAt)}</div>
                                    </div>
                                </div>
                                <span style={s.badge(l.isAdmin ? '#ff8800' : '#3333ff')}>{l.isAdmin ? 'Admin' : 'User'}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Users Tab */}
            {activeTab === 'users' && (
                <div style={{ overflowX: 'auto' }}>
                    <table style={s.table}>
                        <thead>
                            <tr>
                                <th style={s.th}>#</th>
                                <th style={s.th}>Username</th>
                                <th style={s.th}>Joined</th>
                                <th style={s.th}>Last Login</th>
                                <th style={s.th}>Posts</th>
                                <th style={s.th}>Comments</th>
                                <th style={s.th}>Bookings</th>
                                <th style={s.th}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map((u, i) => (
                                <tr key={u.id}>
                                    <td style={{ ...s.td, ...s.tdFirst, fontWeight: 700, color: 'var(--theme-text-muted)' }}>{i + 1}</td>
                                    <td style={s.td}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                            <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg, #ff006e, #be0aff)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: 13, flexShrink: 0 }}>
                                                {u.username?.[0]?.toUpperCase()}
                                            </div>
                                            <span style={{ fontWeight: 700 }}>{u.username}</span>
                                        </div>
                                    </td>
                                    <td style={s.td}>{formatDate(u.createdAt)}</td>
                                    <td style={s.td}>{formatDate(u.lastLogin)}</td>
                                    <td style={s.td}><span style={s.badge('#be0aff')}>{u.postCount}</span></td>
                                    <td style={s.td}><span style={s.badge('#00fbff')}>{u.commentCount}</span></td>
                                    <td style={s.td}><span style={s.badge('#ff8800')}>{u.bookingCount}</span></td>
                                    <td style={{ ...s.td, ...s.tdLast }}>
                                        <button style={s.deleteBtn} onClick={() => setDeleteConfirm({ id: u.id, username: u.username })}
                                            onMouseEnter={e => { e.target.style.background = '#ff006e22'; }}
                                            onMouseLeave={e => { e.target.style.background = 'transparent'; }}>
                                            🗑️ Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {filteredUsers.length === 0 && <div style={{ textAlign: 'center', padding: 40, color: 'var(--theme-text-muted)' }}>No users found</div>}
                </div>
            )}

            {/* Login Logs Tab */}
            {activeTab === 'logins' && (
                <div style={{ overflowX: 'auto' }}>
                    <table style={s.table}>
                        <thead>
                            <tr>
                                <th style={s.th}>#</th>
                                <th style={s.th}>User</th>
                                <th style={s.th}>Type</th>
                                <th style={s.th}>Login Time</th>
                                <th style={s.th}>IP Address</th>
                                <th style={s.th}>Browser</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredLogs.map((l, i) => (
                                <tr key={l._id}>
                                    <td style={{ ...s.td, ...s.tdFirst, fontWeight: 700, color: 'var(--theme-text-muted)' }}>{i + 1}</td>
                                    <td style={s.td}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                            <span style={{ fontSize: 18 }}>{l.isAdmin ? '👑' : '👤'}</span>
                                            <span style={{ fontWeight: 700 }}>{l.username}</span>
                                        </div>
                                    </td>
                                    <td style={s.td}><span style={s.badge(l.isAdmin ? '#ff8800' : '#3333ff')}>{l.isAdmin ? 'Admin' : 'User'}</span></td>
                                    <td style={s.td}>{formatDate(l.loginAt)}</td>
                                    <td style={s.td}><span style={{ fontFamily: 'monospace', fontSize: 13 }}>{l.ip || '—'}</span></td>
                                    <td style={{ ...s.td, ...s.tdLast, maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: 12, color: 'var(--theme-text-muted)' }}>{l.userAgent?.slice(0, 60) || '—'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {filteredLogs.length === 0 && <div style={{ textAlign: 'center', padding: 40, color: 'var(--theme-text-muted)' }}>No login logs found</div>}
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {deleteConfirm && (
                <div style={s.modalOverlay} onClick={() => setDeleteConfirm(null)}>
                    <div style={s.modalBox} onClick={e => e.stopPropagation()}>
                        <div style={{ fontSize: 48, marginBottom: 16 }}>⚠️</div>
                        <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--theme-text-primary)', marginBottom: 8 }}>Delete User?</div>
                        <div style={{ fontSize: 14, color: 'var(--theme-text-muted)', marginBottom: 24 }}>
                            Are you sure you want to delete <strong style={{ color: '#ff006e' }}>{deleteConfirm.username}</strong>? This will remove all their posts, comments, and bookings.
                        </div>
                        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                            <button onClick={() => setDeleteConfirm(null)}
                                style={{ padding: '10px 24px', borderRadius: 10, border: '1px solid var(--theme-border)', background: 'transparent', color: 'var(--theme-text-primary)', fontWeight: 700, cursor: 'pointer' }}>
                                Cancel
                            </button>
                            <button onClick={() => handleDeleteUser(deleteConfirm.id, deleteConfirm.username)}
                                style={{ padding: '10px 24px', borderRadius: 10, border: 'none', background: 'linear-gradient(135deg, #ff006e, #cc0000)', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;

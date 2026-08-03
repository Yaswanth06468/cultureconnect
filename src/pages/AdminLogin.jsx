import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { API_BASE_URL } from '../config';
import { AuthContext } from '../context/AuthContext';

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const handleAdminLogin = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');
        setIsLoading(true);

        try {
            const res = await fetch(`${API_BASE_URL}/api/admin/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: username.trim(), password })
            });

            const data = await res.json();

            if (res.ok) {
                const adminUser = { username: data.username || username, role: 'admin' };
                localStorage.setItem('token', data.token);
                localStorage.setItem('role', 'admin');
                localStorage.setItem('username', adminUser.username);

                if (login) {
                    login(data.token, adminUser);
                }

                setSuccessMessage('Admin Authentication Successful. Redirecting...');
                setTimeout(() => {
                    navigate('/admin');
                }, 800);
            } else {
                setError(data.error || 'Invalid administrator credentials');
            }
        } catch (err) {
            setError('Server connection error. Please verify backend is running.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-28 relative overflow-hidden" style={{ backgroundColor: 'var(--theme-bg-primary)' }}>
            {/* Ambient Background Accents */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 dark:bg-emerald-500/15 rounded-full blur-3xl pointer-events-none"></div>

            <div className="w-full max-w-md relative z-10 animate-scale-in">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 text-white shadow-xl shadow-emerald-900/20 mb-4 border border-emerald-400/30">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-serif font-black tracking-tight" style={{ color: 'var(--theme-text-primary)' }}>
                        Admin Portal
                    </h1>
                    <p className="text-sm mt-1 font-medium" style={{ color: 'var(--theme-text-muted)' }}>
                        System Administration & Management Access
                    </p>
                </div>

                {/* Login Card */}
                <div 
                    className="p-8 rounded-3xl border shadow-2xl backdrop-blur-xl relative overflow-hidden"
                    style={{ 
                        backgroundColor: 'var(--theme-card-bg)',
                        borderColor: 'var(--theme-border)',
                    }}
                >
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500"></div>

                    {error && (
                        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 rounded-2xl font-medium text-sm flex items-center gap-3 animate-shake">
                            <span className="text-lg">⚠️</span>
                            <span>{error}</span>
                        </div>
                    )}

                    {successMessage && (
                        <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 rounded-2xl font-medium text-sm flex items-center gap-3">
                            <span className="text-lg">🛡️</span>
                            <span>{successMessage}</span>
                        </div>
                    )}

                    <form onSubmit={handleAdminLogin} className="space-y-5">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--theme-text-secondary)' }}>
                                Admin Username
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </span>
                                <input
                                    type="text"
                                    placeholder="Enter admin username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all font-medium text-sm"
                                    style={{
                                        backgroundColor: 'var(--theme-input-bg)',
                                        borderColor: 'var(--theme-border)',
                                        color: 'var(--theme-text-primary)'
                                    }}
                                    required
                                    autoFocus
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--theme-text-secondary)' }}>
                                Security Passkey / Password
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </span>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter admin password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-12 pr-12 py-3.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all font-medium text-sm"
                                    style={{
                                        backgroundColor: 'var(--theme-input-bg)',
                                        borderColor: 'var(--theme-border)',
                                        color: 'var(--theme-text-primary)'
                                    }}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                                >
                                    {showPassword ? (
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858-5.908a10.11 10.11 0 012.122-.063c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21M3 3l18 18"/></svg>
                                    ) : (
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-4 px-6 rounded-xl text-white font-bold text-sm tracking-wide shadow-lg transition-all duration-300 transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            style={{
                                background: 'linear-gradient(135deg, #059669 0%, #0d9668 50%, #0f766e 100%)',
                                boxShadow: '0 4px 20px rgba(5, 150, 105, 0.35)'
                            }}
                        >
                            {isLoading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    <span>Authenticating Admin...</span>
                                </>
                            ) : (
                                <>
                                    <span>Authenticate Access</span>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-6 pt-6 border-t text-center flex flex-col gap-2" style={{ borderColor: 'var(--theme-border)' }}>
                        <Link 
                            to="/login" 
                            className="text-xs font-semibold hover:underline flex items-center justify-center gap-1 transition-colors"
                            style={{ color: 'var(--theme-text-muted)' }}
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
                            Back to Standard User Login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;

import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { API_BASE_URL } from '../config';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');
        setIsLoading(true);
        try {
            const isLoggingInAsAdmin = username.trim().toUpperCase() === 'ADMIN';
            const endpoint = isLoggingInAsAdmin ? `${API_BASE_URL}/api/admin/login` : `${API_BASE_URL}/api/auth/login`;

            const res = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            const data = await res.json();
            if (res.ok) {
                if (login) {
                    login(data.token, data.user || { username: data.username || username, role: data.role });
                } else {
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('username', data.username || username);
                }
                setSuccessMessage('Login successful!');
                setTimeout(() => {
                    if (data.role === 'admin') {
                        navigate('/admin');
                    } else {
                        navigate('/');
                    }
                }, 1000);
            } else {
                setError(data.error || 'Invalid username or password');
            }
        } catch (err) {
            setError('Unable to connect to server. Please try again in a moment.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-6 py-28 max-w-md animate-scale-in">
            <h2 className="text-4xl font-serif font-black mb-6 text-white text-center">
                Log In
            </h2>

            {error && (
                <div className="mb-4 p-3.5 bg-red-500/10 border border-red-500/30 text-red-400 rounded-2xl font-semibold text-sm flex items-center gap-2.5 backdrop-blur-md">
                    <span>⚠️</span>
                    <span>{error}</span>
                </div>
            )}

            {successMessage && (
                <div className="mb-4 p-3.5 bg-emerald-500/10 border border-emerald-500/30 text-[var(--theme-accent-primary)] rounded-2xl font-semibold text-sm flex items-center gap-2.5 backdrop-blur-md">
                    <span>✅</span>
                    <span>{successMessage}</span>
                </div>
            )}
            
            <div className="flat-card p-8 rounded-3xl flex flex-col gap-6 relative">
                <form onSubmit={handleLogin} className="flex flex-col gap-5">
                    <label className="text-zinc-300 font-bold text-xs uppercase tracking-wider">
                        Username
                        <input
                            type="text"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full mt-2 p-3.5 border border-white/10 rounded-2xl bg-[var(--theme-input-bg)] text-white placeholder-zinc-500 focus:border-[var(--theme-accent-primary)] focus:ring-2 focus:ring-[var(--theme-accent-primary)]/20 focus:outline-none transition-all"
                            required
                        />
                    </label>

                    <label className="text-zinc-300 font-bold text-xs uppercase tracking-wider">
                        Password
                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full mt-2 p-3.5 border border-white/10 rounded-2xl bg-[var(--theme-input-bg)] text-white placeholder-zinc-500 focus:border-[var(--theme-accent-primary)] focus:ring-2 focus:ring-[var(--theme-accent-primary)]/20 focus:outline-none transition-all"
                            required
                        />
                    </label>

                    <button 
                        type="submit" 
                        disabled={isLoading}
                        className="w-full py-4 mt-2 rounded-2xl text-black bg-[var(--theme-accent-primary)] hover:bg-[#34d399] font-bold transition-all shadow-[0_0_25px_rgba(15,240,160,0.3)] hover:shadow-[0_0_35px_rgba(15,240,160,0.5)]"
                    >
                        {isLoading ? 'Logging in...' : 'Log In'}
                    </button>
                </form>

                <div className="text-center text-sm text-zinc-400 flex flex-col gap-4 pt-2">
                    <div>
                        Don't have an account? <Link to="/signup" className="text-[var(--theme-accent-primary)] hover:underline font-bold">Sign Up</Link>
                    </div>
                    <div className="pt-4 border-t border-white/10">
                        <Link 
                            to="/admin/login" 
                            className="inline-flex items-center gap-2 text-xs font-bold text-[var(--theme-accent-primary)] hover:text-white transition-colors px-4 py-2 rounded-xl bg-[var(--theme-accent-primary)]/10 hover:bg-[var(--theme-accent-primary)]/20 border border-[var(--theme-accent-primary)]/30"
                        >
                            <span>🛡️</span>
                            <span>Admin Portal Login</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;


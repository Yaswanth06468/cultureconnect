import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { API_BASE_URL } from '../config';
import { AuthContext } from '../context/AuthContext';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const handleSignup = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setIsLoading(true);
        try {
            const res = await fetch(`${API_BASE_URL}/api/auth/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            const data = await res.json();
            if (res.ok) {
                if (data.token && data.user) {
                    login(data.token, data.user);
                } else if (data.token) {
                    login(data.token, { username });
                }
                setSuccessMessage('Account created successfully!');
                setTimeout(() => {
                    if (data.token) {
                        navigate('/');
                    } else {
                        navigate('/login');
                    }
                }, 1000);
            } else {
                setError(data.error || 'Failed to create account');
            }
        } catch (err) {
            setError('Unable to connect to server. Please check your internet connection.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-6 py-28 max-w-md animate-scale-in">
            <h2 className="text-4xl font-serif font-black mb-6 text-white text-center">
                Sign Up
            </h2>
            
            {error && (
                <div className="mb-4 p-3.5 bg-red-500/10 border border-red-500/30 text-red-400 rounded-2xl font-semibold text-sm flex items-center gap-2.5 backdrop-blur-md">
                    <span>⚠️</span>
                    <span>{error}</span>
                </div>
            )}

            {successMessage && (
                <div className="mb-4 p-3.5 bg-emerald-500/10 border border-emerald-500/30 text-[#0ff0a0] rounded-2xl font-semibold text-sm flex items-center gap-2.5 backdrop-blur-md">
                    <span>✅</span>
                    <span>{successMessage}</span>
                </div>
            )}
            
            <div className="obsidian-glass p-8 rounded-3xl flex flex-col gap-6 border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.8)] relative">
                <form onSubmit={handleSignup} className="flex flex-col gap-5">
                    <label className="text-zinc-300 font-bold text-xs uppercase tracking-wider">
                        Username
                        <input
                            type="text"
                            placeholder="Choose a username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full mt-2 p-3.5 border border-white/10 rounded-2xl bg-[#161622] text-white placeholder-zinc-500 focus:border-[#0ff0a0] focus:ring-2 focus:ring-[#0ff0a0]/20 focus:outline-none transition-all"
                            required
                        />
                    </label>

                    <label className="text-zinc-300 font-bold text-xs uppercase tracking-wider">
                        Password
                        <input
                            type="password"
                            placeholder="Choose a password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full mt-2 p-3.5 border border-white/10 rounded-2xl bg-[#161622] text-white placeholder-zinc-500 focus:border-[#0ff0a0] focus:ring-2 focus:ring-[#0ff0a0]/20 focus:outline-none transition-all"
                            required
                        />
                    </label>

                    <label className="text-zinc-300 font-bold text-xs uppercase tracking-wider">
                        Confirm Password
                        <input
                            type="password"
                            placeholder="Confirm your password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full mt-2 p-3.5 border border-white/10 rounded-2xl bg-[#161622] text-white placeholder-zinc-500 focus:border-[#0ff0a0] focus:ring-2 focus:ring-[#0ff0a0]/20 focus:outline-none transition-all"
                            required
                        />
                    </label>

                    <button 
                        type="submit" 
                        disabled={isLoading}
                        className="w-full py-4 mt-2 rounded-2xl text-black bg-[#0ff0a0] hover:bg-[#34d399] font-bold transition-all shadow-[0_0_25px_rgba(15,240,160,0.3)] hover:shadow-[0_0_35px_rgba(15,240,160,0.5)]"
                    >
                        {isLoading ? 'Creating Account...' : 'Sign Up'}
                    </button>
                </form>

                <div className="text-center text-sm text-zinc-400">
                    Already have an account? <Link to="/login" className="text-[#0ff0a0] hover:underline font-bold">Log In</Link>
                </div>
            </div>
        </div>
    );
};

export default Signup;


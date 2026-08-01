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
        <div className="container mx-auto px-6 py-24 max-w-md animate-scale-in">
            <h2 className="text-3xl font-serif font-bold mb-6 text-text-primary animate-slide-up-reveal text-center">
                Sign Up
            </h2>
            
            {error && (
                <div className="mb-4 p-3 bg-red-100 dark:bg-red-950/60 border border-red-400 text-red-700 dark:text-red-300 rounded-xl font-semibold text-sm flex items-center gap-2">
                    <span>⚠️</span>
                    <span>{error}</span>
                </div>
            )}

            {successMessage && (
                <div className="mb-4 p-3 bg-green-100 dark:bg-green-950/60 border border-green-400 text-green-800 dark:text-green-300 rounded-xl font-semibold text-sm flex items-center gap-2">
                    <span>✅</span>
                    <span>{successMessage}</span>
                </div>
            )}
            
            <div className="border border-black/10 p-8 bg-bg-secondary flex flex-col gap-6 rounded-2xl shadow-sm">
                <form onSubmit={handleSignup} className="flex flex-col gap-4">
                    <label className="text-text-primary font-bold text-sm">Username
                        <input
                            type="text"
                            placeholder="Choose a username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full mt-1.5 p-3 border border-gray-300 dark:border-zinc-700 rounded-xl bg-bg-primary text-text-primary focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required
                        />
                    </label>

                    <label className="text-text-primary font-bold text-sm">Password
                        <input
                            type="password"
                            placeholder="Choose a password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full mt-1.5 p-3 border border-gray-300 dark:border-zinc-700 rounded-xl bg-bg-primary text-text-primary focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required
                        />
                    </label>

                    <label className="text-text-primary font-bold text-sm">Confirm Password
                        <input
                            type="password"
                            placeholder="Confirm your password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full mt-1.5 p-3 border border-gray-300 dark:border-zinc-700 rounded-xl bg-bg-primary text-text-primary focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required
                        />
                    </label>

                    <button 
                        type="submit" 
                        disabled={isLoading}
                        className="btn btn-primary w-full py-3 mt-2 rounded-xl text-white bg-blue-600 hover:bg-blue-700 font-bold transition-all"
                    >
                        {isLoading ? 'Creating Account...' : 'Sign Up'}
                    </button>
                </form>

                <div className="text-center text-sm mt-2 text-text-secondary">
                    Already have an account? <Link to="/login" className="text-blue-500 hover:underline font-semibold">Log In</Link>
                </div>
            </div>
        </div>
    );
};

export default Signup;


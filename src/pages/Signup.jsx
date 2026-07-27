import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { API_BASE_URL } from '../config';
import GoogleAuthButton from '../components/GoogleAuthButton';
import { AuthContext } from '../context/AuthContext';

const Signup = () => {
    const [fullName, setFullName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
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
                body: JSON.stringify({ username, password, email, fullName })
            });
            const data = await res.json();
            if (res.ok) {
                setSuccessMessage(data.message || 'Account created successfully! Please check your email to verify your account.');
                setTimeout(() => navigate('/login'), 4000);
            } else {
                setError(data.error || 'Failed to create account');
            }
        } catch (err) {
            setError('Unable to connect to server. Please check your internet connection.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleSuccess = (data) => {
        login(data.token, data.user);
        setSuccessMessage('Google Sign-In successful!');
        setTimeout(() => navigate('/'), 2000);
    };

    return (
        <div className="container mx-auto px-6 py-24 max-w-md animate-scale-in">
            <h2 className="text-3xl font-serif font-bold mb-6 text-text-primary animate-slide-up-reveal">
                <span>Sign Up</span>
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
                <div>
                    <GoogleAuthButton
                        buttonText="Sign up with Google"
                        onSuccess={handleGoogleSuccess}
                        onError={(err) => setError(err)}
                    />
                </div>

                <div className="relative flex items-center justify-center my-2">
                    <div className="border-t border-gray-300 w-full"></div>
                    <span className="bg-bg-secondary px-3 text-xs text-gray-500 font-semibold uppercase absolute">OR</span>
                </div>

                <form onSubmit={handleSignup} className="flex flex-col gap-4">
                    <label className="text-text-primary font-bold text-sm">Full Name *
                        <input
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="w-full mt-1.5 p-3 border border-gray-300 dark:border-zinc-700 rounded-xl bg-bg-primary text-text-primary focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required
                        />
                    </label>

                    <label className="text-text-primary font-bold text-sm">Username *
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full mt-1.5 p-3 border border-gray-300 dark:border-zinc-700 rounded-xl bg-bg-primary text-text-primary focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required
                        />
                    </label>

                    <label className="text-text-primary font-bold text-sm">Email Address *
                        <input
                            type="email"
                            placeholder="customer@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full mt-1.5 p-3 border border-gray-300 dark:border-zinc-700 rounded-xl bg-bg-primary text-text-primary focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required
                        />
                    </label>

                    <label className="text-text-primary font-bold text-sm">Password *
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full mt-1.5 p-3 border border-gray-300 dark:border-zinc-700 rounded-xl bg-bg-primary text-text-primary focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required
                        />
                    </label>
                    
                    <label className="text-text-primary font-bold text-sm">Confirm Password *
                        <input
                            type="password"
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
                    Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Log In</Link>
                </div>
            </div>
        </div>
    );
};

export default Signup;

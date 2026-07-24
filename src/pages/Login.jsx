import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config';
import GoogleAuthButton from '../components/GoogleAuthButton';

const Login = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');
        setIsLoading(true);
        try {
            const isLoggingInAsAdmin = username.toUpperCase() === 'ADMIN';
            const endpoint = isLoggingInAsAdmin ? `${API_BASE_URL}/api/admin/login` : `${API_BASE_URL}/api/auth/login`;
            const res = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    username: isLoggingInAsAdmin ? 'ADMIN' : username, 
                    password,
                    email 
                })
            });
            const data = await res.json();
            if (res.ok) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('username', data.username);
                if (data.email) localStorage.setItem('email', data.email);
                if (data.role) {
                    localStorage.setItem('role', data.role);
                } else {
                    localStorage.removeItem('role');
                }

                if (data.emailSent) {
                    setSuccessMessage(data.emailMessage || 'Sign-in notification email sent successfully. Please check your inbox.');
                    setError('');
                } else if (data.email || email) {
                    setError(data.emailError || data.emailMessage || 'Failed to send sign-in notification email. Please try again later.');
                    setSuccessMessage('');
                } else {
                    setSuccessMessage('Login successful!');
                    setError('');
                }

                setTimeout(() => {
                    if (data.role === 'admin') {
                        navigate('/admin');
                    } else {
                        navigate('/');
                    }
                }, 2000);
            } else {
                setError(data.error || 'Invalid username or password');
            }
        } catch (err) {
            setError('Unable to connect to server. Please try again in a moment.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleSuccess = (data) => {
        if (data.emailSent) {
            setSuccessMessage(data.emailMessage || 'Sign-in notification email sent successfully. Please check your inbox.');
            setError('');
        } else if (data.email) {
            setError(data.emailError || data.emailMessage || 'Failed to send sign-in notification email. Please try again later.');
            setSuccessMessage('');
        } else {
            setSuccessMessage('Google Sign-In successful!');
            setError('');
        }
        setTimeout(() => navigate('/'), 2000);
    };

    return (
        <div className="container mx-auto px-6 py-24 max-w-md animate-scale-in">
            <h2 className="text-3xl font-serif font-bold mb-6 text-text-primary animate-slide-up-reveal">
                <span>Log In</span>
            </h2>

            {/* Delivery Error Notification Banner */}
            {error && (
                <div className="mb-4 p-3 bg-red-100 dark:bg-red-950/60 border border-red-400 text-red-700 dark:text-red-300 rounded-xl font-semibold text-sm flex items-center gap-2">
                    <span>⚠️</span>
                    <span>{error}</span>
                </div>
            )}

            {/* Delivery Success Notification Banner (Only shown when email service confirms delivery) */}
            {successMessage && (
                <div className="mb-4 p-3 bg-green-100 dark:bg-green-950/60 border border-green-400 text-green-800 dark:text-green-300 rounded-xl font-semibold text-sm flex items-center gap-2">
                    <span>📧</span>
                    <span>{successMessage}</span>
                </div>
            )}
            
            <div className="border border-black/10 p-8 bg-bg-secondary flex flex-col gap-6 rounded-2xl shadow-sm">
                {/* Google Sign-In Option */}
                <div>
                    <GoogleAuthButton
                        buttonText="Sign in with Google"
                        onSuccess={handleGoogleSuccess}
                        onError={(err) => setError(err)}
                    />
                </div>

                <div className="relative flex items-center justify-center my-2">
                    <div className="border-t border-gray-300 w-full"></div>
                    <span className="bg-bg-secondary px-3 text-xs text-gray-500 font-semibold uppercase absolute">OR</span>
                </div>

                <form onSubmit={handleLogin} className="flex flex-col gap-4">
                    <label className="text-text-primary font-bold text-sm">Username
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full mt-1.5 p-3 border border-gray-300 dark:border-zinc-700 rounded-xl bg-bg-primary text-text-primary focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required
                        />
                    </label>

                    <label className="text-text-primary font-bold text-sm">Email ID (for login notification)
                        <input
                            type="email"
                            placeholder="customer@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full mt-1.5 p-3 border border-gray-300 dark:border-zinc-700 rounded-xl bg-bg-primary text-text-primary focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </label>

                    <label className="text-text-primary font-bold text-sm">Password
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full mt-1.5 p-3 border border-gray-300 dark:border-zinc-700 rounded-xl bg-bg-primary text-text-primary focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required
                        />
                    </label>

                    <button 
                        type="submit" 
                        disabled={isLoading}
                        className="btn btn-primary w-full py-3 mt-2 rounded-xl text-white bg-blue-600 hover:bg-blue-700 font-bold transition-all"
                    >
                        {isLoading ? 'Logging in...' : 'Log In'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;

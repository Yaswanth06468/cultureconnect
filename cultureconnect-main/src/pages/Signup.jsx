import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config';
import GoogleAuthButton from '../components/GoogleAuthButton';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');
        setIsLoading(true);
        try {
            const res = await fetch(`${API_BASE_URL}/api/auth/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password, email })
            });
            const data = await res.json();
            if (res.ok) {
                if (data.emailNotificationSent) {
                    setSuccessMessage('Account created! A welcome notification email was sent to your email ID.');
                }
                setTimeout(() => navigate('/login'), 1500);
            } else {
                setError(data.error || 'Failed to create account');
            }
        } catch (err) {
            setError('Unable to connect to server. It might be waking up, please try again in a moment.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleSuccess = (data) => {
        setSuccessMessage(`Welcome ${data.username}! A welcome email notification was sent to ${data.email || 'your email ID'}.`);
        setTimeout(() => navigate('/'), 1200);
    };

    return (
        <div className="container mx-auto px-6 py-24 max-w-md animate-scale-in">
            <h2 className="text-3xl font-serif font-bold mb-6 text-text-primary animate-slide-up-reveal">
                <span>Sign Up</span>
            </h2>
            {error && <p className="text-accent-terra mb-4 font-bold">{error}</p>}
            {successMessage && (
                <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-800 rounded font-semibold text-sm flex items-center gap-2">
                    <span>📧</span>
                    <span>{successMessage}</span>
                </div>
            )}
            
            <div className="border border-black/10 p-8 bg-bg-secondary flex flex-col gap-6">
                {/* Google Sign-Up Option */}
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
                    <label className="text-text-primary font-bold">Username *
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full mt-2 p-3 border border-text-secondary bg-bg-primary text-text-primary"
                            required
                        />
                    </label>

                    <label className="text-text-primary font-bold">Email ID (for mail notifications)
                        <input
                            type="email"
                            placeholder="customer@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full mt-2 p-3 border border-text-secondary bg-bg-primary text-text-primary"
                        />
                    </label>

                    <label className="text-text-primary font-bold">Password *
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full mt-2 p-3 border border-text-secondary bg-bg-primary text-text-primary"
                            required
                        />
                    </label>

                    <button 
                        type="submit" 
                        disabled={isLoading}
                        className={`mt-4 px-6 py-3 font-bold transition-colors ${isLoading ? 'bg-gray-400 cursor-not-allowed text-white' : 'bg-text-primary text-bg-primary hover:bg-accent-blue'}`}
                    >
                        {isLoading ? 'Creating Account...' : 'Create Account'}
                    </button>
                    <p className="mt-4 text-center">
                        Already have an account? <a href="/login" className="text-accent-blue underline">Log in here</a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Signup;

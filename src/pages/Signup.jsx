import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        try {
            const res = await fetch(`${API_BASE_URL}/api/auth/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            const data = await res.json();
            if (res.ok) {
                navigate('/login');
            } else {
                setError(data.error || 'Failed to create account');
            }
        } catch (err) {
            setError('Unable to connect to server. It might be waking up (Render free tier), please try again in a moment.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-6 py-24 max-w-md animate-scale-in">
            <h2 className="text-3xl font-serif font-bold mb-6 text-text-primary animate-slide-up-reveal">
                <span>Sign Up</span>
            </h2>
            {error && <p className="text-accent-terra mb-4 font-bold">{error}</p>}
            <form onSubmit={handleSignup} className="flex flex-col gap-4 border border-black/10 p-8 bg-bg-secondary">
                <label className="text-text-primary font-bold">Username
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full mt-2 p-3 border border-text-secondary bg-bg-primary text-text-primary"
                        required
                    />
                </label>
                <label className="text-text-primary font-bold">Password
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
    );
};

export default Signup;

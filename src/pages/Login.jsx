import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        try {
            const endpoint = username === 'ADMIN' ? `${API_BASE_URL}/api/admin/login` : `${API_BASE_URL}/api/auth/login`;
            const res = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            const data = await res.json();
            if (res.ok) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('username', data.username);
                if (data.role) {
                    localStorage.setItem('role', data.role);
                } else {
                    localStorage.removeItem('role');
                }
                navigate('/');
            } else {
                setError(data.error || 'Invalid username or password');
            }
        } catch (err) {
            setError('Unable to connect to server. It might be waking up (Render free tier), please try again in a moment.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-6 py-24 max-w-md">
            <h2 className="text-3xl font-serif font-bold mb-6 text-text-primary">Log In</h2>
            {error && <p className="text-accent-terra mb-4 font-bold">{error}</p>}
            <form onSubmit={handleLogin} className="flex flex-col gap-4 border border-black/10 p-8 bg-bg-secondary">
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
                    {isLoading ? 'Logging in...' : 'Submit'}
                </button>
                <p className="mt-4 text-center">
                    Don't have an account? <a href="/signup" className="text-accent-blue underline">Sign up here</a>
                </p>
            </form>
        </div>
    );
};

export default Login;

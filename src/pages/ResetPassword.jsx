import { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';

const ResetPassword = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const navigate = useNavigate();

    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!token) {
            setError('Invalid or missing password reset token.');
        }
    }, [token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        setIsLoading(true);

        try {
            const res = await fetch(`${API_BASE_URL}/api/auth/reset-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token, newPassword })
            });
            const data = await res.json();
            
            if (res.ok) {
                setMessage(data.message);
                setTimeout(() => navigate('/login'), 3000);
            } else {
                setError(data.error || 'Failed to reset password');
            }
        } catch (err) {
            setError('Network error. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-6 py-24 max-w-md">
            <h2 className="text-3xl font-serif font-bold mb-6 text-text-primary">Set New Password</h2>
            
            {message && <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-800 rounded">{message}</div>}
            {error && <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">{error}</div>}
            
            {!error && !message && token && (
                <form onSubmit={handleSubmit} className="bg-bg-secondary p-8 rounded-2xl shadow-sm flex flex-col gap-4">
                    <label className="text-text-primary font-bold text-sm">New Password
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full mt-1.5 p-3 border border-gray-300 rounded-xl bg-bg-primary text-text-primary"
                            required
                        />
                    </label>
                    <button type="submit" disabled={isLoading} className="btn btn-primary w-full py-3 mt-2 rounded-xl text-white bg-blue-600 hover:bg-blue-700 font-bold transition-all">
                        {isLoading ? 'Resetting...' : 'Reset Password'}
                    </button>
                </form>
            )}
            {error && (
                <div className="text-center mt-4">
                    <Link to="/forgot-password" className="text-blue-500 hover:underline text-sm">Request a new reset link</Link>
                </div>
            )}
        </div>
    );
};
export default ResetPassword;

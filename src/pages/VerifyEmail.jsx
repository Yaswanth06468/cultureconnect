import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { API_BASE_URL } from '../config';

const VerifyEmail = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    
    const [status, setStatus] = useState('verifying'); // verifying, success, error
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (!token) {
            setStatus('error');
            setMessage('Invalid verification link. Token is missing.');
            return;
        }

        const verify = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/api/auth/verify-email`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ token })
                });
                const data = await res.json();
                
                if (res.ok) {
                    setStatus('success');
                    setMessage(data.message);
                } else {
                    setStatus('error');
                    setMessage(data.error || 'Verification failed');
                }
            } catch (err) {
                setStatus('error');
                setMessage('Network error. Please try again.');
            }
        };

        verify();
    }, [token]);

    return (
        <div className="container mx-auto px-6 py-24 max-w-md text-center">
            <div className="bg-bg-secondary p-8 rounded-2xl shadow-sm">
                {status === 'verifying' && (
                    <>
                        <h2 className="text-2xl font-bold mb-4 text-text-primary">Verifying Email...</h2>
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
                    </>
                )}
                {status === 'success' && (
                    <>
                        <h2 className="text-2xl font-bold mb-4 text-green-600">Email Verified!</h2>
                        <p className="text-text-secondary mb-6">{message}</p>
                        <Link to="/login" className="btn btn-primary px-6 py-2 rounded-xl text-white bg-blue-600 hover:bg-blue-700 font-bold transition-all">
                            Go to Login
                        </Link>
                    </>
                )}
                {status === 'error' && (
                    <>
                        <h2 className="text-2xl font-bold mb-4 text-red-600">Verification Failed</h2>
                        <p className="text-text-secondary mb-6">{message}</p>
                        <Link to="/signup" className="text-blue-500 hover:underline">Return to Sign Up</Link>
                    </>
                )}
            </div>
        </div>
    );
};
export default VerifyEmail;

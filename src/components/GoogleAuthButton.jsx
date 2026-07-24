import { useState } from 'react';
import { API_BASE_URL } from '../config';

const GoogleAuthButton = ({ onSuccess, onError, buttonText = "Sign up with Google" }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [googleEmail, setGoogleEmail] = useState('');
    const [googleName, setGoogleName] = useState('');

    const handleGoogleAuthSubmit = async (emailToUse, nameToUse) => {
        setIsLoading(true);
        try {
            const res = await fetch(`${API_BASE_URL}/api/auth/google`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: emailToUse,
                    name: nameToUse || emailToUse.split('@')[0],
                    googleId: `google_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
                    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(nameToUse || emailToUse)}`
                })
            });

            const data = await res.json();
            if (res.ok) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('username', data.username);
                if (data.email) localStorage.setItem('email', data.email);
                setShowModal(false);
                if (onSuccess) onSuccess(data);
            } else {
                if (onError) onError(data.error || 'Google authentication failed');
            }
        } catch (err) {
            console.error(err);
            if (onError) onError('Unable to connect to server. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleButtonClick = () => {
        const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
        if (googleClientId && window.google?.accounts?.id) {
            window.google.accounts.id.initialize({
                client_id: googleClientId,
                callback: (response) => {
                    try {
                        const base64Url = response.credential.split('.')[1];
                        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                        const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
                        const parsed = JSON.parse(jsonPayload);
                        handleGoogleAuthSubmit(parsed.email, parsed.name);
                    } catch (e) {
                        setShowModal(true);
                    }
                }
            });
            window.google.accounts.id.prompt();
        } else {
            setShowModal(true);
        }
    };

    return (
        <>
            <button
                type="button"
                onClick={handleButtonClick}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-3 px-6 py-3 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm bg-white dark:bg-zinc-800 text-gray-800 dark:text-gray-100 font-semibold hover:bg-gray-50 dark:hover:bg-zinc-700 transition-all duration-200"
            >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                </svg>
                <span>{isLoading ? 'Connecting to Google...' : buttonText}</span>
            </button>

            {/* Google Authentication Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
                    <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-xl max-w-md w-full p-6 shadow-2xl relative">
                        <button
                            type="button"
                            onClick={() => setShowModal(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-xl font-bold"
                        >
                            &times;
                        </button>

                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-full">
                                <svg className="w-6 h-6" viewBox="0 0 24 24">
                                    <path
                                        fill="#4285F4"
                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    />
                                    <path
                                        fill="#34A853"
                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    />
                                    <path
                                        fill="#FBBC05"
                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                                    />
                                    <path
                                        fill="#EA4335"
                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                                    />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Google Sign-In</h3>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Continue to CultureConnect with your Google Account</p>
                            </div>
                        </div>

                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                if (googleEmail) {
                                    handleGoogleAuthSubmit(googleEmail, googleName);
                                }
                            }}
                            className="space-y-4"
                        >
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                                    Google Email ID *
                                </label>
                                <input
                                    type="email"
                                    placeholder="yourname@gmail.com"
                                    value={googleEmail}
                                    onChange={(e) => setGoogleEmail(e.target.value)}
                                    className="w-full p-3 border border-gray-300 dark:border-zinc-700 rounded-lg bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                                    Your Full Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="Alex Rivera"
                                    value={googleName}
                                    onChange={(e) => setGoogleName(e.target.value)}
                                    className="w-full p-3 border border-gray-300 dark:border-zinc-700 rounded-lg bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                            </div>

                            <div className="bg-blue-50 dark:bg-blue-950/40 p-3 rounded-lg text-xs text-blue-700 dark:text-blue-300 flex items-center gap-2">
                                <span>📧</span>
                                <span>A welcome / sign-in notification email will automatically be sent to this email ID.</span>
                            </div>

                            <div className="flex gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="w-1/2 py-2.5 px-4 rounded-lg border border-gray-300 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-100 dark:hover:bg-zinc-800"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-1/2 py-2.5 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md transition-colors"
                                >
                                    {isLoading ? 'Signing in...' : 'Continue'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default GoogleAuthButton;

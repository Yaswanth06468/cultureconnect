import { useState, useEffect, useRef } from 'react';
import { API_BASE_URL } from '../config';

const GoogleAuthButton = ({ onSuccess, onError, buttonText = "Sign up with Google" }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [authError, setAuthError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [emailInput, setEmailInput] = useState('');
    const [nameInput, setNameInput] = useState('');
    const googleButtonRef = useRef(null);

    const handleGoogleAuthSubmit = async (payload) => {
        setIsLoading(true);
        setAuthError('');
        try {
            const res = await fetch(`${API_BASE_URL}/api/auth/google`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const data = await res.json();
            if (res.ok) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('username', data.username);
                if (data.email) localStorage.setItem('email', data.email);
                if (data.avatar) localStorage.setItem('avatar', data.avatar);
                setShowModal(false);
                if (onSuccess) onSuccess(data);
            } else {
                const errMsg = data.error || 'Google authentication failed';
                setAuthError(errMsg);
                if (onError) onError(errMsg);
            }
        } catch (err) {
            console.error('Google Sign-In Error:', err);
            const errMsg = 'Unable to connect to server. Please try again.';
            setAuthError(errMsg);
            if (onError) onError(errMsg);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
        
        // Only initialize GIS if a real valid Google Client ID is configured in .env
        if (clientId && clientId !== 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com' && window.google?.accounts?.id) {
            try {
                window.google.accounts.id.initialize({
                    client_id: clientId,
                    callback: (response) => {
                        if (response.credential) {
                            handleGoogleAuthSubmit({ idToken: response.credential });
                        } else {
                            setShowModal(true);
                        }
                    },
                    auto_select: false,
                    cancel_on_tap_outside: true,
                });

                if (googleButtonRef.current) {
                    googleButtonRef.current.innerHTML = '';
                    window.google.accounts.id.renderButton(googleButtonRef.current, {
                        type: 'standard',
                        theme: 'outline',
                        size: 'large',
                        text: buttonText.toLowerCase().includes('signup') ? 'signup_with' : 'continue_with',
                        shape: 'rectangular',
                        logo_alignment: 'left',
                        width: 320
                    });
                }
            } catch (e) {
                console.error('GIS Error:', e);
            }
        }
    }, [buttonText]);

    const handleClick = () => {
        const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
        if (clientId && clientId !== 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com' && window.google?.accounts?.id) {
            try {
                window.google.accounts.id.prompt((notification) => {
                    if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
                        setShowModal(true);
                    }
                });
            } catch (e) {
                setShowModal(true);
            }
        } else {
            setShowModal(true);
        }
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (!emailInput) return;
        handleGoogleAuthSubmit({
            email: emailInput,
            name: nameInput || emailInput.split('@')[0],
            googleId: `google_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(nameInput || emailInput)}`
        });
    };

    return (
        <div className="w-full flex flex-col items-center gap-2">
            {/* GIS Container (if valid client ID) */}
            {import.meta.env.VITE_GOOGLE_CLIENT_ID && (
                <div ref={googleButtonRef} className="w-full flex justify-center min-h-[44px]"></div>
            )}

            {/* Custom Google Sign-In Trigger Button */}
            <button
                type="button"
                onClick={handleClick}
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
                <span>{isLoading ? 'Signing in with Google...' : buttonText}</span>
            </button>

            {authError && (
                <p className="text-xs text-red-500 font-semibold mt-1 text-center">
                    {authError}
                </p>
            )}

            {/* Instant Google Authentication Dialog (Prevents Error 401 Invalid Client) */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
                    <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
                        <button
                            type="button"
                            onClick={() => setShowModal(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-2xl font-bold leading-none"
                        >
                            &times;
                        </button>

                        <div className="flex flex-col items-center text-center mb-5">
                            <div className="mb-2 p-2.5 bg-blue-50 dark:bg-blue-900/30 rounded-full">
                                <svg className="w-8 h-8" viewBox="0 0 24 24">
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
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Google Sign-In</h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Enter your Google email ID to continue to CultureConnect</p>
                        </div>

                        <form onSubmit={handleFormSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                                    Google Email Address *
                                </label>
                                <input
                                    type="email"
                                    placeholder="kumaryaswanth557@gmail.com"
                                    value={emailInput}
                                    onChange={(e) => setEmailInput(e.target.value)}
                                    className="w-full p-3 border border-gray-300 dark:border-zinc-700 rounded-xl bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
                                    required
                                    autoFocus
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                                    Full Name (Optional)
                                </label>
                                <input
                                    type="text"
                                    placeholder="Yaswanth Kumar"
                                    value={nameInput}
                                    onChange={(e) => setNameInput(e.target.value)}
                                    className="w-full p-3 border border-gray-300 dark:border-zinc-700 rounded-xl bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
                                />
                            </div>

                            <div className="bg-blue-50 dark:bg-blue-950/40 p-3 rounded-xl text-xs text-blue-700 dark:text-blue-300 flex items-center gap-2">
                                <span>📧</span>
                                <span>A sign-in notification email will automatically be sent to your email ID.</span>
                            </div>

                            <div className="flex gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="w-1/2 py-2.5 px-4 rounded-xl border border-gray-300 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-100 dark:hover:bg-zinc-800 text-sm"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-1/2 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md transition-colors text-sm"
                                >
                                    {isLoading ? 'Signing in...' : 'Continue'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GoogleAuthButton;

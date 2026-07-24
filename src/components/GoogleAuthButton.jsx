import { useState, useEffect, useRef, useCallback } from 'react';
import { API_BASE_URL } from '../config';

const GoogleAuthButton = ({ onSuccess, onError, buttonText = "Sign up with Google" }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [authError, setAuthError] = useState('');
    const tokenClientRef = useRef(null);
    const gisReadyRef = useRef(false);

    // Send access token to backend for verification and account creation/login
    const handleGoogleAuthSubmit = useCallback(async (accessToken) => {
        setIsLoading(true);
        setAuthError('');
        try {
            const res = await fetch(`${API_BASE_URL}/api/auth/google`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ accessToken })
            });

            const data = await res.json();
            if (res.ok) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('username', data.username);
                if (data.email) localStorage.setItem('email', data.email);
                if (data.avatar) localStorage.setItem('avatar', data.avatar);
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
    }, [onSuccess, onError]);

    // Initialize Google Identity Services Token Client
    useEffect(() => {
        const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

        if (!clientId || clientId === 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com') {
            console.warn('[GoogleAuth] VITE_GOOGLE_CLIENT_ID is not configured. Google Sign-In will not work.');
            return;
        }

        const initGIS = () => {
            if (!window.google?.accounts?.oauth2) {
                console.warn('[GoogleAuth] Google Identity Services library not loaded yet.');
                return;
            }

            try {
                tokenClientRef.current = window.google.accounts.oauth2.initTokenClient({
                    client_id: clientId,
                    scope: 'email profile openid',
                    callback: (tokenResponse) => {
                        if (tokenResponse.error) {
                            console.error('[GoogleAuth] Token error:', tokenResponse.error);
                            if (tokenResponse.error === 'access_denied') {
                                setAuthError('Access denied. Please allow permissions to continue.');
                            } else {
                                setAuthError('Google authentication was cancelled or failed. Please try again.');
                            }
                            if (onError) onError(tokenResponse.error_description || tokenResponse.error);
                            return;
                        }

                        if (tokenResponse.access_token) {
                            handleGoogleAuthSubmit(tokenResponse.access_token);
                        }
                    },
                    error_callback: (err) => {
                        console.error('[GoogleAuth] GIS error_callback:', err);
                        // type: "popup_closed" means user closed the picker
                        if (err?.type === 'popup_closed') {
                            // User cancelled — no error message needed
                            return;
                        }
                        setAuthError('Google Sign-In encountered an error. Please try again.');
                    }
                });
                gisReadyRef.current = true;
                console.log('[GoogleAuth] Token client initialized successfully.');
            } catch (e) {
                console.error('[GoogleAuth] Failed to initialize token client:', e);
            }
        };

        // Wait for the GIS library to load
        if (window.google?.accounts?.oauth2) {
            initGIS();
        } else {
            // Poll until the script loads (it's loaded async in index.html)
            const interval = setInterval(() => {
                if (window.google?.accounts?.oauth2) {
                    clearInterval(interval);
                    initGIS();
                }
            }, 200);

            // Clean up after 10 seconds
            const timeout = setTimeout(() => clearInterval(interval), 10000);
            return () => {
                clearInterval(interval);
                clearTimeout(timeout);
            };
        }
    }, [handleGoogleAuthSubmit, onError]);

    const handleClick = () => {
        const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

        if (!clientId || clientId === 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com') {
            setAuthError('Google Sign-In is not configured. Please set VITE_GOOGLE_CLIENT_ID in your environment.');
            return;
        }

        if (tokenClientRef.current && gisReadyRef.current) {
            setAuthError('');
            tokenClientRef.current.requestAccessToken();
        } else {
            setAuthError('Google Sign-In is still loading. Please wait a moment and try again.');
        }
    };

    return (
        <div className="w-full flex flex-col items-center gap-2">
            {/* Google Sign-In Button */}
            <button
                type="button"
                onClick={handleClick}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-3 px-6 py-3 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm bg-white dark:bg-zinc-800 text-gray-800 dark:text-gray-100 font-semibold hover:bg-gray-50 dark:hover:bg-zinc-700 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
            >
                {isLoading ? (
                    <svg className="w-5 h-5 animate-spin text-blue-500" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                ) : (
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
                )}
                <span>{isLoading ? 'Signing in with Google...' : buttonText}</span>
            </button>

            {authError && (
                <p className="text-xs text-red-500 font-semibold mt-1 text-center">
                    {authError}
                </p>
            )}
        </div>
    );
};

export default GoogleAuthButton;

import { useState } from 'react';
import { API_BASE_URL } from '../config';

const SAMPLE_GOOGLE_ACCOUNTS = [
    {
        name: 'Yaswanth Kumar',
        email: 'yaswanthkumar0567@gmail.com',
        avatarBg: 'bg-blue-600',
        initials: 'YK'
    },
    {
        name: 'Alex Rivera',
        email: 'alex.rivera@gmail.com',
        avatarBg: 'bg-emerald-600',
        initials: 'AR'
    },
    {
        name: 'Culture Customer',
        email: 'customer.cultureconnect@gmail.com',
        avatarBg: 'bg-purple-600',
        initials: 'CC'
    }
];

const GoogleAuthButton = ({ onSuccess, onError, buttonText = "Sign up with Google" }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showCustomInput, setShowCustomInput] = useState(false);
    const [googleEmail, setGoogleEmail] = useState('');
    const [googleName, setGoogleName] = useState('');
    const [selectedEmail, setSelectedEmail] = useState(null);

    const handleGoogleAuthSubmit = async (emailToUse, nameToUse) => {
        setIsLoading(true);
        setSelectedEmail(emailToUse);
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
            setSelectedEmail(null);
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
                <span>{isLoading ? 'Signing in with Google...' : buttonText}</span>
            </button>

            {/* Google Account Selector Modal */}
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

                        {/* Google Header */}
                        <div className="flex flex-col items-center text-center mb-6">
                            <div className="mb-2">
                                <svg className="w-9 h-9" viewBox="0 0 24 24">
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
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Choose an account</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">to continue to <span className="font-semibold text-gray-800 dark:text-gray-200">CultureConnect</span></p>
                        </div>

                        {/* Account Cards Selection List */}
                        <div className="space-y-2 mb-4">
                            {SAMPLE_GOOGLE_ACCOUNTS.map((acc) => (
                                <button
                                    key={acc.email}
                                    type="button"
                                    onClick={() => handleGoogleAuthSubmit(acc.email, acc.name)}
                                    disabled={isLoading}
                                    className={`w-full flex items-center justify-between p-3.5 rounded-xl border border-gray-200 dark:border-zinc-800 hover:border-blue-500 dark:hover:border-blue-500 bg-gray-50 dark:bg-zinc-800/80 hover:bg-blue-50/50 dark:hover:bg-blue-950/30 text-left transition-all duration-150 group ${selectedEmail === acc.email ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/40' : ''}`}
                                >
                                    <div className="flex items-center gap-3.5">
                                        <div className={`w-10 h-10 ${acc.avatarBg} rounded-full flex items-center justify-center text-white font-bold text-sm shadow-sm`}>
                                            {acc.initials}
                                        </div>
                                        <div>
                                            <div className="font-semibold text-gray-900 dark:text-white text-sm group-hover:text-blue-600 dark:group-hover:text-blue-400">
                                                {acc.name}
                                            </div>
                                            <div className="text-xs text-gray-500 dark:text-gray-400">
                                                {acc.email}
                                            </div>
                                        </div>
                                    </div>
                                    {isLoading && selectedEmail === acc.email ? (
                                        <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                                    ) : (
                                        <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                        </svg>
                                    )}
                                </button>
                            ))}

                            {/* Use Another Account Option */}
                            {!showCustomInput ? (
                                <button
                                    type="button"
                                    onClick={() => setShowCustomInput(true)}
                                    className="w-full flex items-center gap-3.5 p-3.5 rounded-xl border border-dashed border-gray-300 dark:border-zinc-700 hover:border-gray-400 dark:hover:border-zinc-500 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800 text-sm font-semibold transition-all"
                                >
                                    <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-zinc-700 flex items-center justify-center text-gray-600 dark:text-gray-300">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                        </svg>
                                    </div>
                                    <span>Use another email account...</span>
                                </button>
                            ) : (
                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        if (googleEmail) {
                                            handleGoogleAuthSubmit(googleEmail, googleName);
                                        }
                                    }}
                                    className="p-4 border border-blue-300 dark:border-blue-700 bg-blue-50/40 dark:bg-blue-950/20 rounded-xl space-y-3 mt-3 animate-fade-in"
                                >
                                    <div>
                                        <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                                            Enter Google Email ID *
                                        </label>
                                        <input
                                            type="email"
                                            placeholder="yourname@gmail.com"
                                            value={googleEmail}
                                            onChange={(e) => setGoogleEmail(e.target.value)}
                                            className="w-full p-2.5 text-sm border border-gray-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                                            Full Name (Optional)
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Your Name"
                                            value={googleName}
                                            onChange={(e) => setGoogleName(e.target.value)}
                                            className="w-full p-2.5 text-sm border border-gray-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                        />
                                    </div>
                                    <div className="flex gap-2 pt-1">
                                        <button
                                            type="button"
                                            onClick={() => setShowCustomInput(false)}
                                            className="w-1/2 py-2 text-xs font-semibold rounded-lg border border-gray-300 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800"
                                        >
                                            Back to List
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={isLoading}
                                            className="w-1/2 py-2 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow"
                                        >
                                            {isLoading ? 'Signing in...' : 'Sign In'}
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>

                        <div className="bg-gray-100 dark:bg-zinc-800/60 p-3 rounded-xl text-xs text-gray-600 dark:text-gray-400 flex items-start gap-2.5">
                            <span className="text-base leading-none">📧</span>
                            <span>A sign-in notification email will be sent automatically to the selected email ID.</span>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default GoogleAuthButton;

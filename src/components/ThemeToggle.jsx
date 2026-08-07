import React from 'react';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
    const { isDark, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className="fixed bottom-6 right-6 z-[999] group"
        >
            <div className={`relative flex items-center gap-2 px-3 py-2 rounded-2xl border bg-[var(--theme-bg-secondary)] border-[var(--theme-border)] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[var(--theme-accent-primary)]`}>
                {/* Sun icon */}
                <div className={`flex items-center justify-center w-8 h-8 rounded-xl transition-all duration-300 ${
                    !isDark
                        ? 'bg-[var(--theme-accent-primary)] text-[var(--theme-btn-text)] rotate-0 scale-100'
                        : 'text-[var(--theme-text-muted)] rotate-180 scale-90'
                }`}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                </div>

                {/* Moon icon */}
                <div className={`flex items-center justify-center w-8 h-8 rounded-xl transition-all duration-300 ${
                    isDark
                        ? 'bg-[var(--theme-accent-primary)] text-[var(--theme-btn-text)] rotate-0 scale-100'
                        : 'text-[var(--theme-text-muted)] -rotate-90 scale-90'
                }`}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                </div>
            </div>
        </button>
    );
};

export default ThemeToggle;

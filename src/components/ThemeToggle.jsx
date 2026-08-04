import React from 'react';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = ({ variant = 'default', className = '' }) => {
    const { theme, setMode, isDark } = useTheme();

    if (variant === 'compact') {
        return (
            <div className={`flex items-center p-1 rounded-full border border-white/10 dark:border-white/15 bg-white/10 dark:bg-zinc-900/60 backdrop-blur-md transition-all duration-300 ${className}`}>
                <button
                    type="button"
                    onClick={() => setMode('light')}
                    title="Switch to Light Mode"
                    className={`flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 ${
                        !isDark
                            ? 'bg-amber-400 text-slate-950 shadow-[0_0_12px_rgba(251,191,36,0.5)] scale-105 font-bold'
                            : 'text-zinc-400 hover:text-white hover:bg-white/10'
                    }`}
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                </button>
                <button
                    type="button"
                    onClick={() => setMode('dark')}
                    title="Switch to Dark Mode"
                    className={`flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 ${
                        isDark
                            ? 'bg-[#0ff0a0] text-slate-950 shadow-[0_0_12px_rgba(15,240,160,0.5)] scale-105 font-bold'
                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                    }`}
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                </button>
            </div>
        );
    }

    return (
        <div className={`inline-flex items-center p-1.5 rounded-2xl border transition-all duration-300 shadow-lg ${
            isDark 
                ? 'bg-zinc-900/80 border-white/10 shadow-black/40' 
                : 'bg-white/90 border-slate-200 shadow-slate-200/60'
        } backdrop-blur-xl ${className}`}>
            <button
                type="button"
                onClick={() => setMode('light')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                    !isDark
                        ? 'bg-amber-400 text-slate-950 shadow-[0_4px_15px_rgba(251,191,36,0.4)] scale-105'
                        : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <span>Light Mode</span>
            </button>

            <button
                type="button"
                onClick={() => setMode('dark')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                    isDark
                        ? 'bg-[#0ff0a0] text-slate-950 shadow-[0_4px_15px_rgba(15,240,160,0.4)] scale-105'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
                <span>Dark Mode</span>
            </button>
        </div>
    );
};

export default ThemeToggle;

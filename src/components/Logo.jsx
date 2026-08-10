import React from 'react';

const Logo = ({ className = "w-10 h-10", showText = false, textClassName = "" }) => {
    return (
        <div className={`inline-flex items-center gap-3 ${className.includes('h-') ? '' : 'h-auto'}`}>
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 200 200" 
                className={`${className} flex-shrink-0 drop-shadow-md`}
                aria-label="CultureConnect Logo"
            >
                <defs>
                    {/* Dark Background Gradient */}
                    <linearGradient id="ccBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#141417" />
                        <stop offset="50%" stopColor="#0D0D0E" />
                        <stop offset="100%" stopColor="#050506" />
                    </linearGradient>

                    {/* Gold Metallic Gradient */}
                    <linearGradient id="ccGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#FDE68A" />
                        <stop offset="30%" stopColor="#F59E0B" />
                        <stop offset="70%" stopColor="#D97706" />
                        <stop offset="100%" stopColor="#B45309" />
                    </linearGradient>

                    {/* Copper Amber Gradient */}
                    <linearGradient id="ccCopperGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#92400E" />
                        <stop offset="50%" stopColor="#D97706" />
                        <stop offset="100%" stopColor="#FBBF24" />
                    </linearGradient>

                    {/* Crimson Magenta Gradient */}
                    <linearGradient id="ccMagentaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#F43F5E" />
                        <stop offset="45%" stopColor="#E11D48" />
                        <stop offset="85%" stopColor="#BE123C" />
                        <stop offset="100%" stopColor="#881337" />
                    </linearGradient>

                    {/* Rose Gold Accent Gradient */}
                    <linearGradient id="ccRoseGrad" x1="100%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#FB7185" />
                        <stop offset="100%" stopColor="#F472B6" />
                    </linearGradient>

                    {/* Subtle Outer Border Gradient */}
                    <linearGradient id="ccBorderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="rgba(245, 158, 11, 0.4)" />
                        <stop offset="50%" stopColor="rgba(225, 29, 72, 0.2)" />
                        <stop offset="100%" stopColor="rgba(255, 255, 255, 0.05)" />
                    </linearGradient>

                    {/* Soft Ambient Glow */}
                    <filter id="ccGlow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="2.5" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                </defs>

                {/* Dark Rounded Container */}
                <rect 
                    width="200" 
                    height="200" 
                    rx="48" 
                    fill="url(#ccBgGrad)" 
                    stroke="url(#ccBorderGrad)" 
                    strokeWidth="3"
                />

                {/* Intertwined Geometric CultureConnect Motif */}
                <g filter="url(#ccGlow)">
                    {/* Outer Copper/Amber Ribbon Curve */}
                    <path 
                        d="M 68 60 C 42 85, 42 118, 68 140 C 86 156, 112 154, 126 138 C 134 130, 134 116, 124 108 C 114 100, 98 114, 86 128" 
                        fill="none" 
                        stroke="url(#ccCopperGrad)" 
                        strokeWidth="8" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                    />

                    {/* Outer Magenta/Pink Ribbon Curve */}
                    <path 
                        d="M 132 140 C 158 115, 158 82, 132 60 C 114 44, 88 46, 74 62 C 66 70, 66 84, 76 92 C 86 100, 102 86, 114 72" 
                        fill="none" 
                        stroke="url(#ccMagentaGrad)" 
                        strokeWidth="8" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                    />

                    {/* Main Infinity/S-Weave Gold Loop */}
                    <path 
                        d="M 100 50 C 124 50, 140 68, 134 92 C 128 116, 72 88, 66 112 C 60 136, 76 150, 100 150 C 120 150, 134 138, 140 120" 
                        fill="none" 
                        stroke="url(#ccGoldGrad)" 
                        strokeWidth="8.5" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                    />

                    {/* Core Interlocking Rose Accent Loop */}
                    <path 
                        d="M 92 72 C 112 66, 128 82, 118 102 C 108 122, 86 116, 86 128 C 86 136, 96 140, 108 134" 
                        fill="none" 
                        stroke="url(#ccRoseGrad)" 
                        strokeWidth="5.5" 
                        strokeLinecap="round" 
                    />
                </g>
            </svg>

            {showText && (
                <span className={`font-serif font-black tracking-tighter text-[var(--theme-text-primary)] ${textClassName}`}>
                    CULTURE<span className="text-[var(--theme-accent-primary)]">CONNECT</span>
                </span>
            )}
        </div>
    );
};

export default Logo;

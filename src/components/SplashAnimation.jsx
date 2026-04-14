import { useState, useEffect } from 'react';
import introPhoto from '../assets/intro.jpg';

const SplashAnimation = ({ onComplete }) => {
    const [isFading, setIsFading] = useState(false);

    useEffect(() => {
        // Start fading out after 2.5 seconds
        const fadeTimer = setTimeout(() => {
            setIsFading(true);
        }, 2500);

        // Notify parent to unmount after fade transition (0.5s later)
        const unmountTimer = setTimeout(() => {
            onComplete();
        }, 3000);

        return () => {
            clearTimeout(fadeTimer);
            clearTimeout(unmountTimer);
        };
    }, [onComplete]);

    return (
        <div 
            className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black transition-opacity duration-500 ease-in-out ${isFading ? 'opacity-0' : 'opacity-100'}`}
        >
            <div className="relative animate-bounce">
                <img 
                    src={introPhoto} 
                    alt="Intro" 
                    className="w-64 h-64 md:w-80 md:h-80 rounded-full border-4 border-pink-500 shadow-[0_0_40px_rgba(236,72,153,0.8)] object-cover animate-pulse"
                />
            </div>
            
            <div className="absolute bottom-1/4 text-center">
                <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-3xl md:text-5xl font-extrabold tracking-widest animate-pulse">
                    Welcome
                </h1>
                <p className="mt-2 text-gray-400 text-sm tracking-widest uppercase">Opening Site...</p>
            </div>
            
            {/* Custom keyframes injected for this component */}
            <style jsx>{`
                @keyframes bounce {
                    0%, 100% {
                        transform: translateY(-5%);
                        animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
                    }
                    50% {
                        transform: translateY(0);
                        animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
                    }
                }
            `}</style>
        </div>
    );
};

export default SplashAnimation;

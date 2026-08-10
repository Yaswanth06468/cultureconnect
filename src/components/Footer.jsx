import { Link } from 'react-router-dom';
import Logo from './Logo';

const Footer = () => {
    return (
        <footer className="py-20 bg-[var(--theme-bg-primary)] border-t border-[var(--theme-border)] text-[var(--theme-text-primary)] relative transition-colors duration-400">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="col-span-1 md:col-span-2">
                        <Link
                            to="/"
                            className="flex items-center gap-3 mb-4 inline-flex text-[var(--theme-text-primary)] group"
                        >
                            <Logo className="w-9 h-9" />
                            <span className="text-2xl font-serif font-black tracking-tight group-hover:text-[var(--theme-accent-primary)] transition-colors duration-300">
                                CULTURE<span className="text-[var(--theme-accent-primary)]">CONNECT</span>
                            </span>
                        </Link>
                        <p className="max-w-sm mb-8 font-light leading-relaxed text-[var(--theme-text-secondary)]">
                            Connect deeply with cultures, languages, regional foods, and people. A digital sanctuary for authentic global understanding.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-[0.2em] mb-6 text-[var(--theme-accent-primary)]">Platform</h4>
                        <ul className="space-y-3 font-light text-sm text-[var(--theme-text-secondary)]">
                            <li><Link to="/dances" className="hover:text-[var(--theme-accent-primary)] transition-colors">Dances & Traditions</Link></li>
                            <li><Link to="/city-food" className="hover:text-[var(--theme-accent-primary)] transition-colors">City Food Explorer</Link></li>
                            <li><Link to="/feed" className="hover:text-[var(--theme-accent-primary)] transition-colors">Cultural Feed</Link></li>
                            <li><Link to="/events" className="hover:text-[var(--theme-accent-primary)] transition-colors">Global Events</Link></li>
                            <li><Link to="/translate" className="hover:text-[var(--theme-accent-primary)] transition-colors">AI Translator</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-[0.2em] mb-6 text-[var(--theme-accent-primary)]">Company</h4>
                        <ul className="space-y-3 font-light text-sm text-[var(--theme-text-secondary)]">
                            <li><a href="#about" className="hover:text-[var(--theme-accent-primary)] transition-colors">About Us</a></li>
                            <li><a href="#about" className="hover:text-[var(--theme-accent-primary)] transition-colors">Mission</a></li>
                            <li><Link to="/culture-swap" className="hover:text-[var(--theme-accent-primary)] transition-colors">Culture Swap</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-[var(--theme-border)] flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-medium uppercase tracking-wider text-[var(--theme-text-muted)]">
                    <div className="flex items-center gap-2">
                        <p>&copy; 2026 CultureConnect.</p>
                        <span>|</span>
                        <p className="flex items-center gap-1">
                            Made with <span className="text-[#ff5e62] animate-pulse text-sm">♥</span> by <span className="text-[var(--theme-text-primary)] font-bold ml-1">Yaswanth</span>
                        </p>
                    </div>

                    <div className="flex gap-6">
                        <a href="#" className="hover:text-[var(--theme-accent-primary)] transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-[var(--theme-accent-primary)] transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

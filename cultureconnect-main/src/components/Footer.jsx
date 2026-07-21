import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer
            className="py-20 theme-transition"
            style={{
                backgroundColor: 'var(--theme-bg-accent)',
                borderTop: '1px solid var(--theme-border)',
                color: 'var(--theme-text-primary)',
            }}
        >
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="col-span-1 md:col-span-2">
                        <Link
                            to="/"
                            className="text-2xl font-serif font-bold tracking-tight mb-6 block"
                            style={{ color: 'var(--theme-text-primary)' }}
                        >
                            Culture
                        </Link>
                        <p
                            className="max-w-sm mb-8 font-light leading-relaxed"
                            style={{ color: 'var(--theme-text-secondary)' }}
                        >
                            Connect deeply with cultures, languages, and people. A platform for authentic global understanding.
                        </p>
                    </div>

                    <div>
                        <h4
                            className="text-sm font-bold uppercase tracking-widest mb-6 opacity-60"
                            style={{ color: 'var(--theme-text-primary)' }}
                        >Platform</h4>
                        <ul
                            className="space-y-4 font-light text-sm"
                            style={{ color: 'var(--theme-text-secondary)' }}
                        >
                            <li><Link to="/dances" className="hover:text-accent-terra transition-colors">Explore</Link></li>
                            <li><Link to="/feed" className="hover:text-accent-terra transition-colors">Communities</Link></li>
                            <li><Link to="/events" className="hover:text-accent-terra transition-colors">Events</Link></li>
                            <li><Link to="/translate" className="hover:text-accent-terra transition-colors">Language Exchange</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4
                            className="text-sm font-bold uppercase tracking-widest mb-6 opacity-60"
                            style={{ color: 'var(--theme-text-primary)' }}
                        >Company</h4>
                        <ul
                            className="space-y-4 font-light text-sm"
                            style={{ color: 'var(--theme-text-secondary)' }}
                        >
                            <li><a href="#about" className="hover:text-accent-terra transition-colors">About Us</a></li>
                            <li><a href="#about" className="hover:text-accent-terra transition-colors">Mission</a></li>
                            <li><a href="#" className="hover:text-accent-terra transition-colors">Blog</a></li>
                            <li><a href="#" className="hover:text-accent-terra transition-colors">Contact</a></li>
                        </ul>
                    </div>
                </div>

                <div
                    className="pt-8 flex flex-col items-center justify-center gap-4 text-xs font-medium uppercase tracking-wider text-center"
                    style={{
                        borderTop: '1px solid var(--theme-border)',
                        color: 'var(--theme-text-muted)',
                    }}
                >
                    <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
                        <p>&copy; 2026 Culture.</p>
                        <span className="hidden md:inline-block opacity-30">|</span>
                        <p className="flex items-center gap-1.5">
                            Made with <span className="text-accent-terra animate-pulse text-lg">♥</span> by <span className="text-text-primary font-black ml-1">Yaswanth</span>
                        </p>
                    </div>
                    
                    <div className="flex gap-8 mt-2 opacity-50">
                        <a href="#" className="hover:text-accent-terra transition-colors" style={{ color: 'var(--theme-text-muted)' }}>Privacy</a>
                        <a href="#" className="hover:text-accent-terra transition-colors" style={{ color: 'var(--theme-text-muted)' }}>Terms</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

import { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config';

const TaskDetailModal = ({ task, activeSwap, onClose, completedTasks, toggleTask, playWord }) => {
    if (!task) return null;

    const taskData = {
        food: {
            title: 'The Culinary Oath',
            subtitle: `Cook: ${activeSwap.food}`,
            icon: '🥘',
            color: 'orange',
            requirements: [
                { text: 'Gather ingredients', icon: '🛒' },
                { text: 'Follow recipe', icon: '👨‍🍳' },
                { text: 'Savor meal', icon: '🍽️' }
            ],
            content: (
                <div className="space-y-6">
                    <div className="rounded-xl overflow-hidden shadow-md border border-black/5 mb-6 h-64 bg-[#faf7f2] relative group">
                         <img 
                            src={activeSwap.foodImage} 
                            alt={activeSwap.food} 
                            className="w-full h-full object-cover" 
                            onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=800&auto=format&fit=crop'; }}
                         />
                         <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                         <div className="absolute bottom-6 left-6 text-white text-3xl font-serif font-medium">{activeSwap.food}</div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h5 className="text-[10px] font-bold uppercase tracking-widest text-orange-700 mb-4 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-orange-700"></span> Ingredients
                            </h5>
                            <div className="flex flex-wrap gap-2">
                                {activeSwap.ingredients.map((ing, i) => (
                                    <span key={i} className="px-3 py-1.5 bg-orange-50 text-orange-800 text-[10px] font-bold rounded-lg border border-orange-100 italic">{ing}</span>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h5 className="text-[10px] font-bold uppercase tracking-widest text-orange-700 mb-4 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-orange-700"></span> The Process
                            </h5>
                            <p className="text-sm text-text-secondary leading-relaxed bg-[#fdfaf5] p-6 rounded-xl border border-orange-50 italic font-light">
                                {activeSwap.recipe}
                            </p>
                        </div>
                    </div>
                </div>
            )
        },
        ritual: {
            title: 'The Ritual Mirror',
            subtitle: activeSwap.routine,
            icon: '⚡',
            color: 'blue',
            requirements: [
                { text: 'Set aside time', icon: '⏰' },
                { text: 'Quiet space', icon: '🤫' },
                { text: 'Mindful intent', icon: '🧘' }
            ],
            content: (
                <div className="space-y-6 text-center">
                    <div className="rounded-xl overflow-hidden shadow-md border border-black/5 mb-8 h-48 bg-blue-50/30 relative">
                         <img 
                            src={activeSwap.ritualImage} 
                            alt={activeSwap.routine} 
                            className="w-full h-full object-cover" 
                            onError={(e) => { e.target.src = '/images/master-ritual.png'; }}
                         />
                         <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                         <div className="absolute top-4 right-4 text-2xl drop-shadow-md">⚡</div>
                    </div>
                    <div className="bg-[#f0f9ff]/50 p-8 rounded-xl border border-blue-100 relative overflow-hidden">
                        <h5 className="text-[10px] font-bold uppercase tracking-widest text-blue-700 mb-4 tracking-[0.2em]">Step-by-Step Practice</h5>
                        <p className="text-xl font-serif text-text-primary leading-loose italic max-w-2xl mx-auto font-light">
                            "{activeSwap.ritualDetails}"
                        </p>
                    </div>
                </div>
            )
        },

        language: {
            title: 'The Oral Heritage',
            subtitle: 'Speak 3 Words',
            icon: '🗣️',
            color: 'teal',
            requirements: [
                { text: 'Listen closely', icon: '👂' },
                { text: 'Practice aloud', icon: '🗣️' },
                { text: 'Adopt rhythm', icon: '🎶' }
            ],
            content: (
                <div className="space-y-8">
                    <div className="rounded-xl overflow-hidden shadow-md border border-black/5 h-48 mb-8 relative">
                        <img 
                            src={activeSwap.languageImage} 
                            alt="Cultural Script" 
                            className="w-full h-full object-cover" 
                            onError={(e) => { e.target.src = '/images/master-language.png'; }}
                         />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent"></div>
                        <div className="absolute top-1/2 left-8 -translate-y-1/2">
                             <h5 className="text-[10px] font-bold uppercase tracking-widest text-white/80 mb-2 tracking-[0.2em]">Language Heritage</h5>
                             <p className="text-2xl font-serif text-white italic max-w-sm font-light leading-snug">"{activeSwap.languageSignificance}"</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {activeSwap.words.map((wordObj, idx) => (
                            <div 
                                key={idx} 
                                onClick={() => playWord(wordObj.word)}
                                className="bg-white rounded-xl border border-black/5 shadow-sm hover:border-teal-600 cursor-pointer transition-all active:scale-95 group/word overflow-hidden"
                            >
                                <div className="h-28 w-full overflow-hidden">
                                    <img src={wordObj.image} alt={wordObj.word} className="w-full h-full object-cover group-hover/word:scale-105 transition-transform duration-500" />
                                </div>
                                <div className="p-4 flex items-center gap-3">
                                    <span className="text-lg">🔊</span>
                                    <div>
                                        <p className="text-lg font-serif font-medium text-text-primary">{wordObj.word}</p>
                                        <p className="text-[8px] text-text-secondary font-bold uppercase tracking-widest">{wordObj.translation}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )
        },
        visual: {
            title: 'The Visual Soul',
            subtitle: 'Traditional Art/Music',
            icon: '🧩',
            color: 'orange',
            requirements: [
                { text: 'Observe patterns', icon: '👁️' },
                { text: 'Understand symbolism', icon: '🧠' },
                { text: 'Feel the rhythm', icon: '🎵' }
            ],
            content: (
                <div className="space-y-8 text-center">
                    <div className="rounded-[2rem] overflow-hidden shadow-2xl border border-black/5 mb-10 h-64 bg-orange-50/30 relative group">
                         <img 
                            src={activeSwap.visualImage} 
                            alt="Traditional Art" 
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[3000ms]" 
                            onError={(e) => { e.target.src = '/images/visual-kenji.png'; }}
                         />
                         <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                         <div className="absolute bottom-6 right-8 text-3xl drop-shadow-md group-hover:rotate-12 transition-transform">🎨</div>
                    </div>
                    <div className="bg-[#fff7ed]/50 p-10 rounded-[2rem] border border-orange-100 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-200/20 blur-3xl -mr-16 -mt-16 group-hover:bg-orange-200/40 transition-colors"></div>
                        <h5 className="text-[10px] font-bold uppercase tracking-[0.4em] text-orange-700 mb-6 opacity-60">Artistic Identity</h5>
                        <p className="text-2xl font-serif text-text-primary leading-loose italic max-w-2xl mx-auto font-light">
                            "{activeSwap.artDescription || 'Explore the vibrant visual and musical heritage through their unique traditional patterns and rhythmic soul.'}"
                        </p>
                    </div>
                </div>
            )
        }
    }[task];

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 overflow-y-auto">
            <div className="absolute inset-0 bg-[#4a2c2a]/60 backdrop-blur-sm" onClick={onClose}></div>
            <div className="relative bg-white w-full max-w-4xl rounded-2xl p-8 md:p-12 shadow-xl border border-black/5 animate-scale-up-long my-auto overflow-hidden">
                <button 
                    onClick={onClose}
                    className="absolute top-6 right-6 w-10 h-10 rounded-full bg-[#fdf8f3] hover:bg-[#f0ece6] flex items-center justify-center text-xl transition-all"
                >
                    ✕
                </button>
                
                <div className="flex items-center gap-4 mb-8">
                    <div className={`w-12 h-12 rounded-xl bg-${taskData.color}-50 flex items-center justify-center text-2xl border border-${taskData.color}-100`}>{taskData.icon}</div>
                    <div>
                        <h4 className={`text-[10px] font-bold uppercase tracking-[0.2em] text-${taskData.color}-700 mb-1`}>{taskData.title}</h4>
                        <h3 className="text-3xl font-serif font-medium text-text-primary leading-tight">{taskData.subtitle}</h3>
                    </div>
                </div>

                <div className="relative mb-10">
                    {taskData.content}
                </div>

                {/* Requirements Checklist */}
                <div className="bg-[#faf7f2]/50 p-10 rounded-[2rem] border border-[#f0ece6] mb-12 relative overflow-hidden">
                    <div className="absolute -bottom-10 -right-10 text-[10rem] text-black/[0.02] font-serif italic pointer-events-none select-none italic">Passport</div>
                    <h5 className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#8b6f5e] mb-8 relative z-10 flex items-center gap-4">
                        <span className="w-12 h-px bg-[#8b6f5e]/20"></span>
                        Verification Checklist
                        <span className="w-12 h-px bg-[#8b6f5e]/20"></span>
                    </h5>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                        {taskData.requirements.map((req, i) => (
                            <div key={i} className="flex flex-col gap-4 bg-white p-6 rounded-2xl border border-[#f0ece6] shadow-sm hover:shadow-md transition-shadow group">
                                <div className={`w-10 h-10 rounded-xl bg-${taskData.color}-50 flex items-center justify-center text-lg border border-${taskData.color}-100/50 group-hover:scale-110 transition-transform`}>
                                    {typeof req === 'object' ? req.icon : '✓'}
                                </div>
                                <span className="text-xs font-bold text-text-primary leading-relaxed opacity-80 uppercase tracking-wider">{typeof req === 'object' ? req.text : req}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="text-center">
                     <button 
                        onClick={() => {
                            if (!completedTasks.includes(task)) toggleTask(task);
                            onClose();
                        }}
                        className={`px-10 py-4 bg-text-primary text-white font-bold rounded-lg hover:bg-[#111] transition-colors shadow-lg flex items-center gap-3 mx-auto`}
                    >
                        {completedTasks.includes(task) ? 'Task Completed ✓' : 'Accept Challenge & Start'}
                    </button>
                    {completedTasks.includes(task) && (
                        <p className="text-[10px] font-bold text-green-700 mt-3 uppercase tracking-widest">Commitment confirmed</p>
                    )}
                </div>
            </div>
        </div>
    );
};

const CultureSwap = () => {
    const [isMatching, setIsMatching] = useState(false);
    const [activeSwap, setActiveSwap] = useState(null);
    const [timeLeft, setTimeLeft] = useState(3600); // 1 hour in seconds
    const [completedTasks, setCompletedTasks] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);

    const [partners, setPartners] = useState([]);

    useEffect(() => {
        const fetchPreview = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/culture-swap/random`);
                const data = await response.json();
                if (data && !data.error) setPartners([data]);
            } catch (err) {
                console.error("Failed to fetch previews", err);
            }
        };
        fetchPreview();
    }, []);

    const startMatch = async () => {
        setIsMatching(true);
        try {
            const response = await fetch(`${API_BASE_URL}/api/culture-swap/random`);
            const data = await response.json();
            
            if (data && !data.error) {
                setTimeout(() => {
                    setActiveSwap(data);
                    setIsMatching(false);
                    setCompletedTasks([]);
                    setTimeLeft(24 * 3600);
                }, 2000);
            } else {
                throw new Error("No partners found");
            }
        } catch (err) {
            console.error("Match failed", err);
            setIsMatching(false);
            alert("Connection error. Our global network is currently congested. Please try again.");
        }
    };

    useEffect(() => {
        let timer;
        if (activeSwap && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [activeSwap, timeLeft]);

    const formatTime = (seconds) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    const stopSwap = () => {
        if (window.confirm('Are you sure you want to end this cultural exchange?')) {
            setActiveSwap(null);
            setCompletedTasks([]);
        }
    };

    const toggleTask = (taskId) => {
        setCompletedTasks(prev => 
            prev.includes(taskId) 
            ? prev.filter(id => id !== taskId) 
            : [...prev, taskId]
        );
    };

    const playWord = (text) => {
        const utterance = new SpeechSynthesisUtterance(text);
        // Try to match language based on culture
        if (activeSwap.culture.includes('Japan')) utterance.lang = 'ja-JP';
        else if (activeSwap.culture.includes('Mexico')) utterance.lang = 'es-MX';
        else if (activeSwap.culture.includes('Marwari')) utterance.lang = 'hi-IN';
        else if (activeSwap.culture.includes('Berber')) utterance.lang = 'ar-MA';
        
        window.speechSynthesis.speak(utterance);
    };

    return (
        <div className="min-h-screen pt-24 pb-12 px-6 bg-[#fdf8f3] font-sans relative overflow-hidden">
             {/* Dynamic Background Texture */}
             <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
             
             {/* Render Detail Modal */}
             <TaskDetailModal 
                task={selectedTask} 
                activeSwap={activeSwap} 
                onClose={() => setSelectedTask(null)} 
                completedTasks={completedTasks}
                toggleTask={toggleTask}
                playWord={playWord}
             />

            <div className="container mx-auto max-w-5xl relative">
                
                <div className="text-center mb-16">
                    <span className="text-accent-terra uppercase tracking-widest text-xs font-bold mb-4 block">Lifestyle Exchange</span>
                    <h1 className="text-4xl md:text-6xl font-serif font-medium text-text-primary mb-6">
                        Culture <span className="italic font-light">Swap</span>
                    </h1>
                    <p className="text-lg text-text-secondary max-w-2xl mx-auto font-light">
                        Don't just chat. <span className="text-text-primary font-bold">Exchange lifestyles.</span>
                    </p>
                </div>

                {!activeSwap ? (
                    <div className="space-y-12 animate-fade-in">
                        {/* Main Interaction Card */}
                        <div className="bg-white border border-black/5 rounded-[2rem] p-10 md:p-20 text-center shadow-[0_20px_50px_rgba(0,0,0,0.05)] relative overflow-hidden group">
                            {/* Decorative Background Elements */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent-terra via-accent-gold to-accent-teal"></div>
                            <div className="absolute -top-24 -right-24 w-64 h-64 bg-accent-gold/5 rounded-full blur-3xl group-hover:bg-accent-gold/10 transition-all duration-1000"></div>
                            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-accent-teal/5 rounded-full blur-3xl group-hover:bg-accent-teal/10 transition-all duration-1000"></div>

                            <div className="relative z-10">
                                <div className="w-28 h-28 md:w-40 md:h-40 bg-[#faf7f2] rounded-full mx-auto mb-10 flex items-center justify-center text-6xl border border-[#f0ece6] shadow-inner relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/5"></div>
                                    <span className={!isMatching ? 'animate-handshake relative z-10' : 'animate-spin-slow relative z-10'}>
                                        {isMatching ? '🌍' : '🤝'}
                                    </span>
                                </div>
                                
                                <h2 className="text-4xl md:text-5xl font-serif font-medium text-text-primary mb-6 tracking-tight">Walk a mile in <span className="italic font-light opacity-60">their</span> shoes.</h2>
                                <p className="text-text-secondary mb-12 max-w-xl mx-auto leading-relaxed text-lg font-light">
                                    Our algorithmic matchmaking bridges borders. Connect with a stranger today to swap <span className="text-text-primary font-medium border-b border-accent-gold/30">traditional recipes</span>, morning <span className="text-text-primary font-medium border-b border-accent-blue/30">rituals</span>, and <span className="text-text-primary font-medium border-b border-accent-terra/30">ancestral words</span> for one complete cycle of the sun.
                                </p>

                                <button
                                    onClick={startMatch}
                                    disabled={isMatching}
                                    className={`relative px-12 py-5 rounded-2xl font-bold text-lg transition-all duration-500 transform active:scale-95 shadow-xl group/btn overflow-hidden
                                        ${isMatching ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-text-primary text-white hover:shadow-2xl hover:-translate-y-1'}`}
                                >
                                    <span className="relative z-10">{isMatching ? 'Calculating Affinity...' : 'Commence Lifestyle Swap'}</span>
                                    {!isMatching && <div className="absolute inset-0 bg-gradient-to-r from-accent-terra/20 to-accent-gold/20 opacity-0 group-hover/btn:opacity-100 transition-opacity"></div>}
                                </button>

                                <div className="mt-8 flex items-center justify-center gap-6 text-[10px] font-bold uppercase tracking-[0.2em] text-text-secondary/60">
                                    <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> 1.2k Active Swaps</span>
                                    <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                                    <span className="flex items-center gap-2">94% Cultural Affinity</span>
                                </div>
                            </div>
                        </div>

                        {/* Feature Highlights */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            {[
                                { icon: '🥘', title: 'Culinary Oath', desc: 'Exchange secret family recipes', color: 'orange' },
                                { icon: '⚡', title: 'Ritual Mirror', desc: 'Adopt their ancestral habits', color: 'blue' },
                                { icon: '🗣️', title: 'Oral Heritage', desc: 'Learn the music of their tongue', color: 'teal' },
                                { icon: '🧩', title: 'Visual Soul', desc: 'Connect through art and rhythm', color: 'terra' }
                            ].map((feat, i) => (
                                <div key={i} className="bg-white/50 backdrop-blur-sm border border-black/5 p-8 rounded-2xl hover:bg-white transition-all duration-500 group">
                                    <div className={`w-12 h-12 rounded-xl bg-${feat.color === 'terra' ? 'accent-terra' : `accent-${feat.color}`}/5 flex items-center justify-center text-2xl border border-black/5 mb-4 group-hover:scale-110 transition-transform`}>
                                        {feat.icon}
                                    </div>
                                    <h4 className="font-bold text-text-primary text-xs uppercase tracking-wider mb-1">{feat.title}</h4>
                                    <p className="text-[10px] text-text-secondary font-light leading-relaxed">{feat.desc}</p>
                                </div>
                            ))}
                        </div>

                        {/* Community Preview Section */}
                        <div className="pt-12 mt-12 border-t border-black/5">
                            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-center text-text-secondary/50 mb-10 italic">Global Citizenship in Motion</h4>
                            <div className="flex flex-wrap justify-center gap-8 opacity-40 hover:opacity-100 transition-opacity duration-700 grayscale hover:grayscale-0">
                                {partners.slice(0, 5).map((p, i) => (
                                    <div key={i} className="flex items-center gap-3 bg-white px-4 py-2 rounded-full border border-black/5 shadow-sm">
                                        <span className="text-lg">{p.avatar}</span>
                                        <span className="text-[10px] font-bold uppercase tracking-widest">{p.culture}</span>
                                    </div>
                                ))}
                                <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-full border border-black/5 shadow-sm">
                                    <span className="text-lg">🌍</span>
                                    <span className="text-[10px] font-bold uppercase tracking-widest">+12 More</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 animate-fade-in">
                        
                        {/* Live Status Sidebar - The Passport */}
                        <div className="lg:col-span-4 flex flex-col gap-6">
                            <div className="bg-white border border-black/5 rounded-[2rem] p-8 shadow-xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-accent-gold/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                                
                                <div className="flex items-center justify-between mb-8 relative z-10">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-bold text-accent-terra uppercase tracking-widest mb-1">Status</span>
                                        <span className="flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                            <span className="text-sm font-bold text-text-primary">Live Connection</span>
                                        </span>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-[10px] font-bold text-text-secondary uppercase tracking-widest mb-1 block">Time Remaining</span>
                                        <div className="text-xl font-mono font-bold text-text-primary tabular-nums">{formatTime(timeLeft)}</div>
                                    </div>
                                </div>
                                
                                <div className="text-center mb-10 relative z-10 bg-[#faf7f2]/50 p-8 rounded-3xl border border-[#f0ece6]">
                                    <div className="w-24 h-24 rounded-full bg-white mx-auto mb-6 flex items-center justify-center text-5xl shadow-sm border border-black/5 relative group/avatar">
                                        <div className="absolute inset-2 border-2 border-dashed border-accent-gold/20 rounded-full group-hover:rotate-45 transition-transform duration-700"></div>
                                        {activeSwap.avatar}
                                    </div>
                                    <h2 className="text-3xl font-serif font-medium text-text-primary leading-tight mb-2">{activeSwap.name}</h2>
                                    <p className="text-[10px] font-bold text-accent-terra uppercase tracking-[0.2em] mb-4">{activeSwap.culture}</p>
                                    
                                    <div className="flex items-center justify-center gap-2 text-xs text-text-secondary bg-white/80 py-2 px-4 rounded-full w-fit mx-auto border border-black/5">
                                        <span className="opacity-60">Located in</span>
                                        <span className="font-bold text-text-primary">{activeSwap.location}</span>
                                    </div>
                                </div>

                                <div className="space-y-6 relative z-10">
                                    <div>
                                        <div className="flex justify-between items-center mb-3">
                                            <h4 className="text-[10px] font-bold text-text-secondary uppercase tracking-[0.2em]">Swap Progress</h4>
                                            <span className="text-[10px] font-bold text-accent-terra">{Math.round((completedTasks.length / 4) * 100)}%</span>
                                        </div>
                                        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden p-0.5 border border-black/5">
                                            <div className="h-full bg-accent-terra rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(230,115,0,0.3)]" style={{ width: `${(completedTasks.length / 4) * 100}%` }}></div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-4 gap-2">
                                        {['food', 'ritual', 'language', 'visual'].map((t) => (
                                            <div key={t} className={`aspect-square rounded-xl flex items-center justify-center border transition-all ${completedTasks.includes(t) ? 'bg-green-500 border-green-600 text-white shadow-lg' : 'bg-gray-50 border-gray-100 text-gray-300'}`}>
                                                {completedTasks.includes(t) ? '✓' : ''}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <button 
                                    onClick={stopSwap}
                                    className="w-full mt-10 py-4 text-[10px] font-bold text-red-600 uppercase tracking-[0.3em] bg-red-50/50 rounded-2xl hover:bg-red-50 hover:text-red-700 transition-all border border-red-100/30"
                                >
                                    End Exchange
                                </button>
                            </div>

                            <div className="bg-text-primary p-10 rounded-[2rem] text-white shadow-2xl relative overflow-hidden group">
                                <div className="relative z-10">
                                    <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent-gold mb-6 opacity-60">Cultural Wisdom</h4>
                                    <p className="font-serif italic text-xl leading-relaxed font-light mb-8 group-hover:translate-x-1 transition-transform">
                                        "To truly understand a people, you must not only hear their stories but eat their salt and walk their paths."
                                    </p>
                                    <div className="w-12 h-0.5 bg-accent-gold/30"></div>
                                </div>
                                <div className="absolute -bottom-10 -right-10 text-[12rem] opacity-[0.03] pointer-events-none transform rotate-12 group-hover:rotate-0 transition-transform duration-1000">✨</div>
                            </div>
                        </div>

                        {/* Main Challenge Content */}
                        <div className="lg:col-span-8 flex flex-col gap-6 animate-slide-up">
                            
                            {/* Theme Header */}
                            <div className="bg-white border border-black/5 rounded-[2rem] p-10 shadow-sm relative overflow-hidden group">
                                <div className="absolute top-0 left-0 w-1 h-full bg-accent-terra opacity-20 group-hover:opacity-100 transition-opacity"></div>
                                <div className="relative z-10">
                                    <span className="text-accent-terra uppercase tracking-[0.3em] text-[10px] font-bold mb-3 block">Current Assignment</span>
                                    <h3 className="text-4xl font-serif font-medium text-text-primary mb-3 leading-tight">Your Lifestyle Blueprint</h3>
                                    <p className="text-text-secondary font-light text-base leading-relaxed max-w-lg">Adopt these essential elements of <span className="text-text-primary font-medium">{activeSwap.name}'s</span> world to bridge the cultural distance.</p>
                                </div>
                            </div>

                            {/* Task Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Food Task Card */}
                                <div 
                                    onClick={() => setSelectedTask('food')}
                                    className="group relative bg-white border border-[#f0f0f0] rounded-[2rem] p-3 shadow-md hover:shadow-2xl transition-all cursor-pointer h-[420px] overflow-hidden"
                                >
                                     <div className="absolute inset-3 rounded-[1.5rem] bg-[#faf7f2] overflow-hidden">
                                         <img 
                                            src={activeSwap.foodImage} 
                                            alt={activeSwap.food} 
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2000ms]" 
                                            onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=800&auto=format&fit=crop'; }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10"></div>
                                        
                                        <div className="absolute bottom-8 left-8 right-8 z-20 transform group-hover:-translate-y-2 transition-transform duration-700">
                                            <div className="flex items-center gap-2 mb-3">
                                                <div className="w-6 h-6 rounded-lg bg-white/20 backdrop-blur-md flex items-center justify-center text-xs">🥘</div>
                                                <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/70">Culinary Oath</h4>
                                            </div>
                                            <h3 className="text-3xl font-serif font-medium text-white mb-6 leading-tight">{activeSwap.food}</h3>
                                            <div className="flex items-center justify-between">
                                                <span className="px-6 py-2.5 bg-white text-text-primary text-[10px] font-bold rounded-full uppercase tracking-widest shadow-lg transform group-hover:scale-105 transition-transform">Explore Cuisine</span>
                                                {completedTasks.includes('food') && <span className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm shadow-[0_0_20px_rgba(34,197,94,0.5)]">✓</span>}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="absolute top-4 right-4 z-30">
                                        <button 
                                            onClick={(e) => { e.stopPropagation(); toggleTask('food'); }}
                                            className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all ${completedTasks.includes('food') ? 'bg-green-500 border-green-500 text-white' : 'bg-white/20 border-white/30 text-white hover:bg-white/40'}`}
                                        >
                                            {completedTasks.includes('food') ? '✓' : ''}
                                        </button>
                                    </div>
                                </div>

                                {/* Ritual Task Card */}
                                <div 
                                    onClick={() => setSelectedTask('ritual')}
                                    className="group relative bg-white border border-[#f0f0f0] rounded-[2rem] p-3 shadow-md hover:shadow-2xl transition-all cursor-pointer h-[420px] overflow-hidden"
                                >
                                     <div className="absolute inset-3 rounded-[1.5rem] bg-[#faf7f2] overflow-hidden">
                                         <img 
                                            src={activeSwap.ritualImage} 
                                            alt={activeSwap.routine} 
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2000ms]" 
                                            onError={(e) => { e.target.src = '/images/master-ritual.png'; }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10"></div>
                                        
                                        <div className="absolute bottom-8 left-8 right-8 z-20 transform group-hover:-translate-y-2 transition-transform duration-700">
                                            <div className="flex items-center gap-2 mb-3">
                                                <div className="w-6 h-6 rounded-lg bg-white/20 backdrop-blur-md flex items-center justify-center text-xs">⚡</div>
                                                <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/70">Ritual Mirror</h4>
                                            </div>
                                            <h3 className="text-3xl font-serif font-medium text-white mb-6 leading-tight">{activeSwap.routine}</h3>
                                            <div className="flex items-center justify-between">
                                                <span className="px-6 py-2.5 bg-white text-text-primary text-[10px] font-bold rounded-full uppercase tracking-widest shadow-lg transform group-hover:scale-105 transition-transform">Practice Ritual</span>
                                                {completedTasks.includes('ritual') && <span className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm shadow-[0_0_20px_rgba(34,197,94,0.5)]">✓</span>}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="absolute top-4 right-4 z-30">
                                        <button 
                                            onClick={(e) => { e.stopPropagation(); toggleTask('ritual'); }}
                                            className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all ${completedTasks.includes('ritual') ? 'bg-green-500 border-green-500 text-white' : 'bg-white/20 border-white/30 text-white hover:bg-white/40'}`}
                                        >
                                            {completedTasks.includes('ritual') ? '✓' : ''}
                                        </button>
                                    </div>
                                </div>

                                {/* Language Task Card */}
                                <div 
                                    onClick={() => setSelectedTask('language')}
                                    className="group relative bg-white border border-[#f0f0f0] rounded-[2rem] p-3 shadow-md hover:shadow-2xl transition-all cursor-pointer h-[420px] overflow-hidden"
                                >
                                     <div className="absolute inset-3 rounded-[1.5rem] bg-[#faf7f2] overflow-hidden">
                                         <img 
                                            src={activeSwap.languageImage} 
                                            alt="Cultural Script" 
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2000ms]" 
                                            onError={(e) => { e.target.src = '/images/master-language.png'; }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10"></div>
                                        
                                        <div className="absolute bottom-8 left-8 right-8 z-20 transform group-hover:-translate-y-2 transition-transform duration-700">
                                            <div className="flex items-center gap-2 mb-3">
                                                <div className="w-6 h-6 rounded-lg bg-white/20 backdrop-blur-md flex items-center justify-center text-xs">🗣️</div>
                                                <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/70">Oral Heritage</h4>
                                            </div>
                                            <h3 className="text-3xl font-serif font-medium text-white mb-6 leading-tight">Word Mimicry</h3>
                                            <div className="flex items-center justify-between">
                                                <span className="px-6 py-2.5 bg-white text-text-primary text-[10px] font-bold rounded-full uppercase tracking-widest shadow-lg transform group-hover:scale-105 transition-transform">Speak Language</span>
                                                {completedTasks.includes('language') && <span className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm shadow-[0_0_20px_rgba(34,197,94,0.5)]">✓</span>}
                                            </div>
                                        </div>
                                    </div>
                                 <div className="absolute top-4 right-4 z-30">
                                        <button 
                                            onClick={(e) => { e.stopPropagation(); toggleTask('language'); }}
                                            className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all ${completedTasks.includes('language') ? 'bg-green-500 border-green-500 text-white' : 'bg-white/20 border-white/30 text-white hover:bg-white/40'}`}
                                        >
                                            {completedTasks.includes('language') ? '✓' : ''}
                                        </button>
                                    </div>
                                </div>

                                {/* Visual Task Card */}
                                <div 
                                    onClick={() => setSelectedTask('visual')}
                                    className="group relative bg-white border border-[#f0f0f0] rounded-[2rem] p-3 shadow-md hover:shadow-2xl transition-all cursor-pointer h-[420px] overflow-hidden"
                                >
                                     <div className="absolute inset-3 rounded-[1.5rem] bg-[#faf7f2] overflow-hidden">
                                         <img 
                                            src={activeSwap.visualImage} 
                                            alt="Traditional Art" 
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2000ms]" 
                                            onError={(e) => { e.target.src = '/images/visual-kenji.png'; }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10"></div>
                                        
                                        <div className="absolute bottom-8 left-8 right-8 z-20 transform group-hover:-translate-y-2 transition-transform duration-700">
                                            <div className="flex items-center gap-2 mb-3">
                                                <div className="w-6 h-6 rounded-lg bg-white/20 backdrop-blur-md flex items-center justify-center text-xs">🧩</div>
                                                <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/70">Visual Soul</h4>
                                            </div>
                                            <h3 className="text-3xl font-serif font-medium text-white mb-6 leading-tight">Art & Rhythm</h3>
                                            <div className="flex items-center justify-between">
                                                <span className="px-6 py-2.5 bg-white text-text-primary text-[10px] font-bold rounded-full uppercase tracking-widest shadow-lg transform group-hover:scale-105 transition-transform">Feel the Flow</span>
                                                {completedTasks.includes('visual') && <span className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm shadow-[0_0_20px_rgba(34,197,94,0.5)]">✓</span>}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="absolute top-4 right-4 z-30">
                                        <button 
                                            onClick={(e) => { e.stopPropagation(); toggleTask('visual'); }}
                                            className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all ${completedTasks.includes('visual') ? 'bg-green-500 border-green-500 text-white' : 'bg-white/20 border-white/30 text-white hover:bg-white/40'}`}
                                        >
                                            {completedTasks.includes('visual') ? '✓' : ''}
                                        </button>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                )}
            </div>
            
            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes handshake {
                    0%, 100% { transform: rotate(0); }
                    25% { transform: rotate(-10deg); }
                    75% { transform: rotate(10deg); }
                }
                .animate-handshake {
                    display: inline-block;
                    animation: handshake 2s ease-in-out infinite;
                }
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .animate-spin-slow {
                    display: inline-block;
                    animation: spin-slow 12s linear infinite;
                }
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fade-in 0.8s ease-out forwards;
                }
                @keyframes slide-up {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-slide-up {
                    animation: slide-up 1s ease-out forwards;
                }
            `}} />
        </div>
    );
};

export default CultureSwap;

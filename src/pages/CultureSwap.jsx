import { useState, useEffect } from 'react';

const TaskDetailModal = ({ task, activeSwap, onClose, completedTasks, toggleTask, playWord }) => {
    if (!task) return null;

    const taskData = {
        food: {
            title: 'The Culinary Oath',
            subtitle: `Cook: ${activeSwap.food}`,
            icon: '🥘',
            color: 'orange',
            requirements: [
                'Gather all listed ingredients',
                'Follow the step-by-step process',
                'Savor the meal with mindfulness'
            ],
            content: (
                <div className="space-y-6">
                    <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white mb-6 transform -rotate-1 transition-transform hover:rotate-0 h-64 bg-gray-100 relative group">
                         <img src={activeSwap.foodImage} alt={activeSwap.food} className="w-full h-full object-cover" />
                         <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                         <div className="absolute bottom-6 left-6 text-white text-3xl font-serif font-black">{activeSwap.food}</div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h5 className="text-xs font-black uppercase tracking-widest text-orange-600 mb-4 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-orange-600"></span> Ingredients
                            </h5>
                            <div className="flex flex-wrap gap-2">
                                {activeSwap.ingredients.map((ing, i) => (
                                    <span key={i} className="px-4 py-2 bg-orange-50 text-orange-700 text-xs font-bold rounded-xl border border-orange-100 italic shadow-sm">{ing}</span>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h5 className="text-xs font-black uppercase tracking-widest text-orange-600 mb-4 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-orange-600"></span> The Process
                            </h5>
                            <p className="text-sm text-text-primary leading-relaxed bg-orange-50/30 p-6 rounded-2xl border border-orange-100 italic shadow-inner">
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
                'Set aside dedicated time',
                'Create a quiet environment',
                'Connect with the cultural intent'
            ],
            content: (
                <div className="space-y-6 text-center">
                     <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white mb-8 transform rotate-1 transition-transform hover:rotate-0 h-48 bg-blue-50 flex items-center justify-center">
                         <span className="text-7xl animate-pulse">⚡</span>
                    </div>
                    <div className="bg-blue-50/50 p-8 rounded-3xl border border-blue-100 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100/50 rounded-full blur-3xl -z-10"></div>
                        <h5 className="text-xs font-black uppercase tracking-widest text-blue-600 mb-4 tracking-[0.2em]">Step-by-Step Practice</h5>
                        <p className="text-xl font-serif text-text-primary leading-loose italic max-w-2xl mx-auto">
                            "{activeSwap.ritualDetails}"
                        </p>
                    </div>
                </div>
            )
        },
        music: {
            title: 'Melodic Soul',
            subtitle: 'Ancestral Rhythms',
            icon: '🎵',
            color: 'purple',
            requirements: [
                'Listen with headphones/quietly',
                'Focus on the rhythmic patterns',
                'Feel the emotional resonance'
            ],
            content: (
                <div className="space-y-6 text-center">
                     <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white mb-8 transform -rotate-1 transition-transform hover:rotate-0 h-48 bg-purple-50 flex items-center justify-center relative">
                         <img src={activeSwap.musicImage} alt="Ancient Music" className="w-full h-full object-cover" />
                         <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                         <div className="absolute inset-0 flex items-center justify-center">
                            <div className="flex gap-4">
                                <span className="text-5xl animate-bounce" style={{ animationDelay: '0s' }}>🎵</span>
                                <span className="text-5xl animate-bounce" style={{ animationDelay: '0.2s' }}>🥁</span>
                                <span className="text-5xl animate-bounce" style={{ animationDelay: '0.4s' }}>🎻</span>
                             </div>
                         </div>
                    </div>
                    <div className="bg-purple-50/50 p-8 rounded-3xl border border-purple-100">
                         <h5 className="text-xs font-black uppercase tracking-widest text-purple-600 mb-6 tracking-[0.2em]">Sonographic Journey</h5>
                        <p className="text-lg font-serif text-text-primary leading-relaxed italic border-l-4 border-purple-200 pl-6 text-left">
                            "{activeSwap.musicTask}"
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
                'Listen to the pronunciation',
                'Practice speaking aloud',
                'Record or memorize for sharing'
            ],
            content: (
                <div className="space-y-8">
                    <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white h-48 mb-8 relative">
                        <img src={activeSwap.languageImage} alt="Cultural Script" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
                        <div className="absolute top-1/2 left-8 -translate-y-1/2">
                             <h5 className="text-xs font-black uppercase tracking-widest text-white/70 mb-2 tracking-[0.2em]">Language Soul</h5>
                             <p className="text-2xl font-serif text-white italic max-w-sm">"{activeSwap.languageSignificance}"</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {activeSwap.words.map((word, idx) => (
                            <div 
                                key={idx} 
                                onClick={() => playWord(word)}
                                className="p-6 bg-white rounded-2xl border border-black/5 shadow-sm hover:border-teal-500 cursor-pointer transition-all active:scale-95 group/word"
                            >
                                <div className="flex items-center gap-3">
                                    <span className="text-xl group-hover/word:scale-125 transition-transform">🔊</span>
                                    <div>
                                        <p className="text-2xl font-serif font-black text-text-primary mb-1">{word.split(' (')[0]}</p>
                                        <p className="text-[10px] text-text-muted font-bold uppercase tracking-widest">{word.split(' (')[1] ? word.split(' (')[1].replace(')', '') : ''}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )
        }
    }[task];

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 animate-fade-in overflow-y-auto">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose}></div>
            <div className="relative bg-white w-full max-w-4xl rounded-[3rem] p-8 md:p-14 shadow-2xl border border-white/20 animate-scale-up-long my-auto">
                <button 
                    onClick={onClose}
                    className="absolute top-6 right-6 w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-2xl transition-all hover:rotate-90"
                >
                    ✕
                </button>
                
                <div className="flex items-center gap-4 mb-4">
                    <div className={`w-12 h-12 rounded-2xl bg-${taskData.color}-100 flex items-center justify-center text-2xl`}>{taskData.icon}</div>
                    <div>
                        <h4 className={`text-xs font-black uppercase tracking-[0.3em] text-${taskData.color}-600 mb-1`}>{taskData.title}</h4>
                        <h3 className="text-3xl font-serif font-bold text-text-primary leading-tight">{taskData.subtitle}</h3>
                    </div>
                </div>

                <div className="relative mb-8">
                    {taskData.content}
                </div>

                {/* Requirements Checklist */}
                <div className="bg-gray-50 p-8 rounded-3xl border border-black/5 mb-10">
                    <h5 className="text-[10px] font-black uppercase tracking-widest text-text-muted mb-4">Task Requirements</h5>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {taskData.requirements.map((req, i) => (
                            <div key={i} className="flex items-center gap-3 bg-white p-4 rounded-xl border border-black/5 shadow-sm">
                                <span className={`text-${taskData.color}-500 font-bold`}>✓</span>
                                <span className="text-xs font-medium text-text-primary">{req}</span>
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
                        className={`group px-12 py-5 bg-text-primary text-white font-black rounded-2xl hover:scale-105 active:scale-95 transition-transform shadow-xl flex items-center gap-4 mx-auto`}
                    >
                        {completedTasks.includes(task) ? 'Task Completed' : 'Accept Challenge & Start'}
                        <span className="group-hover:translate-x-2 transition-transform">→</span>
                    </button>
                    {completedTasks.includes(task) && (
                        <p className="text-[10px] font-bold text-green-600 mt-3 uppercase tracking-widest">You have already committed to this!</p>
                    )}
                </div>
            </div>
        </div>
    );
};

const CultureSwap = () => {
    const [isMatching, setIsMatching] = useState(false);
    const [activeSwap, setActiveSwap] = useState(() => partners[Math.floor(Math.random() * partners.length)]);
    const [timeLeft, setTimeLeft] = useState(86400); // 24 hours in seconds
    const [completedTasks, setCompletedTasks] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);

    const partners = [
        {
            name: 'Priya',
            location: 'Rajasthan, India',
            culture: 'Marwari',
            avatar: '👤',
            food: 'Dal Baati Churma',
            foodImage: '/images/food-priya.png',
            ingredients: ['Wheat flour', 'Ghee', 'Moong/Chana Dal', 'Jaggery', 'Cardamom', 'Green Chilies'],
            recipe: 'Bake hand-rolled wheat balls (Baati) until golden. Prepare a spiced lentil soup (Dal). Crumb some Baatis with ghee and jaggery for the sweet (Churma).',
            routine: 'Morning desert walk and sunrise folk singing',
            ritualDetails: 'Start your day with a peaceful walk in the desert during sunrise. Hum a traditional folk melody to welcome the energy of the new day.',
            words: ['Khamma Ghani (Hello)', 'Padharo (Welcome)', 'Dhanyavad (Thank you)'],
            languageSignificance: 'Marwari is a language of extreme hospitality. A greeting is often a blessing, and a "Welcome" is and invitation into one\'s soul.',
            musicTask: 'Listen to Kalbeliya folk tunes. Feel the desert energy in the rhythmic beats of the "Been".',
            color: '#e67300',
            musicImage: 'https://images.unsplash.com/photo-1590483736622-39da8af75bba?q=80&w=1974&auto=format&fit=crop',
            languageImage: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=2071&auto=format&fit=crop'
        },
        {
            name: 'Kenji',
            location: 'Kyoto, Japan',
            culture: 'Traditional Japanese',
            avatar: '👤',
            food: 'Miso Soup & Grilled Fish',
            foodImage: '/images/food-kenji.png',
            ingredients: ['Miso paste', 'Dashi stock', 'Silken Tofu', 'Dried Seaweed', 'Mackerel fillet', 'Soy sauce'],
            recipe: 'Simmer dashi with seaweed and tofu. Whisk in miso paste at the end. Grill salted mackerel until the skin is crispy and golden.',
            routine: 'Morning Zen meditation and tea preparation',
            ritualDetails: 'Practice 10 minutes of silent seated meditation, then prepare a bowl of matcha or green tea with mindful, deliberate movements.',
            words: ['Ohayo (Good Morning)', 'Itadakimasu (Let\'s eat)', 'Arigato (Thank you)'],
            languageSignificance: 'Japanese greetings reflect deep mindfulness. "Itadakimasu" is a sacred acknowledgment of all the lives that contributed to your meal.',
            musicTask: 'Listen to Koto instrumental music. Let the wooden string vibrations find your inner focus.',
            color: '#bc002d',
            musicImage: 'https://images.unsplash.com/photo-1542332213-31f87348057f?q=80&w=2070&auto=format&fit=crop',
            languageImage: 'https://images.unsplash.com/photo-1596484552943-4b68f3074697?q=80&w=2072&auto=format&fit=crop'
        },
        {
            name: 'Sofía',
            location: 'Oaxaca, Mexico',
            culture: 'Zapotec/Mexican',
            avatar: '👤',
            food: 'Mole Poblano with Tortillas',
            foodImage: 'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?q=80&w=2094&auto=format&fit=crop',
            ingredients: ['Dried Ancho Chiles', 'Abuelita Chocolate', 'Sesame seeds', 'Almonds', 'Corn Tortillas'],
            recipe: 'Toast and blend chiles with nuts and spices. Simmer with dark chocolate to create a complex, earthy sauce. Serve with hot handmade tortillas.',
            routine: 'Market visit for fresh cacao and chiles',
            ritualDetails: 'Visit a local market (or grocery) specifically to find the most aromatic spices and freshest ingredients for your evening meal.',
            words: ['Hola (Hello)', 'Provecho (Enjoy your meal)', 'Gracias (Thank you)'],
            languageSignificance: 'In Mexico, food and speech are communal. "Provecho" is a ubiquitous blessing shared even with strangers at the next table.',
            musicTask: 'Listen to Son Jarocho folk music. The "Jarana" guitar rhythms celebrate the vibrancy of communal life.',
            color: '#006341',
            musicImage: 'https://images.unsplash.com/photo-1550927062-09e863ba9d0d?q=80&w=1974&auto=format&fit=crop',
            languageImage: 'https://images.unsplash.com/photo-1522071823991-b99c65118583?q=80&w=2070&auto=format&fit=crop'
        },
        {
            name: 'Amina',
            location: 'Marrakesh, Morocco',
            culture: 'Berber',
            avatar: '👤',
            food: 'Lamb Tagine with Prunes',
            foodImage: 'https://images.unsplash.com/photo-1541518763669-27fef04b14ea?q=80&w=2066&auto=format&fit=crop',
            ingredients: ['Lamb shoulder', 'Dried prunes', 'Toasted almonds', 'Cinnamon', 'Ginger', 'Saffron'],
            recipe: 'Slow-cook lamb with aromatic spices until tender. Add honey and prunes in the last 30 minutes. Garnish with crunchy almonds.',
            routine: 'Afternoon mint tea ritual with family',
            ritualDetails: 'Prepare fresh mint tea with plenty of sugar. Pour from a height to create foam, and share with family or friends while discussing the day.',
            words: ['Salam (Peace/Hello)', 'Bismillah (In the name of God)', 'Shukran (Thank you)'],
            languageSignificance: 'These words form the foundation of Berber hospitality, rooted in peace, spiritual intention, and deep gratitude.',
            musicTask: 'Listen to spiritual Gnawa rhythms. The heavy pulse of the "Hajhouj" lute centers the soul.',
            color: '#c1272d',
            musicImage: 'https://images.unsplash.com/photo-1563223552-30d01fda3ead?q=80&w=1970&auto=format&fit=crop',
            languageImage: 'https://images.unsplash.com/photo-1610444583737-9759af57774d?q=80&w=2015&auto=format&fit=crop'
        }
    ];

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

    const startMatch = () => {
        setIsMatching(true);
        setTimeout(() => {
            const randomPartner = partners[Math.floor(Math.random() * partners.length)];
            setActiveSwap(randomPartner);
            setIsMatching(false);
            setTimeLeft(86400); // Reset timer
        }, 3000);
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

    const playWord = (wordWithTranslation) => {
        const text = wordWithTranslation.split(' (')[0];
        const utterance = new SpeechSynthesisUtterance(text);
        // Try to match language based on culture
        if (activeSwap.culture.includes('Japan')) utterance.lang = 'ja-JP';
        else if (activeSwap.culture.includes('Mexico')) utterance.lang = 'es-MX';
        else if (activeSwap.culture.includes('Marwari')) utterance.lang = 'hi-IN';
        else if (activeSwap.culture.includes('Berber')) utterance.lang = 'ar-MA';
        
        window.speechSynthesis.speak(utterance);
    };

    return (
        <div className="min-h-screen pt-24 pb-12 px-6 bg-gradient-to-br from-bg-primary via-bg-secondary to-bg-primary overflow-hidden">
             
             {/* Render Detail Modal */}
             <TaskDetailModal 
                task={selectedTask} 
                activeSwap={activeSwap} 
                onClose={() => setSelectedTask(null)} 
                completedTasks={completedTasks}
                toggleTask={toggleTask}
                playWord={playWord}
             />

            <div className="container mx-auto max-w-6xl relative">
                
                {/* Background Decorative Elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-accent-terra/5 rounded-full blur-3xl -z-10 animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-teal/5 rounded-full blur-3xl -z-10 animate-pulse" style={{ animationDelay: '2s' }}></div>

                <div className="text-center mb-12">
                    <h1 className="text-5xl md:text-7xl font-serif font-black text-text-primary mb-6 tracking-tighter leading-tight">
                        Culture <span className="text-accent-terra italic">Swap</span>
                    </h1>
                    <p className="text-xl text-text-muted max-w-3xl mx-auto font-medium">
                        Don't just chat. <span className="text-text-primary font-bold underline decoration-accent-teal/30">Exchange lifestyles.</span> Live another person's reality for 24 hours.
                    </p>
                </div>

                {!activeSwap ? (
                    <div className="bg-white border border-black/10 rounded-[2.5rem] p-10 md:p-16 text-center shadow-2xl relative overflow-hidden group">
                        {/* Interactive Matcher */}
                        <div className="relative z-10">
                             <div className="w-32 h-32 md:w-40 md:h-40 bg-bg-secondary rounded-full mx-auto mb-10 flex items-center justify-center text-6xl shadow-xl border-4 border-white ring-1 ring-black/5 transition-transform duration-700 group-hover:rotate-12 overflow-hidden">
                                <span className={!isMatching ? 'animate-handshake' : 'animate-spin-slow'}>
                                    {isMatching ? '🌍' : '🤝'}
                                </span>
                            </div>
                            
                            <h2 className="text-3xl font-serif font-bold text-text-primary mb-4">Ready to walk in someone else's shoes?</h2>
                            <p className="text-text-muted mb-10 max-w-xl mx-auto leading-relaxed">
                                Our AI will match you with a partner from a different culture. You'll swap food recipes, daily rituals, and language for exactly one day.
                            </p>

                            <button
                                onClick={startMatch}
                                disabled={isMatching}
                                className={`group relative px-12 py-5 rounded-2xl font-black text-lg transition-all duration-500 transform hover:scale-105 active:scale-95 shadow-xl hover:shadow-2xl
                                    ${isMatching ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-text-primary text-white hover:bg-black'}`}
                            >
                                <span className={isMatching ? 'opacity-0' : 'opacity-100'}>Launch lifestyle Swap</span>
                                {isMatching && (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    </div>
                                )}
                            </button>
                        </div>

                        {/* Feature Badges */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 text-left border-t border-black/5 pt-10">
                            <div className="flex gap-4">
                                <div className="w-12 h-12 rounded-xl bg-accent-gold/10 flex items-center justify-center text-2xl">🥘</div>
                                <div>
                                    <h4 className="font-bold text-text-primary">Culinary Swap</h4>
                                    <p className="text-xs text-text-muted">Cook exactly what they eat today.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-12 h-12 rounded-xl bg-accent-blue/10 flex items-center justify-center text-2xl">⚡</div>
                                <div>
                                    <h4 className="font-bold text-text-primary">Ritual Mirror</h4>
                                    <p className="text-xs text-text-muted">Adopt their morning/evening routine.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-12 h-12 rounded-xl bg-accent-teal/10 flex items-center justify-center text-2xl">🗣️</div>
                                <div>
                                    <h4 className="font-bold text-text-primary">Voice Gift</h4>
                                    <p className="text-xs text-text-muted">Learn 3 sacred words of their heritage.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center text-2xl">🎵</div>
                                <div>
                                    <h4 className="font-bold text-text-primary">Melodic Soul</h4>
                                    <p className="text-xs text-text-muted">Listen to their ancestral rhythms.</p>
                                </div>
                            </div>
                        </div>

                        {/* Visual Eye Candy */}
                        <div className="absolute -top-24 -left-24 w-60 h-60 bg-accent-terra/10 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
                        <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-accent-teal/10 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in">
                        
                        {/* Live Status Sidebar */}
                        <div className="lg:col-span-4 flex flex-col gap-6">
                            <div className="bg-white border border-black/10 rounded-3xl p-8 shadow-lg">
                                <div className="flex items-center justify-between mb-6">
                                    <span className="px-3 py-1 bg-green-100 text-green-700 text-[10px] font-black rounded-full uppercase tracking-widest animate-pulse">Live Exchange</span>
                                    <div className="text-xl font-mono font-bold text-text-primary">{formatTime(timeLeft)}</div>
                                </div>
                                
                                <div className="text-center mb-6">
                                    <div className="w-24 h-24 rounded-full bg-bg-secondary mx-auto mb-4 flex items-center justify-center text-5xl border-4 border-white shadow-md ring-1 ring-black/5">
                                        {activeSwap.avatar}
                                    </div>
                                    <h2 className="text-2xl font-serif font-black text-text-primary leading-tight">Swapping with {activeSwap.name}</h2>
                                    <p className="text-sm font-bold text-accent-terra uppercase tracking-wider mt-1">{activeSwap.culture} Culture</p>
                                    <p className="text-xs text-text-muted mt-2">📍 {activeSwap.location}</p>
                                </div>

                                <div className="space-y-4">
                                    <div className="p-4 bg-bg-secondary rounded-2xl border border-black/5">
                                        <h4 className="text-xs font-black text-text-muted uppercase mb-2">Challenge Progress</h4>
                                        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                            <div className="h-full bg-accent-terra transition-all" style={{ width: `${(completedTasks.length / 4) * 100}%` }}></div>
                                        </div>
                                        <p className="text-[10px] text-right mt-1 font-bold">{completedTasks.length} / 4 Tasks Complete</p>
                                    </div>
                                </div>

                                <button 
                                    onClick={stopSwap}
                                    className="w-full mt-8 py-4 text-xs font-black text-red-500 uppercase tracking-widest hover:bg-red-50 rounded-2xl transition-colors"
                                >
                                    Cancel Exchange
                                </button>
                            </div>

                            <div className="bg-text-primary p-8 rounded-3xl text-white shadow-xl">
                                <h4 className="text-xs font-black uppercase tracking-widest text-white/50 mb-4">Culture Tip</h4>
                                <p className="font-serif italic text-lg leading-relaxed">
                                    "To truly understand a people, you must not only hear their stories but eat their salt and walk their paths."
                                </p>
                            </div>
                        </div>

                        {/* Main Challenge Content */}
                        <div className="lg:col-span-8 flex flex-col gap-6">
                            
                            {/* Theme Header */}
                            <div className="bg-white border-4 border-black rounded-[2.5rem] p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden" 
                                style={{ borderColor: activeSwap.color }}>
                                <div className="relative z-10">
                                    <h3 className="text-4xl font-serif font-black text-text-primary mb-2">Today's Lifestyle Blueprint</h3>
                                    <p className="text-text-muted">Adopt these elements of {activeSwap.name}'s life to earn your <span className="font-bold text-text-primary">Cultural Empathy badge</span>.</p>
                                </div>
                                <div className="absolute -top-10 -right-10 w-40 h-40 opacity-10 font-bold text-9xl pointer-events-none" style={{ color: activeSwap.color }}>
                                    {activeSwap.avatar}
                                </div>
                            </div>

                            {/* Task Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
                                {/* Food Task Card */}
                                <div 
                                    onClick={() => setSelectedTask('food')}
                                    className="group relative bg-white border border-black/5 rounded-[3rem] p-1 shadow-xl hover:shadow-2xl transition-all cursor-pointer overflow-hidden aspect-[4/5] md:aspect-auto h-[450px]"
                                >
                                     <div className="absolute inset-2 rounded-[2.5rem] bg-gray-100 overflow-hidden">
                                        <img src={activeSwap.foodImage} alt={activeSwap.food} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10"></div>
                                        
                                        <div className="absolute bottom-8 left-8 right-8 z-20">
                                            <div className="flex items-center gap-3 mb-4">
                                                <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-xl text-white">🥘</div>
                                                <h4 className="text-[10px] font-black uppercase tracking-[.4em] text-white/70">Culinary Oath</h4>
                                            </div>
                                            <h3 className="text-4xl font-serif font-black text-white leading-tight mb-4">{activeSwap.food}</h3>
                                            <div className="flex items-center gap-4">
                                                <span className="px-4 py-2 bg-orange-600 text-white text-[10px] font-black rounded-full uppercase tracking-widest shadow-lg">View Recipe</span>
                                                {completedTasks.includes('food') && <span className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm shadow-lg">✓</span>}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="absolute top-6 right-6 z-30">
                                        <button 
                                            onClick={(e) => { e.stopPropagation(); toggleTask('food'); }}
                                            className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all shadow-xl backdrop-blur-md ${completedTasks.includes('food') ? 'bg-green-500 border-green-400 text-white' : 'bg-white/10 border-white/30 text-white hover:bg-white/20'}`}
                                        >
                                            {completedTasks.includes('food') ? '✓' : ''}
                                        </button>
                                    </div>
                                </div>

                                {/* Ritual Task Card */}
                                <div 
                                    onClick={() => setSelectedTask('ritual')}
                                    className="group relative bg-white border border-black/5 rounded-[3rem] p-1 shadow-xl hover:shadow-2xl transition-all cursor-pointer overflow-hidden aspect-[4/5] md:aspect-auto h-[450px]"
                                >
                                     <div className="absolute inset-2 rounded-[2.5rem] bg-gray-100 overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10"></div>
                                        <div className="absolute inset-0 flex items-center justify-center text-[10rem] opacity-20 filter grayscale">⚡</div>
                                        
                                        <div className="absolute bottom-8 left-8 right-8 z-20">
                                            <div className="flex items-center gap-3 mb-4">
                                                <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-xl text-white">⚡</div>
                                                <h4 className="text-[10px] font-black uppercase tracking-[.4em] text-white/70">Ritual Mirror</h4>
                                            </div>
                                            <h3 className="text-4xl font-serif font-black text-white leading-tight mb-4">{activeSwap.routine}</h3>
                                            <div className="flex items-center gap-4">
                                                <span className="px-4 py-2 bg-blue-600 text-white text-[10px] font-black rounded-full uppercase tracking-widest shadow-lg">View Ritual</span>
                                                {completedTasks.includes('ritual') && <span className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm shadow-lg">✓</span>}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="absolute top-6 right-6 z-30">
                                        <button 
                                            onClick={(e) => { e.stopPropagation(); toggleTask('ritual'); }}
                                            className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all shadow-xl backdrop-blur-md ${completedTasks.includes('ritual') ? 'bg-green-500 border-green-400 text-white' : 'bg-white/10 border-white/30 text-white hover:bg-white/20'}`}
                                        >
                                            {completedTasks.includes('ritual') ? '✓' : ''}
                                        </button>
                                    </div>
                                </div>

                                {/* Music Task Card */}
                                <div 
                                    onClick={() => setSelectedTask('music')}
                                    className="group relative bg-white border border-black/5 rounded-[3rem] p-1 shadow-xl hover:shadow-2xl transition-all cursor-pointer overflow-hidden aspect-[4/5] md:aspect-auto h-[450px]"
                                >
                                     <div className="absolute inset-2 rounded-[2.5rem] bg-gray-100 overflow-hidden">
                                        <img src={activeSwap.musicImage} alt="Traditional Music" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10"></div>
                                        
                                        <div className="absolute bottom-8 left-8 right-8 z-20">
                                            <div className="flex items-center gap-3 mb-4">
                                                <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-xl text-white">🎵</div>
                                                <h4 className="text-[10px] font-black uppercase tracking-[.4em] text-white/70">Melodic Soul</h4>
                                            </div>
                                            <h3 className="text-4xl font-serif font-black text-white leading-tight mb-4">Ancestral Rhythms</h3>
                                            <div className="flex items-center gap-4">
                                                <span className="px-4 py-2 bg-purple-600 text-white text-[10px] font-black rounded-full uppercase tracking-widest shadow-lg">Listen Now</span>
                                                {completedTasks.includes('music') && <span className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm shadow-lg">✓</span>}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="absolute top-6 right-6 z-30">
                                        <button 
                                            onClick={(e) => { e.stopPropagation(); toggleTask('music'); }}
                                            className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all shadow-xl backdrop-blur-md ${completedTasks.includes('music') ? 'bg-green-500 border-green-400 text-white' : 'bg-white/10 border-white/30 text-white hover:bg-white/20'}`}
                                        >
                                            {completedTasks.includes('music') ? '✓' : ''}
                                        </button>
                                    </div>
                                </div>

                                {/* Language Task Card */}
                                <div 
                                    onClick={() => setSelectedTask('language')}
                                    className="group relative bg-white border border-black/5 rounded-[3rem] p-1 shadow-xl hover:shadow-2xl transition-all cursor-pointer overflow-hidden aspect-[4/5] md:aspect-auto h-[450px]"
                                >
                                     <div className="absolute inset-2 rounded-[2.5rem] bg-gray-100 overflow-hidden">
                                        <img src={activeSwap.languageImage} alt="Cultural Script" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10"></div>
                                        
                                        <div className="absolute bottom-8 left-8 right-8 z-20">
                                            <div className="flex items-center gap-3 mb-4">
                                                <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-xl text-white">🗣️</div>
                                                <h4 className="text-[10px] font-black uppercase tracking-[.4em] text-white/70">Oral Heritage</h4>
                                            </div>
                                            <h3 className="text-4xl font-serif font-black text-white leading-tight mb-4">Speak 3 Words</h3>
                                            <div className="flex items-center gap-4">
                                                <span className="px-4 py-2 bg-teal-600 text-white text-[10px] font-black rounded-full uppercase tracking-widest shadow-lg">Learn Words</span>
                                                {completedTasks.includes('language') && <span className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm shadow-lg">✓</span>}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="absolute top-6 right-6 z-30">
                                        <button 
                                            onClick={(e) => { e.stopPropagation(); toggleTask('language'); }}
                                            className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all shadow-xl backdrop-blur-md ${completedTasks.includes('language') ? 'bg-green-500 border-green-400 text-white' : 'bg-white/10 border-white/30 text-white hover:bg-white/20'}`}
                                        >
                                            {completedTasks.includes('language') ? '✓' : ''}
                                        </button>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                )}
            </div>
            
            {/* Custom Styles for Animations */}
            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes scale-up {
                    0% { transform: scale(0.9); opacity: 0; }
                    100% { transform: scale(1); opacity: 1; }
                }
                .animate-scale-up {
                    animation: scale-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
                @keyframes handshake {
                    0% { transform: rotate(0) translateY(0); }
                    10% { transform: rotate(-10deg) translateY(-5px); }
                    20% { transform: rotate(10deg) translateY(5px); }
                    30% { transform: rotate(-10deg) translateY(-5px); }
                    40% { transform: rotate(10deg) translateY(5px); }
                    50% { transform: rotate(0) translateY(0); }
                    100% { transform: rotate(0) translateY(0); }
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
                    animation: spin-slow 8s linear infinite;
                }
                @keyframes fade-in {
                    0% { opacity: 0; transform: translateY(10px); }
                    100% { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fade-in 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
                @keyframes scale-up-long {
                    0% { transform: scale(0.95); opacity: 0; }
                    100% { transform: scale(1); opacity: 1; }
                }
                .animate-scale-up-long {
                    animation: scale-up-long 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
            `}} />
        </div>
    );
};

export default CultureSwap;

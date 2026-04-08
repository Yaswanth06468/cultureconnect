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
                    <div className="rounded-xl overflow-hidden shadow-md border border-black/5 mb-6 h-64 bg-[#faf7f2] relative group">
                         <img src={activeSwap.foodImage} alt={activeSwap.food} className="w-full h-full object-cover" />
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
                'Set aside dedicated time',
                'Create a quiet environment',
                'Connect with the cultural intent'
            ],
            content: (
                <div className="space-y-6 text-center">
                     <div className="rounded-xl overflow-hidden shadow-md border border-black/5 mb-8 h-48 bg-blue-50/30 flex items-center justify-center">
                         <span className="text-6xl">⚡</span>
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
                'Listen to the pronunciation',
                'Practice speaking aloud',
                'Record or memorize for sharing'
            ],
            content: (
                <div className="space-y-8">
                    <div className="rounded-xl overflow-hidden shadow-md border border-black/5 h-48 mb-8 relative">
                        <img src={activeSwap.languageImage} alt="Cultural Script" className="w-full h-full object-cover" />
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
                <div className="bg-[#faf7f2] p-8 rounded-xl border border-[#f0ece6] mb-10">
                    <h5 className="text-[10px] font-bold uppercase tracking-widest text-[#8b6f5e] mb-4">Task Requirements</h5>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {taskData.requirements.map((req, i) => (
                            <div key={i} className="flex items-center gap-3 bg-white p-4 rounded-lg border border-[#f0ece6] shadow-sm">
                                <span className={`text-${taskData.color}-600 font-bold text-xs`}>✓</span>
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
            words: [
                { word: 'Khamma Ghani', translation: 'Hello', image: 'https://images.unsplash.com/photo-1598891001556-37bc237336ed?q=80&w=2070&auto=format&fit=crop' },
                { word: 'Padharo', translation: 'Welcome', image: 'https://images.unsplash.com/photo-1583037189850-1921ae7c6c22?q=80&w=1975&auto=format&fit=crop' },
                { word: 'Dhanyavad', translation: 'Thank you', image: 'https://images.unsplash.com/photo-1545663731-07316fc108eb?q=80&w=2070&auto=format&fit=crop' }
            ],
            languageSignificance: 'Marwari is a language of extreme hospitality. A greeting is often a blessing, and a "Welcome" is and invitation into one\'s soul.',
            color: '#e67300',
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
            words: [
                { word: 'Ohayo', translation: 'Good Morning', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2070&auto=format&fit=crop' },
                { word: 'Itadakimasu', translation: 'Let\'s eat', image: 'https://images.unsplash.com/photo-1582450871972-ed3ec38f2a40?q=80&w=2070&auto=format&fit=crop' },
                { word: 'Arigato', translation: 'Thank you', image: 'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?q=80&w=2070&auto=format&fit=crop' }
            ],
            languageSignificance: 'Japanese greetings reflect deep mindfulness. "Itadakimasu" is a sacred acknowledgment of all the lives that contributed to your meal.',
            color: '#bc002d',
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
            words: [
                { word: 'Hola', translation: 'Hello', image: 'https://images.unsplash.com/photo-1518112166137-856914902aa7?q=80&w=1935&auto=format&fit=crop' },
                { word: 'Provecho', translation: 'Enjoy your meal', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1981&auto=format&fit=crop' },
                { word: 'Gracias', translation: 'Thank you', image: 'https://images.unsplash.com/photo-1528605105345-5344ea20e269?q=80&w=2070&auto=format&fit=crop' }
            ],
            languageSignificance: 'In Mexico, food and speech are communal. "Provecho" is a ubiquitous blessing shared even with strangers at the next table.',
            color: '#006341',
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
            words: [
                { word: 'Salam', translation: 'Peace/Hello', image: 'https://images.unsplash.com/photo-1528431835564-927364ca1076?q=80&w=2071&auto=format&fit=crop' },
                { word: 'Bismillah', translation: 'In the name of God', image: 'https://images.unsplash.com/photo-1590076214667-cda4475997a9?q=80&w=2069&auto=format&fit=crop' },
                { word: 'Shukran', translation: 'Thank you', image: 'https://images.unsplash.com/photo-1510672981848-a1c4f1cb5ccf?q=80&w=2072&auto=format&fit=crop' }
            ],
            languageSignificance: 'These words form the foundation of Berber hospitality, rooted in peace, spiritual intention, and deep gratitude.',
            color: '#c1272d',
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
        <div className="min-h-screen pt-24 pb-12 px-6 bg-[#fdf8f3] font-sans">
             
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
                        Don't just chat. <span className="text-text-primary font-bold">Exchange lifestyles.</span><br />
                        Live another person's reality for exactly 24 hours.
                    </p>
                </div>

                {!activeSwap ? (
                    <div className="bg-white border border-black/5 rounded-2xl p-10 md:p-16 text-center shadow-lg relative overflow-hidden">
                        <div className="relative z-10">
                             <div className="w-24 h-24 md:w-32 md:h-32 bg-[#faf7f2] rounded-full mx-auto mb-8 flex items-center justify-center text-5xl border border-[#f0ece6] shadow-sm">
                                <span className={!isMatching ? 'animate-handshake' : 'animate-spin-slow'}>
                                    {isMatching ? '🌍' : '🤝'}
                                </span>
                            </div>
                            
                            <h2 className="text-3xl font-serif font-medium text-text-primary mb-4">Ready to walk in someone else's shoes?</h2>
                            <p className="text-text-secondary mb-10 max-w-lg mx-auto leading-relaxed font-light">
                                Our community matching system will connect you with a partner from a different culture. You'll swap food recipes, daily rituals, and language for one day.
                            </p>

                            <button
                                onClick={startMatch}
                                disabled={isMatching}
                                className={`px-10 py-4 rounded-lg font-bold text-base transition-all duration-300 transform active:scale-95 shadow-md
                                    ${isMatching ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-text-primary text-white hover:bg-[#111]'}`}
                            >
                                {isMatching ? 'Finding Partner...' : 'Launch Lifestyle Swap'}
                            </button>
                        </div>

                        {/* Feature Badges */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 text-left border-t border-black/5 pt-10">
                            <div className="flex gap-4">
                                <div className="w-10 h-10 rounded-lg bg-accent-gold/5 flex items-center justify-center text-xl">🥘</div>
                                <div>
                                    <h4 className="font-bold text-text-primary text-sm uppercase tracking-wider">Culinary Swap</h4>
                                    <p className="text-xs text-text-secondary font-light">Cook exactly what they eat today.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-10 h-10 rounded-lg bg-accent-blue/5 flex items-center justify-center text-xl">⚡</div>
                                <div>
                                    <h4 className="font-bold text-text-primary text-sm uppercase tracking-wider">Ritual Mirror</h4>
                                    <p className="text-xs text-text-secondary font-light">Adopt their daily routine.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-10 h-10 rounded-lg bg-accent-teal/5 flex items-center justify-center text-xl">🗣️</div>
                                <div>
                                    <h4 className="font-bold text-text-primary text-sm uppercase tracking-wider">Voice Gift</h4>
                                    <p className="text-xs text-text-secondary font-light">Learn 3 sacred words of their heritage.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                        
                        {/* Live Status Sidebar */}
                        <div className="lg:col-span-4 flex flex-col gap-6">
                            <div className="bg-white border border-black/5 rounded-2xl p-8 shadow-md">
                                <div className="flex items-center justify-between mb-8">
                                    <span className="px-3 py-1 bg-green-50 text-green-700 text-[10px] font-bold rounded-full uppercase tracking-widest border border-green-100">Live Exchange</span>
                                    <div className="text-lg font-mono font-bold text-[#8b6f5e]">{formatTime(timeLeft)}</div>
                                </div>
                                
                                <div className="text-center mb-8 pb-8 border-b border-black/5">
                                    <div className="w-20 h-20 rounded-full bg-[#fdf8f3] mx-auto mb-4 flex items-center justify-center text-4xl border border-[#ede3d8] shadow-sm">
                                        {activeSwap.avatar}
                                    </div>
                                    <h2 className="text-2xl font-serif font-medium text-text-primary leading-tight">Swapping with {activeSwap.name}</h2>
                                    <p className="text-sm font-bold text-accent-terra uppercase tracking-wider mt-1">{activeSwap.culture}</p>
                                    <p className="text-xs text-text-secondary mt-2 flex items-center justify-center gap-1 font-light italic">
                                        <span>📍</span> {activeSwap.location}
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    <div className="p-5 bg-[#faf7f2] rounded-xl border border-[#f0ece6]">
                                        <h4 className="text-xs font-bold text-[#8b6f5e] uppercase tracking-widest mb-3">Challenge Progress</h4>
                                        <div className="w-full h-1.5 bg-[#ede3d8] rounded-full overflow-hidden">
                                            <div className="h-full bg-accent-terra transition-all duration-500" style={{ width: `${(completedTasks.length / 3) * 100}%` }}></div>
                                        </div>
                                        <p className="text-[10px] text-right mt-2 font-bold text-text-secondary">{completedTasks.length} / 3 Tasks Complete</p>
                                    </div>
                                </div>

                                <button 
                                    onClick={stopSwap}
                                    className="w-full mt-8 py-3 text-[10px] font-bold text-red-600 uppercase tracking-[0.2em] border border-red-50 rounded-xl hover:bg-red-50 transition-colors"
                                >
                                    Cancel Exchange
                                </button>
                            </div>

                            <div className="bg-[#4a2c2a] p-8 rounded-2xl text-white shadow-lg relative overflow-hidden">
                                <div className="relative z-10">
                                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#f5d0a9] mb-4">Culture Tip</h4>
                                    <p className="font-serif italic text-lg leading-relaxed font-light opacity-90">
                                        "To truly understand a people, you must not only hear their stories but eat their salt and walk their paths."
                                    </p>
                                </div>
                                <div className="absolute -bottom-4 -right-4 text-8xl opacity-10 pointer-events-none">✨</div>
                            </div>
                        </div>

                        {/* Main Challenge Content */}
                        <div className="lg:col-span-8 flex flex-col gap-6">
                            
                            {/* Theme Header */}
                            <div className="bg-white border border-[#8b6f5e]/20 rounded-2xl p-10 shadow-sm relative overflow-hidden">
                                <div className="relative z-10">
                                    <span className="text-accent-terra uppercase tracking-widest text-[10px] font-bold mb-2 block">Current Assignment</span>
                                    <h3 className="text-3xl font-serif font-medium text-text-primary mb-2">Today's Lifestyle Blueprint</h3>
                                    <p className="text-text-secondary font-light text-sm">Adopt these elements of {activeSwap.name}'s life to earn your Cultural Empathy badge.</p>
                                </div>
                            </div>

                            {/* Task Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Food Task Card */}
                                <div 
                                    onClick={() => setSelectedTask('food')}
                                    className="group relative bg-white border border-[#f0f0f0] rounded-2xl p-2 shadow-md hover:shadow-lg transition-all cursor-pointer h-[400px]"
                                >
                                     <div className="absolute inset-2 rounded-xl bg-[#faf7f2] overflow-hidden">
                                        <img src={activeSwap.foodImage} alt={activeSwap.food} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10"></div>
                                        
                                        <div className="absolute bottom-6 left-6 right-6 z-20">
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="text-xs">🥘</span>
                                                <h4 className="text-[10px] font-bold uppercase tracking-widest text-white/80">Culinary Oath</h4>
                                            </div>
                                            <h3 className="text-2xl font-serif font-medium text-white mb-4">{activeSwap.food}</h3>
                                            <div className="flex items-center justify-between">
                                                <span className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-[10px] font-bold rounded-full uppercase tracking-widest">Open Recipe</span>
                                                {completedTasks.includes('food') && <span className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs shadow-lg">✓</span>}
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
                                    className="group relative bg-white border border-[#f0f0f0] rounded-2xl p-2 shadow-md hover:shadow-lg transition-all cursor-pointer h-[400px]"
                                >
                                     <div className="absolute inset-2 rounded-xl bg-[#faf7f2] overflow-hidden">
                                        <div className="absolute inset-0 bg-[#4a2c2a] opacity-5"></div>
                                        <div className="absolute inset-0 flex items-center justify-center text-[12rem] text-black/5">⚡</div>
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent z-10"></div>
                                        
                                        <div className="absolute bottom-6 left-6 right-6 z-20">
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="text-xs">⚡</span>
                                                <h4 className="text-[10px] font-bold uppercase tracking-widest text-white/80">Ritual Mirror</h4>
                                            </div>
                                            <h3 className="text-2xl font-serif font-medium text-white mb-4">{activeSwap.routine}</h3>
                                            <div className="flex items-center justify-between">
                                                <span className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-[10px] font-bold rounded-full uppercase tracking-widest">Show Ritual</span>
                                                {completedTasks.includes('ritual') && <span className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs shadow-lg">✓</span>}
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
                                    className="group relative bg-white border border-[#f0f0f0] rounded-2xl p-2 shadow-md hover:shadow-lg transition-all cursor-pointer h-[400px]"
                                >
                                     <div className="absolute inset-2 rounded-xl bg-[#faf7f2] overflow-hidden">
                                        <img src={activeSwap.languageImage} alt="Cultural Script" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10"></div>
                                        
                                        <div className="absolute bottom-6 left-6 right-6 z-20">
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="text-xs">🗣️</span>
                                                <h4 className="text-[10px] font-bold uppercase tracking-widest text-white/80">Oral Heritage</h4>
                                            </div>
                                            <h3 className="text-2xl font-serif font-medium text-white mb-4">Speak 3 Words</h3>
                                            <div className="flex items-center justify-between">
                                                <span className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-[10px] font-bold rounded-full uppercase tracking-widest">Practice</span>
                                                {completedTasks.includes('language') && <span className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs shadow-lg">✓</span>}
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
            `}} />
        </div>
    );
};

export default CultureSwap;

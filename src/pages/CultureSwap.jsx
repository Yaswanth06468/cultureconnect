import { useState, useEffect, useRef } from 'react';
import { API_BASE_URL } from '../config';

const TaskDetailModal = ({ task, activeSwap, onClose, completedTasks, toggleTask, playWord }) => {
    const [checkedReqs, setCheckedReqs] = useState([]);

    useEffect(() => {
        setCheckedReqs([]);
    }, [task]);

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
                            <div className="flex flex-col gap-2">
                                {(activeSwap.ingredients || []).map((ing, i) => (
                                    <div key={i} className="flex items-center gap-3 p-3 bg-white text-orange-900 text-sm font-medium rounded-lg border border-orange-100 shadow-sm">
                                        <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                                        {ing}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h5 className="text-[10px] font-bold uppercase tracking-widest text-orange-700 mb-4 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-orange-700"></span> The Process
                            </h5>
                            <p className="text-base text-gray-800 leading-relaxed bg-white p-6 rounded-xl border border-orange-100 shadow-sm font-medium">
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
            subtitle: 'Speak 3-4 Words',
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
                        {(activeSwap.words || []).map((wordObj, idx) => (
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
            <div className="relative w-full max-w-4xl rounded-2xl p-8 md:p-12 shadow-xl border animate-scale-up-long my-auto overflow-hidden theme-transition" style={{ backgroundColor: 'var(--theme-card-bg)', borderColor: 'var(--theme-border)' }}>
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
                        {taskData.requirements.map((req, i) => {
                            const isChecked = checkedReqs.includes(i);
                            return (
                                <div 
                                    key={i} 
                                    onClick={() => {
                                        setCheckedReqs(prev => {
                                            const next = prev.includes(i) ? prev.filter(idx => idx !== i) : [...prev, i];
                                            if (next.length === taskData.requirements.length && !completedTasks.includes(task)) {
                                                toggleTask(task);
                                            }
                                            return next;
                                        });
                                    }}
                                    className={`flex flex-col gap-4 bg-white p-6 rounded-2xl border transition-all duration-300 cursor-pointer group hover:-translate-y-1 ${isChecked ? 'border-green-500 shadow-lg ring-2 ring-green-500/20' : 'border-[#f0ece6] shadow-sm hover:shadow-md'}`}
                                >
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg border transition-transform duration-300 ${isChecked ? 'bg-green-500 text-white border-green-600 scale-110' : `bg-${taskData.color}-50 border-${taskData.color}-100/50 group-hover:scale-110`}`}>
                                        {isChecked ? '✓' : (typeof req === 'object' ? req.icon : '✓')}
                                    </div>
                                    <span className={`text-xs font-bold leading-relaxed uppercase tracking-wider transition-colors ${isChecked ? 'text-green-700 opacity-100' : 'text-text-primary opacity-80'}`}>
                                        {typeof req === 'object' ? req.text : req}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="text-center">
                     <button 
                        onClick={() => {
                            if (!completedTasks.includes(task)) toggleTask(task);
                            onClose();
                        }}
                        className={`px-10 py-4 font-bold rounded-lg transition-colors shadow-lg flex items-center gap-3 mx-auto ${completedTasks.includes(task) ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-text-primary text-inverse hover:bg-bg-accent'}`}
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

const LiveSessionModal = ({ activeSwap, onClose, cleanName }) => {
    const localVideoRef = useRef(null);
    const [stream, setStream] = useState(null);
    const [isMuted, setIsMuted] = useState(false);
    const [isVideoOff, setIsVideoOff] = useState(false);
    const [callDuration, setCallDuration] = useState(0);
    const [chatMessages, setChatMessages] = useState([]);
    const [chatInput, setChatInput] = useState('');
    const [isConnecting, setIsConnecting] = useState(true);
    const [showChat, setShowChat] = useState(false);
    const chatEndRef = useRef(null);

    // Auto-greet messages from partner
    const partnerGreetings = [
        `Namaste! Welcome to our live session! 🙏`,
        `I'm so excited to share my culture with you today!`,
        `Feel free to ask me anything about ${activeSwap?.culture || 'my culture'}!`,
    ];

    useEffect(() => {
        const startCamera = async () => {
            try {
                const mediaStream = await navigator.mediaDevices.getUserMedia({ 
                    video: { width: 1280, height: 720, facingMode: 'user' }, 
                    audio: true 
                });
                setStream(mediaStream);
                if (localVideoRef.current) {
                    localVideoRef.current.srcObject = mediaStream;
                }
                // Simulate connection delay
                setTimeout(() => setIsConnecting(false), 2500);
            } catch (err) {
                console.error('Camera access denied:', err);
                setIsConnecting(false);
            }
        };
        startCamera();

        return () => {
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
        };
    }, []);

    // Update video srcObject when stream changes
    useEffect(() => {
        if (localVideoRef.current && stream) {
            localVideoRef.current.srcObject = stream;
        }
    }, [stream]);

    // Call duration timer
    useEffect(() => {
        if (!isConnecting) {
            const timer = setInterval(() => setCallDuration(prev => prev + 1), 1000);
            return () => clearInterval(timer);
        }
    }, [isConnecting]);

    // Auto partner messages
    useEffect(() => {
        if (!isConnecting) {
            partnerGreetings.forEach((msg, i) => {
                setTimeout(() => {
                    setChatMessages(prev => [...prev, { 
                        id: Date.now() + i, 
                        sender: 'partner', 
                        text: msg, 
                        time: new Date() 
                    }]);
                }, (i + 1) * 3000);
            });
        }
    }, [isConnecting]);

    // Auto-scroll chat
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chatMessages]);

    const formatCallTime = (s) => {
        const m = Math.floor(s / 60);
        const sec = s % 60;
        return `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
    };

    const toggleMute = () => {
        if (stream) {
            stream.getAudioTracks().forEach(track => { track.enabled = !track.enabled; });
            setIsMuted(!isMuted);
        }
    };

    const toggleVideo = () => {
        if (stream) {
            stream.getVideoTracks().forEach(track => { track.enabled = !track.enabled; });
            setIsVideoOff(!isVideoOff);
        }
    };

    const endCall = () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
        }
        onClose();
    };

    const sendChat = (e) => {
        e.preventDefault();
        if (!chatInput.trim()) return;
        setChatMessages(prev => [...prev, { 
            id: Date.now(), 
            sender: 'you', 
            text: chatInput.trim(), 
            time: new Date() 
        }]);
        setChatInput('');

        // Simulate partner reply
        const replies = [
            'That\'s a wonderful question! Let me show you...',
            'Yes! This is very important in our culture.',
            'I love sharing this with you! 😊',
            'We do this every day, it brings us closer to our roots.',
            'The secret is passed down through generations!',
            'Would you like to try it yourself?',
        ];
        setTimeout(() => {
            setChatMessages(prev => [...prev, {
                id: Date.now(),
                sender: 'partner',
                text: replies[Math.floor(Math.random() * replies.length)],
                time: new Date()
            }]);
        }, 1500 + Math.random() * 2000);
    };

    if (!activeSwap) return null;

    return (
        <div className="fixed inset-0 z-[200] bg-[#0a0a0a] flex">
            {/* Connecting Overlay */}
            {isConnecting && (
                <div className="absolute inset-0 z-50 bg-[#0a0a0a] flex flex-col items-center justify-center gap-8">
                    <div className="w-28 h-28 rounded-full bg-white/5 flex items-center justify-center text-6xl border border-white/10 animate-pulse">
                        {activeSwap.avatar}
                    </div>
                    <div className="text-center">
                        <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.4em] mb-3">Connecting to</p>
                        <h3 className="text-3xl font-serif text-white font-medium mb-2">{cleanName(activeSwap.name)}</h3>
                        <p className="text-white/30 text-sm font-light">{activeSwap.culture}</p>
                    </div>
                    <div className="flex gap-2 mt-4">
                        <div className="w-2 h-2 rounded-full bg-accent-terra animate-bounce" style={{ animationDelay: '0s' }}></div>
                        <div className="w-2 h-2 rounded-full bg-accent-terra animate-bounce" style={{ animationDelay: '0.15s' }}></div>
                        <div className="w-2 h-2 rounded-full bg-accent-terra animate-bounce" style={{ animationDelay: '0.3s' }}></div>
                    </div>
                </div>
            )}

            {/* Main Video Area */}
            <div className={`flex-1 relative transition-all duration-500 ${showChat ? 'mr-[380px]' : ''}`}>
                {/* Partner Video (Simulated) */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#1a1520] via-[#0f1923] to-[#0a0a0a] flex items-center justify-center">
                    <div className="text-center">
                        <div className="w-36 h-36 rounded-full bg-white/5 mx-auto mb-8 flex items-center justify-center text-7xl border-2 border-white/10 shadow-[0_0_60px_rgba(255,255,255,0.05)]">
                            {activeSwap.avatar}
                        </div>
                        <h3 className="text-2xl font-serif text-white font-medium mb-1">{cleanName(activeSwap.name)}</h3>
                        <p className="text-white/30 text-xs font-bold uppercase tracking-[0.3em] mb-6">{activeSwap.culture} · {activeSwap.location}</p>
                        <div className="flex items-center justify-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                            <span className="text-green-400 text-[10px] font-bold uppercase tracking-widest">Connected</span>
                        </div>
                    </div>
                    {/* Ambient decorative elements */}
                    <div className="absolute top-10 left-10 w-64 h-64 bg-accent-terra/5 rounded-full blur-[100px]"></div>
                    <div className="absolute bottom-10 right-10 w-48 h-48 bg-accent-teal/5 rounded-full blur-[80px]"></div>
                </div>

                {/* Local Video (Your Camera) */}
                <div className="absolute bottom-28 right-6 w-[280px] h-[200px] rounded-2xl overflow-hidden shadow-2xl border-2 border-white/10 bg-black group hover:w-[340px] hover:h-[240px] transition-all duration-500 z-20">
                    {!isVideoOff ? (
                        <video 
                            ref={localVideoRef} 
                            autoPlay 
                            playsInline 
                            muted 
                            className="w-full h-full object-cover mirror-video"
                        />
                    ) : (
                        <div className="w-full h-full bg-[#1a1a1a] flex items-center justify-center">
                            <div className="text-center">
                                <div className="text-4xl mb-2">📷</div>
                                <p className="text-white/30 text-[10px] font-bold uppercase tracking-widest">Camera Off</p>
                            </div>
                        </div>
                    )}
                    <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full">
                        <p className="text-white text-[9px] font-bold uppercase tracking-widest">You</p>
                    </div>
                    {isMuted && (
                        <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-red-500/80 flex items-center justify-center">
                            <span className="text-white text-xs">🔇</span>
                        </div>
                    )}
                </div>

                {/* Top Bar */}
                <div className="absolute top-0 left-0 right-0 p-6 flex items-center justify-between z-30 bg-gradient-to-b from-black/60 to-transparent">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 bg-red-500/20 backdrop-blur-md px-4 py-2 rounded-full border border-red-500/30">
                            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                            <span className="text-red-400 text-[10px] font-bold uppercase tracking-widest">Live</span>
                        </div>
                        <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full">
                            <span className="text-white/80 text-sm font-mono font-bold tabular-nums">{formatCallTime(callDuration)}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-white/40 text-[10px] font-bold uppercase tracking-widest">Free Cultural Exchange</span>
                    </div>
                </div>

                {/* Bottom Controls */}
                <div className="absolute bottom-0 left-0 right-0 p-8 flex items-center justify-center gap-4 z-30 bg-gradient-to-t from-black/80 to-transparent">
                    <button 
                        onClick={toggleMute}
                        className={`w-14 h-14 rounded-full flex items-center justify-center transition-all text-xl shadow-lg ${isMuted ? 'bg-red-500 text-white scale-110' : 'bg-white/15 backdrop-blur-md text-white hover:bg-white/25 border border-white/10'}`}
                        title={isMuted ? 'Unmute' : 'Mute'}
                    >
                        {isMuted ? '🔇' : '🎤'}
                    </button>
                    <button 
                        onClick={toggleVideo}
                        className={`w-14 h-14 rounded-full flex items-center justify-center transition-all text-xl shadow-lg ${isVideoOff ? 'bg-red-500 text-white scale-110' : 'bg-white/15 backdrop-blur-md text-white hover:bg-white/25 border border-white/10'}`}
                        title={isVideoOff ? 'Turn on camera' : 'Turn off camera'}
                    >
                        {isVideoOff ? '📷' : '🎥'}
                    </button>
                    <button 
                        onClick={() => setShowChat(!showChat)}
                        className={`w-14 h-14 rounded-full flex items-center justify-center transition-all text-xl shadow-lg ${showChat ? 'bg-accent-terra text-white scale-110' : 'bg-white/15 backdrop-blur-md text-white hover:bg-white/25 border border-white/10'}`}
                        title="Toggle Chat"
                    >
                        💬
                    </button>
                    <div className="w-px h-8 bg-white/10 mx-2"></div>
                    <button 
                        onClick={endCall}
                        className="w-16 h-14 rounded-full bg-red-600 hover:bg-red-700 flex items-center justify-center transition-all text-xl shadow-lg hover:scale-110 border border-red-500"
                        title="End Call"
                    >
                        📞
                    </button>
                </div>
            </div>

            {/* Chat Panel */}
            <div className={`fixed top-0 right-0 h-full w-[380px] bg-[#111318] border-l border-white/5 flex flex-col transition-transform duration-500 z-40 ${showChat ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="p-6 border-b border-white/5">
                    <div className="flex items-center justify-between">
                        <div>
                            <h4 className="text-white font-serif text-lg font-medium">Live Chat</h4>
                            <p className="text-white/30 text-[10px] font-bold uppercase tracking-widest mt-1">with {cleanName(activeSwap.name)}</p>
                        </div>
                        <button onClick={() => setShowChat(false)} className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/40 hover:text-white transition-all text-sm">✕</button>
                    </div>
                </div>
                
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {chatMessages.length === 0 && (
                        <div className="text-center py-12">
                            <div className="text-4xl mb-4">💬</div>
                            <p className="text-white/20 text-sm font-light">Start a conversation about their culture!</p>
                        </div>
                    )}
                    {chatMessages.map((msg) => (
                        <div key={msg.id} className={`flex ${msg.sender === 'you' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${msg.sender === 'you' 
                                ? 'bg-accent-terra/80 text-white rounded-br-md' 
                                : 'bg-white/5 text-white/80 rounded-bl-md border border-white/5'}`}
                            >
                                <p className="text-sm font-light leading-relaxed">{msg.text}</p>
                                <p className="text-[8px] mt-1.5 opacity-40 font-bold uppercase tracking-widest">
                                    {msg.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </p>
                            </div>
                        </div>
                    ))}
                    <div ref={chatEndRef} />
                </div>

                <form onSubmit={sendChat} className="p-4 border-t border-white/5">
                    <div className="flex items-center gap-3">
                        <input
                            type="text"
                            value={chatInput}
                            onChange={(e) => setChatInput(e.target.value)}
                            placeholder="Ask about their culture..."
                            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-accent-terra/50 focus:ring-1 focus:ring-accent-terra/20 transition-all"
                        />
                        <button 
                            type="submit"
                            className="w-11 h-11 rounded-xl bg-accent-terra hover:bg-accent-terra/80 flex items-center justify-center text-white transition-all shadow-lg"
                        >
                            ➤
                        </button>
                    </div>
                </form>
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
    const [showNotification, setShowNotification] = useState('');

    const [partners, setPartners] = useState([]);
    const [savedLearnings, setSavedLearnings] = useState(() => {
        try {
            const stored = localStorage.getItem('cultureSwapLearnings');
            return stored ? JSON.parse(stored) : [];
        } catch (e) { return []; }
    });
    const [currentNote, setCurrentNote] = useState('');
    const [showSavePrompt, setShowSavePrompt] = useState(false);
    const [seenPartnerIds, setSeenPartnerIds] = useState(() => {
        try {
            const stored = localStorage.getItem('cultureSwapSeenIds');
            return stored ? JSON.parse(stored) : [];
        } catch (e) { return []; }
    });
    const [showLiveSession, setShowLiveSession] = useState(false);

    useEffect(() => {
        localStorage.setItem('cultureSwapLearnings', JSON.stringify(savedLearnings));
    }, [savedLearnings]);

    useEffect(() => {
        localStorage.setItem('cultureSwapSeenIds', JSON.stringify(seenPartnerIds));
    }, [seenPartnerIds]);

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
            const excludeParam = seenPartnerIds.length > 0 ? `?exclude=${seenPartnerIds.join(',')}` : '';
            let response = await fetch(`${API_BASE_URL}/api/culture-swap/random${excludeParam}`);
            let data = await response.json();
            
            // If all partners exhausted, reset the seen list and try again
            if (data.error && seenPartnerIds.length > 0) {
                setSeenPartnerIds([]);
                response = await fetch(`${API_BASE_URL}/api/culture-swap/random`);
                data = await response.json();
            }
            
            if (data && !data.error) {
                setTimeout(() => {
                    setActiveSwap(data);
                    setIsMatching(false);
                    setCompletedTasks([]);
                    setTimeLeft(24 * 3600);
                    setShowSavePrompt(false);
                    setCurrentNote('');
                    setSeenPartnerIds(prev => [...prev, data._id]);
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
        setCompletedTasks(prev => {
            const isCompleting = !prev.includes(taskId);
            const next = isCompleting ? [...prev, taskId] : prev.filter(id => id !== taskId);
            
            if (isCompleting) {
                if (next.length === 4) {
                    setShowNotification('Congratulations! You have successfully completed all the tasks! 🎊');
                } else {
                    setShowNotification(`Congratulations! You have successfully completed the ${taskId} task! 🌟`);
                }
                setTimeout(() => setShowNotification(''), 4000);
            }
            return next;
        });
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

    const cleanName = (name) => name ? name.replace(/\d+$/g, '').trim() : name;

    const saveLearning = () => {
        if (!currentNote.trim() || !activeSwap) return;
        const newLearning = {
            id: Date.now(),
            name: cleanName(activeSwap.name),
            culture: activeSwap.culture,
            avatar: activeSwap.avatar,
            food: activeSwap.food,
            routine: activeSwap.routine,
            note: currentNote.trim(),
            timestamp: new Date().toISOString(),
            tasksCompleted: completedTasks.length
        };
        setSavedLearnings(prev => [newLearning, ...prev]);
        setCurrentNote('');
        setShowSavePrompt(false);
        setShowNotification('Learning saved to your Cultural Journal! 📝');
        setTimeout(() => setShowNotification(''), 4000);
    };

    const deleteLearning = (id) => {
        setSavedLearnings(prev => prev.filter(l => l.id !== id));
    };

    return (
        <div className="min-h-screen pt-24 pb-12 px-6 theme-transition" style={{ backgroundColor: 'var(--theme-bg-primary)' }}>
             {/* Notification Banner */}
             {showNotification && (
                 <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-[150] animate-slide-up">
                     <div className="bg-green-600 text-white px-8 py-4 rounded-full shadow-2xl font-bold flex items-center gap-3 border-2 border-green-400">
                         <span className="text-2xl">🎉</span>
                         {showNotification}
                     </div>
                 </div>
             )}

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

             {/* Render Live Session Modal */}
             {showLiveSession && activeSwap && (
                <LiveSessionModal 
                    activeSwap={activeSwap} 
                    onClose={() => setShowLiveSession(false)} 
                    cleanName={cleanName}
                />
             )}

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
                        <div className="border rounded-[2rem] p-10 md:p-20 text-center shadow-lg relative overflow-hidden group theme-transition" style={{ backgroundColor: 'var(--theme-card-bg)', borderColor: 'var(--theme-border)' }}>
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
                                        ${isMatching ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-text-primary text-inverse hover:shadow-2xl hover:-translate-y-1'}`}
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
                                    <h2 className="text-3xl font-serif font-medium text-text-primary leading-tight mb-2">{cleanName(activeSwap.name)}</h2>
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
                                    onClick={startMatch}
                                    disabled={isMatching}
                                    className="w-full mt-10 py-4 text-[10px] font-bold text-accent-terra uppercase tracking-[0.3em] bg-accent-terra/10 rounded-2xl hover:bg-accent-terra/20 transition-all border border-accent-terra/30"
                                >
                                    {isMatching ? 'Finding Partner...' : 'Swap with another person 🔄'}
                                </button>

                                <button 
                                    onClick={() => setShowLiveSession(true)}
                                    className="w-full mt-3 py-4 text-[10px] font-bold text-white uppercase tracking-[0.3em] bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg hover:shadow-green-500/20 flex items-center justify-center gap-3 group"
                                >
                                    <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse group-hover:bg-green-200"></span>
                                    Go Live with {cleanName(activeSwap.name)} 🎥
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
                                    <p className="text-text-secondary font-light text-base leading-relaxed max-w-lg">Adopt these essential elements of <span className="text-text-primary font-medium">{cleanName(activeSwap.name)}'s</span> world to bridge the cultural distance.</p>
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

                            {/* Save Learnings Prompt */}
                            <div className="bg-white border border-black/5 rounded-[2rem] p-8 shadow-sm relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-1 h-full bg-amber-400 opacity-20"></div>
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-xl border border-amber-100">📝</div>
                                        <div>
                                            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-700">Cultural Journal</h4>
                                            <p className="text-sm text-text-secondary font-light">Record what you learned from this swap</p>
                                        </div>
                                    </div>
                                    {!showSavePrompt && (
                                        <button
                                            onClick={() => setShowSavePrompt(true)}
                                            className="px-6 py-2.5 bg-amber-50 text-amber-800 text-[10px] font-bold rounded-full uppercase tracking-widest hover:bg-amber-100 transition-all border border-amber-200"
                                        >
                                            Write Note
                                        </button>
                                    )}
                                </div>
                                
                                {showSavePrompt && (
                                    <div className="animate-fade-in">
                                        <textarea
                                            value={currentNote}
                                            onChange={(e) => setCurrentNote(e.target.value)}
                                            placeholder={`What did you learn from ${cleanName(activeSwap.name)}? Write about the food, rituals, language, or anything that inspired you...`}
                                            className="w-full h-32 p-4 bg-[#faf7f2] border border-[#f0ece6] rounded-xl text-sm text-text-primary placeholder:text-text-secondary/40 focus:outline-none focus:border-amber-300 focus:ring-2 focus:ring-amber-100 resize-none font-light leading-relaxed transition-all"
                                        />
                                        <div className="flex items-center justify-end gap-3 mt-4">
                                            <button
                                                onClick={() => { setShowSavePrompt(false); setCurrentNote(''); }}
                                                className="px-6 py-2.5 text-[10px] font-bold text-text-secondary uppercase tracking-widest hover:text-text-primary transition-colors"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                onClick={saveLearning}
                                                disabled={!currentNote.trim()}
                                                className={`px-8 py-2.5 text-[10px] font-bold rounded-full uppercase tracking-widest transition-all shadow-md ${
                                                    currentNote.trim()
                                                        ? 'bg-amber-600 text-white hover:bg-amber-700 hover:shadow-lg'
                                                        : 'bg-gray-100 text-gray-300 cursor-not-allowed'
                                                }`}
                                            >
                                                Save to Journal ✓
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>

                        </div>

                    </div>
                )}

                {/* My Cultural Journal */}
                {savedLearnings.length > 0 && (
                    <div className="mt-16 animate-fade-in">
                        <div className="text-center mb-10">
                            <span className="text-accent-terra uppercase tracking-widest text-xs font-bold mb-3 block">Your Collection</span>
                            <h2 className="text-3xl md:text-4xl font-serif font-medium text-text-primary mb-3">
                                Cultural <span className="italic font-light">Journal</span>
                            </h2>
                            <p className="text-text-secondary font-light max-w-lg mx-auto">
                                A personal archive of wisdom gathered from each cultural exchange.
                            </p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {savedLearnings.map((learning) => (
                                <div 
                                    key={learning.id} 
                                    className="bg-white border border-black/5 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-500 relative overflow-hidden group"
                                >
                                    <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-accent-terra via-accent-gold to-accent-teal opacity-40 group-hover:opacity-100 transition-opacity"></div>
                                    
                                    <div className="flex items-start justify-between mb-5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 rounded-full bg-[#faf7f2] flex items-center justify-center text-2xl border border-[#f0ece6] shadow-inner">
                                                {learning.avatar}
                                            </div>
                                            <div>
                                                <h4 className="font-serif font-medium text-text-primary text-lg leading-tight">{learning.name}</h4>
                                                <p className="text-[9px] font-bold text-accent-terra uppercase tracking-[0.2em]">{learning.culture}</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => deleteLearning(learning.id)}
                                            className="w-8 h-8 rounded-full bg-[#faf7f2] hover:bg-red-50 flex items-center justify-center text-xs text-text-secondary hover:text-red-500 transition-all opacity-0 group-hover:opacity-100"
                                            title="Remove entry"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                    
                                    <p className="text-sm text-text-primary leading-relaxed font-light mb-5 whitespace-pre-wrap">
                                        {learning.note}
                                    </p>
                                    
                                    <div className="flex items-center justify-between pt-4 border-t border-black/5">
                                        <div className="flex items-center gap-4">
                                            {learning.food && (
                                                <span className="text-[9px] font-bold text-orange-600 uppercase tracking-wider flex items-center gap-1">
                                                    <span>🥘</span> {learning.food}
                                                </span>
                                            )}
                                            {learning.routine && (
                                                <span className="text-[9px] font-bold text-blue-600 uppercase tracking-wider flex items-center gap-1">
                                                    <span>⚡</span> {learning.routine}
                                                </span>
                                            )}
                                        </div>
                                        <span className="text-[9px] font-bold text-text-secondary/40 uppercase tracking-wider">
                                            {new Date(learning.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                        </span>
                                    </div>
                                </div>
                            ))}
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
                .mirror-video {
                    transform: scaleX(-1);
                }
            `}} />
        </div>
    );
};

export default CultureSwap;

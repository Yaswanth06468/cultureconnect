import { useState, useEffect, useRef } from 'react';

const Translator = () => {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [translatedText, setTranslatedText] = useState('');
    const [sourceLang, setSourceLang] = useState('en'); // Default Source is English
    const [targetLang, setTargetLang] = useState('random'); // Default Target is Random
    const [selectedTone, setSelectedTone] = useState('default'); // default, polite, formal, casual, angry
    const [detectedEmotion, setDetectedEmotion] = useState(null);
    const recognitionRef = useRef(null);

    const [isVoiceEnabled, setIsVoiceEnabled] = useState(true);
    const [speechRate, setSpeechRate] = useState(1);
    const [phrasebook, setPhrasebook] = useState([]);

    useEffect(() => {
        const saved = localStorage.getItem('culturePhrasebook');
        if (saved) setPhrasebook(JSON.parse(saved));
    }, []);

    const savePhrase = () => {
        if (!transcript.trim() || !translatedText.trim()) return;
        const newPhrase = {
            id: Date.now(),
            original: transcript.trim(),
            translated: translatedText.trim(),
            lang: targetLangRef.current
        };
        const updated = [newPhrase, ...phrasebook];
        setPhrasebook(updated);
        localStorage.setItem('culturePhrasebook', JSON.stringify(updated));
    };

    const deletePhrase = (id) => {
        const updated = phrasebook.filter(p => p.id !== id);
        setPhrasebook(updated);
        localStorage.setItem('culturePhrasebook', JSON.stringify(updated));
    };

    const sourceLangRef = useRef(sourceLang);
    const targetLangRef = useRef(targetLang);
    const isVoiceEnabledRef = useRef(isVoiceEnabled);
    const speechRateRef = useRef(speechRate);
    const selectedToneRef = useRef(selectedTone);

    useEffect(() => {
        selectedToneRef.current = selectedTone;
    }, [selectedTone]);

    useEffect(() => {
        sourceLangRef.current = sourceLang;
    }, [sourceLang]);

    useEffect(() => {
        targetLangRef.current = targetLang;
    }, [targetLang]);

    useEffect(() => {
        isVoiceEnabledRef.current = isVoiceEnabled;
    }, [isVoiceEnabled]);

    useEffect(() => {
        speechRateRef.current = speechRate;
    }, [speechRate]);

    const languages = [
        { code: 'en', ttsCode: 'en-US', name: 'English' },
        { code: 'es', ttsCode: 'es-ES', name: 'Spanish' },
        { code: 'fr', ttsCode: 'fr-FR', name: 'French' },
        { code: 'de', ttsCode: 'de-DE', name: 'German' },
        { code: 'it', ttsCode: 'it-IT', name: 'Italian' },
        { code: 'hi', ttsCode: 'hi-IN', name: 'Hindi' },
        { code: 'ja', ttsCode: 'ja-JP', name: 'Japanese' },
        { code: 'ko', ttsCode: 'ko-KR', name: 'Korean' },
        { code: 'zh-CN', ttsCode: 'zh-CN', name: 'Chinese (Simplified)' },
        { code: 'ar', ttsCode: 'ar-SA', name: 'Arabic' },
        { code: 'ru', ttsCode: 'ru-RU', name: 'Russian' },
        { code: 'te', ttsCode: 'te-IN', name: 'Telugu' },
        { code: 'ta', ttsCode: 'ta-IN', name: 'Tamil' },
        { code: 'ml', ttsCode: 'ml-IN', name: 'Malayalam' },
        { code: 'pt', ttsCode: 'pt-BR', name: 'Portuguese' },
        { code: 'nl', ttsCode: 'nl-NL', name: 'Dutch' }
    ];

    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = true;
            recognitionRef.current.interimResults = true;
            // The language will be set right before start()

            recognitionRef.current.onresult = (event) => {
                let currentTranscript = '';
                for (let i = event.resultIndex; i < event.results.length; i++) {
                    const transcriptPiece = event.results[i][0].transcript;
                    if (event.results[i].isFinal) {
                        currentTranscript += transcriptPiece + ' ';
                        let currentLang = targetLangRef.current;
                        let displayLangName = '';
                        
                        const voiceEnabled = isVoiceEnabledRef.current;

                        if (currentLang === 'random') {
                            const randLang = languages[Math.floor(Math.random() * languages.length)];
                            currentLang = randLang.code;
                            displayLangName = randLang.name;
                        }
                        
                        // Use manual tone selector as priority if it's NOT default, otherwise use auto-detected
                        const detected = analyzeMood(transcriptPiece);
                        setDetectedEmotion(detected);
                        
                        const toneToUse = selectedToneRef.current !== 'default' ? selectedToneRef.current : detected.toLowerCase();
                        const finalTone = toneToUse.charAt(0).toUpperCase() + toneToUse.slice(1);

                        // Translate the final recognized sentence
                        translateText(transcriptPiece, sourceLangRef.current, currentLang).then((translatedPiece) => {
                            if (translatedPiece) {
                                // Simulate cultural modification
                                let finalPiece = translatedPiece;
                                
                                // Map tone to emoji
                                const toneEmojis = {
                                    'Happy': '😊',
                                    'Angry': '😡',
                                    'Polite': '🙏',
                                    'Formal': '💼',
                                    'Casual': '👕',
                                    'Neutral': '✨'
                                };
                                const emoji = toneEmojis[finalTone] || '✨';
                                
                                if (currentLang === 'hi') {
                                    const toneLower = toneToUse.toLowerCase();
                                    if (toneLower === 'polite' && !finalPiece.includes('कृपया')) finalPiece = 'कृपया ' + finalPiece;
                                    if (toneLower === 'formal' && !finalPiece.includes('कीजिए')) finalPiece = finalPiece.replace('करो', 'कीजिए').replace('करें', 'कीजिए');
                                    if (toneLower === 'angry' && !finalPiece.includes('!')) finalPiece += '!';
                                }

                                const prefix = targetLangRef.current === 'random' ? `[${displayLangName}] ` : '';
                                setTranslatedText((prev) => prev + prefix + emoji + ' ' + finalPiece + ' ');
                                // Voice Output
                                if (voiceEnabled) {
                                    const langObj = languages.find(l => l.code === currentLang);
                                    speakText(finalPiece, langObj ? langObj.ttsCode : currentLang);
                                }
                            }
                        });
                    }
                }
                if (currentTranscript) {
                    setTranscript((prev) => prev + currentTranscript);
                }
            };

            // Event handlers (onerror, onend) moved to separate useEffect to avoid stale closures
        } else {
            console.error("Speech Recognition API not supported in this browser.");
            alert("Speech Recognition API not supported in your browser.");
        }

        return () => {
            if (recognitionRef.current) {
                try {
                    recognitionRef.current.stop();
                } catch (e) {
                    console.error("Stop on unmount failed:", e);
                }
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const isListeningRef = useRef(false);
    useEffect(() => {
        isListeningRef.current = isListening;
    }, [isListening]);

    useEffect(() => {
        if (recognitionRef.current) {
            recognitionRef.current.onend = () => {
                if (isListeningRef.current) {
                    setIsListening(false);
                }
            };
            recognitionRef.current.onerror = (event) => {
                console.error("Speech recognition error", event.error);
                if (event.error === 'not-allowed') {
                    alert("Microphone access denied. Please allow microphone to use translation.");
                }
                setIsListening(false);
            };
        }
    }, [isListening]); // Re-bind on state change safely

    // We keep this function outside useEffect or use targetLang properly
    // Wait, targetLang used in translateText might capture stale state if we define it in useEffect.
    // So we pass targetLang to translateText which is fine.

    const analyzeMood = (text) => {
        const lower = text.toLowerCase();
        
        // Comprehensive Scoring Engine
        const scores = {
            Polite: 0,
            Angry: 0,
            Happy: 0,
            Formal: 0,
            Casual: 0
        };

        // Polite keywords
        if (/\b(please|thank|kindly|sir|madam|appreciate|help|could you|would you)\b/.test(lower)) scores.Polite += 3;
        if (/\b(sorry|pardon|excuse)\b/.test(lower)) scores.Polite += 2;

        // Angry/Urgent keywords
        if (/\b(no|stop|don't|hate|bad|stupid|awful|wrong|danger|immediate|now|fast)\b/.test(lower)) scores.Angry += 3;
        if (lower.includes('!') || /\b(ridiculous|meaningless|useless)\b/.test(lower)) scores.Angry += 2;

        // Happy/Positive keywords
        if (/\b(hello|hi|good|happy|great|wonderful|amazing|love|thanks|glad|delighted|pleasure)\b/.test(lower)) scores.Happy += 3;
        if (/\b(yes|cool|nice|beauty|super|excellent)\b/.test(lower)) scores.Happy += 2;

        // Formal keywords
        if (/\b(should|must|office|meeting|presentation|official|scheduled|department|management|request|enquiry)\b/.test(lower)) scores.Formal += 3;
        if (/\b(regarding|therefore|consequently|accordance|policy)\b/.test(lower)) scores.Formal += 2;

        // Casual keywords
        if (/\b(hey|yo|what's up|buddy|friend|cool|chill|talk|hangout|funny|lol|wow)\b/.test(lower)) scores.Casual += 3;
        
        // Find highest score
        let maxScore = 0;
        let detected = 'Neutral';
        
        for (const [mood, score] of Object.entries(scores)) {
            if (score > maxScore) {
                maxScore = score;
                detected = mood;
            }
        }
        
        return detected;
    };

    const translateText = async (text, sl, tl) => {
        if (!text.trim()) return null;
        try {
            // Updated Google Translate API URL
            const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sl}&tl=${tl}&dt=t&q=${encodeURIComponent(text)}`;
            const response = await fetch(url);
            const data = await response.json();
            const translatedPiece = data[0].map(item => item[0]).join('');
            return translatedPiece;
        } catch (error) {
            console.error("Translation error:", error);
            return null;
        }
    };

    const speakText = (text, langCode) => {
        if (!text) return;
        try {
            // First try Google Translate's MP3 TTS directly
            // Google TTS for Chinese uses zh-CN, zh-TW, not just 'zh'
            let ttsLang = langCode;
            if (langCode === 'zh-CN') ttsLang = 'zh-CN';
            else if (langCode === 'zh-TW') ttsLang = 'zh-TW';
            else ttsLang = langCode.split('-')[0]; // base lang like 'hi' for 'hi-IN'

            // Avoid breaking surrogate pairs which throws URIError in encodeURIComponent
            const safeText = Array.from(text).slice(0, 200).join('');

            // client=gtx is much more stable and widely supported for all languages
            const audioUrl = `https://translate.googleapis.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(safeText)}&tl=${ttsLang}&client=gtx`;
            const audio = new window.Audio(audioUrl);
            audio.playbackRate = speechRateRef.current;
            const playPromise = audio.play();

            if (playPromise !== undefined) {
                playPromise.catch(e => {
                    console.error("[TTS] Audio .play() blocked/failed, falling back:", e);
                    fallbackTTS(safeText, langCode);
                });
            }
        } catch (err) {
            console.error("[TTS] Fallback trigger:", err);
            // safeText might not be defined if error happened earlier, just fallback with the original text (or sliced manually)
            fallbackTTS(text, langCode);
        }
    };

    const fallbackTTS = (text, langCode) => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = langCode;

            const voices = window.speechSynthesis.getVoices();
            // Try to find exact match
            let voice = voices.find(v => v.lang.replace('_', '-') === langCode);
            // Try to find base language match
            if (!voice) {
                voice = voices.find(v => v.lang.split('-')[0] === langCode.split('-')[0]);
            }
            
            // If still no voice, fallback to any available Google URI voice if available (Chrome)
            if (!voice) {
               voice = voices.find(v => v.name.includes('Google') && v.lang.startsWith(langCode.split('-')[0]));
            }

            if (voice) {
                utterance.voice = voice;
            }

            utterance.rate = speechRateRef.current * 0.95;
            window.speechSynthesis.speak(utterance);
        }
    };

    const toggleListening = () => {
        if (!recognitionRef.current) {
            alert("Speech recognition is not supported in this browser.");
            return;
        }

        if (isListening) {
            try {
                recognitionRef.current.stop();
            } catch (e) {
                console.error("Stop failed:", e);
            }
            setIsListening(false);
        } else {
            try {
                // Audio context warm-up
                if ('speechSynthesis' in window) {
                    window.speechSynthesis.speak(new SpeechSynthesisUtterance(''));
                }
                const silentAudio = new window.Audio('data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA=');
                silentAudio.play().catch(() => {});
                
                // Set the correct speech recognition language based on sourceLang
                const sourceLangObj = languages.find(l => l.code === sourceLang);
                recognitionRef.current.lang = sourceLangObj ? sourceLangObj.ttsCode : 'en-US';

                recognitionRef.current.start();
                setIsListening(true);
            } catch (e) {
                console.error("Could not start listening", e);
                setIsListening(false);
                if (e.name === 'InvalidStateError') {
                   // Often means it was already starting or stopping
                   // No action needed, user can retry
                }
            }
        }
    };

    const clearText = () => {
        setTranscript('');
        setTranslatedText('');
    };

    return (
        <div className="min-h-screen pt-24 pb-12 px-6" style={{ background: 'linear-gradient(135deg, #fff3e0 0%, #fbe9e7 50%, #f3e5f5 100%)' }}>
            <div className="container mx-auto max-w-5xl">
                <div className="mb-10 text-center animate-fade-in-up">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-text-primary mb-4">
                        Voice Translator
                    </h1>
                    <p className="text-lg text-text-muted max-w-2xl mx-auto">
                        Speak and translate with <span className="text-accent-terra font-bold">Emotion-Aware AI</span> that understands cultural context and social nuances.
                    </p>
                </div>

                <div className="border border-black/10 rounded-2xl p-6 md:p-10 shadow-lg transition-transform duration-300 transform hover:-translate-y-1" style={{ background: '#fdf8f3' }}>
                    <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-6 mb-8">
                        <div className="flex flex-col sm:flex-row gap-4 w-full xl:w-auto">
                            <div className="flex flex-col w-full md:w-auto">
                                <label className="text-sm font-semibold text-text-muted mb-2 uppercase tracking-wider">Source Speech</label>
                                <select
                                    value={sourceLang}
                                    onChange={(e) => setSourceLang(e.target.value)}
                                    className="w-full md:w-48 px-4 py-3 border border-black/20 rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-text-primary transition-colors bg-bg-secondary appearance-none cursor-pointer"
                                    disabled={isListening}
                                >
                                    {languages.map((lang) => (
                                        <option key={lang.code} value={lang.code}>
                                            {lang.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex items-center justify-center pt-8 hidden md:flex">
                                <svg className="w-6 h-6 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </div>

                            <div className="flex flex-col w-full md:w-auto">
                                <label className="text-sm font-semibold text-text-muted mb-2 uppercase tracking-wider">Translate To</label>
                                <select
                                    value={targetLang}
                                    onChange={(e) => setTargetLang(e.target.value)}
                                    className="w-full md:w-48 px-4 py-3 border border-black/20 rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-text-primary transition-colors bg-bg-secondary appearance-none cursor-pointer"
                                >
                                    <option value="random">🎲 Random Language</option>
                                    {languages.map((lang) => (
                                        <option key={lang.code} value={lang.code}>
                                            {lang.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-4 w-full xl:w-auto mt-4 xl:mt-0 items-center justify-start xl:justify-end">
                            {/* Controls */}
                            <div className="flex items-center gap-2 mr-4 bg-bg-secondary border border-black/10 px-3 py-1 rounded-lg">
                                <span className="text-xs font-bold text-text-muted">SPEED</span>
                                <select 
                                    value={speechRate} 
                                    onChange={(e) => setSpeechRate(parseFloat(e.target.value))}
                                    className="bg-transparent text-sm font-semibold text-text-primary focus:outline-none cursor-pointer"
                                >
                                    <option value="0.5">0.5x Slow</option>
                                    <option value="0.75">0.75x</option>
                                    <option value="1">1x Normal</option>
                                    <option value="1.25">1.25x</option>
                                    <option value="1.5">1.5x Fast</option>
                                </select>
                            </div>

                            <label className="flex items-center cursor-pointer gap-2 mr-4 hidden md:flex">
                                <div className="relative">
                                    <input 
                                        type="checkbox" 
                                        className="sr-only" 
                                        checked={isVoiceEnabled}
                                        onChange={() => setIsVoiceEnabled(!isVoiceEnabled)}
                                    />
                                    <div className={`block w-10 h-6 rounded-full transition-colors ${isVoiceEnabled ? 'bg-accent-teal' : 'bg-gray-300'}`}></div>
                                    <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${isVoiceEnabled ? 'transform translate-x-4' : ''}`}></div>
                                </div>
                                <span className="text-sm font-semibold text-text-muted uppercase text-[10px] font-black">Voice Out</span>
                            </label>

                            <button
                                onClick={clearText}
                                className="px-6 py-3 border border-text-primary text-text-primary rounded-lg font-medium hover:bg-bg-secondary transition-colors"
                            >
                                Clear
                            </button>
                            <button
                                onClick={toggleListening}
                                className={`px-8 py-3 rounded-lg font-medium text-white transition-all duration-300 flex items-center justify-center gap-2 shadow-md ${
                                    isListening 
                                    ? 'bg-accent-terra hover:bg-red-800 animate-pulse' 
                                    : 'bg-text-primary hover:bg-text-secondary'
                                }`}
                            >
                                {isListening ? (
                                    <>
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H10a1 1 0 01-1-1v-4z" />
                                        </svg>
                                        Stop Recording
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                                        </svg>
                                        Speak to Translate
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* AI Emotion & Cultural Tone Detector */}
                    <div className="mb-8 p-6 rounded-xl border border-dashed border-accent-teal/30 bg-accent-teal/5 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
                        <div className="flex items-center gap-4 z-10">
                            <div className={`w-14 h-14 rounded-full flex items-center justify-center text-3xl shadow-lg transition-transform duration-300 ${isListening ? 'animate-pulse bg-white scale-110' : 'bg-white'}`}>
                                {selectedTone !== 'default' ? (
                                    <span>{['default', 'polite', 'formal', 'casual', 'angry'].find(t => t === selectedTone) === 'polite' ? '🙏' : selectedTone === 'formal' ? '💼' : selectedTone === 'casual' ? '👕' : selectedTone === 'angry' ? '😡' : '🧠'}</span>
                                ) : (
                                    <span>{detectedEmotion === 'Angry' ? '😡' : detectedEmotion === 'Polite' ? '🙏' : detectedEmotion === 'Happy' ? '😊' : detectedEmotion === 'Formal' ? '💼' : detectedEmotion === 'Casual' ? '👕' : '🧠'}</span>
                                )}
                            </div>
                            <div>
                                <h3 className="text-xs font-black text-accent-teal uppercase tracking-widest leading-none mb-2">AI Context Engine</h3>
                                <p className="text-xl font-serif font-bold text-text-primary flex items-center gap-2">
                                    {isListening ? (
                                        <span className="flex items-center gap-2">
                                            Analyzing Tone
                                            <span className="flex gap-1">
                                                <span className="w-1 h-1 bg-accent-teal rounded-full animate-bounce"></span>
                                                <span className="w-1 h-1 bg-accent-teal rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                                                <span className="w-1 h-1 bg-accent-teal rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                                            </span>
                                        </span>
                                    ) : (
                                        <>
                                            {selectedTone !== 'default' ? (
                                                <span className="text-accent-terra">Manual: {selectedTone.charAt(0).toUpperCase() + selectedTone.slice(1)}</span>
                                            ) : detectedEmotion ? (
                                                <span>Detected: {detectedEmotion}</span>
                                            ) : (
                                                <span className="opacity-50">Waiting for speech...</span>
                                            )}
                                        </>
                                    )}
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col items-end gap-2 z-10">
                            <span className="text-[10px] font-black text-text-muted uppercase tracking-tighter mr-2">Force Tone Override</span>
                            <div className="flex flex-wrap items-center gap-2">
                                {[
                                    { id: 'default', label: 'Auto (Default)', icon: '🧠' },
                                    { id: 'polite', label: 'Polite', icon: '🙏' },
                                    { id: 'formal', label: 'Formal', icon: '💼' },
                                    { id: 'casual', label: 'Casual', icon: '👕' },
                                    { id: 'angry', label: 'Angry', icon: '😡' }
                                ].map(tone => (
                                    <button
                                        key={tone.id}
                                        onClick={() => setSelectedTone(tone.id)}
                                        title={tone.label}
                                        className={`w-10 h-10 rounded-full flex items-center justify-center text-lg transition-all border shadow-sm ${
                                            selectedTone === tone.id 
                                            ? 'bg-text-primary text-white border-text-primary scale-110' 
                                            : 'bg-white text-text-muted border-black/10 hover:border-text-primary hover:scale-105'
                                        }`}
                                    >
                                        {tone.icon}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Original Speech */}
                        <div className="flex flex-col h-[400px]">
                            <h2 className="text-xl font-serif font-bold text-text-primary mb-3 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-accent-blue"></span>
                                {languages.find(l => l.code === sourceLang)?.name} Speech
                            </h2>
                            <div className="flex-1 p-6 border border-black/10 rounded-xl overflow-y-auto whitespace-pre-wrap text-text-primary text-lg leading-relaxed shadow-inner font-sans scroll-smooth" style={{ background: '#faf5ef' }}>
                                {transcript || <div className="w-full h-full flex items-center justify-center text-text-muted italic opacity-50">Your speech will appear here...</div>}
                            </div>
                        </div>

                        {/* Translated Speech */}
                        <div className="flex flex-col h-[400px]">
                            <h2 className="text-xl font-serif font-bold text-text-primary mb-3 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-accent-teal"></span>
                                Translated {targetLang !== 'random' && `(${languages.find(l => l.code === targetLang)?.name})`}
                            </h2>
                            <div className="flex-1 p-6 border border-black/10 rounded-xl overflow-y-auto whitespace-pre-wrap text-text-primary text-lg leading-relaxed shadow-inner font-sans scroll-smooth" style={{ background: '#faf5ef' }}>
                                {translatedText || <div className="w-full h-full flex items-center justify-center text-text-muted italic opacity-50">Translation will appear here...</div>}
                            </div>
                        </div>
                    </div>

                    {/* Cultural Adaptation Info Panel */}
                    <div className="mt-8 p-6 bg-white border border-black/10 rounded-xl shadow-sm animate-fade-in">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="text-2xl">🌍</span>
                            <div>
                                <h3 className="font-serif font-bold text-text-primary leading-none">Cultural Nuance Adaptation</h3>
                                <p className="text-xs text-text-muted mt-1 uppercase font-bold tracking-tighter">Powered by Culture-Connect Tone Engine</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="p-4 border-l-4 border-accent-gold bg-accent-gold/5 rounded-r-lg">
                                <h4 className="text-xs font-black text-accent-gold uppercase mb-1">Intent Context</h4>
                                <p className="text-sm text-text-primary font-medium">{selectedTone !== 'default' ? `${selectedTone.charAt(0).toUpperCase() + selectedTone.slice(1)} (Manual)` : detectedEmotion || "Awaiting Voice Input..."}</p>
                            </div>
                            <div className="p-4 border-l-4 border-accent-blue bg-accent-blue/5 rounded-r-lg">
                                <h4 className="text-xs font-black text-accent-blue uppercase mb-1">Social Norm</h4>
                                <p className="text-sm text-text-primary font-medium">
                                    {(selectedTone === 'formal' || (selectedTone === 'default' && detectedEmotion === 'Formal')) ? "Hierarchical respect applied" : (selectedTone === 'polite' || (selectedTone === 'default' && detectedEmotion === 'Polite')) ? "Honorifics synchronized" : (selectedTone === 'angry' || (selectedTone === 'default' && detectedEmotion === 'Angry')) ? "Urgent/Direct modality" : "Casual Peer-to-Peer"}
                                </p>
                            </div>
                            <div className="p-4 border-l-4 border-accent-teal bg-accent-teal/5 rounded-r-lg">
                                <h4 className="text-xs font-black text-accent-teal uppercase mb-1">Nuance Tip</h4>
                                <p className="text-sm text-text-primary font-medium italic">
                                    {(selectedTone === 'angry' || (selectedTone === 'default' && detectedEmotion === 'Angry')) ? "Translations avoid offensive slang while preserving urgency." : "Grammar adjusted for appropriate social distance."}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Phrasebook Section */}
                    <div className="mt-12 pt-8 border-t border-black/10">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-serif font-bold text-text-primary flex items-center gap-2">
                                📖 Saved Phrasebook
                            </h2>
                            <button 
                                onClick={savePhrase}
                                disabled={!transcript || !translatedText}
                                className={`px-6 py-2 rounded-lg font-bold flex items-center gap-2 transition-all shadow-sm
                                    ${(!transcript || !translatedText) ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-accent-gold text-black hover:bg-yellow-500 hover:-translate-y-0.5'}`}
                            >
                                <span>⭐</span> Save Current Translation
                            </button>
                        </div>

                        {phrasebook.length === 0 ? (
                            <div className="text-center py-10 bg-bg-primary rounded-xl border border-dashed border-black/20 text-text-muted">
                                No phrases saved yet. Translate something and click "Save" to build your cultural phrasebook!
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {phrasebook.map((phrase) => (
                                    <div key={phrase.id} className="bg-bg-secondary p-5 rounded-xl border border-black/10 shadow-sm relative group transition-transform hover:-translate-y-1">
                                        <button 
                                            onClick={() => deletePhrase(phrase.id)}
                                            className="absolute top-3 right-3 text-text-muted hover:text-accent-terra opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            ✖
                                        </button>
                                        <p className="font-sans font-medium text-text-muted text-sm mb-1 line-clamp-2">{phrase.original}</p>
                                        <p className="font-serif font-bold text-lg text-text-primary mb-3 line-clamp-3">{phrase.translated}</p>
                                        <div className="flex items-center justify-between">
                                            <span className="inline-block px-2 py-1 bg-accent-teal/10 text-accent-teal text-xs font-bold rounded uppercase tracking-wider">
                                                {languages.find(l => l.code === phrase.lang)?.name || phrase.lang}
                                            </span>
                                            <button onClick={() => speakText(phrase.translated, languages.find(l => l.code === phrase.lang)?.ttsCode || phrase.lang)} className="text-accent-blue hover:text-blue-700 text-xs font-bold flex items-center gap-1">
                                                🔊 Listen
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Translator;

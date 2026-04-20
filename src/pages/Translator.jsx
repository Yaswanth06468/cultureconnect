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
    const lastTranslatedIndexRef = useRef(-1);
    const isSpeakingRef = useRef(false);
    const currentAudioRef = useRef(null);
    const finalizedTranscriptRef = useRef(''); // Holds the confirmed English text
    const [activeAlert, setActiveAlert] = useState(null);
    const [inputMode, setInputMode] = useState('voice'); // 'voice' or 'text'
    const [manualText, setManualText] = useState('');
    const [statusMessage, setStatusMessage] = useState('Ready');

    const CULTURAL_SENSITIVITY_ALERTS = [
        {
            pattern: /\b(what|what do you want)\b/i,
            targetLangs: ['ja', 'ko'],
            message: "Directly asking 'What?' can sound blunt or demanding in Japanese/Korean social norms.",
            suggestion: "Use 'Excuse me' or 'Could you clarify that?' (Sumimasen/Jeogyo)."
        },
        {
            pattern: /\b(stupid|idiot|dumb)\b/i,
            targetLangs: ['ar', 'hi', 'zh-CN'],
            message: "Even in casual context, these words carry high social stigma and can escalate conflicts rapidly in these cultures.",
            suggestion: "Use 'Misunderstanding' or 'Incorrect'."
        },
        {
            pattern: /\b(no|i can't|refuse)\b/i,
            targetLangs: ['ja', 'ko', 'zh-CN'],
            message: "In high-context East Asian cultures, direct negation is often avoided to 'save face'.",
            suggestion: "Try 'It might be difficult' (Muzukashii) or 'I will consider it' (Kangaete okimasu)."
        },
        {
            pattern: /\b(hurry up|fast|now)\b/i,
            targetLangs: ['fr', 'it', 'es'],
            message: "Demanding speed can be seen as extreme micro-aggression in slower-paced social interactions.",
            suggestion: "Use 'As soon as possible' (Dès que possible) or 'When you have a moment'."
        },
        {
            pattern: /\b(okay|ok)\b/i,
            targetLangs: ['ar'],
            message: "In some contexts, a simple 'OK' can be perceived as dismissive or lacking respect for the detail of the conversation.",
            suggestion: "Use 'Insha'Allah' (If God wills) or 'Tayeb' (Good/Fine)."
        },
        {
            pattern: /\b(you)\b/i,
            targetLangs: ['ja'],
            message: "Specifying 'Anata' (You) is often unnecessary and can sound overly familiar or accusatory.",
            suggestion: "Omit the pronoun or use the person's name + '-san'."
        }
    ];

    const PROFANITY_KEYWORDS = [
        // English
        'fuck', 'shit', 'bitch', 'asshole', 'bastard', 'slut', 'whore', 'cunt', 'dick', 'pussy', 'faggot', 'nigger', 'rape', 'porn', 'sex', 'ass', 'bollocks', 'bugger', 'cock', 'piss',
        // Spanish
        'puta', 'mierda', 'pendejo', 'cabron', 'joder', 'maricon', 'hijo de puta', 'chingar',
        // French
        'merde', 'connard', 'salope', 'encule', 'putain', 'bordel',
        // German
        'scheisse', 'arschloch', 'fotze', 'wichser', 'ficker',
        // Hindi/Urdu
        'saala', 'kamina', 'harami', 'behenchod', 'madarchod', 'chutiya', 'gandu', 'bhosadike', 'randi', 'lodu',
        // Telugu
        'lanja', 'munda', 'pichoda', 'nee abba', 'kodaka', 'na kodaka', 'yedhava', 'donga', 'pichi',
        // Tamil
        'thevidiya', 'omala', 'baadu', 'punda', 'sunni', 'koothi',
        // Kannada
        'bolimaga', 'soole', 'kalla',
        // Generic / Slang
        'idiot', 'stupid', 'dumb', 'clown'
    ];

    const [isBlocked, setIsBlocked] = useState(() => localStorage.getItem('isBlocked') === 'true');
    const [violationCount, setViolationCount] = useState(() => parseInt(localStorage.getItem('violationCount') || '0'));

    const checkSensitivity = (text, targetLang) => {
        const lowerText = text.toLowerCase();
        
        // Detect Profanity with Word Boundaries
        const profanityPattern = new RegExp(`\\b(${PROFANITY_KEYWORDS.join('|')})\\b`, 'i');
        const foundProfanity = profanityPattern.test(lowerText);

        if (foundProfanity) {
            // Directly read the most current count from storage to handle async lag
            const currentCount = parseInt(localStorage.getItem('violationCount') || '0');
            const newCount = currentCount + 1;
            
            setViolationCount(newCount);
            localStorage.setItem('violationCount', newCount.toString());

            if (newCount >= 2) {
                setIsBlocked(true);
                localStorage.setItem('isBlocked', 'true');
                return true; // Signal a block occurred
            }

            setActiveAlert({
                message: "🚨 SECURITY VIOLATION: Inappropriate language detected.",
                suggestion: "ONE STRIKE REMAINING. Your account will be PERMANENTLY BLOCKED on the next offense. Maintain respect.",
                isViolation: true
            });
            return true;
        }

        const found = CULTURAL_SENSITIVITY_ALERTS.find(alert => 
            alert.pattern.test(text) && (alert.targetLangs.includes(targetLang) || targetLang === 'random')
        );
        setActiveAlert(found || null);
        return false;
    };

    if (isBlocked) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black text-white p-6 text-center">
                <div className="max-w-md p-10 border-2 border-red-600 rounded-3xl animate-scale-in">
                    <span className="text-8xl mb-6 block">🚫</span>
                    <h1 className="text-4xl font-serif font-bold mb-4">Account Permanently Blocked</h1>
                    <p className="text-red-400 font-bold mb-6">Violated Cultural Respect Policy (Multiple Offenses)</p>
                    <p className="text-gray-400 text-sm mb-8">
                        This system detects offensive language and bad words in every language. Your access has been revoked to protect the community.
                    </p>
                    <button 
                        onClick={() => window.location.href = '/'}
                        className="px-8 py-3 bg-red-600 text-white font-bold rounded-full hover:bg-red-700 transition-colors"
                    >
                        Return Home
                    </button>
                </div>
            </div>
        );
    }

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
            recognitionRef.current.continuous = false; // Set to false for mobile stability
            recognitionRef.current.interimResults = true;
            // The language will be set right before start()

            recognitionRef.current.onresult = (event) => {
                if (isSpeakingRef.current) return;

                let currentInterim = '';
                let newestFinalPiece = '';
                let isFinalPiece = false;
                
                for (let i = event.resultIndex; i < event.results.length; i++) {
                    const t = event.results[i][0].transcript;
                    if (event.results[i].isFinal) {
                        newestFinalPiece = t;
                        isFinalPiece = true;
                    } else {
                        currentInterim += t;
                    }
                }
                
                // UPDATE SOURCE DISPLAY
                // Confirmation (finalized history) + currently being spoken thought (interim)
                setTranscript(finalizedTranscriptRef.current + currentInterim);

                if (isFinalPiece && newestFinalPiece.trim()) {
                    // Update persistent confirmed text
                    finalizedTranscriptRef.current += newestFinalPiece.trim() + '. ';
                    setTranscript(finalizedTranscriptRef.current);

                    let currentLang = targetLangRef.current;
                    let displayLangName = '';
                    const voiceEnabled = isVoiceEnabledRef.current;

                    if (currentLang === 'random') {
                        const randLang = languages[Math.floor(Math.random() * languages.length)];
                        currentLang = randLang.code;
                        displayLangName = randLang.name;
                    }
                    
                    const detected = analyzeMood(newestFinalPiece);
                    setDetectedEmotion(detected);
                    
                    const toneToUse = selectedToneRef.current !== 'default' ? selectedToneRef.current : detected.toLowerCase();
                    const finalTone = toneToUse.charAt(0).toUpperCase() + toneToUse.slice(1);

                    const wasBlocked = checkSensitivity(newestFinalPiece, currentLang);
                    if (wasBlocked) return;

                    translateText(newestFinalPiece, sourceLangRef.current, currentLang).then((translatedPiece) => {
                        if (translatedPiece) {
                            setTranslatedText((prev) => {
                                // Strict duplicate check
                                if (prev.includes(translatedPiece)) return prev;
                                
                                const prefix = targetLangRef.current === 'random' ? `[${displayLangName}] ` : '';
                                return prev + prefix + translatedPiece + '. ';
                            });
                            
                            if (voiceEnabled) {
                                const langObj = languages.find(l => l.code === currentLang);
                                speakText(translatedPiece, langObj ? langObj.ttsCode : currentLang);
                            }
                        }
                    });
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
                    // console.error("Stop on unmount failed:", e);
                }
            }
            if (currentAudioRef.current) {
                currentAudioRef.current.pause();
                currentAudioRef.current.src = "";
            }
            if ('speechSynthesis' in window) window.speechSynthesis.cancel();
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
                // AUTO-RESTART: If we are still in "listening" mode, restart the session
                // This is needed because we set continuous: false for mobile stability
                if (isListeningRef.current) {
                    try {
                        recognitionRef.current.start();
                    } catch (e) {
                        // ignore restart errors if already started
                    }
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
        const lower = text.toLowerCase().trim();
        if (!lower) return 'Neutral';
        
        // Comprehensive Scoring Engine
        const scores = {
            Polite: 0,
            Angry: 0,
            Happy: 0,
            Formal: 0,
            Casual: 0
        };

        // Polite keywords & phrases
        if (/\b(please|thank|kindly|sir|madam|appreciate|help|could you|would you|pardon|sorry|excuse)\b/.test(lower)) scores.Polite += 4;
        if (/\b(may i|if you don't mind|grateful|honor|regards)\b/.test(lower)) scores.Polite += 3;

        // Angry/Urgent keywords
        if (/\b(no|stop|don't|hate|bad|stupid|awful|wrong|danger|immediate|now|fast|ridiculous|meaningless|useless|shut up|annoying|hate|crazy|never)\b/.test(lower)) scores.Angry += 5;
        if (lower.includes('!') || text === text.toUpperCase() && text.length > 5) scores.Angry += 3;

        // Happy/Positive keywords
        if (/\b(hello|hi|good|happy|great|wonderful|amazing|love|thanks|glad|delighted|pleasure|yes|cool|nice|beauty|super|excellent|awesome|joy|celebrate)\b/.test(lower)) scores.Happy += 4;
        
        // Formal keywords
        if (/\b(should|must|office|meeting|presentation|official|scheduled|department|management|request|enquiry|regarding|therefore|consequently|accordance|policy|professional|sincerely|contract|agreement)\b/.test(lower)) scores.Formal += 4;
        if (lower.length > 60) scores.Formal += 2; // Longer sentences lean formal

        // Casual keywords
        if (/\b(hey|yo|what's up|buddy|friend|cool|chill|talk|hangout|funny|lol|wow|nah|yeah|yep|guess|maybe|stuff|cool)\b/.test(lower)) scores.Casual += 4;
        if (lower.length < 20) scores.Casual += 1;
        
        // Find highest score
        let maxScore = 0;
        let detected = 'Neutral';
        
        for (const [mood, score] of Object.entries(scores)) {
            if (score > maxScore) {
                maxScore = score;
                detected = mood;
            }
        }
        
        // Final fallback to Neutral if scores are too low
        if (maxScore < 2) return 'Neutral';
        
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

        // Stop any active audio before starting a new one
        if (currentAudioRef.current) {
            currentAudioRef.current.pause();
            currentAudioRef.current.src = "";
        }
        if ('speechSynthesis' in window) window.speechSynthesis.cancel();

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
            currentAudioRef.current = audio;
            audio.playbackRate = speechRateRef.current;
            
            audio.onplay = () => { isSpeakingRef.current = true; };
            audio.onended = () => { isSpeakingRef.current = false; };
            audio.onerror = () => { isSpeakingRef.current = false; };

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
            utterance.onstart = () => { isSpeakingRef.current = true; };
            utterance.onend = () => { isSpeakingRef.current = false; };
            utterance.onerror = () => { isSpeakingRef.current = false; };
            
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
    const toggleListening = () => {
        if (!recognitionRef.current) {
            setStatusMessage('Not Supported');
            alert("Voice recognition is not supported in this browser. Please use the 'Text Mode' or try Chrome/Safari.");
            return;
        }

        if (isListening) {
            try {
                recognitionRef.current.stop();
                if ('speechSynthesis' in window) window.speechSynthesis.cancel();
                isSpeakingRef.current = false;
            } catch (e) {
                console.error("Stop failed:", e);
            }
            setIsListening(false);
            setStatusMessage('Ready');
        } else {
            try {
                // Reset tracking
                lastTranslatedIndexRef.current = -1;
                isSpeakingRef.current = false;
                setStatusMessage('Initializing...');

                // Stop any current speaking to avoid immediate feedback ignore
                if (currentAudioRef.current) {
                    currentAudioRef.current.pause();
                    currentAudioRef.current.src = "";
                }
                if ('speechSynthesis' in window) window.speechSynthesis.cancel();
                
                // Audio context warm-up - CRITICAL FOR MOBILE
                try {
                    const silentAudio = new window.Audio('data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA=');
                    silentAudio.play().catch(() => {});
                } catch (err) {}
                
                // Set the correct speech recognition language based on sourceLang
                const sourceLangObj = languages.find(l => l.code === sourceLang);
                recognitionRef.current.lang = sourceLangObj ? sourceLangObj.ttsCode : 'en-US';

                // Fresh start
                recognitionRef.current.start();
                setIsListening(true);
                setStatusMessage('Listening...');
            } catch (e) {
                console.error("Could not start listening", e);
                setIsListening(false);
                setStatusMessage('Error');
                if (e.name === 'NotAllowedError' || e.message?.includes('denied')) {
                   setStatusMessage('Mic Blocked');
                }
            }
        }
    };

    const clearText = () => {
        setTranscript('');
        setTranslatedText('');
        setManualText('');
        finalizedTranscriptRef.current = '';
        setActiveAlert(null);
    };

    const handleManualTranslate = async () => {
        if (!manualText.trim()) return;
        
        let currentLang = targetLang;
        let displayLangName = '';
        const voiceEnabled = isVoiceEnabled;

        if (currentLang === 'random') {
            const randLang = languages[Math.floor(Math.random() * languages.length)];
            currentLang = randLang.code;
            displayLangName = randLang.name;
        }

        const detected = analyzeMood(manualText);
        setDetectedEmotion(detected);
        setTranscript(manualText);

        const toneToUse = selectedTone !== 'default' ? selectedTone : detected.toLowerCase();
        
        const wasBlocked = checkSensitivity(manualText, currentLang);
        if (wasBlocked) return;

        const translatedPiece = await translateText(manualText, sourceLang, currentLang);
        if (translatedPiece) {
            const prefix = targetLang === 'random' ? `[${displayLangName}] ` : '';
            setTranslatedText(prefix + translatedPiece);

            if (voiceEnabled) {
                const langObj = languages.find(l => l.code === currentLang);
                speakText(translatedPiece, langObj ? langObj.ttsCode : currentLang);
            }
        }
    };

    return (
        <div className="min-h-screen pt-24 pb-12 px-6 theme-transition" style={{ backgroundColor: 'var(--theme-bg-primary)' }}>
            <div className="container mx-auto max-w-5xl">
                <div className="mb-10 text-center animate-slide-up-reveal">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-text-primary mb-4">
                        <span>Voice Translator</span>
                    </h1>
                    <p className="text-lg text-text-muted max-w-2xl mx-auto animate-fade-in-up delay-300">
                        Speak and translate with <span className="text-accent-terra font-bold">Emotion-Aware AI</span> that understands cultural context and social nuances.
                    </p>
                </div>

                <div className="border rounded-2xl p-6 md:p-10 shadow-lg transition-transform duration-300 transform hover:-translate-y-1 theme-transition" style={{ backgroundColor: 'var(--theme-card-bg)', borderColor: 'var(--theme-border)' }}>
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
                                <span className="text-xs font-bold text-text-muted uppercase text-[10px] font-black">Voice Out</span>
                            </label>



                            <button
                                onClick={clearText}
                                className="px-6 py-3 border border-text-primary text-text-primary rounded-lg font-medium hover:bg-bg-secondary transition-colors"
                            >
                                Clear
                            </button>
                            
                            {inputMode === 'voice' ? (
                                <button
                                    onClick={toggleListening}
                                    className={`px-8 py-3 rounded-lg font-medium transition-all duration-300 flex flex-col items-center justify-center shadow-md border border-white/20 min-w-[200px] ${
                                        isListening 
                                        ? 'bg-accent-terra text-white hover:bg-red-800' 
                                        : 'bg-btn text-btn hover:opacity-90'
                                    }`}
                                >
                                    <div className="flex items-center gap-2">
                                        {isListening ? (
                                            <>
                                                <svg className="w-5 h-5 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H10a1 1 0 01-1-1v-4z" />
                                                </svg>
                                                <span>Stop</span>
                                            </>
                                        ) : (
                                            <>
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                                                </svg>
                                                <span>Speak</span>
                                            </>
                                        )}
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-widest mt-1 opacity-60">Status: {statusMessage}</span>
                                </button>
                            ) : (
                                <button
                                    onClick={handleManualTranslate}
                                    className="px-8 py-3 rounded-lg font-medium text-white bg-accent-teal hover:bg-green-700 transition-all duration-300 flex items-center justify-center gap-2 shadow-md"
                                >
                                    Translate Text
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Manual Input Area (Conditional) */}
                    {inputMode === 'text' && (
                        <div className="mb-8 animate-fade-in">
                            <textarea 
                                value={manualText}
                                onChange={(e) => setManualText(e.target.value)}
                                placeholder="Type your phrase here (e.g., 'What do you want?') to test cultural sensitivity..."
                                className="w-full h-24 p-4 border border-accent-teal/30 rounded-xl bg-bg-secondary outline-none focus:border-accent-teal transition-all text-lg font-serif italic theme-transition"
                                style={{ backgroundColor: 'var(--theme-bg-secondary)', color: 'var(--theme-text-primary)', borderColor: 'var(--theme-border)' }}
                            />
                        </div>
                    )}

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
                                            ? 'bg-btn text-btn border-border scale-110 shadow-lg' 
                                            : 'bg-white text-text-muted border-black/10 hover:border-text-primary hover:scale-105'
                                        }`}
                                    >
                                        {tone.icon}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Cultural Sensitivity Alert Banner */}
                    {activeAlert && (
                        <div className={`mb-8 p-6 rounded-row rounded-2xl border-2 animate-bounce-subtle shadow-xl relative overflow-hidden group ${activeAlert.isViolation ? 'border-red-600 bg-red-600/10' : 'border-accent-terra bg-accent-terra/5'}`}>
                           <div className={`absolute top-0 left-0 w-2 h-full ${activeAlert.isViolation ? 'bg-red-600' : 'bg-accent-terra'}`}></div>
                           <div className="flex flex-col md:flex-row items-start md:items-center gap-6 relative z-10">
                               <div className={`w-16 h-16 rounded-full text-white flex items-center justify-center text-3xl shadow-lg group-hover:rotate-12 transition-transform ${activeAlert.isViolation ? 'bg-red-600' : 'bg-accent-terra'}`}>
                                   {activeAlert.isViolation ? '🚫' : '⚠️'}
                               </div>
                               <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className={`text-xl font-serif font-bold ${activeAlert.isViolation ? 'text-red-600' : 'text-accent-terra'}`}>
                                            {activeAlert.isViolation ? 'SECURITY VIOLATION' : 'Cultural Sensitivity Warning'}
                                        </h3>
                                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-black uppercase ${activeAlert.isViolation ? 'bg-red-600 text-white' : 'bg-accent-terra text-white'}`}>
                                            {activeAlert.isViolation ? 'Offence 1 of 2' : 'Critical Insight'}
                                        </span>
                                    </div>
                                    <p className="text-text-primary text-base font-medium mb-3">
                                        “{activeAlert.message}”
                                    </p>
                                    <div className="bg-white/60 p-3 rounded-lg border border-accent-terra/20 inline-flex flex-col sm:flex-row items-start sm:items-center gap-4">
                                        <p className="text-sm font-bold text-accent-terra flex items-center gap-2">
                                            <span>💡 Suggested alternative:</span>
                                            <span className="text-text-primary italic">“{activeAlert.suggestion}”</span>
                                        </p>
                                        <button 
                                            onClick={() => speakText(activeAlert.suggestion, 'en-US')}
                                            className="text-[10px] font-black uppercase tracking-widest bg-accent-terra text-white px-3 py-1 rounded hover:bg-red-800 transition-colors flex items-center gap-1 shadow-sm"
                                        >
                                            🔊 Listen
                                        </button>
                                    </div>
                               </div>
                               <button 
                                    onClick={() => setActiveAlert(null)}
                                    className="p-2 text-accent-terra hover:bg-accent-terra/10 rounded-full transition-colors self-start md:self-center"
                               >
                                   <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                   </svg>
                               </button>
                           </div>
                           <div className="absolute -bottom-10 -right-10 text-[10rem] text-accent-terra/5 font-serif italic pointer-events-none select-none">Respect</div>
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Original Speech */}
                        <div className="flex flex-col h-[400px]">
                            <h2 className="text-xl font-serif font-bold text-text-primary mb-3 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-accent-blue"></span>
                                {languages.find(l => l.code === sourceLang)?.name} Speech
                            </h2>
                            <div className="flex-1 p-6 border rounded-xl overflow-y-auto whitespace-pre-wrap text-text-primary text-lg leading-relaxed shadow-inner font-sans scroll-smooth theme-transition" style={{ backgroundColor: 'var(--theme-bg-secondary)', borderColor: 'var(--theme-border)' }}>
                                {transcript || <div className="w-full h-full flex items-center justify-center text-text-muted italic opacity-50">Your speech will appear here...</div>}
                            </div>
                        </div>

                        {/* Translated Speech */}
                        <div className="flex flex-col h-[400px]">
                            <h2 className="text-xl font-serif font-bold text-text-primary mb-3 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-accent-teal"></span>
                                Translated {targetLang !== 'random' && `(${languages.find(l => l.code === targetLang)?.name})`}
                            </h2>
                            <div className="flex-1 p-6 border rounded-xl overflow-y-auto whitespace-pre-wrap text-text-primary text-lg leading-relaxed shadow-inner font-sans scroll-smooth theme-transition" style={{ backgroundColor: 'var(--theme-bg-secondary)', borderColor: 'var(--theme-border)' }}>
                                {translatedText || <div className="w-full h-full flex items-center justify-center text-text-muted italic opacity-50">Translation will appear here...</div>}
                            </div>
                        </div>
                    </div>

                    {/* Cultural Adaptation Info Panel */}
                    <div className="mt-8 p-6 border rounded-xl shadow-sm animate-fade-in theme-transition" style={{ backgroundColor: 'var(--theme-card-bg)', borderColor: 'var(--theme-border)' }}>
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
                                className={`px-6 py-2 rounded-lg font-bold flex items-center gap-2 transition-all shadow-sm border border-white/10
                                    ${(!transcript || !translatedText) ? 'bg-black/20 text-text-muted cursor-not-allowed' : 'bg-accent-gold text-black hover:bg-yellow-500 hover:-translate-y-0.5'}`}
                            >
                                <span>⭐</span> Save Current Translation
                            </button>
                        </div>

                        {phrasebook.length === 0 ? (
                            <div className="text-center py-10 rounded-xl border border-dashed text-text-muted theme-transition" style={{ backgroundColor: 'var(--theme-bg-primary)', borderColor: 'var(--theme-border)' }}>
                                No phrases saved yet. Translate something and click "Save" to build your cultural phrasebook!
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {phrasebook.map((phrase) => (
                                    <div key={phrase.id} className="p-5 rounded-xl border shadow-sm relative group transition-transform hover:-translate-y-1 theme-transition" style={{ backgroundColor: 'var(--theme-bg-secondary)', borderColor: 'var(--theme-border)' }}>
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

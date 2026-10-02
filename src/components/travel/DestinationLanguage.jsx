import { useState } from 'react';
import { Link } from 'react-router-dom';

const DestinationLanguage = ({ phrases = [], destinationName = 'Bangalore' }) => {
  const [search, setSearch] = useState('');
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [speakingIndex, setSpeakingIndex] = useState(null);

  const speakPhrase = (text, idx) => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported in your browser.');
      return;
    }
    window.speechSynthesis.cancel();
    setSpeakingIndex(idx);

    const utterance = new SpeechSynthesisUtterance(text);
    // Best effort: set Indian or generic English/Kannada voice
    utterance.rate = 0.85;
    utterance.pitch = 1.0;
    utterance.onend = () => setSpeakingIndex(null);
    utterance.onerror = () => setSpeakingIndex(null);

    window.speechSynthesis.speak(utterance);
  };

  const copyPhrase = (phrase, idx) => {
    const textToCopy = `${phrase.kannada} (${phrase.pronunciation}) - ${phrase.english}`;
    navigator.clipboard?.writeText(textToCopy);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 1800);
  };

  const filtered = phrases.filter(
    (p) =>
      p.english.toLowerCase().includes(search.toLowerCase()) ||
      p.pronunciation.toLowerCase().includes(search.toLowerCase()) ||
      p.kannada.toLowerCase().includes(search.toLowerCase()) ||
      p.meaning.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-[var(--theme-border)]">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--theme-accent-primary)] bg-[var(--theme-bg-accent)] px-3 py-1 rounded-full">
            Essential Traveler Phrases
          </span>
          <h3 className="text-2xl md:text-3xl font-serif font-black text-[var(--theme-text-primary)] mt-2">
            Local Language Phrasebook ({destinationName})
          </h3>
          <p className="text-sm text-[var(--theme-text-secondary)] mt-1">
            Connect warmly with locals, order delicious tiffins, and navigate like an insider.
          </p>
        </div>

        <Link
          to="/translate"
          className="text-xs font-bold text-[var(--theme-accent-primary)] hover:underline inline-flex items-center gap-1 self-start md:self-auto"
        >
          <span>Open Real-time Translator</span>
          <span>→</span>
        </Link>
      </div>

      {/* Search Filter Bar */}
      <div className="relative max-w-md">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-[var(--theme-text-muted)]">
          🔍
        </span>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search phrases (e.g. hello, help, price, station)..."
          className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-[var(--theme-card-bg)] border border-[var(--theme-border)] text-[var(--theme-text-primary)] text-sm focus:outline-none focus:border-[var(--theme-accent-primary)]"
        />
      </div>

      {/* Phrases Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((item, idx) => (
          <div
            key={idx}
            className="flat-card p-5 flex flex-col justify-between hover:border-[var(--theme-accent-primary)] transition-all duration-300"
          >
            <div>
              {/* English & Context */}
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--theme-text-muted)]">
                  English
                </span>
                {item.context && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--theme-bg-accent)] text-[var(--theme-accent-primary)] font-semibold border border-[var(--theme-border)]">
                    {item.context}
                  </span>
                )}
              </div>

              <h4 className="font-serif font-black text-lg text-[var(--theme-text-primary)]">
                {item.english}
              </h4>

              {/* Native Script & Pronunciation Box */}
              <div className="my-3 p-3.5 rounded-2xl bg-[var(--theme-bg-accent)]/70 border border-[var(--theme-border)]">
                <div className="flex items-center justify-between">
                  <span className="text-xl md:text-2xl font-bold text-[var(--theme-text-primary)] tracking-wide">
                    {item.kannada}
                  </span>
                  <div className="flex items-center gap-1.5">
                    {/* Speak Button */}
                    <button
                      type="button"
                      onClick={() => speakPhrase(item.pronunciation, idx)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs transition-colors ${
                        speakingIndex === idx
                          ? 'bg-[var(--theme-accent-primary)] text-white animate-pulse'
                          : 'bg-[var(--theme-card-bg)] hover:bg-[var(--theme-border)] text-[var(--theme-text-primary)] border border-[var(--theme-border)]'
                      }`}
                      title="Listen to pronunciation"
                    >
                      🔊
                    </button>
                    {/* Copy Button */}
                    <button
                      type="button"
                      onClick={() => copyPhrase(item, idx)}
                      className="w-8 h-8 rounded-full bg-[var(--theme-card-bg)] hover:bg-[var(--theme-border)] text-[var(--theme-text-primary)] border border-[var(--theme-border)] flex items-center justify-center text-xs transition-colors"
                      title="Copy phrase"
                    >
                      {copiedIndex === idx ? '✓' : '📋'}
                    </button>
                  </div>
                </div>

                <div className="mt-2 pt-2 border-t border-[var(--theme-border)]/50 flex items-center gap-2">
                  <span className="text-[10px] uppercase font-bold text-[var(--theme-text-muted)]">
                    Pronunciation:
                  </span>
                  <span className="font-mono text-xs font-bold text-[var(--theme-accent-primary)]">
                    "{item.pronunciation}"
                  </span>
                </div>
              </div>

              {/* Meaning */}
              <p className="text-xs text-[var(--theme-text-secondary)] mt-1">
                <strong>Meaning:</strong> {item.meaning}
              </p>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-8 text-[var(--theme-text-muted)] text-sm">
          No phrases matching "{search}".
        </div>
      )}
    </div>
  );
};

export default DestinationLanguage;

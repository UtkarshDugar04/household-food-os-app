import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mic, X, MoreHorizontal, ArrowRight, Check } from 'lucide-react';
import Button from '../../components/core/Button';

export default function VoiceAdd() {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<'listening' | 'processing' | 'success'>('listening');
  const [transcript, setTranscript] = useState('');

  // Simulated listening & transcription
  useEffect(() => {
    if (phase === 'listening') {
      const texts = [
        "Add ",
        "Add 2 kilograms potatoes, ",
        "Add 2 kilograms potatoes, 1 litre milk ",
        "Add 2 kilograms potatoes, 1 litre milk and 12 eggs."
      ];
      
      let i = 0;
      const interval = setInterval(() => {
        setTranscript(texts[i]);
        i++;
        if (i >= texts.length) {
          clearInterval(interval);
          setTimeout(() => setPhase('processing'), 800);
        }
      }, 700);

      return () => clearInterval(interval);
    } else if (phase === 'processing') {
      setTimeout(() => setPhase('success'), 2000);
    } else if (phase === 'success') {
      setTimeout(() => navigate('/pantry/review', { state: { isImport: false } }), 1000);
    }
  }, [phase, navigate]);

  return (
    <div className="flex flex-col h-screen bg-bg-base relative overflow-hidden">
      {/* Top Bar */}
      <div className="absolute top-0 inset-x-0 pt-12 px-5 z-20 flex justify-between items-center">
        <button 
          onClick={() => navigate(-1)} 
          className="w-10 h-10 rounded-full bg-bg-sunken flex items-center justify-center text-text-secondary hover:bg-bg-elevated transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 relative z-10">
        
        {/* Pulsing Mic Indicator */}
        <div className="relative mb-12 flex items-center justify-center">
          {phase === 'listening' && (
            <>
              <div className="absolute inset-0 bg-brand/20 rounded-full animate-ping" style={{ transform: 'scale(2.5)', animationDuration: '2s' }} />
              <div className="absolute inset-0 bg-brand/10 rounded-full animate-ping" style={{ transform: 'scale(1.8)', animationDuration: '2s', animationDelay: '0.5s' }} />
            </>
          )}
          
          <div className={`relative w-24 h-24 rounded-full flex items-center justify-center shadow-lg transition-all duration-500 ${
            phase === 'listening' ? 'bg-brand' : phase === 'processing' ? 'bg-brand-sky-500' : 'bg-success'
          }`}>
            {phase === 'listening' ? (
              <Mic className="w-10 h-10 text-white" />
            ) : phase === 'processing' ? (
              <MoreHorizontal className="w-10 h-10 text-white animate-pulse" />
            ) : (
              <Check className="w-10 h-10 text-white" />
            )}
          </div>
        </div>

        {/* Text Area */}
        <div className="text-center min-h-[120px] flex flex-col items-center">
          <h2 className="text-2xl font-extrabold text-text-primary mb-3">
            {phase === 'listening' ? 'I\'m listening...' : phase === 'processing' ? 'Parsing Ingredients...' : 'Got it!'}
          </h2>
          <p className="text-lg font-medium text-text-secondary leading-relaxed transition-all duration-300 min-h-[60px]">
            {transcript || 'Say something like "I just bought a dozen eggs and 2 litres of milk"'}
          </p>
        </div>
      </div>

      {/* Waveform Mock (Visual only) */}
      {phase === 'listening' && (
        <div className="absolute bottom-0 inset-x-0 h-48 opacity-20 pointer-events-none flex items-end justify-center gap-1 px-4">
          {[...Array(30)].map((_, i) => (
            <div 
              key={i} 
              className="w-2 bg-brand rounded-t-full"
              style={{ 
                height: `${Math.random() * 100 + 20}%`,
                animation: `pulse ${Math.random() * 1 + 0.5}s infinite alternate` 
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

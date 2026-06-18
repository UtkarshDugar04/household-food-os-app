import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, Target, Dumbbell, Zap } from 'lucide-react';
import PageHeader from '../../components/core/PageHeader';
import ProgressBar from '../../components/core/ProgressBar';

export default function NutritionCoach() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    { text: "I want to gain muscle, how should I adjust my diet?", sender: 'me' },
    { text: "Based on your current 120g protein goal, let's bump it to 150g. I can update your meal plan to include more chicken and eggs. Shall I do that?", sender: 'ai', actionable: true },
  ]);
  const [input, setInput] = useState('');

  const sendMsg = () => {
    if (!input.trim()) return;
    setMessages([...messages, { text: input, sender: 'me' }]);
    setInput('');
    setTimeout(() => {
      setMessages(prev => [...prev, { text: "Got it. Updating your macros now.", sender: 'ai' }]);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-screen bg-bg-base relative">
      <div className="z-10 bg-bg-base/90 backdrop-blur-md border-b border-border-subtle">
        <PageHeader title="Nutrition Coach" subtitle="AI Dietitian" backRoute="/home" />
        
        <div className="px-5 pb-4">
          <div className="bg-brand-sky-50 border border-brand-sky-200 rounded-2xl p-4 shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[10px] font-bold text-brand-sky-800 uppercase tracking-widest flex items-center gap-1">
                <Target className="w-3 h-3" /> Current Focus
              </span>
              <span className="text-[10px] font-bold text-brand-sky-600 bg-white px-2 py-0.5 rounded-pill border border-brand-sky-200">
                Muscle Gain
              </span>
            </div>
            <div className="flex justify-between text-sm font-extrabold text-brand-sky-900 mb-1">
              <span>Protein</span>
              <span>120g <span className="text-brand-sky-600 font-medium">/ 150g</span></span>
            </div>
            <ProgressBar value={120} max={150} color="sky" size="sm" />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-6 z-10 flex flex-col gap-6">
        {messages.map((m, i) => (
          <div key={i} className={`flex flex-col ${m.sender === 'me' ? 'items-end' : 'items-start'}`}>
            <div className={`max-w-[85%] rounded-3xl px-5 py-4 text-sm mb-2 ${
              m.sender === 'me' 
                ? 'bg-text-primary text-bg-base rounded-br-sm shadow-md' 
                : 'bg-bg-elevated border border-border-subtle text-text-primary rounded-bl-sm'
            }`}>
              <p className="font-semibold leading-relaxed">{m.text}</p>
            </div>
            {m.actionable && (
              <div className="flex gap-2 ml-2">
                <button className="px-4 py-2 bg-success text-white rounded-pill text-xs font-bold shadow-sm active:scale-95 transition-transform flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5" /> Update Plan
                </button>
                <button className="px-4 py-2 bg-bg-sunken text-text-secondary rounded-pill text-xs font-bold border border-border-subtle active:scale-95 transition-transform">
                  Keep as is
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="p-4 bg-bg-base border-t border-border-subtle z-10 pb-safe">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Ask about your diet..."
            className="flex-1 bg-bg-sunken border border-border-subtle rounded-xl px-5 py-3.5 text-sm font-medium focus:outline-none focus:border-text-primary transition-colors"
            onKeyDown={e => e.key === 'Enter' && sendMsg()}
          />
          <button onClick={sendMsg} className="w-12 h-12 rounded-full bg-text-primary text-bg-base flex items-center justify-center hover:bg-text-secondary transition-colors shadow-md flex-shrink-0">
            <Send className="w-5 h-5 -ml-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

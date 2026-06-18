import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, BotMessageSquare, Mic, Image as ImageIcon, Sparkles, ChevronLeft, X } from 'lucide-react';
import { aiConversation } from '../../data/mockData';

export default function ChatHome() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState(aiConversation);
  const [isTyping, setIsTyping] = useState(false);

  const suggestions = [
    "What can I cook tonight?",
    "What expires this week?",
    "How do I hit 120g protein?",
    "Generate shopping list",
    "What's my pantry health?",
  ];

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg = { id: `u${Date.now()}`, role: 'user' as const, content: text, timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) };
    setMessages(prev => [...prev, userMsg]);
    setQuery('');
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const aiResponse = {
        id: `a${Date.now()}`,
        role: 'ai' as const,
        content: `I've analyzed your pantry of 58 items and your nutrition goals. Based on what you asked — "${text}" — here's what I found: Your current protein intake is 45g, and you need 75g more to hit your 120g goal. I recommend Lemon Herb Chicken for dinner (42g protein) and a protein shake for snacking (30g). This uses expiring spinach and chicken.`,
        timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1800);
  };

  return (
    <div className="flex flex-col h-screen bg-bg-base">
      {/* Header */}
      <div className="flex items-center px-4 pt-5 pb-3 bg-bg-elevated border-b border-border-subtle">
        <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-full hover:bg-bg-sunken flex items-center justify-center text-text-secondary mr-2">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-plum-400 to-brand-plum-600 flex items-center justify-center mr-2.5">
          <BotMessageSquare className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1">
          <p className="font-extrabold text-text-primary text-sm">Household Copilot</p>
          <p className="text-[10px] text-success font-semibold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-success" />
            Active · 58 items in memory
          </p>
        </div>
        <button onClick={() => navigate('/ai/qa')} className="text-xs font-bold text-brand hover:underline">Inventory QA</button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto scrollbar-hide px-4 py-4 flex flex-col gap-4">
        {messages.map((msg, idx) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} gap-2.5 page-enter`} style={{ animationDelay: `${idx * 30}ms` }}>
            {msg.role === 'ai' && (
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-brand-plum-400 to-brand-plum-600 flex items-center justify-center flex-shrink-0 mt-1">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
            )}
            <div className={`max-w-[80%] flex flex-col gap-2`}>
              <div className={`rounded-2xl px-4 py-3 text-sm leading-relaxed font-medium ${
                msg.role === 'user'
                  ? 'bg-brand text-white rounded-tr-sm'
                  : 'bg-bg-elevated border border-border-subtle text-text-primary rounded-tl-sm'
              }`}>
                {msg.content}
              </div>
              {/* AI Cards */}
              {msg.cards?.map((card, i) => (
                <div key={i} className="bg-brand-plum-50 border border-brand-plum-200 rounded-2xl p-3">
                  <p className="text-[10px] font-bold text-brand-plum-500 uppercase tracking-widest mb-2">{card.title}</p>
                  {card.type === 'recipe' && (
                    <div className="flex flex-col gap-1">
                      {Object.entries(card.data).map(([k, v]) => (
                        <div key={k} className="flex justify-between text-xs">
                          <span className="text-brand-plum-500 font-semibold capitalize">{k.replace(/([A-Z])/g, ' $1')}</span>
                          <span className="text-brand-plum-700 font-bold">{String(v)}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {card.type === 'expiry' && typeof card.data === 'object' && (
                    <div className="space-y-1.5">
                      {Object.entries(card.data).map(([period, items]) => (
                        <div key={period}>
                          <p className="text-[10px] font-bold text-brand-plum-400 uppercase mb-1">{period}</p>
                          {(items as string[]).map((item, j) => (
                            <p key={j} className="text-xs text-brand-plum-700">· {item}</p>
                          ))}
                        </div>
                      ))}
                    </div>
                  )}
                  {card.type === 'nutrition' && (
                    <div className="flex flex-col gap-1">
                      {Object.entries(card.data).map(([k, v]) => (
                        <div key={k} className="flex justify-between text-xs">
                          <span className="text-brand-plum-500 font-semibold capitalize">{k}</span>
                          <span className="text-brand-plum-700 font-bold">{String(v)}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <p className={`text-[10px] text-text-tertiary ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>{msg.timestamp}</p>
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex items-end gap-2.5">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-brand-plum-400 to-brand-plum-600 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div className="bg-bg-elevated border border-border-subtle rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1 items-center">
              {[0, 1, 2].map(i => (
                <span key={i} className="typing-dot w-2 h-2 rounded-full bg-text-tertiary" style={{ animation: `typingDot 1.2s ease-in-out infinite ${i * 0.15}s` }} />
              ))}
            </div>
          </div>
        )}

        {/* Suggestions (shown at bottom when no recent user message) */}
        <div className="flex gap-2 flex-wrap">
          {suggestions.slice(0, 3).map((s, i) => (
            <button
              key={i}
              onClick={() => sendMessage(s)}
              className="px-3 py-1.5 bg-bg-sunken border border-border-subtle rounded-pill text-xs font-semibold text-text-secondary hover:bg-bg-elevated hover:border-brand-muted hover:text-brand transition-all"
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="px-4 py-3 bg-bg-elevated border-t border-border-subtle pb-safe">
        <div className="flex items-end gap-2 bg-bg-sunken border border-border-strong rounded-3xl px-3 py-2 focus-within:border-brand-muted transition-colors">
          <button className="p-1.5 text-text-tertiary hover:text-brand transition-colors">
            <ImageIcon className="w-5 h-5" />
          </button>
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(query); } }}
            placeholder="Ask about your pantry, nutrition, meals..."
            className="flex-1 max-h-[100px] min-h-[36px] bg-transparent text-text-primary placeholder:text-text-tertiary outline-none resize-none py-1.5 text-sm leading-relaxed"
            rows={1}
          />
          {query ? (
            <button
              onClick={() => sendMessage(query)}
              className="p-2 text-white bg-brand rounded-full hover:bg-brand-hover transition-colors mb-0.5 shadow-sm"
            >
              <Send className="w-4 h-4" />
            </button>
          ) : (
            <button className="p-2 text-text-tertiary hover:text-brand transition-colors mb-0.5">
              <Mic className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

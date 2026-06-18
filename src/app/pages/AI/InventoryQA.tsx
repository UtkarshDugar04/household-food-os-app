import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, Search, Package, CheckCircle2 } from 'lucide-react';
import PageHeader from '../../components/core/PageHeader';

export default function InventoryQA() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    { text: "What do we have for baking?", sender: 'me' },
    { text: "You have Flour (1kg), Sugar (500g), and Baking Powder (almost out). You are missing Eggs.", sender: 'ai', items: ['Flour', 'Sugar', 'Baking Powder'] },
  ]);
  const [input, setInput] = useState('');

  const sendMsg = () => {
    if (!input.trim()) return;
    setMessages([...messages, { text: input, sender: 'me' }]);
    setInput('');
    setTimeout(() => {
      setMessages(prev => [...prev, { text: "I'm checking the pantry... You have exactly 3 eggs left.", sender: 'ai', items: ['Eggs'] }]);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-screen bg-bg-base relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
      </div>

      <div className="z-10 bg-bg-base/90 backdrop-blur-md border-b border-border-subtle">
        <PageHeader title="Pantry Q&A" subtitle="Ask AI about your inventory" backRoute="/home" />
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-6 z-10 flex flex-col gap-6">
        <div className="text-center pb-4 border-b border-border-subtle/50 mb-2">
          <div className="w-16 h-16 bg-brand-light rounded-full flex items-center justify-center mx-auto mb-3">
            <Search className="w-8 h-8 text-brand" />
          </div>
          <p className="text-sm text-text-secondary font-medium px-4">
            "Do we have any milk left?"<br/>"What ingredients are expiring soon?"
          </p>
        </div>

        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-3xl px-5 py-4 text-sm ${
              m.sender === 'me' 
                ? 'bg-brand text-white rounded-br-sm shadow-md' 
                : 'bg-bg-elevated border border-border-subtle text-text-primary rounded-bl-sm'
            }`}>
              <p className="font-semibold leading-relaxed">{m.text}</p>
              {m.items && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {m.items.map(item => (
                    <span key={item} className="flex items-center gap-1.5 px-2 py-1 bg-bg-sunken border border-border-subtle rounded-md text-xs font-bold text-text-secondary">
                      <Package className="w-3 h-3" /> {item}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 bg-bg-base border-t border-border-subtle z-10 pb-safe">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Ask about your pantry..."
            className="flex-1 bg-bg-sunken border border-border-subtle rounded-xl px-5 py-3.5 text-sm font-medium focus:outline-none focus:border-brand-muted transition-colors"
            onKeyDown={e => e.key === 'Enter' && sendMsg()}
          />
          <button onClick={sendMsg} className="w-12 h-12 rounded-full bg-brand text-white flex items-center justify-center hover:bg-brand-hover transition-colors shadow-md flex-shrink-0">
            <Send className="w-5 h-5 -ml-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

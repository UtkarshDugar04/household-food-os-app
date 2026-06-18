import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, MapPin, Phone, Shield, CheckCircle2, Navigation } from 'lucide-react';
import PageHeader from '../../components/core/PageHeader';
import Button from '../../components/core/Button';

export default function ExchangeFlow() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    { text: "Hi! I'd love to take those tomatoes off your hands.", sender: 'me', time: '10:00 AM' },
    { text: "Sure thing! They are super fresh. Can you pick them up around 6 PM?", sender: 'them', time: '10:05 AM' },
  ]);
  const [input, setInput] = useState('');
  const [status, setStatus] = useState<'pending' | 'accepted' | 'completed'>('pending');

  useEffect(() => {
    if (status === 'pending') {
      const timer = setTimeout(() => {
        setStatus('accepted');
        setMessages(prev => [...prev, { text: "I've accepted your request! See you at 6.", sender: 'them', time: '10:10 AM' }]);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  const sendMsg = () => {
    if (!input.trim()) return;
    setMessages([...messages, { text: input, sender: 'me', time: 'Now' }]);
    setInput('');
  };

  return (
    <div className="flex flex-col h-screen bg-bg-base relative">
      <div className="absolute inset-0 bg-[#e5e3df] z-0 opacity-50">
        <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(to right, #cfcdca 1px, transparent 1px), linear-gradient(to bottom, #cfcdca 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>

      <div className="z-10 bg-bg-base/90 backdrop-blur-md border-b border-border-subtle">
        <PageHeader title="Exchange with Rahul" subtitle="Fresh Tomatoes (Offer)" backRoute="/community" />
        
        {status === 'accepted' && (
          <div className="px-5 pb-4">
            <div className="bg-success-bg border border-success/20 rounded-2xl p-3 flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-success" />
              <div className="flex-1">
                <p className="text-sm font-bold text-success">Request Accepted!</p>
                <p className="text-xs text-text-secondary">Pickup at 123 Main St, Gate A</p>
              </div>
              <button className="w-8 h-8 rounded-full bg-success text-white flex items-center justify-center shadow-sm">
                <Navigation className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4 z-10 flex flex-col gap-4">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${
              m.sender === 'me' ? 'bg-brand text-white rounded-br-sm' : 'bg-white border border-border-subtle text-text-primary rounded-bl-sm'
            }`}>
              <p className="font-medium">{m.text}</p>
              <p className={`text-[10px] mt-1 ${m.sender === 'me' ? 'text-white/70 text-right' : 'text-text-tertiary'}`}>{m.time}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 bg-bg-base border-t border-border-subtle z-10 pb-safe">
        {status === 'accepted' && (
          <div className="mb-3 flex gap-2">
            <Button variant="outline" size="sm" className="flex-1 bg-white" icon={<Phone className="w-4 h-4" />}>Call</Button>
            <Button size="sm" className="flex-1" icon={<CheckCircle2 className="w-4 h-4" />} onClick={() => setStatus('completed')}>Mark Picked Up</Button>
          </div>
        )}
        {status === 'completed' ? (
          <div className="text-center py-4">
            <p className="text-lg font-extrabold text-success mb-1">Exchange Complete! 🎉</p>
            <p className="text-sm text-text-secondary mb-4">You rescued food from going to waste.</p>
            <Button onClick={() => navigate('/community')}>Back to Community</Button>
          </div>
        ) : (
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 bg-bg-sunken border border-border-subtle rounded-pill px-4 py-3 text-sm focus:outline-none focus:border-brand-muted"
              onKeyDown={e => e.key === 'Enter' && sendMsg()}
            />
            <button onClick={sendMsg} className="w-12 h-12 rounded-full bg-brand text-white flex items-center justify-center hover:bg-brand-hover transition-colors shadow-sm">
              <Send className="w-5 h-5 -ml-0.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

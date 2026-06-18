import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, Info, Check, X } from 'lucide-react';
import PageHeader from '../../components/core/PageHeader';
import Button from '../../components/core/Button';
import Card from '../../components/core/Card';

export default function LowConfidenceInventory() {
  const navigate = useNavigate();
  const [items, setItems] = useState([
    { id: 1, text: 'Green leafy vegetable', guess: 'Spinach', image: '🥬' },
    { id: 2, text: 'White powder', guess: 'Flour', image: '🍚' },
  ]);

  const handleResolve = (id: number, isCorrect: boolean) => {
    setItems(items.filter(i => i.id !== id));
    if (items.length === 1) {
      navigate(-1);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-bg-base">
      <PageHeader title="Needs Verification" subtitle="AI is unsure about these items" backRoute="/home" />

      <div className="px-5 pb-8 pt-4 flex flex-col gap-6">
        <div className="bg-warning-bg border border-warning/30 rounded-2xl p-4 flex gap-3 items-start">
          <div className="w-8 h-8 rounded-full bg-warning flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-sm font-bold text-text-primary mb-1">Low Confidence Detections</p>
            <p className="text-xs text-text-secondary leading-relaxed">
              The camera couldn't clearly read the labels on these items. Please confirm AI's best guess or manually edit.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {items.map(item => (
            <Card key={item.id} padding="md" className="border-border-strong border-2">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-bg-sunken rounded-xl flex items-center justify-center text-3xl">
                  {item.image}
                </div>
                <div>
                  <p className="text-[10px] font-bold text-text-tertiary uppercase tracking-widest mb-1">AI Detected</p>
                  <p className="text-sm font-medium text-text-secondary mb-0.5">"{item.text}"</p>
                  <div className="flex items-center gap-1.5">
                    <span className="font-extrabold text-text-primary text-base">Is this {item.guess}?</span>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1" icon={<X className="w-4 h-4" />} onClick={() => handleResolve(item.id, false)}>
                  No, Edit
                </Button>
                <Button className="flex-1" icon={<Check className="w-4 h-4" />} onClick={() => handleResolve(item.id, true)}>
                  Yes
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, MapPin, Package, Check } from 'lucide-react';
import PageHeader from '../../components/core/PageHeader';
import Button from '../../components/core/Button';

export default function CreateListing() {
  const navigate = useNavigate();
  const [type, setType] = useState<'offer' | 'request'>('offer');
  const [posted, setPosted] = useState(false);

  const handlePost = () => {
    setPosted(true);
    setTimeout(() => navigate('/community'), 2500);
  };

  if (posted) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-bg-base px-6 text-center">
        <div className="w-20 h-20 rounded-full bg-success-bg flex items-center justify-center mb-5">
          <Check className="w-10 h-10 text-success" />
        </div>
        <h2 className="text-2xl font-extrabold text-text-primary mb-2">Listing Posted!</h2>
        <p className="text-text-secondary text-sm mb-4 leading-relaxed">
          Your neighbors have been notified. We'll let you know when someone responds.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-bg-base">
      <PageHeader title="New Post" subtitle="Community Food Network" backRoute="/community" />

      <div className="px-5 pb-8 pt-4 flex flex-col flex-1">
        {/* Type toggle */}
        <div className="flex p-1 bg-bg-sunken rounded-2xl mb-6">
          <button
            onClick={() => setType('offer')}
            className={`flex-1 py-2.5 rounded-xl font-bold text-sm transition-all ${
              type === 'offer' ? 'bg-bg-elevated text-text-primary shadow-sm' : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            I'm Offering
          </button>
          <button
            onClick={() => setType('request')}
            className={`flex-1 py-2.5 rounded-xl font-bold text-sm transition-all ${
              type === 'request' ? 'bg-bg-elevated text-text-primary shadow-sm' : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            I'm Requesting
          </button>
        </div>

        <div className="flex flex-col gap-5 flex-1">
          {type === 'offer' && (
            <button className="w-full h-32 bg-bg-sunken border-2 border-dashed border-border-strong rounded-3xl flex flex-col items-center justify-center gap-2 hover:bg-bg-elevated hover:border-brand-muted transition-colors">
              <Camera className="w-6 h-6 text-text-tertiary" />
              <span className="text-sm font-bold text-text-secondary">Take a photo</span>
            </button>
          )}

          <div>
            <label className="block text-[10px] font-bold text-text-tertiary uppercase tracking-widest mb-2">
              Item Details
            </label>
            <div className="flex items-center gap-3 bg-bg-elevated border border-border-subtle rounded-2xl px-4 py-3 focus-within:border-brand-muted transition-colors">
              <Package className="w-5 h-5 text-text-tertiary" />
              <input
                type="text"
                placeholder={type === 'offer' ? "e.g., 2kg Fresh Tomatoes" : "e.g., Need 1 cup sugar"}
                className="flex-1 bg-transparent border-none text-sm font-semibold text-text-primary placeholder:text-text-tertiary focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-text-tertiary uppercase tracking-widest mb-2">
              Description (Optional)
            </label>
            <textarea
              placeholder={type === 'offer' ? "Why are you giving it away? When does it expire?" : "What do you need it for?"}
              rows={3}
              className="w-full bg-bg-elevated border border-border-subtle rounded-2xl px-4 py-3 text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-brand-muted transition-colors resize-none"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-text-tertiary uppercase tracking-widest mb-2">
              Pickup Location
            </label>
            <div className="flex items-center gap-3 bg-bg-elevated border border-border-subtle rounded-2xl px-4 py-3 focus-within:border-brand-muted transition-colors">
              <MapPin className="w-5 h-5 text-text-tertiary" />
              <input
                type="text"
                defaultValue="My Apartment Gate (Default)"
                className="flex-1 bg-transparent border-none text-sm font-semibold text-text-primary placeholder:text-text-tertiary focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="mt-8">
          <Button size="lg" fullWidth onClick={handlePost}>
            Post to Community
          </Button>
        </div>
      </div>
    </div>
  );
}

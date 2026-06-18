import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MapPin, Star, Shield, Clock, MessageCircle, Share2 } from 'lucide-react';
import PageHeader from '../../components/core/PageHeader';
import Button from '../../components/core/Button';
import Badge from '../../components/core/Badge';
import { communityListings } from '../../data/mockData';

export default function ListingDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const listing = location.state?.listing || communityListings[0];
  const [requested, setRequested] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleRequest = () => {
    setRequested(true);
    setTimeout(() => navigate('/community/exchange'), 1500);
  };

  return (
    <div className="flex flex-col bg-bg-base min-h-screen">
      <PageHeader 
        title={listing.type === 'offer' ? 'Available Offer' : 'Community Request'} 
        backRoute="/community" 
        rightElement={
          <button onClick={() => setSaved(!saved)} className="w-9 h-9 rounded-full bg-bg-sunken flex items-center justify-center text-text-secondary hover:bg-bg-elevated hover:text-brand transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill={saved ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={saved ? 'text-brand' : ''}><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>
          </button>
        }
      />

      <div className="px-5 pb-8 flex flex-col gap-5">
        {/* Hero Card */}
        <div className={`rounded-3xl overflow-hidden border ${listing.type === 'offer' ? 'border-success/20' : 'border-info/20'}`}>
          <div className={`h-32 flex items-center justify-center ${listing.type === 'offer' ? 'bg-success-bg' : 'bg-info-bg'}`}>
            <span className="text-6xl">{listing.emoji}</span>
          </div>
          <div className={`px-5 py-4 ${listing.type === 'offer' ? 'bg-success-bg/50' : 'bg-info-bg/50'}`}>
            <div className="flex items-start gap-2 mb-1">
              <h2 className="text-xl font-extrabold text-text-primary flex-1">{listing.item}</h2>
              <Badge variant={listing.type === 'offer' ? 'success' : 'info'}>
                {listing.type === 'offer' ? 'Offer' : 'Request'}
              </Badge>
            </div>
            <p className="text-sm text-text-secondary leading-relaxed">{listing.description}</p>
            <div className="flex items-center gap-3 mt-3">
              <span className="text-sm font-bold text-text-primary">{listing.quantity}</span>
              {listing.expiryHours && (
                <span className="flex items-center gap-1 text-xs font-bold text-warning">
                  <Clock className="w-3.5 h-3.5" />
                  Expires in {listing.expiryHours}h
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Host Info */}
        <div className="bg-bg-elevated border border-border-subtle rounded-2xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-zest-400 to-brand-sage-400 flex items-center justify-center">
              <span className="text-lg font-extrabold text-white">{listing.hostInitials}</span>
            </div>
            <div className="flex-1">
              <p className="font-extrabold text-text-primary">{listing.hostName}</p>
              <p className="text-xs text-text-tertiary font-medium">{listing.hostExchanges} exchanges completed</p>
            </div>
            <button
              onClick={() => navigate('/community/trust')}
              className="flex items-center gap-1 bg-success-bg border border-success/20 rounded-xl px-3 py-1.5"
            >
              <Star className="w-3.5 h-3.5 text-warning fill-warning" />
              <span className="font-extrabold text-success text-sm">{listing.hostTrustScore}</span>
            </button>
          </div>

          {/* Trust badge */}
          <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border-subtle">
            <Shield className="w-4 h-4 text-success" />
            <span className="text-xs font-bold text-success">Verified Community Member</span>
            <span className="text-xs text-text-tertiary">· {listing.hostExchanges} exchanges</span>
          </div>
        </div>

        {/* Location */}
        <div className="bg-bg-elevated border border-border-subtle rounded-2xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-light flex items-center justify-center">
            <MapPin className="w-5 h-5 text-brand" />
          </div>
          <div>
            <p className="font-bold text-text-primary text-sm">{listing.distanceKm} km away</p>
            <p className="text-xs text-text-tertiary">Pickup from gate · Koramangala area</p>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {listing.tags.map((tag: string) => (
            <span key={tag} className="px-3 py-1.5 bg-bg-sunken border border-border-subtle rounded-pill text-xs font-semibold text-text-secondary">
              {tag}
            </span>
          ))}
        </div>

        {/* CTA */}
        {listing.type === 'offer' ? (
          <Button
            size="lg"
            fullWidth
            icon={requested ? undefined : <MessageCircle className="w-5 h-5" />}
            onClick={handleRequest}
            disabled={requested}
          >
            {requested ? 'Request Sent! Connecting...' : 'I Want This — Request Exchange'}
          </Button>
        ) : (
          <Button size="lg" fullWidth icon={<Share2 className="w-5 h-5" />} onClick={() => navigate('/community/create')}>
            I Can Help — Offer Food
          </Button>
        )}
        <Button variant="outline" fullWidth onClick={() => navigate('/community')}>
          Back to Community Feed
        </Button>
      </div>
    </div>
  );
}

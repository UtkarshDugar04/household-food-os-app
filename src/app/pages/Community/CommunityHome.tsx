import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Star, Share2, ChevronRight, Plus, Users, Heart } from 'lucide-react';
import Card from '../../components/core/Card';
import Button from '../../components/core/Button';
import Badge from '../../components/core/Badge';
import { communityListings, impactStats } from '../../data/mockData';

export default function CommunityHome() {
  const navigate = useNavigate();
  const offers = communityListings.filter(l => l.type === 'offer');
  const requests = communityListings.filter(l => l.type === 'request');

  return (
    <div className="flex flex-col bg-bg-base min-h-screen">
      {/* Header */}
      <div className="px-5 pt-6 pb-4 flex justify-between items-start">
        <div>
          <p className="text-xs font-bold text-text-tertiary uppercase tracking-widest mb-0.5">Food</p>
          <h1 className="text-2xl font-extrabold text-text-primary tracking-tight">Community</h1>
          <p className="text-sm text-text-secondary mt-0.5">Food Rescue Network</p>
        </div>
      </div>

      <div className="px-5 pb-6 flex flex-col gap-5">
        {/* Map Preview Hero */}
        <button 
          onClick={() => navigate('/community/map')}
          className="relative w-full h-40 rounded-3xl overflow-hidden border border-border-subtle shadow-sm group"
        >
          {/* Map Background Pattern */}
          <div className="absolute inset-0 bg-[#e5e3df]">
            <div className="absolute inset-0 opacity-50" style={{
              backgroundImage: 'linear-gradient(to right, #cfcdca 2px, transparent 2px), linear-gradient(to bottom, #cfcdca 2px, transparent 2px)',
              backgroundSize: '30px 30px'
            }} />
            <div className="absolute top-1/4 left-1/4 w-20 h-20 bg-[#c2dcb3] rounded-full blur-xl opacity-60" />
            <div className="absolute bottom-1/4 right-1/4 w-32 h-8 bg-[#a5c2df] rotate-45 blur-md opacity-60" />
          </div>
          
          {/* Mock Pins */}
          <div className="absolute top-1/3 left-1/4 w-8 h-8 bg-success text-white rounded-full flex items-center justify-center shadow-lg border-2 border-white text-sm group-hover:scale-110 transition-transform">🍅</div>
          <div className="absolute bottom-1/4 right-1/3 w-8 h-8 bg-info text-white rounded-full flex items-center justify-center shadow-lg border-2 border-white text-sm group-hover:scale-110 transition-transform">🥛</div>
          <div className="absolute top-1/2 right-1/4 w-8 h-8 bg-success text-white rounded-full flex items-center justify-center shadow-lg border-2 border-white text-sm group-hover:scale-110 transition-transform">🍞</div>
          
          {/* My Location Pulse */}
          <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-brand rounded-full border-2 border-white shadow-md">
            <div className="absolute inset-0 bg-brand rounded-full animate-ping opacity-50" />
          </div>

          {/* Overlay Content */}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 flex justify-between items-end">
            <div className="text-left">
              <h2 className="text-white font-extrabold text-lg flex items-center gap-1.5"><MapPin className="w-4 h-4" /> Nearby Activity</h2>
              <p className="text-white/80 text-xs font-medium mt-0.5">4 offers · 2 requests within 2km</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
              <ChevronRight className="w-5 h-5" />
            </div>
          </div>
        </button>

        {/* My Surplus CTA */}
        <button
          onClick={() => navigate('/community/create')}
          className="flex items-center gap-3 bg-bg-elevated border border-border-strong rounded-xl px-4 py-3.5 hover:shadow-sm transition-all group"
        >
          <div className="w-10 h-10 rounded-lg bg-bg-sunken flex items-center justify-center group-hover:bg-bg-base transition-colors border border-border-subtle">
            <Plus className="w-5 h-5 text-text-primary" />
          </div>
          <div className="flex-1 text-left">
            <p className="font-extrabold text-text-primary">Share Surplus Food</p>
            <p className="text-xs text-text-secondary">List expiring items for neighbors</p>
          </div>
          <ChevronRight className="w-4 h-4 text-text-tertiary group-hover:text-text-primary transition-colors" />
        </button>

        {/* Offers Nearby */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-base font-extrabold text-text-primary">Available Nearby</h2>
            <Badge variant="success" dot>{offers.length} offers</Badge>
          </div>
          <div className="flex flex-col gap-3">
            {offers.slice(0, 4).map(listing => (
              <button
                key={listing.id}
                onClick={() => navigate('/community/listing', { state: { listing } })}
                className="flex gap-3.5 bg-bg-elevated border border-border-subtle rounded-xl p-4 text-left hover:shadow-sm hover:border-border-strong active:scale-[0.99] transition-all"
              >
                <div className="w-14 h-14 bg-bg-sunken rounded-xl flex items-center justify-center text-2xl flex-shrink-0 border border-border-subtle drop-shadow-sm">
                  {listing.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <p className="font-extrabold text-text-primary text-sm">{listing.item}</p>
                    <Badge variant="neutral" size="xs" className="bg-bg-sunken text-success">Offer</Badge>
                  </div>
                  <p className="text-xs text-text-secondary leading-relaxed line-clamp-2 mb-2">{listing.description}</p>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-bold text-text-tertiary flex items-center gap-1">
                      <MapPin className="w-3 h-3" />{listing.distanceKm} km
                    </span>
                    <span className="text-[10px] font-bold text-text-tertiary flex items-center gap-1">
                      <Star className="w-3 h-3 text-text-secondary" />{listing.hostTrustScore}
                    </span>
                    {listing.expiryHours && (
                      <span className="text-[10px] font-bold text-text-secondary">
                        Expires in {listing.expiryHours}h
                      </span>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Requests */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-base font-extrabold text-text-primary">Community Requests</h2>
            <Badge variant="info" dot>{requests.length} needs</Badge>
          </div>
          <div className="flex flex-col gap-2.5">
            {requests.map(listing => (
              <button
                key={listing.id}
                onClick={() => navigate('/community/listing', { state: { listing } })}
                className="flex gap-3.5 bg-bg-elevated border border-border-subtle rounded-xl p-4 text-left hover:shadow-sm hover:border-border-strong active:scale-[0.99] transition-all"
              >
                <div className="w-10 h-10 bg-bg-sunken rounded-lg flex items-center justify-center text-xl flex-shrink-0 border border-border-subtle drop-shadow-sm">
                  {listing.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-0.5">
                    <p className="font-bold text-text-primary text-sm">{listing.item}</p>
                    <Badge variant="neutral" size="xs" className="bg-bg-sunken text-info">Request</Badge>
                  </div>
                  <p className="text-xs text-text-secondary line-clamp-1">{listing.description}</p>
                  <p className="text-[10px] text-text-tertiary mt-1 flex items-center gap-1">
                    <MapPin className="w-3 h-3" />{listing.distanceKm} km · {listing.hostName}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* History Link */}
        <button
          onClick={() => navigate('/community/history')}
          className="flex items-center justify-center gap-2 text-sm font-bold text-text-secondary hover:text-brand transition-colors py-2"
        >
          <Heart className="w-4 h-4" />
          View My Exchange History
        </button>
      </div>
    </div>
  );
}

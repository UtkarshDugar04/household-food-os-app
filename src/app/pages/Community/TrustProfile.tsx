import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Shield, Award, Clock, Heart, MessageCircle } from 'lucide-react';
import PageHeader from '../../components/core/PageHeader';

export default function TrustProfile() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-bg-base">
      <PageHeader title="Trust Profile" subtitle="Community Verification" backRoute="/community" />

      <div className="px-5 pb-8 pt-4 flex flex-col gap-6">
        <div className="flex flex-col items-center text-center">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-brand-zest-400 to-brand-sage-400 flex items-center justify-center mb-3 border-4 border-bg-elevated shadow-md">
            <span className="text-4xl font-extrabold text-white">RA</span>
          </div>
          <h1 className="text-2xl font-extrabold text-text-primary">Rahul A.</h1>
          <p className="text-sm text-text-secondary mt-1">Joined Jan 2023 · Koramangala</p>
          
          <div className="flex items-center gap-1.5 bg-success-bg border border-success/20 px-3 py-1.5 rounded-pill mt-3">
            <Shield className="w-4 h-4 text-success" />
            <span className="text-sm font-bold text-success">Verified Resident</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-bg-elevated border border-border-subtle rounded-2xl p-4 text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Star className="w-5 h-5 text-warning fill-warning" />
              <span className="text-2xl font-extrabold text-text-primary">4.9</span>
            </div>
            <p className="text-xs font-bold text-text-tertiary">Trust Score</p>
          </div>
          <div className="bg-bg-elevated border border-border-subtle rounded-2xl p-4 text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Heart className="w-5 h-5 text-brand" />
              <span className="text-2xl font-extrabold text-text-primary">42</span>
            </div>
            <p className="text-xs font-bold text-text-tertiary">Exchanges</p>
          </div>
        </div>

        <div>
          <h2 className="text-base font-extrabold text-text-primary mb-3">Community Badges</h2>
          <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
            <div className="flex-shrink-0 w-28 bg-brand-light border border-brand/20 rounded-2xl p-3 flex flex-col items-center text-center">
              <Award className="w-8 h-8 text-brand mb-2" />
              <p className="text-xs font-bold text-brand-dark">Top Sharer</p>
            </div>
            <div className="flex-shrink-0 w-28 bg-brand-sage-50 border border-brand-sage-200 rounded-2xl p-3 flex flex-col items-center text-center">
              <Clock className="w-8 h-8 text-brand-sage-600 mb-2" />
              <p className="text-xs font-bold text-brand-sage-800">Fast Replier</p>
            </div>
            <div className="flex-shrink-0 w-28 bg-brand-sky-50 border border-brand-sky-200 rounded-2xl p-3 flex flex-col items-center text-center">
              <MessageCircle className="w-8 h-8 text-brand-sky-600 mb-2" />
              <p className="text-xs font-bold text-brand-sky-800">Friendly</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-base font-extrabold text-text-primary mb-3">Recent Reviews</h2>
          <div className="flex flex-col gap-3">
            {[
              { name: 'Priya', rating: 5, text: 'Very generous and punctual. Food was perfectly fresh.' },
              { name: 'Karan', rating: 5, text: 'Quick exchange at the gate. Thanks for sharing!' },
            ].map((review, i) => (
              <div key={i} className="bg-bg-elevated border border-border-subtle rounded-2xl p-4">
                <div className="flex justify-between items-start mb-2">
                  <p className="font-bold text-text-primary text-sm">{review.name}</p>
                  <div className="flex">
                    {[1,2,3,4,5].map(s => <Star key={s} className="w-3 h-3 text-warning fill-warning" />)}
                  </div>
                </div>
                <p className="text-xs text-text-secondary leading-relaxed">{review.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

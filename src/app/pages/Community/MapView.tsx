import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Filter, Navigation, Search } from 'lucide-react';

export default function MapView() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-screen bg-[#F0EFEA] relative overflow-hidden">
      {/* --- Realistic Map Background Layers --- */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Base Grid / Blocks */}
        <div className="absolute inset-0 opacity-[0.15]" style={{
          backgroundImage: 'linear-gradient(to right, #9ca3af 1px, transparent 1px), linear-gradient(to bottom, #9ca3af 1px, transparent 1px)',
          backgroundSize: '80px 80px'
        }} />

        {/* Parks / Green Areas */}
        <div className="absolute top-[10%] left-[-10%] w-[60%] h-[40%] bg-[#D5E8D4] rounded-[60px] opacity-70 transform rotate-12 blur-[2px]" />
        <div className="absolute bottom-[20%] right-[-10%] w-[50%] h-[30%] bg-[#D5E8D4] rounded-[40px] opacity-60 transform -rotate-6 blur-[2px]" />

        {/* Water / Rivers */}
        <div className="absolute top-[30%] right-[-20%] w-[80%] h-[40px] bg-[#DAE8FC] opacity-80 transform -rotate-45 blur-[1px]" />
        
        {/* Fake Buildings / Blocks */}
        <div className="absolute top-[20%] left-[30%] w-20 h-32 bg-white rounded-lg shadow-sm transform rotate-12" />
        <div className="absolute top-[25%] left-[55%] w-16 h-16 bg-white rounded-lg shadow-sm transform rotate-12" />
        <div className="absolute top-[50%] left-[20%] w-24 h-20 bg-white rounded-lg shadow-sm transform -rotate-3" />
        <div className="absolute bottom-[40%] right-[30%] w-32 h-24 bg-white rounded-lg shadow-sm transform rotate-6" />
        
        {/* Arterial Roads */}
        <div className="absolute top-0 bottom-0 left-[45%] w-3 bg-[#ffffff] shadow-[0_0_10px_rgba(0,0,0,0.05)] transform rotate-12" />
        <div className="absolute top-[40%] left-[-20%] right-[-20%] h-3 bg-[#ffffff] shadow-[0_0_10px_rgba(0,0,0,0.05)] transform -rotate-6" />
      </div>

      {/* --- UI Overlays --- */}
      {/* Header Search & Actions */}
      <div className="absolute top-0 inset-x-0 pt-12 px-5 z-20 flex gap-3 pointer-events-none">
        <button onClick={() => navigate(-1)} className="w-11 h-11 rounded-full bg-white shadow-md flex items-center justify-center pointer-events-auto active:scale-95 transition-transform">
          <ChevronLeft className="w-6 h-6 text-text-primary" />
        </button>
        <div className="flex-1 bg-white rounded-xl shadow-md flex items-center px-4 gap-2 pointer-events-auto border border-border-subtle">
          <Search className="w-4 h-4 text-text-tertiary" />
          <span className="font-bold text-sm text-text-secondary truncate">Koramangala, Bangalore</span>
        </div>
        <button className="w-11 h-11 rounded-full bg-white shadow-md flex items-center justify-center pointer-events-auto active:scale-95 transition-transform text-text-primary">
          <Filter className="w-5 h-5" />
        </button>
      </div>

      {/* --- Interactive Map Pins --- */}
      {/* Offer Pin 1 */}
      <button onClick={() => navigate('/community/listing')} className="absolute top-[35%] left-[25%] group z-10">
        <div className="w-12 h-12 bg-success text-white rounded-full flex items-center justify-center shadow-lg border-[3px] border-white group-hover:scale-110 transition-transform relative">
          <span className="text-xl">🍅</span>
          <div className="absolute -bottom-1.5 w-3 h-3 bg-success rotate-45 border-r-[3px] border-b-[3px] border-white z-[-1]" />
        </div>
      </button>

      {/* Offer Pin 2 */}
      <button onClick={() => navigate('/community/listing')} className="absolute top-[50%] right-[30%] group z-10">
        <div className="w-12 h-12 bg-success text-white rounded-full flex items-center justify-center shadow-lg border-[3px] border-white group-hover:scale-110 transition-transform relative">
          <span className="text-xl">🍞</span>
          <div className="absolute -bottom-1.5 w-3 h-3 bg-success rotate-45 border-r-[3px] border-b-[3px] border-white z-[-1]" />
        </div>
      </button>

      {/* Request Pin */}
      <button onClick={() => navigate('/community/listing')} className="absolute bottom-[45%] left-[40%] group z-10">
        <div className="w-12 h-12 bg-info text-white rounded-full flex items-center justify-center shadow-lg border-[3px] border-white group-hover:scale-110 transition-transform relative">
          <span className="text-xl">🥛</span>
          <div className="absolute -bottom-1.5 w-3 h-3 bg-info rotate-45 border-r-[3px] border-b-[3px] border-white z-[-1]" />
        </div>
      </button>

      {/* My Location indicator */}
      <div className="absolute top-[60%] left-[55%] z-10 flex flex-col items-center pointer-events-none">
        <div className="w-16 h-16 bg-brand/20 rounded-full animate-ping absolute" />
        <div className="w-6 h-6 bg-brand rounded-full border-[3px] border-white shadow-md relative z-10 flex items-center justify-center">
          <div className="w-2 h-2 bg-white rounded-full" />
        </div>
      </div>

      {/* --- Bottom Sheet --- */}
      <div className="absolute bottom-0 inset-x-0 bg-bg-base rounded-t-[32px] shadow-[0_-8px_30px_rgba(0,0,0,0.12)] z-30 pb-safe transition-transform duration-300 transform translate-y-0">
        <div className="w-12 h-1.5 bg-border-strong rounded-full mx-auto mt-3 mb-5 opacity-50" />
        <div className="px-5 pb-6">
          <div className="flex justify-between items-end mb-4">
            <div>
              <h2 className="text-xl font-extrabold text-text-primary tracking-tight">Nearby Activity</h2>
              <p className="text-sm font-medium text-text-secondary mt-0.5">4 offers · 2 requests within 2km</p>
            </div>
            <button className="w-11 h-11 rounded-full bg-brand-light flex items-center justify-center text-brand active:scale-95 transition-transform">
              <Navigation className="w-5 h-5 fill-current" />
            </button>
          </div>
          
          <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 -mx-5 px-5">
            {[
              { emoji: '🍅', title: 'Fresh Tomatoes', dist: '0.4 km', type: 'offer', time: 'Active now' },
              { emoji: '🍞', title: 'Sourdough Bread', dist: '0.8 km', type: 'offer', time: 'Added 2h ago' },
              { emoji: '🥛', title: 'Need Milk', dist: '1.2 km', type: 'request', time: 'Needed today' },
            ].map((item, i) => (
              <button key={i} onClick={() => navigate('/community/listing')} className={`flex-shrink-0 w-56 rounded-2xl p-3.5 border text-left flex gap-3.5 shadow-sm active:scale-[0.98] transition-all ${
                item.type === 'offer' ? 'bg-success-bg/40 border-success/20' : 'bg-info-bg/40 border-info/20'
              }`}>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 ${item.type === 'offer' ? 'bg-success-bg' : 'bg-info-bg'}`}>
                  {item.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-extrabold text-text-primary text-sm truncate">{item.title}</p>
                  <p className="text-xs font-bold text-text-secondary mt-0.5">{item.dist}</p>
                  <p className="text-[10px] font-semibold text-text-tertiary mt-1">{item.time}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

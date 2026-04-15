import React, { useState, useEffect } from 'react';

const SidebarAd = ({ index = 0 }) => {
  const [ad, setAd] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSidebarAd();
  }, [index]);

  const fetchSidebarAd = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_URL}/ads/active?placement=sidebar`);
      const data = await response.json();
      
      if (data.success && data.data.ads && data.data.ads.length > index) {
        // Get the active sidebar ad at the specified index
        setAd(data.data.ads[index]);
      } else {
        setAd(null);
      }
    } catch (err) {
      console.error('Error fetching sidebar ad:', err);
      setError('Failed to load advertisement');
      setAd(null);
    } finally {
      setLoading(false);
    }
  };

  const handleClick = () => {
    if (ad && ad.redirect_url) {
      window.open(ad.redirect_url, '_blank', 'noopener,noreferrer');
    }
  };

  if (loading) {
    return (
      <div className="w-full bg-brand-gray-dark border border-brand-gray-medium rounded-lg p-4 animate-pulse">
        <div className="flex flex-col items-center justify-center py-20 space-y-4">
          <div className="w-full h-40 bg-brand-gray-medium rounded opacity-20"></div>
          <div className="w-2/3 h-4 bg-brand-gray-medium rounded opacity-20"></div>
        </div>
      </div>
    );
  }

  // If no ad or error, show a subtle branded placeholder instead of nothing
  if (!ad || error) {
    return (
      <div className="bg-brand-gray-dark border border-brand-gray-medium p-4 rounded-lg sticky top-24">
        <div className="text-brand-gray text-sm text-center py-20 border-2 border-dashed border-brand-gray-medium rounded opacity-50">
          <div className="flex flex-col items-center gap-2">
            <span className="text-lg font-bold text-brand-white opacity-40">टॉप न्यूज मराठी</span>
            <span className="text-xs">जाहिरातीसाठी जागा</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-brand-gray-dark border border-brand-gray-medium p-4 rounded-lg sticky top-24 shadow-xl overflow-hidden group">
      {/* Advertisement Label */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-brand-yellow text-[10px] font-bold uppercase tracking-widest opacity-80 border-b border-brand-yellow pb-0.5">
          Advertisement
        </span>
        <span className="text-gray-500 text-[10px] italic opacity-60">jaahiraat</span>
      </div>
      
      {/* Ad Content */}
      <div 
        className={`relative overflow-hidden rounded-lg cursor-pointer transition-transform duration-300 group-hover:scale-[1.02] ${ad.redirect_url ? '' : 'cursor-default'}`}
        onClick={handleClick}
        role={ad.redirect_url ? 'button' : undefined}
        tabIndex={ad.redirect_url ? 0 : undefined}
        onKeyPress={(e) => {
          if (e.key === 'Enter' && ad.redirect_url) {
            handleClick();
          }
        }}
      >
        <div className="border border-brand-yellow/30 rounded-lg p-1 group-hover:border-brand-yellow/60 transition-colors">
          {ad.type === 'image' ? (
            <img
              src={ad.media_url}
              alt={ad.title}
              className="w-full h-auto min-h-[250px] object-cover rounded shadow-inner"
              loading="lazy"
            />
          ) : (
            <video
              src={ad.media_url}
              className="w-full h-auto min-h-[250px] object-cover rounded shadow-inner"
              autoPlay
              muted
              loop
              playsInline
            />
          )}
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none flex items-end p-4">
          <p className="text-white text-xs font-medium truncate">{ad.title}</p>
        </div>
      </div>

      {/* Footer text */}
      <div className="mt-3 text-center">
        <p className="text-brand-gray text-[10px] italic opacity-40">
          - Top News Marathi Ads -
        </p>
      </div>
    </div>
  );
};

export default SidebarAd;

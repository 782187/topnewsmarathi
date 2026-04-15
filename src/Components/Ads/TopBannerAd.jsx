import React, { useState, useEffect } from 'react';

const TopBannerAd = () => {
  const [ad, setAd] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTopBannerAd();
  }, []);

  const fetchTopBannerAd = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_URL}/ads/active?placement=top_banner`);
      const data = await response.json();
      
      if (data.success && data.data.ads && data.data.ads.length > 0) {
        setAd(data.data.ads[0]);
      } else {
        setAd(null);
      }
    } catch (err) {
      console.error('Error fetching top banner ad:', err);
      setError('Failed to load advertisement');
      setAd(null);
    } finally {
      setLoading(false);
    }
  };

  // Don't render anything if loading, error, or no ad
  if (loading) {
    return null;
  }

  if (error) {
    return null;
  }

  if (!ad) {
    return null;
  }

  const handleClick = () => {
    if (ad.redirect_url) {
      window.open(ad.redirect_url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="w-full bg-brand-black">
      <div 
        className={`w-full max-w-screen-2xl mx-auto px-4 py-1 ${ad.redirect_url ? 'cursor-pointer' : ''}`}
        onClick={handleClick}
        role={ad.redirect_url ? 'button' : undefined}
        tabIndex={ad.redirect_url ? 0 : undefined}
        onKeyPress={(e) => {
          if (e.key === 'Enter' && ad.redirect_url) {
            handleClick();
          }
        }}
      >
        {/* Advertisement Label */}
        <div className="flex items-center justify-center mb-0.5">
          <span className="text-gray-400 text-[10px] font-medium tracking-wide opacity-60 blur-sm">
            - {ad.title || 'jaahiraat'} -
          </span>
        </div>
        
        {/* Ad Content with Dashed Border */}
        <div className="border border-dashed border-brand-gray-medium opacity-40 rounded p-0.5">
          {ad.type === 'image' ? (
            <img
              src={ad.media_url}
              alt={ad.title}
              className="w-full h-auto max-h-16 object-contain rounded"
              loading="lazy"
            />
          ) : (
            <video
              src={ad.media_url}
              className="w-full h-auto max-h-16 object-contain rounded"
              autoPlay
              muted
              loop
              playsInline
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TopBannerAd;

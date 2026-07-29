import React, { useState, useEffect, useRef } from 'react';
import { buildStaticUrl } from '../../utils/staticUrl';

/**
 * EpaperAd — a right-side advertisement panel for the e-paper pages.
 * Fetches active sidebar ads and rotates through them every ROTATE_MS.
 * Shows a branded placeholder when no ads are available.
 */
const ROTATE_MS = 8000;

const EpaperAd = () => {
  const [ads, setAds] = useState([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const timerRef = useRef(null);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/ads/active?placement=sidebar`
        );
        const json = await res.json();
        if (json.success && Array.isArray(json.data.ads)) {
          setAds(json.data.ads);
        }
      } catch (err) {
        console.error('EpaperAd: failed to fetch ads', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAds();
  }, []);

  // Rotate through ads automatically
  useEffect(() => {
    if (ads.length <= 1) return;
    timerRef.current = setInterval(
      () => setIndex((i) => (i + 1) % ads.length),
      ROTATE_MS
    );
    return () => clearInterval(timerRef.current);
  }, [ads]);

  const ad = ads[index] ?? null;

  const mediaUrl = ad?.media_url
    ? ad.media_url.startsWith('http')
      ? ad.media_url
      : buildStaticUrl(ad.media_url)
    : null;

  const handleClick = () => {
    if (ad?.redirect_url) {
      window.open(ad.redirect_url, '_blank', 'noopener,noreferrer');
    }
  };

  /* ── Skeleton while loading ── */
  if (loading) {
    return (
      <div className="w-full rounded-xl border border-brand-gray-medium bg-brand-gray-dark animate-pulse overflow-hidden">
        <div className="h-4 w-24 bg-brand-gray-medium rounded mx-auto mt-3 mb-2 opacity-30" />
        <div className="h-56 bg-brand-gray-medium opacity-20" />
        <div className="h-3 w-32 bg-brand-gray-medium rounded mx-auto mt-3 mb-3 opacity-20" />
      </div>
    );
  }

  /* ── Placeholder when no active ads ── */
  if (!ad) {
    return (
      <div className="w-full rounded-xl border border-dashed border-brand-gray-medium bg-brand-gray-dark/60 p-4 flex flex-col items-center justify-center gap-2 min-h-[200px]">
        <span className="text-brand-white/30 font-bold text-sm">टॉप न्यूज मराठी</span>
        <span className="text-brand-gray/50 text-[11px]">जाहिरातीसाठी जागा</span>
      </div>
    );
  }

  /* ── Live ad ── */
  return (
    <div className="w-full rounded-xl border border-brand-gray-medium bg-brand-gray-dark shadow-xl overflow-hidden group">
      {/* Label row */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-brand-gray-medium/50">
        <span className="text-[10px] font-bold uppercase tracking-widest text-[color:var(--brand-yellow)] opacity-80">
          जाहिरात
        </span>
        {ads.length > 1 && (
          <div className="flex gap-1">
            {ads.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`w-1.5 h-1.5 rounded-full transition-colors ${
                  i === index ? 'bg-[color:var(--brand-yellow)]' : 'bg-brand-gray-medium hover:bg-brand-gray'
                }`}
                aria-label={`जाहिरात ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Media */}
      <div
        className={`relative overflow-hidden transition-transform duration-300 group-hover:scale-[1.01] ${
          ad.redirect_url ? 'cursor-pointer' : ''
        }`}
        onClick={handleClick}
        role={ad.redirect_url ? 'button' : undefined}
        tabIndex={ad.redirect_url ? 0 : undefined}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && ad.redirect_url) handleClick();
        }}
      >
        <div className="border border-[color:var(--brand-yellow)]/20 group-hover:border-[color:var(--brand-yellow)]/50 transition-colors m-2 rounded-lg overflow-hidden">
          {ad.type === 'video' ? (
            <video
              key={mediaUrl}
              src={mediaUrl}
              className="w-full h-auto object-cover"
              autoPlay
              muted
              loop
              playsInline
            />
          ) : (
            <img
              key={mediaUrl}
              src={mediaUrl}
              alt={ad.title}
              className="w-full h-auto object-cover"
              loading="lazy"
            />
          )}
        </div>

        {/* Hover overlay with title */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none flex items-end p-4">
          <p className="text-white text-xs font-medium truncate">{ad.title}</p>
        </div>
      </div>

      {/* Footer */}
      <p className="text-center text-[10px] text-brand-gray/40 italic pb-2">
        — Top News Marathi Ads —
      </p>
    </div>
  );
};

export default EpaperAd;

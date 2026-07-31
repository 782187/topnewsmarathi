import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ZoomIn, ZoomOut, Download, Share2, Copy } from 'lucide-react';
import { buildStaticUrl } from '../utils/staticUrl';

const MIN_SCALE = 0.6;
const MAX_SCALE = 3;

// "Open that section only" — shows JUST the cropped section image (like Lokmat's
// article clip). No title/date/prev-next chrome; only the image + essential
// controls (back, zoom, download, share) on its own URL.
const EpaperArticleView = () => {
  const { editionSlug, date, slug } = useParams();

  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    let active = true;
    const fetchArticle = async () => {
      setLoading(true);
      setError(null);
      setScale(1);
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/epaper-articles/slug/${slug}`);
        const json = await res.json();
        if (!active) return;
        if (json.success) setArticle(json.data.article);
        else setError('बातमी आढळली नाही');
      } catch (err) {
        console.error('Failed to fetch section', err);
        if (active) setError('बातमी मिळवण्यात अयशस्वी');
      } finally {
        if (active) setLoading(false);
      }
    };
    fetchArticle();
    return () => { active = false; };
  }, [slug]);

  const zoomIn = () => setScale((s) => Math.min(MAX_SCALE, +(s + 0.2).toFixed(2)));
  const zoomOut = () => setScale((s) => Math.max(MIN_SCALE, +(s - 0.2).toFixed(2)));

  const shareWhatsApp = () => {
    const text = `${article?.title || 'ई-पेपर बातमी'} — ${window.location.href}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
    } catch {
      /* clipboard unavailable — no-op */
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--brand-black)] w-full flex items-center justify-center">
        <div className="text-brand-white text-xl animate-pulse">बातमी लोड होत आहे...</div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-[var(--brand-black)] w-full flex flex-col items-center justify-center gap-4 px-4 text-center">
        <p className="text-brand-white text-xl">{error || 'बातमी आढळली नाही'}</p>
        <Link to={`/epaper/${editionSlug}/${date}`} className="bg-[var(--brand-red)] text-brand-white px-5 py-2 rounded-lg font-bold hover:bg-[var(--brand-red-dark)] transition-colors">
          पृष्ठाकडे परत जा
        </Link>
      </div>
    );
  }

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString('mr-IN', { year: 'numeric', month: 'long', day: 'numeric' });

  const imageUrl = buildStaticUrl(article.image_url);

  return (
    <div className="min-h-screen bg-[var(--brand-black)] w-full" lang="mr">
      {/* Minimal toolbar — back + image controls only */}
      <div className="sticky top-16 z-30 bg-brand-gray-dark border-b border-brand-gray-medium">
        <div className="max-w-screen-xl mx-auto px-3 sm:px-6 py-2.5 flex items-center justify-between gap-3">
          <Link
            to={`/epaper/${editionSlug}/${date}`}
            className="text-brand-white hover:text-[color:var(--brand-yellow)] transition-colors flex items-center gap-2 flex-shrink-0"
            aria-label="पृष्ठाकडे परत जा"
          >
            <ArrowLeft size={20} />
            <span className="text-sm font-medium hidden sm:inline">पृष्ठाकडे परत</span>
          </Link>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-[var(--brand-black)] rounded-lg px-1 py-1 border border-brand-gray-medium">
              <button onClick={zoomOut} disabled={scale <= MIN_SCALE} className="p-1.5 text-brand-white hover:text-[color:var(--brand-yellow)] disabled:opacity-30 transition-colors" aria-label="झूम कमी करा">
                <ZoomOut size={18} />
              </button>
              <span className="text-brand-gray text-xs w-10 text-center">{Math.round(scale * 100)}%</span>
              <button onClick={zoomIn} disabled={scale >= MAX_SCALE} className="p-1.5 text-brand-white hover:text-[color:var(--brand-yellow)] disabled:opacity-30 transition-colors" aria-label="झूम वाढवा">
                <ZoomIn size={18} />
              </button>
            </div>
            <button onClick={shareWhatsApp} className="p-2 bg-brand-gray-dark border border-brand-gray-medium hover:border-[color:var(--brand-yellow)] text-brand-white rounded-lg transition-colors" aria-label="व्हॉट्सअॅपवर शेअर करा">
              <Share2 size={18} />
            </button>
            <button onClick={copyLink} className="p-2 bg-brand-gray-dark border border-brand-gray-medium hover:border-[color:var(--brand-yellow)] text-brand-white rounded-lg transition-colors" aria-label="लिंक कॉपी करा">
              <Copy size={18} />
            </button>
            <a
              href={imageUrl}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-[var(--brand-red)] hover:bg-[var(--brand-red-dark)] text-brand-white rounded-lg transition-colors"
              aria-label="प्रतिमा डाउनलोड करा"
            >
              <Download size={18} />
            </a>
          </div>
        </div>
      </div>

      {/* Section image only */}
      <div className="max-w-2xl mx-auto w-full px-3 sm:px-6 py-5 sm:py-8">
        <div className="w-full overflow-auto flex flex-col items-center gap-4 sm:gap-6">
          {/* Logo above the paper */}
          <div className="flex justify-center w-full">
            <img 
              src="/logo.png" 
              alt="Top News Marathi" 
              className="h-8 sm:h-10 md:h-12 object-contain"
            />
          </div>

          <img
            src={imageUrl}
            alt={article.title || 'बातमी'}
            style={{ width: `${Math.round(scale * 100)}%`, maxWidth: scale <= 1 ? 600 : 'none' }}
            className="h-auto rounded-lg shadow-2xl bg-white block"
          />

          {/* Date below the paper */}
          <div className="flex justify-center w-full text-brand-gray text-sm sm:text-base font-medium tracking-wide">
            {formatDate(date)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EpaperArticleView;

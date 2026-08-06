import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ZoomIn, ZoomOut, Download, Share2, Copy, CheckCheck, Loader2 } from 'lucide-react';
import { buildStaticUrl } from '../utils/staticUrl';

const MIN_SCALE = 0.6;
const MAX_SCALE = 3;

// Padding (px) added around the article crop in the downloaded image.
const DOWNLOAD_PADDING = 24;

/**
 * Loads an <img> element from a URL with crossOrigin="anonymous" so the
 * Canvas API can read pixels from cross-origin sources (provided the backend
 * sends Access-Control-Allow-Origin: * on uploads).
 */
const loadImage = (src) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    img.src = src;
  });

/**
 * Composites logo + article image on a canvas and triggers a real JPEG download.
 *
 * Layout (top → bottom, white background):
 *   ┌──────────────────────────────┐
 *   │       24px padding           │
 *   │   [ Top News Marathi logo ]  │  ← 60% of image width
 *   │       24px padding           │
 *   │   ─── 3px red divider ───    │  ← brand red #B30000
 *   │   article crop image         │  ← full natural resolution
 *   │       24px padding           │
 *   └──────────────────────────────┘
 */
const downloadArticleWithLogo = async (articleImageUrl, logoUrl, filename) => {
  const [articleImg, logoImg] = await Promise.all([
    loadImage(articleImageUrl),
    loadImage(logoUrl),
  ]);

  const artW = articleImg.naturalWidth;
  const artH = articleImg.naturalHeight;

  // Logo scaled to 60% of canvas width.
  const logoDrawW = Math.round(artW * 0.60);
  const logoDrawH = Math.round(logoImg.naturalHeight * (logoDrawW / logoImg.naturalWidth));

  const P = DOWNLOAD_PADDING;
  const dividerH = 3;

  const canvasW = artW + P * 2;
  const canvasH = P + logoDrawH + P + dividerH + artH + P;

  const canvas = document.createElement('canvas');
  canvas.width = canvasW;
  canvas.height = canvasH;
  const ctx = canvas.getContext('2d');

  // White background.
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, canvasW, canvasH);

  // Logo — centred horizontally.
  ctx.drawImage(logoImg, Math.round((canvasW - logoDrawW) / 2), P, logoDrawW, logoDrawH);

  // Red divider.
  const dividerY = P + logoDrawH + P;
  ctx.fillStyle = '#B30000';
  ctx.fillRect(P, dividerY, artW, dividerH);

  // Article crop — left-aligned with padding.
  ctx.drawImage(articleImg, P, dividerY + dividerH, artW, artH);

  // Trigger browser download.
  canvas.toBlob(
    (blob) => {
      if (!blob) throw new Error('Canvas toBlob returned null');
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    },
    'image/jpeg',
    0.92,
  );
};

// "Open that section only" — shows JUST the cropped section image (like Lokmat's
// article clip). No title/date/prev-next chrome; only the image + essential
// controls (back, zoom, download, share) on its own URL.
const EpaperArticleView = () => {
  const { editionSlug, date, slug } = useParams();

  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [scale, setScale] = useState(1);

  // Download state
  const [downloading, setDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState(null);

  // Copy-link feedback
  const [copied, setCopied] = useState(false);

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

  const copyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable — no-op */
    }
  }, []);

  /**
   * Canvas-based download — composites the logo on top of the article crop
   * and saves the result as a JPEG. Works cross-origin (unlike <a download>).
   * Requires the backend to serve uploads with Access-Control-Allow-Origin: *.
   */
  const handleDownload = useCallback(async () => {
    if (!article || downloading) return;
    setDownloading(true);
    setDownloadError(null);
    try {
      const articleImageUrl = buildStaticUrl(article.image_url);
      // Logo is same-origin (/public) — no CORS issues.
      const logoUrl = `${window.location.origin}/logotop.jpeg`;
      const safeTitle = (article.title || 'epaper-article')
        .replace(/[^\w\u0900-\u097F\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-')
        .slice(0, 60);
      await downloadArticleWithLogo(articleImageUrl, logoUrl, `${safeTitle}.jpg`);
    } catch (err) {
      console.error('Download failed:', err);
      setDownloadError('डाउनलोड अयशस्वी. पुन्हा प्रयत्न करा.');
      setTimeout(() => setDownloadError(null), 4000);
    } finally {
      setDownloading(false);
    }
  }, [article, downloading]);

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
            {/* Zoom controls */}
            <div className="flex items-center gap-1 bg-[var(--brand-black)] rounded-lg px-1 py-1 border border-brand-gray-medium">
              <button
                onClick={zoomOut}
                disabled={scale <= MIN_SCALE}
                className="p-1.5 text-brand-white hover:text-[color:var(--brand-yellow)] disabled:opacity-30 transition-colors"
                aria-label="झूम कमी करा"
              >
                <ZoomOut size={18} />
              </button>
              <span className="text-brand-gray text-xs w-10 text-center">{Math.round(scale * 100)}%</span>
              <button
                onClick={zoomIn}
                disabled={scale >= MAX_SCALE}
                className="p-1.5 text-brand-white hover:text-[color:var(--brand-yellow)] disabled:opacity-30 transition-colors"
                aria-label="झूम वाढवा"
              >
                <ZoomIn size={18} />
              </button>
            </div>

            {/* WhatsApp share */}
            <button
              onClick={shareWhatsApp}
              className="p-2 bg-brand-gray-dark border border-brand-gray-medium hover:border-[color:var(--brand-yellow)] text-brand-white rounded-lg transition-colors"
              aria-label="व्हॉट्सअॅपवर शेअर करा"
            >
              <Share2 size={18} />
            </button>

            {/* Copy link — turns yellow with tick on success */}
            <button
              onClick={copyLink}
              className={`p-2 bg-brand-gray-dark border rounded-lg transition-colors ${
                copied
                  ? 'border-[color:var(--brand-yellow)] text-[color:var(--brand-yellow)]'
                  : 'border-brand-gray-medium hover:border-[color:var(--brand-yellow)] text-brand-white'
              }`}
              aria-label={copied ? 'लिंक कॉपी झाली' : 'लिंक कॉपी करा'}
            >
              {copied ? <CheckCheck size={18} /> : <Copy size={18} />}
            </button>

            {/* Download — canvas composite with logo; spinner while compositing */}
            <button
              onClick={handleDownload}
              disabled={downloading}
              className={`p-2 rounded-lg transition-colors ${
                downloading
                  ? 'bg-[var(--brand-red-dark)] text-brand-white opacity-70 cursor-not-allowed'
                  : 'bg-[var(--brand-red)] hover:bg-[var(--brand-red-dark)] text-brand-white'
              }`}
              aria-label={downloading ? 'डाउनलोड होत आहे...' : 'लोगोसह प्रतिमा डाउनलोड करा'}
              title={downloading ? 'डाउनलोड होत आहे...' : 'लोगोसह डाउनलोड करा'}
            >
              {downloading
                ? <Loader2 size={18} className="animate-spin" />
                : <Download size={18} />
              }
            </button>
          </div>
        </div>

        {/* Inline error toast — displayed below the toolbar for 4 s on failure */}
        {downloadError && (
          <div className="bg-[var(--brand-red-darker)] text-brand-white text-xs text-center py-1.5 px-4 animate-pulse">
            ⚠️ {downloadError}
          </div>
        )}
      </div>

      {/* Section image only */}
      <div className="max-w-2xl mx-auto w-full px-3 sm:px-6 py-5 sm:py-8">
        <div className="w-full overflow-auto flex flex-col items-center gap-4 sm:gap-6">

          <div
            className="flex flex-col bg-white shadow-2xl w-full rounded-lg overflow-hidden"
            style={{ width: `${Math.round(scale * 100)}%`, maxWidth: scale <= 1 ? '100%' : 'none' }}
          >
            {/* Logo — red bottom border matches what appears in the download */}
            <div className="flex justify-center w-full py-3 border-b-2 border-[#B30000]">
              <img
                src="/logotop.jpeg"
                alt="Top News Marathi"
                className="h-12 sm:h-16 md:h-20 object-contain"
              />
            </div>

            <img
              src={imageUrl}
              alt={article.title || 'बातमी'}
              className="w-full h-auto block"
            />
          </div>

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

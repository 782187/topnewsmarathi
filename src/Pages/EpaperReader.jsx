import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Document, Page } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Download, Calendar, ArrowLeft } from 'lucide-react';
import '../utils/pdfWorker';
import { buildStaticUrl } from '../utils/staticUrl';
import EpaperImageReader from './EpaperImageReader';

const MIN_SCALE = 0.6;
const MAX_SCALE = 2.5;

// Newspaper pages are dense, so render the canvas at a higher internal resolution
// than its on-screen size (supersampling) and let the browser downscale it. Without
// this react-pdf falls back to window.devicePixelRatio (1 on most desktops), which
// rasterizes the whole broadsheet at its shrunk display size and looks blurry.
// Capped at 3x to keep canvas memory in check.
const RENDER_DPR =
  typeof window !== 'undefined' ? Math.max(3, (window.devicePixelRatio || 1) + 1) : 3;

const EpaperReader = () => {
  const { editionSlug, date } = useParams();
  const navigate = useNavigate();
  const containerRef = useRef(null);

  // Track the last edition+date key that was successfully fetched so we can
  // skip the null-reset when the user navigates *back* to the same issue
  // (e.g. after viewing an article section). Without this, every remount
  // unconditionally set pageImages to null → caused a visible loading-pulse
  // blink even though the data was identical to what was just shown.
  const loadedKeyRef = useRef(null);

  const [epaper, setEpaper] = useState(null);
  const [archive, setArchive] = useState([]);
  const [pageImages, setPageImages] = useState(null); // null = not fetched yet; [] = none (use PDF fallback)
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1);
  const [containerWidth, setContainerWidth] = useState(600);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pdfLoadError, setPdfLoadError] = useState(null);
  const [pdfRetryKey, setPdfRetryKey] = useState(0);

  useEffect(() => {
    const key = `${editionSlug}__${date}`;
    const isSameIssue = loadedKeyRef.current === key;

    // Only flash the loading screen when switching to a genuinely different
    // edition or date. Back-navigation to the same issue keeps the already-
    // rendered images visible, so there is no blink.
    if (!isSameIssue) {
      setPageImages(null);
      loadedKeyRef.current = key;
    }

    fetchEpaper();
    fetchArchive();
    fetchPages();

    // Only reset to page 1 when switching issues, not on a mere remount.
    if (!isSameIssue) setPageNumber(1);
  }, [editionSlug, date]);

  const measure = useCallback(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth);
    }
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [measure]);

  // The main column lives inside <Document>, so it only mounts once the PDF has
  // finished loading. Re-measure then so the page renders at the true width of the
  // center column (which is narrower than the viewport once the thumbnail rail shows).
  useEffect(() => {
    measure();
  }, [numPages, measure]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') goToNextPage();
      if (e.key === 'ArrowLeft') goToPrevPage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber, numPages]);

  const fetchEpaper = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${import.meta.env.VITE_API_URL}/epapers/edition/${editionSlug}/${date}`);
      const data = await response.json();
      if (data.success) {
        setEpaper(data.data.epaper);
      } else {
        setError('या तारखेसाठी ई-पेपर आढळला नाही');
      }
    } catch (err) {
      console.error('Failed to fetch e-paper', err);
      setError('ई-पेपर मिळवण्यात अयशस्वी');
    } finally {
      setLoading(false);
    }
  };

  const fetchArchive = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/epapers/edition/${editionSlug}/archive?limit=30`);
      const data = await response.json();
      if (data.success) {
        setArchive(data.data.issues);
      }
    } catch (err) {
      console.error('Failed to fetch e-paper archive', err);
    }
  };

  // Fetch server-rendered page images. When present, the issue is shown with the
  // image-based reader; on any failure/empty result we fall back to the PDF reader.
  const fetchPages = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/epapers/edition/${editionSlug}/${date}/pages`);
      const data = await response.json();
      setPageImages(data.success && Array.isArray(data.data.pages) ? data.data.pages : []);
    } catch (err) {
      console.error('Failed to fetch e-paper pages', err);
      setPageImages([]); // fall back to PDF reader
    }
  };

  const onDocumentLoadSuccess = ({ numPages: n }) => {
    setPdfLoadError(null);
    setNumPages(n);
  };

  // react-pdf's `error` render prop has no access to the actual failure reason,
  // so it's logged here for real debugging instead of just showing a dead end.
  const onDocumentLoadError = (err) => {
    console.error('E-paper PDF failed to load:', epaper && buildStaticUrl(epaper.pdf_url), err);
    setPdfLoadError(err?.message || 'Unknown error');
  };

  const retryPdfLoad = () => {
    setPdfLoadError(null);
    setPdfRetryKey((k) => k + 1);
  };

  const goToPrevPage = useCallback(() => setPageNumber((p) => Math.max(1, p - 1)), []);
  const goToNextPage = useCallback(() => setPageNumber((p) => (numPages ? Math.min(numPages, p + 1) : p)), [numPages]);
  const zoomIn = () => setScale((s) => Math.min(MAX_SCALE, +(s + 0.2).toFixed(2)));
  const zoomOut = () => setScale((s) => Math.max(MIN_SCALE, +(s - 0.2).toFixed(2)));

  const handleDateChange = (e) => {
    const newDate = e.target.value;
    if (newDate) navigate(`/epaper/${editionSlug}/${newDate}`);
  };

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString('mr-IN', { year: 'numeric', month: 'long', day: 'numeric' });

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--brand-black)] w-full flex items-center justify-center">
        <div className="text-brand-white text-xl animate-pulse">ई-पेपर लोड होत आहे...</div>
      </div>
    );
  }

  if (error || !epaper) {
    return (
      <div className="min-h-screen bg-[var(--brand-black)] w-full flex flex-col items-center justify-center gap-4 px-4 text-center">
        <p className="text-brand-white text-xl">{error || 'ई-पेपर आढळला नाही'}</p>
        <Link to="/epaper" className="bg-[var(--brand-red)] text-brand-white px-5 py-2 rounded-lg font-bold hover:bg-[var(--brand-red-dark)] transition-colors">
          सर्व आवृत्त्या पहा
        </Link>
      </div>
    );
  }

  // Preferred path: server-rendered page images exist → use the image reader.
  if (pageImages && pageImages.length > 0) {
    return (
      <EpaperImageReader
        epaper={epaper}
        pages={pageImages}
        archive={archive}
        editionSlug={editionSlug}
        date={date}
      />
    );
  }

  // Page images not resolved yet — hold rather than briefly flashing the PDF reader.
  if (pageImages === null) {
    return (
      <div className="min-h-screen bg-[var(--brand-black)] w-full flex items-center justify-center">
        <div className="text-brand-white text-xl animate-pulse">ई-पेपर लोड होत आहे...</div>
      </div>
    );
  }

  // Fallback path (pages === []): older/unrendered issues keep the PDF reader below.
  const pdfUrl = buildStaticUrl(epaper.pdf_url);
  // The main <Page> fills the width of the center column (measured live), so it
  // stays as large as possible whether or not the thumbnail rail is showing.
  const baseWidth = containerWidth;
  const pages = numPages ? Array.from({ length: numPages }, (_, i) => i + 1) : [];

  return (
    <div className="min-h-screen bg-[var(--brand-black)] w-full" lang="mr">
      {/* Top control bar — edition, archive date picker, zoom, download */}
      <div className="sticky top-16 z-30 bg-brand-gray-dark border-b border-brand-gray-medium">
        <div className="max-w-screen-2xl mx-auto px-3 sm:px-6 py-2.5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <Link
              to="/epaper"
              className="text-brand-white hover:text-[color:var(--brand-yellow)] transition-colors flex-shrink-0"
              aria-label="ई-पेपर सूचीकडे परत जा"
            >
              <ArrowLeft size={20} />
            </Link>
            <div className="min-w-0">
              <h1 className="text-brand-white font-bold truncate leading-tight">{epaper.edition_name}</h1>
              <p className="text-brand-gray text-xs truncate">{formatDate(epaper.publish_date)}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap justify-end">
            {/* Date picker (archive) */}
            <div className="relative flex items-center gap-1 bg-[var(--brand-black)] rounded-lg px-2 py-1.5 border border-brand-gray-medium">
              <Calendar size={16} className="text-[color:var(--brand-yellow)] flex-shrink-0" />
              <select
                value={epaper.publish_date.slice(0, 10)}
                onChange={handleDateChange}
                className="bg-transparent text-brand-white text-sm outline-none max-w-[110px]"
              >
                {archive.map((issue) => (
                  <option key={issue.id} value={issue.publish_date.slice(0, 10)} className="bg-[var(--brand-black)]">
                    {issue.publish_date.slice(0, 10)}
                  </option>
                ))}
              </select>
            </div>

            {/* Zoom controls */}
            <div className="flex items-center gap-1 bg-[var(--brand-black)] rounded-lg px-1 py-1 border border-brand-gray-medium">
              <button onClick={zoomOut} disabled={scale <= MIN_SCALE} className="p-1.5 text-brand-white hover:text-[color:var(--brand-yellow)] disabled:opacity-30 transition-colors" aria-label="झूम कमी करा">
                <ZoomOut size={18} />
              </button>
              <span className="text-brand-gray text-xs w-10 text-center">{Math.round(scale * 100)}%</span>
              <button onClick={zoomIn} disabled={scale >= MAX_SCALE} className="p-1.5 text-brand-white hover:text-[color:var(--brand-yellow)] disabled:opacity-30 transition-colors" aria-label="झूम वाढवा">
                <ZoomIn size={18} />
              </button>
            </div>

            {/* Download */}
            <a
              href={pdfUrl}
              download
              className="p-2 bg-[var(--brand-red)] hover:bg-[var(--brand-red-dark)] text-brand-white rounded-lg transition-colors"
              aria-label="पीडीएफ डाउनलोड करा"
            >
              <Download size={18} />
            </a>
          </div>
        </div>
      </div>

      {/* Reader body. A single <Document> instance is shared by the thumbnail rail and
          the main page so the PDF is only fetched/parsed once. */}
      <Document
        key={pdfRetryKey}
        file={pdfUrl}
        onLoadSuccess={onDocumentLoadSuccess}
        onLoadError={onDocumentLoadError}
        loading={<div className="text-brand-white text-center py-20 animate-pulse">पृष्ठ लोड होत आहे...</div>}
        error={
          <div className="flex flex-col items-center gap-4 py-20 px-4 text-center w-full">
            <p className="text-brand-white text-lg">पीडीएफ उघडता आले नाही</p>
            <p className="text-brand-gray text-sm max-w-md">
              कनेक्शन किंवा फाईलमध्ये समस्या असू शकते. पुन्हा प्रयत्न करा किंवा थेट डाउनलोड करा.
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={retryPdfLoad}
                className="bg-[var(--brand-red)] hover:bg-[var(--brand-red-dark)] text-brand-white px-4 py-2 rounded-lg font-bold transition-colors"
              >
                पुन्हा प्रयत्न करा
              </button>
              <a
                href={pdfUrl}
                download
                className="border border-brand-gray-medium hover:border-[color:var(--brand-yellow)] text-brand-white px-4 py-2 rounded-lg font-bold transition-colors"
              >
                पीडीएफ डाउनलोड करा
              </a>
            </div>
            {pdfLoadError && (
              <details className="text-brand-gray text-xs mt-2">
                <summary className="cursor-pointer hover:text-brand-white">तांत्रिक तपशील</summary>
                <p className="mt-1 max-w-md break-words">{pdfLoadError}</p>
              </details>
            )}
          </div>
        }
        className="w-full"
      >
        <div className="max-w-screen-2xl mx-auto w-full px-2 sm:px-4 py-4 sm:py-6 flex flex-col lg:flex-row gap-4 lg:gap-6">
          {/* Thumbnail rail — vertical on the left (desktop), horizontal strip below the page (mobile) */}
          {numPages && numPages > 1 && (
            <aside className="order-2 lg:order-1 lg:w-[176px] flex-shrink-0 lg:sticky lg:top-32 lg:self-start">
              <div className="hidden lg:flex items-center gap-2 mb-3 px-1">
                <span className="w-1.5 h-4 bg-[var(--brand-red)] rounded-sm"></span>
                <h2 className="text-brand-white text-sm font-bold">पृष्ठे</h2>
              </div>
              <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-x-hidden lg:overflow-y-auto lg:max-h-[calc(100vh-10rem)] pb-2 lg:pb-1 lg:pr-1 scrollbar-hide">
                {pages.map((pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => setPageNumber(pageNum)}
                    className={`flex-shrink-0 rounded overflow-hidden border-2 transition-colors ${
                      pageNum === pageNumber ? 'border-[color:var(--brand-yellow)]' : 'border-brand-gray-medium hover:border-brand-gray'
                    }`}
                    aria-label={`पृष्ठ ${pageNum}`}
                    aria-current={pageNum === pageNumber}
                  >
                    <Page pageNumber={pageNum} width={150} devicePixelRatio={3} renderTextLayer={false} renderAnnotationLayer={false} loading={null} />
                    <div className={`text-xs text-center py-1 ${
                      pageNum === pageNumber ? 'bg-[var(--brand-yellow)] text-[color:var(--brand-black)] font-bold' : 'bg-[var(--brand-black)] text-brand-gray'
                    }`}>
                      {pageNum}
                    </div>
                  </button>
                ))}
              </div>
            </aside>
          )}

          {/* Main viewer */}
          <main ref={containerRef} className="order-1 lg:order-2 flex-1 min-w-0 flex flex-col items-center">
            {/* Numbered page pager (Lokmat-style quick page jump) */}
            {numPages && (
              <div className="w-full flex items-center gap-2 mb-4">
                <button
                  onClick={goToPrevPage}
                  disabled={pageNumber <= 1}
                  className="flex-shrink-0 p-1.5 rounded-lg bg-brand-gray-dark border border-brand-gray-medium text-brand-white hover:text-[color:var(--brand-yellow)] disabled:opacity-30 transition-colors"
                  aria-label="मागील पृष्ठ"
                >
                  <ChevronLeft size={18} />
                </button>
                <div className="flex-1 overflow-x-auto scrollbar-hide">
                  <div className="flex items-center gap-1.5 w-max mx-auto px-1">
                    {pages.map((n) => (
                      <button
                        key={n}
                        onClick={() => setPageNumber(n)}
                        aria-current={n === pageNumber}
                        className={`flex-shrink-0 min-w-[2rem] h-8 px-2 rounded-md text-sm font-semibold transition-colors ${
                          n === pageNumber
                            ? 'bg-[var(--brand-yellow)] text-[color:var(--brand-black)]'
                            : 'bg-brand-black-light text-brand-white hover:bg-brand-gray-medium'
                        }`}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                </div>
                <button
                  onClick={goToNextPage}
                  disabled={pageNumber >= numPages}
                  className="flex-shrink-0 p-1.5 rounded-lg bg-brand-gray-dark border border-brand-gray-medium text-brand-white hover:text-[color:var(--brand-yellow)] disabled:opacity-30 transition-colors"
                  aria-label="पुढील पृष्ठ"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            )}

            {/* Page + hover navigation arrows */}
            <div className="relative w-full flex justify-center group">
              {numPages && (
                <>
                  <button
                    onClick={goToPrevPage}
                    disabled={pageNumber <= 1}
                    className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 p-3 sm:p-4 bg-brand-black/70 hover:bg-brand-gray-dark border border-brand-gray-medium rounded-full text-brand-white disabled:opacity-0 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all backdrop-blur-md shadow-2xl"
                    aria-label="मागील पृष्ठ"
                  >
                    <ChevronLeft size={36} />
                  </button>
                  <button
                    onClick={goToNextPage}
                    disabled={pageNumber >= numPages}
                    className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 p-3 sm:p-4 bg-brand-black/70 hover:bg-brand-gray-dark border border-brand-gray-medium rounded-full text-brand-white disabled:opacity-0 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all backdrop-blur-md shadow-2xl"
                    aria-label="पुढील पृष्ठ"
                  >
                    <ChevronRight size={36} />
                  </button>
                </>
              )}

              <Page
                pageNumber={pageNumber}
                width={baseWidth}
                scale={scale}
                devicePixelRatio={RENDER_DPR}
                renderTextLayer={false}
                renderAnnotationLayer={false}
                className="shadow-2xl"
                loading={<div className="text-brand-white py-20 animate-pulse">पृष्ठ लोड होत आहे...</div>}
              />
            </div>

            {/* Current page indicator */}
            {numPages && (
              <div className="mt-4 text-brand-gray text-sm font-medium">
                पृष्ठ {pageNumber} / {numPages}
              </div>
            )}
          </main>
        </div>
      </Document>
    </div>
  );
};

export default EpaperReader;

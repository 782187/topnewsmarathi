import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Download, Calendar, ArrowLeft } from 'lucide-react';
import { buildStaticUrl } from '../utils/staticUrl';

const MIN_SCALE = 0.6;
const MAX_SCALE = 3;

// Image-based e-paper reader. Renders server-pre-rendered page JPEGs (from
// epaper_pages) instead of rasterizing the PDF in the browser — crisper, lighter,
// and the coordinate space clickable article sections will hang off of (Phase 1).
// Chrome intentionally mirrors EpaperReader.jsx so the two paths look identical.
const EpaperImageReader = ({ epaper, pages, archive = [], editionSlug, date }) => {
  const navigate = useNavigate();
  const containerRef = useRef(null);

  const sortedPages = React.useMemo(
    () => [...pages].sort((a, b) => a.page_number - b.page_number),
    [pages]
  );
  const numPages = sortedPages.length;

  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1);
  const [containerWidth, setContainerWidth] = useState(600);
  const [imgLoading, setImgLoading] = useState(true);

  const current = sortedPages.find((p) => p.page_number === pageNumber) || sortedPages[0];

  useEffect(() => {
    setPageNumber(1);
    setScale(1);
  }, [editionSlug, date]);

  const measure = useCallback(() => {
    if (containerRef.current) setContainerWidth(containerRef.current.offsetWidth);
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [measure]);

  const goToPrevPage = useCallback(() => setPageNumber((p) => Math.max(1, p - 1)), []);
  const goToNextPage = useCallback(
    () => setPageNumber((p) => Math.min(numPages, p + 1)),
    [numPages]
  );

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') goToNextPage();
      if (e.key === 'ArrowLeft') goToPrevPage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNextPage, goToPrevPage]);

  // Show the loading shimmer when switching to a page whose image is not yet
  // in the browser cache. If the browser has already decoded the image (e.g.
  // on back-navigation), skip the shimmer entirely so there is no blink.
  useEffect(() => {
    if (!current) return;
    const img = new window.Image();
    img.src = buildStaticUrl(current.image_url);
    // `complete` is true when the image is already fully decoded / cached.
    setImgLoading(!img.complete);
  }, [pageNumber, current]);

  const zoomIn = () => setScale((s) => Math.min(MAX_SCALE, +(s + 0.2).toFixed(2)));
  const zoomOut = () => setScale((s) => Math.max(MIN_SCALE, +(s - 0.2).toFixed(2)));

  const handleDateChange = (e) => {
    const newDate = e.target.value;
    if (newDate) navigate(`/epaper/${editionSlug}/${newDate}`);
  };

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString('mr-IN', { year: 'numeric', month: 'long', day: 'numeric' });

  const pdfUrl = buildStaticUrl(epaper.pdf_url);
  const displayWidth = Math.round(containerWidth * scale);
  const aspect = current && current.image_width ? current.image_height / current.image_width : 1.414;
  const displayHeight = Math.round(displayWidth * aspect);

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

            {/* Download (full PDF) */}
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

      <div className="max-w-screen-2xl mx-auto w-full px-2 sm:px-4 py-4 sm:py-6 flex flex-col lg:flex-row gap-4 lg:gap-6">
        {/* Thumbnail rail — page images */}
        {numPages > 1 && (
          <aside className="order-2 lg:order-1 lg:w-[176px] flex-shrink-0 lg:sticky lg:top-32 lg:self-start">
            <div className="hidden lg:flex items-center gap-2 mb-3 px-1">
              <span className="w-1.5 h-4 bg-[var(--brand-red)] rounded-sm"></span>
              <h2 className="text-brand-white text-sm font-bold">पृष्ठे</h2>
            </div>
            <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-x-hidden lg:overflow-y-auto lg:max-h-[calc(100vh-10rem)] pb-2 lg:pb-1 lg:pr-1 scrollbar-hide">
              {sortedPages.map((pg) => (
                <button
                  key={pg.page_number}
                  onClick={() => setPageNumber(pg.page_number)}
                  className={`flex-shrink-0 rounded overflow-hidden border-2 transition-colors ${
                    pg.page_number === pageNumber ? 'border-[color:var(--brand-yellow)]' : 'border-brand-gray-medium hover:border-brand-gray'
                  }`}
                  aria-label={`पृष्ठ ${pg.page_number}`}
                  aria-current={pg.page_number === pageNumber}
                >
                  <img
                    src={buildStaticUrl(pg.image_url)}
                    alt={`पृष्ठ ${pg.page_number}`}
                    width={150}
                    loading="lazy"
                    className="w-[120px] lg:w-[150px] h-auto block bg-brand-black-light"
                  />
                  <div className={`text-xs text-center py-1 ${
                    pg.page_number === pageNumber ? 'bg-[var(--brand-yellow)] text-[color:var(--brand-black)] font-bold' : 'bg-[var(--brand-black)] text-brand-gray'
                  }`}>
                    {pg.page_number}
                  </div>
                </button>
              ))}
            </div>
          </aside>
        )}

        {/* Main viewer */}
        <main ref={containerRef} className="order-1 lg:order-2 flex-1 min-w-0 flex flex-col items-center">
          {/* Numbered page pager */}
          {numPages > 0 && (
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
                  {sortedPages.map((pg) => (
                    <button
                      key={pg.page_number}
                      onClick={() => setPageNumber(pg.page_number)}
                      aria-current={pg.page_number === pageNumber}
                      className={`flex-shrink-0 min-w-[2rem] h-8 px-2 rounded-md text-sm font-semibold transition-colors ${
                        pg.page_number === pageNumber
                          ? 'bg-[var(--brand-yellow)] text-[color:var(--brand-black)]'
                          : 'bg-brand-black-light text-brand-white hover:bg-brand-gray-medium'
                      }`}
                    >
                      {pg.page_number}
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

          {/* Page image + hover navigation arrows */}
          <div className="relative w-full flex justify-center group">
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

            <div className="w-full overflow-auto flex justify-center">
              {current && (
                <div className="relative" style={{ width: displayWidth, height: displayHeight }}>
                  {/* Shimmer placeholder — only shown when the image is genuinely
                      loading from the network (not cached). Position is absolute so
                      it occupies the correct reserved space without layout shift. */}
                  {imgLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-brand-black-light animate-pulse text-brand-gray text-sm">
                      पृष्ठ लोड होत आहे...
                    </div>
                  )}
                  {/* Page image — fades in smoothly once loaded so the transition
                      never causes a hard blink, even on a slow connection. */}
                  <img
                    src={buildStaticUrl(current.image_url)}
                    alt={`${epaper.edition_name} — पृष्ठ ${pageNumber}`}
                    onLoad={() => setImgLoading(false)}
                    width={displayWidth}
                    height={displayHeight}
                    className={`block shadow-2xl select-none transition-opacity duration-300 ${
                      imgLoading ? 'opacity-0' : 'opacity-100'
                    }`}
                    draggable={false}
                  />

                  {/* Clickable news-section hotspots — outline on hover, open the
                      section image on click (positioned by normalized coordinates). */}
                  {(current.articles || []).map((a) => (
                    <button
                      key={a.id}
                      onClick={() => navigate(`/epaper/${editionSlug}/${date}/article/${a.slug}`)}
                      className="absolute border-2 border-transparent hover:border-[color:var(--brand-yellow)] hover:bg-[color:var(--brand-yellow)]/10 rounded-sm transition-colors cursor-pointer"
                      style={{ left: `${a.x * 100}%`, top: `${a.y * 100}%`, width: `${a.w * 100}%`, height: `${a.h * 100}%` }}
                      aria-label={a.title || 'बातमी वाचा'}
                      title={a.title || ''}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Current page indicator */}
          {numPages > 0 && (
            <div className="mt-4 text-brand-gray text-sm font-medium">
              पृष्ठ {pageNumber} / {numPages}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default EpaperImageReader;

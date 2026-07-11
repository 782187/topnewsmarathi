import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Document, Page } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Download, Calendar, ArrowLeft } from 'lucide-react';
import '../utils/pdfWorker';
import { buildStaticUrl } from '../utils/staticUrl';

const MIN_SCALE = 0.6;
const MAX_SCALE = 2.5;

const EpaperReader = () => {
  const { editionSlug, date } = useParams();
  const navigate = useNavigate();
  const containerRef = useRef(null);

  const [epaper, setEpaper] = useState(null);
  const [archive, setArchive] = useState([]);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1);
  const [containerWidth, setContainerWidth] = useState(600);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pdfLoadError, setPdfLoadError] = useState(null);
  const [pdfRetryKey, setPdfRetryKey] = useState(0);

  useEffect(() => {
    fetchEpaper();
    fetchArchive();
    setPageNumber(1);
  }, [editionSlug, date]);

  useEffect(() => {
    const measure = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

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
      <div className="min-h-screen bg-brand-black w-full flex items-center justify-center">
        <div className="text-brand-white text-xl animate-pulse">ई-पेपर लोड होत आहे...</div>
      </div>
    );
  }

  if (error || !epaper) {
    return (
      <div className="min-h-screen bg-brand-black w-full flex flex-col items-center justify-center gap-4 px-4 text-center">
        <p className="text-brand-white text-xl">{error || 'ई-पेपर आढळला नाही'}</p>
        <Link to="/epaper" className="bg-brand-red text-brand-white px-5 py-2 rounded-lg font-bold hover:bg-brand-red-dark transition-colors">
          सर्व आवृत्त्या पहा
        </Link>
      </div>
    );
  }

  const pdfUrl = buildStaticUrl(epaper.pdf_url);
  const pageWidth = Math.min(containerWidth, 900) * scale;

  return (
    <div className="min-h-screen bg-brand-black w-full" lang="mr">
      {/* Top toolbar */}
      <div className="sticky top-16 z-30 bg-brand-gray-dark border-b border-brand-gray-medium">
        <div className="max-w-screen-2xl mx-auto px-3 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <Link to="/epaper" className="text-brand-white hover:text-brand-yellow transition-colors flex-shrink-0" aria-label="ई-पेपर सूचीकडे परत जा">
              <ArrowLeft size={20} />
            </Link>
            <div className="min-w-0">
              <h1 className="text-brand-white font-bold truncate">{epaper.edition_name}</h1>
              <p className="text-brand-gray text-xs truncate">{formatDate(epaper.publish_date)}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Date picker */}
            <div className="relative flex items-center gap-1 bg-brand-black rounded-lg px-2 py-1.5 border border-brand-gray-medium">
              <Calendar size={16} className="text-brand-yellow flex-shrink-0" />
              <select
                value={epaper.publish_date.slice(0, 10)}
                onChange={handleDateChange}
                className="bg-transparent text-brand-white text-sm outline-none max-w-[110px]"
              >
                {archive.map((issue) => (
                  <option key={issue.id} value={issue.publish_date.slice(0, 10)} className="bg-brand-black">
                    {issue.publish_date.slice(0, 10)}
                  </option>
                ))}
              </select>
            </div>

            {/* Zoom controls */}
            <div className="flex items-center gap-1 bg-brand-black rounded-lg px-1 py-1 border border-brand-gray-medium">
              <button onClick={zoomOut} disabled={scale <= MIN_SCALE} className="p-1.5 text-brand-white hover:text-brand-yellow disabled:opacity-30 transition-colors" aria-label="झूम कमी करा">
                <ZoomOut size={18} />
              </button>
              <span className="text-brand-gray text-xs w-10 text-center">{Math.round(scale * 100)}%</span>
              <button onClick={zoomIn} disabled={scale >= MAX_SCALE} className="p-1.5 text-brand-white hover:text-brand-yellow disabled:opacity-30 transition-colors" aria-label="झूम वाढवा">
                <ZoomIn size={18} />
              </button>
            </div>

            {/* Download */}
            <a
              href={pdfUrl}
              download
              className="p-2 bg-brand-red hover:bg-brand-red-dark text-brand-white rounded-lg transition-colors"
              aria-label="पीडीएफ डाउनलोड करा"
            >
              <Download size={18} />
            </a>
          </div>
        </div>
      </div>

      {/* Page viewer — a single Document instance is shared by the main page and the
          thumbnail strip below so the PDF is only fetched/parsed once. */}
      <div ref={containerRef} className="max-w-screen-lg mx-auto px-2 sm:px-4 py-6 flex flex-col items-center">
        <Document
          key={pdfRetryKey}
          file={pdfUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={onDocumentLoadError}
          loading={<div className="text-brand-white py-20 animate-pulse">पृष्ठ लोड होत आहे...</div>}
          error={
            <div className="flex flex-col items-center gap-4 py-20 px-4 text-center">
              <p className="text-brand-white text-lg">पीडीएफ उघडता आले नाही</p>
              <p className="text-brand-gray text-sm max-w-md">
                कनेक्शन किंवा फाईलमध्ये समस्या असू शकते. पुन्हा प्रयत्न करा किंवा थेट डाउनलोड करा.
              </p>
              <div className="flex items-center gap-3">
                <button
                  onClick={retryPdfLoad}
                  className="bg-brand-red hover:bg-brand-red-dark text-brand-white px-4 py-2 rounded-lg font-bold transition-colors"
                >
                  पुन्हा प्रयत्न करा
                </button>
                <a
                  href={pdfUrl}
                  download
                  className="border border-brand-gray-medium hover:border-brand-yellow text-brand-white px-4 py-2 rounded-lg font-bold transition-colors"
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
          className="flex flex-col items-center w-full"
        >
          <Page
            pageNumber={pageNumber}
            width={pageWidth}
            renderTextLayer={false}
            renderAnnotationLayer={false}
            className="shadow-2xl"
            loading={<div className="text-brand-white py-20 animate-pulse">पृष्ठ लोड होत आहे...</div>}
          />

          {/* Page navigation */}
          {numPages && (
            <div className="flex items-center gap-4 mt-6 bg-brand-gray-dark border border-brand-gray-medium rounded-full px-4 py-2">
              <button
                onClick={goToPrevPage}
                disabled={pageNumber <= 1}
                className="p-2 text-brand-white hover:text-brand-yellow disabled:opacity-30 transition-colors"
                aria-label="मागील पृष्ठ"
              >
                <ChevronLeft size={22} />
              </button>
              <span className="text-brand-white text-sm font-medium min-w-[80px] text-center">
                पृष्ठ {pageNumber} / {numPages}
              </span>
              <button
                onClick={goToNextPage}
                disabled={pageNumber >= numPages}
                className="p-2 text-brand-white hover:text-brand-yellow disabled:opacity-30 transition-colors"
                aria-label="पुढील पृष्ठ"
              >
                <ChevronRight size={22} />
              </button>
            </div>
          )}

          {/* Thumbnail strip */}
          {numPages && numPages > 1 && (
            <div className="w-full mt-8 overflow-x-auto scrollbar-hide">
              <div className="flex gap-3 pb-2 px-1">
                {Array.from({ length: numPages }, (_, i) => i + 1).map((pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => setPageNumber(pageNum)}
                    className={`flex-shrink-0 rounded overflow-hidden border-2 transition-colors ${
                      pageNum === pageNumber ? 'border-brand-yellow' : 'border-brand-gray-medium hover:border-brand-gray'
                    }`}
                  >
                    <Page pageNumber={pageNum} width={70} renderTextLayer={false} renderAnnotationLayer={false} loading={null} />
                    <div className="bg-brand-black text-brand-gray text-[10px] text-center py-0.5">{pageNum}</div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </Document>
      </div>
    </div>
  );
};

export default EpaperReader;

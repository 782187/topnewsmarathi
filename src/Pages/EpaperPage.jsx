import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Document, Page } from 'react-pdf';
import { Calendar } from 'lucide-react';
import '../utils/pdfWorker';
import { buildStaticUrl } from '../utils/staticUrl';

const PAGE_LIMIT = 24;

const EpaperPage = () => {
  const [epapers, setEpapers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPublishedEpapers(1, false);
  }, []);

  const fetchPublishedEpapers = async (pageToFetch, append) => {
    try {
      append ? setLoadingMore(true) : setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/epapers/published?page=${pageToFetch}&limit=${PAGE_LIMIT}`
      );
      const data = await response.json();
      if (data.success) {
        setEpapers((prev) => (append ? [...prev, ...data.data.epapers] : data.data.epapers));
        setTotalPages(data.data.pagination.totalPages);
        setPage(pageToFetch);
      } else {
        setError('ई-पेपर मिळवण्यात अयशस्वी');
      }
    } catch (err) {
      console.error('Failed to fetch e-papers', err);
      setError('ई-पेपर मिळवण्यात अयशस्वी');
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const handleLoadMore = () => {
    if (loadingMore || page >= totalPages) return;
    fetchPublishedEpapers(page + 1, true);
  };

  const formatDate = (dateString) => {
    const d = new Date(dateString);
    return d.toLocaleDateString('en-GB').split('/').join('-');
  };

  const formatLongDate = (dateString) =>
    new Date(dateString).toLocaleDateString('mr-IN', { year: 'numeric', month: 'long', day: 'numeric' });

  // The freshest issue date among the loaded editions — shown in the header like
  // Lokmat's dated masthead. Presentational only; derived from data already fetched.
  const latestDate = epapers.length
    ? epapers.reduce((max, e) => (e.publish_date > max ? e.publish_date : max), epapers[0].publish_date)
    : null;

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--brand-black)] w-full p-8 flex justify-center">
        <div className="text-brand-white text-xl animate-pulse">ई-पेपर लोड होत आहे...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--brand-black)] w-full" lang="mr">
      <div className="w-full px-4 md:px-6 lg:px-8 py-6 max-w-screen-2xl mx-auto">
        {/* Masthead — title + latest issue date */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-[color:var(--brand-yellow)] pb-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-8 bg-[var(--brand-red)] rounded"></span>
              <h1 className="text-3xl font-bold text-brand-white">ई-पेपर</h1>
            </div>
            {latestDate && (
              <div className="flex items-center gap-2 bg-brand-gray-dark border border-brand-gray-medium rounded-lg px-3 py-2">
                <Calendar size={16} className="text-[color:var(--brand-yellow)]" />
                <span className="text-brand-white text-sm font-semibold">{formatLongDate(latestDate)}</span>
              </div>
            )}
          </div>
          <p className="text-brand-gray text-sm mt-3">तुमची आवृत्ती निवडा आणि आजचा अंक वाचा</p>
        </div>

        {error ? (
          <div className="text-brand-gray text-center py-12">{error}</div>
        ) : epapers.length === 0 ? (
          <div className="text-brand-gray text-center py-12">सध्या कोणतेही ई-पेपर उपलब्ध नाहीत</div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 sm:gap-6">
              {epapers.map((epaper) => (
                <Link
                  key={epaper.id}
                  to={`/epaper/${epaper.edition_slug}/${epaper.publish_date.slice(0, 10)}`}
                  className="group bg-brand-gray-dark border border-brand-gray-medium hover:border-[color:var(--brand-yellow)] rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl flex flex-col"
                >
                  {/* Front-page thumbnail — the hero of the card */}
                  <div className="aspect-[3/4] relative bg-brand-black-light overflow-hidden">
                    {epaper.thumbnail_url ? (
                      <img
                        src={buildStaticUrl(epaper.thumbnail_url)}
                        alt={`${epaper.edition_name} - ${formatDate(epaper.publish_date)}`}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    ) : epaper.pdf_url ? (
                      <div className="w-full h-full overflow-hidden flex items-center justify-center pointer-events-none group-hover:scale-105 transition-transform duration-300 bg-brand-black-light">
                        <Document
                          file={buildStaticUrl(epaper.pdf_url)}
                          loading={<div className="w-full h-full flex items-center justify-center animate-pulse text-brand-gray text-xs">लोड...</div>}
                          error={<div className="w-full h-full flex items-center justify-center text-brand-gray text-xs">पीडीएफ</div>}
                          className="w-full h-full"
                        >
                          <Page
                            pageNumber={1}
                            width={400}
                            renderTextLayer={false}
                            renderAnnotationLayer={false}
                            devicePixelRatio={2}
                            className="!w-full !h-full flex items-center justify-center [&_div]:!w-full [&_div]:!h-full [&_canvas]:!w-full [&_canvas]:!h-full [&_canvas]:!object-contain [&_canvas]:!object-center"
                          />
                        </Document>
                      </div>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-brand-gray text-sm">
                        पीडीएफ
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center pointer-events-none">
                      <span className="opacity-0 group-hover:opacity-100 bg-[var(--brand-red)] text-brand-white text-xs font-bold px-3 py-1.5 rounded-full transition-opacity">
                        वाचा
                      </span>
                    </div>
                  </div>

                  {/* Caption — edition name + date below the front page */}
                  <div className="p-2.5 text-center border-t border-brand-gray-medium">
                    <h3 className="text-brand-white font-bold text-sm truncate group-hover:text-[color:var(--brand-yellow)] transition-colors">{epaper.edition_name}</h3>
                    <div className="flex items-center justify-center gap-1 mt-1">
                      <Calendar size={12} className="text-brand-gray flex-shrink-0" />
                      <span className="text-brand-gray text-xs">{formatDate(epaper.publish_date)}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {page < totalPages && (
              <div className="flex justify-center mt-10">
                <button
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                  className="bg-[var(--brand-red)] hover:bg-[var(--brand-red-dark)] text-brand-white font-bold px-6 py-3 rounded-lg transition-colors disabled:opacity-50"
                >
                  {loadingMore ? 'लोड होत आहे...' : 'अजून पहा'}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default EpaperPage;

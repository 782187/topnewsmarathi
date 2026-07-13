import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Document, Page } from 'react-pdf';
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

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-black w-full p-8 flex justify-center">
        <div className="text-brand-white text-xl animate-pulse">ई-पेपर लोड होत आहे...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-black w-full" lang="mr">
      <div className="w-full px-4 md:px-6 lg:px-8 py-6 max-w-screen-2xl mx-auto">
        <div className="flex items-center gap-2 mb-8 border-b-2 border-brand-yellow pb-4">
          <span className="w-2 h-8 bg-brand-red rounded"></span>
          <h1 className="text-3xl font-bold text-brand-white">ई-पेपर</h1>
        </div>

        {error ? (
          <div className="text-brand-gray text-center py-12">{error}</div>
        ) : epapers.length === 0 ? (
          <div className="text-brand-gray text-center py-12">सध्या कोणतेही ई-पेपर उपलब्ध नाहीत</div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {epapers.map((epaper) => (
                <Link
                  key={epaper.id}
                  to={`/epaper/${epaper.edition_slug}/${epaper.publish_date.slice(0, 10)}`}
                  className="bg-brand-gray-dark border border-brand-gray-medium hover:border-brand-yellow rounded-lg overflow-hidden transition-all duration-300 group hover:shadow-xl flex flex-col"
                >
                  <div className="bg-brand-black text-center py-2 px-2">
                    <h3 className="text-brand-white font-bold text-sm truncate">{epaper.edition_name}</h3>
                  </div>

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
                            className="!w-full !h-full flex items-center justify-center [&>canvas]:!w-full [&>canvas]:!h-full [&>canvas]:!object-contain [&>canvas]:!object-center"
                          />
                        </Document>
                      </div>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-brand-gray text-sm">
                        पीडीएफ
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center pointer-events-none">
                      <span className="opacity-0 group-hover:opacity-100 bg-brand-red text-brand-white text-xs font-bold px-3 py-1.5 rounded-full transition-opacity">
                        वाचा
                      </span>
                    </div>
                  </div>

                  <div className="py-2 text-center border-t border-brand-gray-medium">
                    <span className="text-brand-gray text-sm">{formatDate(epaper.publish_date)}</span>
                  </div>
                </Link>
              ))}
            </div>

            {page < totalPages && (
              <div className="flex justify-center mt-10">
                <button
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                  className="bg-brand-red hover:bg-brand-red-dark text-brand-white font-bold px-6 py-3 rounded-lg transition-colors disabled:opacity-50"
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

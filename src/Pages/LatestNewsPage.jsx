import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getYouTubeThumbnail } from '../utils/videoUtils.js';
import { SidebarAd } from '../Components/Ads';

const LatestNewsPage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLatestNews();
  }, []);

  const fetchLatestNews = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_URL}/articles?limit=30`);
      const data = await response.json();
      
      if (data.success) {
        setArticles(data.data.articles);
      }
    } catch (err) {
      console.error('Error fetching latest news:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-black w-full p-8 flex justify-center">
        <div className="text-brand-white text-xl animate-pulse">ताज्या बातम्या लोड होत आहेत...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-black w-full" lang="mr">
      <div className="w-full px-4 md:px-6 lg:px-8 py-8 max-w-screen-xl mx-auto flex flex-col md:flex-row gap-8">
        
        {/* Main Feed */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6 pb-2 border-b-2 border-brand-red-dark">
            <h1 className="text-2xl font-bold text-brand-white">
              <span className="text-brand-yellow mr-2">•</span> ताज्या बातम्या
            </h1>
          </div>

          <div className="space-y-4">
            {articles.length === 0 ? (
              <div className="text-brand-gray text-center py-10">सध्या कोणत्याही बातम्या उपलब्ध नाहीत.</div>
            ) : (
              articles.map((article) => (
                <Link
                  key={article.id}
                  to={`/article/${article.slug}`}
                  className="flex flex-col sm:flex-row gap-4 bg-brand-gray-dark border border-brand-gray-medium hover:border-brand-yellow rounded-lg overflow-hidden transition-all duration-300 group p-3"
                >
                  {(article.thumbnail || (article.type === 'video' && getYouTubeThumbnail(article.video_url))) && (
                    <div className="w-full sm:w-48 aspect-video relative flex-shrink-0 bg-brand-black rounded overflow-hidden">
                      <img
                        src={article.type === 'video' && article.video_url 
                          ? getYouTubeThumbnail(article.video_url)
                          : `${import.meta.env.VITE_STATIC_URL}${article.thumbnail}`}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {article.type === 'video' && (
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition-colors">
                          <div className="w-10 h-10 bg-brand-red rounded-full flex items-center justify-center text-white border-2 border-brand-white shadow-lg group-hover:scale-110 transition-all">
                            <svg className="w-5 h-5 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  <div className="flex flex-col flex-1 justify-between">
                    <h3 className="text-brand-white font-semibold text-lg hover:text-brand-yellow transition-colors mb-2 text-safe">
                      {article.title}
                    </h3>
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-brand-black-medium">
                      <span className="text-brand-gray text-sm flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
                        {new Date(article.created_at).toLocaleString('mr-IN', { hour: '2-digit', minute: '2-digit', day: 'numeric', month: 'short' })}
                      </span>
                      {article.category_name && (
                        <span className="bg-brand-red-dark text-brand-white text-xs px-2 py-1 rounded font-medium border border-brand-black">
                          {article.category_name}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>

        {/* Sidebar Ad Section */}
        <div className="w-full md:w-80 flex-shrink-0 hidden lg:block space-y-6">
          <div className="sticky top-24 space-y-6">
            <SidebarAd index={0} />
            <SidebarAd index={1} />
          </div>
        </div>

      </div>
    </div>
  );
};

export default LatestNewsPage;

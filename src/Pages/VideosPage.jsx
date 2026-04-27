import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getYouTubeThumbnail } from '../utils/videoUtils.js';
import { SidebarAd } from '../Components/Ads';

const VideosPage = () => {
  const [videoArticles, setVideoArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVideoArticles();
  }, []);

  const fetchVideoArticles = async () => {
    try {
      setLoading(true);
      // Fetch video articles from backend
      const response = await fetch(`${import.meta.env.VITE_API_URL}/articles/videos?limit=30`);
      const data = await response.json();
      
      if (data.success) {
        setVideoArticles(data.data.articles);
      }
    } catch (error) {
      console.error('Error fetching video articles:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-black w-full p-8 flex justify-center">
        <div className="text-brand-white text-xl animate-pulse">व्हिडिओ लोड होत आहेत...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-black w-full" lang="mr">
      <div className="w-full px-4 md:px-6 lg:px-8 py-8 max-w-screen-xl mx-auto flex flex-col md:flex-row gap-8">
        
        {/* Main Feed */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6 pb-2 border-b-2 border-brand-red-dark">
            <h1 className="text-2xl font-bold text-brand-white flex items-center gap-2">
              <svg className="w-6 h-6 text-brand-yellow" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
              व्हिडिओ बातम्या
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {videoArticles.length === 0 ? (
              <div className="text-brand-gray text-center py-10 col-span-1 md:col-span-2">सध्या कोणतेही व्हिडिओ उपलब्ध नाहीत.</div>
            ) : (
              videoArticles.map((article) => (
                <div key={article.id} className="group bg-brand-gray-dark rounded-xl p-4 shadow-lg border border-brand-gray-medium hover:border-brand-yellow transition-all duration-300">
                  {getYouTubeThumbnail(article.video_url) && (
                    <Link 
                      to={`/article/${article.slug}`}
                      className="relative aspect-video bg-black rounded-xl overflow-hidden mb-3 block shadow-md hover:shadow-xl transition-all duration-300"
                    >
                      <img
                        src={getYouTubeThumbnail(article.video_url)}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors">
                        <div className="bg-brand-red w-12 h-12 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300">
                          <svg className="w-6 h-6 text-brand-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                        </div>
                      </div>
                    </Link>
                  )}

                  <h3 className="text-brand-white font-medium text-lg mb-2 line-clamp-2 group-hover:text-brand-yellow transition-colors">
                    {article.title}
                  </h3>

                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-brand-black-medium">
                    <span className="text-gray-400 text-sm">
                      {new Date(article.created_at).toLocaleDateString('mr-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                    {article.category_name && (
                      <span className="bg-brand-red-dark text-brand-white text-xs px-2 py-1 rounded border border-brand-black">
                        {article.category_name}
                      </span>
                    )}
                  </div>
                </div>
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

export default VideosPage;

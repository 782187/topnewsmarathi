import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getYouTubeThumbnail } from '../utils/videoUtils.js';

const VideoArticlesSection = () => {
  const [videoArticles, setVideoArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVideoArticles();
  }, []);

  const fetchVideoArticles = async () => {
    try {
      // Fetch video articles from backend
      const response = await fetch(`${import.meta.env.VITE_API_URL}/articles/videos?limit=6`);
      const data = await response.json();
      setVideoArticles(data.success ? data.data.articles : []);
    } catch (error) {
      console.error('Error fetching video articles:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="w-full px-4 py-6">
        <div className="max-w-screen-2xl mx-auto">
        <div className="bg-brand-gray-dark rounded-xl p-4 shadow-2xl shadow-black/50 overflow-hidden">
            <h2 className="text-brand-white font-bold text-lg mb-4 flex items-center gap-2">
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5 text-brand-yellow" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
                <span className="text-brand-white">व्हिडिओ</span>
              </span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="aspect-video bg-brand-gray-medium rounded-lg mb-3"></div>
                  <div className="h-4 bg-brand-gray-medium rounded mb-2 w-full"></div>
                  <div className="h-3 bg-brand-gray-medium rounded w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Return null if no video articles - section won't render at all
  if (videoArticles.length === 0) {
    return null;
  }

  return (
    <div className="w-full px-4 py-6">
      <div className="max-w-screen-2xl mx-auto">
        <div className="bg-brand-gray-dark rounded-xl p-4 shadow-2xl shadow-black/50 overflow-hidden">
          {/* Section Header */}
          <h2 className="text-brand-white font-bold text-lg mb-6 flex items-center gap-2">
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5 text-brand-yellow" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
              <span className="text-brand-white">व्हिडिओ</span>
            </span>
          </h2>

          {/* Video Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videoArticles.map((article) => (
              <div key={article.id} className="group">
                {getYouTubeThumbnail(article.video_url) && (
                  <Link 
                    to={`/article/${article.slug}`}
                    className="relative aspect-video bg-black rounded-xl overflow-hidden mb-3 block shadow-lg shadow-black/40 hover:shadow-2xl hover:shadow-black/60 transition-all duration-300"
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

                {/* Article Title */}
                <h3 className="text-brand-white font-medium text-base mb-2 line-clamp-2 group-hover:text-brand-primary transition-colors">
                  {article.title}
                </h3>

                {/* Article Metadata */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-gray-400 text-xs">
                    {new Date(article.created_at).toLocaleDateString('mr-IN')}
                  </span>
                  {article.category_name && (
                    <span className="bg-brand-gray-medium text-gray-300 text-xs px-2 py-1 rounded">
                      {article.category_name}
                    </span>
                  )}
                </div>

                {/* Read Article Link */}
                <Link
                  to={`/article/${article.slug}`}
                  className="inline-flex items-center gap-2 text-brand-yellow hover:text-brand-white text-sm font-bold transition-colors group"
                >
                  <span>संपूर्ण बातमी पहा</span>
                  <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>

          {/* View More Link */}
          {videoArticles.length >= 6 && (
            <div className="mt-6 text-center">
              <Link
                to="/videos"
                className="inline-flex items-center gap-2 bg-brand-primary text-brand-white px-4 py-2 rounded-lg hover:bg-brand-red-light transition-colors"
              >
                <span>आणखी व्हिडिओ</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoArticlesSection;

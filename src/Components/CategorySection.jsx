import React from 'react';
import { Link } from 'react-router-dom';
import { getYouTubeThumbnail } from '../utils/videoUtils.js';

const CategorySection = ({ 
  title, 
  articles = [], 
  loading = false,
  viewMoreLink = null,
  layout = 'default' // 'default', 'featured', 'compact'
}) => {
  if (loading) {
    return (
      <div className="w-full">
        <div className="bg-brand-gray-dark rounded-xl p-4 shadow-2xl shadow-black/50 overflow-hidden">
          <h2 className="text-brand-white font-bold text-lg mb-4 flex items-center gap-2">
            <span className="w-1 h-5 bg-brand-yellow rounded"></span>
            <span className="text-brand-white">{title}</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="aspect-video bg-brand-gray-medium rounded-lg mb-3"></div>
                <div className="h-4 bg-brand-gray-medium rounded mb-2 w-full"></div>
                <div className="h-3 bg-brand-gray-medium rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (articles.length === 0) {
    return null;
  }

  // Featured layout - Large hero article on left, smaller ones on right
  if (layout === 'featured' && articles.length >= 4) {
    const mainArticle = articles[0];
    const sideArticles = articles.slice(1, 4);
    const bottomArticles = articles.slice(4, 8);

    return (
      <div className="w-full mb-6">
        <div className="bg-brand-gray-dark rounded-xl p-4 shadow-2xl shadow-black/50 overflow-hidden">
          {/* Section Header */}
          <h2 className="text-brand-white font-bold text-lg mb-4 flex items-center gap-2">
            <span className="w-1 h-5 bg-brand-yellow rounded"></span>
            <span className="text-brand-white">{title}</span>
            {viewMoreLink && (
              <Link 
                to={viewMoreLink}
                className="ml-auto text-sm text-brand-accent hover:text-brand-yellow-dark transition-colors flex items-center gap-1 font-bold"
              >
                <span className="text-brand-yellow">अधिक</span>
                <svg className="w-4 h-4 text-brand-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            )}
          </h2>

          {/* Featured Layout - Main + Side */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
            {/* Main Featured Article */}
            <div className="lg:col-span-2">
              <Link 
                to={`/article/${mainArticle.slug}`}
                className="block relative aspect-video rounded-xl overflow-hidden group bg-brand-black-light shadow-xl shadow-black/40 hover:shadow-2xl hover:shadow-black/60 transition-all duration-300"
              >
                {(mainArticle.thumbnail || (mainArticle.type === 'video' && getYouTubeThumbnail(mainArticle.video_url))) ? (
                  <>
                    <img
                      src={mainArticle.type === 'video' && mainArticle.video_url 
                        ? (getYouTubeThumbnail(mainArticle.video_url)) 
                        : (mainArticle.thumbnail ? `${import.meta.env.VITE_STATIC_URL}${mainArticle.thumbnail}` : '')}
                      alt={mainArticle.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    {mainArticle.type === 'video' && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-brand-red w-12 h-12 rounded-full flex items-center justify-center shadow-lg">
                          <svg className="w-6 h-6 text-brand-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                        </div>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  </>
                ) : (
                  <div className="absolute inset-0 bg-brand-gray-dark flex items-center justify-center opacity-30 select-none">
                     {/* No image indicator? Keep it clean as per user request */}
                  </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  {mainArticle.category_name && (
                    <span className="bg-brand-red text-brand-white text-xs px-3 py-1 rounded font-medium mb-2 inline-block shadow-lg">
                      {mainArticle.category_name}
                    </span>
                  )}
                  <h3 className="text-brand-white font-bold text-lg md:text-xl line-clamp-2">
                    {mainArticle.title}
                  </h3>
                  <p className="text-brand-gray text-sm mt-1 line-clamp-2 hidden md:block">
                    {mainArticle.description || ''}
                  </p>
                </div>
              </Link>
            </div>

            {/* Side Articles */}
            <div className="space-y-3">
              {sideArticles.map((article) => (
                <Link
                  key={article.id}
                  to={`/article/${article.slug}`}
                  className="flex gap-3 bg-brand-gray-medium/30 rounded-lg p-2 hover:bg-brand-gray-medium/50 transition-colors group"
                >
                  {(article.thumbnail || (article.type === 'video' && getYouTubeThumbnail(article.video_url))) && (
                    <div className="relative w-28 h-20 flex-shrink-0">
                      <img
                        src={article.type === 'video' && article.video_url 
                          ? getYouTubeThumbnail(article.video_url)
                          : `${import.meta.env.VITE_STATIC_URL}${article.thumbnail}`}
                        alt={article.title}
                        className="w-full h-full object-cover rounded"
                      />
                      {article.type === 'video' && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="bg-brand-red/80 w-6 h-6 rounded-full flex items-center justify-center">
                            <svg className="w-3 h-3 text-brand-white ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-brand-white font-medium text-sm line-clamp-2 group-hover:text-brand-primary transition-colors">
                      {article.title}
                    </h4>
                    <span className="text-gray-400 text-xs mt-1 block">
                      {new Date(article.created_at).toLocaleDateString('mr-IN')}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Bottom Articles Grid */}
          {bottomArticles.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {bottomArticles.map((article) => (
                <Link
                  key={article.id}
                  to={`/article/${article.slug}`}
                  className="group"
                >
                  {(article.thumbnail || (article.type === 'video' && getYouTubeThumbnail(article.video_url))) && (
                    <div className="relative aspect-video rounded-lg overflow-hidden mb-2">
                      <img
                        src={article.type === 'video' && article.video_url 
                          ? getYouTubeThumbnail(article.video_url)
                          : `${import.meta.env.VITE_STATIC_URL}${article.thumbnail}`}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {article.type === 'video' && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="bg-brand-red w-10 h-10 rounded-full flex items-center justify-center shadow-lg">
                            <svg className="w-5 h-5 text-brand-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  <h4 className="text-brand-white font-medium text-sm line-clamp-2 group-hover:text-brand-primary transition-colors">
                    {article.title}
                  </h4>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Compact layout - Horizontal scrollable list
  if (layout === 'compact') {
    return (
      <div className="w-full mb-6">
        <div className="bg-brand-gray-dark rounded-xl p-4 shadow-2xl shadow-black/50 overflow-hidden">
          {/* Section Header */}
          <h2 className="text-brand-white font-bold text-lg mb-4 flex items-center gap-2">
            <span className="w-1 h-5 bg-brand-yellow rounded"></span>
            <span className="text-brand-white">{title}</span>
            {viewMoreLink && (
              <Link 
                to={viewMoreLink}
                className="ml-auto text-sm text-brand-accent hover:text-brand-yellow-dark transition-colors flex items-center gap-1 font-bold"
              >
                <span className="text-brand-yellow">अधिक</span>
                <svg className="w-4 h-4 text-brand-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            )}
          </h2>

          {/* Horizontal Scrollable Articles */}
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {articles.map((article) => (
              <Link
                key={article.id}
                to={`/article/${article.slug}`}
                className="flex-shrink-0 w-48 group"
              >
                {(article.thumbnail || (article.type === 'video' && getYouTubeThumbnail(article.video_url))) && (
                  <div className="aspect-video rounded-xl overflow-hidden mb-2 relative shadow-md shadow-black/30 group-hover:shadow-xl group-hover:shadow-black/50 transition-all duration-300">
                    <img
                      src={article.type === 'video' && article.video_url 
                        ? (getYouTubeThumbnail(article.video_url)) 
                        : (article.thumbnail ? `${import.meta.env.VITE_STATIC_URL}${article.thumbnail}` : '')}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {article.type === 'video' && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="bg-brand-red w-10 h-10 rounded-full flex items-center justify-center shadow-lg">
                          <svg className="w-5 h-5 text-brand-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                        </div>
                      </div>
                    )}
                    {article.category_name && (
                    <span className="absolute top-2 left-2 bg-brand-red text-brand-white text-xs px-2 py-1 rounded font-medium shadow-lg">
                        {article.category_name}
                      </span>
                    )}
                  </div>
                )}
                <h4 className="text-brand-white font-medium text-sm line-clamp-2 group-hover:text-brand-yellow transition-colors">
                  {article.title}
                </h4>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-brand-gray text-xs">
                    {new Date(article.created_at).toLocaleDateString('mr-IN')}
                  </span>
                  <svg className="w-3 h-3 text-brand-yellow" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 5l7 7-7 7"/>
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Default layout - Grid of articles
  return (
    <div className="w-full mb-6">
      <div className="bg-brand-gray-dark rounded-xl p-4 shadow-2xl shadow-black/50 overflow-hidden">
        {/* Section Header */}
        <h2 className="text-brand-white font-bold text-lg mb-4 flex items-center gap-2">
          <span className="w-1 h-5 bg-brand-yellow rounded"></span>
          <span className="text-brand-white">{title}</span>
          {viewMoreLink && (
            <Link 
              to={viewMoreLink}
              className="ml-auto text-sm text-brand-accent hover:text-brand-yellow-dark transition-colors flex items-center gap-1 font-bold"
            >
              <span className="text-brand-yellow">अधिक</span>
              <svg className="w-4 h-4 text-brand-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          )}
        </h2>

        {/* Articles List Layout (Matches 'Latest News') */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {articles.slice(0, 8).map((article) => (
            <Link
              key={article.id}
              to={`/article/${article.slug}`}
              className="flex gap-3 hover:bg-brand-black-light transition-all duration-300 rounded-xl p-2 shadow-sm hover:shadow-md"
            >
              {(article.thumbnail || (article.type === 'video' && getYouTubeThumbnail(article.video_url))) && (
                <div className="relative w-24 h-18 md:w-28 md:h-20 flex-shrink-0">
                  <img
                    src={article.type === 'video' && article.video_url 
                      ? (getYouTubeThumbnail(article.video_url)) 
                      : (article.thumbnail ? `${import.meta.env.VITE_STATIC_URL}${article.thumbnail}` : '')}
                    alt={article.title}
                    className="w-full h-full object-cover rounded shadow-inner"
                  />
                  {article.type === 'video' && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="bg-brand-red/80 w-6 h-6 rounded-full flex items-center justify-center shadow-lg">
                        <svg className="w-3 h-3 text-brand-white ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                      </div>
                    </div>
                  )}
                </div>
              )}
              <div className="flex-1 flex flex-col justify-between py-1">
                <h4 className="text-brand-white font-medium text-sm md:text-base hover:text-brand-yellow transition-colors line-clamp-2">
                  {article.title}
                </h4>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-brand-gray text-xs">
                    {new Date(article.created_at).toLocaleDateString('mr-IN')}
                  </span>
                  {article.category_name && (
                    <span className="text-brand-yellow text-xs font-medium">
                      {article.category_name}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategorySection;

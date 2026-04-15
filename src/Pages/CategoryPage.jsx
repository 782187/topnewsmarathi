import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getYouTubeThumbnail } from '../utils/videoUtils.js';
import SEO from '../Components/SEO.jsx';
import LatestNewsWidget from '../Components/LatestNewsWidget.jsx';
import { SidebarAd } from '../Components/Ads';

const CategoryPage = () => {
  const { categoryId } = useParams();
  const [articles, setArticles] = useState([]);
  const [categoryDetails, setCategoryDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  // Marathi localized names for hard-coded mappings, fallback to title-case
  const categoryNamesOptions = {
    'politics': 'राजकारण',
    'country': 'देश',
    'international': 'विदेश',
    'entertainment': 'एंटरटेनमेंट',
    'sports': 'क्रीडा',
    'lifestyle': 'लाइफस्टाइल',
    'business': 'व्यापार',
    'technology': 'तंत्रज्ञान',
    'cities': 'शहरे',
  };

  const getMarathiName = (slug) => {
    return categoryNamesOptions[slug] || slug.charAt(0).toUpperCase() + slug.slice(1);
  };

  useEffect(() => {
    fetchCategoryData();
  }, [categoryId]);

  const fetchCategoryData = async () => {
    try {
      setLoading(true);
      // Fetch articles for category
      const response = await fetch(`${import.meta.env.VITE_API_URL}/articles?category=${encodeURIComponent(getMarathiName(categoryId))}&limit=20`);
      const data = await response.json();

      if (data.success) {
        setArticles(data.data.articles);
      }
    } catch (err) {
      console.error('Error fetching category articles:', err);
    } finally {
      setLoading(false);
    }
  };

  const displayName = getMarathiName(categoryId);

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-black w-full p-8 flex justify-center">
        <div className="text-brand-white text-xl animate-pulse">{displayName} लोड होत आहे...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-black w-full" lang="mr">
      <SEO
        title={`${displayName} बातम्या - ताज्या घडामोडी`}
        description={`${displayName} विभागातील ताज्या मराठी बातम्या, ठळक घडामोडी आणि विश्लेषण. टॉप न्यूज मराठी.`}
      />
      <div className="w-full px-4 md:px-6 lg:px-8 py-4 max-w-screen-2xl mx-auto">

        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-[10px] md:text-xs text-brand-gray mb-4 uppercase tracking-widest opacity-70">
          <Link to="/" className="hover:text-brand-yellow transition-colors">होम</Link>
          <span className="text-brand-yellow">/</span>
          <span className="text-brand-white font-bold">{displayName}</span>
        </nav>

        {/* Section Header */}
        <div className="flex items-center justify-between mb-8 border-b-2 border-brand-yellow pb-4 relative">
          <div className="flex items-center gap-3">
            <span className="w-2 h-8 bg-brand-red rounded shadow-[0_0_10px_rgba(255,0,0,0.5)]"></span>
            <h1 className="text-3xl md:text-4xl font-black text-brand-white tracking-tight">
              {displayName}
            </h1>
          </div>

        </div>

        <div className="flex flex-col lg:flex-row gap-8">

          {/* Main Articles Feed */}
          <div className="flex-1">
            {articles.length === 0 ? (
              <div className="text-brand-gray text-center py-20 bg-brand-gray-dark rounded-lg border border-dashed border-brand-gray-medium">
                <span className="text-brand-yellow text-xl font-bold">{displayName}</span>
                <p className="mt-2">साठी बातम्या आढळल्या नाहीत</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {articles.map((article) => (
                  <Link
                    key={article.id}
                    to={`/article/${article.slug}`}
                    className="bg-brand-black-light border border-brand-gray-medium hover:border-brand-yellow rounded-lg overflow-hidden transition-all duration-300 group hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,1)] flex flex-col font-bold"
                  >
                    {(article.thumbnail || (article.type === 'video' && getYouTubeThumbnail(article.video_url))) && (
                      <div className="aspect-video relative overflow-hidden bg-brand-black">
                        <img
                          src={article.type === 'video' && article.video_url
                            ? getYouTubeThumbnail(article.video_url)
                            : `${import.meta.env.VITE_STATIC_URL}${article.thumbnail}`}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        {article.type === 'video' && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-transparent transition-all">
                            <div className="bg-brand-red w-12 h-12 rounded-full flex items-center justify-center shadow-2xl border-2 border-brand-white group-hover:scale-110 transition-transform">
                              <svg className="w-6 h-6 text-brand-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                            </div>
                          </div>
                        )}

                        <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm text-brand-white text-[10px] px-2 py-0.5 rounded border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                          {new Date(article.created_at).toLocaleDateString('mr-IN')}
                        </div>
                      </div>
                    )}

                    <div className="p-4 flex-1 flex flex-col">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-brand-yellow text-[10px] uppercase font-black tracking-tighter">
                          • {article.category_name || displayName}
                        </span>
                      </div>

                      <h3 className="text-brand-white font-bold text-lg md:text-xl group-hover:text-brand-yellow transition-colors line-clamp-3 mb-4 leading-tight">
                        {article.title}
                      </h3>

                      <div className="flex items-center justify-between mt-auto pt-3 border-t border-brand-black-medium">
                        <span className="text-brand-gray text-[10px] font-normal">
                          {new Date(article.created_at).toLocaleString('mr-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </span>
                        <div className="flex items-center gap-1 text-brand-yellow group-hover:translate-x-1 transition-transform">
                          <span className="text-[10px] uppercase font-black uppercase tracking-widest">पहा</span>
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar Section */}
          <aside className="w-full lg:w-80 flex-shrink-0 space-y-8">
            <LatestNewsWidget />
            <SidebarAd index={0} />
          </aside>

        </div>
      </div>
    </div>
  );
};

export default CategoryPage;

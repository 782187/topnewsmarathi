import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getYouTubeThumbnail } from '../utils/videoUtils.js';

const CityPage = () => {
  const { cityName } = useParams();
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
    fetchCityData();
  }, [cityName]);

  const fetchCityData = async () => {
    try {
      setLoading(true);
      // Fetch articles for city
      const response = await fetch(`${import.meta.env.VITE_API_URL}/articles?city=${encodeURIComponent(cityName)}&limit=20`);
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

  const displayName = decodeURIComponent(cityName);

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-black w-full p-8 flex justify-center">
        <div className="text-brand-white text-xl animate-pulse">{displayName} लोड होत आहे...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-black w-full" lang="mr">
      <div className="w-full px-4 md:px-6 lg:px-8 py-6 max-w-screen-2xl mx-auto">
        <div className="flex items-center gap-2 mb-8 border-b-2 border-brand-yellow pb-4">
          <span className="w-2 h-8 bg-brand-red rounded"></span>
          <h1 className="text-3xl font-bold text-brand-white">{displayName}</h1>
        </div>

        {articles.length === 0 ? (
          <div className="text-brand-gray text-center py-12">
            <span className="font-bold">{displayName}</span> साठी बातम्या आढळल्या नाहीत
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {articles.map((article) => (
              <Link
                key={article.id}
                to={`/article/${article.slug}`}
                className="bg-brand-gray-dark border border-brand-gray-medium hover:border-brand-yellow rounded-lg overflow-hidden transition-all duration-300 group hover:shadow-xl"
              >
                {(article.thumbnail || (article.type === 'video' && getYouTubeThumbnail(article.video_url))) && (
                  <div className="aspect-video relative overflow-hidden bg-brand-black">
                    <img
                      src={article.type === 'video' && article.video_url 
                        ? getYouTubeThumbnail(article.video_url)
                        : `${import.meta.env.VITE_STATIC_URL}${article.thumbnail}`}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {article.type === 'video' && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none bg-black/20 group-hover:bg-transparent transition-colors">
                        <div className="bg-brand-red w-12 h-12 rounded-full flex items-center justify-center shadow-lg border-2 border-brand-white">
                          <svg className="w-6 h-6 text-brand-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                        </div>
                      </div>
                    )}
                  </div>
                )}
                <div className="p-4">
                  <h3 className="text-brand-white font-bold text-lg hover:text-brand-yellow transition-colors line-clamp-3 mb-3 text-safe">
                    {article.title}
                  </h3>
                  <div className="flex items-center justify-between mt-auto pt-2 border-t border-brand-black-light">
                    <span className="text-brand-gray text-sm">
                      {new Date(article.created_at).toLocaleDateString('mr-IN')}
                    </span>
                    <span className="bg-brand-red text-brand-white text-xs px-2 py-1 rounded font-medium border border-brand-yellow">
                      {article.city_name || displayName}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CityPage;

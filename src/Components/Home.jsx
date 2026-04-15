import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import VideoArticlesSection from './VideoArticlesSection.jsx';
import CategorySection from './CategorySection.jsx';
import SEO from './SEO.jsx';
import { convertToEmbedUrl, isYouTubeUrl, getYouTubeThumbnail } from '../utils/videoUtils.js';

const Home = () => {
  const [latestArticles, setLatestArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryArticles, setCategoryArticles] = useState({});
  const [loading, setLoading] = useState(true);

  // Home Page Schema
  const homeSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "टॉप न्यूज मराठी",
    "url": "https://topnewsmarathi.com/",
    "description": "महाराष्ट्रातील आणि जगभरातील ताज्या घडामोडींचे विश्वसनीय केंद्र.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://topnewsmarathi.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  // Define category display order and properties
  const categoryConfig = {
    'राजकारण': { layout: 'featured' },
    'देश': { layout: 'default' },
    'विदेश': { layout: 'default' },
    'एंटरटेनमेंट': { layout: 'compact' },
    'क्रीडा': { layout: 'default' },
    'लाइफस्टाइल': { layout: 'compact' },
    'व्यापार': { layout: 'default' },
    'तंत्रज्ञान': { layout: 'compact' },
    'शहरे': { layout: 'default' }
  };

  useEffect(() => {
    fetchHomeData();
  }, []);

  const fetchHomeData = async () => {
    try {
      // Fetch categories first
      const categoriesResponse = await fetch(`${import.meta.env.VITE_API_URL}/categories`);
      const categoriesData = await categoriesResponse.json();
      const categoriesList = categoriesData.success ? categoriesData.data.categories : [];
      setCategories(categoriesList);

      // Fetch latest articles (including videos)
      const latestResponse = await fetch(`${import.meta.env.VITE_API_URL}/articles?limit=10`);
      const latestData = await latestResponse.json();
      const fetchedLatest = latestData.success ? latestData.data.articles : [];
      setLatestArticles(fetchedLatest);

      // Fetch articles for each category
      const categoryArticlesData = {};
      for (const category of categoriesList) {
        try {
          const response = await fetch(`${import.meta.env.VITE_API_URL}/articles?category=${encodeURIComponent(category.name)}&limit=8`);
          const data = await response.json();
          if (data.success && data.data.articles) {
            categoryArticlesData[category.name] = data.data.articles;
          }
        } catch (err) {
          console.error(`Error fetching articles for category ${category.name}:`, err);
        }
      }
      setCategoryArticles(categoryArticlesData);
    } catch (error) {
      console.error('Error fetching home data:', error);
    } finally {
      setLoading(false);
    }
  };

  const NewsFlashTicker = () => {
    // Build news items array from latest articles
    const newsItems = latestArticles.slice(0, 5);

    return (
      <div className="bg-brand-primary text-brand-white overflow-hidden shadow-lg">
        <div className="flex items-center">
          <div className="bg-brand-red-dark px-4 py-2 font-bold text-sm whitespace-nowrap">
            <span className="text-brand-white">न्यूज फ्लॅश</span>
          </div>
          <div className="flex-1 overflow-hidden bg-brand-black-light">
            <div className="animate-marquee whitespace-nowrap py-2">
              {newsItems.length > 0 ? (
                newsItems.map((article) => (
                  <Link 
                    key={article.id} 
                    to={`/article/${article.slug}`}
                    className="mx-4 hover:text-brand-accent transition-colors font-medium"
                  >
                    {article.title}
                  </Link>
                ))
              ) : (
                <span className="mx-4">ताज्या बातम्या लवकरच येत आहेत...</span>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const LiveVideoSection = () => {
    return (
      <div className="bg-brand-gray-dark rounded-xl overflow-hidden shadow-2xl shadow-black/50">
        <div className="aspect-video">
          <iframe 
            style={{ width: '100%', height: '100%' }}
            allowFullScreen 
            src="https://live1.ottlive.co.in/topnewsmarathi/topnewsmarathi/embed.html"
            title="Top News Marathi Live Stream"
            className="w-full h-full"
          />
        </div>
        <div className="p-3 sm:p-4 bg-gradient-to-r from-brand-black via-brand-gray-dark to-brand-black transition-all duration-300">
          <div className="flex items-center flex-wrap gap-x-3 gap-y-2">
            {/* Live Indicator Icon */}
            <div className="flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-red opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-red"></span>
              </span>
              <span className="bg-brand-red text-brand-white text-[10px] px-2 py-0.5 rounded font-bold">
                लाईव्ह
              </span>
            </div>

            {/* Title & Description in one row */}
            <div className="flex items-center flex-wrap gap-x-2 flex-1">
              <h3 className="text-brand-white font-bold text-sm sm:text-base md:text-lg whitespace-nowrap">
                टॉप न्यूज <span className="text-brand-yellow">मराठी</span>
              </h3>
              <span className="hidden xs:inline text-brand-gray/40">|</span>
              <span className="text-brand-gray text-[10px] sm:text-xs font-normal opacity-80 uppercase tracking-wide">
                थेट प्रक्षेपण • Live Stream
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  
  const LatestArticlesSection = () => (
    <div className="bg-brand-gray-dark rounded-xl p-4 shadow-2xl shadow-black/50 overflow-hidden">
          <h2 className="text-brand-white font-bold text-lg mb-4 flex items-center gap-2">
        <span className="text-brand-white">LATEST</span>
        <span className="text-brand-yellow ml-2">NEWS</span>
      </h2>
      <div className="space-y-3">
        {loading ? (
          Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="flex gap-3 animate-pulse p-2">
              <div className="w-24 h-18 md:w-28 md:h-20 bg-brand-gray-medium rounded flex-shrink-0"></div>
              <div className="flex-1">
                <div className="h-4 bg-brand-gray-medium rounded mb-2 w-full"></div>
              </div>
            </div>
          ))
        ) : latestArticles.length > 0 ? (
          latestArticles.slice(0, 4).map((article) => (
            <Link
              key={article.id}
              to={`/article/${article.slug}`}
              className="flex gap-3 hover:bg-brand-gray-medium/20 p-2 rounded-lg transition-all duration-300 shadow-sm hover:shadow-md font-bold"
            >
              {(article.thumbnail || (article.type === 'video' && getYouTubeThumbnail(article.video_url))) && (
                <div className="relative w-24 h-18 md:w-28 md:h-20 flex-shrink-0">
                  <img
                    src={article.type === 'video' && article.video_url 
                      ? getYouTubeThumbnail(article.video_url)
                      : `${import.meta.env.VITE_STATIC_URL}${article.thumbnail}`}
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
              <div className="flex-1">
                <h3 className="text-brand-white font-medium text-base hover:text-brand-yellow transition-colors break-words line-clamp-2">
                  {article.title}
                </h3>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-brand-gray text-xs font-normal">
                    {new Date(article.created_at).toLocaleDateString('mr-IN')}
                  </span>
                  {article.category_name && (
                    <span className="bg-brand-red text-brand-white text-xs px-2 py-1 rounded">
                      {article.category_name}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="text-brand-gray text-center py-8">
            <span className="text-brand-yellow">ताज्या बातम्या</span>
            <span className="text-brand-white ml-2">लवकरच...</span>
          </div>
        )}
      </div>
    </div>
  );

  const RemainingArticlesSection = () => {
    const remainingArticles = latestArticles.slice(4);
    
    if (remainingArticles.length === 0) return null;
    
    return (
      <div className="w-full mt-6">
        <div className="bg-brand-gray-dark rounded-xl p-4 shadow-2xl shadow-black/50 overflow-hidden">
          <h2 className="text-brand-white font-bold text-lg mb-4 flex items-center gap-2">
            <span className="w-1 h-5 bg-brand-yellow rounded"></span>
            <span className="text-brand-white">अधिक ताज्या बातम्या</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {remainingArticles.map((article) => (
              <Link
                key={article.id}
                to={`/article/${article.slug}`}
                className="bg-brand-black-light rounded-xl overflow-hidden hover:bg-brand-black-medium transition-all duration-300 group shadow-lg shadow-black/30 hover:shadow-2xl hover:shadow-black/50 flex flex-col font-bold"
              >
                {(article.thumbnail || (article.type === 'video' && getYouTubeThumbnail(article.video_url))) && (
                  <div className="aspect-video relative overflow-hidden bg-black">
                    <img
                      src={article.type === 'video' && article.video_url 
                        ? getYouTubeThumbnail(article.video_url)
                        : `${import.meta.env.VITE_STATIC_URL}${article.thumbnail}`}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {article.type === 'video' && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="bg-brand-red w-12 h-12 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                          <svg className="w-6 h-6 text-brand-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
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
                <div className="p-3 flex-1 flex flex-col">
                  <h3 className="text-brand-white font-medium text-sm md:text-base mb-3 line-clamp-2 group-hover:text-brand-yellow transition-colors">
                    {article.title}
                  </h3>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-brand-gray text-xs font-normal">
                      {new Date(article.created_at).toLocaleDateString('mr-IN')}
                    </span>
                    <svg className="w-4 h-4 text-brand-yellow transform group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 5l7 7-7 7"/>
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Render category sections in order
  const renderCategorySections = () => {
    if (categories.length === 0 || Object.keys(categoryArticles).length === 0) return null;

    // Sort categories based on the number of fetched articles (highest first)
    const sortedCategories = [...categories].sort((a, b) => {
      const aCount = categoryArticles[a.name] ? categoryArticles[a.name].length : 0;
      const bCount = categoryArticles[b.name] ? categoryArticles[b.name].length : 0;
      
      // Secondary sort: alphabetically if counts are equal
      if (aCount === bCount) {
        return a.name.localeCompare(b.name);
      }
      
      return bCount - aCount;
    });

    return sortedCategories.map((category) => {
      const articles = categoryArticles[category.name] || [];
      if (articles.length === 0) return null;

      const config = categoryConfig[category.name] || { layout: 'default' };
      const viewMoreLink = `/category/${category.name.toLowerCase()}`;

      return (
        <CategorySection
          key={category.id}
          title={category.name}
          articles={articles}
          loading={loading}
          viewMoreLink={viewMoreLink}
          layout={config.layout}
        />
      );
    });
  };

  return (
    <div className="min-h-screen bg-brand-black w-full">
      <SEO 
        title="ताजी मराठी बातमी, विश्वसनीय बातम्यांचा केंद्र" 
        description="टॉप न्यूज मराठी - महाराष्ट्रातील आणि जगभरातील ताज्या घडामोडी, राजकारण, क्रीडा आणि मनोरंजनाच्या बातम्यांचे विश्वसनीय केंद्र."
        schema={homeSchema}
      />
      {/* News Flash Ticker */}
      <NewsFlashTicker />
      
      {/* Main Content */}
      <div className="w-full px-4 py-6">
        <div className="max-w-screen-2xl mx-auto">
          {/* Two Column Layout */}
          <div className="flex flex-col lg:flex-row gap-4 items-start">
            {/* Left Column - Live Video */}
            <div className="w-full lg:w-1/2 items-start">
              <LiveVideoSection />
            </div>
            
            {/* Right Column - Latest Articles */}
            <div className="w-full lg:w-1/2 items-start">
              <LatestArticlesSection />
            </div>
          </div>
          
          {/* Video Articles Section - Only show if videos exist */}
          <VideoArticlesSection />
          
          {/* Category-wise Sections */}
          {renderCategorySections()}
          
          {/* Remaining Articles - Full Width */}
          <RemainingArticlesSection />
        </div>
      </div>
    </div>
  );
};

export default Home;

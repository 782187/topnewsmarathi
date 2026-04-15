import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const LatestNewsWidget = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/articles?limit=5`);
        const data = await response.json();
        if (data.success) {
          setArticles(data.data.articles);
        }
      } catch (err) {
        console.error('Error fetching latest news for widget:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchLatest();
  }, []);

  return (
    <div className="bg-brand-gray-dark border border-brand-gray-medium rounded-lg p-4">
      <h3 className="text-brand-white font-bold text-lg mb-4 border-b border-brand-yellow pb-2 flex items-center gap-2">
        <span className="w-1 h-4 bg-brand-red rounded"></span>
        <span className="text-brand-white">ताज्या बातम्या</span>
      </h3>

      <div className="space-y-4">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="animate-pulse space-y-2">
              <div className="h-4 bg-brand-gray-medium rounded w-full"></div>
              <div className="h-3 bg-brand-gray-medium rounded w-1/3"></div>
            </div>
          ))
        ) : (
          articles.map((article) => (
            <Link 
              key={article.id} 
              to={`/article/${article.slug}`}
              className="group block border-b border-brand-black-light pb-3 last:border-0 last:pb-0"
            >
              <h4 className="text-brand-white text-sm font-medium group-hover:text-brand-yellow transition-colors line-clamp-2 mb-1">
                {article.title}
              </h4>
              <span className="text-[10px] text-gray-500">
                {new Date(article.created_at).toLocaleDateString('mr-IN')}
              </span>
            </Link>
          ))
        )}
      </div>

      <Link 
        to="/" 
        className="mt-6 block text-center text-xs text-brand-yellow hover:text-brand-white font-bold transition-colors uppercase tracking-wider"
      >
        सर्व बातम्या पहा »
      </Link>
    </div>
  );
};

export default LatestNewsWidget;

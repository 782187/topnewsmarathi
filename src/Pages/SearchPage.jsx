import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { getYouTubeThumbnail } from '../utils/videoUtils.js';
import LatestNewsWidget from '../Components/LatestNewsWidget.jsx';
import { Search, Calendar, ChevronRight } from 'lucide-react';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ total: 0, page: 1, limit: 12 });

  useEffect(() => {
    if (query) {
      fetchSearchResults();
    }
  }, [query, searchParams.get('page')]);

  const fetchSearchResults = async () => {
    try {
      setLoading(true);
      const page = searchParams.get('page') || 1;
      const response = await fetch(`${import.meta.env.VITE_API_URL}/articles/search?q=${encodeURIComponent(query)}&page=${page}&limit=12`);
      const data = await response.json();
      
      if (data.success) {
        setArticles(data.data.articles);
        setPagination(data.data.pagination);
      }
    } catch (err) {
      console.error('Error fetching search results:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-black w-full" lang="mr">
      <div className="w-full px-4 md:px-6 lg:px-8 py-6 max-w-screen-2xl mx-auto">
        
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-[10px] md:text-xs text-brand-gray mb-6 uppercase tracking-widest opacity-70">
          <Link to="/" className="hover:text-brand-yellow transition-colors">होम</Link>
          <span className="text-brand-yellow">/</span>
          <span className="text-brand-white font-bold">शोध</span>
        </nav>

        {/* Search Header */}
        <div className="mb-10 border-b border-brand-gray-medium pb-6">
          <h1 className="text-2xl md:text-3xl font-black text-brand-white flex items-center gap-3">
            <Search className="text-brand-yellow" size={32} />
            <span>शोध निकाल: </span>
            <span className="text-brand-yellow">"{query}"</span>
          </h1>
          <p className="text-brand-gray mt-2 text-sm italic">
            एूण {pagination.total} बातम्या आढळल्या
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Results Feed */}
          <div className="flex-1">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-pulse">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-64 bg-brand-gray-dark rounded-xl"></div>
                ))}
              </div>
            ) : articles.length === 0 ? (
              <div className="text-center py-24 bg-brand-gray-dark/50 rounded-2xl border-2 border-dashed border-brand-gray-medium">
                <Search className="mx-auto text-brand-gray mb-4 opacity-20" size={64} />
                <h2 className="text-xl font-bold text-brand-white mb-2">कोणतेही निकाल आढळले नाहीत</h2>
                <p className="text-brand-gray">कृपया वेगळ्या शब्दांसह पुन्हा शोधून पहा.</p>
                <Link to="/" className="mt-8 inline-block bg-brand-yellow text-brand-black px-8 py-3 rounded-lg font-bold hover:scale-105 transition-transform">
                  मुख्य पृष्ठावर जा
                </Link>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {articles.map((article) => (
                    <Link
                      key={article.id}
                      to={`/article/${article.slug}`}
                      className="group bg-brand-black-light border border-brand-gray-medium hover:border-brand-yellow rounded-xl overflow-hidden transition-all duration-500 hover:shadow-[0_20px_50px_-20px_rgba(0,0,0,1)] flex flex-col h-full"
                    >
                      {(article.thumbnail || (article.type === 'video' && getYouTubeThumbnail(article.video_url))) && (
                        <div className="aspect-video relative overflow-hidden">
                          <img
                            src={article.type === 'video' && article.video_url 
                              ? getYouTubeThumbnail(article.video_url)
                              : `${import.meta.env.VITE_STATIC_URL}${article.thumbnail}`}
                            alt={article.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                          />
                          {article.type === 'video' && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                              <div className="bg-brand-red w-14 h-14 rounded-full flex items-center justify-center border-2 border-white group-hover:scale-110 transition-transform shadow-2xl">
                                <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                              </div>
                            </div>
                          )}
                          <div className="absolute top-3 left-3 bg-brand-black/80 backdrop-blur-md px-3 py-1 rounded-md text-[10px] text-brand-yellow font-bold uppercase border border-white/10 tracking-widest">
                            {article.category_name}
                          </div>
                        </div>
                      )}
                      
                      <div className="p-5 flex-1 flex flex-col">
                        <h2 className="text-xl font-bold text-brand-white group-hover:text-brand-yellow transition-colors line-clamp-2 leading-tight mb-4">
                          {article.title}
                        </h2>
                        
                        <p className="text-brand-gray text-sm line-clamp-3 mb-6 opacity-80 leading-relaxed">
                          {article.description}
                        </p>
                        
                        <div className="mt-auto pt-4 border-t border-brand-gray-medium/50 flex items-center justify-between text-xs text-brand-gray font-medium">
                          <div className="flex items-center gap-2">
                             <Calendar size={14} className="text-brand-yellow" />
                             {new Date(article.created_at).toLocaleDateString('mr-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </div>
                          <div className="flex items-center gap-1 text-brand-yellow font-bold group-hover:translate-x-1 transition-transform">
                             पुढे वाचा <ChevronRight size={14} />
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Simple Pagination */}
                {pagination.totalPages > 1 && (
                  <div className="mt-12 flex justify-center gap-2">
                     {[...Array(pagination.totalPages)].map((_, i) => (
                       <Link
                         key={i}
                         to={`/search?q=${encodeURIComponent(query)}&page=${i + 1}`}
                         className={`w-10 h-10 flex items-center justify-center rounded-lg font-bold transition-all ${
                           pagination.page === i + 1 
                             ? 'bg-brand-yellow text-brand-black scale-110 shadow-lg' 
                             : 'bg-brand-gray-dark text-brand-white hover:bg-brand-gray-medium'
                         }`}
                       >
                         {i + 1}
                       </Link>
                     ))}
                  </div>
                )}
              </>
            )}
          </div>

          {/* Sidebar */}
          <aside className="w-full lg:w-80 flex-shrink-0">
             <div className="sticky top-24 space-y-8">
                <LatestNewsWidget />
             </div>
          </aside>

        </div>
      </div>
    </div>
  );
};

export default SearchPage;

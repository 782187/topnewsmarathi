import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Home, ChevronRight, Clock, FileText, User } from 'lucide-react';
import { getYouTubeThumbnail } from '../utils/videoUtils.js';
import SEO from '../Components/SEO.jsx';
import LatestNewsWidget from '../Components/LatestNewsWidget.jsx';
import { buildStaticUrl } from '../utils/staticUrl.js';

const API_URL = import.meta.env.VITE_API_URL || '';

const formatDate = (dateString) =>
  new Date(dateString).toLocaleDateString('mr-IN', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

// ─── Skeleton ────────────────────────────────────────────────────────────────
const ArticleCardSkeleton = () => (
  <div className="bg-brand-black-light border border-brand-gray-medium rounded-xl overflow-hidden animate-pulse">
    <div className="aspect-video bg-brand-gray-medium"></div>
    <div className="p-4 space-y-3">
      <div className="h-3 bg-brand-gray-medium rounded w-1/3"></div>
      <div className="h-5 bg-brand-gray-medium rounded w-full"></div>
      <div className="h-5 bg-brand-gray-medium rounded w-4/5"></div>
      <div className="h-3 bg-brand-gray-medium rounded w-1/4 mt-4"></div>
    </div>
  </div>
);

// ─── Article Card ─────────────────────────────────────────────────────────────
const ArticleCard = ({ article }) => {
  const thumb =
    article.type === 'video' && article.video_url
      ? getYouTubeThumbnail(article.video_url)
      : article.thumbnail
      ? buildStaticUrl(article.thumbnail)
      : null;

  return (
    <Link
      to={`/article/${article.slug}`}
      className="bg-brand-black-light border border-brand-gray-medium hover:border-brand-yellow rounded-xl overflow-hidden transition-all duration-300 group hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.9)] flex flex-col"
    >
      {/* Thumbnail */}
      <div className="aspect-video relative bg-brand-black flex-shrink-0 flex items-center justify-center">
        {thumb ? (
          <img
            src={thumb}
            alt={article.title}
            className="w-full h-full object-contain"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-brand-gray-dark">
            <FileText size={32} className="text-brand-gray-medium" />
          </div>
        )}
        {article.type === 'video' && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/10 transition-all">
            <div className="bg-brand-red w-12 h-12 rounded-full flex items-center justify-center shadow-2xl border-2 border-white group-hover:scale-110 transition-transform">
              <svg className="w-5 h-5 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        )}
        {article.is_featured && (
          <span className="absolute top-2 left-2 bg-brand-yellow text-brand-black text-[10px] px-2 py-0.5 rounded-full font-black uppercase tracking-widest">
            विशेष
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <span className="text-brand-yellow text-[10px] font-black uppercase tracking-wider mb-2">
          • {article.category_name}
        </span>
        <h3 className="text-brand-white font-bold text-base md:text-lg group-hover:text-brand-yellow transition-colors line-clamp-3 leading-snug flex-1">
          {article.title}
        </h3>
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-brand-black">
          <div className="flex items-center gap-1.5 text-brand-gray text-[10px]">
            <Clock size={11} className="text-brand-yellow" />
            {formatDate(article.created_at)}
          </div>
          <div className="flex items-center gap-1 text-brand-yellow group-hover:translate-x-1 transition-transform">
            <span className="text-[10px] font-black uppercase tracking-widest">पहा</span>
            <ChevronRight size={14} />
          </div>
        </div>
      </div>
    </Link>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────
const AuthorPage = () => {
  const { authorId } = useParams();
  const navigate     = useNavigate();

  const [author,   setAuthor]   = useState(null);
  const [articles, setArticles] = useState([]);
  const [pagination, setPagination] = useState({ total: 0, page: 1, totalPages: 1 });
  const [loading,  setLoading]  = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error,    setError]    = useState(null);
  const [imgError, setImgError] = useState(false);

  const fetchPage = useCallback(async (page, replace = false) => {
    try {
      replace ? setLoading(true) : setLoadingMore(true);
      const res  = await fetch(`${API_URL}/authors/${authorId}/articles?page=${page}&limit=12`);
      const data = await res.json();
      if (!data.success) throw new Error(data.message || 'Not found');

      setAuthor(data.data.author);
      setArticles(prev => replace ? data.data.articles : [...prev, ...data.data.articles]);
      setPagination(data.data.pagination);
    } catch (err) {
      setError('लेखक माहिती लोड करण्यात अक्षम');
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [authorId]);

  useEffect(() => {
    setImgError(false);
    fetchPage(1, true);
  }, [authorId, fetchPage]);

  const loadMore = () => fetchPage(pagination.page + 1, false);

  // ── Error / Not found ──────────────────────────────────────────────────────
  if (!loading && error) {
    return (
      <div className="min-h-screen bg-brand-black flex items-center justify-center">
        <div className="text-center bg-brand-black-light p-10 rounded-2xl border border-brand-red/30 shadow-2xl">
          <div className="text-brand-red text-5xl mb-6">⚠️</div>
          <p className="text-brand-white text-xl font-black mb-6">{error}</p>
          <button onClick={() => navigate(-1)} className="btn-accent px-8 py-3">
            मागे जा
          </button>
        </div>
      </div>
    );
  }

  const initials = author?.name
    ? author.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
    : '?';

  return (
    <div className="min-h-screen bg-brand-black w-full pb-16" lang="mr">
      {author && (
        <SEO
          title={`${author.name} - लेखकाच्या बातम्या | टॉप न्यूज मराठी`}
          description={`${author.name} यांनी लिहिलेल्या सर्व बातम्या वाचा. एकूण ${pagination.total} लेख.`}
          image={author.profile_image ? buildStaticUrl(author.profile_image) : null}
        />
      )}

      <div className="w-full px-4 md:px-6 lg:px-8 py-6 max-w-screen-2xl mx-auto">

        {/* Breadcrumb */}
        <nav className="flex items-center flex-wrap gap-2 text-[10px] md:text-xs text-brand-gray mb-8 uppercase tracking-widest font-bold">
          <Link to="/" className="hover:text-brand-yellow transition-colors flex items-center gap-1">
            <Home size={12} /> होम
          </Link>
          <ChevronRight size={12} className="text-brand-red" />
          <span className="text-brand-yellow/70">{loading ? '...' : author?.name}</span>
        </nav>

        {/* Author Hero Card */}
        {loading ? (
          <div className="animate-pulse flex flex-col sm:flex-row items-center sm:items-start gap-6 bg-brand-black-light border border-brand-gray-medium rounded-2xl p-6 md:p-8 mb-10">
            <div className="w-28 h-28 md:w-36 md:h-36 rounded-full bg-brand-gray-medium flex-shrink-0"></div>
            <div className="flex-1 space-y-3 w-full">
              <div className="h-8 bg-brand-gray-medium rounded w-1/2"></div>
              <div className="h-4 bg-brand-gray-medium rounded w-1/4"></div>
            </div>
          </div>
        ) : author && (
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 bg-gradient-to-br from-brand-black-light to-brand-gray-dark border border-brand-gray-medium rounded-2xl p-6 md:p-8 mb-10 shadow-2xl">

            {/* Avatar */}
            <div
              style={{ width: 128, height: 128, minWidth: 128 }}
              className="md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-brand-yellow/40 shadow-[0_0_30px_rgba(0,0,0,0.6)] flex-shrink-0"
            >
              {author.profile_image && !imgError ? (
                <img
                  src={buildStaticUrl(author.profile_image)}
                  alt={author.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }}
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className="w-full h-full bg-brand-red-dark flex items-center justify-center">
                  <span className="text-brand-yellow font-black text-4xl">{initials}</span>
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                <span className="text-[10px] bg-brand-red/20 text-brand-red border border-brand-red/30 px-3 py-0.5 rounded-full font-black uppercase tracking-widest">
                  लेखक
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-black text-brand-white mt-2 mb-3 tracking-tight">
                {author.name}
              </h1>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-sm text-brand-gray">
                <span className="flex items-center gap-1.5">
                  <FileText size={14} className="text-brand-yellow" />
                  <span><strong className="text-brand-white">{pagination.total}</strong> लेख</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock size={14} className="text-brand-yellow" />
                  <span>सहभागी: {formatDate(author.created_at)}</span>
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Section Header */}
        <div className="flex items-center gap-3 mb-6 border-b border-brand-gray-medium pb-4">
          <span className="w-1.5 h-8 bg-brand-red rounded shadow-[0_0_10px_rgba(255,0,0,0.5)]"></span>
          <h2 className="text-2xl md:text-3xl font-black text-brand-white tracking-tight">
            {loading ? '...' : `${author?.name} यांचे लेख`}
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">

          {/* Articles Grid */}
          <main className="flex-1 min-w-0">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => <ArticleCardSkeleton key={i} />)}
              </div>
            ) : articles.length === 0 ? (
              <div className="text-center py-20 bg-brand-black-light rounded-2xl border border-dashed border-brand-gray-medium">
                <User size={48} className="text-brand-gray-medium mx-auto mb-4" />
                <p className="text-brand-gray text-lg font-bold">अद्याप कोणताही लेख नाही</p>
                <p className="text-brand-gray text-sm mt-1">या लेखकाने अद्याप कोणताही लेख प्रकाशित केलेला नाही.</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {articles.map(article => (
                    <ArticleCard key={article.id} article={article} />
                  ))}
                </div>

                {/* Load More */}
                {pagination.page < pagination.totalPages && (
                  <div className="flex justify-center mt-10">
                    <button
                      onClick={loadMore}
                      disabled={loadingMore}
                      className="px-10 py-3 bg-brand-red text-white font-black rounded-full hover:bg-brand-red-dark transition-all disabled:opacity-50 flex items-center gap-3 shadow-lg hover:shadow-brand-red/30"
                    >
                      {loadingMore ? (
                        <>
                          <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          लोड होत आहे...
                        </>
                      ) : (
                        <>आणखी बातम्या पहा ({pagination.total - articles.length} शिल्लक)</>
                      )}
                    </button>
                  </div>
                )}

                {/* Article count summary */}
                <p className="text-center text-brand-gray text-xs mt-4">
                  {articles.length} / {pagination.total} लेख दाखवत आहे
                </p>
              </>
            )}
          </main>

          {/* Sidebar */}
          <aside className="w-full lg:w-80 flex-shrink-0 space-y-8">
            <div className="sticky top-24">
              <LatestNewsWidget />
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
};

export default AuthorPage;

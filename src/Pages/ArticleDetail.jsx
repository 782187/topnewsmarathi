import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { convertToEmbedUrl, isYouTubeUrl } from '../utils/videoUtils.js';
import LatestNewsWidget from '../Components/LatestNewsWidget.jsx';
import SEO from '../Components/SEO.jsx';
import { Link as LinkIcon, Home, ChevronRight, Clock, User, Share2 } from 'lucide-react';

// Production-safe text sanitization for Marathi/Devanagari
const cleanText = (text) => {
  if (!text) return '';
  return text
    .replace(/\u200B/g, '') // Remove Zero-Width Space
    .replace(/\uFEFF/g, '') // Remove BOM
    .trim();
};

const cleanHTML = (html) => {
  if (!html) return '';
  return html
    .replace(/\u200B/g, '')
    .replace(/\uFEFF/g, '')
    .replace(/&nbsp;/g, ' ') // Normalize non-breaking spaces
    .trim();
};

const generateDescription = (html) => {
  if (!html) return '';
  const text = html.replace(/<[^>]+>/g, '').trim();
  if (text.length <= 160) return text;
  return text.substring(0, 160) + '...';
};

const ArticleDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchArticle();
  }, [slug]);

  const fetchArticle = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_URL}/articles/${slug}`);
      const data = await response.json();

      if (data.success) {
        setArticle(data.data.article);
        // Fetch related articles from same category
        if (data.data.article.category_name) {
          fetchRelated(data.data.article.category_name, data.data.article.id);
        }
      } else {
        setError('लेख आढळला नाही');
      }
    } catch (err) {
      console.error('Error fetching article:', err);
      setError('लेख लोड करण्यात अक्षम');
    } finally {
      setLoading(false);
    }
  };

  const fetchRelated = async (category, currentId) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/articles?category=${encodeURIComponent(category)}&limit=4`);
      const data = await response.json();
      if (data.success) {
        setRelatedArticles(data.data.articles.filter(a => a.id !== currentId));
      }
    } catch (err) {
      console.error('Error fetching related articles:', err);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('mr-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('लिंक कॉपी केली!');
  };

  // NewsArticle Schema for Google News
  const articleSchema = useMemo(() => {
    if (!article) return null;
    return {
      "@context": "https://schema.org",
      "@type": "NewsArticle",
      "headline": cleanText(article.title),
      "image": [
        article.thumbnail ? `${import.meta.env.VITE_STATIC_URL}${article.thumbnail}` : ""
      ],
      "datePublished": article.created_at,
      "dateModified": article.updated_at || article.created_at,
      "author": [{
        "@type": "Organization",
        "name": "टॉप न्यूज मराठी",
        "url": "https://topnewsmarathi.com/"
      }],
      "publisher": {
        "@type": "Organization",
        "name": "टॉप न्यूज मराठी",
        "logo": {
          "@type": "ImageObject",
          "url": "https://topnewsmarathi.com/logo.png"
        }
      },
      "description": generateDescription(article.content)
    };
  }, [article]);

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-black w-full pb-16">
        <div className="w-full px-4 md:px-6 lg:px-8 py-6 max-w-screen-2xl mx-auto">
          {/* Skeleton Breadcrumb */}
          <div className="flex gap-2 mb-8">
            <div className="w-20 h-4 skeleton"></div>
            <div className="w-4 h-4 skeleton"></div>
            <div className="w-32 h-4 skeleton"></div>
          </div>

          <div className="flex flex-col lg:flex-row gap-10">
            <div className="flex-1">
              <div className="w-3/4 h-12 skeleton mb-6"></div>
              <div className="w-full h-6 skeleton mb-4"></div>
              <div className="w-full h-6 skeleton mb-8"></div>
              <div className="w-full aspect-video skeleton rounded-xl mb-8"></div>
              <div className="space-y-4">
                <div className="w-full h-4 skeleton"></div>
                <div className="w-full h-4 skeleton"></div>
                <div className="w-5/6 h-4 skeleton"></div>
              </div>
            </div>
            <div className="w-full lg:w-[340px] hidden lg:block">
              <div className="w-full h-[400px] skeleton rounded-xl"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-brand-black w-full flex items-center justify-center">
        <div className="text-center bg-brand-black-light p-10 rounded-2xl border border-brand-red/30 shadow-2xl">
          <div className="text-brand-red text-5xl mb-6">⚠️</div>
          <div className="text-brand-white text-2xl font-black mb-6">{error || 'लेख आढळला नाही'}</div>
          <button
            onClick={() => navigate(-1)}
            className="btn-accent px-10 py-4"
          >
            मागे जा
          </button>
        </div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-brand-black w-full pb-16" lang="mr">
      {article && (
        <SEO
          title={cleanText(article.title)}
          description={generateDescription(article.content)}
          image={article.thumbnail ? `${import.meta.env.VITE_STATIC_URL}${article.thumbnail}` : null}
          type="article"
          schema={articleSchema}
        />
      )}
      <div className="w-full px-4 md:px-6 lg:px-8 py-6 max-w-screen-2xl mx-auto">

        {/* Improved Breadcrumb Navigation */}
        <nav className="flex items-center flex-wrap gap-2 text-[10px] md:text-xs text-brand-gray mb-8 uppercase tracking-widest font-bold">
          <Link to="/" className="hover:text-brand-yellow transition-colors flex items-center gap-1 group">
            <Home size={12} className="group-hover:scale-110 transition-transform" /> होम
          </Link>
          <ChevronRight size={12} className="text-brand-red mx-1" />

          {article.category_name && (
            <>
              <Link to={`/category/${article.category_name}`} className="hover:text-brand-yellow transition-colors px-2 py-1 bg-brand-black-light rounded border border-brand-gray-medium/30">
                {article.category_name}
              </Link>
              <ChevronRight size={12} className="text-brand-red mx-1" />
            </>
          )}

          {article.city_name && (
            <>
              <Link to={`/city/${article.city_name}`} className="hover:text-brand-yellow transition-colors px-2 py-1 bg-brand-black-light rounded border border-brand-gray-medium/30">
                {article.city_name}
              </Link>
              <ChevronRight size={12} className="text-brand-red mx-1" />
            </>
          )}

          <span className="text-brand-yellow/70 line-clamp-1 italic max-w-[150px] sm:max-w-xs">{cleanText(article.title)}</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-10">

          {/* Left Column: Main Article Content */}
          <main className="flex-1 w-full min-w-0">

            {/* Headline Section */}
            <header className="mb-8">
              {/* Category / Video Badge */}
              <div className="flex flex-wrap gap-3 mb-6">
                {article.type === 'video' && (
                  <span className="bg-brand-red text-white text-[10px] px-3 py-1 rounded-full font-black uppercase tracking-[0.2em] flex items-center gap-2 shadow-lg shadow-brand-red/40 ring-1 ring-white/20">
                    <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span> व्हिडिओ
                  </span>
                )}
                {article.is_featured && (
                  <span className="bg-brand-yellow text-brand-black text-[10px] px-3 py-1 rounded-full font-black uppercase tracking-[0.2em] shadow-lg shadow-brand-yellow/20">
                    विशेष बातमी
                  </span>
                )}
                <span className="bg-brand-black-light text-brand-gray text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-widest border border-brand-gray-medium/50">
                  {article.category_name}
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-brand-white leading-[1.15] tracking-tight mb-8 overflow-wrap-break-word">
                {cleanText(article.title)}
              </h1>

              {/* Metadata and Share Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 py-6 border-y border-brand-gray-medium/30 bg-brand-gray-dark/30 px-4 rounded-xl">

                {/* Author and Date */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand-red-dark flex items-center justify-center border-2 border-brand-yellow/30 shadow-lg">
                    <User size={24} className="text-brand-yellow" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="text-sm font-black text-brand-white flex items-center gap-2">
                      टॉप न्यूज मराठी टीम
                    </div>
                    <div className="flex items-center gap-2 text-xs text-brand-gray">
                      <Clock size={12} className="text-brand-yellow" />
                      {formatDate(article.created_at)}
                    </div>
                  </div>
                </div>

                {/* Social Share Icons */}
                <div className="flex items-center gap-3">
                  <span className="text-[10px] text-brand-gray hidden sm:block uppercase tracking-[0.2em] font-black mr-2">शेअर करा</span>
                  <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl bg-[#1877F2]/10 text-[#1877F2] flex items-center justify-center hover:bg-[#1877F2] hover:text-white transition-all hover:-translate-y-1 border border-[#1877F2]/20">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
                  </a>
                  <a href={`https://x.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(article.title)}`} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl bg-white/10 text-white flex items-center justify-center hover:bg-white hover:text-black transition-all hover:-translate-y-1 border border-white/20">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" /></svg>
                  </a>
                  <a href={`https://api.whatsapp.com/send?text=${encodeURIComponent(article.title + ' ' + window.location.href)}`} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl bg-[#25D366]/10 text-[#25D366] flex items-center justify-center hover:bg-[#25D366] hover:text-white transition-all hover:-translate-y-1 border border-[#25D366]/20">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                  </a>
                  <button onClick={copyToClipboard} className="w-10 h-10 rounded-xl bg-brand-black-light text-brand-white flex items-center justify-center hover:bg-brand-yellow hover:text-brand-black transition-all hover:rotate-12 border border-brand-gray-medium/50" title="लिंक कॉपी करा">
                    <LinkIcon size={18} />
                  </button>
                </div>
              </div>
            </header>

            {/* Featured Media Container */}
            <div className="relative group mb-10">
              {article.type === 'video' && article.video_url ? (
                <div className="w-full shadow-[0_30px_60px_-15px_rgba(0,0,0,0.7)] rounded-2xl overflow-hidden ring-1 ring-white/10 bg-black">
                  <div className="relative w-full aspect-video">
                    <iframe
                      src={isYouTubeUrl(article.video_url) ? convertToEmbedUrl(article.video_url) : article.video_url}
                      title={article.title}
                      className="absolute top-0 left-0 w-full h-full"
                      allowFullScreen
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    />
                  </div>
                </div>
              ) : article.thumbnail ? (
                <figure className="w-full relative rounded-2xl overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.7)] ring-1 ring-white/10 aspect-video bg-brand-black-light flex items-center justify-center">
                  <img
                    src={`${import.meta.env.VITE_STATIC_URL}${article.thumbnail}`}
                    alt={article.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2000ms]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </figure>
              ) : null}
            </div>

            {/* Article Body Content */}
            <div
              className="article-content"
              dangerouslySetInnerHTML={{ __html: cleanHTML(article.content) || '' }}
            />

            {/* Bottom Tag / Share Area */}
            <div className="mt-16 pt-8 border-t border-brand-gray-medium/30 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex flex-wrap gap-2">
                {article.category_name && <span className="bg-brand-black-light px-4 py-2 rounded-lg border border-brand-gray-medium/20 text-brand-gray text-xs font-black uppercase tracking-widest"># {article.category_name}</span>}
                {article.city_name && <span className="bg-brand-black-light px-4 py-2 rounded-lg border border-brand-gray-medium/20 text-brand-gray text-xs font-black uppercase tracking-widest"># {article.city_name}</span>}
              </div>

              <button
                onClick={copyToClipboard}
                className="flex items-center gap-3 bg-brand-yellow/10 text-brand-yellow px-6 py-3 rounded-full font-black text-sm hover:bg-brand-yellow hover:text-brand-black transition-all group"
              >
                <Share2 size={18} className="group-hover:rotate-12 transition-transform" /> फेसबुकवर शेअर करा
              </button>
            </div>

            {/* Related News Section */}
            {relatedArticles.length > 0 && (
              <section className="mt-20">
                <div className="flex items-center gap-4 mb-8">
                  <span className="w-12 h-1 bg-brand-red rounded-full"></span>
                  <h2 className="text-2xl font-black text-brand-white uppercase tracking-tighter">संबंधित बातम्या</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {relatedArticles.map(rel => (
                    <Link key={rel.id} to={`/article/${rel.slug}`} className="group">
                      <div className="aspect-video rounded-xl overflow-hidden bg-brand-black-light mb-3 ring-1 ring-white/5 group-hover:ring-brand-yellow/30 transition-all">
                        {rel.thumbnail && (
                          <img
                            src={`${import.meta.env.VITE_STATIC_URL}${rel.thumbnail}`}
                            alt={rel.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                        )}
                      </div>
                      <h3 className="text-brand-white text-sm font-bold leading-snug group-hover:text-brand-yellow transition-colors line-clamp-2">
                        {cleanText(rel.title)}
                      </h3>
                    </Link>
                  ))}
                </div>
              </section>
            )}

          </main>

          {/* Right Column: Sidebar */}
          <aside className="w-full lg:w-[340px] flex-shrink-0 space-y-8 mt-10 lg:mt-0">
            <div className="sticky top-24">
              {/* Custom Highlight Box */}
              <div className="bg-gradient-to-br from-brand-red/20 to-brand-black-light rounded-2xl border border-brand-red/40 p-6 mb-8 shadow-2xl overflow-hidden relative group">
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-brand-red/10 rounded-full blur-2xl group-hover:bg-brand-red/20 transition-all"></div>
                <h3 className="text-brand-white font-black text-xl mb-3 flex items-center gap-3">
                  <span className="flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-brand-red opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-red"></span>
                  </span>
                  ब्रेकिंग न्यूज
                </h3>
                <p className="text-brand-gray text-sm font-medium leading-relaxed mb-4">
                  ताज्या आणि सत्य बातम्यांसाठी टॉप न्यूज मराठी शी जोडलेले राहा. आम्ही आपल्यासाठी सर्वात महत्त्वाच्या बातम्या घेऊन येतो.
                </p>
                <Link to="/fresh" className="text-brand-yellow font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:translate-x-2 transition-transform">
                  सर्व बातम्या पहा <ChevronRight size={14} />
                </Link>
              </div>

              {/* Reusable Latest News Widget */}
              <div className="shadow-xl">
                <LatestNewsWidget />
              </div>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
};


export default ArticleDetail;

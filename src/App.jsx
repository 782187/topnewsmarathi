import './App.css'
import { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import Home from './Components/Home'
import ArticleDetail from './Pages/ArticleDetail'
import { TopBannerAd } from './Components/Ads'

// Import newly created Real Page Components

import LatestNewsPage from './Pages/LatestNewsPage'
import CategoryPage from './Pages/CategoryPage'
import CityPage from './Pages/CityPage'
import SearchPage from './Pages/SearchPage'
import VideosPage from './Pages/VideosPage'
import EpaperPage from './Pages/EpaperPage'
import AuthorPage from './Pages/AuthorPage'
import FollowUsPage from './Pages/FollowUsPage'
import AboutPage from './Pages/AboutPage'
import AnirbanSarkarPage from './Pages/AnirbanSarkarPage'
import TermsAndConditionsPage from './Pages/TermsAndConditionsPage'
import PrivacyPolicyPage from './Pages/PrivacyPolicyPage'
import ScrollToTop from './Components/ScrollToTop'
import ErrorBoundary from './Components/ErrorBoundary'
import PushNotificationManager from './Components/PushNotificationManager'
import { Toaster } from 'react-hot-toast'

// Lazy-loaded: pulls in react-pdf/pdfjs (~230KB gzipped) which only readers
// of the E-Paper section need — keeps it out of the main bundle.
const EpaperReader = lazy(() => import('./Pages/EpaperReader'))

const ReaderFallback = () => (
  <div className="min-h-screen bg-brand-black w-full flex items-center justify-center">
    <div className="text-brand-white text-xl animate-pulse">ई-पेपर लोड होत आहे...</div>
  </div>
)

function App() {
  return (
    <ErrorBoundary>
      <PushNotificationManager />
      <Toaster />
      <Router>
        <ScrollToTop />
        <TopBannerAd />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/article/:slug" element={<ArticleDetail />} />
        
        {/* Specific Structural Pages */}

        <Route path="/fresh" element={<LatestNewsPage />} />
        <Route path="/videos" element={<VideosPage />} />

        {/* E-Paper: grid of editions + page-by-page PDF reader */}
        <Route path="/epaper" element={<EpaperPage />} />
        <Route
          path="/epaper/:editionSlug/:date"
          element={(
            <Suspense fallback={<ReaderFallback />}>
              <EpaperReader />
            </Suspense>
          )}
        />
        
        {/* Dynamic Category Maps */}
        <Route path="/category/:categoryId" element={<CategoryPage />} />
        
        {/* Search Results Page */}
        <Route path="/search" element={<SearchPage />} />
        
        {/* Dynamic City Maps */}
        <Route path="/city/:cityName" element={<CityPage />} />

        {/* Author Profile Page */}
        <Route path="/author/:authorId" element={<AuthorPage />} />

        {/* Follow Us Page */}
        <Route path="/follow" element={<FollowUsPage />} />

        {/* About Us / Director Profile Page */}
        <Route path="/about" element={<AboutPage />} />

        {/* Dr. Anirban Sarkar — Director Profile Page */}
        <Route path="/about/anirban-sarkar" element={<AnirbanSarkarPage />} />

        {/* Terms & Conditions Page */}
        <Route path="/terms-and-conditions" element={<TermsAndConditionsPage />} />

        {/* Privacy Policy Page */}
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
      </Routes>
      <Footer />
      </Router>
    </ErrorBoundary>
  )
}

export default App

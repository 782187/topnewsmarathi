import './App.css'
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

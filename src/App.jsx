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
      </Routes>
      <Footer />
      </Router>
    </ErrorBoundary>
  )
}

export default App

import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Search,
  Bell,
  Menu,
  X,
  ChevronDown
} from 'lucide-react';
import NotificationDropdown from './NotificationDropdown';

// Custom Social Media Icons as SVG components
const FacebookIcon = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const XIcon = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
  </svg>
);

const ThreadsIcon = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M15.42 12.01c-.01 0-.02 0-.02 0 .01-.01.02-.01.02-.01l-.01.01h.01zm3.7-4.32a.1.1 0 0 1 .01.01s.01.01 0 0l-.01-.01zm-1.89-1.92s-.01.01 0 0c.01-.01.01-.01.01-.01h-.01zm-.7 8.52h.01c-.01 0-.01 0-.01 0s0 0 0 0zm2.71-3.61l.01.01s.01 0 .01-.01h-.02zm-1.07 1.83l.01.01s.01 0 0-.01h-.01zm-.15-4.47l.01.01s.01 0 .01-.01h-.02zm.12 5.06s.01 0 .01-.01h-.01s-.01.01 0 .01zm1.03-3.08h.01c-.01 0-.01 0-.01 0s0 0 0 0zm-1.03-2.61h.01c-.01 0-.01 0-.01 0s0 0 0 0zm-2.01 7.24h.01c-.01 0-.01 0-.01 0s0 0 0 0zm3.01-4.72h.01c-.01 0-.01 0-.01 0s0 0 0 0zm.01 2.3h.01c-.01 0-.01 0-.01 0s0 0 0 0z" /><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm6.2 13.5c-.2.4-.4.7-.7 1-.3.3-.7.5-1.2.7-.4.2-1 .3-1.6.3-.6 0-1.2-.1-1.7-.3-.5-.2-1-.5-1.4-.8-.4-.3-.7-.7-.9-1.1-.2-.4-.3-.9-.3-1.4 0-.5.1-1 .3-1.4.2-.4.5-.8.9-1.1.4-.3.9-.6 1.4-.8.5-.2 1.1-.3 1.7-.3.6 0 1.2.1 1.7.3.5.2 1 .5 1.4.8.4.3.7.7.9 1.1.2.4.3.9.3 1.4 0 .5-.1 1-.3 1.4zm-2.2-4.1c-.2-.2-.4-.3-.7-.4-.3-.1-.6-.2-.9-.2-.3 0-.6.1-.9.2-.3.1-.5.3-.7.5-.2.2-.3.4-.4.7-.1.3-.2.6-.2.9s.1.6.2.9c.1.3.2.5.4.7.2.2.4.3.7.4.3.1.6.2.9.2.3 0 .6-.1.9-.2.3-.1.5-.3.7-.5.2-.2.3-.4.4-.7.1-.3.2-.6.2-.9s-.1-.6-.2-.9c-.1-.3-.2-.5-.4-.7z" />
  </svg>
);

const InstagramIcon = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z" />
  </svg>
);

const YoutubeIcon = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const Navbar = () => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const [dynamicCategories, setDynamicCategories] = useState([]);
  const dropdownRef = useRef(null);
  const sidebarRef = useRef(null);

  // Fallback map to translate standard English category slugs from backend to Marathi logic
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

  useEffect(() => {
    fetchDynamicCategories();
    fetchDynamicCities();
    fetchUnreadCount();

    // Listen for custom event when notifications are marked as read
    const handleRead = () => setUnreadCount(0);
    window.addEventListener('notifications_read', handleRead);
    return () => window.removeEventListener('notifications_read', handleRead);
  }, []);

  const fetchUnreadCount = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/notifications`);
      const data = await response.json();
      if (data.success && data.data.notifications.length > 0) {
        const lastViewedId = localStorage.getItem('last_viewed_notification_id');
        const latestId = data.data.notifications[0].id;

        if (!lastViewedId) {
          setUnreadCount(data.data.notifications.length);
        } else {
          const count = data.data.notifications.filter(n => n.id > parseInt(lastViewedId)).length;
          setUnreadCount(count);
        }
      }
    } catch (err) {
      console.error('Failed to fetch unread count', err);
    }
  };

  const fetchDynamicCategories = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/categories`);
      const data = await response.json();
      if (data.success && data.data.categories) {
        const excludedBase = ['लाईव्ह टीव्ही', 'ताज्या', 'live tv', 'latest'];
        // Filter out categories with 0 articles, and base items already accounted for natively
        const populated = data.data.categories.filter(c =>
          parseInt(c.articleCount) > 0 &&
          !excludedBase.includes(c.name.toLowerCase())
        );
        setDynamicCategories(populated);
      }
    } catch (err) {
      console.error('Failed to fetch navbar dynamic categories', err);
    }
  };

  const fetchDynamicCities = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/cities`);
      const data = await response.json();
      if (data.success && data.data.cities) {
        // Filter out cities with 0 articles
        const populated = data.data.cities.filter(c => parseInt(c.articleCount) > 0);
        setCities(populated.map(city => ({
          id: city.id,
          name: city.name,
          href: `/city/${city.name}`
        })));
      }
    } catch (err) {
      console.error('Failed to fetch navbar dynamic cities', err);
    }
  };

  // Base navigation items always visible
  const baseNavItems = [
    { label: 'लाईव्ह टीव्ही', href: '/', hasDropdown: false },
    { label: 'ताज्या', href: '/fresh', hasDropdown: false },
  ];

  // Dynamic Navigation Items
  const navItems = [
    ...baseNavItems,
    ...dynamicCategories.map(cat => ({
      label: categoryNamesOptions[cat.name.toLowerCase()] || cat.name,
      href: `/category/${cat.name.toLowerCase()}`,
      hasDropdown: cat.name === 'शहरे' || cat.name.toLowerCase() === 'cities'
    }))
  ];

  // Dynamic cities state for dropdown hook
  const [cities, setCities] = useState([]);

  // Social media links
  const socialLinks = [
    { name: 'Facebook', icon: FacebookIcon, href: 'https://www.facebook.com/people/Top-News-Marathi/61560392199389/', color: 'hover:text-blue-500' },
    { name: 'X', icon: XIcon, href: 'https://x.com/Topnewsmarathi', color: 'hover:text-white' },
    { name: 'Threads', icon: ThreadsIcon, href: 'https://www.threads.com/@topnewsmarathi', color: 'hover:text-gray-400' },
    { name: 'Instagram', icon: InstagramIcon, href: 'https://www.instagram.com/topnewsmarathi/', color: 'hover:text-pink-500' },
    { name: 'YouTube', icon: YoutubeIcon, href: 'https://www.youtube.com/@topnewsmarathi', color: 'hover:text-red-500' },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close sidebar and notifications when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target) && isSidebarOpen) {
        setIsSidebarOpen(false);
      }
      // Close notifications if clicking outside its container (which is relative to the bell button)
      if (isNotifOpen && !event.target.closest('.notification-container')) {
        setIsNotifOpen(false);
      }
    };
    if (isSidebarOpen || isNotifOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isSidebarOpen, isNotifOpen]);

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (isSidebarOpen || isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isSidebarOpen, isMobileMenuOpen]);

  const handleNavClick = () => {
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setIsSidebarOpen(false);
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      setIsSidebarOpen(false);
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  return (
    <>
      {/* Main Navbar */}
      <nav className={`bg-brand-gray-dark border-b-2 border-brand-yellow text-brand-white sticky top-0 z-50 shadow-xl transition-all duration-300 ${isSidebarOpen ? 'blur-sm' : ''
        }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Left Section - Logo and Search Icon */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Mobile Menu Button */}
              <button
                onClick={toggleMobileMenu}
                className="lg:hidden p-2 rounded-lg hover:bg-brand-gray-dark transition-colors duration-200"
                aria-label="Toggle mobile menu"
              >
                <Menu size={24} />
              </button>

              {/* Logo */}
              <Link to="/" className="flex items-center" aria-label="टॉप न्यूज मराठी होम पेज">
                <video
                  src="/logo.mp4"
                  poster="/logo.png"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  aria-label="टॉप न्यूज मराठी लोगो"
                  title="टॉप न्यूज मराठी"
                  className="h-10 sm:h-12 md:h-14 w-auto object-contain"
                />
              </Link>

              {/* Search Icon - Desktop */}
              <button
                onClick={toggleSidebar}
                className="hidden lg:flex p-2 rounded-lg hover-bg-brand-gray-dark transition-colors duration-200 items-center justify-center"
                aria-label="Open search sidebar"
              >
                <Search size={20} />
              </button>
            </div>

            {/* Center Navigation - Desktop */}
            <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
              {navItems.map((item) => (
                <div key={item.label} className="relative" ref={item.hasDropdown ? dropdownRef : null}>
                  {item.hasDropdown ? (
                    <div className="relative">
                      <button
                        onClick={() => {
                          setIsDropdownOpen(!isDropdownOpen);
                        }}
                        className={`flex items-center space-x-1 px-2 xl:px-3 py-2 rounded-lg text-sm font-bold transition-all duration-200 ${location.pathname === item.href
                          ? 'bg-brand-black text-brand-yellow shadow-inner'
                          : 'text-brand-white hover:bg-brand-black hover:text-brand-yellow'
                          }`}
                      >
                        <span>{item.label}</span>
                        <ChevronDown
                          size={16}
                          className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''
                            }`}
                        />
                      </button>

                      <div
                        className={`absolute top-full left-0 mt-2 w-48 bg-brand-gray-dark rounded-lg shadow-xl border border-brand-yellow overflow-hidden transition-all duration-200 origin-top ${isDropdownOpen
                          ? 'opacity-100 scale-100 translate-y-0'
                          : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
                          }`}
                      >
                        <div className="py-2">
                          {cities.map((city) => (
                            <Link
                              key={city.id}
                              to={city.href}
                              className="block px-4 py-2 text-sm text-brand-white hover:text-brand-yellow hover:bg-brand-black transition-colors duration-150 font-bold"
                              onClick={() => {
                                setIsDropdownOpen(false);
                                handleNavClick();
                              }}
                            >
                              {city.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Link
                      to={item.href}
                      onClick={() => handleNavClick()}
                      className={`flex items-center space-x-2 px-2 xl:px-3 py-2 rounded-lg text-sm font-bold transition-all duration-200 ${location.pathname === item.href
                        ? 'bg-brand-black text-brand-yellow shadow-inner'
                        : 'text-brand-white hover:bg-brand-black hover:text-brand-yellow'
                        }`}
                    >
                      {item.label === 'लाईव्ह टीव्ही' && (
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-primary opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-primary"></span>
                        </span>
                      )}
                      <span>{item.label}</span>
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* Right Section - Bell Icon */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              {/* Search Icon - Mobile */}
              <button
                onClick={toggleSidebar}
                className="lg:hidden p-2 rounded-lg hover:bg-brand-gray-dark transition-colors duration-200"
                aria-label="Open search sidebar"
              >
                <Search size={20} />
              </button>

              {/* Bell Icon for Notifications */}
              <div className="relative notification-container">
                <button
                  onClick={() => {
                    setIsNotifOpen(!isNotifOpen);
                    setIsMobileMenuOpen(false);
                    setIsSidebarOpen(false);
                  }}
                  className={`p-2 rounded-lg transition-colors duration-200 ${isNotifOpen ? 'bg-brand-black text-brand-yellow' : 'hover:bg-brand-gray-dark'
                    }`}
                  aria-label="Notifications"
                >
                  <Bell size={20} />
                  {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 flex h-4 w-4">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-primary opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-4 w-4 bg-brand-primary text-[10px] items-center justify-center font-bold text-white leading-none">
                        {unreadCount > 9 ? '9+' : unreadCount}
                      </span>
                    </span>
                  )}
                </button>

                <NotificationDropdown
                  isOpen={isNotifOpen}
                  onClose={() => setIsNotifOpen(false)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-screen' : 'max-h-0'
            }`}
        >
          <div className="bg-brand-gray-dark border-t border-brand-gray-medium px-4 py-3">
            {navItems.map((item) => (
              <div key={item.label}>
                {item.hasDropdown ? (
                  <div>
                    <button
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="flex items-center justify-between w-full px-3 py-2 text-brand-white hover:bg-brand-black hover:text-brand-yellow font-bold rounded-lg transition-colors duration-150"
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''
                          }`}
                      />
                    </button>
                    <div
                      className={`pl-4 overflow-hidden transition-all duration-200 ${isDropdownOpen ? 'max-h-64' : 'max-h-0'
                        }`}
                    >
                      {cities.map((city) => (
                        <Link
                          key={city.id}
                          to={city.href}
                          className="block px-3 py-2 text-sm text-gray-400 hover:text-brand-white hover:bg-brand-gray-medium rounded-lg transition-colors duration-150"
                          onClick={() => {
                            setIsDropdownOpen(false);
                            handleNavClick();
                          }}
                        >
                          {city.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    to={item.href}
                    onClick={() => handleNavClick()}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-bold transition-colors duration-150 ${location.pathname === item.href
                      ? 'bg-brand-black text-brand-yellow'
                      : 'text-brand-white hover:bg-brand-black hover:text-brand-yellow'
                      }`}
                  >
                    {item.label === 'लाईव्ह टीव्ही' && (
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-primary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-primary"></span>
                      </span>
                    )}
                    <span>{item.label}</span>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </nav>

      {/* Overlay with blur */}
      <div
        className={`fixed inset-0 bg-brand-black/60 backdrop-blur-sm z-40 transition-all duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        onClick={() => setIsSidebarOpen(false)}
      />

      {/* Left Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-full w-80 sm:w-96 bg-brand-secondary text-brand-white z-50 transform transition-transform duration-300 ease-in-out shadow-2xl ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-brand-gray-medium flex-shrink-0">
          <video
            src="/logo.mp4"
            poster="/logo.png"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            aria-label="टॉप न्यूज मराठी लोगो"
            title="टॉप न्यूज मराठी"
            className="h-10 w-auto object-contain"
          />
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="p-2 rounded-lg hover:bg-brand-gray-dark transition-colors duration-200"
            aria-label="Close sidebar"
          >
            <X size={24} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden" style={{ height: 'calc(100vh - 140px)' }}>
          {/* Search Bar */}
          <div className="p-4 border-b border-brand-gray-medium">
            <div className="relative">
              <input
                type="text"
                placeholder="शोधा..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearch}
                className="w-full bg-brand-gray-medium text-brand-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all duration-200"
              />
              <Search
                size={18}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
            </div>
          </div>

          {/* Navigation Links */}
          <div className="py-4 border-b border-brand-gray-medium">
            <nav className="space-y-1 px-3">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  onClick={() => {
                    handleNavClick();
                    setIsSidebarOpen(false);
                  }}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-bold transition-colors duration-150 ${location.pathname === item.href
                    ? 'bg-brand-black text-brand-yellow'
                    : 'text-brand-white hover:bg-brand-black hover:text-brand-yellow'
                    }`}
                >
                  {item.label === 'लाईव्ह टीव्ही' && (
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-primary opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-primary"></span>
                    </span>
                  )}
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>

          {/* Follow Us Section */}
          <div className="py-4 px-4 pb-20">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
              आम्हाला फॉलो करा
            </h3>
            <div className="space-y-2">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg bg-brand-gray-medium text-gray-300 hover:bg-brand-gray-dark transition-all duration-200 ${social.color}`}
                  >
                    <IconComponent size={20} />
                    <span className="font-medium">{social.name}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-brand-gray-medium bg-brand-secondary">
          <p className="text-xs text-gray-500 text-center">
            2026 TopNewsMarathi. All rights reserved.
          </p>
        </div>
      </div>
    </>
  );
};

export default Navbar;
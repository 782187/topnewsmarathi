import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Bell, Newspaper, Video, Clock, ChevronRight } from 'lucide-react';

const NotificationDropdown = ({ isOpen, onClose }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      fetchNotifications();
    }
  }, [isOpen]);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_URL}/notifications`);
      const data = await response.json();
      if (data.success) {
        setNotifications(data.data.notifications.slice(0, 5));
        // Save the latest ID to localStorage to mark all as seen
        if (data.data.notifications.length > 0) {
          localStorage.setItem('last_viewed_notification_id', data.data.notifications[0].id);
          // Dispatch a custom event to update the unread count in Navbar
          window.dispatchEvent(new Event('notifications_read'));
        }
      }
    } catch (err) {
      console.error('Failed to fetch notifications', err);
    } finally {
      setLoading(false);
    }
  };

  const getTimeAgo = (dateString) => {
    const now = new Date();
    const past = new Date(dateString);
    const diffMs = now - past;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 60) return `${diffMins} मिनिटांपूर्वी`;
    if (diffHours < 24) return `${diffHours} तासांपूर्वी`;
    return `${diffDays} दिवसांपूर्वी`;
  };

  if (!isOpen) return null;

  return (
    <div 
      className="absolute top-full right-0 mt-3 w-80 sm:w-96 bg-brand-gray-dark border border-brand-yellow rounded-xl shadow-2xl z-[100] overflow-hidden transform origin-top-right transition-all duration-300 scale-100 opacity-100"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="p-4 border-b border-brand-gray-medium flex items-center justify-between bg-brand-black/40">
        <h3 className="text-brand-white font-bold flex items-center gap-2">
          <Bell size={18} className="text-brand-yellow" />
          ताज्या अपडेट्स
        </h3>
        <span className="text-[10px] text-brand-yellow uppercase tracking-widest font-bold">
          ताजी बातमी
        </span>
      </div>

      <div className="max-h-[70vh] overflow-y-auto custom-scrollbar">
        {loading ? (
          <div className="p-10 flex flex-col items-center justify-center space-y-3">
            <div className="w-8 h-8 border-2 border-brand-yellow border-t-transparent rounded-full animate-spin"></div>
            <p className="text-brand-gray text-xs">लोड होत आहे...</p>
          </div>
        ) : notifications.length === 0 ? (
          <div className="p-10 text-center space-y-3">
            <div className="w-12 h-12 bg-brand-gray-medium rounded-full flex items-center justify-center mx-auto opacity-20">
              <Bell size={24} className="text-brand-white" />
            </div>
            <p className="text-brand-gray text-sm">कौणतीही नवीन नोटिफिकेशन नाही</p>
          </div>
        ) : (
          <div className="divide-y divide-brand-gray-medium/50">
            {notifications.map((item) => (
              <Link
                key={item.id}
                to={item.url}
                className="block p-4 hover:bg-brand-black transition-colors group"
                onClick={onClose}
              >
                <div className="flex gap-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    item.type === 'video' ? 'bg-brand-red/20' : 'bg-brand-primary/20'
                  }`}>
                    {item.type === 'video' ? (
                      <Video size={18} className="text-brand-red" />
                    ) : (
                      <Newspaper size={18} className="text-brand-primary" />
                    )}
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-brand-white text-sm font-bold line-clamp-2 leading-tight group-hover:text-brand-yellow transition-colors">
                      {item.message}
                    </p>
                    <div className="flex items-center gap-3 text-[10px] text-brand-gray font-medium">
                      <span className="flex items-center gap-1">
                        <Clock size={10} />
                        {getTimeAgo(item.created_at)}
                      </span>
                      <span className="text-brand-yellow/60 uppercase tracking-tighter">
                        {item.type === 'video' ? 'व्हिडिओ' : 'बातमी'}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <Link
        to="/fresh"
        className="block p-3 text-center bg-brand-black hover:bg-brand-gray-medium transition-colors border-t border-brand-gray-medium group"
        onClick={onClose}
      >
        <span className="text-xs text-brand-white font-bold flex items-center justify-center gap-1 group-hover:text-brand-yellow">
          सर्व ताज्या बातम्या पहा <ChevronRight size={14} />
        </span>
      </Link>
    </div>
  );
};

export default NotificationDropdown;

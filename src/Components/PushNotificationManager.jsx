import React, { useEffect, useState } from 'react';
import { requestNotificationPermission, onMessageListener } from '../utils/firebaseUtils';
import toast from 'react-hot-toast';

const PushNotificationManager = () => {
  const [notification, setNotification] = useState({ title: '', body: '' });
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    // Check if user is already subscribed in this browser session/local storage
    const storedSubscription = localStorage.getItem('isPushSubscribed');
    
    if (storedSubscription === 'true') {
      setIsSubscribed(true);
      // We still want to listen for foreground messages even if already subscribed
      setupForegroundListener();
    } else {
      // Prompt user or handle automatically
      handleSubscription();
    }
  }, []);

  const handleSubscription = async () => {
    try {
      const token = await requestNotificationPermission();
      
      if (token) {
        // Send token to backend to subscribe to 'all_news'
        const response = await fetch(`${import.meta.env.VITE_API_URL}/notifications/subscribe`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token, topic: 'all_news' })
        });
        
        const data = await response.json();
        if (data.success) {
          console.log('Successfully subscribed to push notifications');
          localStorage.setItem('isPushSubscribed', 'true');
          setIsSubscribed(true);
          setupForegroundListener();
        }
      }
    } catch (error) {
      console.error('Subscription error:', error);
    }
  };

  const setupForegroundListener = () => {
    onMessageListener().then(payload => {
      setNotification({ title: payload.notification.title, body: payload.notification.body });
      
      // Use react-hot-toast or similar to show a foreground toast
      toast(
        (t) => (
          <div className="flex flex-col gap-1 cursor-pointer" onClick={() => {
             toast.dismiss(t.id);
             if (payload.data && payload.data.url) {
                window.location.href = payload.data.url;
             }
          }}>
            <strong className="text-brand-orange text-sm">{payload.notification.title}</strong>
            <span className="text-xs text-gray-200">{payload.notification.body}</span>
          </div>
        ),
        {
          duration: 6000,
          position: 'top-right',
          style: {
            background: '#1A1A1A',
            color: '#fff',
            border: '1px solid #FFED00',
          },
          icon: '🔔',
        }
      );
      
      // Re-setup listener to catch next message
      setupForegroundListener();
    }).catch(err => console.log('failed: ', err));
  };

  // This is a headless component, it only renders toasts
  return null;
};

export default PushNotificationManager;

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

if (typeof window !== 'undefined') {
  window.onerror = function(msg, url, line, col, error) {
    const errorMsg = "Error: " + msg + "\nURL: " + url + "\nLine: " + line;
    // alert(errorMsg); // Disabled for now, but can be enabled if the user still has issues
    return false;
  };
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// Register Service Worker for PWA / Caching
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('SW registered: ', registration);
        
        // Check for updates
        registration.onupdatefound = () => {
          const installingWorker = registration.installing;
          installingWorker.onstatechange = () => {
            if (installingWorker.state === 'installed') {
              if (navigator.serviceWorker.controller) {
                // New content is available; please refresh.
                console.log('New content available, refreshing...');
                window.location.reload();
              }
            }
          };
        };
      })
      .catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
  });
  
  // Logic to handle multiple tabs/sessions
  let refreshing = false;
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (refreshing) return;
    refreshing = true;
    window.location.reload();
  });
}


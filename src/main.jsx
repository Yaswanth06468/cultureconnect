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

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app.tsx'
import './index.css'  // <--- BU SATIR ÇOK ÖNEMLİ! (Stilleri bu getirir)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
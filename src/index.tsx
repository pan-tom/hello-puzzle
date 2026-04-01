import React from 'react'
import { createRoot } from 'react-dom/client'
import App from '@/app'

// Bootstrap React app into the root DOM node.
createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

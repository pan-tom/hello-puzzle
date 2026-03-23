import React from 'react'
import { createRoot } from 'react-dom/client'
import App from '@/app'

// Bootstrap React app into the root DOM node.
const root = createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

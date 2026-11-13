import '@fontsource/archivo-narrow/400.css'
import '@fontsource/archivo-narrow/700.css'
import '@fontsource/source-serif-4/700.css'
import './styles/tokens.css'
import './styles/global.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import App from './App'

// BASE_URL is "/dh-101-final/" (see vite.config.ts); the router wants it without the trailing slash.
const basename = import.meta.env.BASE_URL.replace(/\/$/, '') || '/'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </StrictMode>,
)

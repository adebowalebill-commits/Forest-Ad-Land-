import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Web3Provider } from './components/Web3Provider'
import './index.css'
import App from './App.tsx'
import './i18n'

// Add global polyfill for Buffer since @solana/web3.js requires it
import { Buffer } from 'buffer';
(window as any).Buffer = (window as any).Buffer || Buffer;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Web3Provider>
        <App />
      </Web3Provider>
    </BrowserRouter>
  </StrictMode>,
)

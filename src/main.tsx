import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { IndexeddbContextProvider } from './context/IndexeddbContext.tsx'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <IndexeddbContextProvider>
      <App />
    </IndexeddbContextProvider>
  </StrictMode>,
)

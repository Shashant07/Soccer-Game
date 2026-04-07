import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "bootstrap/dist/css/bootstrap.min.css";
import './index.css'
import App from './App.jsx'
import { GameProvider } from './context/GameContext.jsx'
import { ScreenProvider } from './context/ScreenContext.jsx'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <GameProvider>
    <ScreenProvider>
      <App />
    </ScreenProvider>
  </GameProvider>
  // </StrictMode>,
)

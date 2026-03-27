import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './css/index.css'
import App from './App.jsx'
import {Toaster} from 'sileo';
import {BrowserRouter} from 'react-router-dom';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
      <Toaster position='top-center' options={{
        fill: '#1F2937',
      }}/>
    </BrowserRouter>
  </StrictMode>,
)

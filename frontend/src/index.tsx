import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/index.css';
import MainPage from './pages/HomePage';
import TournamentPage from './pages/TournamentPage';

// Create root React DOM node to render the app
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// Render the application inside React.StrictMode for highlighting potential issues
root.render(
  <React.StrictMode>
    {/* Setup client-side routing using react-router */}
    <BrowserRouter>
      <Routes>
        {/* Route for main homepage */}
        <Route path="/" element={<MainPage />} />

        {/* Route for tournaments page */}
        <Route path="/tournaments" element={<TournamentPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
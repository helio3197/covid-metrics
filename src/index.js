import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import './index.scss';

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/details" element={<h1>Details</h1>} />
          <Route path="*" element={<h2 className="text-center my-5">Nothing here!</h2>} />
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>,
);

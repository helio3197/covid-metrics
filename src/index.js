import React from 'react';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import store from './redux/configureStore';
import App from './App';
import Home from './components/Home';
import Filter from './components/Filter';
import Country from './components/Country';

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="filter" element={<Filter />} />
            <Route path="country/:countryId" element={<Country />} />
            <Route path="*" element={<h2 className="text-center my-5">Nothing here!</h2>} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>,
);

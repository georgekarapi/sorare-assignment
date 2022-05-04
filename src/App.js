import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Cards from './Cards';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/cards/:slugs" element={<Cards />} />
        <Route
          path="*"
          element={
            <Navigate
              to="/cards/marco-verratti-2021-unique-1,marco-verratti-2021-rare-1,marco-verratti-2021-super_rare-1"
              replace
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

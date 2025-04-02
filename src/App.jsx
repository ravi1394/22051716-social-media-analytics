import React from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import { DataProvider } from './context/DataContext';
import Feed from './pages/Feed';
import TopUsers from './pages/TopUsers';
import TrendingPosts from './pages/TrendingPosts';

function App() {
  return (
    <DataProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Header />
          <main className="py-6">
            <Routes>
              <Route path="/" element={<Feed />} />
              <Route path="/top-users" element={<TopUsers />} />
              <Route path="/trending" element={<TrendingPosts />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </Router>
    </DataProvider>
  );
}

export default App;  // Add this line
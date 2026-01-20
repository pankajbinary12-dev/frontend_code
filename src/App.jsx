import React, { useState } from 'react';
import './App.css';
import Header from './components/Header.jsx';
import Sidebar from './components/Sidebar.jsx';
import Dashboard from './components/Dashboard.jsx';

function App() {
  const [currentPage, setCurrentPage] = useState({ menu: 'Dashboard', submenu: null });

  return (
    <div className="app">
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <div className="app-container">
        <Sidebar />
        <Dashboard currentPage={currentPage} />
      </div>
    </div>
  );
}

export default App;

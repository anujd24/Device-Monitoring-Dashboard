import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Recordings from './pages/Recordings';
import React from 'react';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path='/recordings/:deviceId' element = {<Recordings/>} />
      </Routes>
    </Router>
  );
};

export default App;
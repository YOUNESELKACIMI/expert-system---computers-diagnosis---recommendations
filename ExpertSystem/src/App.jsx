import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NormalUserPage from './pages/NormalUserPage';
import AdminLoginPage from './pages/AdminLoginPage';
import ExpertHomePage from './pages/ExpertHomePage';
import ResultsPage from './pages/ResultsPage';
import symptomsServices from './services/symptoms';

const App = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(()=>{
    const loggedUserJSON = window.localStorage.getItem("loggedAdmin")
    if (loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      symptomsServices.setToken(user.token)
      setIsAdmin(true)
    }
  },[])

  const handleAdminClick = () => {
    setSelectedOption('admin');
  };

  const handleNormalUserClick = () => {
    setSelectedOption('normalUser');
  };

  return (
    <Router>
      <div>
        {!selectedOption && (
          <div className="min-h-screen hex-bg to-white flex items-center justify-center">
            <button className="button-bg hover:bg-blue-500 text-white text-lg font-bold py-5 px-7 rounded focus:outline-none mx-4" onClick={handleNormalUserClick}>Normal User</button>
            <button className="button-bg hover:bg-blue-500 text-white text-lg font-bold py-5 px-10 rounded focus:outline-none mx-4"onClick={handleAdminClick}>Admin</button>
          </div>
        )}

        <Routes>
          <Route
            path="/"
            element={
              selectedOption === 'admin' ? (
                isAdmin ? (
                  <ExpertHomePage setIsAdmin={setIsAdmin} />
                ) : (
                  <AdminLoginPage setIsAdmin={setIsAdmin} />
                )
              ) : selectedOption === 'normalUser' ? (
                <>
                  <NormalUserPage />
                  <ResultsPage />
                </>
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Component/Login/Login';
import Dashboard from './Component/Dashboard/Dashboard';
import Issue from './Component/Issue/Issue';
import Protected from './Restrict/RestrictedRoute';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <Protected isLoggedIn={localStorage.getItem('isAuth')}>
                <Dashboard />
              </Protected>
            }
          />
          <Route
            path="/create_issue"
            element={
              <Protected isLoggedIn={localStorage.getItem('isAuth')}>
                <Issue />
              </Protected>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

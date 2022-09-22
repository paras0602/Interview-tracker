import React, { useState } from 'react';
import './component/Style/Style.css';
import Dashboard from './component/Dashboard';
import Signup from "./component/Signup";
import Login from './component/Login';
import Step from './component/Step';
import { Routes,Route, Link, BrowserRouter } from 'react-router-dom';
import Navbar from './component/Navbar';

export const UserContext = React.createContext();

const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({ id: null });

  const saveUser = (id) => {
    console.log('save user', id);
    setCurrentUser({ id });
  };

  return (
    <UserContext.Provider value={{ user: currentUser, saveUser }}>
      {children}
    </UserContext.Provider>
  );
};

const App = () => {
  return (
    <UserProvider>
      
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/signup" element={<Signup/>} />

          <Route path="/application/:id/step" element={<Step/>} />

        </Routes>
      
    </UserProvider>
  );
};

export default App;

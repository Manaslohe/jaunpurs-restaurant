import { useState, useEffect } from 'react';
import AdminLogin from './AdminLogin';
import AdminPortal from './AdminPortal';

const Admin = () => {
  const [loggedIn, setLoggedIn] = useState(() => {
    // Check localStorage on initial mount
    return localStorage.getItem('adminLoggedIn') === 'true';
  });

  useEffect(() => {
    // Sync login state to localStorage
    if (loggedIn) {
      localStorage.setItem('adminLoggedIn', 'true');
    } else {
      localStorage.removeItem('adminLoggedIn');
    }
  }, [loggedIn]);

  return loggedIn
    ? <AdminPortal onLogout={() => setLoggedIn(false)} />
    : <AdminLogin onLogin={() => setLoggedIn(true)} />;
};

export default Admin;

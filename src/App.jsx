import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';
import { login, logout } from './store/authSlice';
import authService from '../src/appwrite/auth';
import { Outlet } from 'react-router-dom';
import { Header, Footer } from './components';
import { Toaster } from 'react-hot-toast';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return !loading ? (
    <div className="min-h-screen flex flex-col bg-yellow-100">
      <Toaster />
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  ) : null;
}

export default App;

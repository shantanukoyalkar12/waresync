import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

export default function Home() {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const tokenExpiration = localStorage.getItem('tokenExpiration');
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (token && tokenExpiration&&isLoggedIn) {
      const currentTime = Math.floor(Date.now() / 1000);
      if (currentTime < tokenExpiration) {
        const decodedToken = jwtDecode(token);
        setName(decodedToken.username);
        navigate('/')
      } else {
        navigate('/login');
      }
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpiration');
    localStorage.removeItem('isLoggedIn');
    navigate('/login');
  };

  return (
    <div>
      Welcome {name}
      <button type="button" className="btn btn-danger" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

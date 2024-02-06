import React, { useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import '../CssComp/login.css'
export default function Login() {
  const [values, setValues] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };
  useEffect(() => {
    const token = localStorage.getItem('token');
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    
    if (token && isLoggedIn) { // Check if user is already logged in
      navigate('/'); // Redirect to home if user is already logged in
    }
  }, [navigate]);
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/owner/authowner', values, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const { token } = response.data;
      if (token) {
        const decodedToken = jwtDecode(token);
        localStorage.setItem('token', token);
        localStorage.setItem('tokenExpiration', decodedToken.exp);
        localStorage.setItem('isLoggedIn', true);
        navigate('/');
      } else {
        navigate('/login')
        alert('Wrong email and password');
      }
    } catch (error) {
      console.error('Axios request failed:', error);
      // Handle errors
    }
  };

  const registerPage = () => {
    navigate('/signup');
  };

  return (
    <div className="container">
      <div className="form-container">
    <form action="post" onSubmit={handleSubmit}>
      <div className="project">
        <label htmlFor="ProjectName">WARESYNC</label>
      </div>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input type="text" id="email" placeholder="Enter email" name="email" onChange={handleChange} />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" placeholder="Enter password" name="password" onChange={handleChange} />
      </div>
      <button type="submit" className='btn-btn-primary'>Submit</button>
      <button onClick={registerPage} className='btn-btn-primary'>Register</button>
    </form>
  </div>
    </div>
  
  );
}

import React, { useEffect, useState } from 'react';
import WarehouselistCustomer from './WarehouselistCustomer';
import { useNavigate,Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import '../CssComp/navbar.css';
import '../CssComp/home.css';
import Warehouse from './Warehouse';
export default function CustomerHome() {
  const [name, setName] = useState('');
  const [tokens,setToken]=useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setToken(token);
    console.log(token)
    const tokenExpiration = localStorage.getItem('tokenExpiration');
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (token && tokenExpiration&&isLoggedIn) {
      const currentTime = Math.floor(Date.now() / 1000);
      if (currentTime < tokenExpiration) {
        const decodedToken = jwtDecode(token);
        setName(decodedToken.username);
        console.log(name);
        navigate('/cushome')
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
    <div className="home-container">
    <div>
      <nav className="NavBar"  >
      <ul>
        <li><h1>WARESYNC</h1></li>
        {/* <li> <Link to={{ pathname: "/add" }}>Add Warehouse</Link></li> */}
        {/* //<li><Link to="/profile">Profile</Link></li> */}
        <li>Welcome { name }</li>
        <li><button type="button" className="btn btn-danger" onClick={handleLogout}>Logout</button></li>
        <li><Link to="/cart"><h3>WAREHOUSES</h3></Link></li>
        {/* <li><img src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/header_cart-eed150.svg" alt="Cart" class="_1XmrCc" width="30" height="30" /></li> */}
    </ul>
      
    </nav>
    <div className="warelist">
      {<WarehouselistCustomer></WarehouselistCustomer>}
    </div>
    </div>
    </div>
  );
}

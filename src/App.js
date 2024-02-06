import logo from './logo.svg';
import './App.css';
import Signup from './components/Signup';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
      <Route path='/' element={<Home></Home>}/>
      <Route path="/signup" element={<Signup></Signup>}/>
      <Route path='/login' element={<Login></Login>}/>
      
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

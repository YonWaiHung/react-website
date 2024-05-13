import Login from './components/login/Login.jsx'
import Header from './Header.jsx'
import Sidebar from './components/sidebar/Sidebar.jsx'
import TechItemList from './components/techItem/TechItemList.jsx'
import AddTechItem from './components/techItem/AddTechItem.jsx';
import TechItem from './components/techItem/TechItem.jsx';
import Counter from './Counter.jsx'
import ColorPicker from './ColorPicker.jsx'
// eslint-disable-next-line no-unused-vars
import React, {useState} from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';

function App() {
  // State to manage user authentication
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [color, setColor] = useState("#FFFFFF");

  function handleColorChange(event) {
    setColor(event.target.value);
  }

  // Function to handle successful login
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogoutSuccess = () => {
    setIsLoggedIn(false);
  };

  if (isLoggedIn) {
    return (
      <>
        <BrowserRouter>
          <div id="outer-container">
            <Header />
            <Sidebar onLogout={handleLogoutSuccess}/>
          </div>
          <Routes>
            <Route index element={<Counter/>} />
            <Route path="/tech-list" element={<TechItemList/>} />
            <Route path="/tech-list/add" element={<AddTechItem/>} />
            <Route path={`/techItems/:id`} element={<TechItem />} />
            <Route path='/color-picker' element={<ColorPicker colorDisplay={color} onColorChange={handleColorChange} />} />
          </Routes>
        </BrowserRouter>
        
      </>
    )
  } else {
    return (
      <div className="loginContainer">
        <Login onLoginSuccess={handleLoginSuccess}/>
      </div>
    )
  }
}

export default App

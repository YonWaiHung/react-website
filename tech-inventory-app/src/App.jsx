import Login from './Login.jsx'
import Header from './Header.jsx'
import Sidebar from './Sidebar.jsx'
import TechItemList from './components/TechItemList.jsx'
import AddTechItem from './components/AddTechItem.jsx';
import TechItem from './components/TechItem.jsx';
// import Footer from './Footer.jsx'
// import Food from './Food.jsx'
// import Card from './card/Card.jsx'
// import Button from './Button.jsx'
// import List from './List.jsx'
// import ProfilePicture from './ProfilePicture.jsx'
// import MyComponent from './MyComponent.jsx'
// import Counter from './Counter.jsx'
// import ColorPicker from './ColorPicker.jsx'
// eslint-disable-next-line no-unused-vars
import React, {useState} from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';

function App() {
  // State to manage user authentication
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  // const fruits = [
  //   {id: 1, name: "apple", calories: 95},
  //   {id: 2, name: "orange", calories: 42},
  //   {id: 3, name: "banana", calories: 135},
  //   {id: 4, name: "durian", calories: 284},
  // ];

  // Function to handle successful login
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  if (isLoggedIn ) {
    return (
      <>
        <div id="outer-container">
          <Header toggleSidebar={toggleSidebar}/>
          <Sidebar isOpen={sidebarOpen} onStateChange={(state) => setSidebarOpen(state.isOpen)} />
        </div>
        {/* <TechItemList/> */}
        <BrowserRouter>
          <Routes>
            <Route index element={<TechItemList/>} />
            {/* <Route path="/techItems" element={<TechItemList/>} /> */}
            <Route path="/add" element={<AddTechItem/>} />
            <Route path={`/techItems/:id`} element={<TechItem />} />
          </Routes>
        </BrowserRouter>
        {/* <ProfilePicture/>
        <Card/>
        <Card/>
        <Button/>
        <MyComponent/>
        <Counter/>
        <Food/>
        <ColorPicker/>
        <Footer/> */}
        {/* if one of the two condition is false, it wont load/come true. 
        The list condi will always be true as it exists */}
        {/* {fruits.length > 0 && <List items={fruits} category="Fruits"/>} */}
        
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

// eslint-disable-next-line no-unused-vars
import React, { useState, useReducer } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/login/Login.jsx'
import Header from './Header.jsx'
import Sidebar from './components/sidebar/Sidebar.jsx'
import TechItemList from './components/techItem/TechItemList.jsx'
import AddTechItem from './components/techItem/AddTechItem.jsx';
import TechItem from './components/techItem/TechItem.jsx';
import Counter from './Counter.jsx'
import ColorPicker from './ColorPicker.jsx'

// Reducer for custom states housed within App.jsx
function reducer(state, action) {
  switch (action.type) {
    case 'login':
      return{
        loginStatus: true
      };
    case 'logout':
      return{
        loginStatus: false
      };
    case 'save_color':
      return {
        // Copy existing state properties into a new state object, ensuring immutability
        ...state,
        color: action.payload // Update the color property
      };
    default:
      throw Error('Unknown action: ' + action.type);
  }
}

function App() {
  // State to manage user authentication
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // State to manage & retain color selection within color picker component
  // const [color, setColor] = useState("#FFFFFF");

  const [state, dispatch] = useReducer(reducer, { loginStatus: false, color: "#FF0000" });

  // Function to set state var color to the event value
  function handleColorChange(event) {
    dispatch ({
      type: 'save_color',
      //Payload: A convention used to pass additional data in actions
      payload: event.target.value, 
    })
  }

  // Function to handle successful login, hiding login section & display main page
  const handleLoginSuccess = () => {
    dispatch ({
      type: 'login',
    })
  };

  // Function to set isLoggedIn state to false, logging user out & show login section only
  const handleLogoutSuccess = () => {
    dispatch ({
      type: 'logout',
    })
  };

  // If user is logged in,
  if (state.loginStatus) {
    return (
      <>
        <BrowserRouter>
          {/* Header & Sidebar has to be within BrowserRouter to access route path set below */}
          <div id="outer-container">
            <Header />
            <Sidebar onLogout={handleLogoutSuccess} />
          </div>
          {/* Routes linking to components as a way to navigate around/to each other */}
          <Routes>
            {/* Index / Default component route to display the moment the page is loaded */}
            <Route index element={<Counter />} />
            <Route path="/tech-list" element={<TechItemList />} />
            <Route path="/tech-list/add" element={<AddTechItem />} />
            <Route path={`/techItems/:id`} element={<TechItem />} />
            {/* Route pathing to ColorPicker component with colorDisplay prop passed down to load saved color */}
            {/* onColorChange prop passing down handleColorChange function to set color state on the parent/App component */}
            <Route path='/color-picker' element={<ColorPicker colorDisplay={state.color} onColorChange={handleColorChange} />} />
          </Routes>
        </BrowserRouter>

      </>
    )
    // If user isnt logged in
  } else {
    return (
      // display login component with a function inherited to it for 
      // use when login is successful, run handleLoginSuccess function
      <div className="loginContainer">
        <Login onLoginSuccess={handleLoginSuccess} />
      </div>
    )
  }
}

export default App

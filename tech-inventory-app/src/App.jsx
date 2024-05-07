import Login from './Login.jsx'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import Food from './Food.jsx'
import Card from './Card.jsx'
import Button from './Button.jsx'
import List from './List.jsx'
import ProfilePicture from './ProfilePicture.jsx'
import MyComponent from './MyComponent.jsx'
import Counter from './Counter.jsx'
import ColorPicker from './ColorPicker.jsx'
// eslint-disable-next-line no-unused-vars
import React, {useState} from 'react';

function App() {
  // State to manage user authentication
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const fruits = [
    {id: 1, name: "apple", calories: 95},
    {id: 2, name: "orange", calories: 42},
    {id: 3, name: "banana", calories: 135},
    {id: 4, name: "durian", calories: 284},
  ];

  const vegetables = [
    {id: 6, name: "potatoes", calories: 95},
    {id: 7, name: "celery", calories: 12},
    {id: 8, name: "carrots", calories: 37},
    {id: 9, name: "broccoli", calories: 52},
  ];

  // Function to handle successful login
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  if (isLoggedIn ) {
    return (
      <>
        <Header/>
        <ProfilePicture/>
        <Card/>
        <Card/>
        <Button/>
        <MyComponent/>
        <Counter/>
        <Food/>
        <ColorPicker/>
        <Footer/>
        {/* if one of the two condition is false, it wont load/come true. 
        The list condi will always be true as it exists */}
        {fruits.length > 0 && <List items={fruits} category="Fruits"/>}
        {vegetables.length > 0 ? <List items={vegetables} category="Vegetables"/> : null}
        
      </>
    )
  } else {
    return (
      <Login onLoginSuccess={handleLoginSuccess}/>
    )
  }
  // return(
  //   <>
  //     <Login/>
  //     <Header/>
  //     <ProfilePicture/>
  //     <Card/>
  //     <Card/>
  //     <Button/>
  //     <MyComponent/>
  //     <Counter/>
  //     <Food/>
  //     <ColorPicker/>
  //     <Footer/>
  //     {/* if one of the two condition is false, it wont load/come true. 
  //     The list condi will always be true as it exists */}
  //     {fruits.length > 0 && <List items={fruits} category="Fruits"/>}
  //     {vegetables.length > 0 ? <List items={vegetables} category="Vegetables"/> : null}
      
  //   </>
  // )
  
}

export default App

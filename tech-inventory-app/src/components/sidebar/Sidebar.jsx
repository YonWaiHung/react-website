// eslint-disable-next-line no-unused-vars
import React, { useState, } from 'react';
import { slide as Menu } from 'react-burger-menu';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import LogoutModal from "../logoutModal/LogoutModal.jsx";
import { MdHome, MdFormatListBulleted, MdColorLens, MdLogout } from "react-icons/md";

function Sidebar({ onLogout }) {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // Initialize the sidebar as open by default

  const handleToggleSidebar = () => {
    setIsOpen(!isOpen); // Toggle the sidebar state
  };

  // set sidebar open as true while the menu is called
  const handleOnOpen = () => {
    setIsOpen(true);
  }

  // set sidebar open as false while the menu is hidden
  const handleOnClose = () => {
    setIsOpen(false);
  }

  const onLogoutButton = () => {
    handleToggleSidebar();
    // Set isModalOpen state to true, effectively opening the modal
    setIsLogoutModalOpen(true);
  };

  const handleConfirmLogout = () => {
    // Call log out process over at App.jsx
    onLogout();
    // Hide log out confirmation modal
    setIsLogoutModalOpen(false);
    console.log("Logged Out");
  }

  return (
    <>
    <Menu customCrossIcon={false} isOpen={ isOpen } onOpen={ handleOnOpen } onClose={handleOnClose} >
      <Link to="/" className="menu-item" onClick={handleToggleSidebar}><MdHome className='customIcon' />Home</Link>
      <Link to="/tech-list" className="menu-item" onClick={handleToggleSidebar}><MdFormatListBulleted className='customIcon' />Tech List</Link>
      <Link to="/color-picker" className="menu-item" onClick={handleToggleSidebar}><MdColorLens className='customIcon' />Color Picker</Link>
      <Link to="/" className="menu-item" onClick={onLogoutButton}><MdLogout className='customIcon' />Logout</Link>
    </Menu>
    <LogoutModal 
        // For verifying the delete modal is desired to be opened
        isOpen={isLogoutModalOpen} 
        // If called, turn isLogoutModalOpen state to false, effectively closing LogoutModal
        onClose={() => setIsLogoutModalOpen(false)} 
        // If called, trigger handleConfirmLogout function
        onConfirm={handleConfirmLogout} 
      />
    </>
  )
}

Sidebar.propTypes = {
  onLogout: PropTypes.func,
}

export default Sidebar
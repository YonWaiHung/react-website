// eslint-disable-next-line no-unused-vars
import React, { useState, } from 'react';
import { slide as Menu } from 'react-burger-menu';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import LogoutModal from "../logoutModal/LogoutModal.jsx";

function Sidebar({ onLogout }) {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // Initialize the sidebar as open by default

  const handleToggleSidebar = () => {
    setIsOpen(!isOpen); // Toggle the sidebar state
  };
  const handleOnOpen = () => {
    setIsOpen(true);
  }

  const onLogoutButton = () => {
    handleToggleSidebar();
    // set isModalOpen state to true, effectively opening the modal
    setIsLogoutModalOpen(true);
  };

  const handleConfirmLogout = () => {
    onLogout();
    setIsLogoutModalOpen(false);
    console.log("Logged Out");
  }

  return (
    <>
    <Menu customCrossIcon={false} isOpen={ isOpen } onOpen={ handleOnOpen } >
      <Link to="/" className="menu-item" onClick={handleToggleSidebar}>Home</Link>
      <Link to="/tech-list" className="menu-item" onClick={handleToggleSidebar}>Tech List</Link>
      <Link to="/color-picker" className="menu-item" onClick={handleToggleSidebar}>Color Picker</Link>
      <Link to="/" className="menu-item" onClick={onLogoutButton}>Logout</Link>
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
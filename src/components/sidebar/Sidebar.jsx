// eslint-disable-next-line no-unused-vars
import React, { useState, useReducer } from 'react';
// import { slide as Menu } from 'react-burger-menu';
// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import LogoutModal from "../logoutModal/LogoutModal.jsx";
import SidebarData from "./SidebarData.jsx";
import SubMenu from "./SubMenu";
import { MdMenu, MdOutlineClose } from "react-icons/md";

function sideBarReducer(state, action) {
  switch (action.type) {
    case 'open_logout_modal':
      return {
        ...state,
        isLogoutModalOpen: true,
      };
    case 'close_logout_modal':
      return {
        ...state,
        isLogoutModalOpen: false,
      };
    case 'toggle_sidebar':
      return {
        ...state,
        isSideBarOpen: !state.isSideBarOpen,
      };
    case 'open_sidebar':
      return {
        ...state,
        isSideBarOpen: true,
      };
    case 'close_sidebar':
      return {
        ...state,
        isSideBarOpen: false,
      };
    default:
      throw Error('Unknown action: ' + action.type);
  }
}

function Sidebar({ onLogout }) {
  // const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  // const [isOpen, setIsOpen] = useState(false); // Initialize the sidebar as open by default
  const [sidebar, setSidebar] = useState(false); // Set sidebar to close by default
  const showSidebar = () => setSidebar(!sidebar); // Toggle sidebar visibility on/off

  const [state, dispatch] = useReducer(sideBarReducer, { isLogoutModalOpen: false, isSideBarOpen: false })

  // const handleToggleSidebar = () => {
  //   // setIsOpen(!isOpen); // Toggle the sidebar state
  //   dispatch({
  //     type: 'toggle_sidebar'
  //   })
  // };

  // // set sidebar open as true while the menu is called
  // const handleOnOpen = () => {
  //   // setIsOpen(true);
  //   dispatch({
  //     type: 'open_sidebar'
  //   })
  // }

  // // set sidebar open as false while the menu is hidden
  // const handleOnClose = () => {
  //   // setIsOpen(false);
  //   dispatch({
  //     type: 'close_sidebar'
  //   })
  // }

   // Handle submenu item clicks
   const handleItemClick = (item) => {
    // Toggle sidebar visibility
    showSidebar();
    // If submenu item clicked is Logout
    if (item.title === 'Logout') {
      // Trigger logout process
      onLogoutButton();
    }
  };

  const onLogoutButton = () => {
    // handleToggleSidebar();
    // Set isModalOpen state to true, effectively opening the modal
    // setIsLogoutModalOpen(true);
    // Dispatch reducer types to trigger desired responses
    dispatch({
      type: 'open_logout_modal'
    });
  };

  const handleConfirmLogout = () => {
    // Call log out process over at App.jsx
    onLogout();
    // Hide log out confirmation modal
    // setIsLogoutModalOpen(false);
    dispatch({
      type: 'close_logout_modal'
    });
    console.log("Logged Out");
  }

  return (
    <>
      {/* <Menu customCrossIcon={false} isOpen={state.isSideBarOpen} onOpen={handleOnOpen} onClose={handleOnClose} >
        <Link to="/" className="menu-item" onClick={handleToggleSidebar}><MdHome className='customIcon' />Home</Link>
        <Link to="/tech-list" className="menu-item" onClick={handleToggleSidebar}><MdFormatListBulleted className='customIcon' />Tech List</Link>
        <Link to="/color-picker" className="menu-item" onClick={handleToggleSidebar}><MdColorLens className='customIcon' />Color Picker</Link>
        <Link className="menu-item" onClick={onLogoutButton}><MdLogout className='customIcon' />Logout</Link>
      </Menu> */}
      <div>
        <div className='Nav'>
          {/* Burger Menu Icon */}
          <div className='NavIcon'>
            {/* Toggle sidebar to on */}
            <MdMenu onClick={showSidebar} />
          </div>
          <h1 className='title'>Header Title</h1>
        </div>
        {/* Sidebar with changeable classname: if sidebar state is true, className=sidebar-nav.show | else, className=sidebar-nav */}
        {/* Each className triggers different sidebar style that affects its visibility */}
        <nav className={`sidebar-nav ${sidebar ? 'show' : ''}`} >
          <div className='sidebar-wrap'>
            {/* Close icon that toggle sidebar visibility off */}
            {/* <MdOutlineClose onClick={showSidebar} className='sidebar-close-icon' /> */}
            {/* Gather sidebar data to provide to SubMenu component */}
            {SidebarData.map((item, index) => (
              // SubMenu component that inherit sidebar item array for display, array index for pinpointing specific item
              // Function that trigger handleItemClick func that check what submenu item is clicked
                <SubMenu item={item} key={index} onItemClick={() => handleItemClick(item)} />
            ))}
          </div>
        </nav>
      </div>
      <LogoutModal
        // For verifying the delete modal is desired to be opened
        isOpen={state.isLogoutModalOpen}
        // If called, turn isLogoutModalOpen state to false, effectively closing LogoutModal
        onClose={() =>
          // setIsLogoutModalOpen(false)
          dispatch({
            type: 'close_logout_modal'
          })
        }
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
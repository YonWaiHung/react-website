// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

// Props of item as menu item & onitemclick function
function SubMenu({ item, onItemClick }) {
  // State variable of sub navigation item visibility
  const [subnav, setSubnav] = useState(false);
  // Toggling sub navigation visibility to true & false
  const showSubnav = () => setSubnav(!subnav);

  return (
    <>
      {/* Link pointing to item paths and toggle sub navigation item visibility if item.subNav is present */}
      <Link className="sidebar-link" to={item.path} onClick={(e) => { onItemClick(); item.subNav && showSubnav(e); }} >
        <div>
          {/* Submenu item icon */}
          {item.icon}
          <span className="sidebar-label">
            {/* Submenu item title */}
            {item.title}
          </span>
        </div>
        {/* If subnav state true, show item icon */}
        {/* If subnav state false, close item icon */}
        <div>
          {item.subNav && subnav ? 
            item.iconOpened
            : item.subNav ? 
              item.iconClosed
              : null
          }
        </div>
      </Link>
      {/* If sub navigation is true, map item & render links of the items */}
      {subnav &&
        item.subNav.map((item, index) => {
          return (
            // Display link with paths to component connected to the nav item
            <Link className="dropdown-link"
              to={item.path}
              key={index}
            >
              {/* Display icon */}
              {item.icon}
              <span className="sidebar-label">
                {/* Display title */}
                {item.title}
              </span>
            </Link>
          );
        })}
    </>
  )
}

SubMenu.propTypes = {
  item: PropTypes.array,
  onItemClick: PropTypes.func,
}

export default SubMenu
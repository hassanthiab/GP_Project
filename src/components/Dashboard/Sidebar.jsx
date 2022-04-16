import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarData } from './navbar.js';
import './Sidebar.css';
import { IconContext } from 'react-icons';
import axios from "../axios/axios";

function Navbar() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);
  let logoutReq = () => {
    if (localStorage.getItem("token")) {
      axios(localStorage.getItem("token"))
        .delete("/api/loagout")
        .then()
        .catch((error) => {
          if (!error.response) return;
        });
      localStorage.clear();
    }
  };
  return (
    <React.Fragment>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navbar'>
          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
          
              );
            })}
                     <li  className="nav-text">
                  <Link onClick={logoutReq} to="/">
                    
                    <span>LogOut</span>
                  </Link>
                </li>
          </ul>
        </nav>
      </IconContext.Provider>
    </React.Fragment>
  );
}

export default Navbar;
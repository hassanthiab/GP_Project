import React, { useState,useEffect } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarData } from './navbar.js';
import './Sidebar.css';
import { IconContext } from 'react-icons';
import Avatar from '@mui/material/Avatar';
import axios from "../axios/axios";

function Navbar() {
  const [sidebar, setSidebar] = useState(false);
  const [pf, setPf] = useState();
  const showSidebar = () => setSidebar(!sidebar);
useEffect(() => {
  axios(localStorage.getItem("token"))
        .get("/api/admin/user")
        .then((response)=>{ 
           setPf(response.data.profile_picture)
          })
        .catch((error) => {
          if (!error.response) return;
        });
}, []);
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
        <div className='navbar1'>
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
            <li  className='nav-text'>
                  <Link to={"/profile"}>
                  <Avatar
                    alt="Remy Sharp"
                    src={`http://${process.env.REACT_APP_HOST_BACKEND}:8000/storage/${pf?pf:'bpp.webp'}`} 
                    sx={{ width: 30, height: 30 }}
                    />
                    <span>Profile</span>
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
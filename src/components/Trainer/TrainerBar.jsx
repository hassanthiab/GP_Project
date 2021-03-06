import React, { useState, useEffect } from "react";
import {
  Nav,
  NavLink,
  NavMenu,
  NavBtn,
  NavBtnLink,
  BarsDiv,
  NavItem,
} from "../Homepage/Homepage";
import { FaBars, FaTimes } from "react-icons/fa";
import axios from "../axios/axios";
function Trainerbar() {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);

  const [buttonShow, setButton] = useState(false);

  const showButton = () => {
    if (window.innerWidth <= 960) setButton(true);
    else setButton(false);
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener("resize", showButton);

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
    <div>
      <Nav>
        <NavLink to="/">
          <h1>Logo</h1>
        </NavLink>
        <BarsDiv onClick={handleClick}>
          {click ? <FaTimes /> : <FaBars />}
        </BarsDiv>

        <NavMenu onClick={handleClick} click={click}>
          <NavItem button="true">
            <NavLink to="/" activestyle="True">
              Home
            </NavLink>
          </NavItem>

          <NavItem button="true">
            <NavLink to="/hello">Tournaments</NavLink>
          </NavItem>

          <NavItem button="true">
            <NavLink to="/home" activestyle="True">
              Feed
            </NavLink>
          </NavItem>
          <NavItem button="true">
            <NavLink to="/Schedule" activestyle="True">
              Schedule
            </NavLink>
          </NavItem>
          <NavItem button="true">
            <NavLink to="/chat" activestyle="True">
              Chat
            </NavLink>
          </NavItem>

          <NavItem button={buttonShow}>
            <NavLink to="/Login" activestyle="True">
              Login
            </NavLink>
          </NavItem>

          <NavItem button={buttonShow}>
            <NavLink to="/Signup" activestyle="True">
              Signup
            </NavLink>
          </NavItem>

          <NavItem button={buttonShow}>
            <NavLink onClick={logoutReq} to="/" activestyle="True">
              Logout
            </NavLink>
          </NavItem>
        </NavMenu>

        <NavBtn>
          <NavBtnLink to="/Signup">Sign up</NavBtnLink>
          <NavBtnLink to="/Login">Log in</NavBtnLink>
          <NavBtnLink onClick={logoutReq} to="/">
            Log out
          </NavBtnLink>
        </NavBtn>
      </Nav>
    </div>
  );
}

export default Trainerbar;

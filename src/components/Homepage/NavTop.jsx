import React  from 'react'
import {Link} from 'react-router-dom'
import axios from "../axios/axios";
import logo from "./logo.png"
import "./Top.css"
export default function NavTop(props){

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


return(
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">

  <div class="container-fluid">

    <button
      class="navbar-toggler"
      type="button"
      data-mdb-toggle="collapse"
      data-mdb-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <i class="fas fa-bars"></i>
    </button>


    <div class="collapse navbar-collapse" id="navbarSupportedContent">

      <Link class="navbar-brand mt-2 mt-lg-0" to="/">
        <img
          src={logo}
          height="60"
          alt="CLub Logo"
          loading="lazy"
        />
      </Link>
 
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">

      {!localStorage.getItem("token")?
      <Link to="/">
      <li class={props.page=="home"?"nav-item active":"nav-item"}>
        <a class="nav-link user-select-none ">Home</a>
      </li>
      </Link>:""}

      <Link to="/UserTournament">
      <li class={props.page=="Tournaments"?"nav-item active":"nav-item"}>
        <a class="nav-link user-select-none">Tournaments</a>
      </li>
      </Link>
      
      {localStorage.getItem("token")?localStorage.getItem("type")==""?
      <Link to="/Courses">
      <li class={props.page=="Courses"?"nav-item active":"nav-item"}>
        <a class="nav-link user-select-none">Courses</a>
      </li>
      </Link>
      :""
      :""}
      

      {localStorage.getItem("token")?
       <Link to={localStorage.getItem("type")=="trainer/"?"/Schedule":"/ScheduleUser"}>
      <li class={props.page=="Schedule"?"nav-item active":"nav-item"}>
        <a class="nav-link user-select-none">Schedule</a>
      </li>
      </Link>:""}
     


    
      <Link to="/Chat">
      <li class={props.page=="Chat"?"nav-item active":"nav-item"}>
        <a class="nav-link user-select-none">Chat</a>
      </li>
      </Link>

      <Link to="/Feed">
      <li class={props.page=="Feed"?"nav-item active":"nav-item"}>
        <a class="nav-link user-select-none">Feed</a>
      </li>
      </Link>
       
      </ul>

    </div>


    <div class="d-flex align-items-center">
    {!localStorage.getItem("token")?
    <Link to="/Login">
    <button type="button" class="btn btn-link px-3 me-2">
          Login
        </button>
    </Link>:""}

    {!localStorage.getItem("token")?
    <Link to="/Signup">
    <button type="button" class="btn btn-link px-3 me-2">
    Signup
        </button>
    </Link>:""}

    {localStorage.getItem("token")?
      <a class="text-reset me-3" href="#">
        <i class="fas fa-shopping-cart"></i>
      </a>:""}

      {localStorage.getItem("token")?
      <div class="dropdown">
        <a
          class="text-reset me-3 dropdown-toggle hidden-arrow"
          href="#"
          id="navbarDropdownMenuLink"
          role="button"
          data-mdb-toggle="dropdown"
          aria-expanded="false"
        >
          <i class="fas fa-bell"></i>
          <span class="badge rounded-pill badge-notification bg-danger">1</span>
        </a>
        <ul
          class="dropdown-menu dropdown-menu-end"
          aria-labelledby="navbarDropdownMenuLink"
        >
          <li>
            <a class="dropdown-item user-select-none" href="#">Some news</a>
          </li>
          <li>
            <a class="dropdown-item user-select-none" href="#">Another news</a>
          </li>
          <li>
            <a class="dropdown-item user-select-none" href="#">Something else here</a>
          </li>
        </ul>
      </div>:""}
    
      {localStorage.getItem("token")?
      <div class="dropdown">
        <a
          class="dropdown-toggle d-flex align-items-center hidden-arrow"
          href="#"
          id="navbarDropdownMenuAvatar"
          role="button"
          data-mdb-toggle="dropdown"
          aria-expanded="false"
        >
          <img
            src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
            class="rounded-circle"
            height="25"
            alt="Black and White Portrait of a Man"
            loading="lazy"
          />
        </a>

      
        <ul
          class="dropdown-menu dropdown-menu-end"
          aria-labelledby="navbarDropdownMenuAvatar"
        >
          <li>
          <Link to="/Profile" class="dropdown-item user-select-none">My profile</Link>
          </li>
      
          <li>
          <Link to="/" class="dropdown-item user-select-none"  onClick={logoutReq}>Logout</Link>
          </li>
        </ul>

    

      </div>:""}
    </div>

  </div>

</nav>

)
}

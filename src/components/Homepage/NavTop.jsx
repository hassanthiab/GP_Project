import React ,{ useState, useEffect }  from 'react'
import {Link} from 'react-router-dom'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { Fragment } from 'react/cjs/react.production.min';
import axios from "../axios/axios";
import logo from "./logo.png"
import "./Top.css"
export default function NavTop(props){
 const [notifications, setNotifications] = useState();
 const [count, setCount] = useState();
 const [readAt, setReadAt] = useState([]);
 const [pf, setPf] = useState();
 const [notification, setNotification] = useState();
 const [open, setOpen] = useState(false);

    const a = localStorage.getItem("type");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      axios()
      .get("/api/" + a + "user")
      .then((response) => {
        setPf(response.data.profile_picture)
      // Enable pusher logging - don't include this in production
     

  Pusher.logToConsole = true;
  
  var pusher = new Pusher('e698a4bb48003226df99',
  {
    cluster: 'ap2'
  },
 

 
  );
  //pusher.signin()
  pusher.unsubscribe('my-channel.'+response.data.username);
  var channel = pusher.subscribe('my-channel.'+response.data.username);
  
  channel.bind('my-event', function(data) {
    var myToastEl = document.getElementById('myToastEl')
    var myToast = bootstrap.Toast.getOrCreateInstance(myToastEl) // Returns a Bootstrap toast instance
    var myToastEl = document.getElementById('toast-bodyy')
    myToastEl.innerHTML=data.message
    myToast.show()
    axios()
    .get("/api/" + a + "getNotifications")
    .then((response) => {
      let count=0;
      let readat=[]
      setNotifications(response.data)
      for(let i=0;i<response.data.length;i++){
        if(response.data[i].read_at==null)
          count++
          readat[i]=response.data[i].read_at  
      }
      setReadAt(readat)
      if(count==0)
      setCount("")
      else
      setCount(count)
    
    })
    .catch((error) => {
      if(!error.response) return
    });
  });
      })
      .catch((error) => {
        if(!error.response) return
      });
    axios()
      .get("/api/" + a + "getNotifications")
      .then((response) => {
        let count=0;
        let readat=[]
        setNotifications(response.data)
        for(let i=0;i<response.data.length;i++){
          if(response.data[i].read_at==null)
            count++
            readat[i]=response.data[i].read_at  
        }
        setReadAt(readat)
        if(count==0)
        setCount("")
        else
        setCount(count)
      
      })
      .catch((error) => {
        if(!error.response) return
      });
    }

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
      window.history('/')
    }
  };
  const handleClickOpen = (id) => {
    axios()
    .get("/api/" + a + "getNotification/"+id)
    .then((response) => {
      setNotification(response.data)
      axios()
      .get("/api/" + a + "getNotifications")
      .then((response) => {
        let count=0;
        let readat=[]
        for(let i=0;i<response.data.length;i++){
          if(response.data[i].read_at==null)
            count++
            readat[i]=response.data[i].read_at  
        }
        setReadAt(readat)
        if(count==0)
        setCount("")
        else
        setCount(count)
      
      })
      .catch((error) => {
        if(!error.response) return
      });
    })
    .catch((error) => {
      if(!error.response) return
    });
  
    setOpen(true);
  };
  const handleClose = () => {

      setOpen(false);
    };

return(
  <Fragment>
<nav class="navbar sticky-top navbar-expand-sm navbar-dark bg-dark">

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


  <div class="collapse navbar-collapse " id="navbarSupportedContent">

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
    <a class="text-reset me-3  " href="#">
      <i class="fas fa-shopping-cart"></i>
    </a>:""}

    {localStorage.getItem("token")?
    <div class="dropdown">
      <a
        class="text-reset me-3 hidden-arrow"
        href="#"
        id="navbarDropdownMenuLink"
        role="button"
        data-mdb-toggle="dropdown"
        aria-expanded="false"
      >
        <i class="fas fa-bell"></i>
        <span class="badge rounded-pill badge-notification bg-danger">{notifications?count:""}</span>
      </a>
      <ul
        class="dropdown-menu  dropdown-menu-end"
        aria-labelledby="navbarDropdownMenuLink"
      >
         {notifications?
          notifications[0]?
        <li>
          <strong onClick={()=>handleClickOpen(notifications[0].id)} class="dropdown-item user-select-none" ><strong style={{fontSize:'10px',color:'red'}}>{readAt[0]?(''):('* ')}</strong>{notifications[0].data.title}</strong>
        </li>
        :"":""}
        {notifications?
          notifications[1]?
        <li>
          <strong onClick={()=>handleClickOpen(notifications[1].id)} class="dropdown-item user-select-none"><strong style={{fontSize:'10px',color:'red'}}>{readAt[1]?(''):('* ')}</strong>{notifications[1].data.title}</strong>
        </li>
        :"":""}
        {notifications?
          notifications[2]?
        <li>
        <strong onClick={()=>handleClickOpen(notifications[2].id)} class="dropdown-item user-select-none"><strong style={{fontSize:'10px',color:'red'}}>{readAt[2]?(''):('* ')}</strong>{notifications[2].data.title}</strong>
        </li>
        :"":""}
       
        <li>
          <Link to={"/notifications"} class="dropdown-item user-select-none" href="#">All Notifications</Link>
        </li>
      </ul>
    </div>:""}
  
    {localStorage.getItem("token")?
    <div class="dropdown ">
      <a
        class="d d-flex align-items-center hidden-arrow"
        href="#"
        id="navbarDropdownMenuAvatar"
        role="button"
        data-mdb-toggle="dropdown"
        aria-expanded="false"
      >
        <img
          src={`http://${process.env.REACT_APP_HOST_BACKEND}:8000/storage/${pf?pf:'bpp.webp'}`} 
          class="rounded-circle"
          height="25"
          alt="pf"
          loading="lazy"
        />
      </a>

    
      <ul
        class="dropdown-menu  dropdown-menu-end"
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
                <Dialog
        open={open}
        //TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{notification?notification.data.title:""}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
          {notification?notification.data.body:""}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>OK</Button>
        </DialogActions>
      </Dialog>
   </Fragment>

)
}
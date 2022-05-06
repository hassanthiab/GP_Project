import React ,{ useState, useEffect }  from 'react'
import {Link} from 'react-router-dom'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Avatar from '@mui/material/Avatar';

import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { Fragment } from 'react/cjs/react.production.min';
import axios from "../axios/axios";
import logo from "./logo.png"
import "./Top.css"
import { IoChatbox,IoMailUnread,IoMailOpenOutline } from "react-icons/io5";
export default function NavTop(props){
 const [notifications, setNotifications] = useState();
 const [count, setCount] = useState();
 const [readAt, setReadAt] = useState([]);
 const [pf, setPf] = useState();
 const [notification, setNotification] = useState();
 const [open, setOpen] = useState(false);

    const a = localStorage.getItem("type");
    let pusher
  let diffTime=(date)=>{
    let Mindiff=(Math.abs(new Date(date)-Date.now())/1000/60).toFixed()
    let s=" Mins"
   if(Mindiff>=24)
 {
  Mindiff = (Mindiff/60).toFixed()
  s=" hrs"
  if(Mindiff>=24)
{
Mindiff = (Mindiff/24).toFixed()
s=" days"
if(Mindiff>=30){
  Mindiff = (Mindiff/30).toFixed()
  s=" months"
}
}
 
}
return Mindiff<1&&s==" Mins"?"just now":Mindiff+" "+s;
}
  useEffect(() => {
    if (localStorage.getItem("token")) {
      axios()
      .get("/api/" + a + "user")
      .then((response) => {
        setPf(response.data.profile_picture)
      // Enable pusher logging - don't include this in production
      Pusher.logToConsole = true;
  
      pusher = new Pusher('e698a4bb48003226df99',
      {
       cluster: 'ap2'
      });


  let channel = pusher.subscribe('my-channel.'+response.data.username);
 
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
    return () => {
      if(pusher)
      pusher.disconnect();
    };
  }, []);

  let logoutReq = () => {

    if (localStorage.getItem("token")) {

      axios(localStorage.getItem("token"))
        .delete("/api/loagout")
        .then((res)=>
        {    
          pusher.disconnect();
        
        }  
        )
        .catch((error) => {
          if (!error.response) return;
        });
        localStorage.clear();
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
    :localStorage.getItem("type")=="trainer/"?  
     <Link to="/RCourses">
    <li class={props.page=="Courses"?"nav-item active":"nav-item"}>
      <a class="nav-link user-select-none">Registered Courses</a>
    </li>
    </Link>:""
    :""}
    

    {localStorage.getItem("token")?
     <Link to={localStorage.getItem("type")=="trainer/"?"/Schedule":"/ScheduleUser"}>
    <li class={props.page=="Schedule"?"nav-item active":"nav-item"}>
      <a class="nav-link user-select-none">Schedule</a>
    </li>
    </Link>:""}
   

    <Link to="/Feed">
    <li class={props.page=="Feed"?"nav-item active":"nav-item"}>
      <a class="nav-link user-select-none">Feed</a>
    </li>
    </Link>
     
    </ul>

  </div>


  <div class="d-flex align-items-center">
  {!localStorage.getItem("token")?
  <Link  to="/Login">
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
  <Link style={{color:'#4e4e4e',marginRight:'7px'}} to={'/Chat'}>
  <IoChatbox />
  <span class="badge rounded-pill badge-notification bg-danger ">1</span>
</Link>:""}
 
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
          <strong onClick={()=>handleClickOpen(notifications[0].id)} class="dropdown-item user-select-none" ><strong style={{fontSize:'15px',marginRight:'2px'}}>{readAt[0]?(<IoMailOpenOutline/>):(<IoMailUnread/>)}</strong>{notifications[0].data.title}
          <br></br>
          <small>{diffTime(notifications[0].created_at)}</small>          <br></br>
          <small>ـــــــــــــــــــــــــــــــــــــــــــــ</small></strong>
          
        
        </li>
        :"":""}
        {notifications?
          notifications[1]?
        <li>
          <strong onClick={()=>handleClickOpen(notifications[1].id)} class="dropdown-item user-select-none"><strong style={{fontSize:'15px',marginRight:'2px'}}>{readAt[1]?(<IoMailOpenOutline/>):(<IoMailUnread/>)}</strong>{notifications[1].data.title}
                  <br></br>
                  <small>{diffTime(notifications[1].created_at)}</small>
          <br></br>
          <small>ـــــــــــــــــــــــــــــــــــــــــــــ</small>
          </strong>
      
        </li>
        :"":""}
        {notifications?
          notifications[2]?
        <li>
        <strong onClick={()=>handleClickOpen(notifications[2].id)} class="dropdown-item user-select-none"><strong style={{fontSize:'15px',marginRight:'2px'}}>{readAt[2]?(<IoMailOpenOutline/>):(<IoMailUnread/>)}</strong>{notifications[2].data.title}
        <br></br>
        <small>{diffTime(notifications[2].created_at)}</small>
          <br></br>
          <small>ـــــــــــــــــــــــــــــــــــــــــــــ</small></strong>
      
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
      <Avatar
  alt="Remy Sharp"
  src={`http://${process.env.REACT_APP_HOST_BACKEND}:8000/storage/${pf?pf:'bpp.webp'}`} 
  sx={{ width: 30, height: 30 }}
/>
        {/* <img
          src={`http://${process.env.REACT_APP_HOST_BACKEND}:8000/storage/${pf?pf:'bpp.webp'}`} 
          class="rounded-circle"
          height="25"
          alt="pf"
          loading="lazy"
        /> */}
      </a>

    
      <ul
        class="dropdown-menu  dropdown-menu-end"
        aria-labelledby="navbarDropdownMenuAvatar"
      >
        <li>
        <Link to="/Profile" class="dropdown-item user-select-none">My profile</Link>
        </li>
        <li>
        <Link to="/UserHorses" class="dropdown-item user-select-none">My Horses</Link>
        </li>
        {localStorage.getItem('type')==''?
         <li>
        <Link to="/UserTournaments" class="dropdown-item user-select-none">My Tournaments</Link>
        </li>:""}
       
   
        <li>
        <Link to="/UserSessions" class="dropdown-item user-select-none">
        {localStorage.getItem('type')==''?'My Sessions':
        localStorage.getItem('type')=='trainer/'?'My Courses':''
        }
  
        </Link>
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
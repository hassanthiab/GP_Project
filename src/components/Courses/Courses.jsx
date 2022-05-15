import React, { useState ,useEffect}from 'react'

import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link,useNavigate,useParams } from "react-router-dom";
import "../Dashboard/btn.css"
import "../Dashboard/productList.css"
import { productRows } from "../Dashboard/dummy-data";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import axios from "../axios/axios";
import NavBar from '../Dashboard/Sidebar'
import NavTop from '../Homepage/NavTop'
function Courses() {
  let { id } = useParams();
    const [data, setData] = useState();
    const [open, setOpen] = useState(false);

    const navigate = useNavigate();



    useEffect(() => {
      if (!localStorage.getItem("token")) {
        navigate("/Login");
      }
  
      axios()
        .get(localStorage.getItem('type')=='admin/'?'/api/admin/getAllTrainerCourses/'+id:"/api/getTrainerCourses/"+id)
        .then((response) => {
          setData(response.data)
  
        })
        .catch((error) => {
          if(!error.response)
          return
        });
        
    }, []);
 
    const handleClickOpen = (id) => {
      axios()
      .get("/api/user/"+id)
      .then((response) => {
        var email = document.getElementById('email11')
        email.value=response.data.email+""
        var username = document.getElementById('Username11')
        username.value=response.data.username+""
        var phone = document.getElementById('phone11')
        phone.value=response.data.phone+""
     
      })
      .catch((error) => {
        if(!error.response)
        return
      });
      
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
 const enroll = (id) => {
  axios()
  .get("/api/courses/"+id+"/payments")
  .then((response) => {
   
   window.location.replace(response.data)
    

  })

  .catch((error) => {
    if(!error.response)
    return
  });


  };
  const columns = [
   
    localStorage.getItem('type')=='admin/'?
    {
      field: "student",
      headerName: "Student",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="productListItem">
          {params.row.user?<img className="productListImg" src={`http://${process.env.REACT_APP_HOST_BACKEND}:8000/storage/${params.row.user?params.row.user.profile_picture?params.row.user.profile_picture:'bpp.webp':""}`} alt="" />:""} 
            {params.row.user?params.row.user.name:"not reserved"}
          </div>
        );
      },
    }
    :
    ({ field: "id", headerName: "ID", width: 90 },
    {
      field: "title",
      headerName: "Tiltle",
      width: 200,
     }),
    { field: "startDate", headerName: "Start Date", width: 160 },
    { field: "endDate", headerName: "End Date", width: 160 },
    {
      field: "price",
      headerName: "price",
      width: 80,
    },
    localStorage.getItem('type')=='admin/'? 
    {
      field: "action",
      headerName: "Action",
      width: 100,
      renderCell: (params) => {
        return (
          <>
            {params.row.user? <Button variant="outlined"  onClick={()=>handleClickOpen(params.row.user?params.row.user.id:"")}>Profile</Button>:"-"}
        
          </>
        );
      },
    }
   :
 
  {
      field: "action",
      headerName: "Action",
      width: 115,
      renderCell: (params) => {
        return (
          <>
             <button onClick={()=>enroll(params.row.id)} class="bn47">Enroll</button>
           
           
          </>
        );
      },  
    }
 
  
    
  ];

  return (
    <div>
 {localStorage.getItem('type')=='admin/'?<NavBar/>:<NavTop page='Courses'/>}
 <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Show profile</DialogTitle>
        <DialogContent>
        <TextField
            autoFocus
            margin="dense"
            id="email11"
            label="Email"
            type="email"
            fullWidth
            variant="standard"
            InputProps={{
                readOnly: true,
              }}
          />
                <TextField
            autoFocus
            margin="dense"
            id="Username11"
            label="Username"
            type="text"
            fullWidth
            variant="standard"
            InputProps={{
                readOnly: true,
              }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="phone11"
            label="Phone"
            type="text"
            fullWidth
            variant="standard"
            InputProps={{
                readOnly: true,
              }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
  <div classname="divcont container" style={{boxShadow: "0px 0px 15px -10px rgba(0, 0, 0, 0.75)", marginLeft: "10%",height: 680, width: '80%' }}>

  <DataGrid
    rows={data}
    columns={columns}
    pageSize={10}
    rowsPerPageOptions={[10]}
   disableSelectionOnClick
  />
</div>
 </div>
  )}

export default Courses

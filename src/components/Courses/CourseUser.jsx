import React, { useState ,useEffect}from 'react'
import { Link,useNavigate,useParams } from "react-router-dom";

import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { productRows } from "../Dashboard/dummy-data.js"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import NavTop from "../Homepage/NavTop";
import axios from "../axios/axios";
export default function ProductList() {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
      if (!localStorage.getItem("token")) {
        navigate("/Login");
      }
  
      axios()
        .get("/api/trainer/getRCourses")
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
  const [data, setData] = useState(productRows);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={`http://${process.env.REACT_APP_HOST_BACKEND}:8000/storage/${params.row.user?params.row.user.profile_picture?params.row.user.profile_picture:'bpp.webp':""}`} alt="" />
            {params.row.user?params.row.user.name:""}
          </div>
        );
      },
    },
    {
      field: "startDate",
      headerName: "start date",
      width: 160,
    },
    {
      field: "endDate",
      headerName: "end date",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
              <Button variant="outlined"  onClick={()=>handleClickOpen(params.row.user?params.row.user.id:"")}>Profile</Button>
        
          </>
        );
      },
    },
  ];

  return (
      <React.Fragment>
                  <NavTop page='Courses'></NavTop>
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
      <div classname="divcont container" style={{boxShadow: "0px 0px 15px -10px rgba(0, 0, 0, 0.75)", marginLeft: "10%", height: 600, width: '80%' }}>
  
      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}

      />


      </div>

      </React.Fragment>

  );
}
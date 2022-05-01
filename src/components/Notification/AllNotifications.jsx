import * as React from 'react';
import Button from '@mui/material/Button';
import "../Dashboard/productList.css";
import { DataGrid } from "@material-ui/data-grid";
import { useState,useEffect } from "react";
import NavTop from '../Homepage/NavTop';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import axios from "../axios/axios";
import { productRows } from "../Dashboard/dummy-data";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

function AllNotifications() {
    const [open, setOpen] = useState(false);
    const [notification, setNotification] = useState();
    const [data, setData] = useState(productRows);
    const a = localStorage.getItem("type");
    useEffect(() => {
      axios()
        .get("/api/" + a + "getNotifications")
        .then((response) => {
      
          setData(response.data)
          
        })
        .catch((error) => {
          if(!error.response) return
        });
      
  
    }, []);

    
    const handleClickOpen = (id) => {
      axios()
      .get("/api/" + a + "getNotification/"+id)
      .then((response) => {
        setNotification(response.data)
        axios()
        .get("/api/" + a + "getNotifications")
        .then((response) => {
      
          setData(response.data)
          
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


  
    const columns = [
      
      {
        field: "title",
        headerName: "title",
        width: 200,
        renderCell: (params) => {
          return (
            <div className="productListItem">
              {params.row.data.title}
            </div>
          );
        },
      },
      {
        field: "",
        headerName: "",
        width:10,
        renderCell: (params) => {
          return (
            <div style={{margin:'auto'}} className="productListItem">
              {params.row.read_at?'':<strong style={{fontSize:'17px',color:'red'}}>*</strong>}
            </div>
          );
        },
      },
      {
        field: "info",
        headerName: "info",
        width: 200,
        renderCell: (params) => {
          return (
            <div className="productListItem">
              {params.row.data.body}
            </div>
          );
        },
      },
    
      {
        field: "action",
        headerName: "Action",
        width: 150,
        renderCell: (params) => {
          return (
            <>
                <Button variant="outlined" onClick={()=>handleClickOpen(params.row.id)}>
            Show details
        </Button>
        
            </>
          );
        },
      },
      {
        field: "since",
        headerName: "since",
        width: 200,
        renderCell: (params) => {
          let Mindiff=(Math.abs(new Date(params.row.created_at)-Date.now())/1000/60).toFixed()
          let s=" Mins"
         if(Mindiff>24)
       {
        Mindiff = (Mindiff/60).toFixed()
        s="hrs"
        if(Mindiff>24)
    {
      Mindiff = (Mindiff/60).toFixed()
      s="days"
      if(Mindiff>30){
        Mindiff = (Mindiff/30).toFixed()
        s="months"
      }
    }
       
      }

          return (
            <div className="productListItem">
              {Mindiff<1?"just now":Mindiff+" "+s}
            </div>
    

          );
        },
      },
   
    ];
  
  return (

      <React.Fragment>
                <NavTop></NavTop>
                <Dialog
        open={open}
        TransitionComponent={Transition}
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
        <div classname="divcont container" style={{boxShadow: "0px 0px 15px -10px rgba(0, 0, 0, 0.75)", marginLeft: "10%", height: 600, width: '80%' }}>

            <DataGrid
         rows={data}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
       disableSelectionOnClick
                
            />
        </div>

      </React.Fragment>
  )
}

export default AllNotifications

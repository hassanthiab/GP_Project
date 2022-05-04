import  * as React from 'react';
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { useState,useEffect } from "react";
import {useNavigate,useParams } from "react-router-dom";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Navbar from "./Sidebar";
import axios from "../axios/axios";
import Select from 'react-select'




export default function Attendants() {
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const [option, setOption] = useState();
    const [catId, setCatId] = useState();
    const [userId, setUserId] = useState();
    const [error, setError] = useState();
    let { id } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
      if (!localStorage.getItem("token")) {
        navigate("/Login");
      }
  
      axios()
        .get("/api/admin/getP/"+id)
        .then((response) => {
          setData(response.data)
        })
        .catch((error) => {
          if(!error.response)
          return
        });
        
    }, []);
    const handleClickOpen = (cat_id,user_id,count) => {
      let a=[]

      for(let i=1;i<count+1;i++){
        a[i]={ value: i, label: i }
         }
        //  a[0]={value: 9999, label: 9999 }
       setOptions(a)

      setCatId(cat_id)
      setUserId(user_id)
      setOpen(true);
    };
    const remove = (cat_id,user_id) => {
      axios()
      .put("/api/admin/removeRank/"+cat_id+"/"+user_id)
      .then((response) => {
       if(response.status==200){
         var myToastEl = document.getElementById('myToastEl1')
         var myToast = bootstrap.Toast.getOrCreateInstance(myToastEl) // Returns a Bootstrap toast instance
         var myToastEl = document.getElementById('toast-body')
         myToastEl.innerHTML="Rank has been removed";
         myToast.show()
       setError('')
       axios()
       .get("/api/admin/getP/"+id)
       .then((response) => {
         setData(response.data)
       })
       .catch((error) => {
         if(!error.response)
         return
       });
     }
 
 
      })
      .catch((error) => {
        if(!error.response)
        return 
      });

  
    };


    let changed = (event) => {
      console.log(event.value)
      setOption(event.value)
    };
   const addRank=()=>{
     
     axios()
     .put("/api/admin/setRank/"+catId+"/"+userId,{
       'rank':option,
     })
     .then((response) => {
      if(response.status==200){
        var myToastEl = document.getElementById('myToastEl1')
        var myToast = bootstrap.Toast.getOrCreateInstance(myToastEl) // Returns a Bootstrap toast instance
        var myToastEl = document.getElementById('toast-body')
        myToastEl.innerHTML="Rank has been updated";
        myToast.show()
      setError('')
      handleClose()
    }


     })
     .catch((error) => {
       if(!error.response)
       return
       setError(error.response.data.errors.rank)

     });
   }
    const handleClose = () => {
      axios()
        .get("/api/admin/getP/"+id)
        .then((response) => {
          setData(response.data)
        })
        .catch((error) => {
          if(!error.response)
          return
        });
        setError('')
      setOption('')
      setOpen(false);
    };
  const [data, setData] = useState([]);



  const columns = [
    { field: "id", headerName: "ID", width: 50 },
    {
      field: "User",
      headerName: "User",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={`http://${process.env.REACT_APP_HOST_BACKEND}:8000/storage/${params.row.user?params.row.user.profile_picture?params.row.user.profile_picture:'bpp.webp':""}`}  alt="" />
            {params.row.user?params.row.user.name:""}
          </div>
        );
      },
    },
    {
      field: "email",
      headerName: "email",
      width: 100,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {params.row.user?params.row.user.email:""}
          </div>
        );
      },
    },    {
      field: "category",
      headerName: "category",
      width: 80,
    },
    {
      field: "Rank",
      headerName: "Rank",
      width: 50,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {params.row.user?params.row.user.pivot.rank:""}
          </div>
        );
      },
    }, 
    {
      field: "action",
      headerName: "Action",
      width: 300,
      renderCell: (params) => {
        return (
          <>
              <Button variant="outlined"  onClick={()=>handleClickOpen(params.row.user.pivot.category_id,params.row.user.id,params.row.count)}>Change Rank</Button>
             <span></span>
              <Button  style={{pointerEvents:params.row.user.pivot.rank==null?'none':'',color: params.row.user.pivot.rank==null?'#c0c0c0':''}} variant="outlined-red"  onClick={()=>remove(params.row.user.pivot.category_id,params.row.user.id)}>remove Rank</Button>

        
          </>
        );
      },
    },
  ];     




  return (
  
      <React.Fragment>
      
                <Navbar>

                </Navbar>
        
    
    
 
          <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Enter ranking</DialogTitle>
        <DialogContent style={{width:'250px',height:'200px'}}>
        <Select
        autoFocus
            error
            margin="dense"
            id="rank"
            variant="standard"
         options={options} 
         onChange={(event) => changed(event)}
         />
      <label style={{ color: "#960000", fontWeight: "bold" }}>
                    {error}
                  </label>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          {/*Make it so the Form disppears when the user enters a value between 1-8 AND not taken AND response 200 OTHERWISE error attribute is given (i gave it by default) */}
          <Button onClick={addRank}>Confirm</Button>
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
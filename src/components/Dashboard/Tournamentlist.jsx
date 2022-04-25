import React from 'react'
import "./productList.css";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link,useNavigate } from "react-router-dom";
import { useState ,useEffect} from "react";
import Navbar from './Sidebar';
import axios from "../axios/axios";

import "./newUser.css"
import "./btn.css"
import "../Login/LoginStyle.css"
function Tournamentlist() {
    const [data, setData] = useState();
    const a = localStorage.getItem("type");
    const navigate = useNavigate();
    const handleDelete = (id) => {
      axios()
      .delete("/api/"+a+"tournaments/"+id)
      .then((response) => {
        if(response.status==200){
          setData(data.filter((item) => item.id !== id));
        }
        
      })
      .catch((error) => {
        if(!error.response)
      return});

    };
    
    useEffect(() => {
      if (!localStorage.getItem("token")) {
        navigate("/Login");
      }
  
      axios()
        .get("/api/tournaments")
        .then((response) => {
          setData(response.data)
          
        })
        .catch((error) => {
          if(!error.response)
        return});
  
      
  
    }, []);
    const columns = [
 
      {
        field: "name",
        headerName: "name",
        width: 200,
        renderCell: (params) => {
          console.log(params.row)
          return (
            <div className="productListItem">
              <img className="productListImg" src={`http://localhost:8000/storage/${params.row.image?params.row.image:'bpp.webp'}`} alt="" />
              {params.row.name}
            </div>
          );
        },
      },
      {
        field: "size",
        headerName: "size",
        width: 120,
      },
      {
        field: "date",
        headerName: "date",
        width: 120,
      },
      {
        field: "club",
        headerName: "club",
        width: 160,
      },
      {
        field: "action",
        headerName: "Action",
        width: 150,
        renderCell: (params) => {
          return (
            <React.Fragment>
              <Link to={"/Tournament/" + params.row.id}>
                <button className="productListEdit">Edit</button>
              </Link>
              <DeleteOutline
                className="productListDelete"
                onClick={() => handleDelete(params.row.id)}
              />
           </React.Fragment>
          );
        },
      },
    ];
  
    return (
      <div>

        <Navbar></Navbar>
 
      <div classname="divcont container" style={{boxShadow: "0px 0px 15px -10px rgba(0, 0, 0, 0.75)", marginLeft: "25%", height: 400, width: '65%' }}>
      <div className='row'>
        <div className='col-8'>

        </div>
        <div className='col2'>
        <Link to="/addTournament">
        <button class="bn54">
    <span class="bn54span">New Tournament</span>
  </button>
        </Link>
        </div>

        <div className='col-2'>

        </div>
      </div>
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
       disableSelectionOnClick
      />
    </div>
     </div>
    );
}

export default Tournamentlist

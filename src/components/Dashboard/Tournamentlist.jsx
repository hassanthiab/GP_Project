import React from 'react'
import "./productList.css";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link,useNavigate } from "react-router-dom";
import { useState ,useEffect} from "react";
import Navbar from './Sidebar';
import axios from "../axios/axios";

import "./newUser.css"
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
          return (
            <div className="productListItem">
              <img className="productListImg" src={`http://localhost:8000/storage/${params.row.image}`} alt="" />
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
              <Link to={"/product/" + params.row.id}>
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
      <div classname="divcont container" style={{  marginLeft: "70px", height: 400, width: '80%' }}>
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
       disableSelectionOnClick
      />
    </div>
     </div>
    );
}

export default Tournamentlist

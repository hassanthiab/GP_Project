import React from 'react'
// import "./productList.css";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link,useNavigate } from "react-router-dom";
import { useState ,useEffect} from "react";
import NavTop from '../Homepage/NavTop'
import axios from "../axios/axios";

// import "./newUser.css"
// import "./btn.css"
// import "../Login/LoginStyle.css"
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
        .get("/api/getUserTournaments")
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
        width: 150,
        renderCell: (params) => {
          return (
            <div className="productListItem">
            <img className="productListImg" src={`http://${process.env.REACT_APP_HOST_BACKEND}:8000/storage/${params.row.tournaments.image?params.row.tournaments.image:'bpp.webp'}`} alt="" />
            {params.row.tournaments.name}
          </div>
          );
        },
      },
      {
        field: "date",
        headerName: "Date",
        width: 100,
        renderCell: (params) => {
          return (
            <div className="productListItem">
            {params.row.tournaments.date}
          </div>
          );
        },
      },
      {
        field: "club",
        headerName: "Club",
        width: 80,
        renderCell: (params) => {
          return (
            <div className="productListItem">
            {params.row.tournaments.club}
          </div>
          );
        },
      },
      {
        field: "location",
        headerName: "Location",
        width: 80,
        renderCell: (params) => {
          return (
            <div className="productListItem">
            {params.row.tournaments.location}
          </div>
          );
        },
      },
      {
        field: "category",
        headerName: "Category",
        width: 80,
      },
      {
        field: "rank",
        headerName: "Rank",
        width: 50,
        renderCell: (params) => {
          return (
            <div className="productListItem">
            {params.row.pivot.rank?params.row.pivot.rank:"-"}
          </div>
          );
        },
      },
    ];
  
    return (
      <div>

        <NavTop/>
 
      <div classname="divcont container" style={{boxShadow: "0px 0px 15px -10px rgba(0, 0, 0, 0.75)", marginLeft: "10%", height: 400, width: '80%' }}>

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

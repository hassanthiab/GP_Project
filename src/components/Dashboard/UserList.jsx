import "./userList.css";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { userRows } from "./dummy-data";
import { Link,useNavigate } from "react-router-dom";
import React,{  useState,useEffect } from "react";
import Navbar from "./Sidebar";
import "./newUser.css"
import Pagetop from '../Homepage/Pagetop.jsx';

import axios from "../axios/axios";
export default function UserList() {
  const [data, setData] = useState();
  const a = localStorage.getItem("type");
    const navigate = useNavigate();
  const handleDelete = (id) => {
    axios()
    .delete("/api/"+a+"trainers/"+id)
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
      .get("/api/admin/trainers")
      .then((response) => {
        console.log(response.data.data)
        setData(response.data)
        
      })
      .catch((error) => {
        if(!error.response)
      return});

    

  }, []);

  const columns = [
    {
      field: "username",
      headerName: "username",
      width: 200,
      renderCell: (params) => {
        console.log(params.row)
        return (
        
          <div className="userListUser">
            <img className="userListImg" src={params.row.profile_picture?`http://localhost:8000/storage/${params.row.profile_picture}`:""} alt="" />
            {params.row.username}
          </div>
        );
      },
    },
  
    { field: "email", headerName: "Email", width: 200 },
    { field: "phone", headerName: "Phone", width: 200 },  
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <div>
        <Link to={"/Trainer/" + params.row.id}>
              <button className="userListEdit">Edit</button>
            </Link>    
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
         </div>
        );
      },
    },
  ];

  return (
    <div>
      <Pagetop></Pagetop>
      <Navbar></Navbar>
 <div classname="divcont" style={{  marginLeft: "70px", height: 400, width: '80%' }}>
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
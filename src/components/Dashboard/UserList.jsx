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
      .get("/api/trainers")
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
          <img className="userListImg" src={`http://${process.env.REACT_APP_HOST_BACKEND}:8000/storage/${params.row.profile_picture?params.row.profile_picture:'bpp.webp'}`} alt="" />
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
      <Navbar></Navbar>
 <div  classname="divcont container" style={{boxShadow: "0px 0px 15px -10px rgba(0, 0, 0, 0.75)",  marginLeft: "10%", height: 400, width: '80%' }}>
 <div className='row'>
        <div className='col-8'>

        </div>
        <div className='col2'>
        <Link to="/addTrainer">
        <button class="bn54">
    <span class="bn54span">New Trainer</span>
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
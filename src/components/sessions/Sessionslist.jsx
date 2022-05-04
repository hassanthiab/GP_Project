import React, { useState ,useEffect}from 'react'
import NavTop from '../Homepage/NavTop'
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link,useNavigate,useParams } from "react-router-dom";
import "../Dashboard/btn.css"
import "../Dashboard/productList.css"
import axios from "../axios/axios";

function Sessions() {
  let { id } = useParams();
    const [data, setData] = useState();

    const navigate = useNavigate();



    useEffect(() => {
     
      if (!localStorage.getItem("token")) {
        navigate("/Login");
      }
  
      axios()
        .get(localStorage.getItem('type')=="trainer/"?"/api/trainer/getAllTC":"/api/getUserCourses")
        .then((response) => {
          setData(response.data)
  
        })
        .catch((error) => {
          if(!error.response)
          return
        });
        
    }, []);
 
  
  const columns = [
 
    localStorage.getItem('type')=="trainer/"?
    {
      field: "student",
      headerName: "Student",
      width: 160,
      renderCell: (params) => {
        return (
          <div className="productListItem">
          {params.row.user?<img className="productListImg" src={`http://${process.env.REACT_APP_HOST_BACKEND}:8000/storage/${params.row.user?params.row.user.profile_picture?params.row.user.profile_picture:'bpp.webp':""}`} alt="" />:""} 
            {params.row.user?params.row.user.email:"not reserved"}
          </div>
        );
      },
}
    :
{
      field: "trainer",
      headerName: "Trainer",
      width: 160,
      renderCell: (params) => {
        return (
          <div className="productListItem">
          {params.row.trainer?<img className="productListImg" src={`http://${process.env.REACT_APP_HOST_BACKEND}:8000/storage/${params.row.trainer?params.row.trainer.profile_picture?params.row.trainer.profile_picture:'bpp.webp':""}`} alt="" />:""} 
            {params.row.trainer?params.row.trainer.email:""}
          </div>
        );
      },
},

    { field: "startDate", headerName: "Start Date", width: 160 },
    { field: "endDate", headerName: "End Date", width: 160 },
    {
      field: "price",
      headerName: "price",
      width: 80,
    },

    
 
  
    
  ];

  return (
    <div>
    <NavTop />
 
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
  )
}

export default Sessions
import React, { useState ,useEffect}from 'react'
import NavTop from '../Homepage/NavTop'
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link,useNavigate,useParams } from "react-router-dom";
import "../Dashboard/btn.css"
import "../Dashboard/productList.css"
import { productRows } from "../Dashboard/dummy-data";
import axios from "../axios/axios";

function Courses() {
  let { id } = useParams();
    const [data, setData] = useState();

    const navigate = useNavigate();



    useEffect(() => {
      if (!localStorage.getItem("token")) {
        navigate("/Login");
      }
  
      axios()
        .get("/api/getTrainerCourses/"+id)
        .then((response) => {
          setData(response.data)
  
        })
        .catch((error) => {
          if(!error.response)
          return
        });
        
    }, []);
 
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
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "title",
      headerName: "Tiltle",
      width: 200,
     },
    { field: "startDate", headerName: "Start Date", width: 200 },
    { field: "endDate", headerName: "End Date", width: 200 },

    {
      field: "price",
      headerName: "price",
      width: 160,
    },
  
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
             <button onClick={()=>enroll(params.row.id)} class="bn47">Enroll</button>
           
           
          </>
        );
      },
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
  )}

export default Courses

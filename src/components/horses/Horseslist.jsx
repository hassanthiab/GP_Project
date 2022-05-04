// import "./productList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
// import { productRows } from "./dummy-data";
import { useState,useEffect } from "react";
import { Link,useNavigate } from "react-router-dom";
import NavTop from '../Homepage/NavTop'
import axios from "../axios/axios";
export default function HorseList() {
  let a=localStorage.getItem('type')

  const [data, setData] = useState([]);
  const navigate = useNavigate();
    useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/Login");
    }

    axios()
      .get("/api/"+a+"getUserHorses")
      .then((response) => {
        console.log(response)
        setData(response.data)
        
      })
      .catch((error) => {
        if(!error.response)
      return});

    

  }, []);



  const columns = [
    { field: "name", headerName: "name", width: 150 },
    { field: "roomId", headerName: "Room", width: 140 },
    { field: "birthday", headerName: "Birthday", width: 160 },
    { field: "gender", headerName: "gender", width: 150 },

  ];

  return (
    <div>

    <NavTop></NavTop>

  <div classname="divcont container" style={{boxShadow: "0px 0px 15px -10px rgba(0, 0, 0, 0.75)", marginLeft: "10%", height: 600, width: '80%' }}>

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
import "./productList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { productRows } from "./dummy-data";
import { useState,useEffect } from "react";
import { Link,useNavigate } from "react-router-dom";
import Navbar from "./Sidebar";
import axios from "../axios/axios";
export default function HorseList() {
  let a=localStorage.getItem('type')

  const [data, setData] = useState(productRows);
  const navigate = useNavigate();
    useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/Login");
    }

    axios()
      .get("/api/"+a+"horses")
      .then((response) => {
        console.log(response)
        setData(response.data)
        
      })
      .catch((error) => {
        if(!error.response)
      return});

    

  }, []);


  const handleDelete = (id) => {
    axios()
      .delete("/api/"+a+"horses/"+id)
      .then((response) => {
        if(response.status==200){
          setData(data.filter((item) => item.id !== id));

        }
        
      })
      .catch((error) => {
        if(!error.response)
      return});
  };

  const columns = [
    { field: "id", headerName: "ID", width: 150 },
    { field: "name", headerName: "name", width: 150 },
    { field: "roomId", headerName: "Room", width: 150 },
    {
      field: "owner",
      headerName: "owner",
      width: 150,
      renderCell: (params) => {
        return (
          <div>
        {params.row.owner?params.row.owner.email:""}
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
            <Link to={"/Horse/" + params.row.id}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div>

    <Navbar></Navbar>

  <div classname="divcont container" style={{boxShadow: "0px 0px 15px -10px rgba(0, 0, 0, 0.75)", marginLeft: "15%", height: 600, width: '75%' }}>
  <div className='row'>
        <div className='col-8'>

        </div>
        <div className='col2'>
        <Link to="/addHorse">
        <button class="bn54">
    <span class="bn54span">New Horse</span>
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
import { Container } from '@mui/material'
import React,{useState} from 'react'
import SideBar from './Sidebar'
import Tournamentlist from './Tournamentlist'
import UserList from './UserList'
import NewUser from './newTrainer'
import NewTournament from './newTournament'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Widget from './Widget'
import WidgetSml from './WidgetSml'
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { productRows } from "./dummy-data";
import { Link } from "react-router-dom";
import "./productList.css";

function Dashboard() {
  const [data, setData] = useState(productRows);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "product",
      headerName: "Product",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.img} alt="" />
            {params.row.name}
          </div>
        );
      },
    },
    { field: "stock", headerName: "Stock", width: 200 },
    {
      field: "status",
      headerName: "Status",
      width: 120,
    },
    {
      field: "price",
      headerName: "Price",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/Rooms"}>
              <button className="productListEdit">Check rooms</button>
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
    <React.Fragment>
    <SideBar

/>

<div className='container'> 
<div className='row'>

  <div className='col-1'>

  </div>
  <div className='col-10'>
  <Link to="/addStable">
        <button class="bn54">
    <span class="bn54span">New Stable</span>
  </button>
        </Link>
 

</div>

  <div className="productList" style={{boxShadow: "0px 0px 15px -10px rgba(0, 0, 0, 0.75)", marginLeft: "10%", height: 400, width: '95%' }}>

      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
      />
    </div>
</div>
  <div className='row' style={{marginTop:"10px"}} >
    <div className='col-1'>
      
    </div>
    <div  style={{display:"flex", marginTop:"10px"}} className='col-4'>
    <WidgetSml></WidgetSml>

    </div>
    <div className='col'>
    <Widget></Widget>
    </div>
  </div>
  <div className='row'>
    <div className='col-1'>
      
    </div>
    <div  style={{display:"flex"}} className='col-4'>
    <WidgetSml></WidgetSml>

    </div>
    <div className='col'>
    <Widget></Widget>
    </div>
  </div>
</div>
    </React.Fragment>

  
  )
}
export default Dashboard

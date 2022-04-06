import React from 'react'
import "./productList.css";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { productRows } from "./dummy-data";
import { Link } from "react-router-dom";
import { useState } from "react";
import Navbar from './Sidebar';
import "./newUser.css"
function Tournamentlist() {
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
      <div classname="divcont container" style={{ height: 400, width: '90%' }}>
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
     </div>
    );
}

export default Tournamentlist

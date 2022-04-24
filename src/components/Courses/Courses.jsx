import React, { useState ,useEffect}from 'react'
import NavTop from '../Homepage/NavTop'
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link,useNavigate } from "react-router-dom";
import "../Dashboard/btn.css"
import "../Dashboard/productList.css"
import { productRows } from "../Dashboard/dummy-data";
function Courses() {
    const [data, setData] = useState(productRows);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "product",
      headerName: "Tiltle",
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
    { field: "stock", headerName: "Start Date", width: 200 },
    {
      field: "status",
      headerName: "Etart Date",
      width: 120,
    },
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
                       <Link class="bn47" to={"/courses/"+"/id/" + params.row.id}>Enroll</Link>
           
           
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

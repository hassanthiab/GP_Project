import  * as React from 'react';
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { productRows } from "../Dashboard/dummy-data.js"
import { useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import NavTop from "../Homepage/NavTop";
export default function ProductList() {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
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
              <Button variant="outlined"  onClick={handleClickOpen}>Profile</Button>
          
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
                  <NavTop></NavTop>
          <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Show profile</DialogTitle>
        <DialogContent>
        <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email"
            type="email"
            fullWidth
            variant="standard"
            defaultValue="aaa@gmail.com"
            InputProps={{
                readOnly: true,
              }}
          />
                <TextField
            autoFocus
            margin="dense"
            id="Username"
            label="Username"
            type="text"
            fullWidth
            variant="standard"
            defaultValue="Hello World"
            InputProps={{
                readOnly: true,
              }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="phone"
            label="Phone"
            type="number"
            fullWidth
            variant="standard"
            defaultValue="12121"
            InputProps={{
                readOnly: true,
              }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
      <div classname="divcont container" style={{boxShadow: "0px 0px 15px -10px rgba(0, 0, 0, 0.75)", marginLeft: "10%", height: 600, width: '80%' }}>
  
      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}

      />


      </div>

      </React.Fragment>

  );
}
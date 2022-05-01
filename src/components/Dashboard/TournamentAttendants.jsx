import  * as React from 'react';
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { productRows } from "./dummy-data.js"
import { useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Navbar from "./Sidebar";
export default function Attendants() {
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
              <Button variant="outlined"  onClick={handleClickOpen}>Change Rank</Button>
          
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
                <Navbar>

                </Navbar>
          <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Enter ranking</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            error
            margin="dense"
            id="rank"
            label="Rank"
            type="number"
            fullWidth
            variant="standard"
            
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          {/*Make it so the Form disppears when the user enters a value between 1-8 AND not taken AND response 200 OTHERWISE error attribute is given (i gave it by default) */}
          <Button onClick={handleClose}>Confirm</Button>
        </DialogActions>
      </Dialog>
      <div classname="divcont container" style={{boxShadow: "0px 0px 15px -10px rgba(0, 0, 0, 0.75)", marginLeft: "15%", height: 600, width: '80%' }}>
  
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

import React,{useState} from 'react'
import SideBar from './Sidebar'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WidgetSml from './WidgetSml'
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { productRows } from "./dummy-data";
import { Link } from "react-router-dom";
import "./productList.css";
import { styled } from '@mui/material/styles';
import Chart from '../Charts/Chart'
import {userData} from "./dummy-data"
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

const Input = styled('input')({
  display: 'none',
});
function Dashboard() {
  const [data, setData] = useState(productRows);

//new
  const [page, setPage] = useState('');

  const handleChange = (event) => {
    setPage(event.target.value);
  };
//


  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  const [openn, setOpenn] = useState(false);

  const handleClickOpenn = () => {
    setOpenn(true);
  };

  const handleClosee = () => {
    setOpenn(false);
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
<Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add a Carousel Page</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            type="text"
            fullWidth
            variant="standard"
          />
              <TextField
            autoFocus
            margin="dense"
            multiline
            id="info"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
          />
          <label htmlFor="icon-button-file">
        <Input accept="image/*" id="icon-button-file" type="file" />
        <IconButton color="primary" aria-label="upload picture" component="span">
          <PhotoCamera />
        </IconButton>
      </label>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Create new</Button>
        </DialogActions>
        
      </Dialog>


      <Dialog open={openn} onClose={handleClosee}>
        <DialogTitle>Edit a Carousel Page</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            type="text"
            fullWidth
            variant="standard"
          />
              <TextField
            autoFocus
            multiline
            margin="dense"
            id="info"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
          />
            <InputLabel id="demo-select-small">Carousel</InputLabel>
      <Select
        labelId="demo-select-small"
        id="demo-select-small"
        value={page}
        label="page"
        onChange={handleChange}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value={1}>1</MenuItem>
        <MenuItem value={2}>2</MenuItem>
        <MenuItem value={3}>3</MenuItem>
      </Select>

          <label htmlFor="icon-button-file">
        <Input accept="image/*" id="icon-button-file" type="file" />
        <IconButton color="primary" aria-label="upload picture" component="span">
          <PhotoCamera />
        </IconButton>
      </label>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosee}>Cancel</Button>
          <Button onClick={handleClosee}>Create new</Button>
        </DialogActions>
        
      </Dialog>

<div className='container'> 
<div className='row'>
        <div className='col-8'>

        </div>
        <div className='col2'>
        <button class="bn54">
    <span class="bn54span" onClick={handleClickOpen}>New Carousel</span>
  </button>
  
        </div>

        <div className='col-2'>
        <button class="bn54">
    <span class="bn54span"  onClick={handleClickOpenn}>Edit Carousel</span>
  </button>
        </div>
      </div>
  <div className='row' style={{marginTop:"10px"}} >
    <div className='col-1'>
      
    </div>
    <div  style={{display:"flex", marginTop:"10px"}} className='col-4'>
    <WidgetSml></WidgetSml>

    </div>
    <div className='col'>
    <Chart data={userData} title="User Analytics" grid dataKey="Active User"/>
    </div>
  </div>
  <div className='row'>
    <div className='col-1'>
      
    </div>
    <div  style={{display:"flex"}} className='col-4'>
    <WidgetSml></WidgetSml>

    </div>
    <div className='col'>
    <Chart data={userData} title="User Analytics" grid dataKey="Active User"/>
    </div>
  </div>
</div>
    </React.Fragment>

  
  )
}
export default Dashboard

import React,{useState} from 'react'
import SideBar from './Sidebar'
import WidgetSml from './WidgetSml'
import { productRows } from "./dummy-data";
import "./productList.css";
import { styled } from '@mui/material/styles';
import Chart from '../Charts/Chart'
import BarChart from '../Charts/Bar'
import IncomeChart from '../Charts/incomeChart'
import {userData} from "./dummy-data"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import IconButton from '@mui/material/IconButton';
import axios from "../axios/axios";


const Input = styled('input')({
  display: 'none',
});
function Dashboard() {
  const [data, setData] = useState(productRows);

//new
  const [page, setPage] = useState('');

  const [image, setImage] = useState("");

  const [input, setInput] = useState({
    title:"",
    post:"",

  });

  const [errors, setErrors] = useState({
    title:"",
    post:"",
 

  });

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
  const imageHandler = (e) => {
    setImage(e.target.files[0])
  }
  const addPost=()=>{
  
    const formData = new FormData();
    formData.append('title',input['title']);
    formData.append('post',input['post']);
    formData.append('image',image);

              axios()
              .post("/api/admin/addPost/",formData)
              .then((response) => {
                if(response.status==200){
                  var myToastEl = document.getElementById('myToastEl1')
                  var myToast = bootstrap.Toast.getOrCreateInstance(myToastEl) // Returns a Bootstrap toast instance
                  var myToastEl = document.getElementById('toast-body')
                  myToastEl.innerHTML="New post has been posted";
                  myToast.show()
                  setErrors({
                    title:"",
                    post:"",
               
                  });
                  setInput({
                    title:"",
                    post:"",
               
                  });
                  setImage()
             
                }
                
              })
              .catch((error) => {
          
                if (!error.response) return;
                let Reserrors = error.response.data.errors;
          
                let stateErrrors = { ...errors };
              if(!Reserrors) return;
                Object.keys(errors).forEach((element) => {
                  if (Object.keys(Reserrors).includes(element)) {
                    stateErrrors[element] = Reserrors[element];
                  } else {
                    stateErrrors[element] = "";
                  }
                });
          
                setErrors(stateErrrors);
                setImage()
            });
  }

  const handleClose = () => {
    setImage()
    setOpen(false);
    setErrors({
      title:"",
      post:"",
 
    });
    setInput({
      title:"",
      post:"",
 
    });
  };
  let changed = (event, inputId) => {

    let Sinput = { ...input };
    Sinput[inputId] = event.target.value;
    setInput(Sinput);

  
  };
  // const [openn, setOpenn] = useState(false);

  // const handleClickOpenn = () => {
  //   setOpenn(true);
  // };

  // const handleClosee = () => {
  //   setOpenn(false);
  // };

  return (
    <React.Fragment>
    <SideBar

/>
<Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add a new post</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            type="text"
            fullWidth
            variant="standard"
            value={input['title']}
            onChange={(event) => changed(event,"title")}
          />
          <label style={{ color: "#960000", fontWeight: "bold" }}>
                    {errors["title"]}
                  </label>
              <TextField
            autoFocus
            margin="dense"
            multiline
            id="info"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
            value={input['post']}
            onChange={(event) => changed(event,"post")}
          />
          <label style={{ color: "#960000", fontWeight: "bold" }}>
                    {errors["post"]}
                  </label>
                  <br/>
          <label htmlFor="icon-button-file">
        <Input accept="image/*" id="icon-button-file" type="file"  onChange={imageHandler}/>
        <IconButton color="primary" aria-label="upload picture" component="span">
          <PhotoCamera />
        </IconButton>
      </label>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={addPost}>Create new</Button>
        </DialogActions>
        
      </Dialog>


  

<div className='container'> 

<div className='row' style={{marginTop:'10px'}}>
        <div className='col-md-4'>

        </div>
        <div className='col-md-4' >
        <button  onClick={handleClickOpen} class="bn54" style={{marginLeft:'30%'}}>
    <span class="bn54span">New Post</span>
  </button>
 
        </div>
        <div className='col-md-4'>
        </div>

     
      </div>


      <div className='row' >
      <div   className='col-md-6' style={{marginTop:"100px"}}>
 
      <WidgetSml/>
 </div>
    {/* <div   className='col-md-1'>
 
   
    </div> */}
    <div   className='col-md-6' style={{marginTop:"100px"}}>
    
    <IncomeChart/>
    </div>
 
    
  </div>

  <div className='row'  style={{marginTop:"100px"}}>
    <div className='col-md-6'>
    <BarChart />
    </div>
   
    <div className='col-md-6'>
    <Chart data={userData} title="User Analytics" grid dataKey="Active User"/>
    </div>
  
  </div>
</div>
    </React.Fragment>

  
  )
}
export default Dashboard

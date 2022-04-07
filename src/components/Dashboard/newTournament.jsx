import styled from 'styled-components'
import SideBar from './Sidebar'
import { FormControlLabel,Checkbox,FormGroup} from '@mui/material'
import FancyInput from '../Login/Input'
import FancyButton from '../Login/Button' 
import { blue } from '@mui/material/colors'
import React,{ useState } from 'react'
import { Button} from '@material-ui/core'
import axios from "../axios/axios";

const Input = styled('input')({
    display: 'none',
  });
  
function NewTournament() {
  const a = localStorage.getItem("type");
  const [cat, setCat] = useState([]);
  const [profilePic, setPic] = useState("");

  const [input, setInput] = useState({
    name:"",
    club:"",
    email:"",
    size:"",
    location:"",
    description:"",
    date:"",
    image:"",
    private:"",

  });

  const [errors, setErrors] = useState({
    name:"",
    club:"",
    email:"",
    size:"",
    location:"",
    description:"",
    date:"",
    image:"",
    private:"",

  });



  let add=()=>{
    const formData = new FormData();
    formData.append('name',input['name']);
    formData.append('club',input['club']);
    formData.append('email',input['email']);
    formData.append('size',input['size']);
    formData.append('location',input['location']);
    formData.append('description',input['description']);
    formData.append('date',input['date']);
    formData.append('image',profilePic);
    formData.append('private',input['private']);
            for (let i = 0; i < cat.length; i++) 
              formData.append('cat[]', cat[i]);


    axios()
    .post("/api/addTournament",formData)
    .then((response) => {
      if(response.status==200){
        
      }
      
    })
    .catch((error) => {
      if(!error.response)
    return});
  }
  let changed = (event, inputId) => {
    if(inputId=="cat"){
      let Newcat=[...cat]
      Newcat.includes(event.target.value)?
      Newcat=Newcat.filter((item) => item != event.target.value):
      Newcat.push(event.target.value)
      setCat(Newcat)
    
    }
    
  else{
    let Sinput = { ...input };
    Sinput[inputId] = event.target.value;
    setInput(Sinput);
    console.log(event.target.value)
  }
  };
    const [profileimage, setImage] = useState('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png');
    const imageHandler = (e) => {
      setPic(e.target.files[0])
        const reader = new FileReader();
        reader.onload = () =>{
          if(reader.readyState === 2){
            setImage(reader.result)
          }
        };
        reader.readAsDataURL(e.target.files[0])
    }
  return (
    <div>
      <React.Fragment>
      <SideBar

        />
  
    <div className="newUser divcont container">
        <div class="container">


    <div class="row">
        <div class="col-2" />
        <div class="col-12">
        <h1 className="newUserTitle">New Tournament</h1>
    
    <form className="newUserForm">
      <div className="newUserItem">
        <label>Tournament Name</label>
        <FancyInput onChange={(event) => changed(event,"name")} type="text" placeholder="Name" />
      </div>
      <div className="newUserItem">
        <label>Club</label>
        <FancyInput onChange={(event) => changed(event,"club")} type="text" placeholder="Club" />
      </div>
      <div className="newUserItem">
        <label>Email</label>
        <FancyInput onChange={(event) => changed(event,"email")} type="text" placeholder="Email" />
      </div>
      <div className="newUserItem">
        <label>Size</label>
        <FancyInput onChange={(event) => changed(event,"size")} type="text" placeholder="Size" />
      </div>
      <div className="newUserItem">
        <label>Location</label>
        <FancyInput onChange={(event) => changed(event,"location")} type="text" placeholder="Location" />
      </div>
      <div className="newUserItem">
        <label>Description</label>
        <FancyInput onChange={(event) => changed(event,"description")} type="text" placeholder="Description" />
      </div>
  
      <div className="newUserItem">
        <label>Date</label>
        <FancyInput onChange={(event) => changed(event,"date")} type="text" placeholder="Date" />
      </div>
      <div className="newUserItem">
        <label>Private</label>
        <FancyInput onChange={(event) => changed(event,"private")} type="text" placeholder="Private" />
      </div>
      
      <div className="newUserItem">
        <label>Categoary</label>
        <FormGroup row>
        <FormControlLabel value={'60'} onChange={(event) => changed(event,"cat")}  control={<Checkbox     sx={{
          color: blue[1200],
          '&.Mui-checked': {
            color: blue[600],
          },
        }}/>} label="60" />
        <FormControlLabel value={'80'} onChange={(event) => changed(event,"cat")} control={<Checkbox      sx={{
          color: blue[1200],
          '&.Mui-checked': {
            color: blue[600],
          },
        }}/>} label="80" />
          <FormControlLabel value={'90'} onChange={(event) => changed(event,"cat")} control={<Checkbox      sx={{
          color: blue[1200],
          '&.Mui-checked': {
            color: blue[600],
          },
        }}/>} label="90" />
        <FormControlLabel value={'100'} onChange={(event) => changed(event,"cat")} control={<Checkbox      sx={{
          color: blue[1200],
          '&.Mui-checked': {
            color: blue[600],
          },
        }}/>} label="100" />
          <FormControlLabel value={'110'} onChange={(event) => changed(event,"cat")} control={<Checkbox     sx={{
          color: blue[1200],
          '&.Mui-checked': {
            color: blue[600],
          },
        }}/>} label="110" />
          <FormControlLabel value={'120'} onChange={(event) => changed(event,"cat")} control={<Checkbox     sx={{
          color: blue[1200],
          '&.Mui-checked': {
            color: blue[600],
          },
        }}/>} label="120" />
          <FormControlLabel value={'150'} onChange={(event) => changed(event,"cat")} control={<Checkbox     sx={{
          color: blue[1200],
          '&.Mui-checked': {
            color: blue[600],
          },
        }}/>} label="150" />
        </FormGroup>
      </div>
      <div className="newUserItem">
      <label>Picture</label>
        <div class="row  "  >
              <div class="col-md-4" >
              <div
                className="img-holder"
                style={{ marginTop: 30, marginLeft: "40%" }}
              >
                <img src={profileimage} alt="" id="img" className="img" />
                </div>
      <label htmlFor="contained-button-file">

      <Input
                      accept="image/*"
                      id="contained-button-file"
                      multiple
                      type="file"
                      onChange={imageHandler}
                    />
        <Button variant="contained" component="span">
          Upload
         </Button>
        </label>
                </div>
              <div class="col-md-4">
    
          
                </div>

                </div>        
                </div>
      <div className='col-4'>

      </div>

      <div className='col-5'>
      <Button onClick={add} variant="contained" component="span" name="Confirm">Confirm</Button>
      {/* <FancyButton onClick={add} nameButton="Confirm">dsf</FancyButton> */}
          </div>

      <div className='col-4'>
          
          </div>
    </form>
        </div>
              
              </div>
              </div>
  
  </div>
  </React.Fragment>
    </div>
  )
}

export default NewTournament

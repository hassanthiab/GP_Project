import styled from 'styled-components'

import { FormControlLabel,Checkbox,FormGroup} from '@mui/material'
import FancyInput from '../Login/Input'
import FancyButton from '../Login/Button' 
import { blue } from '@mui/material/colors'
import React,{ useState ,useEffect} from 'react'
import { Button} from '@material-ui/core'
import axios from "../axios/axios";
import {useParams,useNavigate} from "react-router-dom";
import Pagetop from '../Homepage/Pagetop.jsx';
import Navbar from './Sidebar';

const Input = styled('input')({
    display: 'none',
  });
  
function NewTournament() {
  let { id } = useParams();
  const a = localStorage.getItem("type");
  const [cat, setCat] = useState([]);
  const [guicat, setGuicat] = useState([60,80,90,100,110,120,150]);
  const [edited, setEdited] = useState(false);

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
    private:false,
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
    category:"",

  });


  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/Login");
    }

    axios()
      .get("/api/tournaments/"+id)
      .then((response) => {
        let stateInput = { ...input };
        stateInput["name"] = response.data["name"];
        stateInput["club"] = response.data["club"];
        stateInput["email"] = response.data["email"];
        stateInput["size"] = response.data["size"];
        stateInput["location"] = response.data["location"];
        stateInput["description"] = response.data["description"];
        stateInput["date"] = response.data["date"];
        stateInput["image"] = response.data["image"];
        stateInput["private"] = response.data["private"];
       let c= response.data["categories"]
       let a=[]
        for(let i=0;i<c.length;i++)
        a.push(c[i].category+"")
        setCat(a);
        setImage(response.data['image']?`http://${process.env.REACT_APP_HOST_BACKEND}:8000/storage/${response.data['image']}`:`http://${process.env.REACT_APP_HOST_BACKEND}:8000/storage/bpp.webp`)
        setInput(stateInput);
       


      })
      .catch((error) => {});
      

  }, []);

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
              formData.append('category[]', cat[i]);


    axios()
    .post("/api/editTournaments/"+id,formData)
    .then((response) => {
      if(response.status==200){
        var myToastEl = document.getElementById('myToastEl1')
        var myToast = bootstrap.Toast.getOrCreateInstance(myToastEl) // Returns a Bootstrap toast instance
        var myToastEl = document.getElementById('toast-body')
        myToastEl.innerHTML="the Tournament has been updated";
        myToast.show()
        setErrors({
          name:"",
          club:"",
          email:"",
          size:"",
          location:"",
          description:"",
          date:"",
          image:"",
          private:"",
          category:"",
        });
   
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
  
  });
  }
  let changed = (event, inputId) => {
   
    if(inputId=="category"){
      let Newcat=[...cat]
      Newcat.includes(event.target.value)?
      Newcat=Newcat.filter((item) => item !=event.target.value):
      Newcat.push(event.target.value)
      setCat(Newcat)
      console.log(Newcat)
  
    }
    else if(inputId=="private"){
      let Sinput = { ...input };
      Sinput[inputId] =!Sinput[inputId];
      setInput(Sinput);
      console.log(Sinput[inputId])
    }
  else{
    let Sinput = { ...input };
    Sinput[inputId] = event.target.value;
    setInput(Sinput);
    console.log(event.target.value)
  }
  };

  let checkboxes=[]


guicat.forEach((e,index)=>{

 checkboxes.push( <FormControlLabel key={index}   control={<Checkbox value={e}  onChange={(event) => changed(event,"category")} key={index} checked={cat.includes(e+"")?true:false}     sx={{
   color: blue[1200],
   '&.Mui-checked': {
     color: blue[600],
   },
 }}/>}  label={e}  />)

})
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
      <Navbar/>
  
    <div className="newUser divcont container">
        <div class="container">


    <div class="row">
        <div class="col-2" />
        <div class="col-12">
        <h1 className="newUserTitle">Edit Tournament</h1>
  
    <form className="newUserForm">
      <div className="newUserItem">
        <label>Tournament Name</label>
        <FancyInput value={input["name"]}  onChange={(event) => changed(event,"name")} type="text" placeholder="Name"   bordercolor={errors["name"] ? "#960000" : "white"}/>
        <label style={{ color: "#960000", fontWeight: "bold" }}>
                    {errors["name"][0]}
                  </label>
      </div>
      <div className="newUserItem">
        <label>Club</label>
        <FancyInput value={input["club"]}  onChange={(event) => changed(event,"club")} type="text" placeholder="Club"  bordercolor={errors["club"] ? "#960000" : "white"} />
        <label style={{ color: "#960000", fontWeight: "bold" }}>
                    {errors["club"][0]}
                  </label>
      </div>
      <div className="newUserItem">
        <label>Email</label>
        <FancyInput value={input["email"]}  onChange={(event) => changed(event,"email")} type="text" placeholder="Email"  bordercolor={errors["email"] ? "#960000" : "white"}/>
        <label style={{ color: "#960000", fontWeight: "bold" }}>
                    {errors["email"][0]}
                  </label>
      </div>
      <div className="newUserItem">
        <label>Size</label>
        <FancyInput value={input["size"]}  onChange={(event) => changed(event,"size")} type="text" placeholder="Size"  bordercolor={errors["size"] ? "#960000" : "white"}/>
        <label style={{ color: "#960000", fontWeight: "bold" }}>
                    {errors["size"][0]}
                  </label>
      </div>
      <div className="newUserItem">
        <label>Location</label>
        <FancyInput value={input["location"]} onChange={(event) => changed(event,"location")} type="text" placeholder="Location"  bordercolor={errors["location"] ? "#960000" : "white"}/>
        <label style={{ color: "#960000", fontWeight: "bold" }}>
                    {errors["location"][0]}
                  </label>
      </div>
      <div className="newUserItem">
        <label>Description</label>
        <FancyInput value={input["description"]} onChange={(event) => changed(event,"description")} type="text" placeholder="Description" bordercolor={errors["description"] ? "#960000" : "white"}/>
        <label style={{ color: "#960000", fontWeight: "bold" }}>
                    {errors["description"][0]}
                  </label>
      </div>
  
      <div className="newUserItem">
        <label htmlFor="startDate">Date</label>
        <input
        value={input["date"]}
          type="date"
          className="form-control"
          id="startDate"
          onChange={(event) => changed(event,"date")} 
          bordercolor={errors["date"] ? "#960000" : "white"}
        />
        <label style={{ color: "#960000", fontWeight: "bold" }}>
                    {errors["date"][0]}
                  </label>
      </div>
      <div className="newUserItem">
      <label>Private</label>
      <FormControlLabel  value={'true'} onChange={(event) => changed(event,"private")}  control={<Checkbox checked={input["private"]?true:false}   sx={{
          color: blue[1200],
          '&.Mui-checked': {
            color: blue[600],
            
          },
         
        }}
     
        />} label="Private" />
        <label style={{ color: "#960000", fontWeight: "bold" }}>
                    {errors["private"][0]}
                  </label>
      </div>
      
      <div className="newUserItem">
        <label>Categoary</label>
        <FormGroup row>
        {checkboxes}
        </FormGroup>
        <label style={{ color: "#960000", fontWeight: "bold" }}>
                    {errors["category"][0]}
                  </label>
      </div>
      <div className="newUserItem">
      <label>Picture</label>
      <label style={{ color: "#960000", fontWeight: "bold" }}>
                    {errors["image"][0]}
                  </label>
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
             
    
    </form>
        </div>
              
              </div>
              <div class="row  "  >
               <div className='col-4'>

      </div>

      <div className='col-4'>
      {/* <Button onClick={add} variant="contained" component="span" name="Confirm">Confirm</Button> */}
            <FancyButton onClick={add} nameButton="Confirm"></FancyButton>

          </div>

      <div className='col-4'>
          
          </div>
          </div>
              </div>

  
  </div>

  </React.Fragment>
    </div>
  )
}

export default NewTournament

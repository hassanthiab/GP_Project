import styled from 'styled-components'
import SideBar from './Sidebar'
import { FormControl, FormLabel, RadioGroup, FormControlLabel,Radio,Checkbox,FormGroup} from '@mui/material'
import FancyInput from '../Login/Input'
import FancyButton from '../Login/Button' 
import { blue } from '@mui/material/colors'
import React,{ useState } from 'react'
import { Button, Stack} from '@material-ui/core'

const Input = styled('input')({
    display: 'none',
  });
  
function NewTournament() {

    const [profileimage, setImage] = useState('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png');
    const imageHandler = (e) => {
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
        <FancyInput type="text" placeholder="Name" />
      </div>
      <div className="newUserItem">
        <label>Email</label>
        <FancyInput type="text" placeholder="Email" />
      </div>
      <div className="newUserItem">
        <label>Location</label>
        <FormControl>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        <FormControlLabel value="Nablus" control={<Radio />} label="Nablus" />
        <FormControlLabel value="Khalil" control={<Radio />} label="Khalil" />
        <FormControlLabel value="Ramallah" control={<Radio />} label="Ramallah" />
      </RadioGroup>
    </FormControl>
      </div>
      <div className="newUserItem">
        <label>Street</label>
        <FancyInput type="text" placeholder="Rafidia" />
      </div>
      <div className="newUserItem">
        <label>Categoary</label>
        <FormGroup row>
        <FormControlLabel control={<Checkbox     sx={{
          color: blue[1200],
          '&.Mui-checked': {
            color: blue[600],
          },
        }}/>} label="Label" />
        <FormControlLabel control={<Checkbox      sx={{
          color: blue[1200],
          '&.Mui-checked': {
            color: blue[600],
          },
        }}/>} label="Label2" />
        <FormControlLabel control={<Checkbox      sx={{
          color: blue[1200],
          '&.Mui-checked': {
            color: blue[600],
          },
        }}/>} label="Label3" />
        </FormGroup>
      </div>
      <div className="newUserItem">
      <label>Categoary</label>
        <div class="row  "  >
              <div class="col-md-4" >
      <label htmlFor="contained-button-file">

        <Input accept="image/*" id="contained-button-file" multiple type="file" />
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
      <FancyButton nameButton="Confirm"></FancyButton>
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

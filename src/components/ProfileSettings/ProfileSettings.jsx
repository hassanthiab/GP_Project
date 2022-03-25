import { useState } from 'react'
import React from 'react'
import "./Bottom.css"
import { Button, ButtonBase, Slide } from '@material-ui/core'
import styled from 'styled-components'
import ProfileInput from './ProfileInput'
import TwoFALogin from '../twoFactorAuth/twoFALogin'
import TwoFA from '../twoFactorAuth/twoFA'

const Input = styled('input')({
    display: 'none',
  });
  
const Buttons = styled.div`
    display:flex ;
    flex-direction:column ;
    height: 20% ;
    justify-content: space-around;
    align-items: center ;
    margin: 2rem 0 2rem 0 ;
    width:100% ;
`;

function ProfileSettings() {
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
    <body  style={{backgroundColor:"#101522"}} className="Login">
        <Slide in="true" direction='left'>
        <div class="container">
            <div class="row  justify-content-center container">
            <div class="col-4">
                
                </div>
              <div class="col-6">
              <div className="img-holder">
						<img src={profileimage} alt="" id="img" className="img" />
					</div>
              <label htmlFor="contained-button-file">
                <Input accept="image/*" id="contained-button-file" multiple type="file" onChange={imageHandler}/>
                <Button variant="contained" component="span">
                Upload
                </Button>
                </label>
                
              </div>
              <div class="col-6">
                </div>
            </div>
            <ProfileInput input_label="Username" type="Text" placeholder="Change Username"></ProfileInput>
            
            <ProfileInput input_label="Email"  type="Text" placeholder="Change Email"></ProfileInput>
            
            <ProfileInput input_label="Password" type="Password" placeholder="Change Password"></ProfileInput>
            
            <ProfileInput input_label="Number" type="Number" placeholder="Add PhoneNumber"></ProfileInput>
          
            <TwoFA></TwoFA>
        </div>
        </Slide>
    

    </body>
  
  )
}

export default ProfileSettings

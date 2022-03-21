
import React from 'react'
import Container from '../Login/ContainerBox'
import "./Bottom.css"
import Button from '../Login/Button'
import Input from '../Login/Input'
import styled from 'styled-components'

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
  return (
    <body  style={{backgroundColor:"#101522"}} class="Login">

        <Container size="90vh" wide="70vw">

        <h1 style={{marginBottom:"64px", marginTop:"24px"}}>Change your Profile Settings.</h1>
        <div class="container">
            
            
            <Input input_label="Username" type="Text" placeholder="Change Username"></Input>
            
            <Input input_label="Email"  type="Text" placeholder="Change Email"></Input>
            
            <Input input_label="Password" type="Password" placeholder="Password"></Input>
            
            <Input input_label="Number" type="Number" placeholder="Add PhoneNumber"></Input>
        
            <Buttons>
                <div class="container">
     <div class="row">
    <div class="col-md-1">
        </div>
    <div class="col-md-10">
    <Button  nameButton='Change Password'></Button>
     </div>
    <div class="col-md-1">
    </div>
     </div>
     <div class="row">
    <div class="col-md-1">
        </div>
    <div class="col-md-10">
    <Button  nameButton='Confirm Changes'></Button>
     </div>
    <div class="col-md-1">
    </div>
     </div>
        </div>
            </Buttons>
            
        </div>
        </Container>
    </body>
  
  )
}

export default ProfileSettings

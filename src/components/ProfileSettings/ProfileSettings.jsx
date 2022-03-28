import { useState,useEffect } from 'react'
import React from 'react'
import "./Bottom.css"
import { Button, Slide } from '@material-ui/core'
import styled from 'styled-components'
import InputP from './Input'
import ButtonP from './Button'
import TwoFA from '../twoFactorAuth/twoFA'
import { useNavigate} from 'react-router-dom'
import axios from '../axios/axios';

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



   
let ProfileSettings=()=>{

  const [twoFA, setTwoFA] = useState(false);
  const [input, setInput] = useState({
    name:"",
    email:"",
    username:"",
    PhoneNumber:"",
    current_password:"",
    password:"",
    password_confirmation:"",
    
    });

    const [errors, setErrors] = useState({
      name:"",
      email:"",
      username:"",
      PhoneNumber:"",
      current_password:"",
      password:"",
      password_confirmation:"",
    });

    const navigate=useNavigate()


    useEffect(() => {
      if(!localStorage.getItem('token')){
        navigate('/Login')
      }
    
      axios().get("/api/user").then(response=> {
       let stateInput={...input}
       stateInput['name']=response.data['name']
       stateInput['email']=response.data['email']
      
       response.data['two_factor_secret']? setTwoFA(true):setTwoFA(false)

       console.log( response.data['two_factor_secret'])
        console.log(twoFA)

        setInput(stateInput)
      }).catch(error=>{})
    

      
     }, []);

    const [profileimage, setImage] = useState('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png');
   
    let updateUserInfo=()=>{
      axios().put("/api/user/profile-information",{
        "name":input['name'],
        "email":input['email'],
  
  }).then(response=> {
    if(response.status==200){

        setErrors({
          name:"",
          email:"",
          username:"",
          PhoneNumber:"",
          current_password:"",
          password:"",
          password_confirmation:"",
        })
      
      
  }

    
  
  })
  .catch(error=> {   
    
    if(!error.response) return
    let Reserrors=error.response.data.errors
    
   
   let stateErrrors={...errors}
   
   Object.keys(errors).forEach(element=>{
    if(Object.keys(Reserrors).includes(element)){
        stateErrrors[element]=Reserrors[element]
    }else{
        stateErrrors[element]=""
    }
     
   })
  
   setErrors(stateErrrors)
  })
      
  
    }

    let updateUserPass=()=>{
      
      axios().put("/api/user/password",{
        "current_password":input['current_password'],
        "password":input['password'],
        "password_confirmation": input['password_confirmation'],
  
  }).then(response=> {
    if(response.status==200){
   

        setErrors({
          name:"",
          email:"",
          username:"",
          PhoneNumber:"",
          current_password:"",
          password:"",
          password_confirmation:"",
        })
      
      
  }

    
  
  })
  .catch(error=> {   
    
    if(!error.response) return
    let Reserrors=error.response.data.errors
    
   
   let stateErrrors={...errors}
   
   Object.keys(errors).forEach(element=>{
    if(Object.keys(Reserrors).includes(element)){
        stateErrrors[element]=Reserrors[element]
    }else{
        stateErrrors[element]=""
    }
     
   })
  
   setErrors(stateErrrors)
  })
      
  
    }
   
    let changed=(event,inputId)=>{
    console.log(event.target.value)
      let Sinput={...input}
      Sinput[inputId]=event.target.value
      setInput(Sinput)
      
         
   }
   
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
    <body  style={{backgroundColor:"#101522"}}  >
        <Slide in="true" direction='left'>
        <div class="container">
            <div class="row  justify-content-center "  >
            <div class="col-md-4 ">
                
                </div>
              <div class="col-md-4" >
              <div className="img-holder" style={{marginTop:30,marginLeft:'38%'}}>
						<img src={profileimage} alt="" id="img" className="img" />
					</div>
              <label style={{marginTop:12,marginLeft:'38%'}} htmlFor="contained-button-file">
                <Input accept="image/*" id="contained-button-file" multiple type="file" onChange={imageHandler}/>
                <Button  variant="contained" component="span">
                Upload
                </Button>
                </label>
                
              </div>
              <div class="col-md-4">
    
          
                </div>

                <div class="row justify-content-center " style={{marginTop:50}}>
                  
                   <div class="col-md-6">
                   <InputP onChange={(event)=>changed(event,"name")}  input_label="name" type="Text" placeholder="Change name" value={input['name']}/>
                   </div>  
                   <div class="col-md-6">
                   <InputP onChange={(event)=>changed(event,"username")}   input_label="username"  type="Text" placeholder="Change username"/>
                   </div>

                   </div>

                <div class="row justify-content-center ">
                  
                  <div class="col-md-6">
                  <InputP onChange={(event)=>changed(event,"email")} input_label="email" type="email" placeholder="Change email" value={input['email']}/>
                  </div>  
                  <div class="col-md-6">
                  <InputP onChange={(event)=>changed(event,"PhoneNumber")} input_label="Number" type="Number" placeholder="Add PhoneNumber"/>
                  </div>  

                  </div>

        <div class="row justify-content-center ">
                  
                  <div class="col-md-6">
                  </div>  
                  <div class="col-md-6">
                  <ButtonP onClick={updateUserInfo} placeholder="Save Profile"/>
                  </div>  
                  
                  </div>

                       <div class="row justify-content-center " style={{marginTop:30}}>
                  
                   <div class="col-md-6">
                   <InputP onChange={(event)=>changed(event,"current_password")} input_label="current password" type="Password" placeholder="current password"/>
                   </div>  
                   <div class="col-md-6">
                   <InputP  onChange={(event)=>changed(event,"password")}  input_label="New Password" type="Password" placeholder="New Password"/>
                   </div>
                     
                      </div>

                      <div class="row justify-content-center ">
                  
                  <div class="col-md-6">
                  <InputP onChange={(event)=>changed(event,"password_confirmation")}  input_label="Confirm New Password" type="Password" placeholder="Confirm New Password"/>
                  </div>  
                  <div class="col-md-6">
                  <ButtonP onClick={updateUserPass}  placeholder="Change Password"/>

                  </div>  

                  </div>
               
                  <label  style={{color:' #960000 ' ,fontWeight:'bold'}}>{errors['current_password']?errors['current_password'][0]:errors['password']?errors['password'][0]:""}</label>

                
             
            </div>
            <TwoFA key={twoFA} twoFA={twoFA}></TwoFA>
       
        </div>
        </Slide>
    

    </body>

  )
}

export default ProfileSettings

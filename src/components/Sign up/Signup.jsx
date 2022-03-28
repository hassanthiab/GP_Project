import styled from 'styled-components';
import React,{useState} from 'react';
import '../Login/LoginStyle.css';
import FancyInput from "../Login/Input"
import FancyButton from "../Login/Button"
import axios from '../axios/axios';
import { Slide } from '@material-ui/core';
import {useNavigate} from "react-router-dom";
import Container from '../Login/ContainerBox';

const Title = styled.h2`
margin: 3rem 0 2rem 0 ;

`;



const InputText = styled.div`
margin: 4rem 0 1rem 0 ;
display:flex ;
flex-direction:column ;
justify-content: space-around;
align-items: center ;
height: 20% ;
width: 100% ;
`;

const Buttons = styled.div`
    display:flex ;
    flex-direction:column ;
    height: 20% ;
    justify-content: space-around;
    align-items: center ;
    margin: 2rem 0 2rem 0 ;
    width:100% ;
`;

let Signup=()=>{
    
     const navigate =useNavigate();
    const [input, setInput] = useState({
        name:"",
        email:"",
        password:"",
        password_confirmation:"",
        
        });

        const [errors, setErrors] = useState({
            name:"",
            email:"",
            password:"",
        });
        
       
   
  
       
                
        let registerReq=()=>{
     
         
            axios().post("/api/register",{
                "name":input['name'],
            "email":input['email'],
            "password":input['password'],
           "password_confirmation":input['password_confirmation'],
           "device_name":'android',
        
        }).then(response=> {
            if(response.status==201){
                localStorage.setItem('token',response.data.token)
                setInput({
                    name:"",
                    email:"",
                    password:"",
                    password_confirmation:"",
                    
                    })

                    setErrors({
                        name:"",
                        email:"",
                        password:"", 
                    })
                    navigate('/verification')
                 
                
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

           let Sinput={...input}
           Sinput[inputId]=event.target.value
           setInput(Sinput)
           
              
        }

      
        
    return (
    
        <body className="Login">
            <Slide direction='up' in="true">
            <Container size="80vh"  wide="40vw">   
            <Title>Signup</Title>
            <InputText>
            <FancyInput bordercolor={errors['name']? '#960000':'white'}  onChange={(event)=>changed(event,"name")} type="text" name="name" placeholder='Name'>{input['name']}</FancyInput>
            <label style={{color:'#960000' ,fontWeight:'bold'}}>{errors['name'][0]}</label>
            <FancyInput bordercolor={errors['email']? '#960000':'white'}  onChange={(event)=>changed(event,"email")} type="email" placeholder='Email'>{input['email']}</FancyInput>
            <label style={{color:'#960000' ,fontWeight:'bold'}}>{errors['email'][0]}</label>
            <FancyInput bordercolor={errors['password']? '#960000':'white'}   onChange={(event)=>changed(event,"password")} type="password" name="password" placeholder='Password'>{input['password']}</FancyInput>
            <FancyInput bordercolor={errors['password']=="The password confirmation does not match."? '#960000':'white'} onChange={(event)=>changed(event,"password_confirmation")} type="password" name="password_confirmation" placeholder='Confirm Password'>{input['password_confirmation']}</FancyInput>
            <label style={{color:'#960000' ,fontWeight:'bold'}}>{errors['password'][0]}</label>
            </InputText>
            <Buttons>
                <div class="container">
     <div class="row">
    <div class="col-md-1">
        </div>
    <div class="col-md-10">
    <FancyButton onClick={registerReq} nameButton='Sign up'></FancyButton>
     </div>
    <div class="col-md-1">
    </div>
     </div>
        </div>
            </Buttons>
            
        </Container>
        

            </Slide>
 
        </body>
    
         );

}


export default Signup;
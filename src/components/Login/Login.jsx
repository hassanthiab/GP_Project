import styled from 'styled-components';
import React from 'react';
import './LoginStyle.css';
import FancyInput from "./Input"
import FancyButton from "./Button"
import axios from '../axios/axios';
import { Component } from 'react/cjs/react.production.min';
import { Link, Navigate } from 'react-router-dom';
import Container from './ContainerBox';
import { Slide } from '@material-ui/core';
import {useState} from 'react'

let a=""
const Title = styled.h2`
margin: 3rem 0 2rem 0 ;

`;

const ClickableText = styled.h3`
margin: 1rem 0 2rem 0 ;
cursor: pointer;
color:white;
font-size:small;

`;

const InputText = styled.div`
display:flex ;
margin: 1rem 0 2rem 0 ;
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
    margin: 1rem 0 2rem 0 ;
    width:100% ;
`;

let Login=()=>{

    const [input, setInput] = useState({
        email:"",
        password:"",
        
        });

        const [errors, setErrors] = useState({
            email:"",
            password:"",
        });
        const [message, setMessage] = useState("");
        const [navigate, setNavigate] = useState(false);
   
        let loginReq = () => {
            
   
           axios().get("/sanctum/csrf-cookie").then(
                axios().post("/api/login",{    
                    "email":input['email'],
                    "password":input['password'],  
           
            }).then(response=> {
           
               if(response.status==200)
               {
                console.log(response.data.two_factor)
               response.data.two_factor? a=<Navigate to={'/FAcode'}/>:
                a=<Navigate to={'/twoFA'}/>
                console.log(a.props)
                   setInput(
                        {
                        email:"",
                        password:"",
                        }
                        )

                        setErrors({
                            email:"",
                            password:"",
                        }) 
                
                       
                        setMessage("")

                        setNavigate(true)
                  
               
                }

              })
              .catch(error=> {
             
                if(error.response.data.message=='These credentials do not match our records.')
                {
                  
                      axios().post("api/admin/login",{    
                            "email":input['email'],
                            "password":input['password'],  
                   
                    }).then(response=> {
           
                        if(response.status==200)
                        {
                         console.log(response.data.two_factor)
                        response.data.two_factor? a=<Navigate to={'/FAcode'}/>:
                         a=<Navigate to={'/twoFA'}/>
                         console.log(a.props)
                         setInput(
                            {
                            email:"",
                            password:"",
                            }
                            )
    
                            setErrors({
                                email:"",
                                password:"",
                            }) 
                    
                           
                            setMessage("")
    
                            setNavigate(true)
                           
                            
                        
                         }
                       }).catch(error=>{
                        let resErrors=error.response.data.errors
            
              
                        let stateErrrors={...errors}
                        if(resErrors){
                        
                        stateErrrors['email']=resErrors.email
                        stateErrrors['password']=""
                   
                        setErrors(stateErrrors) 
                         setMessage("")
                        
                     }
                        else
                        {
                            setErrors({
                                email:"",
                                password:"",
                            })
                            setMessage(error.response.data.message)
                         
                        }
                        
                       })
                    
                }
else{
                let resErrors=error.response.data.errors
            

                let stateErrrors={...errors}
                if(resErrors){
                 Object.keys(errors).forEach(element=>{
                     if(Object.keys(resErrors).includes(element)){
                         stateErrrors[element]=resErrors[element]
                     }else{
                         stateErrrors[element]=""
                     }
                      
                    })

                    setErrors(stateErrrors) 
                    setMessage("")
             
             }
                else
                {
                    setErrors({
                        email:"",
                        password:"",
                    })
                    setMessage(error.response.data.message)
                
                }
                
            }
              })
              
           
           )
        }

        let changed=(event,inputId)=>{
            
              let Sinput={...input}
              Sinput[inputId]=event.target.value
              setInput(Sinput)
                      
           }

       

    return (
       
   navigate?a:
    <body className="Login">
<Slide direction='up' in="true">
<Container size="80vh" wide="40vw">   
        <Title>Welcome</Title>
        <InputText>
        <FancyInput bordercolor={errors['email']? '#960000':'white'} onChange={(event)=>changed(event,"email")}type="email" placeholder='Email'>{input['email']}</FancyInput>
    
        <FancyInput bordercolor={errors['password']||errors['email']? '#960000':'white'} onChange={(event)=>changed(event,"password")} type="password" placeholder='Password'>{input['password']}</FancyInput>
      <label style={{color:'#960000' ,fontWeight:'bold'}}>{errors['email'][0]}</label>
      <label style={{color:'#960000' ,fontWeight:'bold'}}>{errors['password'][0]}</label>
      <label style={{color:'#960000' ,fontWeight:'bold'}}>{message?"Please Try Again In 1 Minute":""}</label>
        </InputText>
        <Link to="/Login/ForgotPassword">
        <ClickableText>Forgot Password?</ClickableText>
        </Link>

        <Buttons>
        <div class="container">
<div class="row">
<div class="col-md-1">
</div>
<div class="col-md-10">

<FancyButton onClick={loginReq} nameButton='Login'></FancyButton>

    </div>
    <div class="col-md-1">
</div>
    </div>
    </div>
       
            <div class="container">
            <div class="row">
            <div class="col-md-1">
            </div>
            <div class="col-md-10">
                        <Link to="/Signup">
                        <FancyButton nameButton='Register'></FancyButton> 
                        </Link>
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



export default Login;
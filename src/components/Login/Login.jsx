import styled from 'styled-components';
import React from 'react';
import './LoginStyle.css';
import FancyInput from "./Input"
import FancyButton from "./Button"
import axios from 'axios';
import { Component } from 'react/cjs/react.production.min';
import { Link, Navigate } from 'react-router-dom';
import Container from './ContainerBox';
import { Slide } from '@material-ui/core';

const Container = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    height: 80vh;
    width: 30vw;
    background: #1312128f;
    box-shadow: 0 8px 32px 0 rgba(31,38,135,0.3);
    backdrop-filter: blur(2.5px);
    border-radius:15px ;
    color: #ffffff;
    text-transform: uppercase ;
    letter-spacing: 0.5em;
    @media screen and (max-width: 320px) {
        width: 80 vw;
        height: 90 vh ;
    }

    @media screen and (max-width: 320px) {
        width: 80 vw;
        height: 90 vh ;
    }

    @media screen and (min-width: 360px) {
        width: 80 vw;
        height: 90 vh ;

    }
     @media screen and (min-width: 411px) {
        width: 80 vw;
        height: 90 vh ;

    }
    @media screen and (min-width: 768px) {
        width: 80 vw;
        height: 80 vh ;

    }
     @media screen and (min-width: 1024px) {
        width: 70 vw;
        height: 50 vh ;

    }
    @media screen and (min-width: 1280px) {
        width: 80 vw;
        height: 90 vh ;

    }

`;



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
let error=""

export class Login extends Component{
    state={
     
        input:{
            email:"",
            password:"",
            
            }, 
    
            errors:{
                email:"",
                password:"",
            },
            message:"",
            navigate:false,
    }
    render() {

       

 
        let loginReq = () => {
            axios.get("http://localhost:8000/sanctum/csrf-cookie").then()  
                axios.post("http://localhost:8000/api/login",{    
                    "email":this.state.input['email'],
                    "password":this.state.input['password'],  
           
            }).then(response=> {
           
               if(response.status==200)
               {
                    
                   this.setState({
                    input:{
                        email:"",
                        password:"",
                        
                        }, 
                
                        errors:{
                            email:"",
                            password:"",
                        },
                        message:"",
                        navigate:true
                   });
                  
               
                }
              })
              .catch(error=> {
              
               let errors=error.response.data.errors
            
              
               let stateErrrors={...this.state.errors}
               if(errors){
                Object.keys(this.state.errors).forEach(element=>{
                    if(Object.keys(errors).includes(element)){
                        stateErrrors[element]=errors[element]
                    }else{
                        stateErrrors[element]=""
                    }
                     
                   })
           
            
          
               this.setState({
                errors: stateErrrors,
                message:""
                });
            }
               else
               {
                   
                this.setState({
                    errors:{
                        email:"",
                        password:"",
                    },
                    message:error.response.data.message
                })
               }
               
                
               
              });
           

        }

        let changed=(event,inputId)=>{
            
              let input={...this.state.input}
               input[inputId]=event.target.value
               this.setState(
                   {
                 
                       input:input
                   }
                   )
                 
           }

     
      

    return (
       
   this.state.navigate?<Navigate to="/twoFA"/>:
    <body className="Login">
<Slide direction='up' in="true">
<Container size="80vh">   
        <Title>Welcome</Title>
        <InputText>
        <FancyInput bordercolor={this.state.errors['email']? '#960000':'white'} onChange={(event)=>changed(event,"email")}type="email" placeholder='Email'>{this.state.email}</FancyInput>
    
        <FancyInput bordercolor={this.state.errors['password']||this.state.errors['email']? '#960000':'white'} onChange={(event)=>changed(event,"password")} type="password" placeholder='Password'>{this.state.password}</FancyInput>
      <label style={{color:'#960000' ,fontWeight:'bold'}}>{this.state.errors['email'][0]}</label>
      <label style={{color:'#960000' ,fontWeight:'bold'}}>{this.state.errors['password'][0]}</label>
      <label style={{color:'#960000' ,fontWeight:'bold'}}>{this.state.message?"Please Try Again In 1 Minute":""}</label>
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
    } 



export default Login;
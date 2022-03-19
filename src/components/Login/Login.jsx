import styled from 'styled-components';
import React from 'react';
import './LoginStyle.css';
import FancyInput from "./Input"
import FancyButton from "./Button"
import axios from 'axios';
import { Component } from 'react/cjs/react.production.min';
import { Link } from 'react-router-dom';
import Container from './ContainerBox';
import { Slide } from '@material-ui/core';

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
    }
    render() {

  
        let loginReq = () => {

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
                   })
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
    <body className="Login">
<Slide direction='up' in="true">
<Container size="80vh" wide="40vw">   
        <Title>Welcome</Title>
        <InputText>
        <FancyInput onChange={(event)=>changed(event,"email")}type="email" placeholder='Email'>{this.state.email}</FancyInput>
      
        <FancyInput onChange={(event)=>changed(event,"password")} type="password" placeholder='Password'>{this.state.password}</FancyInput>
      <label>{this.state.errors['email'][0]}</label>
      <label>{this.state.errors['password'][0]}</label>
      <label>{this.state.message?"Please Try Again In 1 Minute":""}</label>
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
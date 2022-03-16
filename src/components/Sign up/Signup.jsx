import styled from 'styled-components';
import React from 'react';
import '../Login/LoginStyle.css';
import FancyInput from "../Login/Input"
import FancyButton from "../Login/Button"
import axios from 'axios';
import { Component } from 'react/cjs/react.production.min';
import { ThemeProvider } from 'styled-components';
import { Slide } from '@material-ui/core';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
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

export class Signup extends Component
{
    state={
        input:{
        name:"",
        email:"",
        password:"",
        password_confirmation:"",
        
        }, 

        errors:{
            name:"",
            email:"",
            password:"",
        }

        
    }
  

    render(){
   
         
                
        let registerReq=()=>{
     
         
            axios.post("http://localhost:8000/api/register",{
                "name":this.state.input['name'],
            "email":this.state.input['email'],
            "password":this.state.input['password'],
           "password_confirmation":this.state.input['password_confirmation'],
        
        }).then(response=> {
            if(response.status==201){
                this.setState({
                    input:{
                        name:"",
                        email:"",
                        password:"",
                        password_confirmation:"",
                        
                        }, 
                
                        errors:{
                            name:"",
                            email:"",
                            password:"",
                        }
                })
            }

          })
          .catch(error=> {
           
            let errors=error.response.data.errors
            
           
           let stateErrrors={...this.state.errors}
           
           Object.keys(this.state.errors).forEach(element=>{
            if(Object.keys(errors).includes(element)){
                stateErrrors[element]=errors[element]
            }else{
                stateErrrors[element]=""
            }
             
           })
          
           
            this.setState({
                errors: stateErrrors
                });
         
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
            <Container size="80vh">   
            <Title>Signup</Title>
            <InputText>
            <FancyInput onChange={(event)=>changed(event,"name")} type="text" name="name" placeholder='Name'>{this.state.name}</FancyInput>
            <label>{this.state.errors['name'][0]}</label>
            <FancyInput onChange={(event)=>changed(event,"email")} type="email" placeholder='Email'>{this.state.email}</FancyInput>
            <label>{this.state.errors['email'][0]}</label>
            <FancyInput onChange={(event)=>changed(event,"password")} type="password" name="password" placeholder='Password'>{this.state.password}</FancyInput>
            <FancyInput onChange={(event)=>changed(event,"password_confirmation")} type="password" name="password_confirmation" placeholder='Confirm Password'>{this.state.password_confirmation}</FancyInput>
            <label>{this.state.errors['password'][0]}</label>
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
}

export default Signup;
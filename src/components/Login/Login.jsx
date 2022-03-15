import styled from 'styled-components';
import React from 'react';
import './LoginStyle.css';
import FancyInput from "./Input"
import FancyButton from "./Button"
import axios from 'axios';
import { Component } from 'react/cjs/react.production.min';
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
    @media screen and (max-width: 320px) {
        width: 90% ;
        height: 90% ;
    }

    @media screen and (max-width: 360px) {
        width: 90% ;
        height: 90% ;

    }
     @media screen and (max-width: 411px) {
        width: 90% ;
        height: 90% ;

    }
    @media screen and (max-width: 768px) {
        width: 90% ;
        height: 90% ;

    }
     @media screen and (max-width: 1024px) {
        width: 90% ;
        height: 90% ;

    }
    @media screen and (max-width: 1280px) {
        width: 90% ;
        height: 90% ;

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
               Object.keys(errors).forEach(element => {
                stateErrrors[element]=errors[element]
               });
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

<Container>   
        <Title>welcome</Title>
        <InputText>
        <FancyInput onChange={(event)=>changed(event,"email")} type="email" placeholder='Email'></FancyInput>
      
        <FancyInput onChange={(event)=>changed(event,"password")} type="password" placeholder='Password'></FancyInput>
      <label>{this.state.errors['email'][0]}</label>
      <label>{this.state.message}</label>
        </InputText>
        <ClickableText>Forgot Password?</ClickableText>
        <Buttons>
            <FancyButton onClick={loginReq} nameButton='Login'></FancyButton>
            <FancyButton nameButton='Register'></FancyButton>
        </Buttons>
       
    </Container>
    </body>

     );
    }
    } 



export default Login;
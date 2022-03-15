import styled from 'styled-components';
import React from 'react';
import '../Login/LoginStyle.css';
import FancyInput from "../Login/Input"
import FancyButton from "../Login/Button"
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
            console.log(this.state.input['name']);
            console.log(this.state.input['email']);
            console.log(this.state.input['password']);
            console.log(this.state.input['password_confirmation']);
         
            axios.post("http://localhost:8000/api/register",{
                "name":this.state.input['name'],
            "email":this.state.input['email'],
            "password":this.state.input['password'],
           "password_confirmation":this.state.input['password_confirmation'],
        
        }).then(response=> {
            this.setState({
                error:response.statusText
                });
            console.log(response);
          })
          .catch(error=> {
           
            error=error.response.data.errors
            
            console.log(Object.keys(error))
           let stateErrrors={...this.state.errors}
           
           Object.keys(error).forEach(element => {
            stateErrrors[element]=error[element]
           });
           
      
        
            this.setState({
                errors: stateErrrors
                });
            console.log(error)
          });
        }
      
        let changed=(event,inputId)=>{
            
         console.log(this.state.input[inputId])
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
            <Title>Signup</Title>
            <InputText>
            <FancyInput onChange={(event)=>changed(event,"name")} type="text" name="name" placeholder='Name'>{this.state.name}</FancyInput>
            <label>{this.state.errors['name'][0]}</label>
            <FancyInput onChange={(event)=>changed(event,"email")} type="email" placeholder='Email'>{this.state.email}</FancyInput>
            <label>{this.state.errors['email'][0]}</label>
            <FancyInput onChange={(event)=>changed(event,"password")} type="password" name="password" placeholder='Password'>{this.state.password}</FancyInput>
            <FancyInput onChange={(event)=>changed(event,"password_confirmation")} type="password" name="password_confirmation" placeholder='Password'>{this.state.password_confirmation}</FancyInput>
            <label>{this.state.errors['password'][0]}</label>
            </InputText>
            <Buttons>
                <FancyButton onClick={registerReq} nameButton='Sign up'></FancyButton>
            </Buttons>
            
        </Container>
        </body>
    
         );
        }
}

export default Signup;
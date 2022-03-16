import React from 'react'
import Container from '../Login/ContainerBox'
import Input from '../Login/Input'
import '../Login/LoginStyle.css';
import styled from 'styled-components';
import Button from '../Login/Button';
import { useRoutes } from 'react-router-dom';
import { Component } from 'react/cjs/react.production.min';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';

const Title = styled.h2`
margin: 3rem 0 2rem 0 ;

`;
const Buttons = styled.div`
    display:flex ;
    flex-direction:column ;
    height: 20% ;
    justify-content: space-around;
    align-items: center ;
    margin: 0rem 0 2rem 0 ;
    width:100% ;
`;
const InputText = styled.div`
margin: 0.5rem 0 1rem 0 ;
display:flex ;
flex-direction:column ;
justify-content: space-around;
align-items: center ;
height: 20% ;
width: 100% ;
`;


class NewPass extends Component {

    state={
      input:{
        email:"",
        password:"",
        password_confirmation:"",
        token:"",
      },
      errors:{
        password:"",
    },

    }

  
    render(){
    let forgotPassReq =()=> {
      
       const queryParams = new URLSearchParams(window.location.search)

       const token = queryParams.get('t')
       const email = queryParams.get('email')
     
            axios.post("http://localhost:8000/api/reset-password",{    
                "email":email,
                "password":this.state.input['password'],
                "password_confirmation":this.state.input['password_confirmation'],
                "token":token,
               
        }).then(response=> {
         console.log(response.data)
          })
          .catch(error=> {
              let StateError={...this.state.errors}
              StateError['password']=error.response.data.errors['password']
          this.setState({
            errors:StateError
            }
            
              )
              console.log(this.state.errors['password'][0])
           
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
    <body class="Login">
   <Container size="30vh">
       <Title>
           Forgot Password
       </Title>
       <InputText>
       <Input onChange={(event)=>changed(event,"password")} type="password" placeholder="New Password" />
       <Input onChange={(event)=>changed(event,"password_confirmation")} type="password" placeholder="Confirm New Password" />
       </InputText>
       <label>{this.state.errors['password'][0]}</label>
       <Buttons>
       <div class="container">
     <div class="row">
    <div class="col-md-1">
        </div>
    <div class="col-md-10">
    <Button onClick={forgotPassReq} nameButton="Submit"></Button>
     </div>
    <div class="col-md-1">
    </div>
     </div>
        </div>
       
       </Buttons>

   </Container>
      </body>
  )}
}

export default NewPass

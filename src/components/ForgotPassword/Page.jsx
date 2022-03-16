import React from 'react'
import Container from '../Login/ContainerBox'
import Input from '../Login/Input'
import '../Login/LoginStyle.css';
import styled from 'styled-components';
import Button from '../Login/Button';
import axios from 'axios';
import { Component } from 'react/cjs/react.production.min';


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



class Page extends Component {
    state={
        input:{
            email:""
        },
        error:""
    }
    render(){
     
let forgotPassReq =()=> {
console.log(this.state.input['email'])
    axios.post("http://localhost:8000/api/forgot-password",{    
        "email":this.state.input['email'],

}).then(response=> {
 
  })
  .catch(error=> {
  this.setState({
      error:error.response.data.message
    }
      )
    
   
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
       <Input onChange={(event)=>changed(event,'email')} type="text" placeholder="Email of your account" />
       <label style={{cursor:'pointer'}}>{this.state.error}</label>
       </InputText>
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

  )
  }
}

export default Page

import React,{useState} from 'react'
import Container from '../Login/ContainerBox'
import Input from '../Login/Input'
import '../Login/LoginStyle.css';
import styled from 'styled-components';
import Button from '../Login/Button';
import axios from '../axios/axios';
import { Component } from 'react/cjs/react.production.min';
import { Slide } from '@material-ui/core';

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



let Page=()=>  {

    const [input, setInput] = useState({
        email:""
    });
        const [message, setMessage] = useState("");
        const [error, setError] = useState("");
   

let forgotPassReq =()=> {

console.log(input['email'])
    axios().post("/api/forgot-password",{    
        "email":input['email'],

}).then(response=> {
    setError("")
    setMessage(response.data.message)
  })
  .catch(error=> {
    if(!error.response) return
 
    if(error.response.data.message=="We can't find a user with that email address."){
    axios().post("/api/trainer/forgot-password",{    
        "email":input['email'],

}).then(response=>{
    setError("")
    setMessage(response.data.message)
})  .catch(error=> {
    if(!error.response) return
    if(error.response.data.message=="We can't find a user with that email address."){
        axios().post("/api/admin/forgot-password",{    
            "email":input['email'],
    
    }).then(response=>{
        setError("")
        setMessage(response.data.message)
    })  .catch(error=> {
        if(!error.response) return
        setMessage("")
        setError(error.response.data.message)
    })
}
    else{
    setMessage("")
    setError(error.response.data.message)}
})
}else{
setMessage("")
setError(error.response.data.message)}

  })

}

        let changed=(event,inputId)=>{
            
            let Sinput={...input}
            Sinput[inputId]=event.target.value
             setInput(Sinput)
           
               
         }


  return (
      <div class="Login" >
          <Slide direction='up' in="true">
   <Container size="30vh" width="30vw">
       <Title>
           Forgot Password
       </Title>
       <InputText>
       <Input onChange={(event)=>changed(event,'email')} type="email" placeholder="Email of your account" />
   
       <label style={{color:message?'#58d68d ':' #960000 ' ,fontWeight:'bold'}}>{message?message:error}</label>
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

   </Slide>
      </div>

  )
  
}

export default Page

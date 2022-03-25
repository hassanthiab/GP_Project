import React,{useState}from 'react'
import Container from '../Login/ContainerBox'
import Input from '../Login/Input'
import '../Login/LoginStyle.css';
import styled from 'styled-components';
import Button from '../Login/Button';
import axios from '../axios/axios';
import { Component } from 'react/cjs/react.production.min';
import { Checkbox, Slide } from '@material-ui/core';
import { Navigate } from 'react-router-dom';

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



let TwoFALogin=()=>  {

    const [input, setInput] = useState({
      recovery_code:'',
     code:'',
     EN_r_code:false
  })

  const [error, setError] = useState("")
  const [navigate, setNavigate] = useState(false);

  let data={}
let codeFAReq =()=> {
 
   input.EN_r_code?data.recovery_code=input.recovery_code:data.code=input.code
   console.log(data)
console.log(input)   
    axios().post("/api/two-factor-challenge",data).then(response=> {
      setNavigate(true)
  
  })
  .catch(error=> {
    setError(error.response.data.message)

  })
    

}

        let changed=(event,inputId)=>{
             
            let Sinput={...input}
            inputId==='EN_r_code' ?Sinput[inputId]=!Sinput[inputId]:Sinput[inputId]=event.target.value
             

             console.log(Sinput[inputId])

             setInput(Sinput)
          
         }


  return (
    navigate?<Navigate to="/twoFA"/>:
      <body class="Login">
          <Slide direction='up' in="true">
   <Container size="30vh">
       <Title>
           Please Enter your 2FA code
       </Title>
       <InputText>
       <Input onChange={(event)=>changed(event,input.EN_r_code?'recovery_code':'code')} type="text" placeholder="the code" />
       <label style={{cursor:'pointer'}}>{error}</label>
       <div class="form-check form-switch">
  <input class="form-check-input" onChange={(event)=>changed(event,'EN_r_code')} type="checkbox" id="flexSwitchCheckDefault" />
  <label class="form-check-label" for="flexSwitchCheckDefault">use recovery code</label>
</div>
       </InputText>
       <Buttons>
       <div class="container">
     <div class="row">
    <div class="col-md-1">
        </div>
    <div class="col-md-10">
    <Button onClick={codeFAReq} nameButton="Submit"></Button>
     </div>
    <div class="col-md-1">
    </div>
     </div>
        </div>
       
       </Buttons>

   </Container>

   </Slide>
      </body>

  )
  
}

export default TwoFALogin

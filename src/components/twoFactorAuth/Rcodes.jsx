import React, { useState } from "react";
import axios from "../axios/axios";
import NavTop from '../Homepage/NavTop.jsx';
import { Link } from "react-router-dom";
import Container from "../Login/ContainerBox";
import Input from "../Login/Input";
import "../Login/LoginStyle.css";
import styled from "styled-components";
import Button from "../Login/Button";
import { Component } from "react/cjs/react.production.min";
import { Slide } from "@material-ui/core";
const Title = styled.h2`
  margin: 3rem 0 2rem 0;
`;
const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  height: 20%;
  justify-content: space-around;
  align-items: center;
  margin: 0rem 0 2rem 0;
  width: 100%;
`;
const InputText = styled.div`
  margin: 0.5rem 0 1rem 0;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 20%;
  width: 100%;
`;

const Rcodes=()=>{

  const [input, setInput] = useState({
    email: "",
  });
  const [errors, setErrors] = useState({
    email: "",
  });
  const [sent, setSent] = useState(false);

  let changed = (event, inputId) => {
    let Sinput = { ...input };
    Sinput[inputId] = event.target.value;
    setInput(Sinput);
  };

  let sendCodes=()=>{
    axios()
    .post("/api/recoverCodes", {
      email: input["email"],
    })
    .then((response) => {
      setErrors({
        email: "",
      });
      setSent(true);
    })
    .catch((error) => {
      if (!error.response) return;
      let resErrors = error.response.data.errors;
      let stateErrrors = { ...errors };
      if (resErrors) {
     
      Object.keys(errors).forEach((element) => {
        
        if (Object.keys(resErrors).includes(element)) {
       
          stateErrrors[element] = resErrors[element];
        } else {
          stateErrrors[element] = "";
        }
      });
    
      setErrors(stateErrrors);
      setSent(false);
    }
    });
  }
return(

  <React.Fragment>
    <NavTop/>
    <div class="Login">
      <Slide direction="up" in="true">
        <Container size="30vh" width="30vw">
          <Title>New Password</Title>
          <InputText>
            <Input
              onChange={(event) => changed(event, "email")}
              type="email"
              placeholder="your email"
            />
          </InputText>
          <label style={{ color:" #960000 ",fontWeight: "bold", }}
          >
           {errors['email']}

          </label>


          {sent?  <span
                  className={ "text-success" }
                  style={{ fontSize: 19, fontWeight: "bold" }}>email has been sent
                </span>:""}
       
        
          <Buttons>
            <div class="container">
              <div class="row">
                <div class="col-md-1"></div>
                <div class="col-md-10">
                  <Button
                   onClick={sendCodes} 
                   nameButton="email me the codes">  </Button>
                </div>
                <div class="col-md-1"></div>
              </div>
            </div>
          </Buttons>
        </Container>
      </Slide>
    </div>
    </React.Fragment>
  
  )
} 
export default Rcodes;
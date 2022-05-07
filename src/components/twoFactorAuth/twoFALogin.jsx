import React, { useState } from "react";
import Container from "../Login/ContainerBox";
import Input from "../Login/Input";
import "../Login/LoginStyle.css";
import styled from "styled-components";
import Button from "../Login/Button";
import axios from "../axios/axios";
import { Slide } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import NavTop from '../Homepage/NavTop.jsx';
import { Link } from "react-router-dom";
const ClickableText = styled.h3`
  margin: 1rem 0 2rem 0;
  cursor: pointer;
  color: white;
  font-size: small;
`;
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

let TwoFALogin = () => {
  const a = localStorage.getItem("type");
  const navigate = useNavigate();
  const [input, setInput] = useState({
    code: "",
  });

  const [error, setError] = useState("");

  let data = {};
  let codeFAReq = () => {
    let regix = new RegExp("^(\\d{6})$");
    regix.test(input.code)
      ? (data.code = input.code)
      : (data.recovery_code = input.code);
    data.device_name = "andriod";

    axios()
      .post("/api/" + a + "two-factor-challenge", data)
      .then((response) => {
        if (response.status == 200) {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("type", response.data.type);
          localStorage.getItem('type')=='admin/'?navigate("/Dashboard"):navigate("/Feed")

        }
      })
      .catch((error) => {
        if (!error.response) return;
        setError(error.response.data.message);
      });
  };

  let changed = (event, inputId) => {
    let Sinput = { ...input };
    Sinput[inputId] = event.target.value;

    console.log(Sinput[inputId]);

    setInput(Sinput);
  };

  return (
    <React.Fragment>
    <NavTop/>
    <div class="Login">
      <Slide direction="up" in="true">
        <Container size="30vh">
          <Title>Please Enter your 2FA code</Title>
          <InputText>
            <Input
              onChange={(event) => changed(event, "code")}
              type="text"
              placeholder="the code"
            />
            <label    style={{ color :" #960000 ",fontWeight: "bold",}}>{error}</label>
            <Link to={'/Rcodes'}>
            <ClickableText>recover the codes</ClickableText>
          </Link>
            <div class="form-check form-switch"></div>
          </InputText>
          <Buttons>
            <div class="container">
              <div class="row">
                <div class="col-md-1"></div>
                <div class="col-md-10">
                  <Button onClick={codeFAReq} nameButton="Submit"></Button>
                </div>
                <div class="col-md-1"></div>
              </div>
            </div>
          </Buttons>
        </Container>
      </Slide>
    </div>
    </React.Fragment>
  );
};

export default TwoFALogin;

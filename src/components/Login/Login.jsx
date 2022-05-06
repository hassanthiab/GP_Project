import styled from "styled-components";
import React from "react";
import "./LoginStyle.css";
import FancyInput from "./Input";
import FancyButton from "./Button";
import axios from "../axios/axios";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Container from "./ContainerBox";
import { Slide } from "@material-ui/core";
import { useState } from "react";
import NavTop from "../Homepage/NavTop";

let a = "";
const Title = styled.h2`
  margin: 3rem 0 2rem 0;
`;

const ClickableText = styled.h3`
  margin: 1rem 0 2rem 0;
  cursor: pointer;
  color: white;
  font-size: small;
`;

const InputText = styled.div`
  display: flex;
  margin: 1rem 0 2rem 0;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 20%;
  width: 100%;
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  height: 20%;
  justify-content: space-around;
  align-items: center;
  margin: 1rem 0 2rem 0;
  width: 100%;
`;

let Login = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const queryParams = new URLSearchParams(window.location.search);

  const EVURL = queryParams.has("URL") ? queryParams.get("URL") : false;
  const sig = queryParams.has("signature")
    ? queryParams.get("signature")
    : false;

  const URL = EVURL && sig ? `${EVURL}&signature=${sig}` : false;

  let loginReq = () => {
    axios()
      .get("/sanctum/csrf-cookie")
      .then(
        axios()
          .post("/api/login", {
            email: input["email"],
            password: input["password"],
            device_name: "android",
          })
          .then((response) => {
            if (response.status == 200) {
              if (response.data.two_factor) {
                localStorage.setItem("type", response.data.type);
                navigate("/FAcode");
              } else {
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("type", response.data.type);
                axios()
                .get("api/"+response.data.type+"user")
                .then((response) => {
                  localStorage.setItem("pf",response.data.profile_picture)
                })
                .catch((error) => {});
                if (URL) {
                  axios()
                    .get(URL)
                    .then((response) => {
                      response.status == 204 ? "" : "";
                    })
                    .catch((error) => {});
                }
                console.log(a.props);
                setInput({
                  email: "",
                  password: "",
                });

                setErrors({
                  email: "",
                  password: "",
                });

                setMessage("");
                localStorage.getItem('type')=='admin/'?navigate("/Dashboard"):navigate("/Feed")
             
              }
            }
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
              setMessage("");
            } else {
              setErrors({
                email: "",
                password: "",
              });
              setMessage(error.response.data.message);
            }
          })
      )
      .catch((error) => {});
  };

  let changed = (event, inputId) => {
    let Sinput = { ...input };
    Sinput[inputId] = event.target.value;
    setInput(Sinput);
  };

  return (
    <React.Fragment>
    
    <NavTop>

    </NavTop>
    <div className="Login">
      
      <Slide direction="up" in="true">

        <Container size="80%" width="40%">
          <Title>Welcome</Title>
          <InputText>
            <FancyInput
              bordercolor={errors["email"] ? "#960000" : "white"}
              onChange={(event) => changed(event, "email")}
              type="email"
              placeholder="Email"
            >
              {input["email"]}
            </FancyInput>

            <FancyInput
              bordercolor={
                errors["password"] || errors["email"] ? "#960000" : "white"
              }
              onChange={(event) => changed(event, "password")}
              type="password"
              placeholder="Password"
            >
              {input["password"]}
            </FancyInput>
            <label style={{ color: "#960000", fontWeight: "bold" }}>
              {errors["email"][0]}
            </label>
            <label style={{ color: "#960000", fontWeight: "bold" }}>
              {errors["password"][0]}
            </label>
            <label style={{ color: "#960000", fontWeight: "bold" }}>
              {message ? "Please Try Again In 1 Minute" : ""}
            </label>
          </InputText>
          <Link to="/Login/ForgotPassword">
            <ClickableText>Forgot Password?</ClickableText>
          </Link>

          <Buttons>
            <div class="container">
              <div class="row">
                <div class="col-md-1"></div>
                <div class="col-md-10">
                  <FancyButton
                    onClick={loginReq}
                    nameButton="Login"
                  ></FancyButton>
                </div>
                <div class="col-md-1"></div>
              </div>
            </div>

            <div class="container">
              <div class="row">
                <div class="col-md-1"></div>
                <div class="col-md-10">
                  <Link to="/Signup">
                    <FancyButton nameButton="Register"></FancyButton>
                  </Link>
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

export default Login;

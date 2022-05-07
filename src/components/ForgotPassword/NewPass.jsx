import React, { useState } from "react";
import Container from "../Login/ContainerBox";
import Input from "../Login/Input";
import "../Login/LoginStyle.css";
import styled from "styled-components";
import Button from "../Login/Button";
import { useNavigate } from "react-router-dom";
import axios from "../axios/axios";
import NavTop from '../Homepage/NavTop.jsx';

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

let NewPass = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: "",
    password: "",
    password_confirmation: "",
    token: "",
  });
  const [errors, setErrors] = useState({
    password: "",
  });

  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState("");

  let forgotPassReq = () => {
    const queryParams = new URLSearchParams(window.location.search);

    const email = queryParams.get("email");
    const token = queryParams.get("t");

    axios()
      .post("/api/reset-password", {
        email: email,
        password: input["password"],
        password_confirmation: input["password_confirmation"],
        token: token,
      })
      .then((response) => {
        if (
          response.status == 200 &&
          response.data.message == "Your password has been reset!"
        ) {
          navigate("/Login");
        }
        setSuccess(response.data.message);
      })
      .catch((error) => {
        if (!error.response) return;
        if (
          error.response.data.message ==
          "We can't find a user with that email address."
        ) {
          console.log(error.response.data.message);
          axios()
            .post("/api/trainer/reset-password", {
              email: email,
              password: input["password"],
              password_confirmation: input["password_confirmation"],
              token: token,
            })
            .then((response) => {
              if (
                response.status == 200 &&
                response.data.message == "Your password has been reset!"
              ) {
                navigate("/Login");
              }
              setSuccess(response.data.message);
            })
            .catch((error) => {
              if (
                error.response.data.message ==
                "We can't find a user with that email address."
              ) {
                axios()
                  .post("/api/admin/reset-password", {
                    email: email,
                    password: input["password"],
                    password_confirmation: input["password_confirmation"],
                    token: token,
                  })
                  .then((response) => {
                    if (
                      response.status == 200 &&
                      response.data.message == "Your password has been reset!"
                    ) {
                      navigate("/Login");
                    }
                    setSuccess(response.data.message);
                  })
                  .catch((error) => {
                    setSuccess("");
                    let StateError = { ...errors };
                    StateError["password"] =
                      error.response.data.errors["password"];
                    setErrors(StateError);
                    if (error.response.data.message)
                      setMessage("the password reset link is invalid");
                  });
              } else {
                setSuccess("");
                let StateError = { ...errors };
                StateError["password"] = error.response.data.errors["password"];
                setErrors(StateError);
                if (error.response.data.message)
                  setMessage("the password reset link is invalid");
              }
            });
        } else {
          setSuccess("");
          let StateError = { ...errors };
          StateError["password"] = error.response.data.errors["password"];
          setErrors(StateError);
          if (error.response.data.message)
            setMessage("the password reset link is invalid");
        }
      });
  };

  let changed = (event, inputId) => {
    let Sinput = { ...input };
    Sinput[inputId] = event.target.value;
    setInput(Sinput);
  };

  return (
    <React.Fragment>
    <NavTop/>
    <div class="Login">
      <Slide direction="up" in="true">
        <Container size="30vh" width="30vw">
          <Title>New Password</Title>
          <InputText>
            <Input
              onChange={(event) => changed(event, "password")}
              type="password"
              placeholder="New Password"
            />
            <Input
              onChange={(event) => changed(event, "password_confirmation")}
              type="password"
              placeholder="Confirm New Password"
            />
          </InputText>
          <label
            style={{
              color: success ? "#58d68d " : " #960000 ",
              fontWeight: "bold",
            }}
          >
            {success
              ? success
              : errors["password"]
              ? errors["password"][0]
              : message}
          </label>
          <Buttons>
            <div class="container">
              <div class="row">
                <div class="col-md-1"></div>
                <div class="col-md-10">
                  <Button onClick={forgotPassReq} nameButton="Submit"></Button>
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

export default NewPass;

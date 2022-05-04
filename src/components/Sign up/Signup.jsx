import styled from "styled-components";
import React, { useState } from "react";
import "../Login/LoginStyle.css";
import FancyInput from "../Login/Input";
import FancyButton from "../Login/Button";
import axios from "../axios/axios";
import { Slide } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import Container from "../Login/ContainerBox";
import NavTop from "../Homepage/NavTop";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';;
import { width } from "@mui/system";

const Title = styled.h2`
  margin: 3rem 0 2rem 0;
`;

const InputText = styled.div`
  margin: 4rem 0 1rem 0;
  display: flex;
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
  margin: 2rem 0 2rem 0;
  width: 100%;
`;

let Signup = (props) => {
  const navigate = useNavigate();
  const [trainerAdded, setTrainerAdded] = useState(false);
  const [input, setInput] = useState({
    name: "",
    username: "",
    phone: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    username: "",
    phone: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false)
  let registerReq = () => {
  setLoading(true)
  props.role!='trainer'?
  console.log(props):"Ssds"
    axios()
      .post(props.role!='trainer'?"/api/register":"/api/admin/register", {
       device_name: "android",
        name: input["name"],
        email: input["email"],
        username: input["username"],
        phone: input["phone"],
        password: input["password"],
        password_confirmation: input["password_confirmation"],
     
      })
      .then((response) => {
        setLoading(false)
        if (response.status == 201) {
          if (props.role != "trainer") {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("type", "");
         
  
          }
          
          else{
            var myToastEl = document.getElementById('myToastEl1')
            var myToast = bootstrap.Toast.getOrCreateInstance(myToastEl) // Returns a Bootstrap toast instance
            var myToastEl = document.getElementById('toast-body')
            myToastEl.innerHTML="New trainer has been added";
            myToast.show()
          }
        

          setErrors({
            name: "",
            email: "",
            username: "",
            phone: "",
            password: "",
          });
          if (props.role != "trainer") {
            navigate("/verification");
          }
        }
      })
      .catch((error) => {
        setLoading(false)
        if (!error.response) return;
        let Reserrors = error.response.data.errors;

        let stateErrrors = { ...errors };
      if(!Reserrors) return;
        Object.keys(errors).forEach((element) => {
          if (Object.keys(Reserrors).includes(element)) {
            stateErrrors[element] = Reserrors[element];
          } else {
            stateErrrors[element] = "";
          }
        });

        setErrors(stateErrrors);
      });
  };

  let changed = (event, inputId) => {
    let Sinput = { ...input };
    Sinput[inputId] = event.target.value;
    setInput(Sinput);
  };

  return (
    <React.Fragment>
   
    {props.role!='trainer'?<NavTop></NavTop>:""}
    <div className="Login">
      <Slide direction="up" in="true">
        <Container size="100%" width="40%">
          <div className="container">
            <div className="row">
              <div className="col-md-4"></div>
              <div className="col-md-4">
                <Title
                  style={{
                    marginLeft: props.role != "trainer" ? "25%" : "10%",
                  }}
                >
                  {props.role == "trainer" ? "New Trainer" : "Sign up"}
                </Title>
              </div>
              <div className="col-md-4"></div>
            </div>

     

            <InputText>
              <div className="row">
                <div className="col-md-6">
                  <FancyInput
                    bordercolor={errors["name"] ? "#960000" : "white"}
                    onChange={(event) => changed(event, "name")}
                    type="text"
                    name="name"
                    placeholder="Name"
                  >
                    {input["name"]}
                  </FancyInput>
                  <label style={{ color: "#960000", fontWeight: "bold" }}>
                    {errors["name"][0]}
                  </label>
                </div>
                <div className="col-md-6">
                  <FancyInput
                    bordercolor={errors["username"] ? "#960000" : "white"}
                    onChange={(event) => changed(event, "username")}
                    type="text"
                    name="username"
                    placeholder="Username"
                  >
                    {input["username"]}
                  </FancyInput>
                  <label style={{ color: "#960000", fontWeight: "bold" }}>
                    {errors["username"][0]}
                  </label>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <FancyInput
                    bordercolor={errors["phone"] ? "#960000" : "white"}
                    onChange={(event) => changed(event, "phone")}
                    type="text"
                    name="phone"
                    placeholder="phone_number"
                  >
                    {input["phone"]}
                  </FancyInput>
                  <label style={{ color: "#960000", fontWeight: "bold" }}>
                    {errors["phone"][0]}
                  </label>
                </div>

                <div className="col-md-6">
                  <FancyInput
                    bordercolor={errors["email"] ? "#960000" : "white"}
                    onChange={(event) => changed(event, "email")}
                    type="email"
                    placeholder="Email"
                  >
                    {input["email"]}
                  </FancyInput>
                  <label style={{ color: "#960000", fontWeight: "bold" }}>
                    {errors["email"][0]}
                  </label>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <FancyInput
                    bordercolor={errors["password"] ? "#960000" : "white"}
                    onChange={(event) => changed(event, "password")}
                    type="password"
                    name="password"
                    placeholder="Password"
                  >
                    {input["password"]}
                  </FancyInput>
                </div>

                <div className="col-md-6">
                  <FancyInput
                    bordercolor={
                      errors["password"] ==
                      "The password confirmation does not match."
                        ? "#960000"
                        : "white"
                    }
                    onChange={(event) =>
                      changed(event, "password_confirmation")
                    }
                    type="password"
                    name="password_confirmation"
                    placeholder="Confirm Password"
                  >
                    {input["password_confirmation"]}
                  </FancyInput>
                  <label style={{ color: "#960000", fontWeight: "bold" }}>
                    {errors["password"][0]}
                  </label>
                </div>
              </div>
            </InputText>

            <div className="row">
              <div className="col-md-4"></div>

              <div className="col-md-4">
                <Buttons>
                  <FancyButton
                    onClick={registerReq}
                    nameButton={
                      props.role == "trainer"
                        ? loading?  <Box style={{justifyContent:'center'}} sx={{ display: 'flex' }}>
      <CircularProgress 
      size={20}
      thickness={6} />
    </Box>:"New Trainer"
                        : loading?    <Box style={{justifyContent:'center'}} sx={{ display: 'flex' }}>
      <CircularProgress 
      size={20}
      thickness={6} />
    </Box>:"Sign up"
                    }
                  ></FancyButton>
                </Buttons>
              </div>
              <div className="col-md-4"></div>
            </div>
          </div>{" "}
          {/* Container */}
        </Container>
      </Slide>
    </div>
    </React.Fragment>
  );
};

export default Signup;

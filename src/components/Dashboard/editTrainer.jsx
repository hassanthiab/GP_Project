import styled from "styled-components";
import React, { useState,useEffect } from "react";
import "../Login/LoginStyle.css";
import FancyInput from "../Login/Input";
import FancyButton from "../Login/Button";
import axios from "../axios/axios";
import { Slide } from "@material-ui/core";
import { useNavigate,useParams } from "react-router-dom";
import Container from "../Login/ContainerBox";
import Pagetop from "../Homepage/Pagetop";
import Navbar from './Sidebar';

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
  let { id } = useParams();
  const navigate = useNavigate();
  const [trainerEdited, setTrainerEdited] = useState(false);
  const [input, setInput] = useState({
    name: "",
    username: "",
    phone: "",
    email: "",

  });

  const [errors, setErrors] = useState({
    name: "",
    username: "",
    phone: "",
    email: "",

  });



  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/Login");
    }

    axios()
      .get("/api/admin/trainers/"+id)
      .then((response) => {
        let stateInput = { ...input };
        stateInput["name"] = response.data["name"];
        stateInput["username"] = response.data["username"];
        stateInput["phone"] = response.data["phone"];
        stateInput["email"] = response.data["email"];
        setInput(stateInput);
       


      })
      .catch((error) => {});
    

  }, []);
  let registerReq = () => {
  
  
    axios()
      .put("/api/admin/editTrainer/"+id, {
        name: input["name"],
        email: input["email"],
        username: input["username"],
        phone: input["phone"],
     
      })
      .then((response) => {
        if (response.status == 200) {
          var myToastEl = document.getElementById('myToastEl1')
          var myToast = bootstrap.Toast.getOrCreateInstance(myToastEl) // Returns a Bootstrap toast instance
          var myToastEl = document.getElementById('toast-body')
          myToastEl.innerHTML="the Trainer has been updated";
          myToast.show()
     
          setErrors({
            name: "",
            email: "",
            username: "",
            phone: "",
       
          });
        
        }
      })
      .catch((error) => {
     
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

      <Navbar
        />

    <div className="Login">
      <Slide direction="up" in="true">
        <Container size="100%" width="40%">
          <div className="container">
            <div className="row">
              <div className="col-md-4"></div>
              <div className="col-md-4">
                <Title
                  style={{
                    marginLeft: "10%",
                  }}
                >
                   Edit trainer
                </Title>
              </div>
              <div className="col-md-4"></div>
            </div>

       

            <InputText>
              <div className="row">
                <div className="col-md-6">
                  <FancyInput 
                    value={input['name']}
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
                   value={input['username']}
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
                    value={input['phone']}
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
                   value={input['email']}
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

            </InputText>

            <div className="row">
              <div className="col-md-4"></div>

              <div className="col-md-4">
                <Buttons>
                  <FancyButton
                    onClick={registerReq}
                    nameButton={"Save"}
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

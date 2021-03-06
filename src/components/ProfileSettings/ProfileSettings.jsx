import { useState, useEffect } from "react";
import React from "react";
import "./Bottom.css";
import { Button, Slide } from "@material-ui/core";
import styled from "styled-components";
import InputP from "./Input";
import ButtonP from "./Button";
import TwoFA from "../twoFactorAuth/twoFA";
import { useNavigate } from "react-router-dom";
import axios from "../axios/axios";
import NavTop from "../Homepage/NavTop";
import Sidebar from "../Dashboard/Sidebar";
import { FcFolder,FcOpenedFolder } from "react-icons/fc";
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import IconButton from '@mui/material/IconButton';
const Input = styled("input")({
  display: "none",
});

const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  height: 20%;
  justify-content: space-around;
  align-items: center;
  margin: 2rem 0 2rem 0;
  width: 100%;
`;

let ProfileSettings = () => {
  const a = localStorage.getItem("type");

  const [twoFA, setTwoFA] = useState(false);
  const [input, setInput] = useState({
    name: "",
    email: "",
    username: "",
    phone: "",
    current_password: "",
    password: "",
    password_confirmation: "",
    image:"",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    username: "",
    phone: "",
    current_password: "",
    password: "",
    password_confirmation: "",
    image:"",
  });

  const navigate = useNavigate();
  const [profileimage, setImage] = useState(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
  );
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/Login");
    }

    axios()
      .get("/api/" + a + "user")
      .then((response) => {
        let stateInput = { ...input };
        stateInput["name"] = response.data["name"];
        stateInput["email"] = response.data["email"];
        stateInput["username"] = response.data["username"];
        stateInput["phone"] = response.data["phone"];
        response.data["two_factor_secret"] ? setTwoFA(true) : setTwoFA(false);
     
        setImage(response.data['profile_picture']?`http://${process.env.REACT_APP_HOST_BACKEND}:8000/storage/${response.data['profile_picture']}`:`http://${process.env.REACT_APP_HOST_BACKEND}:8000/storage/bpp.webp`);
        setInput(stateInput);
      })
      .catch((error) => {});


  }, []);

 
  const [profilePic, setPic] = useState("");

  let updateUserInfo = () => {
    axios()
      .put("/api/" + a + "user/profile-information", {
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
          myToastEl.innerHTML="the profile has been modified";
          myToast.show()
          setErrors({
            name: "",
            email: "",
            username: "",
            phone: "",
            current_password: "",
            password: "",
            password_confirmation: "",
            image:"",
          });
        }
      })
      .catch((error) => {

        if (!error.response) return;
        let Reserrors = error.response.data.errors;

        let stateErrrors = { ...errors };

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

  let updateUserPass = () => {
    axios()
      .put("/api/" + a + "user/password", {
        current_password: input["current_password"],
        password: input["password"],
        password_confirmation: input["password_confirmation"],
      })
      .then((response) => {
        if (response.status == 200) {
          var myToastEl = document.getElementById('myToastEl1')
          var myToast = bootstrap.Toast.getOrCreateInstance(myToastEl) // Returns a Bootstrap toast instance
          var myToastEl = document.getElementById('toast-body')
          myToastEl.innerHTML="the Password has been changed";
          myToast.show()
          console.log("pass");

          setErrors({
            name: "",
            email: "",
            username: "",
            phone: "",
            current_password: "",
            password: "",
            password_confirmation: "",
            image:"",
          });
        }
      })
      .catch((error) => {

        if (!error.response) return;
        let Reserrors = error.response.data.errors;

        let stateErrrors = { ...errors };

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

  let updateUserPic = () => {
    const formData = new FormData();
    formData.append('image',profilePic);
    axios()
    .post("/api/" + a + "profilePic", formData)
    .then((response) => {
      if (response.status == 200) {
        var myToastEl = document.getElementById('myToastEl1')
        var myToast = bootstrap.Toast.getOrCreateInstance(myToastEl) // Returns a Bootstrap toast instance
        var myToastEl = document.getElementById('toast-body')
        myToastEl.innerHTML="the profile picture has been changed";
        myToast.show()
        setErrors({
          name: "",
          email: "",
          username: "",
          phone: "",
          current_password: "",
          password: "",
          password_confirmation: "",
          image:"",
        });
      }
    })
    .catch((error) => {
      if (!error.response) return;
      let Reserrors = error.response.data.errors;

      let stateErrrors = { ...errors };

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
    console.log(event.target.value);
    let Sinput = { ...input };
    Sinput[inputId] = event.target.value;
    setInput(Sinput);
  };

  const imageHandler = (e) => {
 
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImage(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
    setPic(e.target.files[0])
  };

  return (
    <React.Fragment>
      {localStorage.getItem("type")!="admin/"?<NavTop></NavTop>:""}
      {localStorage.getItem("type")=="admin/"?<Sidebar></Sidebar>:""}
      <Slide in="true" direction="left">
        <div class="container divcont">
          <div class="row  ">
            <div class="col-md-4 "></div>
            <div class="col-md-4">
              <div
                className="img-holder"
                style={{ marginTop: 30, marginLeft: "40%" }}
              >
                <img src={profileimage} alt="" id="img" className="img" />
              </div>
              <div class="row">
            
                <div class="col-md-12">
                  <label
                    style={{ marginTop: 12, marginLeft: "40%" }}
                    htmlFor="contained-button-file"
                  >
                    <Input
                      accept="image/*"
                      id="contained-button-file"
                      multiple
                      type="file"
                      onChange={imageHandler}
                    />
                   
                     {/*  Upload */}
                     choose file 
               
        <IconButton color="primary" style={{fontSize:'30px',justifyContent:'center'}} aria-label="upload picture" component="span">
          <PhotoCamera />
        </IconButton>

                  
                  </label>
                </div>
              
              </div>
              <div class="row">
                <div class="col-md-12" style={{ marginTop: 12, marginLeft: "37%" }} >
                <ButtonP onClick={updateUserPic} placeholder="Save"/>
                </div>
                </div>
            </div>
            <div class="col-md-4"></div>
          </div>

          <div class="row  " style={{ marginTop: 50 }}>
            <div class="col-md-4"></div>
            <div class="col-md-4">
              {errors["username"] ||
              errors["email"] ||
              errors["image"] ? (
                <div
                  class={
 "alert alert-danger"
                  }
                  role="alert"
                > 
                 <label style={{ color: "#960000", fontWeight: "bold" }}>
                    {errors["image"][0]}
                  </label>
                  <label style={{ color: "#960000", fontWeight: "bold" }}>
                    {errors["username"][0]}
                  </label>
                  <label style={{ color: "#960000", fontWeight: "bold" }}>
                    {errors["email"][0]}
                  </label>
            
               
              
                </div>
              ) : (
                ""
              )}

              <div class="col-md-4"></div>
            </div>
          </div>

          <div class="row  " style={{ marginTop: 50 }}>
            <div class="col-md-6">
              <InputP
                onChange={(event) => changed(event, "name")}
                input_label="Name"
                type="Text"
                placeholder="Change name"
                value={input["name"]}
              />
            </div>
            <div class="col-md-6">
              <InputP
                bordercolor={errors["username"] ? "#960000" : "white"}
                onChange={(event) => changed(event, "username")}
                input_label="Username"
                type="Text"
                placeholder="Change username"
                value={input["username"]}
              />
            </div>
          </div>

          <div class="row ">
            <div class="col-md-6">
              <InputP
                bordercolor={errors["email"] ? "#960000" : "white"}
                onChange={(event) => changed(event, "email")}
                input_label="Email"
                type="email"
                placeholder="Change email"
                value={input["email"]}
              />
            </div>
            <div class="col-md-6">
              <InputP
                onChange={(event) => changed(event, "phone")}
                input_label="Number"
                type="Number"
                placeholder="Add PhoneNumber"
                value={input["phone"]}
              />
            </div>
          </div>

          <div class="row  ">
            <div class="col-md-6"></div>
            <div class="col-md-6">
              <ButtonP onClick={updateUserInfo} placeholder="Save Profile" />
            </div>
          </div>

          <div class="row " style={{ marginTop: 30 }}>
            <div class="col-md-6">
              <InputP
                onChange={(event) => changed(event, "current_password")}
                input_label="Current password"
                type="Password"
                placeholder="current password"
              />
            </div>
            <div class="col-md-6">
              <InputP
                onChange={(event) => changed(event, "password")}
                input_label="New Password"
                type="Password"
                placeholder="New Password"
              />
            </div>
          </div>

          <div class="row  ">
            <div class="col-md-6">
              <InputP
                onChange={(event) => changed(event, "password_confirmation")}
                input_label="Confirm New Password"
                type="Password"
                placeholder="Confirm New Password"
              />
            </div>
            <div class="col-md-6">
              <ButtonP onClick={updateUserPass} placeholder="Change Password" />
            </div>
          </div>

          <label style={{ color: " #960000 ", fontWeight: "bold" }}>
            {errors["current_password"]
              ? errors["current_password"][0]
              : errors["password"]
              ? errors["password"][0]
              : ""}
          </label>

          <TwoFA key={twoFA} twoFA={twoFA}></TwoFA>
        </div>
      </Slide>
    </React.Fragment>
  );
};

export default ProfileSettings;

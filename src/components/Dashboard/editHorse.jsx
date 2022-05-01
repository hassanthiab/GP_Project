import React,{useState,useEffect} from 'react'
import NavBar from './Sidebar'
import axios from "../axios/axios";
import {useParams,useNavigate} from "react-router-dom";

function AddHorse() {
  let { id } = useParams();
  const [input, setInput] = useState({
    horseName:"",
    ownerEmail:"",
    birthday:"",
    gender:"",
    roomId:""

  });

  const [errors, setErrors] = useState({
    name:"",
    email:"",
    birthday:"",
    gender:"",
    roomId:""

  });
  
let a=localStorage.getItem('type')
const navigate = useNavigate();
useEffect(() => {
  if (!localStorage.getItem("token")) {
    navigate("/Login");
  }

  axios()
    .get("/api/"+a+"horses/"+id)
    .then((response) => {
     
      let stateInput = { ...input };
      stateInput["horseName"] = response.data["name"];
      stateInput["ownerEmail"] = response.data.owner["email"];
      stateInput["birthday"] = response.data["birthday"];
      stateInput["gender"] = response.data["gender"];
      stateInput["roomId"] = response.data["roomId"];
setInput(stateInput)
     


    })
    .catch((error) => {});
    

}, []);
  let addhorse=()=>{
    axios()
    .put("/api/"+a+"Horses/"+id,{
      email:input.ownerEmail,
      name:input.horseName,
      birthday:input.birthday,
      gender:input.gender,
      roomId:input.roomId
    })
    .then((response) => {
      var myToastEl = document.getElementById('myToastEl1')
      var myToast = bootstrap.Toast.getOrCreateInstance(myToastEl) // Returns a Bootstrap toast instance
      var myToastEl = document.getElementById('toast-body')
      myToastEl.innerHTML="the horse has been modified";
      myToast.show()
      setErrors({
        name:"",
        email:"",
        birthday:"",
        gender:"",
        roomId:""
      });
    })
    .catch((error) => {
      if(!error.response)
    return
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
     }


     let changed = (event, inputId) => {


      let Sinput = { ...input };
      Sinput[inputId] = event.target.value;
      setInput(Sinput);
      console.log(event.target.value)
  
  
    };

  return (
    
    <React.Fragment>
    <NavBar

/>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-lg-9 col-xl-7">
          <div class="card">
            <div class="card-body p-4 p-md-5">
              <h3 class="mb-4 pb-2">modify Horse</h3>
              <form action="">

                <div class="row">
                  <div class="col-md-6 mb-4">

                    <div class="form-outline">
                      <input value={input['horseName']} onChange={(event) => changed(event,"horseName")} type="text" id="firstName" class="form-control active"  />
                      <label class="form-label" for="firstName">Horse Name</label>
                      <label style={{ color: "#960000", fontWeight: "bold" }}>
                    {errors["name"]}
                  </label>
                    </div>

                  </div>
                  <div class="col-md-6 mb-4">

                  <div class="form-outline">
                      <input value={input['ownerEmail']} onChange={(event) => changed(event,"ownerEmail")} type="email" id="emailAddress" class="form-control active" />
                      <label class="form-label" for="emailAddress">Owner Email</label>
                      <label style={{ color: "#960000", fontWeight: "bold" }}>
                    {errors["email"]}
                  </label>
                    </div>


                  </div>
                </div>

                <div class="row">
                  <div class="col-md-6 mb-4">

                    <div class="form-outline datepicker">
                      <input
                      value={input['birthday']}
                        onChange={(event) => changed(event,"birthday")} 
                        type="date"
                        class="form-control active"
                        id="birthdayDate"
                      />
                      <label for="birthdayDate" class="form-label">Birthday</label>
                      <label style={{ color: "#960000", fontWeight: "bold" }}>
                    {errors["birthday"]}
                  </label>
                    </div>

                  </div>
                  <div class="col-md-6 mb-4">

                    <h6 class="mb-2 pb-1">Gender: </h6>

                    <div class="form-check form-check-inline">
                      <input
                        onChange={(event) => changed(event,"gender")} 
                        class="form-check-input"
                        type="radio"
                        name="inlineRadioOptions"
                        id="femaleGender"
                        value="female"
                        checked={input['gender']=="female"?true:false}
                      />
                      <label class="form-check-label" for="femaleGender">Female</label>
                    </div>
                 
                    <div class="form-check form-check-inline">
                      <input
                        onChange={(event) => changed(event,"gender")} 
                        class="form-check-input"
                        type="radio"
                        name="inlineRadioOptions"
                        id="maleGender"
                        value="male"
                        checked={input['gender']=="male"?true:false}
                      />
                      <label class="form-check-label" for="maleGender">Male</label>
                    </div>
                    <label style={{ color: "#960000", fontWeight: "bold" }}>
                    {errors["gender"]}
                  </label>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6 mb-4">

                    <div class="form-outline">
                      <input value={input['roomId']} type={'text'}  onChange={(event) => changed(event,"roomId")}  id="room" class="form-control active" />
                      <label class="form-label" for="room">Room ID</label>
                      <label style={{ color: "#960000", fontWeight: "bold" }}>
                    {errors["roomId"]}
                  </label>
                    </div>

                  </div>
               
                </div>
              </form>

              <div class="row">
                  <div class="col-12">

                    <div class="mt-4">
                      <input class="btn btn-primary btn-lg" type="submit" onClick={addhorse} value="Submit" />
                    </div>

                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </React.Fragment>
  )
}

export default AddHorse

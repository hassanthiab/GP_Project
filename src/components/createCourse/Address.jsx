import React from "react";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import NavTop from "../Homepage/NavTop";
import "../Login/LoginStyle.css"
import { Fragment } from "react/cjs/react.production.min";
import { useEffect,useState } from "react";
import Select from 'react-select'
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Autocomplete from '@mui/material/Autocomplete';


import axios from "../axios/axios";
import {useNavigate,useParams } from "react-router-dom";
export const Address = ({ formData, setForm, navigation }) => {
  const { category } = formData;
  const [options, setOptions] = useState([]);
  const [error, setError] = useState();
  let { id } = useParams();
 
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/Login");
    }

    axios()
      .get("/api/getCats/"+id)
      .then((response) => {
        let a=[]
        a[0]=<option selected key={0}></option>
    for(let i=1;i<response.data.length+1;i++){
     a[i]=<option key={i} value={response.data[i-1].id}>{response.data[i-1].category}</option>
    }

    setOptions(a)
          
      })
      .catch((error) => {
        if(!error.response)
        return
      });
      
  }, []);

const check=()=>{
  if(category=='')
  setError('the category field is required')
  else
  {
  
    setError('')

    navigation.next()
  }
}
  return (
    <React.Fragment>
    <NavTop/>
    <Container className="Login" maxWidth="xs">
      <h3>Category</h3>
 

      <label for="category">Choose a category:</label>
      <br/>
         <select 
         value={category}
         style={{width:'100px'}}
          onChange={setForm} 
          name="category" 
          id="category">
         {options}
</select>
     <br/>
     <label style={{ color: "#960000", fontWeight: "bold" }}>
                    {error}
                  </label>
     
      <div style={{ marginTop: "1rem" }}>
        <Button
          color="secondary"
          variant="contained"
          style={{ marginRight: "1rem" }}
          onClick={() => navigation.previous()}
        >
          Back
        </Button>
        <Button
          color="primary"
          variant="contained"
          onClick={() =>check()}
        >
          Next
        </Button>
      </div>
    </Container>
    </React.Fragment>
  );
};
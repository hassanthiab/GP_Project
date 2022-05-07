import React, { useState ,useEffect}from 'react'
import NavTop from '../Homepage/NavTop'
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link,useNavigate,useParams } from "react-router-dom";
import "../Dashboard/btn.css"
import "../Dashboard/productList.css"
import { productRows } from "../Dashboard/dummy-data";
import axios from "../axios/axios";
import Container from '@material-ui/core/Container';

const Success=()=>{
  let { id } = useParams();
  const queryParams = new URLSearchParams(window.location.search);

  const token = queryParams.get("token");
    useEffect(() => {
      if (!localStorage.getItem("token")) {
        navigate("/Login");
      }
  
      axios()
        .get("api/courses/"+id+"/payments/return?token="+token)
        .then((response) => {
  
        })
        .catch((error) => {
          if(!error.response)
          return
        });
        
    }, []);
  

  return( 
    <React.Fragment>
     <NavTop page='Courses'/>

    <Container className="Login" maxWidth="sm" style={{ marginTop: '4rem' }}>
      <h3>Thank you, we will be in touch!</h3>
    </Container>
    </React.Fragment>
     )



}
export default Success
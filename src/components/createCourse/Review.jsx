import React,{useState,useEffect} from "react";
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetail from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import NavTop from "../Homepage/NavTop";

import ListItemText from '@material-ui/core/ListItemText'

import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import "../Login/LoginStyle.css"
import { Submit } from "./Submit";
import axios from "../axios/axios";

export const Review = ({ formData, navigation }) => {
  const { go } = navigation;
  const {
    firstName,
    lastName,
    nickName,
    category,
    phone,
    email,
  } = formData;

const [error, setError] = useState();
const [cat, setCat] = useState();
useEffect(() => {
  axios()
  .put("/api/getCat/"+category)
  .then((response) => {
    setCat(response.data)
    
  })
  .catch((error) => {
    if(!error.response)
  return

  if(error.response.status==500)
 setError("you have alreade been registered with this category in the tournament, please choose another category")

});
}, []);
  const submit=()=>{
    axios()
    .put("/api/addUser/"+category)
    .then((response) => {
      setError("")
      go('submit')
      
    })
    .catch((error) => {
      if(!error.response)
    return

    if(error.response.status==500)
   setError("you have alreade been registered with this category in the tournament, please choose another category")

  });

  }

  return (
    <React.Fragment>
    <NavTop/>
    <Container className="Login" maxWidth='sm'>
      <h3>Review</h3>
      <RenderAccordion summary="Names" go={ go } details={[
        { 'First Name': firstName },
        { 'Last Name': lastName },

      ]} />
      <RenderAccordion summary="Category" go={ go } details={[
        { 'Category': cat },
      ]} />
       {error? <label style={{ color: "#960000", fontWeight: "bold" }}>
                    {error}
                  </label>:""}
      <RenderAccordion summary="Contact" go={ go } details={[
        { 'Phone': phone },
        { 'Email': email },
      ]} />
      <Button
        color="primary"
        variant="contained"
        style={{ marginTop: '1.5rem' }}
        onClick={() =>submit()}
      >
        Submit
      </Button>

    </Container>
    </React.Fragment>
  );
};

export const RenderAccordion = ({ summary, details, go }) => (
  <Accordion>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
    >{summary}</AccordionSummary>
    <AccordionDetail>
      <div>
        { details.map((data, index) => {
          const objKey = Object.keys(data)[0];
          const objValue = data[Object.keys(data)[0]];

          return <ListItemText key={index}>{`${objKey}: ${objValue}`}</ListItemText>

        }) }
        <IconButton
          color="primary"
          component="span"
          onClick={() => go(`${summary.toLowerCase()}`)}
        ><EditIcon /></IconButton>
      </div>
    </AccordionDetail>
  </Accordion>
)
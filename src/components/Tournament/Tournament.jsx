import React from "react";
import { useState, useEffect } from "react";
import FilterBar from "./Searchbar";
import Cardview from "./Cardview";
import NavTop from "../Homepage/NavTop";
import SimpleAccordion from "./Sidebar";
import axios from "../axios/axios";
import Input from "../Login/Input"
import  Pagination  from '@mui/material/Pagination'


function Tournament() {
  const [allData, setData] = useState("");
  const [count, setCount] = useState([]);
  const [links, setLinks] = useState([]);
  const [link, setLink] = useState();
  const [image, setImage] = useState("");
  useEffect(() => {
    axios()
      .get("/api/tournamentsP")
      .then((response) => {
        console.log(response.data.data)
        setData(response.data.data);
        setLinks(response.data.links)
        setCount(response.data.last_page)
        setLink(response.data.links[1].url)
      })
      .catch((error) => {
        if(!error.response)
        return
      });
  }, []);
  const changedUrl=(event)=>{
    axios().get("/api/tournamentsP?page="+event.target.textContent).then((response)=>{
      console.log(response)
      setData(response.data.data)
    }).catch((error)=>{if(!error.response)return})
        }
  return (
    <React.Fragment>
      <NavTop page="Tournaments"></NavTop>
 
    <div className="container">
 
      <div className="row">
        <div className="col-sm-3">

          <FilterBar />

        <SimpleAccordion>
          
        </SimpleAccordion>

        </div>
        <div className="col-sm-9">
          <div className="row">
            {!allData?"":allData.map((item) => (
              <Cardview items={item} key={item.id} />
            ))}
          </div>
          
        </div>
        <div className='row' style={{marginTop:'50px',marginBottom:'50px'}}>
        <div className='col-md-3'style={{marginTop:'10px'}}>
        
        </div>
        <div className='col-md-3' style={{marginTop:'10px'}}>
       
 
        </div>
        <div className='col-md-6' style={{marginTop:'10px'}}>
        <Pagination onChange={(event)=>changedUrl(event)} count={count} hidePrevButton hideNextButton color="primary"/>
        </div>
      </div>
       
      </div>
      
    </div>
    </React.Fragment>
  );
}

export default Tournament;

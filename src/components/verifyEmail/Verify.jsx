import React,{useState, useEffect} from "react";
import { Component, Fragment } from "react/cjs/react.production.min";
import { Navigate } from "react-router-dom";
import axios from '../axios/axios';

let Verify =()=>{
  let a=""
  const [verified, setVerified] = useState(false);
  const [message, setMessage] = useState("");
  const [navigate, setNavigate] = useState(false);

  const queryParams = new URLSearchParams(window.location.search)
    
  const EVURL = queryParams.get('email_verify_url')
  const sig = queryParams.get('signature')

  const URL=`${EVURL}&signature=${sig}`

  useEffect(() => {

    console.log(URL)
        axios().get(URL).
        then(response=>{response.status==204?setVerified(true):setVerified(false)}).
        catch(error=>{
     
          if(error.response.status==401){
    
            setNavigate(true)
            setVerified(false)
            setMessage(error.response.data.message)
      
          }
          
        })
        
  }, []);



return (
navigate?<Navigate to={'/Login?URL='+URL}/>:
  <div>
  <div class="container">
           <div class="row" style={{marginTop:40}}>
           <div class="col-sm-3">
           </div>
         
           <div style={{backgroundColor:'#222222', color:'#FFAA00'}} class="col-sm-6 success card shadow  border-success">
        <div class="card-body" style={{textAlign:"center"}} >
       
        <strong ><span className={verified?'text-success':'text-danger'} style={{fontSize:19,fontWeight:'bold'}}> {verified?'your email has been verified ':message}
</span></strong>

      </div> 
      </div>
      <div class="col-sm-3">

      </div>
 </div>
 </div>
 </div>

)


}



export default Verify
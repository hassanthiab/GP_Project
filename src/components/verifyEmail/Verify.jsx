import React,{useState, useEffect} from "react";
import { Component, Fragment } from "react/cjs/react.production.min";
import axios from '../axios/axios';

let Verify =()=>{

  const [verified, setVerified] = useState(false);
  const [message, setMessage] = useState("");
 
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search)
    
    const EVURL = queryParams.get('email_verify_url')
    const sig = queryParams.get('signature')
    const URL=`${EVURL}&signature=${sig}`
    console.log(URL)
        axios().get(URL).
        then(response=>{response.status==204?setVerified(true):setVerified(false)}).
        catch(error=>{
          setVerified(false)
          setMessage(error.response.data.message)
        })
        
  }, []);



return (

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
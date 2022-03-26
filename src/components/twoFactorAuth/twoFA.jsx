import React,{useState} from "react";
import { Component, Fragment } from "react/cjs/react.production.min";
import FancyInput from "../../components/Login/Input"
import axios from '../axios/axios';
import  { Navigate } from 'react-router-dom'
import { fontWeight } from "@mui/system";
import { SvgIcon } from "@material-ui/core";

let TwoFA=()=>{


  const [twoFA, setTwoFA] = useState(false);
  const [twoFAPop, setTwoFAPop] = useState(false);
  const [input, setInput] = useState({
    password:""
});
  const [errors, setErrors] = useState({
    password:""
  });

  const [qr, setQr] = useState("");
  const [codes, setCodes] = useState([]);



let Rcodes=[]
 codes.forEach((element,index) => {
  
   
    Rcodes.push(<li key={index}>{element}</li>)
      
  
    })
         

  const qr2FA=()=>{
     axios().get("/api/user/two-factor-qr-code",{ 
    }).then(response=> {
    
      setQr(response.data)
  
    }).catch(error=>{

     
     }) 
  }
  const codes2FA=()=>{
    axios().get("/api/user/two-factor-recovery-codes",{ 
    }).then(response=> {
    
      setCodes(response.data)
      
   
    }).catch(error=>{

     
     }) 

  }
  const enable2FA=()=>{
    
        axios().post("/api/user/two-factor-authentication",{ 
    }).then(response=> {
      if(response.status==200)
     {hideModal2FA()
      qr2FA()
        codes2FA()
        setTwoFA(true)
     
    }
    console.log(codes)
   
    

    }).catch((error)=>{
     
      if(error.response.data.message=="Password confirmation required."){
       axios().get("/api/user/confirmed-password-status").then(response=>{
        if(response.data.confirmed){
          hideModal2FA()
          qr2FA()
          codes2FA()
          setTwoFA(true)
       }
        else
        showModal2FA();

     

      }).catch(error=>{})
    }
     
     })
    
        
   
  }
  const confirm2FA=()=>{
    axios().post("/api/user/confirm-password",{ password:input['password']
    }).then(response=> {

      hideModal2FA()
      enable2FA()
 
    console.log(codes)
    }).catch((error)=>{
      console.log(error)
      let StateError={...errors}
              StateError['password']=error.response.data.errors['password']
              setErrors(StateError)
   
              console.log(errors['password'][0])
    
     })

  }


  const showModal2FA=()=>{
  
    setTwoFAPop(true)
   
  }
  const hideModal2FA=()=>{
    console.log("d")
    setTwoFAPop(false)
  }
  const disable2FA=()=>{
    console.log("d")
    axios().delete("/api/user/two-factor-authentication",{ 
    }).then(
      response=>{
        if(response.status==200){
          setTwoFA(false)
         
        }}
     ).catch(error=>{

   
      
      })
    
  }

  

  let changed=(event,inputId)=>{
           
    let Sinput={...input}
     Sinput[inputId]=event.target.value
     setInput(Sinput)
    
       
 }


  return(
  <Fragment>
   <div class="container">
            <div class="row" style={{marginTop:30}}>
            <div class="col-sm-1">
            </div>
          
            <div style={{backgroundColor:'#222222', color:'#FFAA00'}} class="col-sm-5 danger card shadow  border-danger">
         <div class="card-body" style={{justifyContent:"space-between",display:"flex",alignItems:"center"}} >
        
         <strong>Your two Factor Auth is <span className={twoFA?"text-success":"text-danger"} style={{fontSize:19,fontWeight:'bold'}}>{twoFA?"Enabled":"Disabled"}</span></strong>
        

         <button onClick={twoFA?disable2FA:enable2FA} type="button" class={twoFA?" btn btn-danger":"btn btn-success "}>
         {twoFA?"Disable":"Enable"}
</button>
       



       <div class={twoFAPop?"modal fade show":"modal"} style={{display:twoFAPop?'block':'none'}} tabindex="-1" id="myModal">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">2FA</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <input onChange={(event)=>changed(event,"password")} class="form-control" placeholder="password" type="password" />
        <label style={{color:'#960000' ,fontWeight:'bold'}}>{errors['password'][0]}</label>
      </div>
      <div class="modal-footer">
        <button onClick={hideModal2FA}  type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
        <button onClick={confirm2FA} type="button" class="btn btn-primary">Confirm</button>
      </div>
    </div>
  </div>
</div>
  

        
        </div>

        
            </div>
      
            <div class="col-sm-6">
            </div>
                </div>
               
               
                <div class="row" style={{marginTop:30}}>
                <div class="col-sm-1">
            </div>
            <div class="col-sm-5">
            <p>
            <button onClick={codes2FA} class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
              Reveal the codes
            </button>
            </p>
              <div class="collapse" id="collapseExample">
                 <div class="card card-body">
                 
                    {twoFA? <div>{ <span dangerouslySetInnerHTML={{__html:qr.svg}} />}            
                    <ul>
                      {Rcodes}
                    </ul>

                     </div>:"your 2FA is Disabled"}
               
                 </div>
              </div>
            </div>
                <div class="col-sm-6">
            </div>
                </div>
            </div>
    
    
    </Fragment>
  
  )






}
export default TwoFA
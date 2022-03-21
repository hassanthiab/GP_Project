import React from "react";
import { Component, Fragment } from "react/cjs/react.production.min";
import FancyInput from "../../components/Login/Input"
import axios from "axios";
import  { Navigate } from 'react-router-dom'
import { fontWeight } from "@mui/system";
import { SvgIcon } from "@material-ui/core";

export default class TwoFA extends Component{

  state={
    TwoFA:false,
    TwoFAPop:false,
    input:{
      password:""
  },
    errors:{
      password:""
    },
      qr:"",
      codes:[]
         
  } 

render(){

let codes=[]
  this.state.codes.forEach((element,index) => {
  
   
    codes.push(<li key={index}>{element}</li>)
      
  
    })
         

  const qr2FA=()=>{
     axios.get("http://localhost:8000/api/user/two-factor-qr-code",{ 
    }).then(response=> {
    
   
      this.setState({
        qr:response.data
      })
   
    }).catch(error=>{

     
     }) 
  }
  const codes2FA=()=>{
    axios.get("http://localhost:8000/api/user/two-factor-recovery-codes",{ 
    }).then(response=> {
    
   
      this.setState({
        codes:response.data
      })
   
    }).catch(error=>{

     
     }) 

  }
  const enable2FA=()=>{
    axios.defaults.withCredentials = true;
        axios.post("http://localhost:8000/api/user/two-factor-authentication",{ 
    }).then(response=> {
      if(response.status==200)
     {hideModal2FA()
      qr2FA()
        codes2FA()
      this.setState({
        TwoFA:true
        
      })
    }
    console.log(this.state.codes)
   
    

    }).catch((error)=>{
    
      if(error.response.data.message=="Password confirmation required."){
       axios.get("http://localhost:8000/api/user/confirmed-password-status").then(response=>{
        if(response.data.confirmed){
          hideModal2FA()
          qr2FA()
          codes2FA()
        this.setState({
          TwoFA:true
          
        })}
        else
        showModal2FA();

     

      }).catch(error=>{})
    }
     
     })
    
        
   
  }
  const confirm2FA=()=>{
    axios.post("http://localhost:8000/api/user/confirm-password",{ password:this.state.input.password
    }).then(response=> {

      hideModal2FA()
      enable2FA()
 
    console.log(this.state.codes)
    }).catch((error)=>{
      console.log(error)
      let StateError={...this.state.errors}
              StateError['password']=error.response.data.errors['password']
          this.setState({
            errors:StateError
            }
            
              )
              console.log(this.state.errors['password'][0])
    
     })

  }


  const showModal2FA=()=>{
  
    this.setState({
      TwoFAPop:true,
    })
  }
  const hideModal2FA=()=>{
    console.log("d")
    this.setState(
      {
        TwoFAPop:false
      }
      )
  }
  const disable2FA=()=>{
    console.log("d")
    axios.delete("http://localhost:8000/api/user/two-factor-authentication",{ 
    }).then(
      response=>{
        if(response.status==200){
          this.setState(
            {
              TwoFA:false,
          
            }
            )
        }}
     ).catch(error=>{

   
      
      })
    
  }

  

  let changed=(event,inputId)=>{
           
    let input={...this.state.input}
     input[inputId]=event.target.value
     this.setState(
         {
       
             input:input
         }
         )
       
 }


  return(
  <Fragment>
   <div class="container">
            <div class="row" style={{marginTop:30}}>
            <div class="col-sm-1">
            </div>
          
            <div style={{backgroundColor:'#222222', color:'#FFAA00'}} class="col-sm-5 danger card shadow  border-danger">
         <div class="card-body">
         <strong>Your two Factor Auth is <span className={this.state.TwoFA?"text-success":"text-danger"} style={{fontSize:19,fontWeight:'bold'}}>{this.state.TwoFA?"Enabled":"Disabled"}</span></strong>
        

         <button onClick={this.state.TwoFA?disable2FA:enable2FA} style={{marginLeft:60}} type="button" class={this.state.TwoFA?" btn btn-danger":"btn btn-success "}>
         {this.state.TwoFA?"Disable":"Enable"}
</button>
       



       <div class={this.state.TwoFAPop?"modal fade show":"modal"} style={{display:this.state.TwoFAPop?'block':'none'}} tabindex="-1" id="myModal">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">2FA</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <input onChange={(event)=>changed(event,"password")} class="form-control" placeholder="password" type="password" />
        <label style={{color:'#960000' ,fontWeight:'bold'}}>{this.state.errors['password'][0]}</label>
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
                 
                    {this.state.TwoFA? <div>{ <span dangerouslySetInnerHTML={{__html:this.state.qr.svg}} />}            
                    <ul>
                      {codes}
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



}
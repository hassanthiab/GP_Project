import React from "react";
import { Component, Fragment } from "react/cjs/react.production.min";
import axios from "axios";
class Verify extends Component{

    state={
      verified:false,
      message:"",
      vSent:false,
    }
   
render(){
  let sendEmailV=()=>{
   
    axios.defaults.withCredentials=true
    axios.post('http://localhost:8000/api/email/verification-notification').
    then(response=>{
      if(response.status==202)
      this.setState({vSent:true})
      else if(response.status==204)
      this.setState({verified:true})
    }
 
      ).
    catch(error=>{ 
      this.setState({vSent:false,
        message:error.response.data.message})
})
  }

return (

  <Fragment>
  <div class="container">
           <div class="row" style={{marginTop:40}}>
           <div class="col-sm-3">
           </div>
         <div style={{backgroundColor:'#222222', color:'#FFAA00'}} class="col-sm-6 success card shadow  border-success">
        <div class="card-body" style={{textAlign:"center"}} >
       
        <strong ><span className={this.state.verified?'text-success':'text-danger'} style={{fontSize:19,fontWeight:'bold'}}> {this.state.verified?'your email is already verified ':" the verification email has been sent to ..@..com, please check your email "}
</span></strong>
<a onClick={sendEmailV} style={{fontSize:19,fontWeight:'bold'}} href="#">resend email</a>
      </div> 
      </div>

      <div class="col-sm-3">

      </div>
 </div>
 </div>
 </Fragment>

)
}

}



export default Verify
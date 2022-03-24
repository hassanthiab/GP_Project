import React from "react";
import { Component, Fragment } from "react/cjs/react.production.min";
import axios from "axios";
class Verify extends Component{

    state={
      verified:false,
      message:"",
    }
  componentDidMount(){
    axios.defaults.withCredentials=true
    const queryParams = new URLSearchParams(window.location.search)
    
    const EVURL = queryParams.get('email_verify_url')
    const sig = queryParams.get('signature')
    const URL=`${EVURL}&signature=${sig}`
        axios.get(URL).
        then(response=>{response.status==204?this.setState({verified:true}):this.setState({verified:false})}).
        catch(error=>this.setState({verified:false,
        message:error.response.data.message}))
      }
render(){

return (

  <div>
  <div class="container">
           <div class="row" style={{marginTop:40}}>
           <div class="col-sm-3">
           </div>
         
           <div style={{backgroundColor:'#222222', color:'#FFAA00'}} class="col-sm-6 success card shadow  border-success">
        <div class="card-body" style={{textAlign:"center"}} >
       
        <strong ><span className={this.state.verified?'text-success':'text-danger'} style={{fontSize:19,fontWeight:'bold'}}> {this.state.verified?'your email has been verified ':this.state.message}
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

}



export default Verify
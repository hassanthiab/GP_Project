import { Fragment } from "react/cjs/react.production.min"
import { useState,useEffect } from "react";
import React from "react";
import { Button } from '@material-ui/core'
import axios from '../axios/axios';
import styled from 'styled-components'
import horse from './horsee.jpg'
const Input = styled('input')({
  display: 'none',
});

let test=()=>{
  const a=localStorage.getItem('type')
  const [profileimage, setImage] = useState();
  
  
  const imageHandler = (e) => {
        setImage(e.target.files[0])
    console.log(e.target.files[0])
  }
    useEffect(() => {
     
      
      axios().get("/api/"+a+"profilePic").then(response=> {
     
        console.log("A")
        let array=[]

      
        array[0]=response.data
       
        
      let a= "data:image/*;base64," + response.data
        
      setImage(a)

       console.log(response)
       
      }).catch(error=>{
       console.log(error)
      })

    

      
     }, []);
     
  let changePf=(e)=>{
    e.preventDefault()
    let file=profileimage
    let formdata=new FormData()
    formdata.set('image',file)
    console.log(formdata.get('image'))
    axios().post("/api/profilePic",formdata).then(response=> {}).catch(error=>{})
  }



return(
  <Fragment>
  <img src={profileimage} alt="" id="img" className="img" />
       <form onSubmit={changePf}>
       
     <label htmlFor="image"> upload </label>
     <input name="image" id='image' type='file' onChange={imageHandler}/>
     <button type="submit" onClick={changePf}>save</button>
                </form>
                </Fragment>
                )
   

}
export default test
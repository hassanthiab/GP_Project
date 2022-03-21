import React from 'react'
import img from "../../Images/LoginBackground.jpg"
import { Grow } from '@material-ui/core'
import Container from '../Login/ContainerBox'
function Cards() {
  return (
    <Grow in="true"   style={{ transformOrigin: '0 0 0' }}>
   <React.Fragment>   
<h1 className='text-center text-white text-capitalize'>Check out our Tournaments!</h1>
<div class="container">
  <div class="row">
    <div class="col-sm  hover-zoom">
    <div class="card" style={{width:"18 rem"}}>
  <img src={img} class="card-img-top" alt="..." />
  <div class="card-body">
    <h5 class="card-title">Test</h5>
    <p class="card-text">Test.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>
    </div>
    <div class="col-sm  hover-zoom">
    <div class="card" style={{width:"18 rem"}}>
  <img src={img} class="card-img-top" alt="..." />
  <div class="card-body">
    <h5 class="card-title">Test</h5>
    <p class="card-text">Test.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>
    </div>
    <div class="col-sm  hover-zoom">
    <div class="card" style={{width:"18 rem"}}>
  <img src={img} class="card-img-top" alt="..." />
  <div  class="card-body">
    <h5 class="card-title ">Test</h5>
    <p class="card-text">Test.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>
    </div>
  </div>
</div>

   </React.Fragment>
   </Grow>   
  )
}

export default Cards

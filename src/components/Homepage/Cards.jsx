import React from 'react'
import img from "../../Images/LoginBackground.jpg"
import { Grow } from '@material-ui/core'
function Cards() {
  return (
    <Grow in="true"   style={{ transformOrigin: '0 0 0' }}>
   <React.Fragment>   
<h1 className='text-center text-dark text-capitalize'>Check out our Tournaments!</h1>
<div class="container">
  <div class="row">
    <div class="col-sm  hover-zoom">
    <div class="card" style={{width:"18 rem"}}>
  <img  src={img} class="card-img-top" alt="..." />
  <div class="card-body">
    <p class="card-text">Test</p>



  </div>
</div>
    </div>
    <div class="col-sm  hover-zoom">
    <div class="card" style={{width:"18 rem"}}>
  <img src={img}  class="card-img-top" alt="..." />
  <div class="card-body">
    <p class="card-text">Test</p>
  </div>
</div>
    </div>
    <div class="col-sm  hover-zoom">
    <div class="card" style={{width:"18 rem"}}>
  <img src={img}  class="card-img-top" alt="..." />
  <div class="card-body">
    <p class="card-text">Test</p>
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

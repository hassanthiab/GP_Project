import React from 'react'
import { Link } from 'react-router-dom'
import img from "../../Images/LoginBackground.jpg"
function Carousel() {
  return (
  <React.Fragment>
<div id="MainPageCrousel" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#MainPageCrousel" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#MainPageCrousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#MainPageCrousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src={img}   class="d-block w-100" alt="..." />
    </div>
    <div class="carousel-item">
      <img src={img}   class="d-block w-100" alt="..." />
    </div>

    <Link to="/Signup">
    <div class="carousel-item">
      <img src={img}   class="d-block w-100" alt="..." />
    </div>
    </Link>

  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#MainPageCrousel" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#MainPageCrousel" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>


  </React.Fragment>
  )
}

export default Carousel

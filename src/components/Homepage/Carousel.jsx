import React from "react";
import { Link } from "react-router-dom";
import Img from "../../Images/LoginBackground.jpg";
import styled from "styled-components";
import Container from "../Login/ContainerBox";
function Carousel() {
  return (
    <React.Fragment>
      <div
        id="carouselExampleCaptions"
        class="carousel slide "
        data-bs-ride="carousel"
      >
        <div class="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="0"
            class="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div class="carousel-inner w-100">
          <div class="carousel-item active ">
            <img src={Img} class="d-block w-100" alt="..." />

     
              <div class="carousel-caption d-none d-md-block">
              <Container style={{marginBottom:'30%'}}>
                  <h5><br/>About us</h5>
              
                  <p>
                  <br/><br/>
      The Nablus Equestrian Club is a private gated equestrian facility with the beautiful treasure coast region of Palestine.
       Located at Nablus-Rafidia.<br/><br/>

  Equestrian riders enjoy a privileged equestrian lifestyle, and exclusive facility amenities.
 Including a lighted covered arena, several private lighted sand and grass arenas, 
 as well as priority access to our private events, unique programs,
  and horse shows.<br/><br/> 

We currently offer lessons, a children's riding acadamy, boarding and training. 

At Nablus Equestrian Club we live the equestrian lifestyle at its best.<br/><br/>
+970599555566 / Equestrian116@gmail.com

                  </p>
                </Container>
              </div>
            
          </div>
          <div class="carousel-item">
            <img src={Img} class="d-block w-100" alt="..." />

           
              <div class="carousel-caption d-none d-md-block">
                <Container style={{marginBottom:'35%'}}>
                  <h5><br/> take a tour</h5>
                  <p>
                  <br/><br/> 
                   <Link to={'/UserTournament'} class="btn btn-primary">What's new?</Link>
                  </p>
                  <p>
                  <Link to={'/UserTournament'} class="btn btn-primary">Check out tournaments </Link>
                  </p>
                </Container>
              </div>
         
          </div>
          <div class="carousel-item">
            <img src={Img} class="d-block w-100" alt="..." />

            <Link to="/Signup">
              <div class="carousel-caption d-none d-md-block">
              <Container style={{marginBottom:'35%'}}>
                  <h5>Third slide label</h5>
                  <p>
                    Some representative placeholder content for the third slide.
                  </p>
                </Container>
              </div>
            </Link>
          </div>
        </div>
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </React.Fragment>
  );
}

export default Carousel;

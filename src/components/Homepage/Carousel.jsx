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

            <Link to="/Signup">
              <div class="carousel-caption d-none d-md-block">
                <Container>
                  <h5>Third slide label</h5>
                  <p>
                    Some representative placeholder content for the third slide.
                  </p>
                </Container>
              </div>
            </Link>
          </div>
          <div class="carousel-item">
            <img src={Img} class="d-block w-100" alt="..." />

            <Link to="/Login">
              <div class="carousel-caption d-none d-md-block">
                <Container>
                  <h5>Third slide label</h5>
                  <p>
                    Some representative placeholder content for the third slide.
                  </p>
                </Container>
              </div>
            </Link>
          </div>
          <div class="carousel-item">
            <img src={Img} class="d-block w-100" alt="..." />

            <Link to="/Signup">
              <div class="carousel-caption d-none d-md-block">
                <Container>
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

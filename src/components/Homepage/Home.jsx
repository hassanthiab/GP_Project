  import React  from 'react'
import Carousel from './Carousel'
import Cards from './Cards'
import Footer from './Footer'
import Filters from '../Leaderboard/Filters'
import NavTop from './NavTop'
import {useNavigate,Navigate } from "react-router-dom";
import { useEffect } from 'react'
function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.getItem("token")?navigate("/profile"):navigate("/");
  }, []);

  return (
    <React.Fragment>
            <NavTop page="home"></NavTop>
   <Carousel></Carousel>
    <Cards></Cards>
    <Filters></Filters>
    <Footer></Footer>

      </React.Fragment>

  );
}
export default Home;

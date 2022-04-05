

import React from 'react'
import Carousel from './Carousel'
import Cards from './Cards'
import Footer from './Footer'
import Filters from '../Leaderboard/Filters'
import Pagetop from './Pagetop'

function Home() {
  return (

    
    <React.Fragment>
            <Pagetop></Pagetop>
   <Carousel></Carousel>
    <Cards></Cards>
    <Filters></Filters>
    <Footer></Footer>

      </React.Fragment>

  );
}
export default Home;

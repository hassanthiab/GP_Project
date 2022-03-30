import React from 'react'
import Carousel from './Carousel'
import Cards from './Cards'
import Footer from './Footer'
import Filters from '../Leaderboard/Filters'

function Home() {
  return (

    <body style={{backgroundColor:"#101522"}}>
    <React.Fragment>
   <Carousel></Carousel>
    <Cards></Cards>
    <Filters></Filters>
    <Footer></Footer>
      </React.Fragment>
    </body>
  
 
  )
}
export default Home

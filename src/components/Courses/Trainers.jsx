import React from 'react'
import NavTop from '../Homepage/NavTop'
import TrainerCard from './TrainerCard'
import NavBar from '../Dashboard/Sidebar'

function Trainers() {
  return (
    <React.Fragment>
    {localStorage.getItem('type')=='admin/'?<NavBar/>:<NavTop page='Courses'/>}

         

      <TrainerCard/> 
          
    </React.Fragment>
  )
}

export default Trainers

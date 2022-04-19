import { Container } from '@mui/material'
import React,{useState} from 'react'
import SideBar from './Sidebar'
import Tournamentlist from './Tournamentlist'
import UserList from './UserList'
import NewUser from './newTrainer'
import NewTournament from './newTournament'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Widget from './Widget'
import WidgetSml from './WidgetSml'
function Dashboard() {

  return (
    <React.Fragment>
    <SideBar

/>

<div className='container'> 
  <div className='row'>
    <div className='col-1'>
      
    </div>
    <div  style={{display:"flex"}} className='col-4'>
    <WidgetSml></WidgetSml>

    </div>
    <div className='col'>
    <Widget></Widget>
    </div>
  </div>
  <div className='row'>
    <div className='col-1'>
      
    </div>
    <div  style={{display:"flex"}} className='col-4'>
    <WidgetSml></WidgetSml>

    </div>
    <div className='col'>
    <Widget></Widget>
    </div>
  </div>
</div>
    </React.Fragment>

  
  )
}
export default Dashboard

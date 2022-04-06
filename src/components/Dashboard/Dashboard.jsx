import { Container } from '@mui/material'
import React,{useState} from 'react'
import SideMenu from './Sidebar'
import Tournamentlist from './Tournamentlist'
import UserList from './UserList'
import NewUser from './newUser'
import NewTournament from './newTournament'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
function Dashboard() {

  return (
    <SideMenu

  />
  
  )
}
export default Dashboard

import { Container } from '@mui/material'
import React from 'react'
import Sidebar from './Sidebar'
import Tournamentlist from './Tournamentlist'
import UserList from './UserList'
import NewUser from './newUser'
import NewTournament from './newTournament'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
function Dashboard() {
  return (
               <Sidebar></Sidebar>
  
  )
}
export default Dashboard

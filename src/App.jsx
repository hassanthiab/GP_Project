import React from "react";
import Pagetop from "./components/Homepage/Pagetop";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login";
import Signup from "./components/Sign up/Signup";
import Page from "./components/ForgotPassword/Page";
import NewPass from "./components/ForgotPassword/NewPass";
import "./index.css"
import TwoFA from "./components/twoFactorAuth/twoFA";
import TwoFALogin from "./components/twoFactorAuth/twoFALogin";
import Home from "./components/Homepage/Home";
import Tournament from "./components/Tournament/Tournament";
import ProfileSettings from "./components/ProfileSettings/ProfileSettings";
import Verify from "./components/verifyEmail/Verify";
import RequireVerification from "./components/verifyEmail/RequireVerification";
import AfterRegisterVerify from "./components/verifyEmail/AfterRegisterVerify";
import Test from "./components/test/test";
import AddTrainer from './components/TrainerRegister/SignupTrainer'
import Dashboard from "./components/Dashboard/Dashboard";
import Courses from "./components/Courses/Trainers"
import NewTournament from './components/Dashboard/newTournament'
import Success from './components/Courses/Success'

import UserList from "./components/Dashboard/UserList";
import { MultiStepForm } from "./components/createCourse/MultiStep";
import UserSchedule from "./components/createCourse/cs";
import TrainerSchedule from "./components/Trainer/courseScheduler";

import Tournamentlist from './components/Dashboard/Tournamentlist'
import EditTournament from './components/Dashboard/editTournament'
import NavTop from "./components/Homepage/NavTop"
import NewTrainer from './components/Dashboard/newTrainer';
import TrainersList from "./components/Dashboard/UserList";
import EditTrainer from "./components/Dashboard/editTrainer";
import TrainerCard from "./components/Courses/TrainerCard";
import Trainers from "./components/Courses/Trainers";
import CoursesGrid from "./components/Courses/Courses";
import AddHorse from "./components/Dashboard/AddHorse";
import EditHorse from './components/Dashboard/editHorse'
import HorseList from "./components/Dashboard/Horseslist";
import AllNotifications from "./components/Notification/AllNotifications";
function App() {
  return (
    <Router>

      <Routes>
       <Route path="/Dashboard" element={<Dashboard></Dashboard>} />
        <Route path="/Login/ForgotPassword" element={<Page />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup></Signup>} />
        <Route path="/reset-password" element={<NewPass />} />
        <Route path="/Profile" element={<ProfileSettings />} />
        <Route path="/twoFA" element={<TwoFA />} />
        <Route path="/FAcode" element={<TwoFALogin />} />
        <Route path="/UserTournament" element={<Tournament></Tournament>} />
        <Route path="/verify-email" element={<Verify />} />
        <Route path="/verification" element={<AfterRegisterVerify />} />
        <Route path="/require-verification" element={<RequireVerification />} />
        <Route path="/Courses" element={<Courses/>} />
        <Route path="/Courses/:id" element={<CoursesGrid></CoursesGrid>} />
        <Route path="/return/:id" element={<Success/>} />
        <Route path="/Horses" element={<HorseList></HorseList>} />
        <Route path="/addHorse" element={<AddHorse></AddHorse>} />
        <Route path="/Horse/:id" element={<EditHorse></EditHorse>} />

=
        <Route path="/notifications" element={<AllNotifications></AllNotifications>} />
        <Route path="/Schedule" element={<TrainerSchedule></TrainerSchedule>} />
        {/* <Route path="/ScheduleUser" element={<UserSchedule></UserSchedule>} /> */}
        <Route path="/ScheduleUser" element={<UserSchedule></UserSchedule>} />

        <Route path="/addTournament" element={<NewTournament />} />
       <Route path="/Tournaments" element={<Tournamentlist></Tournamentlist>} />
       <Route path="/Tournament/:id" element={<EditTournament></EditTournament>} />

       <Route path="/addTrainer" element={<NewTrainer />} />
       <Route path="/Trainers" element={<TrainersList></TrainersList>} />
       <Route path="/Trainer/:id" element={<EditTrainer></EditTrainer>} />

        {/* <Route path="/Trainers/AddUser" element={<NewUser />} /> */}
        <Route path="/" element={<Home/>} />

      </Routes>
    </Router>
  );
}
export default App;
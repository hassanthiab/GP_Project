
import React from "react";
import Pagetop from "./components/Homepage/Pagetop";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Login from "./components/Login/Login";
import Signup from "./components/Sign up/Signup";
import Page from "./components/ForgotPassword/Page"
import NewPass from "./components/ForgotPassword/NewPass";

import TwoFA from "./components/twoFactorAuth/twoFA"
import TwoFALogin from "./components/twoFactorAuth/twoFALogin"
import Home from "./components/Homepage/Home";
import Tournament from "./components/Tournament/Tournament";
import ProfileSettings from "./components/ProfileSettings/ProfileSettings";
import Verify from "./components/verifyEmail/Verify";
import RequireVerification from './components/verifyEmail/RequireVerification'
import AfterRegisterVerify from './components/verifyEmail/AfterRegisterVerify'
function App()
{
  return( 
    
  <Router >
    <Pagetop />
<Routes>
      <Route  path="/Login/ForgotPassword"   element={<Page />} />
      <Route  path="/Login" element={<Login />} />
      <Route  path="/Signup"   element={<Signup></Signup>} />
      <Route  path="/reset-password"   element={<NewPass />} />
      <Route path="/Profile" element={<ProfileSettings></ProfileSettings>} />
      <Route  path="/twoFA"   element={<TwoFA />} />
      <Route  path="/FAcode"   element={<TwoFALogin />} />
      <Route path="/hello" element={<Tournament></Tournament>} />
      <Route path="/verify-email" element={<Verify/>} />
      <Route path="/verification" element={<AfterRegisterVerify/>} />
      <Route path="/require-verification" element={<RequireVerification/>} />
      <Route path="/" element={<Home></Home>} />
    </Routes>

    

  </Router>
  );
}
export default App;

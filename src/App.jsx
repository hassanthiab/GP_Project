
import React from "react";
import Pagetop from "./components/Homepage/Pagetop";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Login from "./components/Login/Login";
import Signup from "./components/Sign up/Signup";
import Page from "./components/ForgotPassword/Page"
import NewPass from "./components/ForgotPassword/NewPass";
import TwoFA from "./components/twoFactorAuth/twoFA"
function App()
{
  return( 
  <Router>
  <Pagetop />

    <Routes>
      <Route  path="/Login" element={<Login />} />
      <Route  path="/Signup"   element={<Signup></Signup>} />
      <Route  path="/Login/ForgotPassword"   element={<Page />} />
      <Route  path="/reset-password"   element={<NewPass />} />
      <Route  path="/twoFA"   element={<TwoFA />} />
    </Routes>
    

  </Router>
  );
}
export default App;

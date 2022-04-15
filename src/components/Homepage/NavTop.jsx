import { Button,Navbar,NavDropdown,Container,Nav} from 'react-bootstrap';
import React from 'react'
import { Link } from 'react-router-dom'
import axios from "../axios/axios";

function NavTop() {
    let logoutReq = () => {
        if (localStorage.getItem("token")) {
          axios(localStorage.getItem("token"))
            .delete("/api/loagout")
            .then()
            .catch((error) => {
              if (!error.response) return;
            });
          localStorage.clear();
        }
      };
  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
  <Container>
<Link to="/">
<Navbar.Brand>React-Bootstrap</Navbar.Brand>
</Link>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="me-auto">
        <Link to="">
        <Nav.Link>Features</Nav.Link>
        </Link>
        <Link to="">
        <Nav.Link>Pricing</Nav.Link>
        </Link>
      <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
      <Link to="">
      <NavDropdown.Item>Profile</NavDropdown.Item>
        </Link>
        
        <NavDropdown.Divider />
        <Link to="">
        <NavDropdown.Item>Horse Profile</NavDropdown.Item>
        </Link>
        <NavDropdown.Divider />
        <Link to="">
        <NavDropdown.Item>Something</NavDropdown.Item>
        </Link>

 

   
      </NavDropdown>
    </Nav>
    <Nav>
        <Link to="/Signup">
        <Button variant="outline" >Sign up</Button>
        </Link>
        <Link to="/Login">
        <Button variant="outline">Login</Button>
        </Link>
    <Button variant="outline" onClick={logoutReq} to="/">Logout</Button>
    </Nav>
  </Navbar.Collapse>
  </Container>  
</Navbar>
    </div>
  )
}

export default NavTop

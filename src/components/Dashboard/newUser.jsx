import React,{useState}  from 'react'
import Button from '../Login/Button';
import Input from '../Login/Input';
import "./newUser.css";
import Navbar from './Sidebar'
export default function NewUser() {
  const [inactive, setInactive] = useState(false);
  return (
      <React.Fragment>

          <Navbar

        />
  
    <div className="newUser divcont container">
        <div>
    <div class="row">
        <div class="col-12">
        <h1 className="newUserTitle">New User</h1>
    <form className="newUserForm">
      <div className="newUserItem">
        <label>Username</label>
        <Input type="text" placeholder="john" />
      </div>
      <div className="newUserItem">
        <label>Full Name</label>
        <Input type="text" placeholder="John Smith" />
      </div>
      <div className="newUserItem">
        <label>Email</label>
        <Input type="email" placeholder="john@gmail.com" />
      </div>
      <div className="newUserItem">
        <label>Password</label>
        <Input type="password" placeholder="password" />
      </div>
      <div className="newUserItem">
        <label>Phone</label>
        <Input type="text" placeholder="+1 123 456 78" />
      </div>
      <div className="newUserItem">
        <label>Address</label>
        <Input type="text" placeholder="New York | USA" />
      </div>
      <div className='col-4'>

      </div>
      <div className='col-5'>
      <Button nameButton="Confirm"></Button>
          </div>

      <div className='col-4'>
          
          </div>
    </form>
        </div>
              
              </div>
              </div>
  </div>
  </React.Fragment>
  )
}

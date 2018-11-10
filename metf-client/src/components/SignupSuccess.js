import React from 'react';
import { NavLink } from 'react-router-dom';

const SignupSuccess = (props) => {

  return (
    <form onSubmit={props.handleSignupSubmit} className="ui form success">
      <div className="field">
        <input  onChange={props.handleNameInput}
                  placeholder="Username"
                  type="text"
                  value={props.nameInput}
                />
      </div>
      <div className="field">
        <input  type='submit'
                value="Signup"
                className="ui submit button" />
       </div>
       <div className="ui success message">
          <div className="header">Form Completed</div>
          <p>Welcome! You have successfully created your account.</p>
        </div>

       <div className="field">
        <p>Please enter your username to login.</p>
         <NavLink className="ui button"
                  to="/Login"
                  >Login</NavLink>
      </div>
    </form>
  )
}

export default SignupSuccess;

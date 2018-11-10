import React from 'react'
import { NavLink } from 'react-router-dom';

const Login = (props) => {
  return (
    <form onSubmit={props.handleLoginSubmit} className="ui form">
      <div className="field">
        <input  onChange={props.handleNameInput}
                  placeholder="Username"
                  type="text"
                  value={props.nameInput}
                />
      </div>
      <div className="field">
        <input  type='submit'
                value="Login"
                className="ui submit button" />
       </div>
       <div className="field">
         <p>Don't have an account?</p>
         <NavLink className="ui button"
                  to="/Signup"
                  >Signup</NavLink>
      </div>
    </form>
  )
}

export default Login;

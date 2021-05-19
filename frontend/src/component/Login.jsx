import React, { useContext, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import {UserContext} from '../App';
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();
export default function Login(){

  const {state, dispatch} = useContext(UserContext);

  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginUser = async(e)=>{
    e.preventDefault();

    const res = await fetch('/login', {
      method:"POST",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email, password
      })
    });

    const data = res.json();
    if(res.status === 400 || !data){
      window.alert("Invalid Credentials");
      // toast.error('Invalid Credentials', {position: toast.POSITION.TOP_CENTER});
    }
    else{
      dispatch({type:'USER', payload:true});
      window.alert("login Successfull");
      toast.success('Login Sucsess', {position: toast.POSITION.TOP_CENTER});
      history.push("/");
    }
  }

  return(
    <>
    <div className="container signup flex-center">
      <div className="card login w-50">
        <h4 className="card-header py-3 primary-color text-white font-weight-bold">Login</h4>
        <div className="card-body">
          <form method="POST">
            <div className="md-form">
              <label htmlFor="email"><i className="fas fa-envelope-open-text"></i> Email</label>
              <input type="email" className="form-control" id="email" name="email" value={email} 
              onChange={(e)=> setEmail(e.target.value)} required/>
            </div>
            <div className="md-form">
              <label htmlFor="pass"><i className="fas fa-user-lock"></i> Password</label>
              <input type="password" className="form-control" id="pass" name="password" value={password}
              onChange={(e)=> setPassword(e.target.value)} required/>
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary" onClick={loginUser}>Login</button>
            </div>
            <div className="text-center">
              <p>If not registered <NavLink to="/register">Register</NavLink></p>
            </div>
          </form>
        </div>
      </div>
    </div>
    </>
  );
}
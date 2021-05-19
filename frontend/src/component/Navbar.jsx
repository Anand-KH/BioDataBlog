import React, { useContext } from 'react';
import {NavLink} from 'react-router-dom'
import {UserContext} from '../App';

export default function Navbar(){

  const {state, dispatch} = useContext(UserContext);

  const RenderMenu = () => {
    if(state){
      return(
        <>
          <li className="nav-item px-1">
            <NavLink className="nav-link" activeClassName="active-nav" to="/">Home</NavLink>
          </li>
          <li className="nav-item px-1">
            <NavLink className="nav-link" to="/about" activeClassName="active-nav">About</NavLink>
          </li>
          <li className="nav-item px-1">
            <NavLink className="nav-link" to="/contact" activeClassName="active-nav">Contact</NavLink>
          </li>
          <li className="nav-item px-1">
            <NavLink className="nav-link" to="/logout">Logout</NavLink>
          </li>
        </>
      );
    } else{
      return(
        <>
          <li className="nav-item px-1">
            <NavLink className="nav-link" to="/" activeClassName="active-nav">Home</NavLink>
          </li>
          <li className="nav-item px-1">
            <NavLink className="nav-link" to="/about" activeClassName="active-nav">About</NavLink>
          </li>
          <li className="nav-item px-1">
            <NavLink className="nav-link" to="/contact" activeClassName="active-nav">Contact</NavLink>
          </li>
          <li className="nav-item px-1">
            <NavLink className="nav-link" to="/login" activeClassName="active-nav">Login</NavLink>
          </li>
          <li className="nav-item px-1">
            <NavLink className="nav-link" to="/register" activeClassName="active-nav">Registration</NavLink>
          </li>
        </>
      );
    }
  }
  
  return(
    <>
    <nav className="navbar navbar-expand-lg navbar-dark bg-info fixed-top">
      <NavLink className="navbar-brand font-weight-bold text-white" to="/">Blog</NavLink>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#basicExampleNav"
        aria-controls="basicExampleNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse fontcolor" id="basicExampleNav">
        <ul className="navbar-nav ml-auto">
          <RenderMenu/>
        </ul>
      </div>
    </nav>
    </>
  );
}
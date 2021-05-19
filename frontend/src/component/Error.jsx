import React from 'react';
import { NavLink } from 'react-router-dom';
import error from '../652.jpg';
export default function Error(){
  return(
    <>
    <div className="">
      <img src={error} alt="error" className="img-fluid errro-img"/>
    </div>
    <div className="text-center">
      <h2 className="text-white err">Oops page not found....</h2>
      <NavLink to="/" className="btn btn-round btn-primary">Back to Home</NavLink>
    </div>
    </>
  );
}
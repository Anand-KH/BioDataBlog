import React, { useState } from 'react';
import {NavLink, useHistory} from 'react-router-dom';
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();
export default function Register(){

  const history = useHistory();
  const [user, setUser] = useState({
    name:"", email:"", phone:"", work:"", password:"", confirmpassword:"", dob:""
  });

  const handleChange=(e)=>{
    setUser({
      ...user,
      [e.target.name]:e.target.value
    });
  }

  const postData= async(e)=>{
    e.preventDefault();

    if(user.password !== user.confirmpassword){
      window.alert('please match the password');
    }
    else{
      const {name, email, phone, work, password, confirmpassword, dob} = user;
      const res = await fetch("/register", {
        method:"POST",
        headers:{
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name, email, phone, work, password, confirmpassword, dob
        })
      });

      const data = await res.json();
      if(res.status === 422 || !data){
        // window.alert("Invalid Registration");
        toast.error('Invalid Registration', {position: toast.POSITION.TOP_CENTER});
        console.log("Invalid Registration");
      }
      else{
        // window.alert("Registration Success");
        toast.success('Registration Sucsess', {position: toast.POSITION.TOP_CENTER});
        console.log("Registration Success");
        history.push("/login");
      }
    }
  };

  return(
    <>
    <div className="container signupreg flex-center">
      <div className="card mb-5">
        <h4 className="card-header py-3 text-center text-white primary-color">Register</h4>
        <div className="card-body">
          <form method="POST">
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                <div className="md-form">
                  <label htmlFor="name"><i className="fas fa-user"></i> Full Name</label>
                  <input type="text" className="form-control" name="name" id="name" value={user.name} onChange={handleChange} pattern="^[a-zA-Z\s]*$" required/>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                <div className="md-form">
                  <label htmlFor="email"><i className="fas fa-envelope-open-text"></i> Email</label>
                  <input type="email" className="form-control" name="email" id="email" value={user.email} onChange={handleChange} pattern="^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" required/>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                <div className="md-form">
                  <label htmlFor="phone"><i className="fas fa-phone"></i> Phone Number</label>
                  <input type="tel" className="form-control" name="phone" id="phone" value={user.phone} onChange={handleChange} pattern="^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$" required/>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                <div className="md-form">
                  <label htmlFor="work"><i className="fas fa-briefcase"></i> work</label>
                  <input type="text" className="form-control" name="work" id="work" value={user.work} onChange={handleChange} pattern="^[a-zA-z]*$" required/>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                <div className="md-form">
                  <label htmlFor="pass"><i className="fas fa-user-lock"></i> Password</label>
                  <input type="password" className="form-control" name="password" id="pass" value={user.password} onChange={handleChange} required/>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                <div className="md-form">
                  <label htmlFor="cpass"><i className="fas fa-user-lock"></i> Confirm Password</label>
                  <input type="password" className="form-control" name="confirmpassword" id="cpass" value={user.confirmpassword} onChange={handleChange} required/>
                </div>
              </div>
            </div>
            <div className="md-form">
              <label htmlFor="date">Date of Birth</label>
              <input type="date" className="form-control" name="dob" id="date" value={user.dob} onChange={handleChange} min='1989-01-01' max='2016-01-01' required/>
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-success" onClick={postData}>Register</button>
              <p className="pt-3">Already registered <NavLink to="/login" className="txet-primary">Login</NavLink></p>
            </div>
          </form>
        </div>
      </div>
    </div>
    </>
  );
}
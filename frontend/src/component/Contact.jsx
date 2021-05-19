import React, { useEffect, useState } from 'react';

export default function Contact(){

  const [userData, setUserData] = useState({name:"", email:"", phone:"", message:""});
  const callContact = async()=>{
    try{
      const res = await fetch('/contact', {
        method: "GET",
        headers:{
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include"
      });

      const data = await res.json();
      // console.log(data);
      setUserData({...userData, name:data.name, email:data.email, phone:data.phone});
      // console.log(userData)

      if(!res.status === 200){
        const error = new Error(res.error);
        throw error;
      }

    }catch(err){
      console.log(err);
    }
  }

  useEffect(() => {
    callContact();
  }, []);

  //storing data in states
  const handleInput = (e) =>{
    setUserData({
      ...userData,
      [e.target.name]:e.target.value
    });
  };

  //send the data to backend
  const submitForm = async (e)=>{
    e.preventDefault();

    const {name, email, phone, message} = userData;

    const res = await fetch('/contactpost', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name, email, phone, message
      })
    });

    const data = await res.json();
    if(!data){
      console.log('Message not sent');
      // window.alert('Message not sent');
    }else{
      console.log('Message sent');
      // window.alert('Message sent');
      setUserData({...userData, message:""});
    }
  };

  return(
    <>
    <div className="container paddcontact">
      <h4 className="text-center mt-3">Contact Us</h4>
      <div className="card mt-5">
        <div className="card-body">
          <h4><strong>GET IN TOUCH</strong></h4>
          <form method="POST">
            <div className="row">
              <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input type="text" className="form-control" name="name" value={userData.name} onChange={handleInput} id="name" />
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                <div className="form-group">
                  <label htmlFor="phone">Phone</label>
                  <input type="tel" className="form-control" name="phone" value={userData.phone} onChange={handleInput} id="phone" />
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input type="email" className="form-control" name="email" value={userData.email} onChange={handleInput} id="email" />
                </div>
              </div>
            </div>
            <div className="md-form">
              <label htmlFor="msg">Message</label>
              <textarea rows="4" className="form-control md-textarea" id="msg" name="message" value={userData.message} onChange={handleInput} />
            </div>
            <div className="text-left">
              <button className="btn btn-primary contact" type="submit" onClick={submitForm}>Send a message</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    </>
  );
};
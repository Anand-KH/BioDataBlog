import React, { useEffect, useState } from 'react';

export default function Home(){

  const [userName, setUserName] = useState('');
  const [show, setShow] = useState(false);
  const HomePage = async()=>{
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
      setUserName(data.name);
      setShow(true);
    }catch(err){
      console.log(err);
    }
  }

  useEffect(() => {
    HomePage();
  }, []);

  return(
    <>
    <div className="home text-white">
      <h5>Welcome</h5>
      {/* <h2>{userName}</h2> */}
      <h1>{show ? `Welcome Back ${userName}`: 'We are Mern Developers'}</h1>
    </div>
    </>
  );
};
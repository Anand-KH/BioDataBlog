import React, { useEffect, useState } from 'react';
import profile from '../profile.jpg.png';
import {useHistory} from 'react-router-dom';
import { FcBusinessman } from "react-icons/fc";
export default function About(){

  const hisrtory = useHistory();
  const [userData, setUserData] = useState('');
  const callAboutPage = async()=>{
    try{
      const res = await fetch('/about', {
        method: "GET",
        headers:{
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include"
      });

      const data = await res.json();
      // console.log(data);
      setUserData(data);
      // console.log(userData)

      if(!res.status === 200){
        const error = new Error(res.error);
        throw error;
      }

    }catch(err){
      console.log(err);
      hisrtory.push('/login');
    }
  }

  useEffect(() => {
    callAboutPage();
  }, []);

  const ddb = new Date(userData.dob);
  const date = ddb.toDateString();

  return(
    <>
    <div className="container paddabout">
      <div className="card mb-5">
        <div className="card-body">
          <form method="GET">
            <div className="row">
              <div className="col-lg-2 col-md-4 col-sm-4 col-12 text-center">
                {/* <img src={profile} alt="profile" width="150" height="150" /> */}
                <FcBusinessman size={100}/>
              </div>
              <div className="col-lg-8 col-md-8 col-sm-8 col-12 text-left">
                <h4 className="pt-3">{userData.name}</h4>
                <p className="text-primary">{userData.work}</p>
              </div>
            </div>
            <hr className="border-black"/>
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12 col-12 mt-3 text-center">
                <h4 className="text-center text-primary">About</h4>
                <div className="row">
                  <div className="col-lg-6 col-md-4 col-sm-4 col-4">
                    <p>Name:</p>
                  </div>
                  <div className="col-lg-6 col-md-8 col-sm-8 col-8">
                    <p>{userData.name}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-6 col-md-4 col-sm-4 col-4">
                    <p>Email:</p>
                  </div>
                  <div className="col-lg-6 col-md-8 col-sm-8 col-8">
                    <p>{userData.email}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-6 col-md-4 col-sm-4 col-4">
                    <p>Phone:</p>
                  </div>
                  <div className="col-lg-6 col-md-8 col-sm-8 col-8">
                    <p>{userData.phone}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-6 col-md-4 col-sm-4 col-4">
                    <p>Date of Birth:</p>
                  </div>
                  <div className="col-lg-6 col-md-8 col-sm-8 col-8">
                    <p>{date}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-6 col-md-4 col-sm-4 col-4">
                    <p>Profession:</p>
                  </div>
                  <div className="col-lg-6 col-md-8 col-sm-8 col-8">
                    <p>{userData.work}</p>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    </>
  );
};
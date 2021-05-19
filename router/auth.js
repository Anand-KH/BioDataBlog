const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const authenticate = require('../middleware/authenticate');

require('../db/conn');
const User = require('../models/userSchema');

// router.get('/', (req, res) => {
//   res.send('Hello from router');
// });

//using promises
// router.post('/register', (req, res)=>{
//   const {name, email, phone, work, password, confirmpassword} = req.body;
//   if(!name || !email || !phone || !work || !password || !confirmpassword){
//     return res.status(422).json({error:'plz fill all fileds'});
//   }
//   User.findOne({email:email})
//   .then((userExists) => {
//     if(userExists){
//     return res.status(422).json({error:'email already exists'});
//     }
//     const newuser = new User({name, email:email, phone, work, password, confirmpassword});
//     newuser.save().then(()=>{
//       res.status(201).json({message:"user registration successfull"})
//     }).catch((err)=>res.status(500).json({message:"Failed to registration"}))
//   }).catch(err=>{console.log(err)});
// });

//using async await
router.post('/register', async (req, res)=>{
  const {name, email, phone, work, password, confirmpassword, dob} = req.body;
  if(!name || !email || !phone || !work || !password || !confirmpassword || !dob){
    return res.status(422).json({error:'plz fill all fileds'});
  }
  try{
    const userExists= await User.findOne({email:email})
    if(userExists){
      return res.status(422).json({error:'email already exists'});
    }
    const newuser = new User({name, email, phone, work, password, confirmpassword, dob});
    await newuser.save();
      res.status(201).json({message:"user registration successfull"});
  }catch(err){
    console.log(err);
  }
});
//login route
router.post('/login', async (req, res)=>{
  // console.log(req.body);
  // res.json({message:"loged in"})
  try{
    const {email, password} = req.body;
    if(!email || !password){
      return res.status(400).json({message:"plz fill the details"});
    }
    const userlogin = await User.findOne({email:email});
    //console.log(userlogin);
    if(userlogin){
      const isMatch = await bcrypt.compare(password, userlogin.password);
      const token = await userlogin.generateAuthtoken();
      console.log(token);

      res.cookie("jwt", token, {
        expires:new Date(Date.now() + 25892000000), httpOnly:true
      });
      
      if(!isMatch){
        res.status(400).json({message:"invalid credentials"});
      }else{
        res.json({message:"logged in success"});
      }
    }else{
      res.status(400).json({message:"invalid credentials"});
    }
  }catch(err){
    console.log(err);
  }
});

//about page
router.get('/about', authenticate, (req, res) => {
  console.log('about');
  res.send(req.rootUser);
});

//contact page get
router.get('/contact', authenticate, (req, res) => {
  console.log('from contact');
  res.send(req.rootUser);
});
//contact us page post
router.post('/contactpost', authenticate, async (req, res) => {
  try{
    const {name, email, phone, message} = req.body;
    if(!name || !email || !phone || !message){
      console.log("fill the contact form");
      return res.json({error: "plz fill the contact form"});
    }
    const userContact = await User.findOne({_id:req.userID});
    if(userContact){
      const userMessage = await userContact.addMessage(name, email, phone, message);
      await userContact.save();

      res.status(201).json({message:"user contact successully"});
    }
  }catch(err){
    console.log(err);
  }
});

//logout
router.get('/logout', (req, res) => {
  console.log('From Logout');
  res.clearCookie('jwt', {path:"/"});
  res.status(200).send('User logout');
});

module.exports = router;
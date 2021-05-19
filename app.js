const  dotenv = require('dotenv');
const mongoose = require('mongoose');
const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser());

dotenv.config({path:'./confg.env'});
require('./db/conn');
app.use(express.json());
//const Users = require('./models/userSchema');
app.use(require('./router/auth'));

const PORT = process.env.PORT || 5000;

//middleware
// const middleware = (req, res, next) => {
//   console.log('middleware');
//   next();
// }

// app.get('/', (req, res) => {
//   res.send('<h1>Home Page</h1>')
// });
// app.get('/about', middleware, (req, res) => {
//   console.log('about');
//   res.send('<h1>About Page</h1>')
// });
// app.get('/contact', (req, res) => {
//   res.send('<h1>Contact Page</h1>')
// });
// app.get('/demo', (req, res) => {
//   res.send('<h1>Demo Page</h1>')
// });

//heroku
if(process.env.NODE_ENV = "production"){
  app.use(express.static("frontend/build"));
}

app.listen(PORT, ()=>{
  console.log(`server started at port ${PORT}`);
});
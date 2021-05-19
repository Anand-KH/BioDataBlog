import './App.css';
import Home from './component/Home';
import Navbar from './component/Navbar';
import About from './component/About';
import Contact from './component/Contact';
import Error from './component/Error';
import Login from './component/Login';
import Register from './component/Register';
import Logout from './component/Logout';
import { Route, Switch } from 'react-router';
import { createContext, useReducer } from 'react';
import {initialState, reducer} from '../src/reducer/UseReducer';
import Footer from './component/Footer';

//1. Context API
export const UserContext = createContext();
const Routing = () => {
  return(
  <Switch>
    <Route exact path="/" component={Home}/>
    <Route exact path="/about" component={About}/>
    <Route exact path="/contact" component={Contact}/>
    <Route exact path="/login" component={Login}/>
    <Route exact path="/register" component={Register}/>
    <Route exact path="/logout" component={Logout}/>
     <Route component={Error}/>
  </Switch>
  );
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <>
      <UserContext.Provider value={{state, dispatch}}>
        <Navbar/>
        <Routing/>
        <Footer/>
      </UserContext.Provider>
    </>
  );
}

export default App;

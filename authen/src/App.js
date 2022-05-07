import './App.css';
import React from 'react';
import Register from './auth/register';
import Login from './auth/login';
import ReactDOM from "react-dom";
import { BrowserRouter as Router,Route } from "react-router-dom";
import ProtectedRouter from './auth/protected';
import Home from './auth/home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function  App(){
  return (
  <>
    
      <Router>
      
       
        <Route exact path ="/" component={Login}/>
        <Route exact path ="/register" component={Register}/>
        <ProtectedRouter exact path ="/home" component={Home}/>
         <ToastContainer/>
      </Router>
      
    
  </>
  );
}

export default App;

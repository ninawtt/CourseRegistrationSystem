import React, { useState, useEffect, useContext } from 'react';
//import ReactDOM from 'react-dom';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import AppContext from './AppContext';
import Login from './Login';
import { toast } from 'react-toastify';

function Logout() {
  const { loginStudentNumber, setLoginStudentNumber } = useContext(AppContext);

  useEffect(() => {
    const deleteCookie = async () => {
      try {
        await axios.get('/signout');
        setLoginStudentNumber("auth");
        toast.dark("Logout successfully!");
      } catch (e) {
        console.log(e);
      }
    };

    deleteCookie();
  }, []);
  
  return (
    <Login />
  );
}

export default Logout;
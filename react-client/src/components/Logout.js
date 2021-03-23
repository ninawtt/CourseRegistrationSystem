import React, { useState, useEffect, useContext } from 'react';
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
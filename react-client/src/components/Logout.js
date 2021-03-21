import React, { useState, useEffect, useContext } from 'react';
//import ReactDOM from 'react-dom';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import AppContext from './AppContext';
//

function Logout() {
  const { loginStudentId, setLoginStudentId } = useContext(AppContext);

  useEffect(() => {
    setLoginStudentId("auth");
  }, []);
  
  return (
    <div>
      <p>Logout successfully</p>
    </div>
  );
}

export default Logout;
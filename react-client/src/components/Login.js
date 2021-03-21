import React, { useState, useEffect, useContext } from 'react';
//import ReactDOM from 'react-dom';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import AppContext from './AppContext';
//

function Login() {
  const { loginStudentId, setLoginStudentId} = useContext(AppContext);
  //state variable for the screen, admin or user
  // const [screen, setScreen] = useState('auth');
  //store input field data, user name and password
  const [studentNumber, setStudentNumber] = useState("301040475");
  const [password, setPassword] = useState("123456789");
  const apiUrl = "http://localhost:3000/signin";
  //send username and password to the server
  // for initial authentication
  const auth = async () => {
    console.log('calling auth')
    console.log(studentNumber)
    try {
      //make a get request to /authenticate end-point on the server
      const loginData = { auth: { studentNumber, password } }
      //call api
      const res = await axios.post(apiUrl, loginData);
      console.log(res.data.auth)
      console.log(res.data.screen)
      //process the response
      if (res.data.screen !== undefined) {
        // setScreen(res.data.screen);
        setLoginStudentId(res.data.screen);
        console.log(res.data.screen);
      }
    } catch (e) { //print the error
      console.log(e);
    }
  
  };
  
  //check if the user already logged-in
  const readCookie = async () => {
    try {
      console.log('--- in readCookie function ---');

      //
    //   const res = await axios.get('/read_cookie');
    //   // 
    //   if (res.data.screen !== undefined) {
    //     setScreen(res.data.screen);
    //     console.log(res.data.screen)
    //   }
    } catch (e) {
      // setLoginStudentId('auth');
      console.log(e);
    }
  };
  //runs the first time the view is rendered
  //to check if user is signed in
  useEffect(() => {
    readCookie();
  }, []); //only the first render
  //
  return (
    <div className="App">
      {loginStudentId === 'auth' 
        ? <div>
          <label>Student Number: </label>
          <br/>
          <input type="text" onChange={e => setStudentNumber(e.target.value)} />
          <br/>
          <label>Password: </label>
          <br/>
          <input type="password" onChange={e => setPassword(e.target.value)} />
          <br/>
          <button onClick={auth}>Login</button>
        </div>
        : <>
            {loginStudentId}
        </>
      }
    </div>
  );
}

export default Login;
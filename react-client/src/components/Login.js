import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AppContext from './AppContext';

function Login() {
  const { loginStudentNumber, setLoginStudentNumber } = useContext(AppContext);
  const [studentNumber, setStudentNumber] = useState("301040475");
  const [password, setPassword] = useState("123456789");
  const apiUrl = "http://localhost:3000/signin";
  
  //runs the first time the view is rendered to check if user is signed in
  useEffect(() => {
    readCookie();
  }, []);
  
  //check if the user already logged-in
  const readCookie = async () => {
    try {
      console.log('--- in readCookie function ---');
      const res = await axios.get('/read_cookie');
      
      if (res.data.screen !== undefined) {
        setLoginStudentNumber(res.data.screen);
        console.log(res.data.screen);
      }
    } catch (e) {
      console.log(e);
      setLoginStudentNumber("auth");
    }
  };

  const auth = async () => {
    console.log(studentNumber);
    try {
      const loginData = { auth: { studentNumber, password } }
      const res = await axios.post(apiUrl, loginData);
      console.log(res.data.auth);
      console.log(res.data.screen);
      //process the response
      if (res.data.screen !== undefined) {
        console.log(res.data.screen);
        setStudentNumber(res.data.screen);
        setLoginStudentNumber(res.data.screen);
      }
    } catch (e) {
      console.log(e);
      setStudentNumber("auth");
      setLoginStudentNumber("auth");
    }
  };
  
  return (
    <div className="App">
      {loginStudentNumber === "auth" 
        ? <div>
            <table class="text-right mr-auto ml-auto needs-validation mt-5">
              <tr>
                <td><label for="studentNumber">Student Number:</label></td>
                <td>
                  <input class="form-control"
                          placeholder="Enter your student number"
                          name="studentNumber"
                          required onChange={e => setStudentNumber(e.target.value)} />
                </td>
              </tr>
              <tr>
                <td><label for="password">Password:</label></td>
                <td>
                  <input class="form-control"
                          type="password"
                          size="30"
                          placeholder="Enter your password"
                          name="password"
                          required onChange={e => setPassword(e.target.value)} />
                </td>
              </tr>
            </table>
            <button class="btn btn-primary mt-3" onClick={auth}>Login</button>
          </div>
        : <div class="mt-5">
            <h1>Welcome to Registration System</h1>
            <p>You can start registering your courses</p>
          </div>
      }
    </div>
  );
}

export default Login;
import React, {useState} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
//
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import './App.css';
import Login from './components/Login'
import SignUp from './components/SignUp'
import AppContext from "./components/AppContext";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ListCourses from './components/ListCourses';
import MyCourses from './components/MyCourses';
import ListStudents from './components/ListStudents';
//
function App() {
  const [loginStudentId, setLoginStudentId] = useState("auth");
  
  return (
    <AppContext.Provider value={{loginStudentId, setLoginStudentId}}>
      <ToastContainer />
      <Router>
        <Navbar bg="light" expand="lg">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Link to="/home">Home</Link>
              { loginStudentId !== "auth" && <>
                <Link to="/courses">Courses</Link>
                <Link to="/students">Students</Link>
                <Link to="/myCourses">My Courses</Link>
                <Link to="/logout">Logout</Link>
              </>}
              { loginStudentId === "auth" && 
                <Link to="/login">Login</Link>
              }
              <Link to="/create">Sign Up</Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      
        <div>          
            <Route render ={()=> <div>HOME</div>} path="/home" />
            <Route render ={()=> <Login />} path="/login" />
            <Route render ={()=> <SignUp />} path="/create" />
            <Route render ={()=> <ListCourses />} path="/courses" />
            <Route render ={()=> <ListStudents />} path="/students" />
            <Route render ={()=> <div><MyCourses /></div>} path="/myCourses" />
            <Route render ={()=> <div>Logout</div>} path="/logout" />
        </div>
      </Router>
    </AppContext.Provider>
  );
}
//<Route render ={()=> < App />} path="/" />
export default App;

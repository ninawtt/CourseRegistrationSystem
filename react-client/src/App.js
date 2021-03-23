import React, {useEffect, useState} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory
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
import ShowStudent from './components/ShowStudent';
import ShowCourse from './components/ShowCourse';
import Logout from './components/Logout';
import Home from './components/Home';
import AddCourse from './components/AddCourse';
import EditStudent from './components/EditStudent';

function App() {
  const [loginStudentNumber, setLoginStudentNumber] = useState("auth");

  return (
    <AppContext.Provider value={{loginStudentNumber, setLoginStudentNumber}}>
      <ToastContainer />
      <Router>
        <Navbar bg="dark" variant="dark justify-content-center" >
          <Nav className="justify-content-center">
            <Link className="nav-link" to="/home">Home</Link>
            { loginStudentNumber !== "auth" && <>
              <Link className="nav-link" to="/courses">Courses</Link>
              <Link className="nav-link" to="/students">Students</Link>
              <Link className="nav-link" to="/myCourses/list">My Courses</Link>
              <Link className="nav-link" to="/logout">Logout</Link>
            </>}
            { loginStudentNumber === "auth" && 
              <Link className="nav-link" to="/login">Login</Link>
            }
            <Link className="nav-link" to="/create">Sign Up</Link>
          </Nav>
        </Navbar>
      
        <div>     
            <Redirect exact from="/" to="/home" />
            <Route render ={()=> <Home />} path="/home" />
            <Route render ={()=> <Login />} path="/login" />
            <Route render ={()=> <SignUp />} path="/create" />
            <Route render ={()=> <AddCourse />} path="/createCourse" />
            <Route render ={()=> <ListCourses />} path="/courses" />
            <Route render ={()=> <ShowCourse />} path="/showCourse/:courseId" />
            <Route render ={()=> <ListStudents />} path="/students" />
            <Route render ={()=> <ShowStudent />} path="/showStudent/:studentNumber" />
            <Route render ={()=> <EditStudent />} path="/editStudent/:studentNumber" />
            <Route render ={()=> <MyCourses />} path="/myCourses" />
            <Route render ={()=> <Logout />} path="/logout" />
        </div>
      </Router>
    </AppContext.Provider>
  );
}
//<Route render ={()=> < App />} path="/" />
export default App;

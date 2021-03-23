import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import { withRouter } from 'react-router-dom';
import AppContext from './AppContext';

function ShowStudent(props) {
  const { loginStudentNumber } = useContext(AppContext); 
  const [student, setStudent] = useState({});
  const [courses, setCourses] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl = "http://localhost:3000/student/" + props.match.params.studentNumber;

  useEffect(() => {
    setShowLoading(true);
    axios.get(apiUrl)
        .then(result => {
          console.log('student:', result.data);
          setStudent(result.data);
          
          axios.get(`/student/${props.match.params.studentNumber}/courses`)
                .then(result => {
                  console.log('courses by student', result.data);
                  setCourses(result.data);
                  setShowLoading(false);
                }
          );
        }).catch((error) => {
          console.log('error in fetchData:', error);
          setShowLoading(false);
    });
  }, []);

  const editStudent = (studentNumber) => {
    props.history.push({
      pathname: '/editStudent/' + studentNumber
    });
  };

  return (
    <div>
      {showLoading && <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner> }
      <div class="text-center">
        <h1 class="mt-3">Student Detail - {student.firstName} {student.lastName}</h1>
        <table class="table table-striped center text-center bordered hover mt-3">
          <tbody>
            <tr>
              <th>Student Number</th>
              <td>{student.studentNumber}</td>
            </tr>
            <tr>
              <th>First Name</th>
              <td>{student.firstName}</td>
            </tr>
            <tr>
              <th>Last Name</th>
              <td>{student.lastName}</td>
            </tr>
            <tr>
              <th>Address</th>
              <td>{student.address}</td>
            </tr>
            <tr>
              <th>City</th>
              <td>{student.city}</td>
            </tr>
            <tr>
              <th>Phone Number</th>
              <td>{student.phoneNumber}</td>
            </tr>
            <tr>
              <th>Program</th>
              <td>{student.program}</td>
            </tr>
            <tr>
              <th>Registered Courses</th>
              <td>
                {courses.length > 0 ? 
                  <ul style={{listStyleType: "none"}}>
                    {courses.map((item, idx) => (
                      <li key={`tr_${item._id}`}>{item.courseCode}-{item.section} {item.courseName}</li>
                    ))}
                  </ul> : "No course registered"}
              </td>
            </tr>
          </tbody>
        </table>
        {loginStudentNumber === student.studentNumber && <button class="btn btn-primary" onClick={() => editStudent(student.studentNumber)}>Edit</button>}
      </div>
    </div>
  );
}

export default withRouter(ShowStudent);

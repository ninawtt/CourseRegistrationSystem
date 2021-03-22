import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';

function ShowCourse(props) {
  const [students, setStudents] = useState([]);
  const [course, setCourse] = useState({});
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl = `http://localhost:3000/courses/${props.match.params.courseId}/students`;

  useEffect(() => {
    setShowLoading(true);
    axios.get(apiUrl)
        .then(result => {
          console.log('data in if:', result.data )
          setCourse(result.data.course);
          setStudents(result.data.students); // data is the default key for response body
          setShowLoading(false);
        }).catch((error) => {
          console.log('error in fetchData:', error);
          setShowLoading(false);
    });
  }, []);

//   const editUser = (id) => {
//     props.history.push({
//       pathname: '/edit/' + id
//     });
//   };

//   const deleteUser = (id) => {
//     setShowLoading(true);
//     const user = { firstName: data.firstName, lastName: data.lastName, 
//       email: data.email,username: data.username, password: data.password };
  
//     axios.delete(apiUrl, user)
//       .then((result) => {
//         setShowLoading(false);
//         props.history.push('/list')
//       }).catch((error) => setShowLoading(false));
//   };

  return (
    <div>
      {showLoading && <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner> }
      <div class="text-center">
        <h1 class="mt-3">Course Detail - {course.courseCode} {course.courseName}</h1>
        <table class="table table-striped center text-center bordered hover mt-3">
          <tbody>
            <tr>
              <th>Course Code</th>
              <td>{course.courseCode}</td>
            </tr>
            <tr>
              <th>Course Name</th>
              <td>{course.courseName}</td>
            </tr>
            <tr>
              <th>Section</th>
              <td>{course.section}</td>
            </tr>
            <tr>
              <th>Semester</th>
              <td>{course.semester}</td>
            </tr>
            <tr>
              <th>Registered Students</th>
              <td>
                {students.length > 0 ? 
                  <ul style={{listStyleType: "none"}}>
                    {students.map((item, idx) => (
                      <li key={`tr_${item._id}`}>{item.studentNumber} {item.firstName} {item.lastName} {item.program}</li>
                    ))}
                  </ul> : "No Student enrolled"}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default withRouter(ShowCourse);

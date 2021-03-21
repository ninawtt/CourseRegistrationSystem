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
      console.log(apiUrl);
    setShowLoading(false);
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
    // const fetchData = async () => {
    //   const result = await axios(apiUrl);
    //   setCourse(result.data.course);
    //   setStudents(result.data.students); // data is the default key for response body
    //   setShowLoading(false);
    // };

    // fetchData();
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
      <Jumbotron>
        <h1>{course.courseCode} {course.courseName}</h1>
        <table striped bordered hover>
            <thead>
              <tr>
                <th>Student Number</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Program</th>
              </tr>
            </thead>
            <tbody>
            {students.map((item, idx) => (
              <tr key={`tr_${item._id}`}>
                <td>{item.studentNumber}</td>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.program}</td>
              </tr>
            ))}
            </tbody>
          </table>
      </Jumbotron>
    </div>
  );
}

export default withRouter(ShowCourse);

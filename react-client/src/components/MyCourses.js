import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import Spinner from 'react-bootstrap/Spinner';
import { withRouter } from 'react-router-dom';
import Login from './Login';
import AppContext from './AppContext';

function MyCourses(props) {
  const { loginStudentId } = useContext(AppContext); 
  const [registeredCourses, setRegisteredCourses] = useState([]);
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    setShowLoading(true);
    axios.get(`student/${loginStudentId}/courses`)
        .then(result => {
          const registeredCourses = result.data;
          console.log('registeredCourses:', registeredCourses )
          setRegisteredCourses(registeredCourses);
          setShowLoading(false);
        }).catch((error) => {
          console.log('error in fetchData:', error);
          setShowLoading(false);
        });
  }, []);

  const updateRegisteredCourses = (id) => {
    const updatedRegisteredCourses = [...registeredCourses];
    const courseToBeDropped = updatedRegisteredCourses.find(i => i._id === id);
    
    const index = updatedRegisteredCourses.indexOf(courseToBeDropped);
    if (index > -1) {
        updatedRegisteredCourses.splice(index, 1);
    }

    setRegisteredCourses(updatedRegisteredCourses);
  };

  const dropCourse = (id) => {
    axios.put(`/drop/${loginStudentId}`, {course: id})
        .then(result => {
          console.log('drop successfully', result.data);
          updateRegisteredCourses(id);
        }).catch((error) => {
          console.log('error in fetchData:', error);
    });
  }

  return (
    <div>
      { registeredCourses.length !== 0
        ? <div>
            <h1>My Courses</h1>
          {showLoading && <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner> }
          <table striped bordered hover>
            <thead>
              <tr>
                <th>Course Code</th>
                <th>Course Name</th>
                <th>Section</th>
                <th>Semester</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
            {registeredCourses.map((item, idx) => (
              <tr key={`tr_${item._id}`}>
                <td>{item.courseCode}</td>
                <td>{item.courseName}</td>
                <td>{item.section}</td>
                <td>{item.semester}</td>
                <td><button onClick={() => dropCourse(item._id)}>Drop</button></td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
        : < Login />
      }
    </div>

  );
}
//
export default withRouter(MyCourses);
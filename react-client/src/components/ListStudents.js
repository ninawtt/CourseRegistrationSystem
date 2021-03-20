import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import Spinner from 'react-bootstrap/Spinner';
import { withRouter } from 'react-router-dom';
import Login from './Login';
import AppContext from './AppContext';

function ListStudents(props) {
  const { loginStudentId } = useContext(AppContext); 
  const [allStudents, setAllStudents] = useState([]);
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    setShowLoading(true);
    axios.get("/students")
        .then(result => {
          const allStudents = result.data;
          console.log('allStudents:', allStudents);
          setAllStudents(allStudents);
          setShowLoading(false);
        }).catch((error) => {
          console.log('error in fetchData:', error);
          setShowLoading(false);
    });
  }, []);

  const showStudentDetail = (studentNumber) => {
    setShowLoading(true);
    axios.get(`/student/${studentNumber}`)
        .then(result => {
          console.log('student:', result.data);
          setShowLoading(false);
        }).catch((error) => {
          console.log('error in fetchData:', error);
          setShowLoading(false);
    });
  }

  return (
    <div>
      { allStudents.length !== 0
        ? <div>
          {showLoading && <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner> }
          <table striped bordered hover>
            <thead>
              <tr>
                <th>Student Number</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Program</th>
                <th>View Details</th>
              </tr>
            </thead>
            <tbody>
            {allStudents.map((item, idx) => (
              <tr key={`tr_${item._id}`}>
                <td>{item.studentNumber}</td>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.program}</td>
                <td><button onClick={() => showStudentDetail(item.studentNumber)}>View Details</button></td>
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
export default withRouter(ListStudents);

import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import { withRouter } from 'react-router-dom';
import AppContext from './AppContext';

function ListStudents(props) {
  const { loginStudentNumber } = useContext(AppContext); 
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
    props.history.push({
        pathname: '/showStudent/' + studentNumber
    });
  }

  if(showLoading) {
    return <Spinner animation="border" role="status">
      <span className="sr-only">Loading...</span>
    </Spinner>
  }

  return (
    <div>
      { allStudents.length !== 0
        ? <div class="text-center">
            <h1 class="mt-3">All Students</h1>
            <table class="table table-striped center text-center bordered hover mt-3">
              <thead>
                <tr>
                  <th>Student Number</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Program</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
              {allStudents.map((item, idx) => (
                <tr key={`tr_${item._id}`}>
                  <td>{item.studentNumber}</td>
                  <td>{item.firstName}</td>
                  <td>{item.lastName}</td>
                  <td>{item.program}</td>
                  <td><button class="btn btn-info" onClick={() => showStudentDetail(item.studentNumber)}>View Details</button></td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
        : <div>
        NO DATA
      </div>
      }
    </div>
  );
}
//
export default withRouter(ListStudents);

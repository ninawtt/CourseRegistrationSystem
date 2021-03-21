import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';

function ShowStudent(props) {
  const [student, setStudent] = useState({});
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl = "http://localhost:3000/student/" + props.match.params.studentNumber;

  useEffect(() => {
    setShowLoading(false);
    const fetchData = async () => {
      const result = await axios(apiUrl);
      setStudent(result.data); // data is the default key for response body
      setShowLoading(false);
    };

    fetchData();
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
        <h1>Name: {student.firstName}, {student.lastName}</h1>
        <p>Email: {student.email}</p>
        <p>Student Number: {student.studentNumber}</p>

        {/* <p>
          <Button type="button" variant="primary" onClick={() => { editUser(data._id) }}>Edit</Button>&nbsp;
          <Button type="button" variant="danger" onClick={() => { deleteUser(data._id) }}>Delete</Button>
        </p> */}
      </Jumbotron>
    </div>
  );
}

export default withRouter(ShowStudent);

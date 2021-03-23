import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import { withRouter } from 'react-router-dom';

function EditStudent(props) {
  const [student, setStudent] = useState({ studentNumber: '', password: '', firstName: '', 
        lastName: '', address: '', city: '', phoneNumber: '',  email: '', program: '' });
  const [showLoading, setShowLoading] = useState(false);
  const apiUrl = "http://localhost:3000/student/" + props.match.params.studentNumber;

  useEffect(() => {
    setShowLoading(false);
    const fetchData = async () => {
      const result = await axios(apiUrl);
      setStudent(result.data);
      console.log(result.data);
      setShowLoading(false);
    };

    fetchData();
  }, []);

  const updateStudent = (e) => {
    setShowLoading(true);
    e.preventDefault();
    axios.put(apiUrl, student)
      .then((result) => {
        setShowLoading(false);
        props.history.push('/showStudent/' + result.data.studentNumber);
      }).catch((error) => setShowLoading(false));
  };

  const onChange = (e) => {
    e.persist(); // The persisted property returns a Boolean value that indicates if the webpage is loaded directly from the server, or if the page is cached.
    setStudent({...student, [e.target.name]: e.target.value});
  }

  return (
    <div class="text-center">
      {showLoading && 
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner> 
      }
      <h1 class="mt-3">Edit</h1>
        <table class="text-right mr-auto ml-auto needs-validation mt-3">
          <tr>
            <td><label for="studentNumber">Student Number:</label></td>
            <td>
              <input
                class="form-control-plaintext"
                type="text"
                size="30"
                placeholder="Enter your student number"
                name="studentNumber"
                value={student.studentNumber}
              />
            </td>
          </tr>
          <tr>
            <td><label for="firstName">First Name:</label></td>
            <td>
              <input
                class="form-control"
                type="text"
                size="30"
                placeholder="Enter your first name"
                name="firstName"
                required
                value={student.firstName} onChange={onChange}
              />
            </td>
          </tr>
          <tr>
            <td><label for="lastName">Last Name:</label></td>
            <td>
              <input
                class="form-control"
                type="text"
                size="30"
                placeholder="Enter your last name"
                name="lastName"
                required
                value={student.lastName} onChange={onChange}
              />
            </td>
          </tr>
          <tr>
            <td><label for="address">Address:</label></td>
            <td>
              <input
                class="form-control"
                type="text"
                size="30"
                placeholder="Enter your address"
                name="address"
                required
                value={student.address} onChange={onChange}
              />
            </td>
          </tr>
          <tr>
            <td><label for="city">City:</label></td>
            <td>
              <input
                class="form-control"
                type="text"
                size="30"
                placeholder="Enter your city"
                name="city"
                required
                value={student.city} onChange={onChange}
              />
            </td>
          </tr>
          <tr>
            <td><label for="email">Email:</label></td>
            <td>
              <input
                class="form-control"
                type="email"
                placeholder="Enter your email"
                name="email"
                required
                value={student.email} onChange={onChange}
              />
            </td>
          </tr>
          <tr>
            <td><label for="phoneNumber">Phone Number:</label></td>
            <td>
              <input
                class="form-control"
                type="phoneNumber"
                placeholder="Enter your phone number"
                name="phoneNumber"
                required
                value={student.phoneNumber} onChange={onChange}
              />
            </td>
          </tr>
          <tr>
            <td><label for="program">Program:</label></td>
            <td>
              <input
                class="form-control"
                type="program"
                placeholder="Enter your program"
                name="program"
                required
                value={student.program} onChange={onChange}
              />
            </td>
          </tr>
        </table>
        <button class="btn btn-primary" onClick={updateStudent}>Update</button>
    </div>
  );
}

export default withRouter(EditStudent);

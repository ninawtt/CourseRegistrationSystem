import React, { useState } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';

function AddCourse(props) {
  const [course, setCourse] = useState({ 
      courseCode: '', courseName: '', section: '', semester: '' });
  const [showLoading, setShowLoading] = useState(false);
  const apiUrl = "http://localhost:3000/course";

  const saveCourse = (e) => {
    setShowLoading(true);
    e.preventDefault();
    const data = { ...course };
    axios.post(apiUrl, data)
      .then((res) => {
        setShowLoading(false);
        props.history.push('/courses');
        toast.dark(`${res.data.courseCode} ${res.data.courseName} has been created successfully!`);
      }).catch((error) => setShowLoading(false));
  };

  const onChange = (e) => {
    e.persist(); // The persisted property returns a Boolean value that indicates if the webpage is loaded directly from the server, or if the page is cached.
    setCourse({...course, [e.target.name]: e.target.value});
  }

  return (
    <div class="text-center">
      {showLoading && 
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner> 
      }
      <h1 class="mt-3">Create A Course</h1>
        <table class="text-right mr-auto ml-auto needs-validation mt-3">
          <tr>
            <td><label for="courseCode">Course Code:</label></td>
            <td>
              <input
                class="form-control"
                type="text"
                size="30"
                placeholder="Enter a course code"
                name="courseCode"
                required
                value={course.courseCode} onChange={onChange}
              />
            </td>
          </tr>
          <tr>
            <td><label for="courseName">Course Name:</label></td>
            <td>
              <input
                class="form-control"
                type="text"
                size="30"
                placeholder="Enter a course name"
                name="courseName"
                required
                value={course.courseName} onChange={onChange}
              />
            </td>
          </tr>
          <tr>
            <td><label for="section">Section:</label></td>
            <td>
              <input
                class="form-control"
                type="text"
                size="30"
                placeholder="Enter section"
                name="section"
                required
                value={course.section} onChange={onChange}
              />
            </td>
          </tr>
          <tr>
            <td><label for="semester">Semester:</label></td>
            <td>
              <input
                class="form-control"
                type="text"
                size="30"
                placeholder="Enter semester"
                name="semester"
                required
                value={course.semester} onChange={onChange}
              />
            </td>
          </tr>
        </table>
        <button class="btn btn-primary" onClick={saveCourse}>Create</button>
    </div>
  );
}

export default withRouter(AddCourse);

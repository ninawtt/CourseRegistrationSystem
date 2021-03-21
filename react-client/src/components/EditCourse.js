import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';
import AppContext from './AppContext';

function EditCourse(props) {
  const { editingItem, setRegisteredCourses } = props;
  const { loginStudentId } = useContext(AppContext); 
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(editingItem._id);
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl = "http://localhost:3000/courses/" + props.match.params.courseCode;
  //runs only once after the first render
  useEffect(() => {
    setShowLoading(false);
    //call api
    const fetchData = async () => {
      const result = await axios(apiUrl);
      setCourses(result.data);
      console.log(result.data);
      setShowLoading(false);
    };

    fetchData();
  }, []);

  const updateCourse = (e) => {
    setShowLoading(true);
    e.preventDefault();
    axios.put(`/update/${loginStudentId}/${editingItem.courseCode}`, {"newCourseId": selectedCourse})
      .then((result) => {
        console.log('after calling put to update', result.data);
        setShowLoading(false);
        setRegisteredCourses(null);
        props.history.push('/myCourses/list');
      }).catch((error) => setShowLoading(false));
  };

  //runs when user enters a field
  const onChange = (e) => {
    e.persist();
    setSelectedCourse(e.target.value);
  }

  return (
    <div>
      {showLoading && 
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner> 
      }
      <table striped bordered hover>
        <tbody>
            <tr>
                <td>Course Code</td>
                <td>{editingItem.courseCode}</td>
            </tr>
            <tr>
                <td>Course Name</td>
                <td>{editingItem.courseName}</td>
            </tr>
            <tr>
                <td>Section</td>
                <td>
                    <select name="section" id="section" value={selectedCourse} onChange={onChange}>
                        {courses.map((item, idx) => (
                            <option value={item._id} >{item.section}</option>
                        ))}
                    </select>
                </td>
            </tr>
        </tbody>
        </table>
        <button onClick={updateCourse}>Change Section</button>
    </div>
  );
}

export default withRouter(EditCourse);
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import { withRouter } from 'react-router-dom';
import Login from './Login';
import AppContext from './AppContext';

function ListCourses(props) {
  const { loginStudentNumber } = useContext(AppContext); 
  const [courses, setCourses] = useState([]);
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    setShowLoading(true);
    axios.get("/courses")
        .then(result => {
          const allCourses = result.data;
          console.log('data in if:', allCourses )

          axios.get(`/student/${loginStudentNumber}/courses`).then(
            res => {
              const selectedCourses = res.data;
              allCourses.forEach((c,index)=>{
                allCourses[index].selected = selectedCourses.find(s=>s._id == c._id) ? true : false;
              });
              setCourses(allCourses);
              setShowLoading(false);
              console.log("allCourses", allCourses);
            }
          
          );
        }).catch((error) => {
          console.log('error in fetchData:', error);
          setShowLoading(false);
    });
  }, []);

  const toggleCourse = (idx, item) => {
    const updatedData = [...courses];
    updatedData[idx].selected = !item.selected;
    setCourses(updatedData);
  };

  const registerCourses = () => {
    axios.put(`/register/${loginStudentNumber}`,{courses: courses.filter(i=>i.selected).map(i=>i._id)})
        .then(result => {
          console.log('registered successfully', result.data )
          props.history.push({
            pathname: '/myCourses/list'
          });
        }).catch((error) => {
          console.log('error in fetchData:', error)
    });
  }

  const showCourseDetail = (courseId) => {
    props.history.push({
      pathname: '/showCourse/' + courseId
    });
  }

  return (
    <div>
      { courses.length !== 0
        ? <div class="text-center">
          {showLoading && <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner> }
          <h1 class="mt-3">All Courses</h1>
          <table class="table table-striped center text-center bordered hover mt-3">
            <thead>
              <tr>
                <th>Register</th>
                <th>Course Code</th>
                <th>Course Name</th>
                <th>Section</th>
                <th>Semester</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
            {courses.map((item, idx) => (
              <tr key={`tr_${item._id}`}>
                <td><input type="checkbox" onClick={() => toggleCourse(idx, item)} value="" id={item._id} defaultChecked={item.selected} /></td>
                <td>{item.courseCode}</td>
                <td>{item.courseName}</td>
                <td>{item.section}</td>
                <td>{item.semester}</td>
                <td><button class="btn btn-info" onClick={() => showCourseDetail(item._id)}>View Details</button></td>
              </tr>
            ))}
            </tbody>
          </table>
          <button class="btn btn-primary" onClick={registerCourses}> Register</button>
        </div>
        : < Login />
      }
    </div>

  );
}
//
export default withRouter(ListCourses);

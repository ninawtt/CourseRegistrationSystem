import React, { useState, useEffect, useContext } from 'react';
import {Route, Switch, useRouteMatch} from "react-router-dom";
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import { withRouter } from 'react-router-dom';
import AppContext from './AppContext';
import EditCourse from './EditCourse';

function MyCoursesList({updateRegisteredCourses, dropCourse, editCourse, registeredCourses}) {
  return (
    <div>
      { registeredCourses && registeredCourses.length !== 0
        ? <div class="text-center">
            <h1 class="mt-3">My Courses</h1>
            <table class="table table-striped center text-center bordered hover mt-3">
              <thead>
                <tr class="text-center">
                  <th>Course Code</th>
                  <th>Course Name</th>
                  <th>Section</th>
                  <th>Semester</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
              {registeredCourses.map((item, idx) => (
                <tr key={`tr_${item._id}`}>
                  <td>{item.courseCode}</td>
                  <td>{item.courseName}</td>
                  <td>{item.section}</td>
                  <td>{item.semester}</td>
                  <td>
                    <button class="btn btn-warning mr-3" onClick={() => editCourse(item)}>Edit</button>
                    <button class="btn btn-danger" onClick={() => dropCourse(item._id)}>Drop</button>
                  </td>
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

function MyCourses(props) {
  let { url } = useRouteMatch();
  const { loginStudentNumber } = useContext(AppContext); 
  const [registeredCourses, setRegisteredCourses] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  const [editingItem, setEditingItem] = useState(null);
  const isRegisteredCoursesCleared = registeredCourses == null;

  useEffect(() => {
    setShowLoading(true);
    axios.get(`/student/${loginStudentNumber}/courses`)
        .then(result => {
          const registeredCourses = result.data;
          console.log('registeredCourses:', registeredCourses )
          setRegisteredCourses(registeredCourses);
          setShowLoading(false);
        }).catch((error) => {
          console.log('error in fetchData:', error);
          setShowLoading(false);
        });
  }, [isRegisteredCoursesCleared]);

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
    axios.put(`/drop/${loginStudentNumber}`, {course: id})
        .then(result => {
          console.log('drop successfully', result.data);
          updateRegisteredCourses(id);
        }).catch((error) => {
          console.log('error in fetchData:', error);
    });
  }

  const editCourse = (item) => {
    setEditingItem(item)
    props.history.push({
      pathname: `./editCourse/${item.courseCode}`
    });
  }

  if(showLoading) {
    return <Spinner animation="border" role="status">
      <span className="sr-only">Loading...</span>
    </Spinner>
  }

  return (
    <>
      <Switch>
        <Route render ={()=> <MyCoursesList 
        updateRegisteredCourses={updateRegisteredCourses}
        dropCourse={dropCourse}
        editCourse={editCourse}
        registeredCourses={registeredCourses}
        />} path={`${url}/list`} />
        <Route render ={()=> <EditCourse editingItem={editingItem} setRegisteredCourses={setRegisteredCourses}/>} path={`${url}/editCourse/:courseCode`} />
      </Switch>
    </>
  );
}

export default withRouter(MyCourses);
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import Spinner from 'react-bootstrap/Spinner';
import { withRouter } from 'react-router-dom';
import Login from './Login';
import AppContext from './AppContext';

function ListCourses(props) {
  const { loginStudentId } = useContext(AppContext); 
  const [data, setData] = useState([]);
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    setShowLoading(true);
    axios.get("/courses")
        .then(result => {
          const allCourses = result.data;
          console.log('data in if:', allCourses )

          axios.get(`/student/${loginStudentId}/courses`).then(
            res => {
              const selectedCourses = res.data;
              allCourses.forEach((c,index)=>{
                allCourses[index].selected = selectedCourses.find(s=>s._id == c._id) ? true : false;
              });
              setData(allCourses);
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
    const updatedData = [...data];
    updatedData[idx].selected = !item.selected;
    setData(updatedData);
  };

  const registerCourses = ()=>{
    axios.put(`/register/${loginStudentId}`,{courses:data.filter(i=>i.selected).map(i=>i._id)})
        .then(result => {
          console.log('registered successfully', result.data )
          props.history.push({
            pathname: '/myCourses'
          });
        }).catch((error) => {
          console.log('error in fetchData:', error)
        });
  }

  return (
    <div>
      { data.length !== 0
        ? <div>
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
            {data.map((item, idx) => (
              <tr key={`tr_${item._id}`}>
                <td>{item.courseCode}</td>
                <td>{item.courseName}</td>
                <td>{item.section}</td>
                <td>{item.semester}</td>
                <td><input type="checkbox" onClick={() => toggleCourse(idx, item)} value="" id={item._id} defaultChecked={item.selected} /></td>
              </tr>
            ))}
            </tbody>
          </table>
          <button onClick={registerCourses}> Register</button>
        </div>
        : < Login />
      }
    </div>

  );
}
//
export default withRouter(ListCourses);

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, Link, useNavigate } from 'react-router-dom'
import './ViewAttendance.css';

function ViewAttendance() {
    const [attenData, setAttenData] = useState([])
    const { id } = useParams()
    const [user, setUser] = useState(null)
    const [formdata, setFormData] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        attendanceData();
    }, []);

    const attendanceData = async () => {
        try {
            const user = await axios.get(`http://127.0.0.1:5000/employee/${id}`)
            console.log("User witht the specified id", user.data.user)
            setUser(user.data.user)
            const response = await axios.get(`http://127.0.0.1:5000/attendance/${id}`)
            setAttenData(response.data.attendance)
            console.log('Attendance data', response.data.attendance)
        } catch (err) {
            console.log('Attendance error', err)
        }
    };


    const handleDelete = (id) => {
        axios.delete(`http://127.0.0.1:5000/attendance/${id}`)
            .then((res) => window.location.reload())
            .catch(err => console.error(err))
    };

    /* const handleAdd = (id, newData) => {
        axios.post("http://127.0.0.1:5000/attendance", newData)
            .then(res => console.log(res))
            .catch(err => console.log(err))
        setAttenData([...attendanceData, newData]);
    }; */

    /* const handleLeave = (id) => {
        const leaveData = { userId: id }
        axios.get("http://127.0.0.1:5000/leave", leaveData)
        .then(res => console.log("Leave Data", res))
        .catch(err => console.error(err))
    } */

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className="login-container">

                        <section id="attendance-records">
                            <h2>Attendance Records</h2>
                            <Link to={`/createAttendance/${id}`}>
                                <button type="button" className="btn btn-primary">Create Attendance</button>
                            </Link>
                            {attenData.map((item) => (
                                <div key={item._id}>
                                    <p>Status: {item.status}</p>
                                    <p>Created At: {item.createdAt}</p>
                                    <Link to={`/editAttendance/${item._id}`}>
                                        <button type="button" className='btn btn-primary'>Edit</button>
                                    </Link>
                                    <button type="button" className="btn btn-primary" onClick={() => handleDelete(`${item._id}`)}>Delete</button>
                                </div>
                            ))}
                        </section>
                        <div className="text-center mt-3">
                            <h3>Attendance Records for {user ? user.name : ''}</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ViewAttendance
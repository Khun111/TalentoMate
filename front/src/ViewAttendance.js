import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, Link, useNavigate } from 'react-router-dom'

function ViewAttendance() {
    const [attenData, setAttenData] = useState([])
    const { id } = useParams()
    const [user, setUser] = useState(null)
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
            .then((res) => {
                navigate('/dashboard/employee')
                /* console.log(res.status)
                setAttenData(attenData.filter((item) => item.id !== id)); */
            })
            .catch(err => console.error(err))
    };

    /* const handleAdd = (id, newData) => {
        axios.post("http://127.0.0.1:5000/attendance", newData)
            .then(res => console.log(res))
            .catch(err => console.log(err))
        setAttenData([...attendanceData, newData]);
    }; */

    /* const handleEdit = (id, newData) => {
        axios.patch(`http://127.0.0.1:5000/attendance/${id}`, newData)
            .then(res => {
                navigate(`/editAttendance/${id}`)
                console.log(res)
            })
            .catch(err => console.error(err))
        const newAttendanceData = attenData.map((attendance) => {
            attendance.id !== id ? attendance : newData
        })
        setAttenData(newAttendanceData);
    }; */
    
    /* const handleLeave = (id) => {
        const leaveData = { userId: id }
        axios.get("http://127.0.0.1:5000/leave", leaveData)
        .then(res => console.log("Leave Data", res))
        .catch(err => console.error(err))
    } */

    return (
        <section id="attendance-records">
            <h2>Attendance Records</h2>
            <Link to={`/createAttendance/${id}`}>
                <button type="button" className="btn btn-primary">Create Attendance</button>
            </Link>
            {attenData.map((item) => (
                <div key={item._id}>    
                    <p>Status: {item.status}</p>
                    <p>Created At: {item.createdAt}</p>
                    <p>Name: {user ? user.name : ''}</p>
                    <p>Email: {user ? user.email : ''}</p>
                    {/* <button type="button" className='btn btn-primary' onClick={() => handleEdit(`${item._id}`)}>Edit</button> */}
                    <button type="button" className="btn btn-primary" onClick={() => handleDelete(`${item._id}`)}>Delete</button>
                    {/* <button type="button" className="btn btn-primary" onClick={() => handleLeave(`${item._id}`)}>Leave Requests</button> */}
                </div>
            ))}
        </section>

    )
}

export default ViewAttendance
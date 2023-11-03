import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'


function CreateAttendance() {
    const { id } = useParams()
    const [values, setValues] = useState({
        status: ''
    })
    const navigate = useNavigate()

    const handleAdd = (newData) => {
        axios.post("http://127.0.0.1:5000/attendance", newData)
            .then(res => {
                console.log(res)
                setValues({ status: '' });
                navigate('/dashboard/employee')
            })
            .catch(err => console.log(err))
    };

    /* const createAttendance = () => {
        console.log({ userId: id, status: values.status })
        axios.post('http://127.0.0.1:5000/attendance', { userId: id, status: values.status })
            .then((res) => console.log(res))
            .catch((err) => console.error(err))
    } */

    const newData = { userId: id, status: values.status }

    const handleSubmit = async (e) => {
        e.preventDefault();
        handleAdd(newData);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="status">Status:</label>
                <select name="status" onChange={handleChange} required>
                    <option selected disabled>Mark Attendance</option>
                    <option value="Absent">Absent</option>
                    <option value="Present">Present</option>
                </select>
                <button>Submit</button>
            </div>
        </form>
    )
}

export default CreateAttendance
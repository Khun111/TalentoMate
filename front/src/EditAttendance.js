import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

function EditAttendance() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        status: '',
        id: id
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const newData = { id, status: formData.status }
    console.log(newData)

    const handleEdit = (e, newData) => {
        console.log(e)
        e.preventDefault()
        axios.put(`http://127.0.0.1:5000/attendance`, newData)
            .then(res => {
                console.log(res)
                navigate('/dashboard')
            })
            .catch(err => console.error(err.response.data))
    };
    return (
        <form onSubmit={(e) => handleEdit(e, newData)}>
            <label htmlFor='status'>Status:</label>
            <select name="status" onChange={handleChange} required>
                <option selected disabled>Update Attendance</option>
                <option value="Absent">Absent</option>
                <option value="Present">Present</option>
            </select>
            <button>Submit</button>
        </form>
    )
}

export default EditAttendance
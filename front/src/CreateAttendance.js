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
                window.location.reload()
            })
            .catch(err => console.log(err))
    };
    
    const newData = { userId: id, status: values.status }

    const handleSubmit = async (e) => {
        e.preventDefault();
        handleAdd(newData);
        navigate(`/attendance/${id}`);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="login-container">
            <h2 className="text-center mb-4">Create Attendance</h2>
            <form onSubmit={handleSubmit}>
            <div className='form-group'>
                <label htmlFor="status">Status:</label>
                <select name="status" onChange={handleChange} className='form-control' required>
                    <option selected disabled>Mark Attendance</option>
                    <option value="Absent">Absent</option>
                    <option value="Present">Present</option>
                </select>
                <button>Submit</button>
            </div>
        </form>
            </div>
          </div>
        </div>
      </div>
    )
}

export default CreateAttendance
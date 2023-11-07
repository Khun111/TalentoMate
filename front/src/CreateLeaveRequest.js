import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'


function CreateLeaveRequest() {
    const navigate = useNavigate();
    const { id } = useParams();
    
    const [values, setValues] = useState({
        userId: id,
        start_date: '',
        end_date: '',
        reason: ''
    })

    const handleAdd = async (newData) => {
        try{
            const response = await axios.post(`http://127.0.0.1:5000/leave`, newData)
            console.log("handleAdd function data", response)
            setValues(newData)
        } catch (err) {
            console.error(err)
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({...values, [name]: value});
    }

    const newData = { userId: values.userId, start_date: values.start_date, end_date: values.end_date, reason: values.reason, status: 'Pending' }
    console.log(newData)

    const handleSubmit = async (e) => {
        e.preventDefault();
        await handleAdd(newData)
        navigate('/dashboard/employee')
    }

    return (
        <div>
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="login-container">
            <h2 className="text-center mb-4">Create Leave Request</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor='userId'>UserId:</label>
                    <input className='form-control' type='text' value={values.userId} disabled></input>
                </div>
                <div className="form-group">
                    <label htmlFor='start_date'>Start Date: </label>
                    <input className='form-control' type='date' placeholder='Select Start Date' onChange={handleChange} name='start_date' value={values.start_date}></input>
                </div>
                <div class="form-group">
                    <label htmlFor='end_date'>End Date: </label>
                    <input className='form-control' type='date' placeholder='Select End Date' onChange={handleChange} name='end_date' value={values.end_date}></input>
                </div>
                <div className="form-group">
                    <label htmlFor='reason'>Reason: </label>
                    <input className='form-control' type='text' placeholder='Enter Reason' onChange={handleChange} name='reason' value={values.reason}></input>
                </div>
                <button className='btn btn-primary btn-block'>Submit</button>
            </form>
            <div className="text-center mt-3">
                <h3>Create Leave Request</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
            
        </div>
    )
}

export default CreateLeaveRequest
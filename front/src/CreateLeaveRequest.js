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

    const newData = { userId: values.userId, start_date: values.start_date, end_date: values.end_date, reason: values.reason }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await handleAdd(newData)
        navigate('/dashboard/employee')
    }

    return (
        <div>
            <h1>CreateLeaveRequest</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor='userId'>UserId:</label>
                <input type='text' value={values.userId} disabled></input>
                <label htmlFor='start_date'>Start Date: </label>
                <input type='date' placeholder='Select Start Date' onChange={handleChange} name='start_date' value={values.start_date}></input>
                <label htmlFor='end_date'>End Date: </label>
                <input type='date' placeholder='Select End Date' onChange={handleChange} name='end_date' value={values.end_date}></input>
                <label htmlFor='reason'>Reason: </label>
                <input type='text' placeholder='Enter Reason' onChange={handleChange} name='reason' value={values.reason}></input>
                <button>Submit</button>
            </form>
        </div>
    )
}

export default CreateLeaveRequest
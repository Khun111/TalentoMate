import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

function EditUser() {
    const {id}= useParams();
    const [values, setValues] = useState({
        id: id,
        name: '',
        email: '',
        job: '',
        role: ''
    })
    useEffect(() => {
        axios.get(`http://127.0.0.1:5000/employee/${id}`)
        .then(res => {
            console.log("res.data.user data:",res.data.user)
            setValues({...values, name: res.data.user.name, email: res.data.user.email, job: res.data.user.job, role: res.data.user.role})
        })
        .catch(err => console.error(err))
    }, [])

    const navigate = useNavigate();

    const handleSubmit = (e) => {
    
        e.preventDefault();
        console.log(values.email)
        axios.put(`http://127.0.0.1:5000/employee/${id}`, {email: values.email})
        .then(res => {
            console.log(res.data)
            navigate('/dashboard')
        })
        .catch(err => console.error(err))
    }

    return (

        <form onSubmit={handleSubmit}>
            <div>
                {/* <label htmlFor='name'>Name</label>
                <input type='text' name='name' className='form-control' placeholder='Enter Name' value={values.name} onChange={(e => setValues({...values, name: e.target.value}))}></input> */}
                <label htmlFor="name">Name:</label>
                <input type="text" name="name" className="form-control" placeholder="Enter Name" value={values.name} disabled/>
                <label htmlFor="email">email:</label>
                <input type="email" name="email" className="form-control" placeholder="Enter email" value={values.email} onChange={e => setValues({...values, email: e.target.value})}/>
                <label htmlFor="job">Job:</label>
                <input type="text" name="job" className="form-control" placeholder="Enter Job" value={values.job} disabled/>
                <label htmlFor="role">Role:</label>
                <input type="text" name="role" className="form-control" placeholder="Enter Role" value={values.role} disabled/>
            </div> <br />
            <button className='btn btn-info'>Update</button>
        </form>

    )
}

export default EditUser
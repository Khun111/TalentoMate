import React, { useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom';

function EditLeave() {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        id: id,
        data: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const newData = { id: formData.id, data: formData.data }

    const handleEdit = (e, newData) => {
        console.log(e)
        e.preventDefault()
        console.log(newData)
        axios.put('http://127.0.0.1:5000/leave', newData)
        .then(res => console.log(res))
        .catch (err => console.log(err))
    }

    return (
        <form onSubmit={(e) => handleEdit(e, newData)}>
            <label htmlFor='reason'>Reason: </label>
            <input type='text' name='data' onChange={handleChange}></input>
            <button>Submit</button>
        </form>
    )
}

export default EditLeave
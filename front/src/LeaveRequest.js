import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom';

function LeaveRequest() {
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [user, setUser] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        leaveData();
    }, []);

    const leaveData = async () => {
        const UserData = await axios.get(`http://127.0.0.1:5000/employee/${id}`)
        console.log("UserData: ", UserData.data.user)
        setUser(UserData.data.user)
        await axios.get(`http://127.0.0.1:5000/leave/${id}`)
        .then(res => {
            console.log(res)
            setData(res.data.leave)
        })
        .catch(err => console.log(err))
    }

    const handleDelete = async (id) => {
        await axios.delete(`http://127.0.0.1:5000/leave/${id}`)
        .then(res => {
            navigate('/dashboard/employee')
            console.log("HandleDelete Function Data", res)
        })
        .catch(err => console.log(err))
    }

    /* const handleAdd = async (id) => {
        const [ startDate, setStartDate ] = useState('');
        const [ endDate, setEndDate ] = useState('');
        const [ reason, setReason ] = useState('');

        try{
            await axios.post(`http://127.0.0.1:5000/leave`, {
                userId: id,
                start_date: startDate,
                end_date: endDate,
                reason,
            })
            .then(res => console.log("handleAdd function data", res))
            .catch((err) => console.error(err))
        } catch((err) => {
            console.error(err)
        })
    } */

    const handleEdit = async (id) => {
        const response = await axios.patch(`http://127.0.0.1:5000/leave/${id}`)
        console.log("handleEdit function id: ", response)
    }

    return (
        <form>
            <section id="leave-records">
                <h2>Leave Records</h2>
                <Link to={`/createLeaveRequest/${id}`}>
                    <button type='submit' className='btn btn-primary'>Create Leave Record</button>
                </Link>
                {data.map((item) => (
                    <div key={item._id}>
                        <label htmlFor='username'>User Name:</label>
                        <input type='text' value={user ? user.name : ''}></input>
                        <label htmlFor='useremail'>User Email:</label>
                        <input type='email' value={user ? user.email : ''}></input>
                        <label htmlFor='userjob'>Job Description:</label>
                        <input type='text' value={user ? user.job : ''}></input>
                        <label htmlFor='userrole'>Role</label>
                        <input type='text' value={user ? user.role : ''}></input>
                        <label htmlFor='createdAt'>Leave CreatedAt:</label>
                        <input type='text' value={item.createdAt} ></input>
                        <label htmlFor='startdate'>Leave Start Date:</label>
                        <input type='date' value={item.start_date} ></input>
                        <label htmlFor='enddate'>Leave End Date:</label>
                        <input type='date' value={item.end_date} ></input>
                        <label htmlFor='reason'>Reason:</label>
                        <input type='text' value={item.reason} ></input>

                        <button type="button" className="btn btn-primary" onClick={(e) => handleDelete(`${item._id}`)}>Delete Leave Request</button>
                        <button type="button" className="btn btn-primary" onClick={(e) => handleEdit(`${item._id}`)}>Edit Leave Request</button>
                    </div>
                ))}
            </section>
        </form>
    )
}

export default LeaveRequest
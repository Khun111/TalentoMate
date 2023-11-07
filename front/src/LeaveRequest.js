import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom';
import './LeaveRequest.css';


const handleDelete = async (id) => {
    await axios.delete(`http://127.0.0.1:5000/leave/${id}`)
        .then(() => {
            window.location.reload()
        })
        .catch(err => console.log(err))
}

function LeaveData({ item }) {
    return (
        <div key={item._id} id='LeaveDatadiv'>
            <p>Leave Record Created At: <br />{item.createdAt}</p>
            <p>Leave Start Date: <br />{item.start_date}</p>
            <p>Leave End Date: <br />{item.end_date}</p>
            <p>Reason: {item.reason}</p>
            <p>Status: {item.status}</p>
            <div className='mb-10'>
                <button type="button" className="btn btn-primary btn-block" onClick={(e) => handleDelete(`${item._id}`)}>Delete Leave Request</button>
            </div>
            <div className='mt-10'>
            <Link to={`/editLeaveRequest/${item._id}`}>
                <button type="button" className="btn btn-primary btn-block">Edit Leave Request</button>
            </Link>
            </div>
            
        </div>
    )
}

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
        setUser(UserData.data.user)
        await axios.get(`http://127.0.0.1:5000/leave/${id}`)
            .then(res => setData(res.data.leave))
            .catch(err => console.log(err))
    }



    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className="login-container">
                            <section id="leave-records">
                                <h2>Leave Records</h2>
                                <Link to={`/createLeaveRequest/${id}`}>
                                    <button type='submit' className='btn btn-primary'>Create Leave Record</button>
                                </Link>
                                {data.map((item) => (
                                    <LeaveData item={item} key={item.id} />
                                ))}
                            </section>
                        <div className="text-center mt-3">
                            <h3>Leave Requests for {user ? user.name : ''}</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LeaveRequest
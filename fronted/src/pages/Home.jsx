import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils/utils.js';
import { ToastContainer } from 'react-toastify';

function Home() {
    const [loggedInUser, setLoggedInUser] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        setLoggedInUser(localStorage.getItem('loggedInUser'))
    }, [])

    const handleLogout = (e) => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        handleSuccess('User Logout');
        setTimeout(() => {
            navigate('/login');
        }, 1000)
    }

    return (
        <div>
            <nav>
                <button onClick={handleLogout}>Logout</button>
            </nav>
            <div className="content">
                <h1>Welcome - {loggedInUser} </h1>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Home
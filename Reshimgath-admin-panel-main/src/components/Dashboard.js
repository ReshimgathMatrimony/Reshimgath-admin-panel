import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../components/Dashboard.css'
import logoutIcon from '../Icons/logout.png'
import Sidebar from './Sidebar'

const Dashboard = () => {
    const navigate = useNavigate()
    useEffect(() => {
        if (localStorage.getItem('accesstoken')) {
        }
        else {
            navigate('/login')
        }

    }, [])
    return (
        <>
            <div className="col-lg-3">
                <Sidebar />
            </div>
            <div className='col-lg-9'>
                <div className="row mt-3">
                    <Link to="/logout">
                        <img src={logoutIcon} alt="" className='float-end' />
                    </Link>
                </div>
                <h1 className="text-center mt-5 mb-5">Welcome Admin</h1>
            </div>
        </>
    )
}

export default Dashboard
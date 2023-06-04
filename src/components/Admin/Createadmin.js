import React, { useEffect } from 'react';
import './Createadmin.css';
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from '../Sidebar';
import logoutIcon from '../../Icons/logout.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Createadmin = () => {
    const notify = (p, msg) => p ? toast.success(msg) : toast.error(msg);
    const navigate = useNavigate()
    useEffect(() => {
        if (localStorage.getItem('accesstoken')) {
        }
        else {
            navigate('/login')
        }

    }, [])
    const handleSubmit = (e) => {
        e.preventDefault()
        const formdata = new FormData(e.target);
        const data = Object.fromEntries(formdata.entries());
        axios.post(`${process.env.REACT_APP_BASEURL}/admincrud/createadmin`, data, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem('accesstoken')
            }
        }).then((res) => {
            notify(1, "Admin Created Successfully..!")

            setTimeout(() => {
                navigate('/admin')
            }, 2000)

        }).catch((err) => {
            // console.log(err)
            notify(0, "Oops..Something went wrong!")
        })
        e.target.email.value = "";
        e.target.password.value = ""
    }

    return (
        <>
            <div className="col-lg-3">
                <Sidebar />
            </div>
            <div className="col-lg-9">
                <div classNameName="container">
                    <div className="row mt-3">
                        <Link to="/logout">
                            <img src={logoutIcon} alt="" className='float-end' />
                        </Link>
                    </div>
                    <h3 className='mt-5 fw-bold'>Create New Admin</h3>
                    <form className='mt-5 createadmin_div p-3' onSubmit={handleSubmit} autoComplete="off">
                        <ToastContainer position="bottom-left" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
                        <div className="mt-4 mb-3">
                            <input name='email' type="email" placeholder='Admin Email' className="form-control" />
                        </div>

                        <div className="mb-4">
                            <input name='password' type="password" placeholder='Admin Password' className="form-control" />
                        </div>

                        <div className="mb-4">
                            <input type="checkbox" name="root" value='true' id="masterCheck" /> &emsp;
                            <label htmlFor="masterCheck">Is this Master Admin?</label>
                        </div>

                        <div className="mb-4">
                            <input type="checkbox" name="canrecharge" id="canrecharge" value='true' /> &emsp;
                            <label htmlFor="canrecharge">Can this Admin Recharge User's Plan?</label>
                        </div>

                        <button type="submit" className="btn btn-primary createAdminBtn mt-3">Create Admin</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Createadmin;
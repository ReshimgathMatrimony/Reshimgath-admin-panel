import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import deleteImg from '../../components/images/bin.png';
import axios from 'axios';
import adminIcon from "../../Icons/admin.png"
import masterAdminIcon from "../../Icons/masterAdmin.png"
import Sidebar from '../Sidebar';
import logoutIcon from '../../Icons/logout.png'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const UserLogs = () => {

    const notify = (p, msg) => p ? toast.success(msg) : toast.error(msg);
    const [logs, setLogs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('accesstoken')) {
            axios.get(`${process.env.REACT_APP_BASEURL}/admincrud/getprofilelogs`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem('accesstoken')
                }
            })
                .then((res) => {
                    setLogs(res.data)
                    console.log(res.data);
                })
                .catch((err) => {
                    notify(0, "Oops..Something went wrong!")
                })
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

            <div className="col-lg-9">
                <div className="row mt-3">
                    <Link to="/logout">
                        <img src={logoutIcon} alt="" className='float-end' />
                    </Link>
                </div>
                <h4 className='text-center mt-5 mb-5'>All Active Admins</h4>
                <ToastContainer position="bottom-left" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Sr.No</th>
                            <th scope="col">User Email</th>
                            <th scope="col">Created By</th>
                            <th scope="col">Created Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            logs.map((value, id) => {
                                return (
                                    <tr>
                                        <td>{id + 1}</td>
                                        <td>{value.createdProfile}</td>
                                        <td>{value.createdBy}</td>
                                        <td>{value.createdAt}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default UserLogs;
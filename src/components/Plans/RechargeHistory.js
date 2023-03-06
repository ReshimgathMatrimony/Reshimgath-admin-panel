import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Sidebar from '../Sidebar'
import logoutIcon from '../../Icons/logout.png'
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const RechargeHistory = () => {
    const notify = (p, msg) => p ? toast.success(msg) : toast.error(msg);
    const navigate = useNavigate()
    const [rechargeData, setRechargeData] = useState([])

    useEffect(() => {
        if (localStorage.getItem('accesstoken')) {
            axios.get('http://localhost:3031/admincrud/gerrechargelist', {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem('accesstoken')
                }
            }).then((res) => {
                setRechargeData(res.data)
            }).catch((err) => {
                notify(0, "Something Went Wrong..!")
            })
        } else {
            navigate('/login')
        }
    }, [])

    // Date Formattor
    const handleDate = (date) => {
        const mydate = new Date(date)
        const newdate = mydate.toLocaleDateString()
        if (newdate === '1/1/1970') {
            return '0'
        } else {
            return newdate
        }
    }
    return (
        <>
            <div className="col-lg-3">
                <Sidebar />
            </div>
            <div className="col-lg-9">
                <div className="row mt-3">
                    <Link to="/logout">
                        <img src={logoutIcon} alt="image" className='float-end' />
                    </Link>
                </div>

                <h4 className='text-center mt-5 mb-4'>Recharge History</h4>
                <ToastContainer position="bottom-left" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Sr.No.</th>
                            <th scope="col">Recharge ID</th>
                            <th scope="col">User Email</th>
                            <th scope="col">Plan Name</th>
                            <th scope="col">Recharge Date</th>
                            <th scope="col">Recharge Expiry</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            rechargeData?.map((val, index) => {
                                return (
                                    <tr>
                                        <td scope="row">{index + 1}</td>
                                        <td scope="col">{val.rechargeId.split('-').pop().toUpperCase()}</td>
                                        <td scope="col">{val.email}</td>
                                        <td scope="col">{val.plan}</td>
                                        <td scope="col">{handleDate(val.rechargeDate)}</td>
                                        <td scope="col">{handleDate(val.expireDate)}</td>
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

export default RechargeHistory
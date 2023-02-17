import React from 'react'
import { Link } from 'react-router-dom'
import Sidebar from '../Sidebar'
import logoutIcon from '../../Icons/logout.png'
const RechargeHistory = () => {
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

                <h4 className='text-center mt-5'>Recharge History</h4>

                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Sr.No</th>
                            <th scope="col">Price</th>
                            <th scope="col">Services Included</th>
                            <th scope="col">Mediator</th>
                            <th scope="col">Profile View Count</th>
                            <th scope="col">Expiry (In Months)</th>
                            <th scope="col">Update</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default RechargeHistory
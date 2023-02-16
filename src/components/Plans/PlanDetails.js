import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import deleteImg from '../../components/images/bin.png';
import editImg from '../../components/images/edit.png';
import Sidebar from '../Sidebar';
import logoutIcon from '../../Icons/logout.png'
import axios from 'axios'

const PlanDetails = () => {
  const navigate = useNavigate()
  const [planData, setPlanData] = useState([])

  useEffect(() => {
    if (localStorage.getItem('accesstoken')) {
      axios.get('http://localhost:3031/admincrud/getallplans').then((res) => {
        console.log(res.data)
        setPlanData(res.data)
      }).catch((err) => {
        console.log(err)
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
        <h4 className='text-center mt-5'>Plan Details</h4>
        <div className='d-grid gap-2 d-md-flex justify-content-md-end '>
          <button className='btn createAdminBtn me-md-2 mt-3 mb-3 '><Link className='text-white text-decoration-none' to="/createplan">Add New Plan</Link></button>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Sr.No</th>
              <th scope="col">Plan</th>
              <th scope="col">Rs</th>
              <th scope="col">Update</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>@mdo</td>
              <td><img src={editImg} /></td>
              <td><img src={deleteImg} /></td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}

export default PlanDetails;
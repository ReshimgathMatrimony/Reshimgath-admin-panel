import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from '../Sidebar';
import logoutIcon from '../../Icons/logout.png'
import axios from 'axios'
const CustomerQueries = () => {
  const navigate = useNavigate()

  const [customerQuery, setCustomerQuery] = useState([])

  useEffect(() => {
    if (localStorage.getItem('accesstoken')) {

      axios.get('http://localhost:3031/admincrud/customerqueries').then((res) => {
        setCustomerQuery(res.data)
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
        <h4 className='text-center mt-5 mb-5'>Customer Queries</h4>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Sr.No</th>
              <th scope="col">User Query</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Contact</th>
              <th scope="col">Date</th>
              <th scope="col">Time</th>
            </tr>
          </thead>
          <tbody>
            {
              customerQuery?.map((val, id) => {
                return (
                  <tr>
                    <th scope="row">{id + 1}</th>
                    <td>{val.message}</td>
                    <td>{val.name}</td>
                    <td>{val.email}</td>
                    <td>{val.contact}</td>
                    <td>{val.createdAt.date}</td>
                    <td>{val.createdAt.time}</td>
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

export default CustomerQueries;
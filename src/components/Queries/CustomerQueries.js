import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from '../Sidebar';
import logoutIcon from '../../Icons/logout.png'
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const CustomerQueries = () => {
  const navigate = useNavigate()
  const notify = (p, msg) => p ? toast.success(msg) : toast.error(msg);
  const [customerQuery, setCustomerQuery] = useState([])

  useEffect(() => {
    if (localStorage.getItem('accesstoken')) {

      axios.get('https://reshimgath-backend-qgcr.vercel.app/admincrud/customerqueries', {
        headers: {
          "Content-Type": "application/json",
          "Authorization": localStorage.getItem('accesstoken')
        }
      }).then((res) => {
        setCustomerQuery(res.data)
      }).catch((err) => {
        notify(0, "Something went wrong...!")
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
        <ToastContainer position="bottom-left" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
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
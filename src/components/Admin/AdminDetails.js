import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import deleteImg from '../../components/images/bin.png';
import axios from 'axios';
import adminIcon from "../../Icons/admin.png"
import masterAdminIcon from "../../Icons/masterAdmin.png"
import Sidebar from '../Sidebar';
import logoutIcon from '../../Icons/logout.png'

const AdminDetails = () => {
  const navigate = useNavigate()
  useEffect(() => {
    if (localStorage.getItem('accesstoken')) {
    }
    else {
      navigate('/login')
    }

  }, [])

  const [admin, setAdmin] = useState([]);
  const [status, setStatus] = useState(false)
  useEffect(() => {
    axios.get("http://localhost:3031/admincrud/getalladmins")
      .then((res) => {
        setAdmin(res.data)
      })
      .catch((err) => {
        console.log(err);
      })
  }, [status])

  const deleteUser = (id) => {
    if (id === "63e77785088184f828fe0f36") {
      window.alert("You Cannot Delete this Master Admin")
    } else {
      const res = window.confirm("Do You Really Want to Delete user?")
      if (res) {
        axios.post('http://localhost:3031/admincrud/deleteadmin', { id }, {
          headers: {
            "Content-Type": "application/json",
            // "Authorization": localStorage.getItem('accesstoken')
            "Authorization": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNAZ21haWwuY29tIiwicm9vdCI6dHJ1ZSwiaWF0IjoxNjc2MTAwNTkxfQ.LzxSzuv2VSirs7mFNEbU7v_AFj4yM9mfVQC-H-H8wTo'
          }
        }).then((res) => {
          setStatus(!status)
        }).catch((err) => {
          console.log(err)
        })
      }

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
            <img src={logoutIcon} alt="" className='float-end' />
          </Link>
        </div>
        <h4 className='text-center mt-5'>All Active Admins</h4>
        <div className='d-grid gap-2 d-md-flex justify-content-md-end '>
          <button className='btn btn-primary me-md-2 mt-3 mb-3 createAdminBtn'><Link className='text-white text-decoration-none' to="/createadmin">Create New Admin</Link></button>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Sr.No</th>
              <th scope="col">Icon</th>
              <th scope="col">Admin Type</th>
              <th scope="col">Email</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {
              admin.map((value, id) => {
                return (
                  <tr>
                    <td>{id + 1}</td>
                    <td>
                      {
                        value.root ? (<img src={masterAdminIcon} alt="Image" />) : (<img src={adminIcon} alt="Image" />)
                      }
                    </td>
                    <td>
                      {
                        value.root ? (
                          <>
                            <span> Master Admin</span>
                          </>
                        ) : (
                          <>
                            <span>Admin</span>
                          </>
                        )
                      }
                    </td>
                    <td>{value.email}</td>
                    <td><button className='btn border-none' onClick={() => deleteUser(value._id)}><img src={deleteImg} /></button></td>
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

export default AdminDetails;
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

const AdminDetails = () => {

  const notify = (p, msg) => p ? toast.success(msg) : toast.error(msg);
  const [admin, setAdmin] = useState([]);
  const [status, setStatus] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem('accesstoken')) {
      axios.get(`${process.env.REACT_APP_BASEURL}/admincrud/getalladmins`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": localStorage.getItem('accesstoken')
        }
      })
        .then((res) => {
          setAdmin(res.data)
        })
        .catch((err) => {
          notify(0, "Oops..Something went wrong!")
        })
    }
    else {
      navigate('/login')
    }

  }, [status])

  const deleteUser = (id) => {
    if (id === "6405f20168965e509ec1b40a") {
      window.alert("You Cannot Delete this Master Admin")
    } else {
      const res = window.confirm("Do You Really Want to Delete user?")
      if (res) {
        axios.post(`${REACT_APP_BASEURL}/admincrud/deleteadmin`, { id }, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem('accesstoken')
          }
        }).then((res) => {
          setStatus(!status)
          notify(1, "Admin Deleted Successfully..!")
        }).catch((err) => {
          notify(0, "Oops...Something went wrong!")
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
        <ToastContainer position="bottom-left" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
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
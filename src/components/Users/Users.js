import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import deleteImg from '../../components/images/bin.png';
import editImg from '../../components/images/edit.png';
import Sidebar from '../Sidebar';
import logoutIcon from '../../Icons/logout.png'
import rechargeIcon from '../../Icons/payment.png'
import axios from 'axios'
import '../Users/Users.css'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const Users = () => {
  const notify = (p, msg) => p ? toast.success(msg) : toast.error(msg);
  const handleDate = (date) => {
    const mydate = new Date(date)
    const newdate = mydate.toLocaleDateString()
    if (newdate === '1/1/1970') {
      return '---'
    } else {
      return newdate
    }
  }

  //********** Deleting User Start *************
  const [status, setStatus] = useState(false)
  const deleteAdmin = (delId, userMail) => {
    const result = window.confirm("Do Your Really Want to Delete?" + userMail)
    if (result) {
      axios.post('https://reshimgath-backend-qgcr.vercel.app/admincrud/deletespecificuser', { id: delId }, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": localStorage.getItem('accesstoken')
        }
      }).then((res) => {
        setStatus(!status)
        notify(1, "User Deleted Successfully..!")
      }).catch((err) => {
        notify(0, "Oopes..Something went wrong!")
      })
    }

  }
  //********** Deleting User End *************

  const [data, setData] = useState([])

  const navigate = useNavigate()
  useEffect(() => {
    if (localStorage.getItem('accesstoken')) {
      axios.get('https://reshimgath-backend-qgcr.vercel.app/admincrud/getallusersfortable', {
        headers: {
          "Content-Type": "application/json",
          "Authorization": localStorage.getItem('accesstoken')
        }
      }).then((res) => {
        setData(res.data)
      }).catch((err) => {
        notify(0, "Something went wrong..!")
      })
    }
    else {
      navigate('/login')
    }

  }, [status])

  // ******************* Filters Section Start *********
  const [filterData, setFilterData] = useState({
    name: '',
    email: ''
  })

  const handleFilter = () => {
    axios.post('https://reshimgath-backend-qgcr.vercel.app/admincrud/getspecificuser', filterData).then((res) => {
      setData(res.data)
      console.log(res.data)
    }).catch((err) => {
      console.log(err)
    })
  }

  const handlePaidUsers = () => {
    axios.get('https://reshimgath-backend-qgcr.vercel.app/admincrud/getpaidusers').then((res) => {
      setData(res.data)
      // console.log(res.data)
    }).catch((err) => {
      console.log(err)
    })
  }

  const handleUnpaidUsers = () => {
    axios.get('https://reshimgath-backend-qgcr.vercel.app/admincrud/getunpaidusers').then((res) => {
      setData(res.data)
      // console.log(res.data)
    }).catch((err) => {
      console.log(err)
    })
  }
  // ****************Filters Section End***********************

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

        <h4 className='text-center mt-5'>All Active Users</h4>
        <ToastContainer position="bottom-left" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
        <div className='col-lg-12 d-grid gap-2 d-flex justify-content-between'>
          <div className="mt-4 mb-3">
            <input type="text" placeholder='Search by Name' onChange={(e) => { setFilterData({ ...filterData, name: e.target.value }) }} className='form-control' autoComplete='off' />
          </div>
          <div className="mt-4 mb-3">
            <input type="text" placeholder='Search by Email' onChange={(e) => { setFilterData({ ...filterData, email: e.target.value }) }} className='form-control' autoComplete='off' />
          </div>
          <div className="mt-4 mb-3">
            <button className="btn createAdminBtn" onClick={handleFilter}>Go</button>
          </div>
          <div className="mt-4 mb-4">
            <button className="btn paidUserBtn" onClick={handlePaidUsers}>Paid Users</button>
          </div>
          <div className="mt-4 mb-4">
            <button className="btn unpaidUserBtn" onClick={handleUnpaidUsers}>Unpaid Users</button>
          </div>
          <div>
            <button className='btn createUserBtn me-md-2 mt-4 mb-4'><Link className='text-white text-decoration-none' to="/addprofile">Create New User</Link></button>
          </div>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Sr.No</th>
              <th scope="col">Email</th>
              <th scope="col">Name</th>
              <th scope="col">Coins</th>
              <th scope="col">Recharge On</th>
              <th scope="col">Expires On</th>
              <th scope="col">Recharge User</th>
              <th scope="col">Update</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {
              data.map((value, idx) => {
                return (
                  <tr>
                    <th scope="row">{idx + 1}</th>
                    <td>{value.email}</td>
                    <td>{value.firstname}</td>
                    <td>{value.coins}</td>
                    <td>{handleDate(value.rechargeDate)}</td>
                    <td>{handleDate(value.rechargExpireDate)}</td>
                    <td>
                      <Link to="/rechargeuser" state={{ email: value.email, coins: value.coins, firstname: value.firstname, rechargExpireDate: value.rechargExpireDate }}><img src={rechargeIcon} /></Link>
                    </td>
                    <td>
                      <Link to="/updateuser" state={{ id: value._id, email: value.email }}><img src={editImg} /></Link>
                    </td>
                    <td>
                      <button className='btn border-none' onClick={() => deleteAdmin(value._id, value.email)} ><img src={deleteImg} /></button>
                    </td>

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

export default Users;
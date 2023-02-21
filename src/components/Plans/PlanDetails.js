import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import deleteImg from '../../components/images/bin.png';
import editImg from '../../components/images/edit.png';
import Sidebar from '../Sidebar';
import logoutIcon from '../../Icons/logout.png'
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const PlanDetails = () => {
  const navigate = useNavigate()
  const notify = (p, msg) => p ? toast.success(msg) : toast.error(msg);
  const [planData, setPlanData] = useState([])

  const [status, setStatus] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('accesstoken')) {
      axios.get('http://localhost:3031/admincrud/getallplans').then((res) => {
        // console.log(res.data)
        setPlanData(res.data)
      }).catch((err) => {
        notify(0, "oops..Something went wrong..")
        // console.log(err)
      })
    }
    else {
      navigate('/login')
    }

  }, [status])

  // ****************** Service Delete **************
  const handleServiceDelete = (id) => {
    const res = window.confirm('Are You Really Want to Delete..?')
    if (res) {
      axios.post('http://localhost:3031/admincrud/deleteplan', { id }).then((res) => {
        // console.log(res.data)
        setStatus(!status)
        notify(1, "Plan Deleted Successfully..!")
      }).catch((err) => {
        // console.log(err)
        notify(0, "oops..Something went wrong..")
      })
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
        <h4 className='text-center mt-5'>Plan Details</h4>
        <ToastContainer position="bottom-left" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
        <div className='d-grid gap-2 d-md-flex justify-content-md-end '>
          <button className='btn createAdminBtn me-md-2 mt-3 mb-3 '><Link className='text-white text-decoration-none' to="/createplan">Add New Plan</Link></button>
        </div>
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
            {
              planData?.map((val, index) => {
                return (
                  <tr>
                    <th scope="row">{index + 1}</th>
                    <td>{val.price}</td>
                    <td>{val.services?.map((value, idx) => {
                      return (
                        <span>{idx + 1}. {value} <br /></span>
                      )
                    })}</td>
                    <td>{val.mediator ? ('Available') : ('Not Available')}</td>
                    <td>{val.contact_count}</td>
                    <td>{val.expiresinMonths}</td>
                    <td><Link to="/updateplan" state={{ id: val._id }}><img src={editImg} /></Link></td>
                    <td><button className='btn' onClick={() => { handleServiceDelete(val._id) }}><img src={deleteImg} /></button></td>
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

export default PlanDetails;
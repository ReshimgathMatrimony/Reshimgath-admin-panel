import React, { useEffect, useState } from 'react';
import './Createplan.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from '../Sidebar';
import logoutIcon from '../../Icons/logout.png'
import crossIcon from '../../Icons/cross.png'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const Createplan = () => {
  const notify = (p, msg) => p ? toast.success(msg) : toast.error(msg);
  const navigate = useNavigate()
  useEffect(() => {
    if (localStorage.getItem('accesstoken')) {
    }
    else {
      navigate('/login')
    }

  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const formdata = new FormData(e.target);
    const data = Object.fromEntries(formdata.entries());
    const payLoad = { ...data, services: JSON.stringify(finalBucket) }
    axios.post(`${REACT_APP_BASEURL}/admincrud/createplan`, payLoad, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem('accesstoken')
      }
    }).then((res) => {
      notify(1, "New plan added successfully..!")
      setTimeout(() => {
        navigate('/plandetails')
      }, 2000)
    }).catch((err) => {
      notify(0, "Oops..Something went wrong!")
    })
    e.target.price.value = ""
    e.target.contact_count.value = ""
    e.target.expiresinMonths.value = ""
    e.target.mediator.value = ""
    setFinalBucket([])
  }

  // ************* Bucket For Plan Description *****************
  const [initialData, setInitialData] = useState('')
  const [finalBucket, setFinalBucket] = useState([])

  const handleBucketData = () => {
    setFinalBucket([...finalBucket, initialData])
  }

  const handleDescDelete = (id) => {
    const newArr = finalBucket.filter((value, index) => {
      return index !== id
    })
    setFinalBucket(newArr)
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

        <div classNameNameName="container">
          <ToastContainer position="bottom-left" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
          <form className='mt-5 createplan_div p-3' onSubmit={handleSubmit} autoComplete="off">
            <h4 className='mb-5'>Add New Plan</h4>

            <div className="mb-4">
              <input type="text" name='price' placeholder='Plan Name With Price (Example: Management Plan - 12999/-)' className="form-control" />
            </div>

            <div className="mb-4">
              <input type="text" onChange={(e) => { setInitialData(e.target.value) }} placeholder='Plan Description' className="form-control" />
              <input type="button" className='bucket_button' onClick={handleBucketData} value="Add Description" />
            </div>

            {
              finalBucket.length === 0 ? ('') : (<h5 className='fw-bold mb-4'>Added Description:</h5>)
            }

            {
              finalBucket?.map((val, idx) => {
                return (
                  <div className="mb-4 d-flex flex-column desciption_div" key={idx} onClick={() => { handleDescDelete(idx) }}>
                    <img src={crossIcon} height="24px" width="24px" className='img-fluid' />
                    <p>{val}</p>
                  </div>
                )
              })
            }

            <div className="mb-4">
              <input type="number" name='contact_count' placeholder='Count of Profile Views' className="form-control" aria-describedby="emailHelp" />
            </div>

            <div className="mb-4">
              <input type="number" name='expiresinMonths' placeholder='Duration in Months: (Example: 6)' className="form-control" aria-describedby="emailHelp" />
            </div>

            <div className="form-check mb-4">
              <input type="checkbox" name='mediator' className="form-check-input" value="true" id="flexCheckChecked" />
              <label className="form-check-label d-flex" for="flexCheckChecked">
                <b>Mediator Service Available?</b>
              </label>
            </div>

            <button type="submit" className="btn createAdminBtn">Submit Now</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Createplan;
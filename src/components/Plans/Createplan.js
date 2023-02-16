import React, { useEffect, useState } from 'react';
import './Createplan.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from '../Sidebar';
import logoutIcon from '../../Icons/logout.png'
import crossIcon from '../../Icons/cross.png'
const Createplan = () => {

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
    axios.post('http://localhost:3031/admincrud/createplan', payLoad).then((res) => {
      // console.log(res.data)
    }).catch((err) => {
      console.log(err)
    })
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

          <form className='mt-5 createplan_div p-3' onSubmit={handleSubmit}>
            <h4 className='mb-5'>Add New Plan</h4>

            <div className="mb-4">
              <input type="text" name='price' placeholder='Price of Plan' className="form-control" />
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
              <input type="number" name='expireinMonths' placeholder='Duration: (Example: 6)' className="form-control" aria-describedby="emailHelp" />
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
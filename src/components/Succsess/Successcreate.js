import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from '../Sidebar';
import './Successcreate.css';
import logoutIcon from "../../Icons/logout.png"
import axios from 'axios'

const Successcreate = () => {

  const navigate = useNavigate()
  useEffect(() => {
    if (localStorage.getItem('accesstoken')) {
    }
    else {
      navigate('/login')
    }

  }, [])

  const imageFormator = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onloadend = () => {
        resolve(reader.result)
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formdata = new FormData(e.target);
    const data = Object.fromEntries(formdata.entries());
    // console.log(data)
    const payLoad = { ...data, image: await imageFormator(data.image) }
    console.log(payLoad);

    axios.post('http://localhost:3031/admincrud/addstories', payLoad, {
      headers: {
        "Content-Type": 'application/json'
      }
    }).then((res) => {
      console.log(res.data)
    }).catch((err) => {
      console.log(err)
    })

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

        <div className="container">
          <form className='mt-5 p-2' onSubmit={handleSubmit}>
            <h3 className='mb-3'>Create New Story</h3>

            <div className="row">
              <div className="col-lg-6 mb-3">
                <p className='d-flex fw-bold mt-2'>Name of Bride</p>
                <input name='women' type="text" placeholder='Name' className="form-control" />
              </div>

              <div className="col-lg-6 mb-3">
                <p className='d-flex fw-bold mt-2'>Name of Groom</p>
                <input name='men' type="text" placeholder='Name' className="form-control" />
              </div>
            </div>

            <div className='mb-3'>
              <p className='d-flex fw-bold mt-3'>Image of Bride & Groom</p>
              <input name='image' type="file" className="form-control" />
            </div>

            <div className="mb-3">
              <p className='d-flex fw-bold mt-4'>Date Of Marriage</p>
              <input name='date' type="date" id="date" className="form-control" />
            </div>

            <button type="submit" className="btn createAdminBtn mt-4">Submit Details</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Successcreate;

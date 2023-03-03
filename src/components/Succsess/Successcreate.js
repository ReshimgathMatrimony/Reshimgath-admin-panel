import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from '../Sidebar';
import './Successcreate.css';
import logoutIcon from "../../Icons/logout.png"
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const Successcreate = () => {
  const notify = (p, msg) => p ? toast.success(msg) : toast.error(msg);

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
      notify(1, "New Success Story Added..!")
      // console.log(res.data)
      setTimeout(() => {
        navigate('/successstories')
      }, 2000)
    }).catch((err) => {
      // console.log(err)
      notify(0, "oops..Something went wrong..!")
    })
    e.target.women.value = ""
    e.target.men.value = ""
    e.target.date.value = ""
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
          <form className='mt-5 p-2' onSubmit={handleSubmit} autoComplete="Off">
            <ToastContainer position="bottom-left" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
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
              <p className='d-flex fw-bold mt-3'>Image of Bride & Groom: (Width:360 x Height:330 Pixels)</p>
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

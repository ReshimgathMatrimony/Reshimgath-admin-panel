import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Sidebar from '../Sidebar';
import './Successupdate.css';
import logoutIcon from "../../Icons/logout.png"
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const Successupdate = () => {
  const notify = (p, msg) => p ? toast.success(msg) : toast.error(msg);
  const location = useLocation()
  const [storyData, setStoryData] = useState({})
  const [dateUpdate, setDateUpdate] = useState('')
  const [prevImg, setPrevImg] = useState('')
  const navigate = useNavigate()

  const newfunction = (sample) => {
    return new Promise((resolve, reject) => {
      resolve(sample.padStart(2, 0))
    })
  }

  const handleDate = async (date) => {
    const mydate = new Date(date)
    let d1 = ''
    let d2 = ''
    const postmortam = mydate.toLocaleDateString().split('/')
    d1 = await newfunction(postmortam[0])
    d2 = await newfunction(postmortam[1])
    setDateUpdate(`${postmortam[2]}-${d1}-${d2}`)
  }
  useEffect(() => {
    if (localStorage.getItem('accesstoken')) {
      axios.post(`${process.env.REACT_APP_BASEURL}/admincrud/getonestory`, { id: location.state.id }, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": localStorage.getItem('accesstoken')
        }
      }).then((res) => {
        setStoryData(res.data)
        setDateUpdate(handleDate(res.data.date))
        setPrevImg(res.data.image)

      }).catch((err) => {
        notify(0, "Something went wrong..!")
      })
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
    let newImg
    data.image.name === "" ? (newImg = prevImg) : (newImg = await imageFormator(data.image))
    const payLoad = { ...data, image: newImg, id: location.state.id }

    axios.post(`${process.env.REACT_APP_BASEURL}/updatestories`, payLoad, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem('accesstoken')
      }
    }).then((res) => {
      notify(1, "Success Story Updated..!")
      setTimeout(() => {
        navigate('/successstories')
      }, 2000)
    }).catch((err) => {
      notify(0, "Oops..Something went wrong..!")
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
            <h3 className='mb-3'>Update Success Story</h3>
            <ToastContainer position="bottom-left" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
            <div className="row">
              <div className="col-lg-6 mb-3">
                <p className='d-flex fw-bold mt-2'>Update Name of Bride</p>
                <input name='women' type="text" value={storyData.women} onChange={((e) => { setStoryData({ ...storyData, women: e.target.value }) })} placeholder='Name' className="form-control" />
              </div>

              <div className="col-lg-6 mb-3">
                <p className='d-flex fw-bold mt-2'>Update Name of Groom</p>
                <input name='men' type="text" value={storyData.men} onChange={((e) => { setStoryData({ ...storyData, men: e.target.value }) })} placeholder='Name' className="form-control" />
              </div>
            </div>

            <div className='mb-3'>
              <p className='d-flex fw-bold mt-3'>Previous Image:</p>
              <img src={storyData.image} className='d-flex' height="70px" width="100px" />
            </div>

            <div className='mb-3'>
              <p className='d-flex fw-bold mt-3'>Update Image of Bride & Groom</p>
              <input type="file" name='image' className="form-control" />
            </div>

            <div className="mb-3">
              <p className='d-flex fw-bold mt-4'>Update Date Of Marriage</p>
              <input type="date" name='date' value={dateUpdate} onChange={(e) => { setDateUpdate(e.target.value) }} className="form-control" />
            </div>

            <button type="submit" className="btn createAdminBtn mt-4">Update Details Now</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Successupdate;

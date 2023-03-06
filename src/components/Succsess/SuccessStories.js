import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import deleteImg from '../../components/images/bin.png';
import editImg from '../../components/images/edit.png';
import axios from 'axios';
import Sidebar from '../Sidebar';
import logoutIcon from '../../Icons/logout.png'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const SuccessStories = () => {
  const notify = (p, msg) => p ? toast.success(msg) : toast.error(msg);

  const [status, setStatus] = useState(false)
  const [success, setSuccess] = useState([]);

  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem('accesstoken')) {
      axios.get("http://localhost:3031/admincrud/getstories")
        .then((res) => {
          setSuccess(res.data)
        })
        .catch((err) => {
          notify(0, "Something went wrong..!")
        })
    }
    else {
      navigate('/login')
    }

  }, [status])


  //Deleting Success Story
  const handleDeleteStory = (id) => {
    const res = window.confirm("Delete you really want to delete?")
    if (res) {
      axios.post('http://localhost:3031/admincrud/deletestory', { id }, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": localStorage.getItem('accesstoken')
        }
      }).then((res) => {
        setStatus(!status)
        notify(1, "Story Deleted Successfully..!")
      }).catch((err) => {
        notify(0, "Oops..Something went wrong!")
      })
    }
  }

  //Formating marriage date
  const changeDate = (takedate) => {
    const mydate = new Date(takedate)
    return `${mydate.toLocaleDateString()}`
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
        <h4 className='text-center mt-5'>Success Stories</h4>
        <ToastContainer position="bottom-left" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
        <div className='d-grid gap-2 d-md-flex justify-content-md-end '>
          <button className='btn createAdminBtn me-md-2 mt-3 mb-3 '><Link className='text-white text-decoration-none' to="/successcreate">Add New Story</Link></button>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Sr.No</th>
              <th scope="col">Bride & Groom</th>
              <th scope="col">Date Of Marriage</th>
              <th scope="col">Image</th>
              <th scope="col">Update</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {
              success.map((value, id) => {
                return (
                  <tr className='text-center'>
                    <td>{id + 1}</td>
                    <td>{value.men} & {value.women}</td>
                    <td>{changeDate(value.date)}</td>
                    <td><img src={value.image} alt="image" height="50px" width="70px" /></td>
                    <td><Link to="/successupdate" state={{ id: value._id }}><img src={editImg} /></Link></td>
                    <td><button className='btn' onClick={() => { handleDeleteStory(value._id) }}><img src={deleteImg} /></button></td>
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

export default SuccessStories;
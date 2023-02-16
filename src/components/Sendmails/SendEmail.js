import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from '../Sidebar';
import logoutIcon from '../../Icons/logout.png'
const SendEmail = () => {
  const navigate = useNavigate()
  useEffect(() => {
    if (localStorage.getItem('accesstoken')) {
    }
    else {
      navigate('/login')
    }

  }, [])
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
        <div>SendEmail</div>

      </div>
    </>
  )
}

export default SendEmail;
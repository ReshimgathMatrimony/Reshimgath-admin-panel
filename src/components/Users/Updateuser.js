import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Sidebar from '../Sidebar'

const Updateuser = () => {

  const navigate = useNavigate()
  const location = useLocation()

  console.log(location.state.id)

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
        <div>Updateuser</div>

      </div>
    </>
  )
}

export default Updateuser;
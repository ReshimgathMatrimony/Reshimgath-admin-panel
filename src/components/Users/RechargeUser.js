import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RechargeUser = () => {
  const navigate = useNavigate()
  useEffect(() => {
    if (localStorage.getItem('accesstoken')) {
    }
    else {
      navigate('/login')
    }

  }, [])
  return (
    <div>RechargeUser</div>
  )
}

export default RechargeUser;
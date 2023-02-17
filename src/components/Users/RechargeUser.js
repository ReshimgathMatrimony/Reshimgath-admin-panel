import React, { useEffect, useState } from 'react';
import './RechargeUser.css'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Sidebar from '../Sidebar';
import logoutIcon from '../../Icons/logout.png'
import axios from 'axios'
import checkIcon from '../../Icons/checked.png'
import coinIcon from '../../Icons/star.png'
import timerIcon from '../../Icons/timer.png'
import supportIcon from '../../Icons/support.png'

const RechargeUser = () => {
  const navigate = useNavigate()
  const location = useLocation()
  // console.log(location.state.email)
  const [plan, setPlan] = useState({})
  const [data, setData] = useState([])
  useEffect(() => {
    if (localStorage.getItem('accesstoken')) {

      axios.get('http://localhost:3031/admincrud/getplannamesonly').then((res) => {
        console.log(res.data)
        setData(res.data)
      }).catch((err) => {
        console.log(err)
      })

    }
    else {
      navigate('/login')
    }

  }, [])

  const handlePlanSelect = (selectedId) => {
    if (selectedId !== 'temp') {
      axios.post('http://localhost:3031/admincrud/getsingleplan', { id: selectedId }).then((res) => {
        setPlan(res.data)
      }).catch((err) => {
        console.log(err)
      })
    }
  }

  //Recharging User
  const handleRecharge = () => {
    window.confirm("Do you really want to recharge this user?")
    const payLoad = { email: location.state.email, coins: plan.contact_count, plan: plan.price, days: (plan.expiresinMonths * 30) }
    // console.log(payLoad)
    axios.post('http://localhost:3031/admincrud/rechargeuser', payLoad).then((res) => {
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
      <div className="col-lg-9" >
        <div className="row mt-3">
          <Link to="/logout">
            <img src={logoutIcon} alt="image" className='float-end' />
          </Link>
        </div>

        <h4 className='text-center mt-4 mb-4'>Recharge User</h4>

        <div className="row justify-content-center mb-4">
          <div className="col-lg-10 recharge_user_mail"><h5 className='text-center'>User Mail ID : {location.state.email}</h5></div>

          <div className="col-lg-10 mt-4">
            <h6 className='d-flex mb-3'>Select Plan to Recharge: </h6>
            <select name="price" className="form-select" onChange={(e) => { handlePlanSelect(e.target.value) }} aria-label=".form-select-sm example">
              <option value="temp" selected>--- Select Plan ---</option>
              {
                data?.map((val, id) => {
                  return (
                    <option value={val._id} key={id}>{val.price}</option>
                  )
                })
              }

            </select>
          </div>

          {/* plan card start */}
          {
            Object.keys(plan).length !== 0 ? (<div className="col-lg-6 mt-4 includes_main_div">

              <h5 className='m-auto'>{plan.price}</h5>
              <h6><img src={coinIcon} alt="img" /> Can View Contact Details of {plan.contact_count} Profiles.</h6>
              <h5><img src={timerIcon} alt="img" /> {plan.expiresinMonths} Months</h5>
              <h5><img src={supportIcon} alt="img" /> Service Person {plan.mediator ? ('Available') : ('Not Available')}</h5>
              <div>
                <ul id="plan_includes">
                  {plan.services?.map((value, idx) => {
                    return (
                      <li key={idx}> <img src={checkIcon} alt="img" height='24px' width="24px" /> <span>{value}</span></li>
                    )
                  })}
                </ul>

              </div>
              <button className='rechargeBtn' onClick={handleRecharge}>Recharge Now</button>
            </div>) : ('')
          }

        </div>


      </div>
    </>
  )
}

export default RechargeUser;
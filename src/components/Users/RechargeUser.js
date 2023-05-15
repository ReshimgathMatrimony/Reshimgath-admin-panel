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
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import ReactLoading from 'react-loading';

const RechargeUser = () => {
  const navigate = useNavigate()
  const location = useLocation()
  // console.log(location.state.rechargExpireDate)
  const notify = (p, msg) => p ? toast.success(msg) : toast.error(msg);

  const [loading, setLoading] = useState(false)
  const [plan, setPlan] = useState({})
  const [data, setData] = useState([])

  // console.log(finalRemain)

  useEffect(() => {
    if (localStorage.getItem('accesstoken')) {

      axios.get(`${REACT_APP_BASEURL}/admincrud/getplannamesonly`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": localStorage.getItem('accesstoken')
        }
      }).then((res) => {
        setData(res.data)
      }).catch((err) => {
        notify(0, "Something went wrong...!")
      })

    }
    else {
      navigate('/login')
    }

  }, [])

  const handlePlanSelect = (selectedId) => {
    if (selectedId !== 'temp') {
      axios.post(`${REACT_APP_BASEURL}/admincrud/getsingleplan`, { id: selectedId }, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": localStorage.getItem('accesstoken')
        }
      }).then((res) => {
        setPlan(res.data)
      }).catch((err) => {
        notify(0, "Something went wrong..!")
      })
    }
  }

  const changeDate = () => {
    const mydate = new Date(location.state.rechargExpireDate)
    if (mydate.toLocaleDateString() === '1/1/1970') {
      return 0
    } else {
      const prevDate = new Date(location.state.rechargExpireDate)
      const date = new Date()

      const convertedPrevDate = prevDate.getTime() - date.getTime()
      const remain = convertedPrevDate / (1000 * 3600 * 24)
      const finalRemain = Math.round(remain)
      return finalRemain
    }
  }

  //Recharging User
  const handleRecharge = () => {
    const res = window.confirm("Do you really want to recharge this user?")
    if (res) {
      setLoading(true)
      const payLoad = { email: location.state.email, coins: plan.contact_count + location.state.coins, plan: plan.price, days: changeDate() + plan.expiresinMonths * 30, details: JSON.stringify(plan.services), firstname: location.state.firstname, }
      // console.log(payLoad)
      axios.post(`${REACT_APP_BASEURL}/admincrud/rechargeuser`, payLoad, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": localStorage.getItem('accesstoken')
        }
      }).then((res) => {
        notify(1, "User Recharge Done..!")
        setLoading(false)
        setTimeout(() => {
          navigate(-1)
        }, 2000);
      }).catch((err) => {
        notify(0, "oops..Something went wrong..!")
      })
    }

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
        <ToastContainer position="bottom-left" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
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

              <h6><img src={coinIcon} alt="img" /> Can View Contact Details of Total: {plan.contact_count}  {location.state.coins === 0 ? ('') : (<span> + {location.state.coins} = {location.state.coins + plan.contact_count} </span>)} Profiles.</h6>

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
              {
                loading ?
                  (<div className='mt-10'><ReactLoading type={'spinningBubbles'} color={'#12e56'} height={'40px'} width={'40px'} /></div>)
                  :
                  (<button className='rechargeBtn' onClick={handleRecharge}>Recharge Now</button>)
              }

            </div>) : ('')
          }

        </div>


      </div>
    </>
  )
}

export default RechargeUser;
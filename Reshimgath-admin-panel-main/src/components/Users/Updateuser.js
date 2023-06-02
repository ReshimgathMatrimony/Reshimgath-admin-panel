import React, { useState, useEffect } from 'react';
import './AddProfile.css';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Sidebar from '../Sidebar';
import logoutIcon from '../../Icons/logout.png'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import Updateregister from './Updatecomp/updateregister';
import Updatepersonal from './Updatecomp/updatepersonal';
import Updatefamily from './Updatecomp/updatefamily';
import Updatepartner from './Updatecomp/updatepartner';
import Updatehoroscope from './Updatecomp/updatehoroscope';
const Updateuser = () => {
  const notify = (p, msg) => p ? toast.success(msg) : toast.error(msg);
  const [profileData, setProfileData] = useState({})


  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (localStorage.getItem('accesstoken')) {

    }

    else {
      navigate('/login')
    }

  }, [])


  // ***************** All Data Update Function *****************



  return (
    <>
      <ToastContainer position="bottom-left" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
      <div className="col-lg-3">
        <Sidebar />
      </div>

      <div className="col-lg-9 main_form_div">

        <div className="col-lg-12">

          <div className="row mt-3">
            <Link to="/logout">
              <img src={logoutIcon} alt="" className='float-end' />
            </Link>
          </div>

          <div className="row mt-3 mb-3">
            <h3 className='text-center'>Update User Details</h3>
          </div>

          {/* 1.register info */}
          <Updateregister email={`${location.state.email}`} />

          {/* 2. BasicInfo Form */}
          <Updatepersonal email={`${location.state.email}`} />

          {/* FamilyInfo From */}
          <Updatefamily email={`${location.state.email}`} />

          {/* 4. Partner Preference */}
          <Updatepartner email={`${location.state.email}`} />

          {/* 5. HoroscopalInfo Form */}
          <Updatehoroscope email={`${location.state.email}`} />

        </div>
        {/* </form> */}
      </div>
    </>
  )
}

export default Updateuser;
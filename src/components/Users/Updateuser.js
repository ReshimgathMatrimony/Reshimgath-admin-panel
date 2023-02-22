import React, { useState, useEffect } from 'react';
import './AddProfile.css';
import axios from 'axios';
import religionData from '../religionData.json';
import heightData from '../heightData.json';
import educationdata from '../educationData.json';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Sidebar from '../Sidebar';
import logoutIcon from '../../Icons/logout.png'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const Updateuser = () => {
  const notify = (p, msg) => p ? toast.success(msg) : toast.error(msg);
  const [profileData, setProfileData] = useState({})
  const [prevImg1, setPrevImg1] = useState({})
  const [prevImg2, setPrevImg2] = useState({})
  const [prevImg3, setPrevImg3] = useState({})

  const navigate = useNavigate()
  const location = useLocation()

  const [checkbox, setCheckbox] = useState({
    own_house: false,
    own_farm: false,
    own_plot: false,
    other_prop: false
  })
  // const [check, setCheck] = useState(false)
  // console.log(location.state.email)

  useEffect(() => {
    if (localStorage.getItem('accesstoken')) {
      axios.post('http://localhost:3031/admincrud/getallsingleprofiledetails', { email: location.state.email }).then((res) => {
        setProfileData(res.data)
        // console.log(res.data)
        setPrevImg1(res.data.image1)
        setPrevImg2(res.data.image2)
        setPrevImg3(res.data.image3)

        if (profileData.own_house && profileData.own_house !== "") {
          setCheckbox({ ...checkbox, own_house: true })
        }

        if (profileData.own_farm && profileData.own_farm !== "") {
          setCheckbox({ ...checkbox, own_farm: true })
        }

        if (profileData.own_plot && profileData.own_plot !== "") {
          setCheckbox({ ...checkbox, own_plot: true })
        }

        if (profileData.other_prop && profileData.other_prop !== "") {
          setCheckbox({ ...checkbox, other_prop: true })
        }
        // profileData.own_house === "" ? ('') : ('')
        // profileData.own_farm === "" ? ('') : (setCheckbox({ ...checkbox, own_farm: true })),
        // profileData.own_plot === "" ? ('') : (setCheckbox({ ...checkbox, own_plot: true })),
        // profileData.other_prop === "" ? ('') : (setCheckbox({ ...checkbox, other_prop: true }))

      }).catch((err) => {
        notify(0, "Check Your Internet..")
      })
    }

    else {
      navigate('/login')
    }

  }, [])

  const [pass, setPass] = useState(false);
  const [countriesName, setCountriesName] = useState('')

  // Fetching All countries
  const [country, setCountry] = useState([])
  useEffect(() => {
    axios.get('https://api.countrystatecity.in/v1/countries', {
      headers: {
        'X-CSCAPI-KEY': 'MGZMRlZLbkZ0SmNiOGkxQzBlREFLYjBKdlZZU1BnRmlRbGI3N2lvVg=='
      }
    }).then((res) => {
      setCountry(res.data)
    }).catch((err) => { console.log(err) })
  }, [])

  // Fetching States By Country
  const [stateData, setStateData] = useState([])
  const handleCountry = (e) => {
    setProfileData({ ...profileData, country_name: e.target.value })
    setCountriesName(e.target.value)

    axios.get(`https://api.countrystatecity.in/v1/countries/${e.target.value}/states`, {
      headers: {
        'X-CSCAPI-KEY': 'MGZMRlZLbkZ0SmNiOGkxQzBlREFLYjBKdlZZU1BnRmlRbGI3N2lvVg=='
      }
    }).then((res) => {
      setStateData(res.data)

    }).catch((err) => { })
  }

  // Fetching Cities by state
  const [cityData, setCityData] = useState([])
  const handleState = (event) => {
    setProfileData({ ...profileData, state_name: event.target.value })
    axios.get(`https://api.countrystatecity.in/v1/countries/${countriesName}/states/${event.target.value}/cities`, {
      headers: {
        'X-CSCAPI-KEY': 'MGZMRlZLbkZ0SmNiOGkxQzBlREFLYjBKdlZZU1BnRmlRbGI3N2lvVg=='
      }
    }).then((res) => {
      setCityData(res.data)
    }).catch((err) => { })
  }

  //Converting Image into String using image formator
  const imageFormator = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onloadend = () => {
        resolve(reader.result)
      }
    })
  }

  // ***************** All Data Update Function *****************
  const handleSubmit = async (e) => {
    e.preventDefault()
    const formdata = new FormData(e.target);
    const data = Object.fromEntries(formdata.entries());

    let newImg1
    let newImg2
    let newImg3

    data.image1.name === "" ? (newImg1 = prevImg1) : (newImg1 = await imageFormator(data.image1))
    data.image2.name === "" ? (newImg2 = prevImg2) : (newImg2 = await imageFormator(data.image2))
    data.image3.name === "" ? (newImg3 = prevImg3) : (newImg3 = await imageFormator(data.image3))

    const payLoad = { ...data, email: location.state.email, image1: newImg1, image2: newImg2, image3: newImg3 }
    console.log(payLoad);
  }

  return (
    <>
      <ToastContainer position="bottom-left" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
      <div className="col-lg-3">
        <Sidebar />
      </div>

      <div className="col-lg-9 main_form_div">
        <form autoComplete='off' onSubmit={handleSubmit}>
          <div className="col-lg-12">

            <div className="row mt-3">
              <Link to="/logout">
                <img src={logoutIcon} alt="" className='float-end' />
              </Link>
            </div>

            <div className="row mt-3 mb-3">
              <h3 className='text-center'>Update User Details</h3>
            </div>

            {/*1. Register form */}
            <div className="row d-flex justify-content-center mt-4">
              <div className="col-lg-10 outer_form_div">
                <h4 className='d-flex mb-4'>1. Update Basic Registration Details: </h4>

                {/* <form onSubmit={handleRegister} autoComplete='off'> */}
                <div className="row">
                  <div className="col-lg-6  mb-3">
                    <input type="text" value={profileData.firstname} onChange={(e) => { setProfileData({ ...profileData, firstname: e.target.value }) }} className="form-control" name='firstname' placeholder='First Name' />
                  </div>
                  <div className="col-lg-6  mb-3">
                    <input type="text" value={profileData.lastname} onChange={(e) => { setProfileData({ ...profileData, lastname: e.target.value }) }} className="form-control" name='lastname' id='lastname' placeholder='Last Name' />
                  </div>
                </div>

                <div className="col-lg-12 mb-3">
                  <input type="email" value={profileData.email} onChange={(e) => { setProfileData({ ...profileData, email: e.target.value }) }} className="form-control" name="email" placeholder='Email Id' />
                </div>

                <div className="row">
                  <div className="col-lg-6 mb-4">
                    <input type="number" value={profileData.mobile} onChange={(e) => { setProfileData({ ...profileData, mobile: e.target.value }) }} className="form-control" name='mobile' placeholder='Mobile Number' />
                  </div>

                  <div className="col-lg-6 mb-4">
                    <select name="gender" value={profileData.gender} onChange={(e) => { setProfileData({ ...profileData, gender: e.target.value }) }} className="form-select form-select" aria-label=".form-select-sm example">
                      <option selected>Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
                {/* </form> */}
              </div>
            </div>
            < hr className='w-50 m-auto' />

            {/* 2. BasicInfo Form */}
            <div className="row d-flex justify-content-center mt-4">
              <div className="col-lg-10">
                <h4 className='d-flex mb-4'>2. Update Personal Information: </h4>
                {/* <form onSubmit={handlePersonalInfo}> */}
                <div className="row">
                  <div className="col-lg-4 mb-4">
                    <select name="height" value={profileData.height} onChange={(e) => { setProfileData({ ...profileData, height: e.target.value }) }} className="form-select form-select" aria-label=".form-select-sm example">
                      <option selected>-- Height --</option>
                      {
                        heightData?.map((val, index) => {
                          return (
                            <option value={val.height}>{val.height.split(".").map((value, indx) => {
                              return (
                                <h1>{value + `${indx === 0 ? "'" : '"'}`}</h1>
                              )
                            })}</option>
                          )
                        })
                      }

                    </select>
                  </div>

                  <div className="col-lg-4 mb-4">
                    <select name="weight" value={profileData.weight} onChange={(e) => { setProfileData({ ...profileData, weight: e.target.value }) }} className="form-select form-select" aria-label=".form-select-sm example">
                      <option selected>-- Weight --</option>
                      <option value="35Kg To 45Kg">35Kg To 45Kg</option>
                      <option value="45Kg To 55Kg">45Kg To 55Kg</option>
                      <option value="55Kg To 65Kg">55Kg To 65Kg</option>
                      <option value="65Kg To 75Kg">65Kg To 75Kg</option>
                      <option value="75Kg To 85Kg">75Kg To 85Kg</option>
                      <option value="85Kg To 95Kg">85Kg To 95Kg</option>
                    </select>
                  </div>

                  <div className="col-lg-4 mb-4">
                    <select name="bloodGroup" value={profileData.bloodGroup} onChange={(e) => { setProfileData({ ...profileData, bloodGroup: e.target.value }) }} className="form-select form-select" aria-label=".form-select-sm example">
                      <option selected>-- Blood group --</option>
                      <option value="A+">A+ </option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                    </select>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-4 mb-4">
                    <select name="education" value={profileData.education} onChange={(e) => { setProfileData({ ...profileData, education: e.target.value }) }} className="form-select form-select" aria-label=".form-select-sm example">
                      <option selected>-- Education --</option>
                      {
                        educationdata?.map((val, id) => {
                          return (
                            <option value={val.education}>{val.education}</option>
                          )
                        })
                      }

                    </select>
                  </div>

                  <div className="col-lg-4 mb-4">
                    <select name="occupation" value={profileData.occupation} onChange={(e) => { setProfileData({ ...profileData, occupation: e.target.value }) }} className="form-select form-select" aria-label=".form-select-sm example">
                      <option selected>-- Occupation --</option>
                      <option value="IT Software">IT Software</option>
                      <option value="Business">Business</option>
                      <option value="Lawyer">Lawyer</option>
                      <option value="Doctor">Doctor</option>
                      <option value="Nurse">Nurse</option>
                      <option value="Teacher">Teacher</option>
                      <option value="CA/Accountant">CA/Accountant</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="col-lg-4 mb-4">
                    <select name="salaryPA" value={profileData.salaryPA} onChange={(e) => { setProfileData({ ...profileData, salaryPA: e.target.value }) }} className="form-select form-select" aria-label=".form-select-sm example">
                      <option selected>-- Salary Per Annum --</option>
                      <option value="Below 1 Lack">Below 1 Lack</option>
                      <option value="1 to 3 Lack">1 to 3 Lack</option>
                      <option value="3 to 6 Lack">3 to 6 Lack</option>
                      <option value="6 to 9 Lack">6 to 9 Lack</option>
                      <option value="Above 9 Lack">Above 9 Lack</option>
                    </select>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-4 mb-4">
                    <input type="text" name="dob" value={profileData.dob} onChange={(e) => { setProfileData({ ...profileData, dob: e.target.value }) }} className="form-control" onFocus={(e) => (e.target.type = "date")} onBlur={(e) => (e.target.type = "text")} placeholder={'Date of Birth'} />
                  </div>

                  <div className="col-lg-4 mb-4">
                    <input type="text" name="birth_time" value={profileData.birth_time} onChange={(e) => { setProfileData({ ...profileData, birth_time: e.target.value }) }} className="form-control" onFocus={(e) => (e.target.type = "time")} onBlur={(e) => (e.target.type = "text")} placeholder={'Birth Time'} />
                  </div>

                  <div className="col-lg-4 mb-4">
                    <input type="text" name="birth_place" value={profileData.birth_place} onChange={(e) => { setProfileData({ ...profileData, birth_place: e.target.value }) }} className='form-control' placeholder='Birth Place' />
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-4 mb-4">
                    <select name="caste" value={profileData.caste} onChange={(e) => { setProfileData({ ...profileData, caste: e.target.value }) }} className="form-select form-select" aria-label=".form-select-sm example">
                      <option selected>-- Caste --</option>
                      {
                        religionData?.map((val, id) => {
                          return (
                            <option key={id} value={val.religion}>{val.religion}</option>
                          )
                        })
                      }
                    </select>
                  </div>

                  <div className="col-lg-4 mb-4">
                    <select name="subCaste" value={profileData.subCaste} onChange={(e) => { setProfileData({ ...profileData, subCaste: e.target.value }) }} className="form-select form-select" aria-label=".form-select-sm example">
                      <option selected>-- Sub-caste --</option>
                    </select>
                  </div>

                  <div className="col-lg-4 mb-4">
                    <select name="complexion" value={profileData.complexion} onChange={(e) => { setProfileData({ ...profileData, complexion: e.target.value }) }} className="form-select form-select" aria-label=".form-select-sm example">
                      <option selected>-- Complexion --</option>
                      <option value="Extremely fair skin">Extremely Fair Skin</option>
                      <option value="Fair Skin">Fair Skin</option>
                      <option value="Medium Skin">Medium Skin</option>
                      <option value="Olive Skin">Olive Skin</option>
                      <option value="Brown Skin">Brown Skin</option>
                    </select>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-4 mb-4">
                    <select name="disablity" value={profileData.disability} onChange={(e) => { setProfileData({ ...profileData, disability: e.target.value }) }} className="form-select form-select" aria-label=".form-select-sm example">
                      <option selected>-- Disability --</option>
                      <option value="None">None</option>
                      <option value="Blind">Blind</option>
                      <option value="Handicap">Handicap</option>
                      <option value="Deaf">Deaf</option>
                    </select>
                  </div>

                  <div className="col-lg-4 mb-4">
                    <select name="maritalStatus" value={profileData.maritalStatus} onChange={(e) => { setProfileData({ ...profileData, maritalStatus: e.target.value }) }} className="form-select form-select" aria-label=".form-select-sm example">
                      <option selected>-- Marital Status --</option>
                      <option value="Single">Single</option>
                      <option value="Widow">Widow</option>
                      <option value="Widower">Widower</option>

                    </select>
                  </div>

                  <div className="col-lg-4 mb-4">
                    <select name="childrens_count" value={profileData.childrens_count} onChange={(e) => { setProfileData({ ...profileData, childrens_count: e.target.value }) }} className="form-select form-select" aria-label=".form-select-sm example">
                      <option selected>-- If Widow, Childrens --</option>
                      <option value="0">0</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="More than 2">More than 2</option>
                    </select>
                  </div>

                </div>

                <div className="row">
                  <div className="col-lg-12 mb-4">
                    <input type="text" value={profileData.addressLine1} name="addressLine1" onChange={(e) => { setProfileData({ ...profileData, addressLine1: e.target.value }) }} className='form-control' placeholder='Residential Address Line 1' />
                  </div>

                  <div className="col-lg-12 mb-4">
                    <input type="text" name="addressLine2" value={profileData.addressLine2} onChange={(e) => { setProfileData({ ...profileData, addressLine2: e.target.value }) }} className='form-control' placeholder='Residential Address Line 2' />
                  </div>
                </div>

                <div className="row">
                  <p className='mb-3 d-flex'> <b>Previous Profile Photos :</b></p>

                  <div className="col-lg-4">
                    <img src={profileData.image1} alt="image" height="100px" width="150px" />
                  </div>

                  <div className="col-lg-4">
                    <img src={profileData.image2} alt="image" height="100px" width="150px" />
                  </div>

                  <div className="col-lg-4">
                    <img src={profileData.image3} alt="image" height="100px" width="150px" />
                  </div>

                  <p className='mt-3 mb-3 d-flex'> <b>Update Profile Photos :</b></p>
                  <div className="col-lg-12 mb-4">
                    <input type="file" name="image1" className='form-control' />
                  </div>

                  <div className="col-lg-12 mb-4">
                    <input type="file" name="image2" className='form-control' />
                  </div>

                  <div className="col-lg-12 mb-4">
                    <input type="file" name="image3" className='form-control' />
                  </div>
                </div>

                <div className="row mb-5">
                  <div className="col-lg-4 mb-4">
                    <select name="country_name" value={profileData.country_name} onChange={handleCountry} className="form-select form-select">
                      <option selected>-- Country --</option>
                      {
                        country?.map((val, id) => {
                          return (
                            <option value={val.iso2}>{val.name}</option>
                          )
                        })
                      }
                    </select>
                  </div>

                  <div className="col-lg-4 mb-4">
                    <select name="state_name" value={profileData.state_name} onChange={handleState} className="form-select form-select">
                      <option selected>-- State --</option>
                      {
                        stateData?.map((value, index) => {
                          return (
                            <option value={value.iso2}>{value.name}</option>
                          )
                        })
                      }
                    </select>
                  </div>

                  <div className="col-lg-4 mb-4">
                    <select name="city_name" value={profileData.city_name} onChange={(e) => { setProfileData({ ...profileData, city_name: e.target.value }) }} className="form-select form-select">
                      <option selected>-- City --</option>
                      {
                        cityData?.map((val, index) => {
                          return (
                            <option value={val.name}>{val.name}</option>
                          )
                        })
                      }
                    </select>
                  </div>



                  <div className="col-lg-4 mb-4">
                    <input type="text" name="taluka" value={profileData.taluka} onChange={(e) => { setProfileData({ ...profileData, taluka: e.target.value }) }} className='form-control' placeholder='Taluka' />
                  </div>

                  <div className="col-lg-4 mb-4">
                    <input type="text" name="district" value={profileData.district} onChange={(e) => { setProfileData({ ...profileData, district: e.target.value }) }} className='form-control' placeholder='District' />
                  </div>

                  <div className="col-lg-4 mb-4">
                    <input type="text" name="mother_tongue" value={profileData.mother_tongue} onChange={(e) => { setProfileData({ ...profileData, mother_tongue: e.target.value }) }} className='form-control' placeholder='Mother Tongue' />
                  </div>
                </div>
                {/* </form> */}
              </div>
            </div>
            <hr className='w-50 m-auto' />

            {/* FamilyInfo From */}
            <div className="row d-flex justify-content-center family_details_row mt-5">
              <div className="col-lg-10">
                <h4 className='d-flex mb-4'>3. Update Family Information: </h4>
                {/* <form onSubmit={handleFamilyInfo}> */}
                <div className="row">
                  <div className="col-lg-6 d-flex mb-3">
                    <label htmlFor="fathers_name" style={{ color: "black", width: "40%", fontFamily: "familyFont" }}>Father's Name</label>
                    <input type="text" className='form-control' value={profileData.fathers_name} onChange={(e) => { setProfileData({ ...profileData, fathers_name: e.target.value }) }} id="fathers_name" name="fathers_name" />
                  </div>

                  <div className="col-lg-6 d-flex mb-3">
                    <label htmlFor="fathers_occupation" style={{ color: "black", width: "30%", fontFamily: "familyFont", paddingTop: "1.7%" }}>Occupation</label>
                    <div className="btn-group me-2 fathers_occupation_group" value={profileData.fathers_occupation} onChange={(e) => { setProfileData({ ...profileData, fathers_occupation: e.target.value }) }} role="group" aria-label="Second group">
                      &nbsp;<input type="radio" id="fathers_occupation" name="fathers_occupation" value="Job" />&nbsp;<span style={{ marginTop: '2%', marginLeft: "1%" }}>Job&emsp;</span>
                      &nbsp;<input type="radio" name="fathers_occupation" value="Business" />&nbsp;<span style={{ marginTop: '2%', marginLeft: "1%" }}>Business&emsp;</span>
                      &nbsp;<input type="radio" name="fathers_occupation" value="Retired" />&nbsp;<span style={{ marginTop: '2%', marginLeft: "1%" }}>Retired&emsp;</span>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-6 d-flex mb-3">
                    <label htmlFor="mothers_name" style={{ color: "black", width: "40%", fontFamily: "familyFont" }}>Mother's Name</label>
                    <input type="text" className='form-control' value={profileData.mothers_name} onChange={(e) => { setProfileData({ ...profileData, mothers_name: e.target.value }) }} id="mothers_name" name="mothers_name" />
                  </div>

                  <div className="col-lg-6 col-sm-12 d-flex mb-3">
                    <label htmlFor="mothers_occupation" style={{ color: "black", width: "30%", fontFamily: "familyFont", paddingTop: "1.7%" }}>Occupation</label>
                    <div className="btn-group me-2 mothers_occupation_group" role="group" aria-label="Second group">
                      &nbsp;<input type="radio" name="mothers_occupation" value="Job" />&nbsp;<span style={{ marginTop: '2%', marginLeft: "1%" }}>Job&emsp;</span>
                      &nbsp;<input type="radio" name="mothers_occupation" value="Business" />&nbsp;<span style={{ marginTop: '2%', marginLeft: "1%" }}>Business&emsp;</span>
                      &nbsp;<input type="radio" name="mothers_occupation" value="Retired" />&nbsp;<span style={{ marginTop: '2%', marginLeft: "1%" }}>Housewife&emsp;</span>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-3 d-flex mb-4">
                    <label htmlFor="bother_select" style={{ color: "black" }}>Brothers&emsp;</label>
                    <select className="form-select form-select" value={profileData.bother_select} onChange={(e) => { setProfileData({ ...profileData, bother_select: e.target.value }) }} name="bother_select" id="bother_select" aria-label=".form-select-sm example">
                      <option value="null">-- Please Select --</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="More than 2">More than 2</option>
                    </select>
                  </div>

                  <div className="col-lg-3 d-flex mb-4">
                    <label htmlFor="bother_status" style={{ color: "black" }}>Married&emsp;</label>
                    <select className="form-select form-select" name="bother_status" value={profileData.bother_status} onChange={(e) => { setProfileData({ ...profileData, bother_status: e.target.value }) }} id="bother_status" aria-label=".form-select-sm example">
                      <option value="null">--Select--</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div>

                  <div className="col-lg-3 d-flex mb-4">
                    <label htmlFor="sister_select" style={{ color: "black" }}>Sisters&emsp;</label>
                    <select className="form-select form-select" value={profileData.sister_select} onChange={(e) => { setProfileData({ ...profileData, sister_select: e.target.value }) }} name="sister_select" aria-label=".form-select-sm example">
                      <option value="null">--Select--</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="More than 2">More than 2</option>
                    </select>
                  </div>

                  <div className="col-lg-3 d-flex mb-4">
                    <label htmlFor="sister_status" style={{ color: "black" }}>Married&emsp;</label>
                    <select className="form-select form-select" name="sister_status" value={profileData.sister_status} onChange={(e) => { setProfileData({ ...profileData, sister_status: e.target.value }) }} aria-label=".form-select-sm example">
                      <option value="null">--Select--</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-10 col-sm-12 col-xs-12 d-flex mb-4 w-100">
                    <label htmlFor="property_checkbox" style={{ color: "black" }}>Property :&emsp;</label>
                    &nbsp;<input type="checkbox" name="own_house" value="Own A House" checked={checkbox.own_house ? ('checked') : ('')} onChange={(e) => { setProfileData({ ...profileData, own_house: e.target.value }); setCheckbox({ ...checkbox, own_house: !checkbox.own_house }) }} />&nbsp;Own a House&nbsp;
                    &nbsp;<input type="checkbox" name="own_farm" value="Own A Farm" checked={checkbox.own_farm ? ('checked') : ('')} onChange={(e) => { setProfileData({ ...profileData, own_farm: e.target.value }); setCheckbox({ ...checkbox, own_farm: !checkbox.own_farm }) }} />&nbsp;Own a Farm&nbsp;
                    &nbsp;<input type="checkbox" name="own_plot" value="Own A Plot" checked={checkbox.own_plot ? ('checked') : ('')} onChange={(e) => { setProfileData({ ...profileData, own_plot: e.target.value }); setCheckbox({ ...checkbox, own_plot: !checkbox.own_plot }) }} />&nbsp;Own a Plot&nbsp;
                    &nbsp;<input type="checkbox" name="other_prop" value="Extra Additional Property" checked={checkbox.other_prop ? ('checked') : ('')} onChange={(e) => { setProfileData({ ...profileData, other_prop: e.target.value }); setCheckbox({ ...checkbox, other_prop: !checkbox.other_prop }) }} />&nbsp;Extra Additional Property&nbsp;
                  </div>
                </div>
                {/* </form> */}
              </div>
            </div >
            <hr className='w-50 m-auto' />

            {/* 4. Partner Preference */}
            <div className="row d-flex justify-content-center mt-4">
              <div className="col-lg-10">
                <h4 className='d-flex mb-4'>4. Update Partner Preference Details: </h4>
                {/* <form onSubmit={handlePartnerInfo}> */}
                <div className="row">
                  <div className="col-lg-4 mb-4">
                    <select name="education_pref" value={profileData.education_pref} onChange={(e) => { setProfileData({ ...profileData, education_pref: e.target.value }) }} className="form-select form-select" aria-label=".form-select-sm example">
                      <option value="" selected>-- Education --</option>
                      <option value="1">hh1</option>
                      <option value="1">hh2</option>
                      <option value="1">hh4</option>
                      <option value="1">hh5</option>
                    </select>
                  </div>

                  <div className="col-lg-4 mb-4">
                    <select name="occupation_pref" value={profileData.occupation_pref} onChange={(e) => { setProfileData({ ...profileData, occupation_pref: e.target.value }) }} className="form-select form-select" aria-label=".form-select-sm example">
                      <option value="" selected>-- Occupation --</option>
                      <option value="1">hh1</option>
                      <option value="1">h2</option>
                      <option value="1">h4</option>
                      <option value="1">h5</option>

                    </select>
                  </div>

                  <div className="col-lg-4 mb-4">
                    <select name="salary_pref" value={profileData.salary_pref} onChange={(e) => { setProfileData({ ...profileData, salary_pref: e.target.value }) }} className="form-select form-select" aria-label=".form-select-sm example">
                      <option valuee="" selected>-- Salary / Annual Package --</option>
                      <option value="1">h1</option>
                      <option value="1">h2</option>
                      <option value="1">h4</option>
                      <option value="1">h5</option>
                    </select>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-4 mb-4">
                    <select name="complexion_pref" value={profileData.complexion_pref} onChange={(e) => { setProfileData({ ...profileData, complexion_pref: e.target.value }) }} className="form-select form-select" aria-label=".form-select-sm example">
                      <option value="" selected>-- Complexion --</option>
                      <option value="1">h1</option>
                      <option value="1">h2</option>
                      <option value="1">h4</option>
                      <option value="1">h5</option>

                    </select>
                  </div>

                  <div className="col-lg-4 mb-4">
                    <select name="height_pref" value={profileData.height_pref} onChange={(e) => { setProfileData({ ...profileData, height_pref: e.target.value }) }} className="form-select form-select" aria-label=".form-select-sm example">
                      <option value="" selected>-- Height --</option>
                      <option value="1">h1</option>
                      <option value="1">h2</option>
                      <option value="1">h4</option>
                      <option value="1">h5</option>
                    </select>
                  </div>

                  <div className="col-lg-4 mb-4">
                    <select name="religion_pref" value={profileData.religion_pref} onChange={(e) => { setProfileData({ ...profileData, religion_pref: e.target.value }) }} className="form-select form-select" aria-label=".form-select-sm example">
                      <option value="" selected>-- Religion --</option>
                      <option value="1">h1</option>
                      <option value="1">h2</option>
                      <option value="1">h4</option>
                      <option value="1">h5</option>
                    </select>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-4 mb-4">
                    <select name="caste_pref" value={profileData.caste_pref} onChange={(e) => { setProfileData({ ...profileData, caste_pref: e.target.value }) }} className="form-select form-select" aria-label=".form-select-sm example">
                      <option value="" selected>-- Caste --</option>
                      <option value="1">h1</option>
                      <option value="1">j2</option>
                      <option value="1">j4</option>
                      <option value="1">j5</option>

                    </select>
                  </div>

                  <div className="col-lg-4 mb-4">
                    <select name="state_pref" value={profileData.state_pref} onChange={(e) => { setProfileData({ ...profileData, state_pref: e.target.value }) }} className="form-select form-select" aria-label=".form-select-sm example">
                      <option value="" selected>-- State --</option>
                      <option value="1">j1</option>
                      <option value="1">j2</option>
                      <option value="1">j4</option>
                      <option value="1">j5</option>
                    </select>
                  </div>

                  <div className="col-lg-4 mb-4">
                    <select name="location_pref" value={profileData.location_pref} onChange={(e) => { setProfileData({ ...profileData, location_pref: e.target.value }) }} className="form-select form-select" aria-label=".form-select-sm example">
                      <option value="" selected>-- Location --</option>
                      <option value="1">j1</option>
                      <option value="1">j2</option>
                      <option value="1">j4</option>
                      <option value="1">j5</option>
                    </select>
                  </div>
                </div>
                {/* </form> */}
              </div>
            </div>
            <hr className='w-50 m-auto' />

            {/* 5. HoroscopalInfo Form */}
            <div className="row d-flex justify-content-center mt-4 mb-5">
              <div className="col-lg-10">
                <h4 className='d-flex mb-4'>5. Update Horoscopic Details (Optional): </h4>
                {/* <form onSubmit={handleHoroscope}> */}
                <div className="row">
                  <div className="col-lg-4 mb-4">
                    <select name="rashi" value={profileData.rashi} onChange={(e) => { setProfileData({ ...profileData, rashi: e.target.value }) }} className="form-select form-select" aria-label=".form-select-sm example">
                      <option selected>-- Rashi --</option>
                      <option value="option1">option1</option>
                    </select>
                  </div>

                  <div className="col-lg-4 mb-4">
                    <select name="nakshatra" value={profileData.nakshatra} onChange={(e) => { setProfileData({ ...profileData, nakshatra: e.target.value }) }} className="form-select form-select" aria-label=".form-select-sm example">
                      <option selected>-- Nakshatra --</option>
                      <option value="option1">option1</option>

                    </select>
                  </div>

                  <div className="col-lg-4 mb-4">
                    <select name="mangal" value={profileData.mangal} onChange={(e) => { setProfileData({ ...profileData, mangal: e.target.value }) }} className="form-select form-select" aria-label=".form-select-sm example">
                      <option selected>-- Mangal --</option>
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                    </select>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-4 mb-4">
                    <select name="charan" value={profileData.charan} onChange={(e) => { setProfileData({ ...profileData, charan: e.target.value }) }} className="form-select form-select" aria-label=".form-select-sm example">
                      <option selected>-- Charan --</option>
                      <option value="option1">option1</option>
                    </select>
                  </div>

                  <div className="col-lg-4 mb-4">
                    <input type="text" value={profileData.time_of_birth} onChange={(e) => { setProfileData({ ...profileData, time_of_birth: e.target.value }) }} name="time_of_birth" className="form-control" onFocus={(e) => (e.target.type = "time")} onBlur={(e) => (e.target.type = "text")} placeholder={'Birth Time'} />
                  </div>

                  <div className="col-lg-4 mb-4">
                    <input type="text" name="place_of_birth" value={profileData.place_of_birth} onChange={(e) => { setProfileData({ ...profileData, place_of_birth: e.target.value }) }} id="place_of_birth" className='form-control' placeholder='Birth Place' />
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-4 mb-4">
                    <select name="nadi" value={profileData.nadi} onChange={(e) => { setProfileData({ ...profileData, nadi: e.target.value }) }} className="form-select form-select" aria-label="form-select-sm example">
                      <option selected>-- Nadi --</option>
                      <option value="option1">option1</option>
                    </select>
                  </div>

                  <div className="col-lg-4 mb-4">
                    <select name="devak" value={profileData.devak} onChange={(e) => { setProfileData({ ...profileData, devak: e.target.value }) }} className="form-select form-select" aria-label=".form-select-sm example">
                      <option selected>-- Devak --</option>
                      <option value="option1">option1</option>
                    </select>
                  </div>

                  <div className="col-lg-4 mb-4">
                    <select name="gan" value={profileData.gan} onChange={(e) => { setProfileData({ ...profileData, gan: e.target.value }) }} className="form-select form-select" aria-label=".form-select-sm example">
                      <option selected>-- Gan --</option>
                      <option value="option1">option1</option>
                    </select>
                  </div>
                </div>

                {/* </form> */}
              </div>
            </div>

            <div className="row mb-4">
              <div className="col-lg-12">
                <input type="submit" className='btn saveBtn' value="Update Details Now" />
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

export default Updateuser;
import React, { useState, useEffect } from 'react';
import './AddProfile.css';
import HiddenEyeIcon from '../../components/images/hidden_eye.png';
import eyeIcon from '../../components/images/eye.png';
import axios from 'axios';
import religionData from '../religionData.json';
import heightData from '../heightData.json';
import educationdata from '../educationData.json';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from '../Sidebar';
import logoutIcon from '../../Icons/logout.png'
import completeIcon from '../../Icons/done.png'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const AddProfile = () => {
    const rashiArr = ['Mesh', 'Vrishabh', 'Mithun', 'Kark', 'Sinh', 'Kanya', 'Tula', 'Vrishchik'];
    const nakshtraArr = ['Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira', 'Ardra', 'Punarvasu', 'Pushya', 'Ashlesha', 'Magha', 'Purva Phalguni', 'Uttara', 'Phalguni', 'Hasta', 'Chitra', 'Swati', 'Vishaka', 'Anurada', 'Jyeshta', 'Mula', 'Purva Ashadha', 'Uttara Ashadha', 'Shravana', 'Dhanishta', 'Shatabhishak', 'Purva Bhadrapada', 'Uttara Bhadrapada', 'Revati']
    const ganArr = ['manav gan', 'dev gan', 'rakshas gan'];
    const nadiArr = ['Aadi Nadi', 'Madhya Nadi', 'Antya Nadi']

    const navigate = useNavigate()
    const notify = (p, msg) => p ? toast.success(msg) : toast.error(msg);

    useEffect(() => {
        if (localStorage.getItem('accesstoken')) {

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
        setCountriesName(e.target.value.split(',')[0])
        axios.get(`https://api.countrystatecity.in/v1/countries/${e.target.value.split(',')[0]}/states`, {
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
        axios.get(`https://api.countrystatecity.in/v1/countries/${countriesName}/states/${event.target.value.split(',')[0]}/cities`, {
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

    //States for form
    const [registerdata, setRegisterdata] = useState(false)
    const [personalinfo, setPersonalinfo] = useState(false)
    const [familyinfo, setFamilyinfo] = useState(false)
    const [partnerinfo, setPartnerinfo] = useState(false)
    const [horoscopinfo, setHoroscopeinfo] = useState(false)

    const [mail, setMail] = useState('')

    const handleRegister = (e) => {
        e.preventDefault()
        const formdata = new FormData(e.target);
        const data1 = Object.fromEntries(formdata.entries());
        // console.log(data1)
        setMail(data1.email)
        axios.post('https://reshimgath-backend-qgcr.vercel.app/admincrud/register', data1, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem('accesstoken')
            }
        }).then((res) => {
            setRegisterdata(true)
            notify(1, "User Registered Successfully..!")

        }).catch((err) => {
            notify(0, "Oops..Somthing went wrong!")
        })
    }

    const handlePersonalInfo = async (e) => {
        e.preventDefault()
        const formdata = new FormData(e.target);
        const data2 = Object.fromEntries(formdata.entries());
        const payLoad = { ...data2, email: mail, image1: await imageFormator(data2.image1), image2: await imageFormator(data2.image2), image3: await imageFormator(data2.image3), country_name: data2.country_name.split(',')[1], state_name: data2.state_name.split(',')[1] }
        axios.post('https://reshimgath-backend-qgcr.vercel.app/admincrud/getbasicinfo', payLoad, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem('accesstoken')
            }
        }).then((res) => {
            setPersonalinfo(true)
            notify(1, "Personal Information Submitted Successfully..!")
        }).catch((err) => {
            notify(0, "Oops...Something went wrong..!")
        })
    }

    const handleFamilyInfo = (e) => {
        e.preventDefault()
        const formdata = new FormData(e.target);
        const data3 = Object.fromEntries(formdata.entries());
        const payLoad = { ...data3, email: mail }
        axios.post('https://reshimgath-backend-qgcr.vercel.app/admincrud/getfamilydetails', payLoad, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem('accesstoken')
            }
        }).then((res) => {
            notify(1, "Family Information Submitted Successfully..!")
            setFamilyinfo(true)
        }).catch((err) => {
            notify(0, "Oops..Somthing went wrong!")
        })
    }

    const handlePartnerInfo = (e) => {
        e.preventDefault()
        const formdata = new FormData(e.target);
        const data4 = Object.fromEntries(formdata.entries());
        // console.log(data4)
        const payLoad = { ...data4, email: mail }
        axios.post('https://reshimgath-backend-qgcr.vercel.app/admincrud/getpartnerprefrence', payLoad, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem('accesstoken')
            }
        }).then((res) => {
            notify(1, "Partner Information submitted successfully..!")
            setPartnerinfo(true)
        }).catch((err) => {
            notify(0, "Oops..Somthing went wrong!")
        })
    }

    const handleHoroscope = (e) => {
        e.preventDefault()
        const formdata = new FormData(e.target);
        const data5 = Object.fromEntries(formdata.entries());
        // console.log(data5)
        const payLoad = { ...data5, email: mail, mangal: JSON.parse(data5.mangal) }
        axios.post('https://reshimgath-backend-qgcr.vercel.app/admincrud/gethoroscopedetails', payLoad, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem('accesstoken')
            }
        }).then((res) => {
            notify(1, "Horoscope information submitted successfully..!")
            setHoroscopeinfo(true)
            setTimeout(() => {
                navigate('/users')
            }, 2000)
        }).catch((err) => {
            notify(0, "Something went wrong..!")
        })
    }

    return (
        <>
            <ToastContainer position="bottom-left" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
            <div className="col-lg-3">
                <Sidebar />
            </div>
            <div className="col-lg-9">
                <div className="row mt-3">
                    <Link to="/logout">
                        <img src={logoutIcon} alt="" className='float-end' />
                    </Link>
                </div>

                <div className="row mt-3 mb-3">
                    <h3 className='text-center'>Add New User</h3>
                </div>

                {/*1. Register form */}
                {
                    registerdata ?
                        (
                            <div className="row d-flex justify-content-center result_row">
                                <div className="col-lg-10 result_profile_div">
                                    <img src={completeIcon} alt="image" />
                                    <h4 className="result_profile_title">1. Basic Registration Completed</h4>
                                </div>
                            </div>
                        )
                        :
                        (
                            <div className="row d-flex justify-content-center mt-4">
                                <div className="col-lg-10 outer_form_div">
                                    <p style={{ color: 'red' }}>*Please Add All Form Details in Only One Go.</p>
                                    <h4 className='d-flex mb-4'>1. Basic Registration: </h4>

                                    <form onSubmit={handleRegister} autoComplete='off'>
                                        <div className="row">
                                            <div className="col-lg-6  mb-3">
                                                <input type="text" className="form-control" name='firstname' id='firstname' placeholder='First Name' />
                                            </div>
                                            <div className="col-lg-6  mb-3">
                                                <input type="text" className="form-control" name='lastname' id='lastname' placeholder='Last Name' />
                                            </div>
                                        </div>

                                        <div className="col-lg-12 mb-3">
                                            <input type="email" className="form-control" id="email" name="email" placeholder='Email Id' />
                                        </div>

                                        <div className="col-lg-12 input-group mb-3">
                                            <input type={pass ? "text" : "password"} className="form-control" id="password" name="password" placeholder='Create New Password' />
                                            <span className="input-group-text" id="password" onClick={() => { setPass(!pass) }}> {pass ? <img src={HiddenEyeIcon} alt="Image" /> : <img src={eyeIcon} alt="Image" />}</span>
                                        </div>

                                        <div className="col-lg-12 mb-3">
                                            <input type="password" className="form-control" id="confirm_passwd" name="confirm_passwd" placeholder='Confirm Password' />
                                        </div>

                                        <div className="row">
                                            <div className="col-lg-6 mb-4">
                                                <input type="number" className="form-control" name='mobile' id='mobile' placeholder='Mobile Number' />
                                            </div>

                                            <div className="col-lg-6 mb-4">
                                                <select name="gender" className="form-select form-select" aria-label=".form-select-sm example">
                                                    <option selected>Gender</option>
                                                    <option value="Male">Male</option>
                                                    <option value="Female">Female</option>
                                                    <option value="Other">Other</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="row mb-5">
                                            <div className="col-lg-12">
                                                <input type="submit" className='btn saveBtn ' value="Save Details" />
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )
                }
                < hr className='w-50 m-auto' />


                {/* 2. BasicInfo Form */}
                {
                    personalinfo ?
                        (
                            <div className="row d-flex justify-content-center result_row">
                                <div className="col-lg-10 result_profile_div">
                                    <img src={completeIcon} alt="image" />
                                    <h4 className="result_profile_title">2. Personal Information Submitted</h4>
                                </div>
                            </div>
                        )
                        :
                        (
                            <div className="row d-flex justify-content-center mt-4">
                                <div className="col-lg-10">
                                    <h4 className='d-flex mb-4'>2. Personal Information: </h4>
                                    <form onSubmit={handlePersonalInfo}>
                                        <div className="row">
                                            <div className="col-lg-4 mb-4">
                                                <select name="height" className="form-select form-select" aria-label=".form-select-sm example">
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
                                                <select name="weight" className="form-select form-select" aria-label=".form-select-sm example">
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
                                                <select name="bloodGroup" className="form-select form-select" aria-label=".form-select-sm example">
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
                                                <select name="education" className="form-select form-select" aria-label=".form-select-sm example">
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
                                                <select name="occupation" className="form-select form-select" aria-label=".form-select-sm example">
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
                                                <select name="salaryPA" className="form-select form-select" aria-label=".form-select-sm example">
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
                                                {/* <input type="date" name="dob" id="dob" className='form-control' /> */}
                                                <input type="text" name="dob" className="form-control" onFocus={(e) => (e.target.type = "date")} onBlur={(e) => (e.target.type = "text")} placeholder={'Date of Birth'} />
                                            </div>

                                            <div className="col-lg-4 mb-4">
                                                {/* <input type="time" name="birth_time" id="birth_time" className='form-control' placeholder='Birth Time' /> */}
                                                <input type="text" name="birth_time" className="form-control" onFocus={(e) => (e.target.type = "time")} onBlur={(e) => (e.target.type = "text")} placeholder={'Birth Time'} />
                                            </div>

                                            <div className="col-lg-4 mb-4">
                                                <input type="text" name="birth_place" id="birth_place" className='form-control' placeholder='Birth Place' />
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-lg-4 mb-4">
                                                <select name="caste" className="form-select form-select" aria-label=".form-select-sm example">
                                                    <option selected>-- Religion --</option>
                                                    {
                                                        religionData?.map((val, id) => {
                                                            return (
                                                                <option value={val.religion}>{val.religion}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                            </div>

                                            <div className="col-lg-4 mb-4">
                                                <input type="text" name="subCaste" className='form-control' placeholder='Caste' />
                                                {/* <select name="subCaste" className="form-select form-select" aria-label=".form-select-sm example">
                                                    <option selected>-- Caste --</option>
                                                </select> */}
                                            </div>

                                            <div className="col-lg-4 mb-4">
                                                <select name="complexion" className="form-select form-select" aria-label=".form-select-sm example">
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
                                                <select name="disablity" className="form-select form-select" aria-label=".form-select-sm example">
                                                    <option selected>-- Disability --</option>
                                                    <option value="None">None</option>
                                                    <option value="Blind">Blind</option>
                                                    <option value="Handicap">Handicap</option>
                                                    <option value="Deaf">Deaf</option>
                                                </select>
                                            </div>

                                            <div className="col-lg-4 mb-4">
                                                <select name="maritalStatus" className="form-select form-select" aria-label=".form-select-sm example">
                                                    <option selected>-- Marital Status --</option>
                                                    <option value="Single">Single</option>
                                                    <option value="Widow">Widow</option>
                                                    <option value="Widower">Widower</option>

                                                </select>
                                            </div>

                                            <div className="col-lg-4 mb-4">
                                                <select name="childrens_count" className="form-select form-select" aria-label=".form-select-sm example">
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
                                                <input type="number" name="age" className='form-control' placeholder='Your Age' />
                                            </div>

                                            <div className="col-lg-12 mb-4">
                                                <input type="text" name="addressLine1" id="addressLine1" className='form-control' placeholder='Residential Address Line 1' />
                                            </div>

                                            <div className="col-lg-12 mb-4">
                                                <input type="text" name="addressLine2" id="addressLine2" className='form-control' placeholder='Residential Address Line 2' />
                                            </div>
                                        </div>

                                        <div className="row">
                                            <p className='mb-3'>Profile Photos :</p>
                                            <div className="col-lg-12 mb-4">
                                                <input type="file" name="image1" className='form-control' required />
                                            </div>

                                            <div className="col-lg-12 mb-4">
                                                <input type="file" name="image2" className='form-control' required />
                                            </div>

                                            <div className="col-lg-12 mb-4">
                                                <input type="file" name="image3" className='form-control' required />
                                            </div>
                                        </div>

                                        <div className="row mb-5">
                                            <div className="col-lg-4 mb-4">
                                                <select name="country_name" className="form-select form-select" aria-label=".form-select-sm example" onChange={handleCountry}>
                                                    <option selected>-- Country --</option>
                                                    {
                                                        country?.map((val, id) => {
                                                            return (
                                                                <option value={`${val.iso2},${val.name}`}>{val.name}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                            </div>

                                            <div className="col-lg-4 mb-4">
                                                <select name="state_name" className="form-select form-select" aria-label=".form-select-sm example" onChange={handleState}>
                                                    <option selected>-- State --</option>
                                                    {
                                                        stateData?.map((value, index) => {
                                                            return (
                                                                <option value={`${value.iso2},${value.name}`}>{value.name}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                            </div>

                                            <div className="col-lg-4 mb-4">
                                                <select name="city_name" className="form-select form-select" aria-label=".form-select-sm example">
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
                                                <input type="text" name="taluka" id="taluka" className='form-control' placeholder='Taluka' />
                                            </div>

                                            <div className="col-lg-4 mb-4">
                                                <input type="text" name="district" id="district" className='form-control' placeholder='District' />
                                            </div>

                                            <div className="col-lg-4 mb-4">
                                                <input type="text" name="mother_tongue" className='form-control' placeholder='Mother Tongue' />
                                            </div>

                                            <div className="col-lg-12">
                                                <input type="submit" className='btn saveBtn ' value="Save Details" />
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )
                }
                <hr className='w-50 m-auto' />

                {/* FamilyInfo From */}
                {
                    familyinfo ?
                        (
                            <div className="row d-flex justify-content-center result_row">
                                <div className="col-lg-10 result_profile_div">
                                    <img src={completeIcon} alt="image" />
                                    <h4 className="result_profile_title">3. Family Information Submitted</h4>
                                </div>
                            </div>
                        )
                        :
                        (
                            <div className="row d-flex justify-content-center family_details_row mt-5">
                                <div className="col-lg-10">
                                    <h4 className='d-flex mb-4'>3. Family Information: </h4>
                                    <form onSubmit={handleFamilyInfo}>
                                        <div className="row">
                                            <div className="col-lg-6 d-flex mb-3">
                                                <label htmlFor="fathers_name" style={{ color: "black", width: "40%", fontFamily: "familyFont" }}>Father's Name</label>
                                                <input type="text" className='form-control' id="fathers_name" name="fathers_name" />
                                            </div>

                                            <div className="col-lg-6 d-flex mb-3">
                                                <label htmlFor="fathers_occupation" style={{ color: "black", width: "30%", fontFamily: "familyFont", paddingTop: "1.7%" }}>Occupation</label>
                                                <div className="btn-group me-2 fathers_occupation_group" role="group" aria-label="Second group">
                                                    &nbsp;<input type="radio" id="fathers_occupation" name="fathers_occupation" value="Job" />&nbsp;<span style={{ marginTop: '2%', marginLeft: "1%" }}>Job&emsp;</span>
                                                    &nbsp;<input type="radio" id="fathers_occupation" name="fathers_occupation" value="Business" />&nbsp;<span style={{ marginTop: '2%', marginLeft: "1%" }}>Business&emsp;</span>
                                                    &nbsp;<input type="radio" id="fathers_occupation" name="fathers_occupation" value="Retired" />&nbsp;<span style={{ marginTop: '2%', marginLeft: "1%" }}>Retired&emsp;</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-lg-6 d-flex mb-3">
                                                <label htmlFor="mothers_name" style={{ color: "black", width: "40%", fontFamily: "familyFont" }}>Mother's Name</label>
                                                <input type="text" className='form-control' id="mothers_name" name="mothers_name" />
                                            </div>
                                            <div className="col-lg-6 col-sm-12 d-flex mb-3">
                                                <label htmlFor="mothers_occupation" style={{ color: "black", width: "30%", fontFamily: "familyFont", paddingTop: "1.7%" }}>Occupation</label>
                                                <div className="btn-group me-2 mothers_occupation_group" role="group" aria-label="Second group">
                                                    &nbsp;<input type="radio" id="mothers_occupation" name="mothers_occupation" value="Job" />&nbsp;<span style={{ marginTop: '2%', marginLeft: "1%" }}>Job&emsp;</span>
                                                    &nbsp;<input type="radio" id="mothers_occupation" name="mothers_occupation" value="Business" />&nbsp;<span style={{ marginTop: '2%', marginLeft: "1%" }}>Business&emsp;</span>
                                                    &nbsp;<input type="radio" id="mothers_occupation" name="mothers_occupation" value="Retired" />&nbsp;<span style={{ marginTop: '2%', marginLeft: "1%" }}>Housewife&emsp;</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-lg-3 d-flex mb-4">
                                                <label htmlFor="bother_select" style={{ color: "black" }}>Brothers&emsp;</label>
                                                <select className="form-select form-select" name="bother_select" id="bother_select" aria-label=".form-select-sm example">
                                                    <option value="null">-- Please Select --</option>
                                                    <option value="no">No</option>
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="More than 2">More than 2</option>
                                                </select>
                                            </div>

                                            <div className="col-lg-3 d-flex mb-4">
                                                <label htmlFor="bother_status" style={{ color: "black" }}>Married&emsp;</label>
                                                <select className="form-select form-select" name="bother_status" id="bother_status" aria-label=".form-select-sm example">
                                                    <option value="null">-- Select --</option>
                                                    <option value="yes">Yes</option>
                                                    <option value="no">No</option>
                                                </select>
                                            </div>

                                            <div className="col-lg-3 d-flex mb-4">
                                                <label htmlFor="sister_select" style={{ color: "black" }}>Sisters&emsp;</label>
                                                <select className="form-select form-select" name="sister_select" aria-label=".form-select-sm example">
                                                    <option value="null">-- Select --</option>
                                                    <option value="no">No</option>
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="More than 2">More than 2</option>
                                                </select>
                                            </div>

                                            <div className="col-lg-3 d-flex mb-4">
                                                <label htmlFor="sister_status" style={{ color: "black" }}>Married&emsp;</label>
                                                <select className="form-select form-select" name="sister_status" aria-label=".form-select-sm example">
                                                    <option value="null">-- Select --</option>
                                                    <option value="yes">Yes</option>
                                                    <option value="no">No</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-lg-10 col-sm-12 col-xs-12 d-flex mb-4 w-100">
                                                <label htmlFor="property_checkbox" style={{ color: "black" }}>Property&emsp;</label>
                                                &nbsp;<input type="checkbox" name="vehicle" value="Bike" />&nbsp;Own a House&nbsp;
                                                &nbsp;<input type="checkbox" name="vehicle" value="Car" />&nbsp;Own a Farm&nbsp;
                                                &nbsp;<input type="checkbox" name="vehicle" value="Car" />&nbsp;Own a Plot&nbsp;
                                                &nbsp;<input type="checkbox" name="vehicle" value="Car" />&nbsp;Extra Additional Property&nbsp;
                                            </div>
                                        </div>

                                        <div className="row mb-5">
                                            <div className="col-lg-12">
                                                <input type="submit" className='btn saveBtn ' value="Save Details" />
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div >
                        )
                }
                <hr className='w-50 m-auto' />

                {/* 4. Partner Preference */}
                {
                    partnerinfo ?
                        (
                            <div className="row d-flex justify-content-center result_row">
                                <div className="col-lg-10 result_profile_div">
                                    <img src={completeIcon} alt="image" />
                                    <h4 className="result_profile_title">4. Partner Preference Details Submitted</h4>
                                </div>
                            </div>
                        )
                        :
                        (
                            <div className="row d-flex justify-content-center mt-4">
                                <div className="col-lg-10">
                                    <h4 className='d-flex mb-4'>4. Partner Preference: </h4>
                                    <form onSubmit={handlePartnerInfo}>
                                        <div className="row">
                                            <div className="col-lg-4 mb-4">
                                                <select name="education_pref" className="form-select form-select" aria-label=".form-select-sm example">
                                                    <option value="" selected>-- Education --</option>
                                                    {
                                                        educationdata?.map((val, id) => {
                                                            return (
                                                                <option key={id} value={val.education}>{val.education}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                            </div>

                                            <div className="col-lg-4 mb-4">
                                                <select name="occupation_pref" className="form-select form-select" aria-label=".form-select-sm example">
                                                    <option value="" selected>-- Occupation --</option>
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
                                                <select name="salary_pref" className="form-select form-select" aria-label=".form-select-sm example">
                                                    <option valuee="" selected>-- Salary / Annual Package --</option>
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
                                                <select name="complexion_pref" className="form-select form-select" aria-label=".form-select-sm example">
                                                    <option value="" selected>-- Complexion --</option>
                                                    <option value="Extremely fair skin">Extremely Fair Skin</option>
                                                    <option value="Fair Skin">Fair Skin</option>
                                                    <option value="Medium Skin">Medium Skin</option>
                                                    <option value="Olive Skin">Olive Skin</option>
                                                    <option value="Brown Skin">Brown Skin</option>

                                                </select>
                                            </div>

                                            <div className="col-lg-4 mb-4">
                                                <select name="height_pref" className="form-select form-select" aria-label=".form-select-sm example">
                                                    <option value="" selected>-- Height --</option>
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
                                                <input type="text" name="religion_pref" placeholder='Religion Preference' className='form-control' />
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-lg-4 mb-4">
                                                <input type="text" name="caste_pref" placeholder='Caste Preference' className='form-control' />
                                            </div>

                                            <div className="col-lg-4 mb-4">
                                                <input type="text" name="state_pref" className='form-control' placeholder='State Preference' />
                                            </div>

                                            <div className="col-lg-4 mb-4">
                                                <input type="text" name="location_pref" placeholder='Location Preference' className='form-control' />
                                            </div>
                                        </div>

                                        <div className="row mb-5">
                                            <div className="col-lg-12">
                                                <input type="submit" className='btn saveBtn ' value="Save Details" />
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )
                }
                <hr className='w-50 m-auto' />

                {/* 5. HoroscopalInfo Form */}
                {
                    horoscopinfo ?
                        (
                            <div className="row d-flex justify-content-center result_row">
                                <div className="col-lg-10 result_profile_div">
                                    <img src={completeIcon} alt="image" />
                                    <h4 className="result_profile_title">5. Horoscopic Information Submitted</h4>
                                </div>
                            </div>
                        )
                        :
                        (
                            <div className="row d-flex justify-content-center mt-4 mb-5">
                                <div className="col-lg-10">
                                    <h4 className='d-flex mb-4'>5. Horoscopic Details (Optional): </h4>
                                    <form onSubmit={handleHoroscope}>
                                        <div className="row">
                                            <div className="col-lg-4 mb-4">
                                                <select name="rashi" className="form-select form-select" aria-label=".form-select-sm example">
                                                    <option selected>-- Rashi --</option>
                                                    {
                                                        rashiArr?.map((val, id) => {
                                                            return (
                                                                <option value={val}>{val}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                            </div>

                                            <div className="col-lg-4 mb-4">
                                                <select name="nakshatra" className="form-select form-select" aria-label=".form-select-sm example">
                                                    <option selected>-- Nakshatra --</option>
                                                    {
                                                        nakshtraArr?.map((val, id) => {
                                                            return (
                                                                <option value={val}>{val}</option>
                                                            )
                                                        })
                                                    }

                                                </select>
                                            </div>

                                            <div className="col-lg-4 mb-4">
                                                <select name="mangal" className="form-select form-select" aria-label=".form-select-sm example">
                                                    <option selected>-- Mangal --</option>
                                                    <option value="true">Yes</option>
                                                    <option value="false">No</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-lg-4 mb-4">
                                                <input type="text" name="charan" className='form-control' placeholder='Charan' />
                                            </div>

                                            <div className="col-lg-4 mb-4">
                                                <input type="text" name="time_of_birth" className="form-control" onFocus={(e) => (e.target.type = "time")} onBlur={(e) => (e.target.type = "text")} placeholder={'Birth Time'} />
                                            </div>

                                            <div className="col-lg-4 mb-4">
                                                <input type="text" name="place_of_birth" id="place_of_birth" className='form-control' placeholder='Birth Place' />
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-lg-4 mb-4">
                                                <select name="nadi" className="form-select form-select" aria-label="form-select-sm example">
                                                    <option selected>-- Nadi --</option>
                                                    {
                                                        nadiArr?.map((val, id) => {
                                                            return (
                                                                <option value={val}>{val}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                            </div>

                                            <div className="col-lg-4 mb-4">
                                                <input type="text" name="devak" className='form-control' placeholder='Devak' />
                                            </div>

                                            <div className="col-lg-4 mb-4">
                                                <select name="gan" className="form-select form-select" aria-label=".form-select-sm example">
                                                    <option selected>-- Gan --</option>
                                                    {
                                                        ganArr?.map((val, id) => {
                                                            return (
                                                                <option value={val}>{val}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-lg-12">
                                                <input type="submit" className='btn saveBtn ' value="Save Details" />
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )
                }
            </div >
        </>
    )
}

export default AddProfile;
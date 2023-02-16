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
const AddProfile = () => {
    const navigate = useNavigate()
    useEffect(() => {
        if (localStorage.getItem('accesstoken')) {
        }
        else {
            navigate('/login')
        }

    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        const formdata = new FormData(e.target);
        const data = Object.fromEntries(formdata.entries());
        console.log(data);
    }
    const [pass, setPass] = useState(false);


    //   basicinfo

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


        axios.get(`https://api.countrystatecity.in/v1/countries/${countriesName}/states/${event.target.value}/cities`, {
            headers: {
                'X-CSCAPI-KEY': 'MGZMRlZLbkZ0SmNiOGkxQzBlREFLYjBKdlZZU1BnRmlRbGI3N2lvVg=='
            }
        }).then((res) => {
            setCityData(res.data)
        }).catch((err) => { })

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
                {/* Register form */}
                <div className="row d-flex justify-content-center mt-5">
                    <div className="col-lg-9 outer_form_div">
                        <form onSubmit={handleSubmit} autoComplete='off'>
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
                            <div className="col-lg-12">
                                <button className='btn save_btn'>Save Details</button>
                            </div>
                        </form>
                    </div>
                </div>
                <hr />

                {/* BasicInfo Form */}
                <div className="row d-flex justify-content-center">
                    <div className="col-lg-10">
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-lg-4 mb-4">
                                    <select name="height" class="form-select form-select" aria-label=".form-select-sm example">
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
                                    <select name="weight" class="form-select form-select" aria-label=".form-select-sm example">
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
                                    <select name="bloodGroup" class="form-select form-select" aria-label=".form-select-sm example">
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
                                    <select name="education" class="form-select form-select" aria-label=".form-select-sm example">
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
                                    <select name="occupation" class="form-select form-select" aria-label=".form-select-sm example">
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
                                    <select name="salaryPA" class="form-select form-select" aria-label=".form-select-sm example">
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
                                    <input type="date" name="dob" id="dob" className='form-control' />
                                </div>

                                <div className="col-lg-4 mb-4">
                                    <input type="datetime-local" name="birth_time" id="birth_time" className='form-control' />
                                </div>

                                <div className="col-lg-4 mb-4">
                                    <input type="text" name="birth_place" id="birth_place" className='form-control' placeholder='Birth Place' />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-lg-4 mb-4">
                                    <select name="caste" class="form-select form-select" aria-label=".form-select-sm example">
                                        <option selected>-- Caste --</option>
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
                                    <select name="subCaste" class="form-select form-select" aria-label=".form-select-sm example">
                                        <option selected>-- Sub-caste --</option>
                                    </select>
                                </div>

                                <div className="col-lg-4 mb-4">
                                    <select name="complexion" class="form-select form-select" aria-label=".form-select-sm example">
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
                                    <select name="disablity" class="form-select form-select" aria-label=".form-select-sm example">
                                        <option selected>-- Disability --</option>
                                        <option value="Blind">Blind</option>
                                        <option value="Handicap">Handicap</option>
                                        <option value="Deaf">Deaf</option>
                                    </select>
                                </div>

                                <div className="col-lg-4 mb-4">
                                    <select name="maritalStatus" class="form-select form-select" aria-label=".form-select-sm example">
                                        <option selected>-- Marital Status --</option>
                                        <option value="Single">Single</option>
                                        <option value="Widow">Widow</option>
                                    </select>
                                </div>

                                <div className="col-lg-4 mb-4">
                                    <select name="childrens_count" class="form-select form-select" aria-label=".form-select-sm example">
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
                                    <input type="text" name="addressLine1" id="addressLine1" className='form-control' placeholder='Residential Address Line 1' />
                                </div>

                                <div className="col-lg-12 mb-4">
                                    <input type="text" name="addressLine2" id="addressLine2" className='form-control' placeholder='Residential Address Line 2' />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-lg-4 mb-4">
                                    <select name="country_name" class="form-select form-select" aria-label=".form-select-sm example" onChange={handleCountry}>
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
                                    <select name="state_name" class="form-select form-select" aria-label=".form-select-sm example" onChange={handleState}>
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
                                    <select name="city_name" class="form-select form-select" aria-label=".form-select-sm example">
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

                                <div className="col-lg-6 mb-4">
                                    <input type="text" name="taluka" id="taluka" className='form-control' placeholder='Taluka' />
                                </div>

                                <div className="col-lg-6 mb-4">
                                    <input type="text" name="district" id="district" className='form-control' placeholder='District' />
                                </div>

                                <div className="col-lg-12">
                                    <button className='btn save_btn'> Save Details</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <hr />

                {/* FamilyInfo From */}
                <div className="row d-flex justify-content-center family_details_row mb-5 pt-4 pb-4">
                    <div className="col-lg-10">
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-lg-6 d-flex mb-3">
                                    <label htmlFor="fathers_name" style={{ color: "black", width: "40%", fontFamily: "familyFont" }}>Father's Name</label>
                                    <input type="text" className='form-control' id="fathers_name" name="fathers_name" />
                                </div>

                                <div className="col-lg-6 d-flex mb-3">
                                    <label htmlFor="fathers_occupation" style={{ color: "black", width: "30%", fontFamily: "familyFont", paddingTop: "1.7%" }}>Occupation</label>
                                    <div class="btn-group me-2 fathers_occupation_group" role="group" aria-label="Second group">
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
                                    <div class="btn-group me-2 mothers_occupation_group" role="group" aria-label="Second group">
                                        &nbsp;<input type="radio" id="mothers_occupation" name="mothers_occupation" value="Job" />&nbsp;<span style={{ marginTop: '2%', marginLeft: "1%" }}>Job&emsp;</span>
                                        &nbsp;<input type="radio" id="mothers_occupation" name="mothers_occupation" value="Business" />&nbsp;<span style={{ marginTop: '2%', marginLeft: "1%" }}>Business&emsp;</span>
                                        &nbsp;<input type="radio" id="mothers_occupation" name="mothers_occupation" value="Retired" />&nbsp;<span style={{ marginTop: '2%', marginLeft: "1%" }}>Housewife&emsp;</span>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-lg-3 d-flex mb-4">
                                    <label htmlFor="bother_select" style={{ color: "black" }}>Brothers&emsp;</label>
                                    <select class="form-select form-select" name="bother_select" id="bother_select" aria-label=".form-select-sm example">
                                        <option value="null"></option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="More than 2">More than 2</option>
                                    </select>
                                </div>

                                <div className="col-lg-3 d-flex mb-4">
                                    <label htmlFor="bother_status" style={{ color: "black" }}>Married&emsp;</label>
                                    <select class="form-select form-select" name="bother_status" id="bother_status" aria-label=".form-select-sm example">
                                        <option value="null"></option>
                                        <option value="yes">Yes</option>
                                        <option value="no">No</option>
                                    </select>
                                </div>

                                <div className="col-lg-3 d-flex mb-4">
                                    <label htmlFor="sister_select" style={{ color: "black" }}>Sisters&emsp;</label>
                                    <select class="form-select form-select" name="sister_select" aria-label=".form-select-sm example">
                                        <option value="null"></option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="More than 2">More than 2</option>
                                    </select>
                                </div>

                                <div className="col-lg-3 d-flex mb-4">
                                    <label htmlFor="sister_status" style={{ color: "black" }}>Married&emsp;</label>
                                    <select class="form-select form-select" name="sister_status" aria-label=".form-select-sm example">
                                        <option value="null"></option>
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

                            <div className="col-lg-12">
                                <button className='btn save_btn'> Save Details</button>
                            </div>
                        </form>
                    </div>
                </div>
                <hr />

                {/* HoroscopalInfo Form */}

                <div className="row d-flex justify-content-center">
                    <div className="col-lg-10">
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-lg-4 mb-4">
                                    <select name="rashi" class="form-select form-select" aria-label=".form-select-sm example">
                                        <option selected>-- Rashi --</option>

                                    </select>
                                </div>

                                <div className="col-lg-4 mb-4">
                                    <select name="nakshatra" class="form-select form-select" aria-label=".form-select-sm example">
                                        <option selected>-- Nakshatra --</option>

                                    </select>
                                </div>

                                <div className="col-lg-4 mb-4">
                                    <select name="mangal" class="form-select form-select" aria-label=".form-select-sm example">
                                        <option selected>-- Mangal --</option>
                                    </select>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-lg-4 mb-4">
                                    <select name="charan" class="form-select form-select" aria-label=".form-select-sm example">
                                        <option selected>-- Charan --</option>
                                    </select>
                                </div>

                                <div className="col-lg-4 mb-4">
                                    <input type="datetime-local" name="time_of_birth" id="time_of_birth" className='form-control' />
                                </div>

                                <div className="col-lg-4 mb-4">
                                    <input type="text" name="place_of_birth" id="place_of_birth" className='form-control' placeholder='Birth Place' />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-lg-4 mb-4">
                                    <select name="nadi" class="form-select form-select" aria-label="form-select-sm example">
                                        <option selected>-- Nadi --</option>
                                    </select>
                                </div>

                                <div className="col-lg-4 mb-4">
                                    <select name="devak" class="form-select form-select" aria-label=".form-select-sm example">
                                        <option selected>-- Devak --</option>
                                    </select>
                                </div>

                                <div className="col-lg-4 mb-4">
                                    <select name="gan" class="form-select form-select" aria-label=".form-select-sm example">
                                        <option selected>-- Gan --</option>
                                    </select>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-lg-12">
                                    <button className='btn save_btn'> Save Details</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </>
    )
}

export default AddProfile;
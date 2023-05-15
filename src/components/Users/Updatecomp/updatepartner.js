import axios from 'axios'
import React, { useEffect, useState } from 'react'
import educational from "../../educationData.json"
import heightdata from "../../heightData.json"
import religion from "../../religionData.json"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
const Updatepartner = ({ email }) => {
    const notify = (p, msg) => p ? toast.success(msg) : toast.error(msg);

    const [partner, setPartner] = useState({})
    useEffect(() => {
        axios.post(`${REACT_APP_BASEURL}/admincrud/getpartnerdetailsupdate`, { email }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem('accesstoken')
            }
        }).then((res) => {
            setPartner(res.data)

        }).catch((err) => {
            notify(0, "Something went wrong..!")
        })

    }, [])

    const handlePartner = (e) => {
        e.preventDefault()
        const formdata = new FormData(e.target);
        const data = Object.fromEntries(formdata.entries());
        const payLoad = { ...data, email }

        axios.post(`${REACT_APP_BASEURL}/admincrud/updatepartnerdetails`, payLoad, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem('accesstoken')
            }
        }).then((res) => {
            notify(1, "User partner prefrence details updated succesfully")
        }).catch((err) => {
            notify(0, "Something went wrong..!")
        })

    }
    return (
        <div>
            {/* 4. Partner Preference */}
            <div className="row d-flex justify-content-center mt-4">
                <div className="col-lg-10">
                    <h4 className='d-flex mb-4'>4. Update Partner Preference Details: </h4>
                    <form onSubmit={handlePartner} autoComplete="off">
                        <div className="row">
                            <div className="col-lg-4 mb-4">
                                <select name="education_pref" value={partner.education_pref} onChange={(e) => { setPartner({ ...partner, education_pref: e.target.value }) }} className="form-select form-select" aria-label=".form-select-sm example">
                                    <option value="" selected>-- Education --</option>

                                    {
                                        educational.map((val, idx) => {
                                            return (
                                                <option value={val.education} key={idx}>{val.education}</option>
                                            )
                                        })
                                    }

                                </select>
                            </div>

                            <div className="col-lg-4 mb-4">
                                <select name="occupation_pref" value={partner.occupation_pref} onChange={(e) => { setPartner({ ...partner, occupation_pref: e.target.value }) }} className="form-select form-select" aria-label=".form-select-sm example">
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
                                <select name="salary_pref" value={partner.salary_pref} onChange={(e) => { setPartner({ ...partner, salary_pref: e.target.value }) }} className="form-select form-select" aria-label=".form-select-sm example">
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
                                <select name="complexion_pref" value={partner.complexion_pref} onChange={(e) => { setPartner({ ...partner, complexion_pref: e.target.value }) }} className="form-select form-select" aria-label=".form-select-sm example">
                                    <option value="" selected>-- Complexion --</option>
                                    <option value="Extremely fair skin">Extremely Fair Skin</option>
                                    <option value="Fair Skin">Fair Skin</option>
                                    <option value="Medium Skin">Medium Skin</option>
                                    <option value="Olive Skin">Olive Skin</option>
                                    <option value="Brown Skin">Brown Skin</option>

                                </select>
                            </div>

                            <div className="col-lg-4 mb-4">
                                <select name="height_pref" value={partner.height_pref} onChange={(e) => { setPartner({ ...partner, height_pref: e.target.value }) }} className="form-select form-select" aria-label=".form-select-sm example">
                                    <option selected>-- Height --</option>
                                    {
                                        heightdata?.map((val, index) => {
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
                                <select name="religion_pref" value={partner.religion_pref} onChange={(e) => { setPartner({ ...partner, religion_pref: e.target.value }) }} className="form-select form-select" aria-label=".form-select-sm example">
                                    <option selected>-- Religon --</option>
                                    {
                                        religion?.map((val, id) => {
                                            return (
                                                <option key={id} value={val.religion} selected={val.religion === partner.caste ? ("selected") : ("")}>{val.religion}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-lg-4 mb-4">
                                <input type="text" name="caste_pref" value={partner.caste_pref} onChange={(e) => { setPartner({ ...partner, caste_pref: e.target.value }) }} className='form-control' placeholder='Caste Prefrence' />
                            </div>


                            <div className="col-lg-4 mb-4">
                                <input type="text" name="state_pref" value={partner.state_pref} onChange={(e) => { setPartner({ ...partner, state_pref: e.target.value }) }} className='form-control' placeholder='State Prefrence' />
                            </div>
                            <div className="col-lg-4 mb-4">
                                <input type="text" name="location_pref" value={partner.location_pref} onChange={(e) => { setPartner({ ...partner, location_pref: e.target.value }) }} className='form-control' placeholder='Location Prefrence' />
                            </div>


                        </div>
                        <div className="row mb-4">
                            <div className="col-lg-12">
                                <input type="submit" className='btn saveBtn' value="Update Partner Preference Details Now" />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <hr className='w-50 m-auto' /></div>
    )
}

export default Updatepartner
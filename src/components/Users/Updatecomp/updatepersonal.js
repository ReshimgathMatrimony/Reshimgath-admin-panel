import axios from 'axios'
import React, { useEffect, useState } from 'react'
import religionData from "../../religionData.json"
import heightData from "../../heightData.json"
import educationdata from "../../educationData.json"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
const Updatepersonal = ({ email }) => {
    const notify = (p, msg) => p ? toast.success(msg) : toast.error(msg);

    const [peronsladata, setperonslaData] = useState({})
    const [prevImg1, setPrevImg1] = useState("")
    const [prevImg2, setPrevImg2] = useState("")
    const [prevImg3, setPrevImg3] = useState("")
    useEffect(() => {
        axios.post('http://localhost:3031/admincrud/getpersonaldetailsupdate', { email }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem('accesstoken')
            }
        }).then((res) => {
            setperonslaData(res.data)
            setPrevImg1(res.data.image1)
            setPrevImg2(res.data.image2)
            setPrevImg3(res.data.image3)

        }).catch((err) => {
            notify(0, "Something went wrong..!")
        })

    }, [])
    const imageFormator = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onloadend = () => {
                resolve(reader.result)
            }
        })
    }
    const handlePeronldata = async (e) => {
        e.preventDefault()
        const formdata = new FormData(e.target);
        const data = Object.fromEntries(formdata.entries());
        let newImg1
        let newImg2
        let newImg3

        data.image1.name === "" ? (newImg1 = prevImg1) : (newImg1 = await imageFormator(data.image1))
        data.image2.name === "" ? (newImg2 = prevImg2) : (newImg2 = await imageFormator(data.image2))
        data.image3.name === "" ? (newImg3 = prevImg3) : (newImg3 = await imageFormator(data.image3))
        const payLoad = { ...data, email, image1: newImg1, image2: newImg2, image3: newImg3, }

        axios.post('http://localhost:3031/admincrud/updatebasicdetails', payLoad, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem('accesstoken')
            }
        }).then((res) => {
            notify(1, "User basic details updated succesfully")
        }).catch((err) => {
            notify(0, "User basic details not  updated succesfully")
        })
    }
    return (
        <div>
            <ToastContainer position="bottom-left" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />

            {/* 2. BasicInfo Form */}
            <div className="row d-flex justify-content-center mt-4">
                <div className="col-lg-10">
                    <h4 className='d-flex mb-4'>2. Update Personal Information: </h4>
                    <form onSubmit={handlePeronldata} autoComplete="off">
                        <div className="row">
                            <div className="col-lg-4 mb-4">
                                <select name="height" value={peronsladata.height} onChange={(e) => { setperonslaData({ ...peronsladata, height: e.target.value }) }} className="form-select form-select" aria-label=".form-select-sm example">
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
                                <select name="weight" value={peronsladata.weight} onChange={(e) => { setperonslaData({ ...peronsladata, weight: e.target.value }) }} className="form-select form-select" aria-label=".form-select-sm example">
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
                                <select name="bloodGroup" value={peronsladata.bloodGroup} onChange={(e) => { setperonslaData({ ...peronsladata, bloodGroup: e.target.value }) }} className="form-select form-select" aria-label=".form-select-sm example">
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
                                <select name="education" value={peronsladata.education} onChange={(e) => { setperonslaData({ ...peronsladata, education: e.target.value }) }} className="form-select form-select" aria-label=".form-select-sm example">
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
                                <select name="occupation" value={peronsladata.occupation} onChange={(e) => { setperonslaData({ ...peronsladata, occupation: e.target.value }) }} className="form-select form-select" aria-label=".form-select-sm example">
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
                                <select name="salaryPA" value={peronsladata.salaryPA} onChange={(e) => { setperonslaData({ ...peronsladata, salaryPA: e.target.value }) }} className="form-select form-select" aria-label=".form-select-sm example">
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
                                <input type="text" name="dob" value={peronsladata.dob} onChange={(e) => { setperonslaData({ ...peronsladata, dob: e.target.value }) }} className="form-control" onFocus={(e) => (e.target.type = "date")} onBlur={(e) => (e.target.type = "text")} placeholder={'Date of Birth'} />
                            </div>

                            <div className="col-lg-4 mb-4">
                                <input type="text" name="birth_time" value={peronsladata.birth_time} onChange={(e) => { setperonslaData({ ...peronsladata, birth_time: e.target.value }) }} className="form-control" onFocus={(e) => (e.target.type = "time")} onBlur={(e) => (e.target.type = "text")} placeholder={'Birth Time'} />
                            </div>

                            <div className="col-lg-4 mb-4">
                                <input type="text" name="birth_place" value={peronsladata.birth_place} onChange={(e) => { setperonslaData({ ...peronsladata, birth_place: e.target.value }) }} className='form-control' placeholder='Birth Place' />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-lg-4 mb-4">
                                <select name="caste" value={peronsladata.caste} onChange={(e) => { setperonslaData({ ...peronsladata, caste: e.target.value }) }} className="form-select form-select" aria-label=".form-select-sm example">
                                    <option selected>-- Caste --</option>
                                    {
                                        religionData?.map((val, id) => {
                                            return (
                                                <option key={id} value={val.religion} selected={val.religion === peronsladata.caste ? ("selected") : ("")}>{val.religion}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>

                            <div className="col-lg-4 mb-4">
                                <input type="text" name="subCaste" value={peronsladata.subCaste} onChange={(e) => { setperonslaData({ ...peronsladata, subCaste: e.target.value }) }} className='form-control' placeholder='Caste' />
                            </div>

                            <div className="col-lg-4 mb-4">
                                <select name="complexion" value={peronsladata.complexion} onChange={(e) => { setperonslaData({ ...peronsladata, complexion: e.target.value }) }} className="form-select form-select" aria-label=".form-select-sm example">
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
                                <select name="disablity" value={peronsladata.disablity} onChange={(e) => { setperonslaData({ ...peronsladata, disablity: e.target.value }) }} className="form-select form-select">
                                    <option selected>-- Disability --</option>
                                    <option value="None">None</option>
                                    <option value="Blind">Blind</option>
                                    <option value="Handicap">Handicap</option>
                                    <option value="Deaf">Deaf</option>
                                </select>
                            </div>

                            <div className="col-lg-4 mb-4">
                                <select name="maritalStatus" value={peronsladata.maritalStatus} onChange={(e) => { setperonslaData({ ...peronsladata, maritalStatus: e.target.value }) }} className="form-select form-select" aria-label=".form-select-sm example">
                                    <option selected>-- Marital Status --</option>
                                    <option value="Single">Single</option>
                                    <option value="Widow">Widow</option>
                                    <option value="Widower">Widower</option>

                                </select>
                            </div>

                            <div className="col-lg-4 mb-4">
                                <select name="childrens_count" value={peronsladata.childrens_count} onChange={(e) => { setperonslaData({ ...peronsladata, childrens_count: e.target.value }) }} className="form-select form-select" aria-label=".form-select-sm example">
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
                                <input type="number" name="age" value={peronsladata.age} onChange={(e) => { setperonslaData({ ...peronsladata, age: e.target.value }) }} className='form-control' placeholder='Your Age' />
                            </div>

                            <div className="col-lg-12 mb-4">
                                <input type="text" value={peronsladata.addressLine1} name="addressLine1" onChange={(e) => { setperonslaData({ ...peronsladata, addressLine1: e.target.value }) }} className='form-control' placeholder='Residential Address Line 1' />
                            </div>

                            <div className="col-lg-12 mb-4">
                                <input type="text" name="addressLine2" value={peronsladata.addressLine2} onChange={(e) => { setperonslaData({ ...peronsladata, addressLine2: e.target.value }) }} className='form-control' placeholder='Residential Address Line 2' />
                            </div>
                        </div>

                        <div className="row">
                            <p className='mb-3 d-flex'> <b>Previous Profile Photos :</b></p>

                            <div className="col-lg-4">
                                <img src={peronsladata.image1} alt="image" height="100px" width="150px" />
                            </div>

                            <div className="col-lg-4">
                                <img src={peronsladata.image2} alt="image" height="100px" width="150px" />
                            </div>

                            <div className="col-lg-4">
                                <img src={peronsladata.image3} alt="image" height="100px" width="150px" />
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
                                <input type="text" name="country_name" className='form-control' placeholder='Update Country' value={peronsladata.country_name} onChange={(e) => { setperonslaData({ ...peronsladata, country_name: e.target.value }) }} />

                            </div>

                            <div className="col-lg-4 mb-4">
                                <input type="text" name="state_name" className='form-control' placeholder='Update State' value={peronsladata.state_name} onChange={(e) => { setperonslaData({ ...peronsladata, state_name: e.target.value }) }} />

                            </div>

                            <div className="col-lg-4 mb-4">
                                <input type="text" name="city_name" className='form-control' placeholder='Update City' value={peronsladata.city_name} onChange={(e) => { setperonslaData({ ...peronsladata, city_name: e.target.value }) }} />
                            </div>
                            <div className="col-lg-4 mb-4">
                                <input type="text" name="taluka" value={peronsladata.taluka} onChange={(e) => { setperonslaData({ ...peronsladata, taluka: e.target.value }) }} className='form-control' placeholder='Update Taluka' />
                            </div>

                            <div className="col-lg-4 mb-4">
                                <input type="text" name="district" value={peronsladata.district} onChange={(e) => { setperonslaData({ ...peronsladata, district: e.target.value }) }} className='form-control' placeholder='Update District' />
                            </div>

                            <div className="col-lg-4 mb-4">
                                <input type="text" name="mother_tongue" value={peronsladata.mother_tongue} onChange={(e) => { setperonslaData({ ...peronsladata, mother_tongue: e.target.value }) }} className='form-control' placeholder='Update Mother Tongue' />
                            </div>
                        </div>
                        <div className="row mb-4">
                            <div className="col-lg-12">
                                <input type="submit" className='btn saveBtn' value="Update Basic Details Now" />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <hr className='w-50 m-auto' /></div>
    )
}

export default Updatepersonal
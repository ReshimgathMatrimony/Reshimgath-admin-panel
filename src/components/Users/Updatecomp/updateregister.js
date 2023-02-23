import axios from 'axios'
import React, { useEffect, useState } from 'react'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
const Updateregister = ({ email }) => {

    const notify = (p, msg) => p ? toast.success(msg) : toast.error(msg);
    const [registerdata, setRegisterdata] = useState({})
    useEffect(() => {
        axios.post('http://localhost:3031/admincrud/getregisterdetailsupdate', { email }).then((res) => {
            setRegisterdata(res.data)
        }).catch((err) => {
            console.log(err)
        })

    }, [])
    const handleRegisterdata = (e) => {
        e.preventDefault()
        const formdata = new FormData(e.target);
        const data = Object.fromEntries(formdata.entries());
        const payLoad = { ...data, email }
        axios.post('http://localhost:3031/admincrud/updateregisterdetails', payLoad).then((res) => {
            notify(1, "User register details updated succesfully")
        }).catch((err) => {
            notify(0, "User register details not updated succesfully")

        })

    }
    return (
        <div>
            <ToastContainer position="bottom-left" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />

            {/*1. Register form */}
            <div className="row d-flex justify-content-center mt-4">
                <div className="col-lg-10 outer_form_div">
                    <h4 className='d-flex mb-4'>1. Update Basic Registration Details: </h4>

                    <form onSubmit={handleRegisterdata} autoComplete='off'>
                        <div className="row">
                            <div className="col-lg-6  mb-3">
                                <input type="text" value={registerdata.firstname} onChange={(e) => { setRegisterdata({ ...registerdata, firstname: e.target.value }) }} className="form-control" name='firstname' placeholder='First Name' />
                            </div>
                            <div className="col-lg-6  mb-3">
                                <input type="text" value={registerdata.lastname} onChange={(e) => { setRegisterdata({ ...registerdata, lastname: e.target.value }) }} className="form-control" name='lastname' id='lastname' placeholder='Last Name' />
                            </div>
                        </div>

                        <div className="col-lg-12 mb-3">
                            <input type="email" value={registerdata.email} className="form-control" name="email" placeholder='Email Id' />
                        </div>

                        <div className="row">
                            <div className="col-lg-6 mb-4">
                                <input type="number" value={registerdata.mobile} onChange={(e) => { setRegisterdata({ ...registerdata, mobile: e.target.value }) }} className="form-control" name='mobile' placeholder='Mobile Number' />
                            </div>

                            <div className="col-lg-6 mb-4">
                                <select name="gender" value={registerdata.gender} onChange={(e) => { setRegisterdata({ ...registerdata, gender: e.target.value }) }} className="form-select form-select" aria-label=".form-select-sm example">
                                    <option selected>Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                        </div>
                        <div className="row mb-4">
                            <div className="col-lg-12">
                                <input type="submit" className='btn saveBtn' value="Update Register Details" />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            < hr className='w-50 m-auto' /></div>
    )
}

export default Updateregister
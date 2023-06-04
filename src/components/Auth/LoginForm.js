import React, { useState } from 'react';
import './LoginForm.css';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const navigate = useNavigate()
    const [showError, setShowError] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        const formdata = new FormData(e.target);
        const data = Object.fromEntries(formdata.entries());
        axios.post(`${process.env.REACT_APP_BASEURL}/admincrud/loginadmin`, data, {
            headers: {
                "Content-Type": "application/json",
            }
        }).then((res) => {
            localStorage.setItem('accesstoken', res.data.accesstoken)
            navigate('/')
        }).catch((err) => {
            setShowError(true)
        })
    }

    return (
        <>
            <div className="container ">
                <div className="row">

                    <div className="col-lg-4 mx-auto justify-content-center loginform_div mt-5">
                        <form onSubmit={handleSubmit} autoComplete="off">
                            <h2 className='mt-4 formtitle'>Reshimgath Matrimony</h2>
                            <p className="mt-3 text-white">( Please Enter Credentials for Login )</p>
                            <div className="mb-3 mt-5">
                                <label for="loginMail" className="form-label text-white fw-bold">Email ID</label><br />
                                <input type="email" id="loginMail" name="email" class="form-control" />

                            </div>
                            <div className="mb-3">
                                <label for="loginPassword" className="form-label text-white fw-bold">Password</label><br />
                                <input type="password" id="loginPassword" name="password" class="form-control" />
                            </div>
                            {
                                showError ? (<div className="mt-4 mb-3">
                                    <p className="text-center" style={{ backgroundColor: '#fff', color: 'red' }}>Invalid Credentials..!</p>
                                </div>) : ('')
                            }
                            <div className='d-grid gap-2'>
                                <input type="submit" value="Login Now" className="btn btnLogin mb-5 fw-bold" />
                            </div>
                        </form>
                    </div>

                </div>
            </div>

        </>
    )
}


export default LoginForm;
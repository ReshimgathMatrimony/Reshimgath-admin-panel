import axios from 'axios'
import React, { useEffect, useState } from 'react'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
const Updatehoroscope = ({ email }) => {
    const notify = (p, msg) => p ? toast.success(msg) : toast.error(msg);

    const rashiArr = ['Mesh', 'Vrishabh', 'Mithun', 'Kark', 'Sinh', 'Kanya', 'Tula', 'Vrishchik'];
    const nakshtraArr = ['Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira', 'Ardra', 'Punarvasu', 'Pushya', 'Ashlesha', 'Magha', 'Purva Phalguni', 'Uttara', 'Phalguni', 'Hasta', 'Chitra', 'Swati', 'Vishaka', 'Anurada', 'Jyeshta', 'Mula', 'Purva Ashadha', 'Uttara Ashadha', 'Shravana', 'Dhanishta', 'Shatabhishak', 'Purva Bhadrapada', 'Uttara Bhadrapada', 'Revati']
    const ganArr = ['manav gan', 'dev gan', 'rakshas gan'];
    const nadiArr = ['Aadi Nadi', 'Madhya Nadi', 'Antya Nadi']
    const [horoscope, setHoroscope] = useState({})
    useEffect(() => {
        axios.post('http://localhost:3031/admincrud/gethoroscopedetailsupdate', { email }).then((res) => {
            setHoroscope(res.data)
        }).catch((err) => {
            console.log(err)
        })

    }, [])
    const handleHoroscope = (e) => {
        e.preventDefault()
        const formdata = new FormData(e.target);
        const data = Object.fromEntries(formdata.entries());

        const payLoad = { ...data, email }

        axios.post('http://localhost:3031/admincrud/updatehoroscopedetails', payLoad).then((res) => {
            notify(1, "User horoscope details updated succesfully")

        }).catch((err) => {
            console.log(err)
        })
    }
    return (
        <div>
            {/* 5. HoroscopalInfo Form */}
            <div className="row d-flex justify-content-center mt-4 mb-5">
                <div className="col-lg-10">
                    <h4 className='d-flex mb-4'>5. Update Horoscopic Details (Optional): </h4>
                    <form onSubmit={handleHoroscope} autoComplete="off">
                        <div className="row">
                            <div className="col-lg-4 mb-4">
                                <select name="rashi" value={horoscope.rashi} onChange={(e) => { setHoroscope({ ...horoscope, rashi: e.target.value }) }} className="form-select form-select" aria-label=".form-select-sm example">
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
                                <select name="nakshatra" value={horoscope.nakshatra} onChange={(e) => { setHoroscope({ ...horoscope, nakshatra: e.target.value }) }} className="form-select form-select" aria-label=".form-select-sm example">
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
                                <select name="mangal" value={horoscope.mangal} onChange={(e) => { setHoroscope({ ...horoscope, mangal: e.target.value }) }} className="form-select form-select" aria-label=".form-select-sm example">
                                    <option selected>-- Mangal --</option>
                                    <option value="true">Yes</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-lg-4 mb-4">
                                <input type="text" name="charan" value={horoscope.charan} onChange={(e) => { setHoroscope({ ...horoscope, charan: e.target.value }) }} className='form-control' placeholder='Charan' />
                            </div>


                            <div className="col-lg-4 mb-4">
                                <input type="text" value={horoscope.time_of_birth} onChange={(e) => { setHoroscope({ ...horoscope, time_of_birth: e.target.value }) }} name="time_of_birth" className="form-control" onFocus={(e) => (e.target.type = "time")} onBlur={(e) => (e.target.type = "text")} placeholder={'Birth Time'} />
                            </div>

                            <div className="col-lg-4 mb-4">
                                <input type="text" name="place_of_birth" value={horoscope.place_of_birth} onChange={(e) => { setHoroscope({ ...horoscope, place_of_birth: e.target.value }) }} id="place_of_birth" className='form-control' placeholder='Birth Place' />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-lg-4 mb-4">
                                <select name="nadi" value={horoscope.nadi} onChange={(e) => { setHoroscope({ ...horoscope, nadi: e.target.value }) }} className="form-select form-select" aria-label="form-select-sm example">
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
                                <input type="text" name="devak" value={horoscope.devak} onChange={(e) => { setHoroscope({ ...horoscope, devak: e.target.value }) }} className='form-control' placeholder='Devak' />
                            </div>


                            <div className="col-lg-4 mb-4">
                                <select name="gan" value={horoscope.gan} onChange={(e) => { setHoroscope({ ...horoscope, gan: e.target.value }) }} className="form-select form-select" aria-label=".form-select-sm example">
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
                        <div className="row mb-4">
                            <div className="col-lg-12">
                                <input type="submit" className='btn saveBtn' value="Update Details Now" />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Updatehoroscope
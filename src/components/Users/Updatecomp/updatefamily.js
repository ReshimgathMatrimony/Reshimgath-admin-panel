import axios from 'axios'
import React, { useEffect, useState } from 'react'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
const Updatefamily = ({ email }) => {
    const notify = (p, msg) => p ? toast.success(msg) : toast.error(msg);

    const [family, setFamily] = useState({})
    useEffect(() => {
        axios.post('http://localhost:3031/admincrud/getfamilydetailsupdate', { email }).then((res) => {
            setFamily(res.data)
        }).catch((err) => {
            console.log(err)
        })

    }, [])

    const handleFamily = (e) => {
        e.preventDefault()
        const formdata = new FormData(e.target);
        const data = Object.fromEntries(formdata.entries());

        const payLoad = { ...data, email }
        axios.post('http://localhost:3031/admincrud/updatefamilydetails', payLoad).then((res) => {
            notify(1, "User family details updated succesfully")
            //   notify(1, "User Details Updated")
        }).catch((err) => {
            notify(0, "User family details not updated succesfully")
        })

    }
    return (
        <div>{/* FamilyInfo From */}
            <div className="row d-flex justify-content-center family_details_row mt-5">
                <div className="col-lg-10">
                    <h4 className='d-flex mb-4'>3. Update Family Information: </h4>
                    <form onSubmit={handleFamily} autoComplete="off">
                        <div className="row">
                            <div className="col-lg-6 d-flex mb-3">
                                <label htmlFor="fathers_name" style={{ color: "black", width: "40%", fontFamily: "familyFont" }}>Father's Name</label>
                                <input type="text" className='form-control' value={family.fathers_name} onChange={(e) => { setFamily({ ...family, fathers_name: e.target.value }) }} id="fathers_name" name="fathers_name" />
                            </div>

                            <div className="col-lg-6 d-flex mb-3">
                                <label htmlFor="fathers_occupation" style={{ color: "black", width: "30%", fontFamily: "familyFont", paddingTop: "1.7%" }}>Occupation</label>
                                <div className="btn-group me-2 fathers_occupation_group" value={family.fathers_occupation} onChange={(e) => { setFamily({ ...family, fathers_occupation: e.target.value }) }} role="group" aria-label="Second group">
                                    &nbsp;<input type="radio" name="fathers_occupation" value="Job" checked={family.fathers_occupation === 'Job' ? ('checked') : ('')} />&nbsp;<span style={{ marginTop: '2%', marginLeft: "1%" }}>Job&emsp;</span>
                                    &nbsp;<input type="radio" name="fathers_occupation" value="Business" checked={family.fathers_occupation === 'Business' ? ('checked') : ('')} />&nbsp;<span style={{ marginTop: '2%', marginLeft: "1%" }}>Business&emsp;</span>
                                    &nbsp;<input type="radio" name="fathers_occupation" value="Retired" checked={family.fathers_occupation === 'Retired' ? ('checked') : ('')} />&nbsp;<span style={{ marginTop: '2%', marginLeft: "1%" }}>Retired&emsp;</span>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-lg-6 d-flex mb-3">
                                <label htmlFor="mothers_name" style={{ color: "black", width: "40%", fontFamily: "familyFont" }}>Mother's Name</label>
                                <input type="text" className='form-control' value={family.mothers_name} onChange={(e) => { setFamily({ ...family, mothers_name: e.target.value }) }} id="mothers_name" name="mothers_name" />
                            </div>

                            <div className="col-lg-6 col-sm-12 d-flex mb-3">
                                <label htmlFor="mothers_occupation" style={{ color: "black", width: "30%", fontFamily: "familyFont", paddingTop: "1.7%" }}>Occupation</label>
                                <div className="btn-group me-2 mothers_occupation_group" value={family.mothers_occupation} onChange={(e) => { setFamily({ ...family, mothers_occupation: e.target.value }) }} role="group" aria-label="Second group">
                                    &nbsp;<input type="radio" name="mothers_occupation" value="Job" checked={family.mothers_occupation === 'Job' ? ('checked') : ('')} />&nbsp;<span style={{ marginTop: '2%', marginLeft: "1%" }}>Job&emsp;</span>
                                    &nbsp;<input type="radio" name="mothers_occupation" value="Business" checked={family.mothers_occupation === 'Business' ? ('checked') : ('')} />&nbsp;<span style={{ marginTop: '2%', marginLeft: "1%" }}>Business&emsp;</span>
                                    &nbsp;<input type="radio" name="mothers_occupation" value="Housewife" checked={family.mothers_occupation === 'Housewife' ? ('checked') : ('')} />&nbsp;<span style={{ marginTop: '2%', marginLeft: "1%" }}>Housewife&emsp;</span>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-lg-3 d-flex mb-4">
                                <label htmlFor="bother_select" style={{ color: "black" }}>Brothers&emsp;</label>
                                <select className="form-select form-select" value={family.bother_select} onChange={(e) => { setFamily({ ...family, bother_select: e.target.value }) }} name="bother_select">
                                    <option value="null">-- Please Select --</option>
                                    <option value="no">No</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="More than 2">More than 2</option>
                                </select>
                            </div>

                            <div className="col-lg-3 d-flex mb-4">
                                <label htmlFor="bother_status" style={{ color: "black" }}>Married&emsp;</label>
                                <select className="form-select form-select" name="bother_status" value={family.bother_status} onChange={(e) => { setFamily({ ...family, bother_status: e.target.value }) }} id="bother_status" aria-label=".form-select-sm example">
                                    <option value="null">--Select--</option>
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                </select>
                            </div>

                            <div className="col-lg-3 d-flex mb-4">
                                <label htmlFor="sister_select" style={{ color: "black" }}>Sisters&emsp;</label>
                                <select className="form-select form-select" value={family.sister_select} onChange={(e) => { setFamily({ ...family, sister_select: e.target.value }) }} name="sister_select" aria-label=".form-select-sm example">
                                    <option value="null">--Select--</option>
                                    <option value="no">No</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="More than 2">More than 2</option>
                                </select>
                            </div>

                            <div className="col-lg-3 d-flex mb-4">
                                <label htmlFor="sister_status" style={{ color: "black" }}>Married&emsp;</label>
                                <select className="form-select form-select" name="sister_status" value={family.sister_status} onChange={(e) => { setFamily({ ...family, sister_status: e.target.value }) }} aria-label=".form-select-sm example">
                                    <option value="null">--Select--</option>
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                </select>
                            </div>
                        </div>


                        <div className="row">
                            <div className="col-lg-12 d-flex mb-2">
                                <p>Property Details: </p>
                            </div>

                            <div className="col-lg-3 mb-4">
                                <select name="own_house" value={family.own_house} onChange={(e) => { setFamily({ ...family, own_house: e.target.value }) }} className="form-select form-select" aria-label=".form-select-sm example">
                                    <option selected>-- Own A House --</option>
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                </select>
                            </div>

                            <div className="col-lg-3 mb-4">
                                <select name="own_farm" value={family.own_farm} onChange={(e) => { setFamily({ ...family, own_farm: e.target.value }) }} className="form-select form-select" aria-label=".form-select-sm example">
                                    <option selected>-- Own A Farm --</option>
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                </select>
                            </div>

                            <div className="col-lg-3 mb-4">
                                <select name="own_plot" value={family.own_plot} onChange={(e) => { setFamily({ ...family, own_plot: e.target.value }) }} className="form-select form-select" aria-label=".form-select-sm example">
                                    <option selected>-- Own A Plot --</option>
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                </select>
                            </div>

                            <div className="col-lg-3 mb-4">
                                <select name="other_prop" value={family.other_prop} onChange={(e) => { setFamily({ ...family, other_prop: e.target.value }) }} className="form-select form-select" aria-label=".form-select-sm example">
                                    <option selected>-- Other Property --</option>
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                </select>
                            </div>

                        </div>
                        <div className="row mb-4">
                            <div className="col-lg-12">
                                <input type="submit" className='btn saveBtn' value="Update Family Details Now" />
                            </div>
                        </div>
                    </form>
                </div>
            </div >
            <hr className='w-50 m-auto' /></div>
    )
}

export default Updatefamily
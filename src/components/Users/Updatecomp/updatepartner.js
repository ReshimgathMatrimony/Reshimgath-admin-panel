import axios from "axios"
import React, { useEffect, useState } from "react"
import educational from "../../educationData.json"
import heightdata from "../../heightData.json"
import religion from "../../religionData.json"
import "react-toastify/dist/ReactToastify.css"
import { ToastContainer, toast } from "react-toastify"
import { MultiSelect } from "react-multi-select-component"
import educationPref from "../../educationPref.json"
import religionPref from "../../religionPref.json"
import statePref from "../../statePref.json"
import heightPref from "../../heightPref.json"

const Updatepartner = ({ email }) => {
  const notify = (p, msg) => (p ? toast.success(msg) : toast.error(msg))

  const [partner, setPartner] = useState({})

  //multiSelect states
  const [education, setEducation] = useState([])
  const [occupation, setOccupation] = useState([])
  const [salary, setSalary] = useState([])
  const [complexion, setComplexion] = useState([])
  const [height, setHeight] = useState([])
  const [religion, setReligion] = useState([])
  const [states, setStates] = useState([])
  const [cities, setCities] = useState([])
  const [getCities, setGetCities] = useState([])

  //options
  const occupationOptions = [
    { label: "IT Software", value: "IT Software" },
    { label: "Business", value: "Business" },
    { label: "Lawyer", value: "Lawyer" },
    { label: "Doctor", value: "Doctor" },
    { label: "Nurse", value: "Nurse" },
    { label: "Teacher", value: "Teacher" },
    { label: "CA/Accountant", value: "CA/Accountant" },
    { label: "Other", value: "Other" },
  ]

  const salaryOptions = [
    { label: "Below 1 Lakh", value: "Below 1 Lakh" },
    { label: "1 to 3 Lakh", value: "1 to 3 Lakh" },
    { label: "3 to 6 Lakh", value: "3 to 6 Lakh" },
    { label: "6 to 9 Lakh", value: "6 to 9 Lakh" },
    { label: "Above 9 Lakh", value: "Above 9 Lakh" },
  ]

  const complexionOptions = [
    { label: "Extremely Fair Skin", value: "Extremely Fair Skin" },
    { label: "Fair Skin", value: "Fair Skin" },
    { label: "Medium Skin", value: "Medium Skin" },
    { label: "Olive Skin", value: "Olive Skin" },
    { label: "Brown Skin", value: "Brown Skin" },
  ]

  //Separate label from values
  const educationValues = education.map((option) => option.value)
  const occupationValues = occupation.map((option) => option.value)
  const salaryValues = salary.map((option) => option.value)
  const complexionValues = complexion.map((option) => option.value)
  const heightValues = height.map((option) => option.value)
  const religionValues = religion.map((option) => option.value)
  const statesValues = states.map((option) => option.value)
  const cityValues = cities.map((option) => option.value)

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_BASEURL}/admincrud/getsinglepartnerprefrencenew?email=${email}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("accesstoken"),
          },
        }
      )
      .then((res) => {
        // setPartner(res.data)
        setEducation(
          res.data.education_pref.map((val, index) => {
            return { label: val, value: val }
          })
        )
        setOccupation(
          res.data.occupation_pref.map((val, index) => {
            return { label: val, value: val }
          })
        )
        setSalary(
          res.data.salary_pref.map((val, index) => {
            return { label: val, value: val }
          })
        )
        setComplexion(
          res.data.complexion_pref.map((val, index) => {
            return { label: val, value: val }
          })
        )
        setHeight(
          res.data.height_pref.map((val, index) => {
            return { label: val, value: val }
          })
        )
        setReligion(
          res.data.religion_pref.map((val, index) => {
            return { label: val, value: val }
          })
        )
        setStates(
          res.data.state_pref.map((val, index) => {
            return { label: val, value: val }
          })
        )
        setCities(
          res.data.location_pref.map((val, index) => {
            return { label: val, value: val }
          })
        )

        // console.log(res.data)
      })
      .catch((err) => {
        notify(0, "Something went wrong..!")
      })
  }, [])
  //   console.log(occupation)
  const handlePartner = (e) => {
    e.preventDefault()
    const formdata = new FormData(e.target)
    const data = Object.fromEntries(formdata.entries())
    const payLoad = {
      ...data,
      email,
      education_pref: educationValues,
      salary_pref: salaryValues,
      complexion_pref: complexionValues,
      height_pref: heightValues,
      religion_pref: religionValues,
      state_pref: statesValues,
      location_pref: cityValues,
      occupation_pref: occupationValues,
    }

    axios
      .post(
        `${process.env.REACT_APP_BASEURL}/admincrud/getpartnerprefrenceupdatenew`,
        payLoad,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("accesstoken"),
          },
        }
      )
      .then((res) => {
        notify(1, "User partner prefrence details updated succesfully")
      })
      .catch((err) => {
        notify(0, "Something went wrong..!")
      })
  }

  //fetch city name
  useEffect(() => {
    axios
      .get("https://api.countrystatecity.in/v1/countries/IN/cities", {
        headers: {
          "X-CSCAPI-KEY":
            "MGZMRlZLbkZ0SmNiOGkxQzBlREFLYjBKdlZZU1BnRmlRbGI3N2lvVg==",
        },
      })
      .then((res) => {
        setGetCities(res.data)
        // console.log(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const cityOption = getCities.map((option) => {
    return { label: option.name, value: option.name }
  })
  return (
    <div>
      {/* 4. Partner Preference */}
      <div className="row d-flex justify-content-center mt-4">
        <div className="col-lg-10">
          <h4 className="d-flex mb-4">
            4. Update Partner Preference Details:{" "}
          </h4>
          <form onSubmit={handlePartner} autoComplete="off">
            <div className="row">
              <div className="col-lg-4 mb-4">
                {/* <select
                  name="education_pref"
                  value={partner.education_pref}
                  onChange={(e) => {
                    setPartner({ ...partner, education_pref: e.target.value })
                  }}
                  className="form-select form-select"
                  aria-label=".form-select-sm example"
                >
                  <option value="" selected>
                    -- Education --
                  </option>

                  {educational.map((val, idx) => {
                    return (
                      <option value={val.education} key={idx}>
                        {val.education}
                      </option>
                    )
                  })}
                </select> */}
                <label>Education</label>
                <MultiSelect
                  name="education_pref"
                  options={educationPref}
                  value={education}
                  onChange={setEducation}
                />
              </div>

              <div className="col-lg-4 mb-4">
                {/* <select
                  name="occupation_pref"
                  value={partner.occupation_pref}
                  onChange={(e) => {
                    setPartner({ ...partner, occupation_pref: e.target.value })
                  }}
                  className="form-select form-select"
                  aria-label=".form-select-sm example"
                >
                  <option value="" selected>
                    -- Occupation --
                  </option>
                  <option value="NA">N/A</option>
                  <option value="IT Software">IT Software</option>
                  <option value="Business">Business</option>
                  <option value="Lawyer">Lawyer</option>
                  <option value="Doctor">Doctor</option>
                  <option value="Nurse">Nurse</option>
                  <option value="Teacher">Teacher</option>
                  <option value="CA/Accountant">CA/Accountant</option>
                  <option value="Other">Other</option>
                </select> */}
                <label>Occupation</label>
                <MultiSelect
                  name="occupation_pref"
                  options={occupationOptions}
                  value={occupation}
                  onChange={setOccupation}
                />
              </div>

              <div className="col-lg-4 mb-4">
                {/* <select
                  name="salary_pref"
                  value={partner.salary_pref}
                  onChange={(e) => {
                    setPartner({ ...partner, salary_pref: e.target.value })
                  }}
                  className="form-select form-select"
                  aria-label=".form-select-sm example"
                >
                  <option valuee="" selected>
                    -- Salary / Annual Package --
                  </option>
                  <option value="NA">N/A</option>
                  <option value="Below 1 Lack">Below 1 Lack</option>
                  <option value="1 to 3 Lack">1 to 3 Lack</option>
                  <option value="3 to 6 Lack">3 to 6 Lack</option>
                  <option value="6 to 9 Lack">6 to 9 Lack</option>
                  <option value="Above 9 Lack">Above 9 Lack</option>
                </select> */}
                <label>Salary/ Annual Package</label>
                <MultiSelect
                  name="salary_pref"
                  options={salaryOptions}
                  value={salary}
                  onChange={setSalary}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-lg-4 mb-4">
                {/* <select
                  name="complexion_pref"
                  value={partner.complexion_pref}
                  onChange={(e) => {
                    setPartner({ ...partner, complexion_pref: e.target.value })
                  }}
                  className="form-select form-select"
                  aria-label=".form-select-sm example"
                >
                  <option value="" selected>
                    -- Complexion --
                  </option>
                  <option value="Extremely fair skin">
                    Extremely Fair Skin
                  </option>
                  <option value="Fair Skin">Fair Skin</option>
                  <option value="Medium Skin">Medium Skin</option>
                  <option value="Olive Skin">Olive Skin</option>
                  <option value="Brown Skin">Brown Skin</option>
                </select> */}
                <label>Complexion</label>
                <MultiSelect
                  name="complexion_pref"
                  options={complexionOptions}
                  value={complexion}
                  onChange={setComplexion}
                />
              </div>

              <div className="col-lg-4 mb-4">
                {/* <select
                  name="height_pref"
                  value={partner.height_pref}
                  onChange={(e) => {
                    setPartner({ ...partner, height_pref: e.target.value })
                  }}
                  className="form-select form-select"
                  aria-label=".form-select-sm example"
                >
                  <option value="" selected>
                    -- Height --
                  </option>
                  {heightdata?.map((val, index) => {
                    return (
                      <option value={val.height}>
                        {val.height.split(".").map((value, indx) => {
                          return <h1>{value + `${indx === 0 ? "'" : '"'}`}</h1>
                        })}
                      </option>
                    )
                  })}
                </select> */}
                <label>Height</label>
                <MultiSelect
                  name="height_pref"
                  options={heightPref}
                  value={height}
                  onChange={setHeight}
                />
              </div>

              <div className="col-lg-4 mb-4">
                {/* <select
                  name="religion_pref"
                  value={partner.religion_pref}
                  onChange={(e) => {
                    setPartner({ ...partner, religion_pref: e.target.value })
                  }}
                  className="form-select form-select"
                  aria-label=".form-select-sm example"
                >
                  <option value="" selected>
                    -- Religon --
                  </option>
                  {religion?.map((val, id) => {
                    return (
                      <option
                        key={id}
                        value={val.religion}
                        selected={
                          val.religion === partner.caste ? "selected" : ""
                        }
                      >
                        {val.religion}
                      </option>
                    )
                  })}
                </select> */}
                <label>Religion</label>
                <MultiSelect
                  name="religion_pref"
                  options={religionPref}
                  value={religion}
                  onChange={setReligion}
                />
              </div>
            </div>

            <div className="row">
              {/* <div className="col-lg-4 mb-4">
                <input
                  type="text"
                  name="caste_pref"
                  value={partner.caste_pref}
                  onChange={(e) => {
                    setPartner({ ...partner, caste_pref: e.target.value })
                  }}
                  className="form-control"
                  placeholder="Caste Prefrence"
                />
              </div> */}

              <div className="col-lg-4 mb-4">
                {/* <input
                  type="text"
                  name="state_pref"
                  value={partner.state_pref}
                  onChange={(e) => {
                    setPartner({ ...partner, state_pref: e.target.value })
                  }}
                  className="form-control"
                  placeholder="State Prefrence"
                /> */}
                <label>State</label>
                <MultiSelect
                  name="state_pref"
                  options={statePref}
                  value={states}
                  onChange={setStates}
                />
              </div>
              <div className="col-lg-4 mb-4">
                {/* <input
                  type="text"
                  name="location_pref"
                  value={partner.location_pref}
                  onChange={(e) => {
                    setPartner({ ...partner, location_pref: e.target.value })
                  }}
                  className="form-control"
                  placeholder="Location Prefrence"
                /> */}
                <label>Location</label>
                <MultiSelect
                  name="location_pref"
                  options={cityOption}
                  value={cities}
                  onChange={setCities}
                />
              </div>
            </div>
            <div className="row mb-4">
              <div className="col-lg-12">
                <input
                  type="submit"
                  className="btn saveBtn"
                  value="Update Partner Preference Details Now"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
      <hr className="w-50 m-auto" />
    </div>
  )
}

export default Updatepartner

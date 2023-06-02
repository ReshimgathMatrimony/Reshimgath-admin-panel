import './App.css';
import { useState } from 'react';
import LoginForm from './components/Auth/LoginForm';
import Sidebar from './components/Sidebar';
import { Routes, Route } from 'react-router-dom';
import AdminDetails from './components/Admin/AdminDetails';
import Users from './components/Users/Users';
import SuccessStories from './components/Succsess/SuccessStories';
import PlanDetails from './components/Plans/PlanDetails';
import RechargeUser from './components/Users/RechargeUser';
import AddProfile from './components/Users/AddProfile';
import SendEmail from './components/Sendmails/SendEmail';
import CustomerQueries from './components/Queries/CustomerQueries';
import Createadmin from './components/Admin/Createadmin';
import Updateuser from './components/Users/Updateuser';
import Successcreate from './components/Succsess/Successcreate';
import Successupdate from './components/Succsess/Successupdate';
import Createplan from './components/Plans/Createplan';
import Updateplan from './components/Plans/Updateplan';
import Unpaiduser from './components/Unpaiduser';
import Dashboard from './components/Dashboard'
import Logout from './components/Auth/Logout';
import RechargeHistory from './components/Plans/RechargeHistory';

function App() {
    // const [loggedin, setLoggedin] = useState(false);

    return (
        <div className="App">
            <div>
                {

                    <div className='container-fluid'>
                        <div className="row">
                            <Routes>

                                <Route path="/" index element={<Dashboard />} />

                                {/*Routes for admin section */}
                                < Route path="/admin" element={<AdminDetails />} />
                                <Route path='/createadmin' element={<Createadmin />} />

                                {/* Routes for users */}
                                <Route path="/users" element={<Users />} />
                                <Route path="/addprofile" element={<AddProfile />} />
                                <Route path="/rechargeuser" element={<RechargeUser />} />
                                <Route path="/updateuser" element={<Updateuser />} />

                                {/* Routes for Success */}
                                <Route path="/successstories" element={<SuccessStories />} />
                                <Route path="/successcreate" element={<Successcreate />} />
                                <Route path="/successupdate" element={<Successupdate />} />

                                {/* Routes for Plans */}
                                <Route path="/plandetails" element={<PlanDetails />} />
                                <Route path="/createplan" element={<Createplan />} />
                                <Route path="/updateplan" element={<Updateplan />} />
                                <Route path="/rechargedone" element={<RechargeHistory />} />


                                {/* Routes for sendmails */}
                                <Route path="/sendemails" element={<SendEmail />} />

                                {/*Routes for Queries  */}
                                <Route path="/customerqueries" element={<CustomerQueries />} />

                                {/* Routes for Auth */}
                                <Route path='/login' element={<LoginForm />} />
                                <Route path='/logout' element={<Logout />} />

                                <Route path="/unpaiduser" element={<Unpaiduser />} />
                            </Routes>

                        </div>
                    </div>
                }

            </div>

        </div>
    );
}

export default App;

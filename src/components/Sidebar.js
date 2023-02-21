import React from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';


const Sidebar = () => {
  return (
    <>
      <nav className='navbar navbar-expand-lg d-flex flex-column' id='sidebar'>
        <div className='navbar-brand text-light mt-5 sidebar_brand'>
          <h3>Reshimgath Admin </h3>
        </div>
        <div className='row'>
          <ul className='navbar-nav d-flex flex-column'>
            <li className='nav-item w-100'>
              <Link to='/' className='nav-link active text-dark '>Dashboard</Link>
            </li>
            <li className='nav-item w-100'>
              <Link to='/admin' className='nav-link active text-dark mt-3'>Admin Details</Link>
            </li>
            <li className='nav-item w-100'>
              <Link to='/users' className='nav-link text-dark  mt-3'>All Users</Link>
            </li>
            <li className='nav-item w-100'>
              <Link to='/rechargedone' className='nav-link text-dark  mt-3'>Recharge History</Link>
            </li>
            <li className='nav-item w-100'>
              <Link to='/successstories' className='nav-link text-dark  mt-3'>Success Stories</Link>
            </li>
            <li className='nav-item w-100'>
              <Link to='/plandetails' className='nav-link text-dark mt-3'>Plan Details</Link>
            </li>
            {/* <li className='nav-item w-100'>
              <Link to='/sendemails' className='nav-link text-dark mt-3'>Send Emails</Link>
            </li> */}
            <li className='nav-item w-100'>
              <Link to='/customerqueries' className='nav-link text-dark mt-3'>Customer Queries</Link>
            </li>

            <li className='nav-item w-100 mt-4'>
              <Link to='https://ishadigital.com' target="_blank" className='text-white text-decoration-none'>Designed & Developed By Isha Business Solution</Link>
            </li>
          </ul>
        </div>
      </nav>

    </>
  )
}

export default Sidebar;
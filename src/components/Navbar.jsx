import React from 'react'
import "./Navbar.css"
const Navbar = () => {
    return (
        <nav>
            <div className='navbar'>
                <div className="opac-nav"></div>
                <div className="logo-sec">
                    <img src="/logo.png" alt="logo" />
                    <h1>Weather Hub</h1>
                </div>
            </div>
        </nav>
    )
}

export default Navbar

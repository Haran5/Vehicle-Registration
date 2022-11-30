import React from 'react'
import '../Components/Navbar.css'


function Navbar({open}) {
  return (
    <header>
        <nav>
            <div className="nav_logo">
                <h1>Vehicle Registration</h1>
            </div>

            <div className="button">
                <button className='model' onClick={open}>Add User</button> 
            </div>
        </nav>
    </header>
  ) 
}

export default Navbar
import React from 'react'

import {Link} from "react-router-dom";

function Navbar(){
    return(
        <nav className="navbar navbar-expand-lg navbar-light navbar-color shadow sticky-top">
            <div className="container">

                <Link className='navbar-brand' to='/home'>Blogging</Link>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarText">

                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <Link className="nav-link" to='/home'>Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to='/follower-profile'>follower profile</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to='/user-profile'>user profile</Link>
                    </li>
                </ul>

                <span className="navbar-text">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item"><Link to='/login'>login</Link></li>
                        <li className="nav-item"><Link to='/logout'>logout</Link></li>
                    </ul>
                </span>

                </div>
            </div>
        </nav>


    )
}

export default Navbar
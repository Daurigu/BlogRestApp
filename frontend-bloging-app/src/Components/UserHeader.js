import React from 'react'

import {
    Link,
  } from "react-router-dom";

function UserHeader(props){
    let profileType
    if (props.profile === 'user'){
        profileType = 'user-profile'
    }else{
        profileType = 'follower-profile'
    }

    return(
        <div>
                    <div className='row'>
                        <div className='col'></div>
                            <img className='col rounded-circle img-fluid img-height' src='https://letstalkscience.ca/sites/default/files/styles/x_large/public/2020-03/Cow.jpg?itok=iGJw1FHC' alt=''/>
                        <div className='col'></div>
                    </div>

                    <div className="row mt-3">
                        <h3 className='text-center'>Username</h3>
                    </div>
                    
                    <div className="row mt-3">
                        <p className='text-center'>bio</p>
                    </div>
                    
                    <div className='row mt-3'>
                        <Link to={`/${profileType}/posts`} className='col'>
                            <svg xmlns='http://www.w3.org/2000/svg' width='30' height='30' fill='currentColor' className='center-svg bi bi-card-heading' viewBox='0 0 16 16'>
                                <path d='M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z'/>
                                <path d='M3 8.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5zm0-5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5v-1z'/>
                            </svg>
                            <p className='text-center'>posts</p>
                        </Link>
                        <Link to={`/${profileType}/following`} className='col mx-auto'>
                            <svg xmlns='http://www.w3.org/2000/svg' width='30' height='30' fill='currentColor' className='center-svg bi bi-journal-arrow-up' viewBox='0 0 16 16'>
                                <path fillRule='evenodd' d='M8 11a.5.5 0 0 0 .5-.5V6.707l1.146 1.147a.5.5 0 0 0 .708-.708l-2-2a.5.5 0 0 0-.708 0l-2 2a.5.5 0 1 0 .708.708L7.5 6.707V10.5a.5.5 0 0 0 .5.5z'/>
                                <path d='M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z'/>
                                <path d='M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z'/>
                            </svg>
                            <p className='text-center'>followers</p>
                        </Link>
                        <Link to={`/${profileType}/followers`} className='col'>
                            <svg xmlns='http://www.w3.org/2000/svg' width='30' height='30' fill='currentColor' className='center-svg bi bi-journal-arrow-down' viewBox='0 0 16 16'>
                                <path fillRule='evenodd' d='M8 5a.5.5 0 0 1 .5.5v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 1 1 .708-.708L7.5 9.293V5.5A.5.5 0 0 1 8 5z'/>
                                <path d='M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z'/>
                                <path d='M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z'/>
                            </svg>
                            <p className='text-center'>following</p>
                        </Link>
                    </div>
        </div>
    )
}

export default UserHeader
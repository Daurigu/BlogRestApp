import React,{useState, useEffect} from 'react'

import {Link} from "react-router-dom";
import axios from 'axios'

import getCookie from '../Components/getCookie'

function ProfileCard(){
    const [profile, setProfile] = useState({
        "user": "",
        "profile": {
            "name": "",
            "profile_pic": "https://letstalkscience.ca/sites/default/files/styles/x_large/public/2020-03/Cow.jpg?itok=iGJw1FHC",
            "email": "",
            "about": ""
        }
    })


    useEffect(()=>{

        axios({
            method: 'get',
            url: 'http://127.0.0.1:8000/api/user/profile',
            headers: {
                'X-CSRFToken': getCookie('csrftoken'),
                'content-type': 'application/json' 
            }
        }).then( response=>{
            setProfile(response.data)
        } 
        ).catch(e=>{
            console.log(e)
        })

    },[])
    

    return(
        <div className='rounded shadow-sm p-3 bg-white'>
            <div className='row'>
                <div className='col'></div>
                <div className='col'>
                    <Link to='/user-profile'>
                        <img className='rounded-circle img-fluid img-thumbnail img-height' src={profile.profile.profile_pic} alt=''/>
                    </Link> 
                </div>
                <div className='col'></div>
            </div>

            <div className='row'>
                <div className='col'>
                    <Link to='/user-profile'>
                        <h4 className='text-center'>{profile.user}</h4>
                    </Link> 
                </div>
            </div>

            <div className='row mt-3'>
            <Link to='user-profile' className='col'>
                    <svg xmlns='http://www.w3.org/2000/svg' width='30' height='30' fill='currentColor' className='center-svg bi bi-card-heading' viewBox='0 0 16 16'>
                        <path d='M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z'/>
                        <path d='M3 8.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5zm0-5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5v-1z'/>
                    </svg>
                    <p className='text-center'>Posts</p>
                </Link>

            </div>

        


        </div>
    )
}

export default ProfileCard
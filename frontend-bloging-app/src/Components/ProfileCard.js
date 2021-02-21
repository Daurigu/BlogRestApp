import React,{useState, useEffect} from 'react'

import {/*
    BrowserRouter as Router,
    Switch,
    Route,*/
    Link,
  } from "react-router-dom";

import axios from 'axios'

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

    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

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
        <div className='rounded shadow p-3'>
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
                <Link to='user-profile/following' className='col mx-auto'>
                    <svg xmlns='http://www.w3.org/2000/svg' width='30' height='30' fill='currentColor' className='center-svg bi bi-journal-arrow-up' viewBox='0 0 16 16'>
                        <path fillRule='evenodd' d='M8 11a.5.5 0 0 0 .5-.5V6.707l1.146 1.147a.5.5 0 0 0 .708-.708l-2-2a.5.5 0 0 0-.708 0l-2 2a.5.5 0 1 0 .708.708L7.5 6.707V10.5a.5.5 0 0 0 .5.5z'/>
                        <path d='M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z'/>
                        <path d='M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z'/>
                    </svg>
                    <p className='text-center'>Following</p>
                </Link>
                <Link to='user-profile/followers' className='col'>
                    <svg xmlns='http://www.w3.org/2000/svg' width='30' height='30' fill='currentColor' className='center-svg bi bi-journal-arrow-down' viewBox='0 0 16 16'>
                        <path fillRule='evenodd' d='M8 5a.5.5 0 0 1 .5.5v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 1 1 .708-.708L7.5 9.293V5.5A.5.5 0 0 1 8 5z'/>
                        <path d='M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z'/>
                        <path d='M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z'/>
                    </svg>
                    <p className='text-center'>Followers</p>
                </Link>
            </div>

        


        </div>
    )
}

export default ProfileCard
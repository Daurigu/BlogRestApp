import React,{useState, useEffect} from 'react'

import {Link} from "react-router-dom";
import axios from 'axios'

import getCookie from '../Components/getCookie'

function UserHeader(props){
    let profileType
    let data = props.data

    const [following, setFollowing] = useState()
    const [follButton, setFollButton] = useState('')

    useEffect(()=>{
        axios({
            method: 'get',
            url: 'http://127.0.0.1:8000/api/user/following',
            headers:{
                'x-csrftoken': getCookie('csrftoken'),
                'content-type': 'application/json'
            }
        }).then(response=>{
            setFollowing(response.data.following)
        }).catch(e=>{
            console.log(e)
        })
    },[])
    


    let unfollow = ()=>{
        axios({
            method: 'post',
            url: 'http://127.0.0.1:8000/api/user/unfollow',
            headers: {
                'X-CSRFToken': getCookie('csrftoken'),
                'content-type': 'application/json' 
            },
            data: {
                'unfollow': data.username
            }
        }).then(response=>{
            console.log(response)
        }).catch(e=>{
            console.log(e)
        })
    }

    let follow = (e)=>{
        e.preventDefault();
        axios({
            method: 'post',
            url: 'http://127.0.0.1:8000/api/user/follow',
            headers: {
                'X-CSRFToken': getCookie('csrftoken'),
                'content-type': 'application/json' 
            },
            data: {
                'follow': data.username
            }
        }).then(response=>{
            if(response.data.error === 'You already follow that user'){
                unfollow()
            }
        }).catch(e=>{
            console.log(e)
        })
    }

    let followButton =
    <a href='' onClick={()=>follow} className='col'>
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className='center-svg bi bi-journal-arrow-down' viewBox="0 0 16 16">
            <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
            <path fill-rule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"/>
        </svg>
        <p className='text-center'>Follow</p>
    </a>
    

    if (following){
        for(let element= 0; element<following.length; element++){
            if(following[element].username === data.username){
                followButton =
                <a href='' onClick={()=>follow} className='col'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="center-svg bi bi-person-dash" viewBox="0 0 16 16">
                        <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                        <path fill-rule="evenodd" d="M11 7.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5z"/>
                    </svg>
                    <p className='text-center'>Unfollow</p>
                </a>
            }
        }
    }

    if (props.profile === 'user'){
        profileType = 'user-profile'
        followButton = ''
    }else{
        profileType = `follower-profile/${props.user}`
    }

    useEffect(()=>{
        setFollButton(followButton)
    },[follButton])


    return(
        <div>
            <div className='row'>
                <div className='col'></div>
                    <img className='col rounded-circle img-fluid img-height' src={data.profile_pic} alt=''/>
                <div className='col'></div>
            </div>

            <div className="row mt-3">
                <h3 className='text-center'>{data.name}</h3>
            </div>
            
            <div className="row mt-3">
                <p className='text-center'>{data.about}</p>
            </div>
            
            <div className='row mt-3'>
                <Link to={`/${profileType}`} className='col'>
                    <svg xmlns='http://www.w3.org/2000/svg' width='30' height='30' fill='currentColor' className='center-svg bi bi-card-heading' viewBox='0 0 16 16'>
                        <path d='M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z'/>
                        <path d='M3 8.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5zm0-5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5v-1z'/>
                    </svg>
                    <p className='text-center'>Posts</p>
                </Link>
                <Link to={`/${profileType}/following`} className='col mx-auto'>
                    <svg xmlns='http://www.w3.org/2000/svg' width='30' height='30' fill='currentColor' className='center-svg bi bi-journal-arrow-up' viewBox='0 0 16 16'>
                        <path fillRule='evenodd' d='M8 11a.5.5 0 0 0 .5-.5V6.707l1.146 1.147a.5.5 0 0 0 .708-.708l-2-2a.5.5 0 0 0-.708 0l-2 2a.5.5 0 1 0 .708.708L7.5 6.707V10.5a.5.5 0 0 0 .5.5z'/>
                        <path d='M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z'/>
                        <path d='M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z'/>
                    </svg>
                    <p className='text-center'>Following</p>
                </Link>
                <Link to={`/${profileType}/followers`} className='col'>
                    <svg xmlns='http://www.w3.org/2000/svg' width='30' height='30' fill='currentColor' className='center-svg bi bi-journal-arrow-down' viewBox='0 0 16 16'>
                        <path fillRule='evenodd' d='M8 5a.5.5 0 0 1 .5.5v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 1 1 .708-.708L7.5 9.293V5.5A.5.5 0 0 1 8 5z'/>
                        <path d='M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z'/>
                        <path d='M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z'/>
                    </svg>
                    <p className='text-center'>Followers</p>
                </Link>
                {follButton}
            </div>
        </div>
    )
}

export default UserHeader
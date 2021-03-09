import React, { useEffect, useState } from 'react'

import Posts from '../Components/posts'
import PostSection from '../Components/PostSection'
import UserHeader from '../Components/UserHeader'
import getCookie from '../Components/getCookie'
import UserCard from '../Components/userCard'
import EditPost from './EditPost'

import axios from 'axios'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
  } from "react-router-dom";


function UserProfile(){
    const [posts, setPosts] = useState()
    const [following, setFollowing] = useState()
    const [follower, setFollower] = useState()
    const [profile, setProfile] = useState({
        "name": "",
        "profile_pic": "",
        "email": "",
        "about": ""
    })
    
    let showPosts = 'Loading...'
    let showFollowing = 'Loading...'
    let showFollower = 'Loading...'

    useEffect(()=>{

        // My Posts
        axios({
            method: 'get',
            url: 'http://127.0.0.1:8000/api/post/mine',
            headers:{
                'x-csrftoken': getCookie('csrftoken'),
                'content-type': 'application/json'
            }
        }).then(response=>{
            setPosts(response.data.data)
        }).catch(e=>{
            console.log(e)
        })

        // -- My Profile
        axios({
            method: 'get',
            url: 'http://127.0.0.1:8000/api/user/profile',
            headers:{
                'x-csrftoken': getCookie('csrftoken'),
                'content-type': 'application/json'
            }
        }).then(response=>{
            setProfile(response.data.profile)
        }).catch(e=>{
            console.log(e)
        })

        // Following people
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

        // -- Followers
        axios({
            method: 'get',
            url: 'http://127.0.0.1:8000/api/user/follower',
            headers:{
                'x-csrftoken': getCookie('csrftoken'),
                'content-type': 'application/json'
            }
        }).then(response=>{
            setFollower(response.data.follower)
        }).catch(e=>{
            console.log(e)
        })

    },[])

    if (posts){
        showPosts = posts.map((element)=>{
            return <Posts post={element} type='user'/>
        })
    }

    if(following){
        showFollowing = following.map(element=>{
            return <UserCard data={element}/>
        })
    }

    if(follower){
        showFollower = follower.map(element=>{
            return <UserCard data={element}/>
        })
    }


    return(
        <div className='container '>
            <div className="row">

                <div className="col-4 col-lg-3 pt-5">
                    <div className="rounded shadow-sm p-1 m2 bg-white">
                        <h4 className='text-center'>Quick Post</h4>
                        <PostSection />
                    </div>
                </div>

                <div className="col-8 col-lg-6 pt-5 mt-5 shadow-sm rounded bg-white">

                <div className="row justify-content-end">
                    <Link to='/edit-profile' className='col-1 btn'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5L13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175l-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                            </svg>
                    </Link> 
                    <div className="col-1"></div>
                </div>
                
                <Router>
                    <UserHeader profile='user' data={profile}/>               
                    
                    <Switch>
                        <Route exact path='/user-profile'>
                            {showPosts}
                        </ Route>
                        <Route exact path='/user-profile/following'>
                            {showFollowing}
                        </ Route>
                        <Route exact path='/user-profile/followers' >
                            {showFollower}
                        </ Route>
                        <Route exact path='/edit-post/:slug' >
                            <EditPost />
                        </Route>
                        
                    </Switch>
                </Router>


                </div>
                <div className="col-0 col-lg-3"></div>
            </div>
        </div>
    )
}

export default UserProfile



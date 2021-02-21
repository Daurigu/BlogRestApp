import React, { useEffect, useState } from 'react'

import Posts from '../Components/posts'
import PostSection from '../Components/PostSection'
import UserHeader from '../Components/UserHeader'
import getCookie from '../Components/getCookie'
import UserCard from '../Components/userCard'

import axios from 'axios'
import {
    BrowserRouter as Router,
    Switch,
    Route,
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
            return <Posts post={element}/>
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
                    <div className="rounded border p-1 m2">
                        <h4 className='text-center'>Quick Post</h4>
                        <PostSection />
                    </div>
                </div>

                <div className="col-8 col-lg-6 pt-5 mt-5 border rounded">
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
                    </Switch>

                </Router>

                </div>
                <div className="col-0 col-lg-3"></div>
            </div>
        </div>
    )
}

export default UserProfile



import React, {useEffect, useState} from 'react'

import Posts from '../Components/posts'
import UserHeader from '../Components/UserHeader'
import getCookie from '../Components/getCookie'
import UserCard from '../Components/userCard'

import axios from 'axios'

import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";


function FollowerProfile(){

    const [slugLink, setSlug] = useState(window.location.pathname.split('/'))
    
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
    let showProfile = 'Loading...'

    useEffect(()=>{

        var pathArray = window.location.pathname.split('/')
        setSlug(pathArray)

        // My Posts
        axios({
            method: 'get',
            url: `http://127.0.0.1:8000/api/post/user/${slugLink[2]}`,
            headers:{
                'x-csrftoken': getCookie('csrftoken'),
                'content-type': 'application/json'
            }
        }).then(response=>{
            setPosts(response.data.data)
        }).catch(e=>{
            console.log(e)
        })

        // -- User Profile
        axios({
            method: 'get',
            url: `http://127.0.0.1:8000/api/user/profile/${slugLink[2]}`,
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
            url: `http://127.0.0.1:8000/api/user/following/${slugLink[2]}`,
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
            url: `http://127.0.0.1:8000/api/user/follower/${slugLink[2]}`,
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

    if(profile){
        showProfile = <UserHeader data={profile} user={slugLink[2]}/>
    }

    let pathFollowing = /\/(follower-profile)\/.*\/(following)/
    let pathFollower = /\/(follower-profile)\/.*\/(followers)/

    return(
        <div className='container '>
            <div className="row">

                <div className="col-4 col-lg-3 pt-5">
                </div>

                <div className="col-8 col-lg-6 pt-5 mt-5 shadow-sm bg-white rounded">
                <Router>
                    {showProfile}
                    <Switch>
                        <Route exact path='/follower-profile/:slug'>
                            {showPosts}
                        </ Route>
                        <Route exact path={pathFollowing}>
                            {showFollowing}
                        </ Route>
                        <Route exact path={pathFollower} >
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

export default FollowerProfile



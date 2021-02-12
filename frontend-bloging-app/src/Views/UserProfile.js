import React from 'react'

import Posts from '../Components/posts'
import PostSection from '../Components/PostSection'
import UserHeader from '../Components/UserHeader'

import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";


function UserProfile(){
    return(
        <div className='container '>
            <div className="row">

                <div className="col-4 col-lg-3 pt-5">
                    <div className="rounded border p-1 m2">
                        <h4 className='text-center'>Quick Post</h4>
                        <PostSection profile='user'/>
                    </div>
                </div>

                <div className="col-8 col-lg-6 pt-5 mt-5 border rounded">
                <Router>    
                    <UserHeader/>               

                    <Switch>
                        <Route exact path='/user-profile'>
                            <Posts/>
                        </ Route>
                        <Route exact path='/user-profile/posts'>
                            <Posts/>
                        </ Route>
                        <Route exact path='/user-profile/following'>
                            <h1>following</h1>
                        </ Route>
                        <Route exact path='/user-profile/followers' >
                            <h1>Follower</h1>
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



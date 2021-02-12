import React from 'react'

import Posts from '../Components/posts'
import UserHeader from '../Components/UserHeader'

import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";


function FollowerProfile(){


    return(
        <div className='container '>
            <div className="row">

                <div className="col-4 col-lg-3 pt-5">
                </div>

                <div className="col-8 col-lg-6 pt-5 mt-5 border rounded">
                <Router>
                    <UserHeader/>

                    <Switch>
                        <Route exact path='/follower-profile'>
                            <Posts/>
                        </ Route>
                        <Route exact path='/follower-profile/posts'>
                            <Posts/>
                        </ Route>
                        <Route exact path='/follower-profile/following'>
                            <h1>following</h1>
                        </ Route>
                        <Route exact path='/follower-profile/followers' >
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

export default FollowerProfile



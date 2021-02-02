import React from 'react'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Navbar from './Views/Navbar'
import Login from './Views/Login'
import Logout from './Views/Logout'
import FollowerProfile from './Views/FollowerProfile'
import Feed from './Views/Feed'
import UserProfile from './Views/UserProfile'



function App() {
  return (
    <Router>

      <Navbar />

      <Switch>
        <Route exact path='/' component={Login} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/logout' component={Logout} />
        <Route exact path='/home' component={Feed} />
        <Route exact path='/follower-profile' component={FollowerProfile} />
        <Route exact path='/user-profile' component={UserProfile} />
      </Switch>

    </Router>
  );
}

export default App;

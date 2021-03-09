import React from 'react'

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Navbar from './Views/Navbar'
import Logout from './Views/Logout'
import FollowerProfile from './Views/FollowerProfile'
import Feed from './Views/Feed'
import UserProfile from './Views/UserProfile'
import Register from './Views/Register'
import WelcomePage from './Views/WelcomePage';
import EditProfile from './Views/EditProfile'
import EditPost from './Views/EditPost'



function App() {
  return (
    <Router>

      <Navbar />

      <Switch>
        <Route exact path='/' component={WelcomePage} />
        <Route exact path='/login' component={WelcomePage} />
        <Route exact path='/logout' component={Logout} />
        <Route exact path='/home' component={Feed} />
        <Route exact path='/follower-profile/:slug' component={FollowerProfile} />
        <Route exact path='/user-profile' component={UserProfile} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/edit-profile' component={EditProfile} />
        <Route exact path='/edit-post/:slug' component={EditPost} />
      </Switch>

    </Router>
  );
}

export default App;

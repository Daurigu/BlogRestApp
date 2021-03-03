import React, {useState, useEffect} from 'react'

import axios from 'axios'
import getCookie from '../Components/getCookie'

function Login(){
  axios.defaults.xsrfCookieName = 'csrftoken'
  axios.defaults.xsrfHeaderName = 'X-CSRFToken'

    const [user, setUser] = useState({username: '', password: '',})
    const [csrftoken, setCsrftoken] = useState()

    useEffect( ()=>{
      axios({
        method: 'get',
        url: 'http://127.0.0.1:8000/api/user/csrf',
        headers: { 
          'X-CSRFToken': 'Request => Cookie',
          'Content-Type': 'application/json',
        },
        withCredentials: true,
        
      }).then( m=>{
        console.log(m)
        setCsrftoken(getCookie('csrftoken'))
      }).catch( e=>{
        console.log(e)
      })
    }, [])


    //-------------------
    //- - - Send - - - 
    //-------------------

    const sendRequest = (e) =>{
      e.preventDefault();

      var headers = { 
        'X-CSRFToken': csrftoken, 
        'Content-Type': 'application/json', 
        'Cookie': String(document.cookie)
      }

      var config = {
        method: 'post',
        url: 'http://127.0.0.1:8000/api/user/login',
        headers: headers,
        credentials: 'same-origin',
        data : user
      };
      
      axios(config)
      .then(function (response) {
        window.location.href = '/home'
      })
      .catch(function (error) {
        console.log(error)
      });
      
    }

    let handleUsername = (event) =>{
        event.persist();
        setUser((values) => ({
            ...values,
            username: event.target.value,
        }));
    }

    let handlePassword = (event) =>{
        event.persist();
        setUser((values) => ({
            ...values,
            password: event.target.value,
        }));
    }


    return(
        <div className='row'>
            <form className='mt-5 align-self-center'>
                <input name="csrfmiddlewaretoken" type="hidden" value={csrftoken? csrftoken:''} id="csrf" ic-global-include="#csrf"/>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Username</label>
                    <input type="text" onChange ={handleUsername} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" onChange ={handlePassword} className="form-control" id="exampleInputPassword1"/>
                </div>
                <div className='row justify-content-center'>
                  <button type="submit" onClick={sendRequest} className="btn btn-outline-success col-9">Login</button>
                </div>
            </form>
        </div>
    )
}

export default Login
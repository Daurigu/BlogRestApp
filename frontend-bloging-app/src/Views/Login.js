import React, {useState, useEffect} from 'react'

import axios from 'axios'

function Login(){
  axios.defaults.xsrfCookieName = 'csrftoken'
  axios.defaults.xsrfHeaderName = 'X-CSRFToken'

    const [user, setUser] = useState({username: '', password: '',})
    const [csrftoken, setCsrftoken] = useState()

    let getCsrfToken = () =>{
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
    }


    useEffect( ()=>{
      getCsrfToken()
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

      console.log(' --- --- Headers --- ---')
      console.log(headers)

      var config = {
        method: 'post',
        url: 'http://127.0.0.1:8000/api/user/login',
        headers: headers,
        credentials: 'same-origin',
        data : user
      };
      
      axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
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
        <div className='row '>
            <div className="col-3">.</div>
            <form className='col-6 mt-5 align-self-center'>
                <input name="csrfmiddlewaretoken" type="hidden" value={csrftoken? csrftoken:''} id="csrf" ic-global-include="#csrf"/>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Username</label>
                    <input type="text" onChange ={handleUsername} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" onChange ={handlePassword} className="form-control" id="exampleInputPassword1"/>
                </div>
                <div onClick={sendRequest} className="btn btn_success">Submit</div>
                <div onClick={getCsrfToken} className="btn btn_success">CSRF</div>
                <button type="submit" onClick={sendRequest} className="btn btn-primary">Submit</button>
            </form>
            <div className="col-3">.</div>
        <p>{document.cookie}</p>
        <p>{csrftoken}</p>
        </div>
    )
}

export default Login
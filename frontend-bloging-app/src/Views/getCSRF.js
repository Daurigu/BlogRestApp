import React, {useState, useEffect} from 'react'

import axios from 'axios'

function GetCSRF(){
    const [csrf, setCsrf] = useState('')

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

    useEffect( ()=>{
        axios.get('http://127.0.0.1:8000/api/user/csrf').then( m =>{
            console.log(m)
        }).catch( e=>{
            console.log(e)
        })
    }, [])


    let handleCsrf = (event) =>{
        event.persist();
        setCsrf(event.target.value);
    }

    const sendRequest = (e) =>{
        e.preventDefault();
        document.cookie = csrf
        
  
        var data = JSON.stringify({"username":"dummy","password":"Daniel123"});
        var headers = { 
          'X-CSRFToken': getCookie('csrftoken'), 
          'Content-Type': 'application/json',
          'Cookie': document.cookie
        }
  
        console.log(' --- --- Headers --- ---')
        console.log(headers)
  
        var config = {
          method: 'post',
          url: 'http://127.0.0.1:8000/api/user/login',
          headers: headers,
          credentials: 'same-origin',
          data : data
        };
        
        axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log('-------- wahh wahh wahhh error');
            console.log(error);
            console.log(data)
        });
      }

    return(
        <div>
            <form action="">
                <input type="text" onChange={handleCsrf} name="" id=""/>
                {csrf}
                <button onClick={sendRequest} type="submit">mandaaa</button>
            </form>

        </div>
    )
}

export default  GetCSRF
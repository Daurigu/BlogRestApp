import React, {useState, useEffect} from 'react'

import getCookie from '../Components/getCookie'

import axios from 'axios'

function Register(){
    
    const [register, setRegister] = useState({
        "username":"",
        "password":"",
        "re_password":"",
    })

    useEffect(()=>{
        axios({
            method: 'post',
            url: '',
            headers:{
                'x-csrftoken': getCookie('csrftoken'),
                'content-type': 'application/json'
            },
            data: register
        }).then( response=>{
            console.log(response)
        }).catch( e=>{
            console.log(e)
        })
    })

    let handleName =(event)=>{
        event.persist();
        setRegister((values) => ({
            ...values,
            username: event.target.value
        }))
    }

    let handlePassword =(event)=>{
        event.persist();
        setRegister((values) => ({
            ...values,
            password: event.target.value
        }))
    }

    let handleRepassword=(event)=>{
        event.persist();
        setRegister((values) => ({
            ...values,
            re_password: event.target.value
        }))
    }

    let showError =()=>{
        if (register.password!==register.re_password){
            return <p Style='color:red'><b>Different password!</b> Please try again.</p>}
    }

    return(
        <div className="container">
            <div className="row">
                <div className="col-2"></div>
                <div className="col-8">
                    <form>
                        <input className='form-control m-3' onChange={handleName} placeholder='Username' type="text" name="" id=""/>
                        <input className='form-control m-3' onChange={handlePassword} placeholder='Password' type="password" name="" id=""/>
                        <input className='form-control m-3' onChange={handleRepassword} placeholder='Re-enter your password' type="password" name="" id=""/>
                    </form>
                </div>
                <div className="col-2"></div>
            </div>
            {showError}
        </div>
    )
}

export default Register
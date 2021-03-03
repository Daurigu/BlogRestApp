import React, {useState} from 'react'

import getCookie from '../Components/getCookie'

import axios from 'axios'

function Register(){
    
    const [register, setRegister] = useState({
        'username':'',
        'password':'',
        're_password':'',
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

    let handdleRegister =()=>{
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
    }

    return(
        <div className='row'>
            <form>
                <label className='form-label mt-3'>Username</label>
                <input className='form-control' onChange={handleName} placeholder='' type='text' name='' id=''/>
                <label className='form-label mt-3'>Password</label>
                <input className='form-control' onChange={handlePassword} placeholder='' type='password' name='' id=''/>
                <label className='form-label mt-3'>Re-enter Password</label>
                <input className='form-control' onChange={handleRepassword} placeholder='' type='password' name='' id=''/>
                <div className="row justify-content-center">
                    <button className='btn btn-outline-success mt-3 col-9' onClick={handdleRegister} type="submit">Sign in</button>
                </div>
            </form>
            {showError}
        </div>
    )
}

export default Register
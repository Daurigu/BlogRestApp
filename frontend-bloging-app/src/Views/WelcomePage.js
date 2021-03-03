import React,{useState} from 'react'

import Register from './Register'
import Login from './Login'

function WelcomePage(){

    const [reg, setReg] = useState('')

    let showRegister =()=>{
        setReg(reg === '' ? <Register/> : '')
    }

    return(
        <div className='row'>
            <div className="col-4"></div>
            <div className="col-4 p-5">

                <Login />

                <div className='row justify-content-center'>
                    <button type="submit" onClick={showRegister} className="btn mt-2 btn-outline-success col-9">Register</button>
                </div>

                {reg}

            </div>
            <div className="col-4"></div>
        </div>
    )
}

export default WelcomePage
import React, {useState, useEffect} from 'react'

import axios from 'axios'

function Logout(){

    const [logout, setLogout] = useState()

    useEffect( ()=>{
        axios.get('http://127.0.0.1:8000/api/user/logout').then( info =>{
            setLogout('Se you latter buddy')
        }).catch( e =>{
            setLogout('Error! Please try again')
        })
    }, [])


    return(
        <div>
            <h1>
                {logout}
            </h1>  
        </div>
    )
}

export default Logout
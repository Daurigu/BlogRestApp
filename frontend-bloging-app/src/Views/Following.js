import React, {useState, useEffect} from 'react'

import getCookie from '../Components/getCookie'
import UserCard from '../Components/userCard'

import axios from 'axios'

function Following(){
    const [following, setFollowing] = useState('Loading...')
    let showFollowing

    useEffect(()=>{

        axios({
            method:'get',
            url: 'http://127.0.0.1:8000/api/user/following',
            headers:{
                'x-csrftoken': getCookie('csrftoken'),
                'content-type': 'application/json'
            }
        }).then(response=>{
            setFollowing(response.data.following)
        }).catch(e=>{
            console.log(e)
        })

    },[])

    if(following){

        showFollowing = following.map(element=>{
            return <UserCard content={element}/>
        })

    }

    return (
        <div>
            {showFollowing}
        </div>
    )
}

export default Following
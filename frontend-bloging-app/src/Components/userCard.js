import React from 'react'

// import {
//     Link,
//   } from 'react-router-dom'

function UserCard(props){
    let data = props.data

    let profilepic = data.profile_pic

    if (profilepic === ''){
        profilepic = 'https://i.pinimg.com/originals/a6/f3/c5/a6f3c55ace829310723adcb7a468869b.png'
    }

    return(
        <div className='p-3 rounded mb-2 shadow-sm bg-white'>
            <div className='row'>
                <div className='col-2'>
                    <a href={`/follower-profile/${data.username}`}>
                        <img className='rounded-circle img-fluid img-thumbnail img-height' src={profilepic} alt=''/>
                    </a>
                </div>
                <div className='col-8'>
                    <a href={`/follower-profile/${data.username}`}>
                        <h3>{data.name}</h3>
                    </a>
                    <p>{data.about}</p>
                </div>
                <div className='col-2'>
                    
                </div>
            </div>
        </div>
    )
}

export default UserCard
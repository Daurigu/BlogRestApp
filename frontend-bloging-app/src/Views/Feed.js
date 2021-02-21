import React, {useState, useEffect} from 'react'

import axios from 'axios'

import Posts from '../Components/posts'
import ProfileCard from '../Components/ProfileCard'
import PostSection from '../Components/PostSection'

import getCookie from '../Components/getCookie'

function Feed(){
    const [posts, setPosts] = useState()
    let postElements
    
    useEffect(()=>{
        axios({
            method: 'get',
            url: 'http://127.0.0.1:8000/api/post/following',
            headers: { 
              'X-CSRFToken': getCookie('csrftoken'),
              'Content-Type': 'application/json',
            },
            withCredentials: true,
        }).then( response =>{
            setPosts(response.data.data)
        }).catch(e=>{
            console.log(e)
        })
    },[])

    if (posts){
        postElements = posts.map((element)=>{
            return <Posts post={element}/>
        })
    }
    
    return(
        <div className='container'>
            <div className='row'>
                <div className='col-4 col-lg-3 pt-5'>
                    <ProfileCard />
                </div>
                <div className='col-8 col-lg-6 pt-5'>
                    
                    <div className='mb-3'>
                        <PostSection />
                        {postElements}
                    </div>
                    
                </div>
                <div className='col-0 col-lg-3'>
                    
                </div>
            </div>
        </div>
    )
}

export default Feed
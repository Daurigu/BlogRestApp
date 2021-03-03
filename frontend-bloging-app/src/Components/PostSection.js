import React, {useState} from 'react'

import getCookie from '../Components/getCookie'

import axios from 'axios'

function PostSection(){
    const [post, setPost] = useState({title: '', content:''})
    let sendPost = (e)=>{
        e.preventDefault();
        
        axios({
            method: 'post',
            url: 'http://127.0.0.1:8000/api/post/create',
            headers: { 
              'X-CSRFToken': getCookie('csrftoken'),
              'Content-Type': 'application/json',
            },
            data: post
        }).then((data)=>{
            console.log(data)
        }).catch(e=>{
            console.log(e)
        })
    }


    let handleTitle = (event) =>{
        event.persist();
        setPost((values) => ({
            ...values,
            title: event.target.value,
        }));
    }

    let handleContent = (event) =>{
        event.persist();
        setPost((values) => ({
            ...values,
            content: event.target.value,
        }));
    }


    return(
        <div className='bg-white'>
            <form className='shadow-sm rounded' action="">
                <input className='form-control' onChange={handleTitle} placeholder='Title' type="text" name="title" id="override-form-control"/>
                <textarea className='form-control' onChange={handleContent} placeholder='Write your blog here' name="content" id="override-form-control"/>
                <div className="d-grid gap-2 d-md-flex justify-content-md-end m-1">
                    <button className='btn btn-btn-outline-dark' onClick={sendPost} type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default PostSection
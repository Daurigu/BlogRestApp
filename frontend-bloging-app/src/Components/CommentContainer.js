import React, {useState, useEffect} from 'react'

import axios from 'axios'

import getCookie from '../Components/getCookie'
import Comment from '../Components/Comment'

function CommentComponent(props){
    let data = props.data
    const [comments, setComments] = useState()
    const [postComment, setPostComment] = useState({comment: '', post: data.id})

    useEffect(()=>{
        axios({
            method:'get',
            url:'http://127.0.0.1:8000/api/post/get-comment/'+String(data.id),
            headers:{
                'x-csrftoken': getCookie('csrftoken'),
                'content-type': 'application/json'
            }
        }).then(response=>{
            setComments(response.data.comments)
        }).catch(e=>{
            console.log(e)
        })
    },[postComment])

    let showComment
    if (comments){
        showComment = comments.map(element=>{
            return <Comment data={element}/>
        })
    }

    let sendComment =(e)=>{
        e.preventDefault()
        console.log(postComment)
        axios({
            method: 'post',
            url: 'http://127.0.0.1:8000/api/post/comment',
            headers: { 
              'X-CSRFToken': getCookie('csrftoken'),
              'Content-Type': 'application/json',
            },
            data: postComment
            
          }).then( response=>{
            console.log(response)
          }).catch( e=>{
            console.log(e)
          })
    }

    let handdleComment = (event) =>{
        event.persist();
        setPostComment((values) => ({
            ...values,
            comment: event.target.value,
        }));
    }

    return(
        <div>
            <div class='input-group mt-3'>
                <input onChange={handdleComment} type='text' class='form-control' placeholder='Comment'/>
                <button onClick={sendComment} class='btn btn-outline-secondary' type='button' id='button-addon2'>Post</button>
            </div>
            <div>{showComment}</div>
        </div>
    )
}

export default CommentComponent
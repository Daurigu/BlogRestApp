import React, {useState, useEffect} from 'react'

import axios from 'axios'

import getCookie from '../Components/getCookie'

function EditPost(){

    const [slugLink, setSlug] = useState(window.location.pathname.split('/'))

    const [post, setPost] = useState({
        title: '',
        content: '',
        image: ''
    })

    useEffect(()=>{       
        setSlug(window.location.pathname.split('/'))
        let data = {'moreData': 'soemthing','id': slugLink[2]}
        axios({
            method: 'post',
            url: 'http://127.0.0.1:8000/api/post/get',
            headers:{
                'x-csrftoken': getCookie('csrftoken'),
                'content-type': 'application/json'
            },
            data: data
        }).then(response=>{
            setPost(response.data.post)
        }).catch(e=>{
            console.log(e)
        })
    },[])

    let handdleTittle =(event)=>{
        event.persist();
        setPost((values) => ({
            ...values,
            title: event.target.value,
        }));
    }

    let handdleContent =(event)=>{
        event.persist();
        setPost((values) => ({
            ...values,
            content: event.target.value,
        }));
    }

    let handdleImage =(event)=>{
        event.persist();
        setPost((values) => ({
            ...values,
            image: event.target.value,
        }));
    }

    let handdleUpdate =(e)=>{
        e.preventDefault()
        axios({
            method: 'put',
            url: 'http://127.0.0.1:8000/api/post/edit/'+String(post.id),
            headers:{
                'x-csrftoken': getCookie('csrftoken'),
                'content-type': 'application/json'
            },
            data: post
        }).then(response=>{
            console.log(response)
        }).catch(e=>{
            console.log(e)
        })
        window.location.href = "/user-profile"
    }
    
    return (
        <div className='container mb-5'>
            <div className="row">
                <div className="col-2"></div>
                <div className="col-8">
                    <form>
                        <label className='form-label mt-3'>Tittle</label>
                        <input className='form-control' onChange={handdleTittle} value={post.title} type='text' name='' id='tittle'/>
                        <label className='form-label mt-3'>Content</label>
                        <textarea className='form-control' onChange={handdleContent} value={post.content} type='text' name='' id='content'/>
                        <label className='form-label mt-3'>Image</label>
                        <input className='form-control' onChange={handdleImage} value={post.image} type='text' name='' id='image'/>
                        <div className="row justify-content-center">
                            <button className='btn btn-outline-success mt-3 col-9' onClick={handdleUpdate} type="submit">Update</button>
                        </div>
                    </form>
                </div>
                <div className="col-2"></div>
            </div>
        </div>
    )
}

export default EditPost
import React, {useState, useEffect} from 'react'

import axios from 'axios'
import getCookie from '../Components/getCookie'

function EditProfile(props){

    const [profile, setProfile] = useState({
        "name": "",
        "profile_pic": "",
        "email": "",
        "about": ""
    })
    

    useEffect(()=>{
        axios({
            method: 'get',
            url: 'http://127.0.0.1:8000/api/user/profile',
            headers:{
                'x-csrftoken': getCookie('csrftoken'),
                'content-type': 'application/json'
            }
        }).then(response=>{
            setProfile(response.data.profile)
        }).catch(e=>{
            console.log(e)
        })
    },[])


    let handdleName = (event)=>{
        event.persist();
        setProfile((values) => ({
            ...values,
            name: event.target.value,
        }));
    }

    let handdlePic = (event)=>{
        event.persist();
        setProfile((values) => ({
            ...values,
            profile_pic: event.target.value,
        }));
    }

    let handdleEmail = (event)=>{
        event.persist();
        setProfile((values) => ({
            ...values,
            email: event.target.value,
        }));
    }

    let handdleAbout = (event)=>{
        event.persist();
        setProfile((values) => ({
            ...values,
            about: event.target.value,
        }));
    }


    let handdleUpdate = (e)=>{
        e.preventDefault()
        axios({
            method: 'put',
            url: 'http://127.0.0.1:8000/api/user/update-profile',
            headers:{
                'x-csrftoken': getCookie('csrftoken'),
                'content-type': 'application/json'
            },
            data: profile
        }).then(response=>{
            console.log(response)
        }).catch(e=>{
            console.log(e)
        })
    }

    return(
        <div className='container'>
            <div className="row">
                <div className="col-2"></div>
                <div className="col-8">
                    <form>
                        <label className='form-label mt-3'>Name</label>
                        <input className='form-control' onChange={handdleName} value={profile.name} type='text' name='' id=''/>
                        <label className='form-label mt-3'>Profile Picture</label>
                        <input className='form-control' onChange={handdlePic} value={profile.profile_pic} type='text' name='' id=''/>
                        <label className='form-label mt-3'>Email</label>
                        <input className='form-control' onChange={handdleEmail} value={profile.email} type='text' name='' id=''/>
                        <label className='form-label mt-3'>About</label>
                        <input className='form-control' onChange={handdleAbout} value={profile.about} type='text' name='' id=''/>
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

export default EditProfile
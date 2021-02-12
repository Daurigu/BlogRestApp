import React from 'react'

function PostSection(){
    return(
        <div>
            <form className='shadow rounded' action="">
                <input className='form-control' placeholder='Title' type="text" name="" id="override-form-control"/>
                <textarea className='form-control' placeholder='Write your blog here' name="" id="override-form-control"/>
                <div className="d-grid gap-2 d-md-flex justify-content-md-end m-1">
                    <button className='btn btn-btn-outline-dark' type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default PostSection
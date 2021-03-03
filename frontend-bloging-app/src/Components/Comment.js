import React from 'react'

function Comment(props){
    let data = props.data
    return(
        <div className='rounded border mt-2 p-2'>
            <div className="row">
                <p className='text-secundary'>{data.user}</p>
            </div>
            <div className="row">
                <p>{data.comment}</p>
            </div>
        </div>
    )
}

export default Comment
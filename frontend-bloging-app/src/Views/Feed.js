import React from 'react'

import Posts from '../Components/posts'
import ProfileCard from '../Components/ProfileCard'
import PostSection from '../Components/PostSection'

function Feed(){



    return(
        <div className='container'>
            <div className="row">
                <div className="col-4 col-lg-3 pt-5">
                    <ProfileCard />
                </div>
                <div className="col-8 col-lg-6 pt-5">
                    
                    <div className="mb-3">
                        <PostSection />
                    </div>

                    <Posts />
                    
                </div>
                <div className="col-0 col-lg-3">
                    
                </div>
            </div>
        </div>
    )
}

export default Feed
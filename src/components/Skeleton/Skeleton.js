import React from 'react'
import './Skeleton.css'
function Skeleton() {
    // const InvalidImgURL = 'https://www.shutterstock.com/image-vector/image-icon-600nw-211642900.jpg'
    return (
        <div className='movie-card movie-card-placeholder'>
            <div className='card-img-container img-placeholder'>
                {/* <img src={InvalidImgURL} alt='' /> */}
            </div>
            <div className='text-center movie-title-placeholder'>{ }</div>
            <div className='text-center movie-title-placeholder-second'>{ }</div>
        </div>
    )
}

export default Skeleton
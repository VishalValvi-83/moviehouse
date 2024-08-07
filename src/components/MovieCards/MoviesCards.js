import React from 'react'
import './MovieCard.css'
function MoviesCards({title, image}) {
    return (
        <div className='movie-card'>
            <div className='card-img-container'>
                <img src={image} alt='' />
                <div className='view-btn'>View</div>
            </div>
            <h3 className='movie-title'>{title}</h3>
        </div>
    )
}

export default MoviesCards
import React from 'react'
import './MovieCard.css'
import { Link } from 'react-router-dom'
function MoviesCards({title, image}) {
    return (
        <div className='movie-card'>
            <div className='card-img-container'>
                <img src={image} alt={title} />
                <Link to={`/movie-info/${title}`} className='view-btn'>View</Link>
            </div>
            <Link to={`/movie-info/${title}`} className='text-center movie-title'>{title}</Link>
        </div>
    )
}

export default MoviesCards
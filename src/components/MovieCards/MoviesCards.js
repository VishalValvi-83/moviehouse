import React from 'react'
import './MovieCard.css'
function MoviesCards() {
    return (
        <div className='movie-card'>
            <div className='card-img-container'>
                <img src='https://movies4u.tax/wp-content/uploads/2024/07/despicable-me-4.webp' alt='' />
                <div className='view-btn'>View</div>
            </div>
            <h3 className='movie-title'>Despicable Me 4 (2024)</h3>
        </div>
    )
}

export default MoviesCards
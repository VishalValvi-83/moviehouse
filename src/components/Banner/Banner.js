import React from 'react'

function Banner({ handleSearch, searchTerm }) {
    return (
        <div className="home-banner">
            <div className="banner-content">
                <h1 className="site-title">MovieHouse</h1>
                <p>Discover the latest movies and TV shows</p>
                <div className="search sm:4/5 md:w-2/5">
                    <input type="text" className="search-input w-full" placeholder="Search for movies or TV shows" value={searchTerm} onChange={handleSearch} />
                    {/* <button type="submit" className="search-btn">Search</button> */}
                </div>
            </div>
        </div>
    )
}

export default Banner
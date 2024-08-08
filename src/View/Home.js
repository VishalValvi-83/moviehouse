import React, { useEffect, useState } from "react";
import './Home.css'
import Navbar from "../components/Navbar/Navbar";
import MoviesCards from "../components/MovieCards/MoviesCards";
import axios from "axios";
import toast from "react-hot-toast";
import Banner from "../components/Banner/Banner";

let config = {

    url: 'https://Movies-Verse.proxy-production.allthingsdev.co/api/movies/most-popular-movies',
    headers: {
        'x-apihub-key': process.env.REACT_APP_API_KEY,
        'x-apihub-host': 'Movies-Verse.allthingsdev.co',
        'x-apihub-endpoint': '611cdfda-546d-4cc9-91ab-bfdac3194613'
    }
};

function Home() {
    const [allmovies, setAllMovies] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [searchResults, setSearchResults] = useState([])

    useEffect(() => {
        const moviesdata = async () => {
            toast.loading("Loading")

            await axios.request(config)
                .then((response) => {
                    setAllMovies(response.data.movies)
                    console.log(JSON.stringify(response.data.movies));
                })
                .catch((error) => {
                    console.log(error);
                });
            toast.dismiss()

        }

        setTimeout(() => {
            moviesdata()
        }, 1000);
    }, [])

    const handleSearch = (e) => {
        const value = e.target.value
        setSearchTerm(value)
        const results = allmovies.filter(movie => movie.title.toLowerCase().includes(value.toLowerCase()))
        setSearchResults(results)
    }

    return (
        <>
            <Navbar />
            <Banner handleSearch={handleSearch} searchTerm={searchTerm}/>
            {searchTerm ? (
                <div className="new-release-container">
                    <h3 className="heading">Search Results</h3>
                    <div className="home-card-container">
                        {
                            searchResults.map((movie, index) => {
                                const { title, image, } = movie
                                return (
                                    <>
                                        <MoviesCards key={index} title={title} image={image} />
                                    </>
                                )
                            })
                        }
                    </div>
                </div>
            ) : (
                <>
                    <div className="new-release-container">
                        <h3 className="heading">Trending Movies</h3>
                        <div className="home-card-container">
                            {
                                allmovies.slice(0, 5).map((movie, index) => {
                                    const { title, image, } = movie
                                    return (
                                        <>
                                            <MoviesCards key={index} title={title} image={image} />
                                        </>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="new-release-container">
                        <h3 className="heading">Popular Movies</h3>
                        <div className="home-card-container">
                            {
                                allmovies.slice(5, 10).map((movie, index) => {
                                    const { title, image, } = movie
                                    return (
                                        <>
                                            <MoviesCards key={index} title={title} image={image} />
                                        </>
                                    )
                                })
                            }
                        </div>
                    </div>
                </>
            )}
        </>
    )
}
export default Home
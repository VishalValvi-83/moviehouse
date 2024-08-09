import React, { useEffect, useState } from "react";
import './Home.css'
import Navbar from "../components/Navbar/Navbar";
import MoviesCards from "../components/MovieCards/MoviesCards";
import axios from "axios";
import toast from "react-hot-toast";
import Banner from "../components/Banner/Banner";
import Footer from "../components/Footer/Footer";
import Skeleton from "../components/Skeleton/Skeleton";

let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'https://Movies-Verse.proxy-production.allthingsdev.co/api/movies/most-popular-movies',
    headers: {
        'x-apihub-key': process.env.REACT_APP_API_KEY,
        'x-apihub-host': 'Movies-Verse.allthingsdev.co',
        'x-apihub-endpoint': '611cdfda-546d-4cc9-91ab-bfdac3194613 '
    }
};

function Home() {
    const [allmovies, setAllMovies] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const [loadSkeleton, setLoadSkeleton] = useState(true)

    useEffect(() => {
        const moviesdata = async () => {
            toast.loading("Loading")

            try {
                const response = await axios.request(config);
                setAllMovies(response.data.movies);
            } catch (error) {
                console.error(error);
                toast.error("Error loading movies");
            }
            setTimeout(() => {
                toast.dismiss()
            }, 1000);
        }

        moviesdata()
    }, [])

    const handleSearch = (e) => {
        const value = e.target.value
        setSearchTerm(value)
        const results = allmovies.filter(movie => movie.title.toLowerCase().includes(value.toLowerCase()))
        setSearchResults(results)
    }
    useEffect(() => {
        setTimeout(() => {
            setLoadSkeleton(false);
        }, 2000);
    }, []);

    return (
        <>
            <Navbar />
            <Banner handleSearch={handleSearch} searchTerm={searchTerm} />
            {searchTerm ? (
                <div className="new-release-container">
                    <h3 className="heading">Search Results</h3>
                    <div className="home-card-container">
                        {searchResults.length > 0 ? (
                            searchResults.map((movie, index) => {
                                const { title, image, } = movie
                                return (
                                    <>
                                        <MoviesCards key={index} title={title} image={image} />
                                    </>)
                            })) :
                            (<h3>Results Not Found</h3>)
                        }
                    </div>
                </div>
            ) : (
                <>
                    <div className="new-release-container">
                        <h3 className="heading">Trending Movies</h3>
                        <div className="home-card-container">
                            {!loadSkeleton ?
                                allmovies.slice(0, 5).map((movie, index) => {
                                    const { title, image, } = movie
                                    return (
                                        <>
                                            <MoviesCards key={index} title={title} image={image} />
                                        </>
                                    )
                                }) :
                                <Skeleton />
                            }
                        </div>
                    </div>
                    <div className="new-release-container">
                        <h3 className="heading">Popular Movies</h3>
                        <div className="home-card-container">
                            {loadSkeleton ?
                                <Skeleton />
                                :
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
            <Footer />
        </>
    )
}
export default Home
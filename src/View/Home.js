import React from "react";
import './Home.css'
import Navbar from "../components/Navbar/Navbar";
import MoviesCards from "../components/MovieCards/MoviesCards";
import axios from "axios";

const Home = () => {
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://Movies-Verse.proxy-production.allthingsdev.co/api/movies/get-by-genre?genre=action',
        headers: {
            'x-apihub-key': 'LoA8EmMIPfnBA1JV8yEDJ93N2GSgLQtLPqlxOYY7GVzLQ4QaZK',
            'x-apihub-host': 'Movies-Verse.allthingsdev.co',
            'x-apihub-endpoint': 'dae9e3d3-6b6c-4fde-b298-ada2806ae563'
        }
    };

    axios.request(config)
        .then((response) => {
            console.log(JSON.stringify(response.data));
        })
        .catch((error) => {
            console.log(error);
        });
    return (
        <>
            <Navbar />
            <div className="home-banner">
                <div className="banner-content">
                    <h1 className="site-title">MovieHouse</h1>
                    <p>Discover the latest movies and TV shows</p>
                    <div className="search">
                        <input type="text" className="search-input" placeholder="Search for movies or TV shows" />
                        <button type="submit" className="search-btn">Search</button>
                    </div>
                </div>
            </div>
            <div className="new-release-container">
                <h3 className="heading">Recently Released</h3>
                <div className="home-card-container">
                    <MoviesCards />
                </div>
            </div>

        </>
    )
}
export default Home
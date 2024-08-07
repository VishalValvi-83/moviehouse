import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import axios from 'axios';
import toast from 'react-hot-toast';
import MoviesCards from './../../components/MovieCards/MoviesCards'

const genresConfig = {
  method: 'get',
  maxBodyLength: Infinity,
  url: 'https://Movies-Verse.proxy-production.allthingsdev.co/api/movies/available-genres',
  headers: {
    'x-apihub-key': process.env.REACT_APP_API_KEY,
    'x-apihub-host': 'Movies-Verse.allthingsdev.co',
    'x-apihub-endpoint': '462dfdab-8876-412d-af11-765956a494a4'
  }
};

const moviesConfig = (genre) => ({
  method: 'get',
  maxBodyLength: Infinity,
  url: `https://Movies-Verse.proxy-production.allthingsdev.co/api/movies/get-by-genre?genre=${genre}`,
  headers: {
    'x-apihub-key': process.env.REACT_APP_API_KEY,
    'x-apihub-host': 'Movies-Verse.allthingsdev.co',
    'x-apihub-endpoint': 'dae9e3d3-6b6c-4fde-b298-ada2806ae563'
  }
});

function Movies() {
  const [genres, setGenres] = useState([]);
  const [category, setCategory] = useState('');
  const [movies, setMovies] = useState([]);
  const [allMovies, setAllMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])

  useEffect(() => {
    const fetchGenres = async () => {
      await axios.request(genresConfig)
        .then((response) => {
          setGenres(response.data.genres);
        })
        .catch((error) => {
          toast.error(error.message);
        });
    };

    const fetchAllMovies = async () => {
      const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://Movies-Verse.proxy-production.allthingsdev.co/api/movies/most-popular-movies',
        headers: {
          'x-apihub-key': process.env.REACT_APP_API_KEY,
          'x-apihub-host': 'Movies-Verse.allthingsdev.co',
          'x-apihub-endpoint': '611cdfda-546d-4cc9-91ab-bfdac3194613'
        }
      };
      await axios.request(config)
        .then((response) => {
          setAllMovies(response.data.movies);
          setMovies(response.data.movies);
        })
        .catch((error) => {
          toast.error(error.message);
        });
    };

    fetchGenres();
    fetchAllMovies();
  }, []);

  const handleGenreClick = async (genre) => {
    setCategory(genre);
    try {
      const response = await axios.request(moviesConfig(genre));
      setMovies(response.data.movies);
    } catch (error) {
      toast.error(error.message);
    }
  };


  useEffect(() => {
    handleGenreClick()
  }, [])


  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
    const results = allMovies.filter(movie => movie.title.toLowerCase().includes(e.target.value.toLowerCase()))
    setSearchResults(results)
  }
  return (
    <>
      <Navbar />
      <div className="home-banner">
        <div className="banner-content">
          <h1 className="site-title">MovieHouse</h1>
          <p>Discover the latest movies and TV shows</p>
          <div className="search">
            <input type="text" className="search-input" placeholder="Search for movies or TV shows" value={searchTerm} onChange={handleSearch} />
            <button type="submit" className="search-btn">Search</button>
          </div>
        </div>
      </div>
      <div className='genres-container md:w-4/5	mx-auto mt-12 mb-5'>
        <h3 className='heading text-center'>By Genres </h3>
        <div className="genres flex justify-center flex-wrap space-x-2 space-y-2 ">
          {genres.map((genre, i) => (
            <button className='btn sm:w-22 md:w-32' value={genre} onClick={() => handleGenreClick(genre)} key={i}>{genre}</button>
          ))}
        </div>
      </div>

      {searchTerm ? (
        <div className="new-release-container ">
          <h3 className="heading">Search Results</h3>
          <div className="home-card-container ">
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
        <div className='container mx-auto'>
          {category ? (
                    <h3 className='heading text-center'>Movies In {category} Genre </h3>
          ) : (
            <h3 className='heading text-center'>All Movies</h3>
          )}
          <div className='flex justify-center grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 space-y-2 '  >
            {(category ? movies : allMovies).map((movie, i) => {
              const { title, image, } = movie
              return (
                <MoviesCards key={i} title={title} image={image} />
              )
            })}
          </div>
        </div>
      )
      }

    </>
  );
}

export default Movies;
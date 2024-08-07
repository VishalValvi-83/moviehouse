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

    fetchGenres();
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
  console.log(category);
  console.log(movies);

  return (
    <>
      <Navbar />
      <div className='genres-container mt-12'>
        <h3>Genres:</h3>
        <div className="genres flex justify-center flex-wrap space-x-2 space-y-2 ">
          {genres.map((genre, i) => (
            <button className='btn w-32' value={genre} onClick={() => handleGenreClick(genre)} key={i}>{genre}</button>
          ))}
        </div>
      </div>

      <div>
        <h3>Movies in {category} genre:</h3>
        <ul>
          {movies.map((movie, i) => {
            const { title, image, } = movie
            return (
              <>
                <MoviesCards key={i} title={title} image={image} />
              </>
            )
          })}
        </ul>
      </div>

    </>
  );
}

export default Movies;
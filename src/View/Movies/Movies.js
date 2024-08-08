import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import axios from 'axios';
import toast from 'react-hot-toast';
import MoviesCards from './../../components/MovieCards/MoviesCards'
import Banner from '../../components/Banner/Banner';
import ReactPaginate from 'react-paginate';
import Footer from '../../components/Footer/Footer';

const genresConfig = {
  method: 'get',
  maxBodyLength: Infinity,
  url: 'https://Movies-Verse.proxy-production.allthingsdev.co/api/movies/available-genres',
  headers: {
    'x-apihub-key': '',
    'x-apihub-host': 'Movies-Verse.allthingsdev.co',
    'x-apihub-endpoint': '462dfdab-8876-412d-af11-765956a494a4'
  }
};

const moviesConfig = (genre) => ({
  method: 'get',
  maxBodyLength: Infinity,
  url: `https://Movies-Verse.proxy-production.allthingsdev.co/api/movies/get-by-genre?genre=${genre}`,
  headers: {
    'x-apihub-key': '',
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
  const [currentPage, setCurrentPage] = useState(10);
  const moviesPerPage = 10;

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, category]);
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

  const pageCount = Math.ceil(movies.length / moviesPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected + 1);
  };


  useEffect(() => {
    const fetchGenres = async () => {
      await axios.request(genresConfig)
        .then((response) => {
          setGenres(response.data.genres);
        })
        .catch((error) => {
          toast.error("Failed to fetch genre");
        });
    };

    const fetchAllMovies = async () => {
      const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://Movies-Verse.proxy-production.allthingsdev.co/api/movies/most-popular-movies',
        headers: {
          'x-apihub-key': '',
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
          console.error(error);
          toast.error("Failed to Load Movies");
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
      console.error(error);
      toast.error("Failed to Load genre");
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
      <Banner handleSearch={handleSearch} searchTerm={searchTerm} />
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

          {currentMovies.length > 0 ? (
            <div className='flex justify-center grid  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 '  >
              {currentMovies.map((movie, i) => {
                const { title, image, } = movie
                return (
                  <MoviesCards key={i} title={title} image={image} />
                )
              })} </div>) :
            (<p>No movies found</p>)
          }

          <div className="my-5 py-5">
            <ReactPaginate
              previousLabel={"Previous"}
              nextLabel={"Next"}
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={pageCount}
              marginPagesDisplayed={3}
              pageRangeDisplayed={5}
              onPageChange={handlePageClick}
              activeClassName={"active border text-dark search-btn p-1"}
              containerClassName={"pagination gap-2 flex flex-row flex-wrap justify-center"}
              previousClassName={"search-btn py-1 px-2"}
              nextClassName={"search-btn py-1 px-2"}
              pageClassName={""}
              pageLinkClassName={"p-2 border-yellow"}
            />
          </div>
        </div>
      )
      }
      <Footer/>
    </>
  );
}

export default Movies;
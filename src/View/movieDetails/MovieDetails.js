import axios from 'axios';
import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import Banner from '../../components/Banner/Banner';

let config = {
  method: 'get',
  maxBodyLength: Infinity,
  url: 'https://Movies-Verse.proxy-production.allthingsdev.co/api/movies/get-by-genre?genre=action',
  headers: {
    'x-apihub-key': process.env.REACT_APP_API_KEY,
    'x-apihub-host': 'Movies-Verse.allthingsdev.co',
    'x-apihub-endpoint': 'dae9e3d3-6b6c-4fde-b298-ada2806ae563'
  }
};

function MovieDetails() {
  const { title } = useParams();
  const [movie, setMovie] = useState({});
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.request(config);
        setMovie(response.data.movies.find(m => m.title === title));
        console.log('Fetched movie:', movie);
      } catch (error) {
        console.error('Error fetching movie:', error);
      }
    }
    fetchData();
  }, [title]);


  return (
    <>
      <Navbar />
      <Banner />
      <header className='border-b border-amber-300 pb-5'>
        <div className='space-x-4 flex justify-center'>
          <Link to='/movies' className="btn btn-error shadow-lg shadow-red-500/50 btn-xs sm:btn-sm md:btn-md lg:btn-lg">Movies</Link>
          <Link to='/series' className="btn btn-warning shadow-lg shadow-yellow-500/50 btn-xs sm:btn-sm md:btn-md lg:btn-lg">Series</Link>
          <Link to='/tv-shows' className="btn shadow-lg shadow-green-500/50  btn-success btn-xs sm:btn-sm md:btn-md lg:btn-lg">TV Shows</Link>
        </div>
      </header>

      <main className='flex justify-center'>
        <div className='flex flex-wrap bg-neutral-800 rounded-lg md:w-4/5 my-10 justify-around px-3'>
          <div className='mt-5 sm:w-1/5 md:w-1/2'>
            <h1 className='text-3xl font-bold my-10'>{movie.title}</h1>
            <h2 className='text-lg font-bold'><span className='text-yellow-400 me-2'>Release year:</span>{movie.year}</h2>
            {/* <h2 className='text-lg font-bold'><span className='text-yellow-400 me-2'>Genre:</span> Action</h2> */}
            <h2 className='text-lg font-bold'><span className='text-yellow-400 me-2'>IMDB Rating:</span><a className='link' href={movie.link}>{movie.imdbRating}</a></h2>
            <h2 className='text-lg font-bold'><span className='text-yellow-400 me-2'>Timeline:</span>{movie.timeline}</h2>
            <div className='description sm:w-3/5 md:w-4/5 mt-5'>
              <span className='text-yellow-400 font-bold me-2'>Description :</span>
              {movie.description}
            </div>
          </div>
          <div className='my-5 md:h-96 sm:h-72 sm:w-1/5 md:w-1/2'>
            <img src={movie.image} className='h-full w-full rounded-lg object-contain' alt={movie.title} />
          </div>
        </div>

      </main>
      <Footer />
    </>

  )
}

export default MovieDetails
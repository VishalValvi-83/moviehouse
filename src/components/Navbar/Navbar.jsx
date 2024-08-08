import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import './Navbar.css'
import HomeIcon from './Assets/home.svg'
import MoviesIcon from './Assets/movies.svg'
import SeriesIcon from './Assets/series.svg'
import TvIcon from './Assets/tv.svg'


function Navbar() {
  useEffect(() => {
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 200) {
        navbar.classList.add('scrollNavBg');
      } else {
        navbar.classList.remove('scrollNavBg');
      }
    });
  }, []);
  return (
    <div id='navbar' className='navbar'>
      {/* <nav>
        <NavLink className={(e) => { return e.isActive ? "active" : "" }} to="/" ><img src={HomeIcon} alt='' />Home</NavLink>
        <NavLink className={(e) => { return e.isActive ? "active" : "" }} to="/movies"><img src={MoviesIcon} alt='' /> Movies</NavLink>
        <NavLink className={(e) => { return e.isActive ? "active" : "" }} to="/series"><img src={SeriesIcon} alt='' />Series</NavLink>
        <NavLink className={(e) => { return e.isActive ? "active" : "" }} to="/tv-shows"><img src={TvIcon} alt='' />TV Shows</NavLink>
      </nav> */}
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
              <NavLink className={(e) => { return e.isActive ? "active" : "" }} to="/" ><img src={HomeIcon} alt='' />Home</NavLink>
              <NavLink className={(e) => { return e.isActive ? "active" : "" }} to="/movies"><img src={MoviesIcon} alt='' /> Movies</NavLink>
              <NavLink className={(e) => { return e.isActive ? "active" : "" }} to="/series"><img src={SeriesIcon} alt='' />Series</NavLink>
              <NavLink className={(e) => { return e.isActive ? "active" : "" }} to="/tv-shows"><img src={TvIcon} alt='' />TV Shows</NavLink>
            </ul>
          </div>
          <a href='/' className="btn btn-ghost text-xl">MoviesHouse</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-3 px-1">
            <NavLink className={`lg:flex ${`lg:flex ${(e) => { return e.isActive ? "active mx-2" : "mx-2" }}`}`} to="/" >
              <img src={HomeIcon} alt='' />Home</NavLink>
            <NavLink className={`lg:flex ${(e) => { return e.isActive ? "active mx-2" : "mx-2" }}`} to="/movies"><img src={MoviesIcon} alt='' /> Movies</NavLink>

            <NavLink className={`lg:flex ${(e) => { return e.isActive ? "active mx-2" : "mx-3" }}`} to="/series"><img src={SeriesIcon} alt='' />Series</NavLink>
            <NavLink className={`lg:flex w-28 ${(e) => { return e.isActive ? "active mx-3" : "mx-3" }}`} to="/tv-shows"><img src={TvIcon} alt='' />TV Shows</NavLink>
          </ul>
        </div>
        <div className="navbar-end">
          {/* <Link to='/' className="btn">Button</Link> */}
        </div>
      </div>
    </div>
  )
}

export default Navbar
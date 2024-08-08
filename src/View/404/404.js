import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from './../../components/Navbar/Navbar.jsx'
import Footer from '../../components/Footer/Footer.js'
function Error() {
    return (
        <>
            <Navbar />
            <main className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
                <div className="text-center">
                    <h1 className="text-6xl font-semibold text-yellow-500">404</h1>
                    <h1 className="mt-4 text-3xl font-bold tracking-tight text-white-900 sm:text-5xl">Page not found</h1>
                    <p className="mt-6 text-base leading-7 text-gray-600">Sorry, we couldn’t find the page you’re looking for.</p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <Link to="/" className="rounded-md search-btn px-3.5 py-2.5 text-sm font-semibold text-dark shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            Go back home
                        </Link>
                    </div>
                </div>
            </main>
            <Footer/>
        </>
    )
}

export default Error
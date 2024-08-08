import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'

function Series() {
  return (
    <>
        <Navbar/>
        <main className="grid place-items-center px-6 py-24 sm:py-32 lg:px-8">
                <div className="text-center">
                    <h1 className="text-6xl font-semibold text-yellow-500">Series</h1>
                </div>
            </main>
      <Footer/>
    </>
  )
}

export default Series
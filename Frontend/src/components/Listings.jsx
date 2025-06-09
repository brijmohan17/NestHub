import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaStar, FaMapMarkerAlt } from 'react-icons/fa'

const Listings = () => {
  const [allListing, setAllListing] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate();

  useEffect(() => {
    const fetchListings = async () => {
      try {
        let response = await fetch("http://localhost:4000/listings", { method: 'GET' })
        let data = await response.json()
        
        setAllListing(data)
        setLoading(false)
      }
      catch (error) {
        console.log('Failed to fetch the listings', error)
        setLoading(false)
      }
    }
    fetchListings();
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#ff385c]"></div>
      </div>
    )
  }

  const handleListClick = (id) => {
    navigate(`/listings/${id}`);
  }

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">
          Discover Amazing Places to Stay
        </h1> */}
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {allListing.map((item) => (
            <div
              key={item._id}
              onClick={() => handleListClick(item._id)}
              className="bg-white rounded-xl shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
            >
              <div className="relative">
                <img
                  src={item.image?.url}
                  alt={item.title}
                  className="w-full h-48 sm:h-56 object-cover"
                />
                <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-full text-sm font-semibold text-gray-800">
                  ₹{item.price}/night
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-800 truncate">
                    {item.title}
                  </h3>
                  <div className="flex items-center">
                    <FaStar className="text-yellow-400 mr-1" />
                    <span className="text-sm text-gray-600">4.8</span>
                  </div>
                </div>

                <div className="flex items-center text-gray-600 text-sm mb-2">
                  <FaMapMarkerAlt className="mr-1" />
                  <span className="truncate">
                    {item.location}, {item.country}
                  </span>
                </div>

                {/* <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>2 guests</span>
                  <span>•</span>
                  <span>1 bedroom</span>
                  <span>•</span>
                  <span>1 bed</span>
                </div> */}
              </div>
            </div>
          ))}
        </div>

        {allListing.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No listings found</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Listings
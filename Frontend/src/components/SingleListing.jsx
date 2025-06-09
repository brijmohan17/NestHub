import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaStar, FaMapMarkerAlt } from 'react-icons/fa';
import Review from './Review';
import toast from 'react-hot-toast';

const SingleListing = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchListing = async () => {
    try {
      const response = await fetch(`http://localhost:4000/listings/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch listing');
      }
      const data = await response.json();
      setListing(data);
    } catch (err) {
      console.error('Error fetching listing:', err);
      setError('Failed to load listing. Please try again later.');
      toast.error('Failed to load listing');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListing();
  }, [id,listing]);

  const handleReviewSubmit = (updatedListing) => {
    setListing(updatedListing);
    toast.success('Review submitted successfully!');
  };

  const handleDelete = async () => {
    const loadingToast = toast.loading('Deleting listing...');
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }
      const response = await fetch(`http://localhost:4000/listings/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        toast.dismiss(loadingToast);
        toast.success('Listing deleted successfully!');
        navigate('/');
      } else {
        toast.dismiss(loadingToast);
        toast.error('Failed to delete listing');
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error('Something went wrong!');
      console.error('There is some problem in deletion:', error);
    }
  };

  const currentUser = JSON.parse(localStorage.getItem('user'));
  const isOwner =
    currentUser &&
    listing?.owner &&
    (listing.owner._id === currentUser.id || listing.owner === currentUser.id);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-8">
        <p className="text-red-500">{error}</p>
        <button
          onClick={() => navigate('/')}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Return Home
        </button>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="text-center mt-8">
        <p className="text-red-500">Listing not found</p>
        <button
          onClick={() => navigate('/')}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Return Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl">
        <img
          src={listing.image?.url}
          alt={listing.title}
          className="w-full h-[300px] object-cover rounded-lg mb-6 shadow-md"
        />
        <div className="space-y-6">
          <div>
            <h2 className="text-4xl font-bold text-gray-800 mb-2">{listing.title}</h2>
            <p className="text-gray-600">
              Owned by <span className="font-semibold text-gray-800">{listing.owner?.username}</span>
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <p className="text-lg text-gray-700 mb-4">{listing.description}</p>
            <div className="flex items-center justify-between">
              <p className="text-2xl font-bold text-gray-800">
                ₹{listing.price?.toLocaleString('en-IN')}/night
              </p>
              <p className="text-gray-600">
                {listing.location}, {listing.country}
              </p>
            </div>
          </div>

          {isOwner && (
            <div className="flex space-x-4">
              <button
                onClick={() => navigate(`/listings/${listing._id}/edit`)}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition duration-300"
              >
                Edit Listing
              </button>

              <button
                onClick={handleDelete}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition duration-300"
              >
                Delete Listing
              </button>
            </div>
          )}

          <div className="mt-8">
            <Review
              listingId={listing._id}
              reviews={listing.review}
              onReviewSubmit={handleReviewSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleListing;

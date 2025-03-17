import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

// GET ALL WISHLIST LISTINGS
const getWishlistListings = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/wishlistlistings`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

// GET A SINGLE WISHLIST LISTING
const getSingleWishlistListing = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/wishlistlistings/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

// GET A WISHLIST LISTING BY USER AND LISTING
const getWishListListingByUserAndListing = (user, listing) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/wishlistlistings?user=${user}&listing=${listing}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

// CREATE WISHLIST LISTING
const createWishlistListing = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/wishlistlistings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// UPDATE WISHLIST LISTING
const updateWishlistListing = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/wishlistlistings/${payload.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// DELETE WISHLIST LISTING
const deleteWishlistListing = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/wishlistlistings/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    // .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  getWishlistListings, getSingleWishlistListing, createWishlistListing, updateWishlistListing, deleteWishlistListing, getWishListListingByUserAndListing,
};

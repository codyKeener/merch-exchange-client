import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

// GET ALL LISTINGS
const getListings = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/listings`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

// GET A SINGLE LISTING
const getSingleListing = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/listings/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

// CREATE LISTING
const createListing = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/listings`, {
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

// UPDATE LISTING
const updateListing = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/listings/${payload.id}`, {
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

// DELETE LISTING
const deleteListing = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/listings/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    // .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// SEARCH LISTINGS
const searchListings = (searchValue) => new Promise((resolve, reject) => {
  getListings().then((listings) => {
    const filteredListings = listings.filter((listing) => listing.title.toLowerCase().includes(searchValue.toLowerCase()) || listing.category.label.toLowerCase().includes(searchValue.toLowerCase()));
    resolve(filteredListings);
  })
    .catch(reject);
});

// FILTER LISTINGS BY CATEGORY
const filterListingsByCategory = (category) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/listings?category=${category}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

// FILTER LISTINGS BY CREATED BY
const filterListingsByCreatedBy = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/listings?created_by=${uid}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

// FILTER LISTINGS BY ARTIST
const filterListingsByArtist = (artist) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/listings?artist=${artist}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

export {
  getListings, getSingleListing, createListing, updateListing, deleteListing, searchListings, filterListingsByCategory, filterListingsByCreatedBy, filterListingsByArtist,
};

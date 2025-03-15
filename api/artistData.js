import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

// GET ALL ARTISTS
const getArtists = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/artists`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

// GET A SINGLE ARTIST
const getSingleArtist = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/artists/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

// CREATE ARTIST
const createArtist = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/artists`, {
    method: 'ARTIST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// UPDATE ARTIST
const updateArtist = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/artists/${payload.id}`, {
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

// DELETE ARTIST
const deleteArtist = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/artists/${id}`, {
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
  getArtists, getSingleArtist, createArtist, updateArtist, deleteArtist,
};

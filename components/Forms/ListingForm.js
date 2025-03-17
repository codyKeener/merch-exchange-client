import React, { useEffect, useState } from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useAuth } from '../../utils/context/authContext';
import { getArtists } from '../../api/artistData';
import { getCategories } from '../../api/categoryData';
import { createListing, updateListing } from '../../api/listingData';
import ArtistForm from './ArtistForm';

const initialState = {
  title: '',
  artist: {
    id: 0,
    name: '',
    genre: '',
  },
  category: {
    id: 0,
    label: '',
  },
  description: '',
  price: '',
  size: '',
  condition: '',
  image: '',
  created_by: {
    id: 0,
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    bio: '',
    profile_pic: '',
    uid: '',
    is_admin: false,
    is_artist: false,
  },
  created_at: '',
  published: false,
  sold: false,
};

export default function ListingForm({ obj, onUpdate }) {
  const [formInput, setFormInput] = useState(initialState);
  const [artists, setArtists] = useState([]);
  const [categories, setCategories] = useState([]);
  const [sideBar, setSideBar] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    if (obj.id) {
      setFormInput({
        ...obj,
        artist: obj.artist?.id,
        category: obj.category?.id,
        created_by: obj.created_by?.uid,
      });
    }
  }, [obj]);

  useEffect(() => {
    getArtists().then(setArtists);
  }, []);

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let payload = {};

    if (obj.id) {
      payload = formInput;
    } else {
      payload = {
        ...formInput,
        created_by: user.uid,
        // created_at: Date.now(),
      };
    }

    if (obj.id) {
      updateListing(payload).then(onUpdate);
    } else {
      createListing(payload).then(onUpdate);
    }
  };

  const artistFormSubmit = () => {
    getArtists().then(setArtists);
    setSideBar(null);
  };

  const sideBarToggle = () => {
    if (sideBar === null) {
      setSideBar(
        <>
          <div style={{
            display: 'flex', minWidth: '350px', border: '2px solid #abc4c8', borderRadius: '15px',
          }}
          >
            <div style={{ width: '100%', padding: '10px' }}>
              <h3>Add a new artist</h3>
              <ArtistForm onUpdate={artistFormSubmit} />
            </div>
          </div>
        </>,
      );
    } else {
      setSideBar(null);
    }
  };

  return (
    <>
      <div id="listing-form-div" style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px',
        }}
        >
          <Form style={{ display: 'flex', flexDirection: 'column', minWidth: '600px' }} onSubmit={handleSubmit}>
            <FloatingLabel controlId="floatingInput1" label="Title" style={{ marginBottom: '5px' }}>
              <Form.Control
                type="text"
                placeholder="Enter the title of your listing"
                name="title"
                value={formInput.title}
                onChange={handleChange}
                required
              />
            </FloatingLabel>
            <FloatingLabel controlId="floatingSelect1" label="Artist" style={{ marginBottom: '5px' }}>
              <Form.Select
                type="text"
                name="artist"
                value={formInput.artist}
                onChange={handleChange}
                required
              >
                <option value="">Select an Artist</option>
                {artists.map((artist) => (
                  <option key={artist.id} value={artist.id}>{artist.name}</option>
                ))}
              </Form.Select>
              <span style={{ fontSize: '16px', marginBottom: '0px', padding: '5px 0 0 0' }}>Artist not in the list? <Button style={{ fontSize: '16px', marginBottom: '0px', padding: '0 0 0 0' }} className="button-link" onClick={sideBarToggle}>Add a new artist</Button></span>
            </FloatingLabel>
            <FloatingLabel controlId="floatingSelect2" label="Category" style={{ marginBottom: '5px' }}>
              <Form.Select
                name="category"
                value={formInput.category}
                onChange={handleChange}
                required
              >
                <option value="">Select a Category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>{category.label}</option>
                ))}
              </Form.Select>
            </FloatingLabel>
            <FloatingLabel controlId="floatingInput2" label="Description" style={{ marginBottom: '5px' }}>
              <Form.Control
                type="textarea"
                placeholder="Enter a description for your listing"
                name="description"
                value={formInput.description}
                onChange={handleChange}
                required
              />
            </FloatingLabel>
            <FloatingLabel controlId="floatingInput3" label="Price" style={{ marginBottom: '5px' }}>
              <Form.Control
                type="number"
                min="0.01"
                step="0.01"
                placeholder="How much are you selling your item for?"
                name="price"
                value={formInput.price}
                onChange={handleChange}
                required
              />
            </FloatingLabel>
            <FloatingLabel controlId="floatingInput4" label="Size" style={{ marginBottom: '5px' }}>
              <Form.Control
                type="text"
                placeholder="What is the size of your item?"
                name="size"
                value={formInput.size}
                onChange={handleChange}
                required
              />
            </FloatingLabel>
            <FloatingLabel controlId="floatingInput5" label="Condition" style={{ marginBottom: '5px' }}>
              <Form.Control
                type="text"
                placeholder="What condition is your item in?"
                name="condition"
                value={formInput.condition}
                onChange={handleChange}
                required
              />
            </FloatingLabel>
            <FloatingLabel controlId="floatingInput6" label="Image" style={{ marginBottom: '5px' }}>
              <Form.Control
                type="url"
                placeholder="Add the url for your item's image"
                name="image"
                value={formInput.image}
                onChange={handleChange}
                required
              />
            </FloatingLabel>
            <div style={{ display: 'flex' }}>
              <Button
                variant="success"
                className="add-to-cart-button"
                type="submit"
                style={{
                  marginLeft: 'auto', fontSize: '20px', border: 'none', color: '#E9EBE8',
                }}
              >{obj.id ? 'Update' : 'Create'} Listing
              </Button>
            </div>
          </Form>
        </div>
        <div id="artist-div" style={{ maxWidth: '350px' }}>{sideBar}</div>
      </div>
    </>
  );
}

ListingForm.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    artist: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      genre: PropTypes.string,
    }),
    category: PropTypes.shape({
      id: PropTypes.number,
      label: PropTypes.string,
    }),
    description: PropTypes.string,
    price: PropTypes.string,
    size: PropTypes.string,
    condition: PropTypes.string,
    image: PropTypes.string,
    created_by: PropTypes.shape({
      id: PropTypes.number,
      username: PropTypes.string,
      first_name: PropTypes.string,
      last_name: PropTypes.string,
      email: PropTypes.string,
      bio: PropTypes.string,
      profile_pic: PropTypes.string,
      uid: PropTypes.string,
      is_admin: PropTypes.bool,
      is_artist: PropTypes.bool,
    }),
    created_at: PropTypes.string,
    published: PropTypes.bool,
    sold: PropTypes.bool,
  }),
  onUpdate: PropTypes.func.isRequired,
};

ListingForm.defaultProps = {
  obj: initialState,
};

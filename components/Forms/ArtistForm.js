import { useEffect, useState } from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { createArtist, getArtists } from '../../api/artistData';

const initialState = {
  name: '',
  genre: '',
};

export default function ArtistForm({ onUpdate }) {
  const [formInput, setFormInput] = useState(initialState);
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    getArtists().then(setArtists);
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
    if (!artists.some((obj) => obj.name === formInput.name)) {
      createArtist(formInput).then(onUpdate);
    } else {
      window.confirm('The artist you are trying to create already existis');
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <FloatingLabel controlId="floatingInput1" label="Name" style={{ marginBottom: '5px' }}>
          <Form.Control
            type="text"
            placeholder="Enter the artist's name"
            name="name"
            value={formInput.name}
            onChange={handleChange}
            required
          />
        </FloatingLabel>
        <FloatingLabel controlId="floatingInput2" label="Genre" style={{ marginBottom: '5px' }}>
          <Form.Control
            type="text"
            placeholder="Enter the artist's genre"
            name="genre"
            value={formInput.genre}
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
          >Add Artist
          </Button>
        </div>
      </Form>
    </>
  );
}

ArtistForm.propTypes = {
  onUpdate: PropTypes.func.isRequired,
};

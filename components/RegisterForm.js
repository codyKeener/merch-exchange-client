import PropTypes from 'prop-types';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { registerUser } from '../utils/auth'; // Update with path to registerUser

function RegisterForm({ user, updateUser }) {
  const [formData, setFormData] = useState({
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    bio: '',
    uid: user.uid,
    is_admin: false,
    is_artist: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser(formData).then(() => updateUser(user.uid));
  };

  return (
    <Form onSubmit={handleSubmit} style={{ marginTop: '20px', fontSize: '22px' }}>

      <h3>Create your profile to start buying and selling!</h3>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Username</Form.Label>
        <Form.Control
          name="username"
          placeholder="Enter username"
          required
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>First Name</Form.Label>
        <Form.Control
          name="first_name"
          placeholder="Enter first name"
          required
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Last Name</Form.Label>
        <Form.Control
          name="last_name"
          placeholder="Enter last name"
          required
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          name="email"
          placeholder="Enter email"
          type="email"
          required
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Bio</Form.Label>
        <Form.Control
          as="textarea"
          name="bio"
          onChange={handleChange}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

RegisterForm.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
  }).isRequired,
  updateUser: PropTypes.func.isRequired,
};

export default RegisterForm;

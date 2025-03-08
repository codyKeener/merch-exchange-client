import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useRouter } from 'next/router';
import { registerUser } from '../utils/auth'; // Update with path to registerUser
import { updateUser } from '../api/userData';

const initialState = {
  id: '',
  username: '',
  first_name: '',
  last_name: '',
  email: '',
  bio: '',
  profile_pic: '',
  uid: '',
  is_admin: false,
  is_artist: false,
};
function RegisterForm({ obj, user, onUpdate }) {
  const [formData, setFormData] = useState(initialState);

  const router = useRouter();

  useEffect(() => {
    if (!obj.id) {
      setFormData({
        username: '',
        first_name: '',
        last_name: '',
        email: '',
        bio: '',
        profile_pic: '',
        uid: user.uid,
        is_admin: false,
        is_artist: false,
      });
    } else {
      setFormData({ ...obj, id: obj.id, uid: obj.uid });
    }
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!obj.id) {
      registerUser(formData).then(() => onUpdate(user.uid));
    } else {
      updateUser(formData).then(() => router.push(`/profile/${obj.uid}`));
    }
  };

  return (
    <Form onSubmit={handleSubmit} style={{ marginTop: '20px', fontSize: '22px' }}>

      <h3>Create your profile to start buying and selling!</h3>
      <Form.Group className="mb-3" controlId="formBasicUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control
          name="username"
          placeholder="Enter username"
          required
          onChange={handleChange}
          value={formData.username}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicFirstName">
        <Form.Label>First Name</Form.Label>
        <Form.Control
          name="first_name"
          placeholder="Enter first name"
          required
          onChange={handleChange}
          value={formData.first_name}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicLastName">
        <Form.Label>Last Name</Form.Label>
        <Form.Control
          name="last_name"
          placeholder="Enter last name"
          required
          onChange={handleChange}
          value={formData.last_name}
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
          value={formData.email}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicBio">
        <Form.Label>Bio</Form.Label>
        <Form.Control
          as="textarea"
          name="bio"
          onChange={handleChange}
          value={formData.bio}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicProfilePic">
        <Form.Label>Profile Pic</Form.Label>
        <Form.Control
          name="profile_pic"
          type="url"
          placeholder="Enter URL for your Profile Pic"
          onChange={handleChange}
          value={formData.profile_pic}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

RegisterForm.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    username: PropTypes.string.isRequired,
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    bio: PropTypes.string,
    profile_pic: PropTypes.string,
    uid: PropTypes.string.isRequired,
    is_admin: PropTypes.bool,
    is_artist: PropTypes.bool,
  }),
  user: PropTypes.shape({
    uid: PropTypes.string,
  }),
  onUpdate: PropTypes.func.isRequired,
};

RegisterForm.defaultProps = {
  obj: initialState,
  user: {
    uid: '',
  },
};

export default RegisterForm;

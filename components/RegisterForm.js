import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
// import { useRouter } from 'next/router';
import { registerUser } from '../utils/auth'; // Update with path to registerUser
import { updateUser } from '../api/userData';

const initialState = {
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
};
function RegisterForm({ obj, user, onUpdate }) {
  const [formData, setFormData] = useState(initialState);

  // const router = useRouter();

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
      updateUser(formData).then(() => onUpdate());
    }
  };

  return (
    <>
      <div style={{ display: 'flex', width: '100%', flex: '1 1 auto' }}>
        <Form
          onSubmit={handleSubmit}
          style={{
            fontSize: '22px', fontFamily: '"League Spartan", serif', display: 'flex', flexDirection: 'column', width: '100%', flex: '1 1 auto',
          }}
        >

          <h3>Create your profile to start buying and selling!</h3>
          {!obj.id ? (
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label style={{ marginBottom: '1px' }}>Username</Form.Label>
              <Form.Control
                name="username"
                placeholder="Enter username"
                required
                onChange={handleChange}
                value={formData.username}
              />
            </Form.Group>
          )
            : ''}

          <Form.Group className="mb-3" controlId="formBasicFirstName">
            <Form.Label style={{ marginBottom: '1px' }}>First Name</Form.Label>
            <Form.Control
              name="first_name"
              placeholder="Enter first name"
              required
              onChange={handleChange}
              value={formData.first_name}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicLastName">
            <Form.Label style={{ marginBottom: '1px' }}>Last Name</Form.Label>
            <Form.Control
              name="last_name"
              placeholder="Enter last name"
              required
              onChange={handleChange}
              value={formData.last_name}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label style={{ marginBottom: '1px' }}>Email</Form.Label>
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
            <Form.Label style={{ marginBottom: '1px' }}>Bio</Form.Label>
            <Form.Control
              as="textarea"
              name="bio"
              onChange={handleChange}
              value={formData.bio}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicProfilePic">
            <Form.Label style={{ marginBottom: '1px' }}>Profile Pic</Form.Label>
            <Form.Control
              name="profile_pic"
              type="url"
              placeholder="Enter URL for your Profile Pic"
              onChange={handleChange}
              value={formData.profile_pic}
            />
          </Form.Group>
          <div style={{ display: 'flex', justifyContent: 'right' }}>
            <Button className="button-link" type="submit">
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </>
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

import PropTypes from 'prop-types';
import { Button, Image } from 'react-bootstrap';
// import { useAuth } from '../utils/context/authContext';

export default function ProfileCard({ profileObj, onEdit }) {
  // const { user } = useAuth();

  return (
    <>
      <div
        style={{
          flex: '1 1 auto', display: 'flex', flexDirection: 'column', flexWrap: 'wrap', margin: '5px 0px 0px 10px',
        }}
      >
        <div
          style={{
            width: '100%', display: 'flex', flexWrap: 'wrap', gap: '10px',
          }}
        >
          <div style={{ marginRight: '10px' }}>
            <Image src={profileObj.profile_pic !== '' ? profileObj.profile_pic : '/blank-profile-picture.png'} style={{ width: '350px', height: '350px' }} />
            <h1 style={{ marginTop: '10px' }}>{profileObj.username}</h1>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', fontSize: '24px' }}>
            <p> <strong>Bio:</strong> {profileObj.bio}</p>
            <p>{onEdit !== '' ? <><strong>First Name:</strong> {profileObj.first_name}</> : ''}</p>
            <p>{onEdit !== '' ? <><strong>Last Name:</strong> {profileObj.last_name}</> : ''}</p>
            <p>{onEdit !== '' ? <><strong>Email:</strong> {profileObj.email}</> : ''}</p>
            <p>{onEdit !== '' ? <><strong>Primary shipping address:</strong> none added!</> : ''}</p>
            <p>{onEdit !== '' ? <><strong>Primary billing address:</strong> none added!</> : ''}</p>
          </div>
        </div>
        <div
          style={{
            display: 'flex', width: '100%', justifyContent: 'right', marginTop: 'auto',
          }}
        >
          {onEdit !== '' ? <Button className="button-link" onClick={onEdit}>Edit</Button> : ''}
        </div>
      </div>
    </>
  );
}

ProfileCard.propTypes = {
  profileObj: PropTypes.shape({
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
  }).isRequired,
  onEdit: PropTypes.func,
};

ProfileCard.defaultProps = {
  onEdit: '',
};

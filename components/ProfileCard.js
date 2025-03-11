import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Button, Image } from 'react-bootstrap';
import { filterListingsByCreatedBy } from '../api/listingData';
import ListingTable from './ListingTable';

const initialState = () => {
  console.warn('initial state');
};

export default function ProfileCard({ profileObj, onEdit }) {
  const [userListings, setUserListings] = useState([]);

  useEffect(() => {
    if (onEdit === initialState) {
      filterListingsByCreatedBy(profileObj.uid).then(setUserListings);
    }
  }, []);

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
          <div style={{ marginRight: '10px', width: '350px' }}>
            <Image src={profileObj.profile_pic !== '' ? profileObj.profile_pic : '/blank-profile-picture.png'} style={{ width: '350px', height: '350px', borderRadius: '15px' }} />
            <h1 style={{ marginTop: '10px' }}>{profileObj.username}</h1>
            {onEdit === initialState ? <><p style={{ fontSize: '24px' }}><strong>Bio:</strong> {profileObj.bio}</p></> : ''}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', fontSize: '24px' }}>
            <p>{onEdit !== initialState ? <><strong>Bio:</strong> {profileObj.bio}</> : '' }</p>
            {userListings?.length > 0 ? (
              <>
                <div className="flexdiv-column" style={{ margin: '-15px 0 0 20px', gap: '15px' }}>
                  <h4>{profileObj.username}&apos;s Items for Sale:</h4>
                  {userListings.map((listing) => (
                    <ListingTable listing={listing} />
                  ))}
                </div>
              </>
            ) : ''}
            <p>{onEdit !== initialState ? <><strong>First Name:</strong> {profileObj.first_name}</> : ''}</p>
            <p>{onEdit !== initialState ? <><strong>Last Name:</strong> {profileObj.last_name}</> : ''}</p>
            <p>{onEdit !== initialState ? <><strong>Email:</strong> {profileObj.email}</> : ''}</p>
            <p>{onEdit !== initialState ? <><strong>Primary shipping address:</strong> none added!</> : ''}</p>
            <p>{onEdit !== initialState ? <><strong>Primary billing address:</strong> none added!</> : ''}</p>
          </div>
        </div>
        <div
          style={{
            display: 'flex', width: '100%', justifyContent: 'right', marginTop: 'auto',
          }}
        >
          {onEdit !== initialState ? <Button className="button-link" onClick={onEdit}>Edit</Button> : ''}
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
  onEdit: initialState,
};

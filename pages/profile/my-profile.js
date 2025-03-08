import { Button, Image } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../utils/context/authContext';
import { getUserByUid } from '../../api/userData';
import { signOut } from '../../utils/auth';
import { filterListingsByCreatedBy } from '../../api/listingData';

const initialState = [
  {
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
];

export default function Profile() {
  const router = useRouter();
  const { user } = useAuth();
  const [userDetails, setUserDetails] = useState(initialState);
  const [profileWindow, setProfileWindow] = useState('');
  const [userListings, setUserListings] = useState([]);

  const getTheUser = () => {
    getUserByUid(user.uid).then((theUser) => {
      setUserDetails(theUser[0]);
    });
  };

  const getUserListings = () => {
    filterListingsByCreatedBy(user.uid).then(setUserListings);
  };

  const signOutUser = () => {
    signOut();
    router.push('/');
  };

  useEffect(() => {
    getTheUser();
  }, []);

  // CHECK IF USER PROFILE HAS BEEN CREATED AND ROUTE BACK TO LOGIN PAGE IF NOT
  useEffect(() => {
    if (!user.username) {
      router.push('/profile/login');
    }
  }, [user]);

  useEffect(() => {
    getUserListings();
  }, [user]);

  const myprofile = (
    <div id="profile-window-my-profile">
      <Image src={userDetails.profile_pic} style={{ width: '400px', height: '400px' }} />
      <h2>{userDetails.username}</h2>
      <p>{userDetails.bio}</p>
    </div>
  );

  const orderhistory = (
    <div id="profile-window-order-history">
      <h4>No orders placed yet!</h4>
    </div>
  );

  const mylistings = (
    <div id="profile-window-my-listings">
      {userListings.length > 0 ? userListings.map((listing) => (<h4>{listing.title}</h4>)) : <h4>You haven&apos;t listed any items for sale yet!</h4>}
    </div>
  );

  useEffect(() => {
    setProfileWindow(myprofile);
  }, [userDetails]);

  const updateProfileWindow = (window) => {
    if (window === 'myprofile') {
      setProfileWindow(myprofile);
    } else if (window === 'orderhistory') {
      setProfileWindow(orderhistory);
    } else if (window === 'mylistings') {
      setProfileWindow(mylistings);
    }
  };

  return (
    <>
      <div
        id="profile-container"
        style={{
          minHeight: '500px', display: 'flex', marginTop: '40px', gap: '150px',
        }}
      >
        <div
          id="profile-nav"
          style={{
            display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'start', backgroundColor: '#777777', borderRadius: '15px', padding: '15px',
          }}
        >
          <div
            style={{
              display: 'flex', flexDirection: 'column', alignItems: 'start',
            }}
          >
            <Button variant="none" className="button-link" onClick={() => updateProfileWindow('myprofile')}>My Profile</Button>
            <Button variant="none" className="button-link" onClick={() => updateProfileWindow('orderhistory')}>Order History</Button>
            <Button variant="none" className="button-link" onClick={() => updateProfileWindow('mylistings')}>My Listings</Button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
            <Button variant="none" className="button-link" onClick={signOutUser}>Sign Out</Button>
          </div>
        </div>
        <div id="profile-window">
          {profileWindow}
        </div>
      </div>
    </>
  );
}

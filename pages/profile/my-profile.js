import { Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../utils/context/authContext';
import { getUserByUid } from '../../api/userData';
import { signOut } from '../../utils/auth';
import { filterListingsByCreatedBy } from '../../api/listingData';
import ProfileCard from '../../components/ProfileCard';
import RegisterForm from '../../components/RegisterForm';

const initialState = {
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
    if (user.username) {
      filterListingsByCreatedBy(user.uid).then(setUserListings);
    }
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
    if (!user.username && user.uid) {
      router.push('/profile/login');
    }
  }, [user]);

  useEffect(() => {
    getUserListings();
  }, [user]);

  const registerform = (
    <div id="profile-window-register-form" style={{ display: 'flex', width: '100%', flex: '1 1 auto' }}>
      <RegisterForm obj={userDetails} onUpdate={getTheUser} />
    </div>
  );

  const myprofile = (
    <div id="profile-window-my-profile" style={{ display: 'flex', width: '100%', flex: '1 1 auto' }}>
      <ProfileCard profileObj={userDetails} onEdit={() => setProfileWindow(registerform)} />
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

  const setActive = (buttonId) => {
    const myprofileBtn = document.getElementById('myprofile-btn');
    const orderhistoryBtn = document.getElementById('orderhistory-btn');
    const mylistingsBtn = document.getElementById('mylistings-btn');
    myprofileBtn.className = 'button-link';
    orderhistoryBtn.className = 'button-link';
    mylistingsBtn.className = 'button-link';
    const activeElementId = `${buttonId}-btn`;
    const activeElement = document.getElementById(activeElementId);
    activeElement.className = 'active-button-link';
  };

  const resetProfile = () => {
    if (user.username) {
      setProfileWindow(myprofile);
      setActive('myprofile');
    }
  };

  // SET THE PROFILE WINDOW TO BE MY PROFILE BY DEFAULT
  useEffect(() => {
    resetProfile();
  }, [userDetails]);

  const updateProfileWindow = (window) => {
    if (window === 'myprofile') {
      setProfileWindow(myprofile);
    } else if (window === 'orderhistory') {
      setProfileWindow(orderhistory);
    } else if (window === 'mylistings') {
      setProfileWindow(mylistings);
    } else if (window === 'editprofile') {
      setProfileWindow(registerform);
    }
    setActive(window);
  };

  return (
    <>
      <div
        id="profile-container"
        style={{
          minHeight: '500px', display: 'flex', marginTop: '40px', gap: '100px',
        }}
      >
        <div
          id="profile-nav"
          style={{
            minWidth: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'start', backgroundColor: '#000000', borderRadius: '15px', padding: '15px',
          }}
        >
          <div
            style={{
              display: 'flex', flexDirection: 'column', alignItems: 'start',
            }}
          >
            <Button variant="none" id="myprofile-btn" className="button-link" onClick={() => updateProfileWindow('myprofile')}>My Profile</Button>
            <Button variant="none" id="orderhistory-btn" className="button-link" onClick={() => updateProfileWindow('orderhistory')}>Order History</Button>
            <Button variant="none" id="mylistings-btn" className="button-link" onClick={() => updateProfileWindow('mylistings')}>My Listings</Button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
            <Button variant="none" className="button-link" onClick={signOutUser}>Sign Out</Button>
          </div>
        </div>
        <div
          id="profile-window"
          style={{
            width: '100%', minHeight: '600px', display: 'flex', alignItems: 'space-between', backgroundColor: '#000000', borderRadius: '15px', padding: '15px', flexWrap: 'wrap',
          }}
        >
          {profileWindow}
        </div>
      </div>
    </>
  );
}

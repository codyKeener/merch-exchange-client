import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getUserByUid } from '../../api/userData';
import ProfileCard from '../../components/ProfileCard';

const initialState = {
  username: '',
  first_name: '',
  last_name: '',
  email: '',
  bio: '',
  uid: '',
  is_admin: false,
  is_artist: false,
};

export default function Profile() {
  const router = useRouter();
  const { uid } = router.query;
  const [userDetails, setUserDetails] = useState(initialState);

  const getTheUser = () => {
    getUserByUid(uid).then((theUser) => {
      setUserDetails(theUser[0]);
    });
  };

  useEffect(() => {
    getTheUser();
  }, []);

  if (userDetails.username === '') {
    return (<p>Loading...</p>);
  }

  if (userDetails.username !== '') {
    return (
      <ProfileCard profileObj={userDetails} />
    );
  }
}

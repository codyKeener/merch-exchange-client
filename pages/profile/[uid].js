import { Button, Card } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../../utils/context/authContext';
import { getUserByUid } from '../../api/userData';
import { signOut } from '../../utils/auth';
import Signin from '../../components/Signin';

const initialState = [
  {
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    bio: '',
    uid: '',
    is_admin: false,
    is_artist: false,
  },
];

export default function Profile() {
  const router = useRouter();
  const { uid } = router.query;
  const { user } = useAuth();
  const [userDetails, setUserDetails] = useState(initialState);

  const getTheUser = () => {
    getUserByUid(uid).then((theUser) => {
      setUserDetails(theUser[0]);
    });
  };

  const signOutUser = () => {
    signOut();
    router.push('/');
  };

  useEffect(() => {
    getTheUser();
  }, []);

  useEffect(() => {
    if (!user.username) {
      router.push('/profile/login');
    }
  }, [user]);

  return (
    <>
      {user.username ? (
        <>
          <Card style={{ width: '15rem', marginTop: '20px' }}>
            <Card.Body>
              <Card.Title>{userDetails.username}</Card.Title>
              <p className="card-text bold">Bio: {userDetails.bio}</p>
              <div style={{ display: 'flex', justifyContent: 'right' }}>
                {userDetails.uid === user.uid ? <Link href={`/profile/edit/${user.uid}`} passHref><Button variant="secondary">Edit</Button></Link> : ''}
              </div>
            </Card.Body>
          </Card>
          <div>
            <Button className="button-link" onClick={signOutUser}>Sign Out</Button>
          </div>
        </>
      )
        : <Signin />}
    </>
  );
}

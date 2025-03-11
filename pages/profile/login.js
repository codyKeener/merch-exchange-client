import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Signin from '../../components/Signin';
import { useAuth } from '../../utils/context/authContext';
import RegisterForm from '../../components/RegisterForm';

export default function LogIn() {
  const { user, updateUser } = useAuth();
  const router = useRouter();

  // CHECK IF USER PROFILE HAS BEEN CREATED AND ROUTE TO USER'S PROFILE PAGE IF SO
  useEffect(() => {
    if (user.username) {
      router.push('/profile/my-profile');
    }
  }, [user]);

  const goToUserProfile = () => {
    updateUser(user.uid);
    router.push('/profile/my-profile');
  };

  return (
    <>
      <div style={{ marginTop: '20px' }}>
        {/* IF THE USER EXISTS IN FIREBASE BUT THE PROFILE HAS NOT BEEN CREATED YET, RENDER THE REGISTER FORM. IF THERE IS NO USER FOUND, RENDER THE SIGN IN BUTTON */}
        {user && !user.username ? <RegisterForm user={user} onUpdate={goToUserProfile} /> : <Signin />}
      </div>
    </>
  );
}

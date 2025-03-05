import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Signin from '../../components/Signin';
import { useAuth } from '../../utils/context/authContext';
import RegisterForm from '../../components/RegisterForm';

export default function LogIn() {
  const { user, updateUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user.username) {
      router.push(`/profile/${user.uid}`);
    }
  }, [user]);

  const goToUserProfile = () => {
    updateUser(user.uid);
    router.push(`/profile/${user.uid}`);
  };

  return (
    <>
      {user && !user.username ? <RegisterForm user={user} onUpdate={goToUserProfile} /> : <Signin />}
    </>
  );
}

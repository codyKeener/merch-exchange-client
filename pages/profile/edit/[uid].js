import { useEffect, useState } from 'react';
import RegisterForm from '../../../components/RegisterForm';
import { getUserByUid } from '../../../api/userData';
import { useAuth } from '../../../utils/context/authContext';

export default function EditProfile() {
  const [userDetails, setUserDetails] = useState({});
  const { user } = useAuth();

  const getTheUser = () => {
    getUserByUid(user.uid).then((theUser) => {
      setUserDetails(theUser[0]);
    });
  };

  useEffect(() => {
    getTheUser();
  }, [user]);

  return (
    <RegisterForm obj={userDetails} onUpdate={() => console.warn('updated')} />
  );
}

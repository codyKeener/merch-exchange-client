import PropTypes from 'prop-types';
import { useAuth } from './context/authContext';
import Loading from '../components/Loading';
// import Signin from '../components/Signin';
import NavBar from '../components/NavBar';
// import RegisterForm from '../components/RegisterForm';

const ViewDirectorBasedOnUserAuthStatus = ({ component: Component, pageProps }) => {
  // const { user, userLoading, updateUser } = useAuth();
  const { userLoading } = useAuth();

  // if user state is null, then show loader
  if (userLoading) {
    return <Loading />;
  }

  // if (user && !user.username) {
  //   return (
  //     <div className="container">{'valid' in user ? <RegisterForm user={user} onUpdate={updateUser} /> : <Component {...pageProps} />}</div>
  //   );
  // }

  return (
    <>
      <NavBar />
      <div className="container"><Component {...pageProps} /></div>
    </>
  );

  // what the user should see if they are logged in
  // if (user) {
  //   return (
  //     <>
  //       <NavBar /> {/* NavBar only visible if user is logged in and is in every view */}
  //       <div className="container">{'valid' in user ? <RegisterForm user={user} onUpdate={updateUser} /> : <Component {...pageProps} />}</div>
  //     </>
  //   );
  // }

  // return <Signin />;
};

export default ViewDirectorBasedOnUserAuthStatus;

ViewDirectorBasedOnUserAuthStatus.propTypes = {
  component: PropTypes.func.isRequired,
  pageProps: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

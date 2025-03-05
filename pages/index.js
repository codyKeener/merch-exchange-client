// import { Button } from 'react-bootstrap';
// import { signOut } from '../utils/auth';
// import { useAuth } from '../utils/context/authContext';
import ListingCarousel from '../components/ListingCarousel';

function Home() {
  // const { user } = useAuth();
  return (
    <>
      <div
        className="text-center d-flex flex-column justify-content-center align-content-center"
        style={{
          height: '90vh',
          padding: '30px',
          maxWidth: '400px',
          margin: '0 auto',
        }}
      >
        <ListingCarousel />
        <h1>Welcome to Merch Exchange!</h1>
      </div>
    </>
  );
}

export default Home;

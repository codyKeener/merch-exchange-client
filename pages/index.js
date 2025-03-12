// import { Button } from 'react-bootstrap';
// import { signOut } from '../utils/auth';
// import { useAuth } from '../utils/context/authContext';
import ListingCarousel from '../components/ListingCarousel';

function Home() {
  // const { user } = useAuth();
  return (
    <>
      <div className="flexdiv-column" style={{ justifyContent: 'center', alignItems: 'center', paddingTop: '20px' }}>
        <h1 style={{ paddingBottom: '20px' }}>Welcome to Merch Exchange!</h1>
        <ListingCarousel />
      </div>
    </>
  );
}

export default Home;

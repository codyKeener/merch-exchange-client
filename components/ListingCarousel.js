import { useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { getListings } from '../api/listingData';
import ListingCard from './ListingCard';

function ListingCarousel() {
  const [listings, setListings] = useState([]);

  const getFiveListings = () => {
    getListings().then((allListings) => {
      const newListings = allListings.slice(0, 5);
      setListings(newListings);
    });
  };

  useEffect(() => {
    getFiveListings();
  }, []);

  return (
    <Carousel data-bs-theme="dark" style={{ width: '500px', paddingBottom: '45px' }}>
      {listings.map((listing) => (
        <Carousel.Item key={listing.id}>
          <ListingCard listingObj={listing} cardSize="500px" />
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default ListingCarousel;

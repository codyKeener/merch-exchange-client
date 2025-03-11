import { useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
// import { Image } from 'react-bootstrap';
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
    <Carousel style={{ width: '350px', paddingBottom: '45px' }}>
      {listings.map((listing) => (
        <Carousel.Item key={listing.id}>
          {/* <Image src={listing.image} />
          <Carousel.Caption>
            <h2>{listing.title}</h2>
          </Carousel.Caption> */}
          <ListingCard listingObj={listing} />
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default ListingCarousel;

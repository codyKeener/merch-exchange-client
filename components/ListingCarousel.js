import { useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { Image } from 'react-bootstrap';
import { getListings } from '../api/listingData';

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
    <Carousel>
      {listings.map((listing) => (
        <Carousel.Item key={listing.id}>
          <Image src={listing.image} />
          <Carousel.Caption>
            <h2>{listing.title}</h2>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default ListingCarousel;

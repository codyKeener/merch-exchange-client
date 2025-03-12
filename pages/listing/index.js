import { useEffect, useState } from 'react';
// import { Image } from 'react-bootstrap';
// import Link from 'next/link';
import { useRouter } from 'next/router';
import { filterListingsByArtist, filterListingsByCategory, getListings } from '../../api/listingData';
import ListingCard from '../../components/ListingCard';

export default function ProductsPage() {
  const router = useRouter();
  const { category, artist } = router.query;
  const [listings, setListings] = useState([]);

  const getTheListings = () => {
    if (category) {
      filterListingsByCategory(category).then(setListings);
    } else if (artist) {
      filterListingsByArtist(artist).then(setListings);
    } else {
      getListings().then(setListings);
    }
  };

  useEffect(() => {
    getTheListings();
  }, []);

  return (
    <>
      <div
        style={{
          width: '100%', display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center',
        }}
      >
        {listings.map((listing) => (
          <ListingCard key={listing.id} listingObj={listing} cardSize="300px" />
        ))}
      </div>
    </>
  );
}

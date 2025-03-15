import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { filterListingsByArtist, filterListingsByCategory, getListings } from '../../api/listingData';
import ListingCard from '../../components/ListingCard';
import { getSingleCategory } from '../../api/categoryData';
import { getSingleArtist } from '../../api/artistData';

export default function ProductsPage() {
  const router = useRouter();
  const { category, artist } = router.query;
  const [listings, setListings] = useState([]);
  const [noListingText, setNoListingText] = useState('');

  const getTheListings = () => {
    if (category) {
      filterListingsByCategory(category).then((categoryListings) => {
        setListings(categoryListings);
        getSingleCategory(category).then((theCategory) => {
          if (categoryListings.length === 0) {
            setNoListingText(<><span>There are no items listed in the <strong>{theCategory.label}</strong> category yet!</span></>);
          }
        });
      });
    } else if (artist) {
      filterListingsByArtist(artist).then((artistListings) => {
        setListings(artistListings);
        getSingleArtist(artist).then((theArtist) => {
          if (artistListings.length === 0) {
            setNoListingText(<><span>There are no items listed for <strong>{theArtist.name}</strong> yet!</span></>);
          }
        });
      });
    } else {
      getListings().then(setListings);
    }
  };

  useEffect(() => {
    getTheListings();
  }, []);

  return (
    <>
      {listings.length > 0 ? (
        <div
          style={{
            width: '100%', display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center',
          }}
        >
          {listings.map((listing) => (
            <ListingCard key={listing.id} listingObj={listing} cardSize="300px" />
          ))}
        </div>
      )
        : <><div style={{ display: 'flex', justifyContent: 'center', fontSize: '24px' }}>{noListingText}</div></>}
    </>
  );
}

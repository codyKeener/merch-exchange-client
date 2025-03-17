import Link from 'next/link';
import PropTypes from 'prop-types';
import { Button, Image } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAuth } from '../utils/context/authContext';
import { deleteListing } from '../api/listingData';
import { getUserByUid } from '../api/userData';
import { createWishlistListing, deleteWishlistListing, getWishListListingByUserAndListing } from '../api/wishlistListingData';

const initialState = () => {
  console.warn('initial state');
};

const initialUserState = {
  username: '',
  first_name: '',
  last_name: '',
  email: '',
  bio: '',
  profile_pic: '',
  uid: '',
  is_admin: false,
  is_artist: false,
  wishlist_listings: [],
};

export default function ListingTable({ listing, onUpdate, canEdit }) {
  const { user } = useAuth();
  const router = useRouter();
  const [userDetails, setUserDetails] = useState(initialUserState);
  const [isListingRefresh, setIsListingRefresh] = useState(false);

  const getTheUser = () => {
    getUserByUid(user.uid).then((theUser) => {
      setUserDetails(theUser[0]);
    });
  };

  useEffect(() => {
    getTheUser();
  }, []);

  const deleteThisListing = () => {
    if (window.confirm('Delete this listing?')) {
      deleteListing(listing.id).then(onUpdate);
    }
  };

  // REFRESH THE LISTING DATA IF ITEM HAS BEEN ADDED OR REMOVED FROM WISHLIST
  useEffect(() => {
    if (isListingRefresh) {
      getTheUser();
      setIsListingRefresh(false);
      onUpdate();
    }
  }, [isListingRefresh]);

  const handleWishlist = async () => {
    if (userDetails.wishlist_listings?.some((obj) => obj.id === listing.id)) {
      const wishlistListing = await getWishListListingByUserAndListing(userDetails.id, listing.id);
      if (wishlistListing.length > 0) {
        await deleteWishlistListing(wishlistListing[0].id);
      }
    } else {
      const payload = {
        user: userDetails.id,
        listing: listing.id,
      };
      await createWishlistListing(payload);
    }
    setIsListingRefresh(true);
  };

  return (
    <>
      <div style={{
        display: 'flex', border: '1px solid #abc4c8', backgroundColor: '#000000', justifyContent: 'space-between', borderRadius: '15px', marginBottom: '5px',
      }}
      >
        <div style={{ display: 'flex' }}>
          <Link passHref href={`/listings/${listing.id}`}>
            <Image
              className="link"
              style={{
                width: '150px', height: '150px', objectFit: 'cover', borderRadius: '15px',
              }}
              src={listing.image}
            />
          </Link>
          <div style={{ margin: '0 15px 0 15px', paddingTop: '10px' }}>
            <Link passHref href={`/listings/${listing.id}`}>
              <h3 className="link">{listing.title}</h3>
            </Link>
            <Link passHref href={`/listings?artist=${listing.artist?.id}`}>
              <h4 className="link">{listing.artist?.name}</h4>
            </Link>
            <p>${listing.price}</p>
          </div>
        </div>
        <div style={{
          display: 'flex', gap: '15px', alignItems: 'end', padding: '0 15px 15px',
        }}
        >
          {canEdit && user.uid === listing.created_by?.uid ? <Button onClick={() => router.push(`/listings/edit/${listing.id}`)} className="button-link">Edit</Button> : <>{userDetails.wishlist_listings?.some((obj) => obj.id === listing.id) ? <Button className="button-link" onClick={handleWishlist}>Remove from Wishlist</Button> : ''}</>}
          {canEdit && user.uid === listing.created_by?.uid ? <Button onClick={deleteThisListing} className="button-link">Delete</Button> : ''}
        </div>
      </div>
    </>
  );
}

ListingTable.propTypes = {
  listing: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    artist: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      genre: PropTypes.string,
    }),
    category: PropTypes.shape({
      id: PropTypes.number,
      label: PropTypes.string,
    }),
    description: PropTypes.string,
    price: PropTypes.string,
    size: PropTypes.string,
    condition: PropTypes.string,
    image: PropTypes.string,
    created_by: PropTypes.shape({
      id: PropTypes.number,
      username: PropTypes.string,
      first_name: PropTypes.string,
      last_name: PropTypes.string,
      email: PropTypes.string,
      bio: PropTypes.string,
      profile_pic: PropTypes.string,
      uid: PropTypes.string,
      is_admin: PropTypes.bool,
      is_artist: PropTypes.bool,
    }),
    created_at: PropTypes.string,
    published: PropTypes.bool,
    sold: PropTypes.bool,
  }).isRequired,
  onUpdate: PropTypes.func,
  canEdit: PropTypes.number.isRequired,
};

ListingTable.defaultProps = {
  onUpdate: initialState,
};

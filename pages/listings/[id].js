import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Button, Image } from 'react-bootstrap';
import Link from 'next/link';
import { getSingleListing } from '../../api/listingData';
import { useAuth } from '../../utils/context/authContext';
import { getUserByUid } from '../../api/userData';
import { createWishlistListing, deleteWishlistListing, getWishListListingByUserAndListing } from '../../api/wishlistListingData';

const initialState = {
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

export default function ListingDetailsPage() {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();
  const [listingData, setListingData] = useState({});
  const [userDetails, setUserDetails] = useState(initialState);
  const [isListingRefresh, setIsListingRefresh] = useState(false);

  const getTheUser = () => {
    getUserByUid(user.uid).then((theUser) => {
      setUserDetails(theUser[0]);
    });
  };

  useEffect(() => {
    getTheUser();
  }, []);

  const getTheListing = () => {
    getSingleListing(id).then(setListingData);
  };

  useEffect(() => {
    getTheListing();
  }, [id]);

  const handleWishlist = async () => {
    if (userDetails.wishlist_listings?.some((obj) => obj.id === listingData.id)) {
      const wishlistListing = await getWishListListingByUserAndListing(userDetails.id, listingData.id);
      if (wishlistListing.length > 0) {
        await deleteWishlistListing(wishlistListing[0].id);
      }
    } else {
      const payload = {
        user: userDetails.id,
        listing: listingData.id,
      };
      await createWishlistListing(payload);
    }
    setIsListingRefresh(true);
  };

  // REFRESH THE LISTING DATA IF ITEM HAS BEEN ADDED OR REMOVED FROM WISHLIST
  useEffect(() => {
    if (isListingRefresh) {
      getTheUser();
      getTheListing();
      setIsListingRefresh(false);
    }
  }, [isListingRefresh]);

  return (
    <>
      <div style={{ display: 'flex', gap: '25px' }}>
        <div>
          <Image src={listingData.image} style={{ height: '600px' }} />
        </div>
        <div className="flexdiv-column">
          <div style={{ gap: '20px', marginBottom: '30px' }}>
            <h1>{listingData.title}</h1>
            <h3>${listingData.price}</h3>
            <div style={{ display: 'flex' }}>
              <h4>From artist </h4>
              <Link passHref href={`/listings?artist=${listingData.artist?.id}`}>
                <h4 className="link" style={{ marginLeft: '7px' }}>{listingData.artist?.name}</h4>
              </Link>
            </div>
          </div>
          {user.uid !== listingData.created_by?.uid ? (
            <>
              <Button onClick={handleWishlist} style={{ display: 'flex', maxWidth: '330px', padding: '0px' }} className="button-link">{!userDetails.wishlist_listings?.some((obj) => obj.id === listingData.id) ? 'Add to Wishlist' : 'Remove from Wishlist'}</Button>
            </>
          ) : ''}
          {listingData.created_by?.uid === user.uid ? <Button style={{ margin: '30px 0 30px' }} className="add-to-cart-button" disabled>Add to Cart</Button> : <Button style={{ margin: '30px 0 30px' }} className="add-to-cart-button">Add to Cart</Button>}
          <p style={{ fontSize: '22px' }}>{listingData.description}</p>
          <div>
            <p style={{ fontSize: '18px' }}>Sold by: <Link passHref href={`/profile/${listingData.created_by?.uid}`}><span className="link">{listingData.created_by?.username}</span></Link></p>
          </div>
        </div>
      </div>
    </>
  );
}

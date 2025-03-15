import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Button, Image } from 'react-bootstrap';
import Link from 'next/link';
import { getSingleListing } from '../../api/listingData';
import { useAuth } from '../../utils/context/authContext';

export default function ListingDetailsPage() {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();
  const [listingData, setListingData] = useState({});

  useEffect(() => {
    getSingleListing(id).then(setListingData);
  }, [id]);

  return (
    <>
      <div style={{ display: 'flex', gap: '25px' }}>
        <div>
          <Image src={listingData.image} style={{ width: '600px', height: '600px' }} />
        </div>
        <div className="flexdiv-column">
          <div style={{ gap: '20px', marginBottom: '30px' }}>
            <h1>{listingData.title}</h1>
            <h3>${listingData.price}</h3>
            <h4>From artist {listingData.artist?.name}</h4>
          </div>
          {listingData.created_by?.uid === user.uid ? <Button className="add-to-cart-button" disabled>Add to Cart</Button> : <Button className="add-to-cart-button">Add to Cart</Button>}
          <p style={{ marginTop: '30px' }}>{listingData.description}</p>
          <div>
            <p>Sold by: <Link passHref href={`/profile/${listingData.created_by?.uid}`}><span className="link">{listingData.created_by?.username}</span></Link></p>
          </div>
        </div>
      </div>
    </>
  );
}

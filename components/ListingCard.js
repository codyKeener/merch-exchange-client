import { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { getSingleListing } from '../api/listingData';

export default function ListingCard({ listingObj, cardSize }) {
  const [listingData, setListingData] = useState({});

  useEffect(() => {
    getSingleListing(listingObj.id).then((listing) => {
      setListingData(listing);
    });
  }, [listingObj]);

  return (
    <Card style={{ width: cardSize, backgroundColor: '#000000', color: '#ffffff' }}>
      <Card.Img layout="responsive" src={listingData.image} style={{ width: cardSize, height: cardSize, objectFit: 'cover' }} />
      <Card.Body>
        <Link passHref href={`listings/${listingData.id}`}>
          <div className="link">
            <Card.Title>{listingData.artist?.name} - {listingData.title}</Card.Title>
          </div>
        </Link>
        <Card.Text>${listingData.price}</Card.Text>
      </Card.Body>
    </Card>
  );
}

ListingCard.propTypes = {
  listingObj: PropTypes.shape({
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
  cardSize: PropTypes.string.isRequired,
};

import Link from 'next/link';
import PropTypes from 'prop-types';
import { Image } from 'react-bootstrap';

export default function ListingTable({ listing }) {
  return (
    <>
      <Link passHref href={`/listing/${listing.id}`}>
        <div className="link" style={{ display: 'flex', border: '1px solid #ffffff', backgroundColor: '#000000' }}>
          <Image style={{ width: '150px', height: '150px' }} src={listing.image} />
          <div style={{ margin: '0 15px 0 15px', paddingTop: '10px' }}>
            <h3>{listing.artist.name}</h3>
            <h4>{listing.title}</h4>
            <p>${listing.price}</p>
          </div>
        </div>
      </Link>
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
    price: PropTypes.number,
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
};

import Link from 'next/link';
import PropTypes from 'prop-types';
import { Button, Image } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useAuth } from '../utils/context/authContext';
import { deleteListing } from '../api/listingData';

const initialState = () => {
  console.warn('initial state');
};

export default function ListingTable({ listing, onUpdate }) {
  const { user } = useAuth();
  const router = useRouter();

  const deleteThisListing = () => {
    if (window.confirm('Delete this listing?')) {
      deleteListing(listing.id).then(onUpdate);
    }
  };

  return (
    <>
      <div style={{
        display: 'flex', border: '1px solid #ffffff', backgroundColor: '#000000', justifyContent: 'space-between',
      }}
      >
        <div style={{ display: 'flex' }}>
          <Link passHref href={`/listings/${listing.id}`}>
            <Image className="link" style={{ width: '150px', height: '150px' }} src={listing.image} />
          </Link>
          <div style={{ margin: '0 15px 0 15px', paddingTop: '10px' }}>
            <Link passHref href={`/listings/${listing.id}`}>
              <h3 className="link">{listing.title}</h3>
            </Link>
            <Link passHref href={`/listings/${listing.id}`}>
              <h4 className="link">{listing.artist?.name}</h4>
            </Link>
            <p>${listing.price}</p>
          </div>
        </div>
        <div style={{
          display: 'flex', gap: '15px', alignItems: 'end', padding: '0 15px 15px',
        }}
        >
          {user.uid === listing.created_by?.uid ? <Button onClick={() => router.push(`/listings/edit/${listing.id}`)} className="button-link">Edit</Button> : ''}
          {user.uid === listing.created_by?.uid ? <Button onClick={deleteThisListing} className="button-link">Delete</Button> : ''}
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
  onUpdate: PropTypes.func,
};

ListingTable.defaultProps = {
  onUpdate: initialState,
};

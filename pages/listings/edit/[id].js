import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ListingForm from '../../../components/Forms/ListingForm';
import { getSingleListing } from '../../../api/listingData';

export default function EditListing() {
  const router = useRouter();
  const { id } = router.query;
  const [listingData, setListingData] = useState({});

  const getTheListing = () => {
    getSingleListing(id).then(setListingData);
  };

  useEffect(() => {
    getTheListing();
  }, []);

  const afterUpdate = () => {
    router.push('/profile/my-profile');
  };

  return <ListingForm obj={listingData} onUpdate={afterUpdate} />;
}

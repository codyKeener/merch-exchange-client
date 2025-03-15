import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getArtists } from '../../api/artistData';

export default function ProductsPage() {
  const [artists, setArtists] = useState([]);

  const getTheArtists = () => {
    getArtists().then(setArtists);
  };

  useEffect(() => {
    getTheArtists();
  }, []);

  return (
    <>
      <div
        style={{
          width: '100%', display: 'flex', gap: '20px', flexWrap: 'wrap',
        }}
      >
        {artists.map((artist) => (
          <Link passHref href={`/listings?artist=${artist.id}`}>
            <div
              style={{ display: 'flex', flexDirection: 'column', width: '300px' }}
              key={artist.id}
              className="link"
            >
              <span
                style={{
                  width: '300px', fontSize: '22px', display: 'flex', justifyContent: 'center',
                }}
              >{artist.name}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

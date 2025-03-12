import { useEffect, useState } from 'react';
import { Image } from 'react-bootstrap';
import Link from 'next/link';
import { getCategories } from '../../api/categoryData';

export default function ProductsPage() {
  const [categories, setCategories] = useState([]);

  const getTheCategories = () => {
    getCategories().then(setCategories);
  };

  useEffect(() => {
    getTheCategories();
  }, []);

  return (
    <>
      <div
        style={{
          width: '100%', display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center',
        }}
      >
        {categories.map((category) => (
          <Link passHref href={`/listing?category=${category.id}`}>
            <div
              style={{ display: 'flex', flexDirection: 'column', width: '300px' }}
              key={category.id}
              className="link"
            >
              <Image style={{ width: '300px', height: '300px' }} src={category.image} />
              <span
                style={{
                  width: '300px', fontSize: '22px', display: 'flex', justifyContent: 'center',
                }}
              >{category.label}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

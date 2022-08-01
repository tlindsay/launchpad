import React, { useEffect, useState } from 'react';
import Card from '../card';

const ENDPOINT = 'https://orbiter.thatdarnpat.com';

const MarsCard = () => {
  const [isLoading, setLoading] = useState(true);
  const [mars, setMars] = useState(null);

  const getMars = async () => {
    let resp = await fetch(ENDPOINT);
    let photo = await resp.json();
    setMars({ src: photo.img_src, alt: photo.earth_date });
    setLoading(false);
  };

  useEffect(() => {
    getMars();
  }, []);

  return (
    <Card className={`mars ${isLoading ? 'loading' : ''}`}>
      {
        isLoading ? 'Loading' :
          <figure>
            <img src={mars.src} alt={mars.alt} />
            <figcaption>{mars.alt}</figcaption>
          </figure>
      }
    </Card>
  );
};

export default MarsCard;

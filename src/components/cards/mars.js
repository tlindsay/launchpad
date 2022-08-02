import React, { useEffect, useState } from 'react';
import Card from '../card';

const ENDPOINT = 'https://orbiter.thatdarnpat.com';

const MarsCard = () => {
  const [isLoading, setLoading] = useState(true);
  const [mars, setMars] = useState(null);

  const getMars = async () => {
    let resp = await fetch(ENDPOINT);
    let photo = await resp.json();
    setMars({
      alt: `A photo captured by the ${photo.rover.name} rover's ${photo.camera.full_name} on ${photo.earth_date}.`,
      src: photo.img_src,
      date: photo.earth_date
    });
    setLoading(false);
  };

  useEffect(() => {
    getMars();
  }, []);

  return isLoading
    ? <Card className='mars loading'>Loading</Card>
    : (
      <Card className={'mars'}>
        <figure>
          <a href={mars.src}>
            <img src={mars.src} alt={mars.alt} />
          </a>
          <figcaption>{mars.date}</figcaption>
        </figure>
      </Card>
    );
};

export default MarsCard;

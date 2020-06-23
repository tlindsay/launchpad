import React, { useEffect, useState } from 'react';
import Card from '../card';

const ENDPOINT = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos';
const API_KEY = 'oi5Qw99OwyRKa43TPEquG2kbdKCd0eifOT5sA4uk';

const randomNum = (min = 0, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const MarsCard = () => {
  const [isLoading, setLoading] = useState(true);
  const [mars, setMars] = useState(null);

  const getMars = async () => {
    let resp = await fetch(`${ENDPOINT}?sol=${randomNum(940, 1200)}&camera=navcam&api_key=${API_KEY}`);
    let json = await resp.json();
    let [photo] = json.photos;
    setMars({ src: photo.img_src, alt: photo.earth_date });
    setLoading(false);
  };

  useEffect(() => {
    getMars();
  }, []);

  return (
    <Card className={`mars ${isLoading && 'loading'}`}>
      {isLoading ? 'Loading' : <img src={mars.src} alt={mars.alt} />}
    </Card>
  );
};

export default MarsCard;

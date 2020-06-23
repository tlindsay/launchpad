import { useEffect, useState } from 'react';

const useGeolocation = (options) => {
  const [coords, setCoords] = useState({ latitude: null, longitude: null, error: null });

  const updateCoords = ({ coords }) => {
    const { latitude, longitude } = coords;
    setCoords({ latitude, longitude });
  };

  const errorCoords = ({ message }) => {
    setCoords({ ...coords, error: message });
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(updateCoords, errorCoords, options);
    }
  }, []);

  return coords;
};

export default useGeolocation;

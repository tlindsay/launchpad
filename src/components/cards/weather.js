import React, { useEffect, useState } from 'react';
import Card from '../card';
import useGeolocation from '../../hooks/use-geolocation';

const API_KEY = '943e66e8c48e15e4d9554d0725d8d8d8';
const ENDPOINT = 'https://api.openweathermap.org/data/2.5/weather';

const Weather = ({ condition, temp, icon }) => (
  <>
    <div className="summary">{condition}</div>
    <div className="temperature">{Math.round(temp)}°F</div>
    <div className="icon">
      <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt={condition}/>
    </div>
  </>
);

const WeatherCard = () => {
  const [isLoading, setLoading] = useState(true);
  const [weather, setWeather] = useState(null);
  const loc = useGeolocation();

  const getWeather = async ({ latitude, longitude }) => {
    let params = [
      `lat=${latitude}`,
      `lon=${longitude}`,
      'units=imperial',
      `appid=${API_KEY}`
    ].join('&');
    let resp = await fetch(`${ENDPOINT}?${params}`);
    let json = await resp.json();
    setLoading(false);
    setWeather({
      temp: json.main.feels_like,
      condition: json.weather[0].main,
      icon: json.weather[0].icon
    });
  };

  useEffect(() => {
    if (loc.latitude === null) return;
    getWeather(loc);
  }, [loc]);

  return (
    <Card className={`weather ${isLoading && 'loading'}`}>
      {isLoading ? 'Loading' : <Weather {...weather} />}
    </Card>
  );
};

export default WeatherCard;

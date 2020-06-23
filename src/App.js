import React from 'react';
import MarsCard from './components/cards/mars';
import WeatherCard from './components/cards/weather';
import Credit from './components/credit';

import './styles/main.scss';

const App = () => {
  return (
    <>
      <WeatherCard />
      <MarsCard />
      <Credit />
    </>
  );
};

export default App;

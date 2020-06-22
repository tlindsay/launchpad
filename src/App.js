import React from 'react';
import MarsCard from './components/cards/mars';
import WeatherCard from './components/cards/weather';

import './styles/main.scss';

const App = () => (
  <>
    <WeatherCard />
    <MarsCard />
  </>
);

export default App;

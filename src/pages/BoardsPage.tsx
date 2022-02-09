import React from 'react';
import LocationSearch from '../components/LocationSearch';
import Map from '../components/Map';

const BoardsPage = () => {
  return(
    <div className="boards container">
      <h2>Panneaux d'affichage</h2>
      <LocationSearch />
      <Map />
    </div>
  )
}

export default BoardsPage;
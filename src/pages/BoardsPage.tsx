import React from 'react';
import Layout from '../components/Layout';
import LocationSearch from '../components/LocationSearch';
import Map from '../components/Map';

const BoardsPage = () => {
  return(
    <Layout title="Panneaux d'affichage" className="boards container">
      <LocationSearch />
      <Map />
    </Layout>
  )
}

export default BoardsPage;
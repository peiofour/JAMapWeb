import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import LocationSearch from '../components/LocationSearch';
import Map from '../components/Map';

const markerTest = [
  {
    id:0,
    latitude: 48.86658,
    longitude: 2.35183,
    date: null
  },
  {
    id:1,
    latitude: 48.85658,
    longitude: 2.35183,
    date: null
  },
  {
    id:2,
    latitude: 48.84658,
    longitude: 2.35183,
    date: null
  },
  {
    id:3,
    latitude: 48.85658,
    longitude: 2.31183,
    date: null
  },
]

const BoardsPage = () => {
  const [markers, setMarkers] = useState(null);
  const [coordinates, setCoordinates] = useState({latitude: 48.86658, longitude: 2.35183});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    if(coordinates) {
      // TODO : requete pour récupérer les markers

      
    }
  }, [coordinates])

  return(
    <Layout title="Panneaux d'affichage" className="boards container">
      <LocationSearch />
      <Map centerPos={coordinates} markers={markerTest}/>
    </Layout>
  )
}

export default BoardsPage;
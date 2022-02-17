import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import LocationSearch from '../components/LocationSearch';
import Map from '../components/Map';

import { database as db} from '../utils/firebase';
import {ref, onValue, set, child, get} from "firebase/database";


const BoardsPage = () => {
  const [markers, setMarkers] = useState<{
    id: number;
    latitude: number;
    longitude: number;
    createdAt: Date;
    isDisabled: Boolean;
    lastValidationDate: Date | string; }[]>([]);
  
  const [coordinates, setCoordinates] = useState({latitude: 43.56767434009124, longitude: 1.464428488224958});
  //const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    onValue(ref(db, 'boards'), (snapshot) => {
      setMarkers(snapshot.val())
    }, {
      onlyOnce: true
    })
  }, [])
  
  useEffect(() => {
    window.scrollTo(0, 0)
    
  }, [])

  const handleCoordinatesChange = (coordo:Array<number>) => {
    setCoordinates({
      latitude: coordo[1],
      longitude: coordo[0]
    })
  }

  const handleBoardValidate = (id: number) => {
    const date = new Date();
    set(ref(db, 'boards/' + id + '/lastValidationDate'), date.toLocaleString("fr-FR"))
  }

  const handleDisableBoard = (id: number) => {
    set(ref(db, 'boards/' + id + '/isDisabled'), true).then(() => {
      get(child(ref(db), 'boards')).then((snapshot) => {setMarkers(snapshot.val())})
    })
  }

  return(
    <Layout title="Panneaux d'affichage" className="boards container">
      <LocationSearch onSelect={handleCoordinatesChange} />
      <Map
        centerPos={coordinates}
        markers={markers}
        onDisableBoard={handleDisableBoard}
        onValidateBoard={handleBoardValidate}
      />
    </Layout>
  )
}

export default BoardsPage;
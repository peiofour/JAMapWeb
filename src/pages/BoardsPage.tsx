import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import LocationSearch from '../components/LocationSearch';
import Map from '../components/Map';

import { database as db} from '../utils/firebase';
import {ref, onValue, get, child} from "firebase/database";


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
  const [markers, setMarkers] = useState<{
    id: number;
    latitude: number;
    longitude: number;
    createdAt: Date;
    isDisabled: Boolean;
    lastValidationDate: Date; }[]>([]);
  
  const [coordinates, setCoordinates] = useState({latitude: 48.86658, longitude: 2.35183});
  const [loading, setLoading] = useState(false);
  
  const dbRef = ref(db);
  get(child(dbRef, 'boards')).then((snapshot) => {
    if(snapshot.exists()){
      setMarkers(snapshot.val())
    }else {
      console.error("No data available")
    }
  }).catch((error) => {
    console.error(error)
  })
  
  useEffect(() => {
    window.scrollTo(0, 0)
    
  }, [])

  useEffect(() => {
    if(coordinates) {
      // TODO : requete pour récupérer les markers
    }
  }, [coordinates])

  const handleCoordinatesChange = (coordo:Array<number>) => {
    setCoordinates({
      latitude: coordo[1],
      longitude: coordo[0]
    })
  }

  const handleBoardValidate = (id: number) => {
    console.log("validate ", id)
  }

  const handleDisableBoard = (id: number) => {
    console.log("disable ", id)
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
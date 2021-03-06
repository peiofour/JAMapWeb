import React, { useEffect, useState } from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from 'react-router-dom';

import { auth, analytics } from "../utils/firebase";
import { logEvent } from 'firebase/analytics';


import Layout from '../components/Layout';
import LocationSearch from '../components/LocationSearch';
import Map from '../components/Map';

import { database as db} from '../utils/firebase';
import {ref, onValue, set, child, get} from "firebase/database";


const BoardsPage = () => {
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);
  useEffect(() => {
    if(loading) return;
    if(!user) return navigate("/login");
  })
  
  const [markers, setMarkers] = useState<{
    id: number | string;
    latitude: number;
    longitude: number;
    createdAt: Date;
    isDisabled: Boolean;
    lastValidationDate:  string; }[]>([]);

    const [officials, setOfficials] = useState<{
      id: number | string;
      latitude: number;
      longitude: number;
      isDisabled: Boolean;
      lastValidationDate:  string; }[]>([]);
  
  const [coordinates, setCoordinates] = useState({latitude: 43.56767434009124, longitude: 1.464428488224958});
  
  useEffect(() => {
    onValue(ref(db, 'boards'), (snapshot) => {
      setMarkers(snapshot.val())
    }, {
      onlyOnce: true
    })

    onValue(ref(db, 'official_boards'), (snapshot) => {
      setOfficials(snapshot.val())
    }, {
      onlyOnce: true
    })
  }, [])
  
  useEffect(() => {
    window.scrollTo(0, 0)
    
  }, [])

  const handleCoordinatesChange = (result:{
    title: string,
    id: string,
    coordinates: Array<number>,
    city: string,
  }) => {
    setCoordinates({
      latitude: result.coordinates[1],
      longitude: result.coordinates[0]
    })
  }

  const handleBoardValidate = (id: number | String, type: "board"|"official") => {
    const date = new Date();


    if(type==="board"){
      set(ref(db, 'boards/' + id + '/lastValidationDate'), date.toLocaleString("fr-FR")).then(() => {
        logEvent(analytics, "Validate Board", {
          user: user?.uid,
          board: id,
          date: date
        })
        onValue(ref(db, 'boards'), (snapshot) => {
          setMarkers(snapshot.val())
        }, {
          onlyOnce: true
        })
      })
    } else if(type === "official"){
      set(ref(db, 'official_boards/' + id + '/lastValidationDate'), date.toLocaleString("fr-FR")).then(() => {
        logEvent(analytics, "Validate Official", {
          user: user?.uid,
          board: id,
          date: date
        })
        onValue(ref(db, 'official_boards'), (snapshot) => {
          setOfficials(snapshot.val())
        }, {
          onlyOnce: true
        })
      })
    }
  }

  const handleDisableBoard = (id: number | String, type: "board"|"official") => {
    if (type === "board"){
      set(ref(db, 'boards/' + id + '/isDisabled'), true).then(() => {
        get(child(ref(db), 'boards')).then((snapshot) => {setMarkers(snapshot.val())})
      })
      logEvent(analytics, "Disable Board", {
        user: user?.uid,
        board: id,
      })
    }
    else if (type === "official") {
      set(ref(db, 'official_boards/' + id + '/isDisabled'), true).then(() => {
        get(child(ref(db), 'official_boards')).then((snapshot) => {setOfficials(snapshot.val())})
      })
      logEvent(analytics, "Disable Official", {
        user: user?.uid,
        board: id,
      })
    }
  }

  return(
    <Layout title="Panneaux d'affichage" className="boards container">
      <LocationSearch onSelect={handleCoordinatesChange} />
      <Map
        centerPos={coordinates}
        markers={markers}
        officials={officials}
        onDisableBoard={handleDisableBoard}
        onValidateBoard={handleBoardValidate}
        userId={user?.uid}
      />
    </Layout>
  )
}

export default BoardsPage;
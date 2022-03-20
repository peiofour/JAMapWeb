import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from 'react-router-dom';
import MapGL from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { logEvent } from 'firebase/analytics';

import {ReactComponent as MarkerLogo} from "../assets/icons/map-pin.svg";

import { ref, update, push, child, get } from "firebase/database";
import { auth, database as db, analytics } from "../utils/firebase";

import LocationSearch from '../components/LocationSearch';
import { Button } from 'semantic-ui-react';

const AddBoardPage = () => {
  const [viewport, setViewport] = useState<{
    latitude: number|undefined,
    longitude: number|undefined,
    zoom:number,
    bearing: number,
    pitch: number
  }>({
    latitude: undefined,
    longitude: undefined,
    zoom: 16,
    bearing: 0,
    pitch: 0,
  });

  const [isLoading, setLoading] = useState<boolean>(false);
  const [city, setCity] = useState<string| undefined>()
    
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);
  useEffect(() => {
    if(loading) return;
    if(!user) return navigate("/login");
  })

  const handleSelect = (result:{
    title: string,
    id: string,
    coordinates: Array<number>,
    city: string,
  }) => {
    setViewport({
      ...viewport,
      latitude: result.coordinates[1],
      longitude: result.coordinates[0]
    })
    setCity(result.city)
  }

  const addBoard = () => {
    setLoading(true)
    const date = new Date();

    const board = {
      latitude: viewport.latitude,
      longitude: viewport.longitude,
      source: user?.uid||"",
      ville: city,
      createdAt: date.toLocaleString("fr-FR"),
      lastValidationDate: "Jamais",
      isDisabled: false,
      id: 0
    }
  
    const updates = {};

    logEvent(analytics, "Add board", {value: user?.uid})
  
    get(child(ref(db), "boards")).then(snapshot => {
      board.id = snapshot.val().length
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      push(child(ref(db), 'boards')).key
      // @ts-ignore: Unreachable code error
      updates[`/boards/${board.id}`] = board;
      update(ref(db), updates)
      setLoading(false);
      alert("Panneau ajouté !")
      setViewport({
        latitude: undefined,
        longitude: undefined,
        zoom: 16,
        bearing: 0,
        pitch: 0})
    })
    
  }

  return (
    <Layout className="add-board-page" title="Ajouter un panneau">
      <div>
        <h3>Ajouter un panneau d'affichage</h3>
        <LocationSearch onSelect={handleSelect} />
        {
          (viewport.latitude !== undefined && viewport.longitude !== undefined) &&
          <>
            <p>Déplacez la carte pour améliorer la précision</p>
            <Button
                color="green"
                style={{marginBottom:"10px"}}
                onClick={addBoard}
                loading={isLoading}
              >
              Ajouter le panneau
            </Button>
            <MapGL
              {...viewport}
              onViewportChange={setViewport}
              mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
              width="100%"
              height="50vh"
              mapStyle="mapbox://styles/peiofour/ckzil6aq0006915qzsow5t9x9"
            >
              <div style={{marginTop:'25vh'}}>
                <MarkerLogo
                  style={{cursor: "pointer"}}
                  fill="red"
                  width={30} 
                  height={30} 
                />
              </div>
            </MapGL>
            <h5 className="ete">[{viewport.latitude} • {viewport.longitude}]</h5>

          </>
        }
      </div>
    </Layout>
  );
};

export default AddBoardPage;
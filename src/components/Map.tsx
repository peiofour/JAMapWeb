import React, {useEffect, useState} from 'react';
import {Map as MapGL, Marker} from 'react-map-gl';
import SVG from "react-inlinesvg";
import 'mapbox-gl/dist/mapbox-gl.css';

// eslint-disable-next-line import/no-webpack-loader-syntax
//mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

const SvgMarker = () => (
  <SVG width="30" height="30" src={process.env.PUBLIC_URL + '/icons/map-pin.svg'} />
)

const geolocateControlStyle= {
  right: 20,
  bottom: 50,
  transform: 'scale(1.25)'
};

const markerTest = [
  {
    id:0,
    latitude: 48.86658,
    longitude: 2.35183
  },
  {
    id:1,
    latitude: 48.85658,
    longitude: 2.35183
  },
  {
    id:2,
    latitude: 48.84658,
    longitude: 2.35183
  },
  {
    id:3,
    latitude: 48.85658,
    longitude: 2.31183
  },
]

const Map = () => {
  const [popup, setPopup] = useState<number | null>(null);
  const [viewport, setViewport] = useState({
    latitude: 48.85658,
    longitude: 2.35183,
    zoom: 7,
    bearing: 0,
    pitch: 0,
  });

  return (
    <div style={{marginTop: "10px"}}>
      <MapGL
        initialViewState={{
          latitude: 48.85658,
          longitude: 2.35183,
          zoom: 14,
        }}
        style={{width: '100vw', height: '80vh'}}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        {
          markerTest.map((m, id) => (
            <Marker
              key={id}
              longitude={m.longitude}
              latitude={m.latitude}
            >
              <div onClick={()=>console.log("test Click")}>
                <SvgMarker />
              </div>
            </Marker>
          ))
        }
      </MapGL>
    </div>
  )
}

export default Map;

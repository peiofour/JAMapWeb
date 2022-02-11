import React, {useEffect, useState} from 'react';
import {Map as MapGL, Marker} from 'react-map-gl';
import SVG from "react-inlinesvg";
import 'mapbox-gl/dist/mapbox-gl.css';
import { Button, Icon } from 'semantic-ui-react';
import ClickAwayListener from 'react-click-away-listener';

// eslint-disable-next-line import/no-webpack-loader-syntax
//mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

interface SVGMarkerProps{
  isSelected: boolean;
}
const SvgMarker:React.FC<SVGMarkerProps> = ({isSelected}) => (
  <SVG
    className={isSelected ? "svg-marker" : ''}
    width={isSelected ? 40:30} 
    height={isSelected ? 40:30} 
    src={process.env.PUBLIC_URL + '/icons/map-pin.svg'} 
  />
)


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
  const [popup, setPopup] = useState<{id: number, longitude: number, latitude: number} | null>(null);
  const [viewport, setViewport] = useState({
    latitude: 48.85658,
    longitude: 2.35183,
    zoom: 7,
    bearing: 0,
    pitch: 0,
  });

  return (
    <div className="map">
      <MapGL
        initialViewState={{
          latitude: 48.85658,
          longitude: 2.35183,
          zoom: 14,
        }}
        style={{width: '100vw', height: '100%'}}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        <ClickAwayListener
          onClickAway={()=> setPopup(null)}
          mouseEvent="click"
        >
          <div>
            {
              markerTest.map((m) => (
                <Marker
                  style={{cursor: "pointer"}}
                  key={m.id}
                  longitude={m.longitude}
                  latitude={m.latitude}
                >
                  <div onClick={()=>setPopup({ id: m.id, longitude: m.longitude, latitude: m.latitude })}>
                    <SvgMarker
                      isSelected={popup?.id === m.id}
                    />
                  </div>
                </Marker>
              ))
            }
            {popup !== null ? (
              <div className="popup">
                <div style={{marginTop: "10px", marginBottom: "10px"}}>
                  <Button.Group>
                    <Button
                      icon
                      color="blue"
                      labelPosition='left'
                      onClick={()=>window.open(`https://www.waze.com/ul?ll=${popup.latitude}%2C${popup.longitude}&navigate=yes&zoom=17`, "_blank")}
                    >
                      <Icon style={{paddingTop: "7px"}}>
                        <SVG style={{verticalAlign: "bottom"}} src={process.env.PUBLIC_URL + '/icons/waze-brands.svg'} width="20" height="20" fill="white" />
                      </Icon>
                      Waze
                    </Button>
                    <Button
                      icon
                      color="red"
                      labelPosition='left'
                      onClick={()=>window.open(`https://www.google.com/maps/search/?api=1&query=${popup.latitude}%2C${popup.longitude}`, "_blank")}
                    >
                      <Icon style={{paddingTop: "7px"}}>
                        <SVG style={{verticalAlign: "middle"}} src={process.env.PUBLIC_URL + '/icons/google-brands.svg'} width="20" height="20" fill="white" />
                      </Icon>
                      Maps
                    </Button>
                  </Button.Group>
                </div>
                <p>Dernier collage le : </p>
                <Button color="green">Je viens de coller ce panneau !</Button>
              </div> 
            ): null}
          </div>
          
        </ClickAwayListener>
      </MapGL>
      
    </div>
  )
}

export default Map;

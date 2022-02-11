import React, {useEffect, useState} from 'react';
import MapGL, {GeolocateControl, Marker} from 'react-map-gl';
import SVG from "react-inlinesvg";
import 'mapbox-gl/dist/mapbox-gl.css';
import { Button, Icon } from 'semantic-ui-react';
import ClickAwayListener from 'react-click-away-listener';

// eslint-disable-next-line import/no-webpack-loader-syntax
// mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;


const geolocateControlStyle= {
  right: 20,
  bottom: 50,
  transform: 'scale(1.25)'
};

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


interface Props {
  markers: Array<{
    id: number,
    latitude: number,
    longitude: number,
    date: Date | null
  }>;
  centerPos: {latitude: number, longitude: number};
}
const Map:React.FC<Props> = ({markers, centerPos}) => {
  const [popup, setPopup] = useState<{id: number, longitude: number, latitude: number} | null>(null);
  const [viewport, setViewport] = useState({
    latitude: 48.85658,
    longitude: 2.35183,
    zoom: 14,
    bearing: 0,
    pitch: 0,
  });

  useEffect(() => {
    setViewport({
      ...viewport,
      latitude: centerPos?.latitude,
      longitude: centerPos?.longitude
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [centerPos.latitude, centerPos.longitude])

  return (
    <div className="map">
      <MapGL
        {...viewport}
        onViewportChange={setViewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        width="100vw"
        height="100%"
        mapStyle="mapbox://styles/peiofour/ckzil6aq0006915qzsow5t9x9"
      >
        <GeolocateControl
          style={geolocateControlStyle}
          label='Ma position'
          positionOptions={{enableHighAccuracy: true}}
          trackUserLocation={true}
          showAccuracyCircle={true}
        />

        <ClickAwayListener
          onClickAway={()=> setPopup(null)}
          mouseEvent="click"
        >
          <div>
            {
              markers.map((m) => (
                <Marker
                  style={{cursor: "pointer"}}
                  key={m.id}
                  longitude={m.longitude}
                  latitude={m.latitude}
                  offsetLeft={-10}
                  offsetTop={-15}
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
                <h5 className="button-popup">Dernier collage le : 17/06/2022 10:00 </h5>
                <div className="button-popup">
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
                      color="brown"
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
                <Button icon labelPosition='left' className="button-popup" color="green">
                  <Icon style={{paddingTop: "7px"}}>
                    <SVG style={{verticalAlign: "middle"}} src={process.env.PUBLIC_URL + '/icons/circle-check-solid.svg'} width="20" height="20" fill="white" />
                  </Icon>
                  Je viens de coller ce panneau
                </Button>
                <Button icon labelPosition='left' className="button-popup" color="red">
                  <Icon style={{paddingTop: "7px"}}>
                    <SVG style={{verticalAlign: "middle"}} src={process.env.PUBLIC_URL + '/icons/triangle-exclamation-solid.svg'} width="20" height="20" fill="white" />
                  </Icon>
                  Ce panneau n'existe plus
                </Button>
              </div> 
            ): null}
          </div>
          
        </ClickAwayListener>
      </MapGL>
      
    </div>
  )
}

export default Map;

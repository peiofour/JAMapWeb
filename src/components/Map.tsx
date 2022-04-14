import React, {useEffect, useState} from 'react';
import MapGL, {GeolocateControl, Marker} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Button, Form, Icon } from 'semantic-ui-react';
import ClickAwayListener from 'react-click-away-listener';

import {ReactComponent as MarkerLogo} from "../assets/icons/map-pin.svg";
import {ReactComponent as MarkerLogoCheck} from "../assets/icons/map-pin-green.svg";
import {ReactComponent as MarkerOfficialLogo} from "../assets/icons/map-pin-purple.svg";
import {ReactComponent as GoogleLogo} from "../assets/icons/google-brands.svg";
import {ReactComponent as WazeLogo} from "../assets/icons/waze-brands.svg";
import {ReactComponent as WarningLogo} from "../assets/icons/triangle-exclamation-solid.svg";
import {ReactComponent as CheckLogo} from "../assets/icons/circle-check-solid.svg";

function toRad(degrees: number)
{
  return degrees * Math.PI/180;
}

function calcDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 15371; // km
  const dLat = toRad(lat2-lat1);
  const dLon = toRad(lon2-lon1);
  lat1 = toRad(lat1);
  lat2 = toRad(lat2);

  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  const d = R * c;
  return d;
}

const geolocateControlStyle= {
  right: 20,
  bottom: 50,
  transform: 'scale(1.25)'
};


const today = new Date();

const dateEarlier = (date: string):boolean => {
  const dateParts = (date.split(' à ')[0].split(',')[0]).split("/");

  let hourParts: (string | number)[] = []
  if (date.includes("à")){
    hourParts = (date.split(' à ')[1]).split(":");
  }  else if(date.includes(",")){
    hourParts = (date.split(',')[1]).split(":");
  }
  
  const myDate = new Date(+dateParts[2], +dateParts[1] - 1, +dateParts[0], +hourParts[0], +hourParts[1], +hourParts[2]);

  if(date === 'Jamais') {
    return false
  }

  else if (myDate instanceof Date){
    const diffTime = today.getTime() - myDate.getTime();
    const diffDays = diffTime / (1000 * 3600 * 24);
    return diffDays < 1
  }
  return false
}

interface Props {
  markers: {
    id: number | string;
    latitude: number;
    longitude: number;
    createdAt: Date;
    isDisabled: Boolean;
    lastValidationDate: string; }[];
  officials: {
    id: number | string;
    latitude: number;
    longitude: number;
    isDisabled: Boolean;
    lastValidationDate: string; }[];
  centerPos: {latitude: number, longitude: number};
  onValidateBoard: Function;
  onDisableBoard: Function;
}
const Map:React.FC<Props> = ({markers, officials, centerPos, onValidateBoard, onDisableBoard}) => {
  const [popup, setPopup] = useState<{type: "board"|"official",id: number | string, longitude: number, latitude: number, lastValidationDate: string | Date } | null>(null);
  const [disablePopup, setDisablePopup] = useState<boolean>(false);

  const [show, setShow] = useState({
    official: false,
    board: true
  })

  const [viewport, setViewport] = useState({
    latitude: 43.56767434009124,
    longitude: 1.464428488224958,
    zoom: 11,
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

  function disableBoard():void {
    onDisableBoard(popup?.id, popup?.type)
    setDisablePopup(false);
    setPopup(null);
  }

  function validateBoard():void {
    onValidateBoard(popup?.id, popup?.type)
  }

  const showMarker = (marker: {
    id: number | string;
    latitude: number;
    longitude: number;
    isDisabled: Boolean;
    lastValidationDate: string; }):boolean => {

    return 'latitude' in marker && !marker.isDisabled && calcDistance(marker.latitude, marker.longitude, viewport.latitude, viewport.longitude) < 10
  }

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
            <div className="choose-type-popup">
              <Form>
                <Form.Checkbox
                  label='Libres'
                  name='checkboxRadioGroup'
                  value='board'
                  checked={show.board}
                  onClick={() => setShow({...show, board: !show.board})}
                  
                />
                <Form.Checkbox
                  label='Officiels'
                  name='checkboxRadioGroup'
                  value='official'
                  checked={show.official}
                  onClick={() => setShow({...show, official: !show.official})}
                />
              </Form>
            </div>
            {
              show.board ?
              markers.map((m, id) => showMarker(m) ? (
                <Marker
                  key={id}
                  longitude={m.longitude}
                  latitude={m.latitude}
                  offsetLeft={-10}
                  offsetTop={-15}
                >
                  { 
                    dateEarlier(m.lastValidationDate) ?
                    <MarkerLogoCheck
                      style={{cursor: "pointer"}}
                      onClick={()=>setPopup({type:"board", id: m.id, longitude: m.longitude, latitude: m.latitude, lastValidationDate: m.lastValidationDate })}
                      className={popup?.id === m.id ? "svg-marker" : ''}
                      width={30} 
                      height={30} 
                    /> 
                  :
                    <MarkerLogo
                      style={{cursor: "pointer"}}
                      onClick={()=>setPopup({type:"board", id: m.id, longitude: m.longitude, latitude: m.latitude, lastValidationDate: m.lastValidationDate })}
                      className={popup?.id === m.id ? "svg-marker" : ''}
                      width={30} 
                      height={30} 
                    />
                  }
                  
                </Marker>
              ):null):null
            }
            {
              show.official ?
              officials.map((m, id) => showMarker(m) ? (
                <Marker
                  key={id}
                  longitude={m.longitude}
                  latitude={m.latitude}
                  offsetLeft={-10}
                  offsetTop={-15}
                >
                  { 
                  dateEarlier(m.lastValidationDate) ?
                  <MarkerLogoCheck
                    style={{cursor: "pointer"}}
                    onClick={()=>setPopup({type:"official", id: m.id, longitude: m.longitude, latitude: m.latitude, lastValidationDate: m.lastValidationDate })}
                    className={popup?.id === m.id ? "svg-marker" : ''}
                    width={25} 
                    height={25} 
                  />
                  :
                  <MarkerOfficialLogo
                    style={{cursor: "pointer"}}
                    onClick={()=>setPopup({type:"official", id: m.id, longitude: m.longitude, latitude: m.latitude, lastValidationDate: m.lastValidationDate })}
                    className={popup?.id === m.id ? "svg-marker" : ''}
                    width={25} 
                    height={25} 
                  />
                }
                  
                </Marker>
              ):null):null
            }
            {
              disablePopup && 
              <div className="disable-popup">
                <h3 className="button-popup">Êtes-vous sur que ce panneau n'existe plus ?</h3>
                <Button color="green" onClick={disableBoard}>Oui il n'existe plus</Button>
                <Button color="red" onClick={()=>setDisablePopup(false)}>Annuler</Button>
              </div>
            }
            {popup !== null ? (
              <div className="popup">
                <h5 className="button-popup">Dernier collage : {popup.lastValidationDate}</h5>
                <div className="button-popup">
                  <Button.Group>
                    <Button
                      icon
                      color="blue"
                      labelPosition='left'
                      onClick={()=>window.open(`https://www.waze.com/ul?ll=${popup.latitude}%2C${popup.longitude}&navigate=yes&zoom=17`)}
                    >
                      <Icon style={{paddingTop: "7px"}}>
                        <WazeLogo
                          style={{verticalAlign: "bottom"}}
                          width="20"
                          height="20"
                          fill="white"
                        />
                      </Icon>
                      Waze
                    </Button>
                    <Button
                      icon
                      color="brown"
                      labelPosition='left'
                      onClick={()=>window.open(`https://www.google.com/maps/search/?api=1&query=${popup.latitude}%2C${popup.longitude}`)}
                    >
                      <Icon style={{paddingTop: "7px"}}>
                        <GoogleLogo
                          style={{verticalAlign: "bottom"}}
                          width="20"
                          height="20"
                          fill="white"
                        />
                      </Icon>
                      Maps
                    </Button>
                  </Button.Group>
                </div>
                <Button 
                  icon 
                  labelPosition='left' 
                  className="button-popup" 
                  color="green"
                  onClick={validateBoard}
                >
                  <Icon style={{paddingTop: "7px"}}>
                    <CheckLogo
                      style={{verticalAlign: "bottom"}}
                      width="20"
                      height="20"
                      fill="white"
                    />
                  </Icon>
                  Je viens de coller ce panneau
                </Button>
                <Button
                  icon
                  labelPosition='left'
                  className="button-popup"
                  color="red"
                  onClick={() => setDisablePopup(true)}
                >
                  <Icon style={{paddingTop: "7px"}}>
                    <WarningLogo
                      style={{verticalAlign: "bottom"}}
                      width="20"
                      height="20"
                      fill="white"
                    />
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

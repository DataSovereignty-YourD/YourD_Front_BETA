import {
  GoogleMap,
  useLoadScript,
  Marker,
  Circle,
  InfoWindow,
} from "@react-google-maps/api";
import {FcAdvertising} from "react-icons/fc";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  SetConeTempValue,
  ConePositionStore,
  ConePositionValue,
} from "../../redux/ConeAssetsReducer";
import D100Cone from "../../assets/D100Cone.svg";
import D200Cone from "../../assets/D200Cone.svg";
import D500Cone from "../../assets/D500Cone.svg";
import D1000Cone from "../../assets/D1000Cone.svg";
import D2000Cone from "../../assets/D2000Cone.svg";
import D5000Cone from "../../assets/D5000Cone.svg";
import { LocationStore } from "../../redux/AdsUploadReducer";

export function SetConeMap() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API,
  });
  const [currentPosition, setCurrentPosition] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentPosition({ lat: latitude, lng: longitude });
      },
      (error) => console.error(error)
    );
  }, []);

  if (!isLoaded) return <div>Loading...</div>;

  return <Map currentPosition={currentPosition} />;
}

const ConeView = (currentPosition) => {
  const dispatch = useDispatch();
  const TempPosition = useSelector(ConePositionValue);
  const [markerPositions, setMarkerPositions] = useState([...TempPosition]);
  const basket = useSelector(SetConeTempValue);

  useEffect(() =>{ 
    let positions = [];
    if (basket[0] !== undefined && currentPosition !== null) {
      if (markerPositions[0] === undefined) {
        positions[0] = currentPosition;
        setMarkerPositions([...positions]);
      } else {
        positions = [...markerPositions];
        positions[positions.length] = currentPosition;
        setMarkerPositions([...positions]);
        dispatch(ConePositionStore([...positions]));
      }
    }
  }, [basket]);

  
  const handleMarkerDragEnd = (index, event, distance) => {
    if (event.latLng != null) {
      const { lat, lng } = event.latLng;
      const positions = [...markerPositions];
      console.log(positions);
      positions[index] = { lat: lat(), lng: lng(), D: distance };
      setMarkerPositions(positions);
      dispatch(ConePositionStore(positions));
    }
  };

  const markerConfig = {
    "100m": { icon: D100Cone, radius: 100 },
    "200m": { icon: D200Cone, radius: 200 },
    "500m": { icon: D500Cone, radius: 500 },
    "1km": { icon: D1000Cone, radius: 1000 },
    "2km": { icon: D2000Cone, radius: 2000 },
    "5km": { icon: D5000Cone, radius: 5000 },
  };
  return (
    basket.map((distance, index) => {
      const config = markerConfig[distance.distance];
      if (!config) return null;
      return (
        <Marker
          key={index}
          position={markerPositions[index]}
          icon={config.icon}
          draggable={true}
          onDragEnd={(event) =>
            handleMarkerDragEnd(index, event, distance.distance)
          }
        >
          <Circle
            center={markerPositions[index]}
            radius={config.radius}
            strokeOpacity={0.8}
            strokeWeight={2}
            fillOpacity={0.35}
          />
        </Marker>
      );
    })
    .filter((marker) => marker !== null));
};

export const Map = ({ currentPosition }) => {
  const dispatch = useDispatch();
  const [infoWindow, setInfoWindow] = useState(null);
  const markerRef = useRef(null);

  function handleMouseOver() {
    if (markerRef.current && markerRef.current.marker) {
      const marker = markerRef.current.marker;
      const infoWindow = new window.google.maps.InfoWindow({
        content:`<div class="iw-content">Please move the marker to the advertising store.</div>`,
      });
      setInfoWindow(infoWindow);
      infoWindow.open(marker.getMap(), marker);
    }
  }

  function handleMouseOut() {
    if (infoWindow) {
      infoWindow.close();
      setInfoWindow(null);
    }
  }

  return (
    <GoogleMap
      zoom={15}
      center={currentPosition}
      mapContainerClassName="map-container1"
    >
      {ConeView(currentPosition)}
      <Marker
        ref={markerRef}
        icon={FcAdvertising}
        position={currentPosition}
        draggable={true}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        onDragEnd={(event) => {
          if (event.latLng != null) {
            const { lat, lng } = event.latLng;
            const location = {lat: lat(), lng: lng(),};
            dispatch(LocationStore(location));
          }
        }}  
      />
    </GoogleMap>
  );
};

export default SetConeMap;

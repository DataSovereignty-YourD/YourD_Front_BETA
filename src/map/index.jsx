import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { useMemo, useState, useEffect } from "react";
import BlueCone from "../assets/BlueCone.svg";

function InitMap() {
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

export const Map = ({ currentPosition }) => {
  const center = currentPosition;

  return (
    <GoogleMap zoom={17} center={center} mapContainerClassName="map-container1">
      {currentPosition && <Marker position={currentPosition} />}
      {/* <Marker
        position={center}
        icon={{ url: BlueCone, scaledSize: { width: 35, height: 35 } }}
      /> */}
    </GoogleMap>
  );
};

export default InitMap;

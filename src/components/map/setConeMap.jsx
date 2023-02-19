import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {  SetCone, SetConePositionValue} from "../../redux/ConeAssetsReducer";
function SetConeMap() {
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

// const ConeView = () => {
//     let markers =[];
//     SetConePositionValue.forEach((distance,index) => {
        
//     });
// }


export const Map = ({ currentPosition }) => {
  const center = currentPosition;
    const ConePosition = useSelector(SetConePositionValue);
    console.log(ConePosition);
  return (
    <GoogleMap zoom={15} center={center} mapContainerClassName="map-container1">
      {/* {ConeView()} */}
    </GoogleMap>
  );
};

export default SetConeMap;

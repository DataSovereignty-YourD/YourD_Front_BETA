import {
  GoogleMap,
  useLoadScript,
  Marker,
  Circle,
} from "@react-google-maps/api";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import D100Cone from "../../assets/D100Cone.svg";
import D200Cone from "../../assets/D200Cone.svg";
import D500Cone from "../../assets/D500Cone.svg";
import D1000Cone from "../../assets/D1000Cone.svg";
import D2000Cone from "../../assets/D2000Cone.svg";
import D5000Cone from "../../assets/D5000Cone.svg";
import D10000Cone from "../../assets/D10000Cone.svg";
import D20000Cone from "../../assets/D20000Cone.svg";
import D50000Cone from "../../assets/D50000Cone.svg";
import {
  ConePositionValue,
  SetConeTempValue,
} from "../../redux/ConeAssetsReducer";

function CheckConeMap() {
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

const CheckCone = () => {
  const TempPosition = useSelector(ConePositionValue);
  const basket = useSelector(SetConeTempValue);
  let markers = [];

  
  basket.forEach((distance, index) => {
    let marker;
    switch (distance.distance) {
      case "100m":
        marker = (
          <Marker
            key={index}
            position={TempPosition[index]}
            icon={D100Cone}
            draggable={false}
          >
            <Circle
              center={TempPosition[index]}
              radius={100}
              strokeOpacity={0.8}
              strokeWeight={2}
              fillOpacity={0.35}
            />
          </Marker>
        );
        break;
      case "200m":
        marker = (
          <Marker
            key={index}
            position={TempPosition[index]}
            icon={D200Cone}
            draggable={false}
          >
            <Circle
              center={TempPosition[index]}
              radius={200}
              strokeOpacity={0.8}
              strokeWeight={2}
              fillOpacity={0.35}
            />
          </Marker>
        );
        break;
      case "500m":
        marker = (
          <Marker
            key={index}
            position={TempPosition[index]}
            icon={D500Cone}
            draggable={false}
          >
            <Circle
              center={TempPosition[index]}
              radius={500}
              strokeOpacity={0.8}
              strokeWeight={2}
              fillOpacity={0.35}
            />
          </Marker>
        );
        break;
      case "1km":
        marker = (
          <Marker
            key={index}
            position={TempPosition[index]}
            icon={D1000Cone}
            draggable={false}
          >
            <Circle
              center={TempPosition[index]}
              radius={1000}
              strokeOpacity={0.8}
              strokeWeight={2}
              fillOpacity={0.35}
            />
          </Marker>
        );
        break;
      case "2km":
        marker = (
          <Marker
            key={index}
            position={TempPosition[index]}
            icon={D2000Cone}
            draggable={false}
          >
            <Circle
              center={TempPosition[index]}
              radius={2000}
              strokeOpacity={0.8}
              strokeWeight={2}
              fillOpacity={0.35}
            />
          </Marker>
        );
        break;
      case "5km":
        marker = (
          <Marker
            key={index}
            position={TempPosition[index]}
            icon={D5000Cone}
            draggable={false}
          >
            <Circle
              center={TempPosition[index]}
              radius={5000}
              strokeOpacity={0.8}
              strokeWeight={2}
              fillOpacity={0.35}
            />
          </Marker>
        );
        break;
      case "10km":
        marker = (
          <Marker
            key={index}
            position={TempPosition[index]}
            icon={D10000Cone}
            draggable={false}
          >
            <Circle
              center={TempPosition[index]}
              radius={10000}
              strokeOpacity={0.8}
              strokeWeight={2}
              fillOpacity={0.35}
            />
          </Marker>
        );
        break;
      case "20km":
        marker = (
          <Marker
            key={index}
            position={TempPosition[index]}
            icon={D20000Cone}
            draggable={false}
          >
            <Circle
              center={TempPosition[index]}
              radius={20000}
              strokeOpacity={0.8}
              strokeWeight={2}
              fillOpacity={0.35}
            />
          </Marker>
        );
        break;
      case "50km":
        marker = (
          <Marker
            key={index}
            position={TempPosition[index]}
            icon={D50000Cone}
            draggable={false}
          >
            <Circle
              center={TempPosition[index]}
              radius={50000}
              strokeOpacity={0.8}
              strokeWeight={2}
              fillOpacity={0.35}
            />
          </Marker>
        );
        break;
      default:
        break;
    }
    markers.push(marker);
  });
  return markers;
};

export const Map = ({ currentPosition }) => {
  return (
    <GoogleMap
      zoom={15}
      center={currentPosition}
      mapContainerClassName="map-container1"
    >
      {CheckCone()}
    </GoogleMap>
  );
};

export default CheckConeMap;

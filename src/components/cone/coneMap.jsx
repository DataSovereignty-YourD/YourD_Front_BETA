// import InitMap from "../../map";
import { GoogleMap, useLoadScript, Marker ,Circle} from "@react-google-maps/api";
import {  useState, useEffect } from "react";
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
import { Cone, ConePosition } from "../../redux/AdsUploadReducer";
import axios from "axios";
import { Account } from "../../redux/AccountReducer";

function ConeMap() {
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

  if (!isLoaded) return <div className="loading" style={{left:"75%"}}/>;
  
  return <ExampleMap currentPosition={currentPosition} />;
}

const AdsCone = (AdsArea) => {
  let markers = [];
  AdsArea.forEach((distance) => {
    let marker;
    switch (distance.D) {
      case "100m":
        marker = (
          <Marker
            key={distance.lat}
            position={{lat: distance.lat, lng: distance.lng}}
            icon={D100Cone}
            draggable={false}
          >
            <Circle
              center={{lat: distance.lat, lng: distance.lng}}
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
            key={distance.lat}
            position={{lat: distance.lat, lng: distance.lng}}
            icon={D200Cone}
            draggable={false}
          >
            <Circle
              center={{lat: distance.lat, lng: distance.lng}}
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
            key={{lat: distance.lat, lng: distance.lng}}
            position={{lat: distance.lat, lng: distance.lng}}
            icon={D500Cone}
            draggable={false}
          >
            <Circle
              center={{lat: distance.lat, lng: distance.lng}}
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
            key={{lat: distance.lat, lng: distance.lng}}
            position={{lat: distance.lat, lng: distance.lng}}
            icon={D1000Cone}
            draggable={false}
          >
            <Circle
              center={{lat: distance.lat, lng: distance.lng}}
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
            key={{lat: distance.lat, lng: distance.lng}}
            position={{lat: distance.lat, lng: distance.lng}}
            icon={D2000Cone}
            draggable={false}
          >
            <Circle
              center={{lat: distance.lat, lng: distance.lng}}
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
            key={{lat: distance.lat, lng: distance.lng}}
            position={{lat: distance.lat, lng: distance.lng}}
            icon={D5000Cone}
            draggable={false}
          >
            <Circle
              center={{lat: distance.lat, lng: distance.lng}}
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
            key={{lat: distance.lat, lng: distance.lng}}
            position={{lat: distance.lat, lng: distance.lng}}
            icon={D10000Cone}
            draggable={false}
          >
            <Circle
              center={{lat: distance.lat, lng: distance.lng}}
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
            key={{lat: distance.lat, lng: distance.lng}}
            position={{lat: distance.lat, lng: distance.lng}}
            icon={D20000Cone}
            draggable={false}
          >
            <Circle
              center={{lat: distance.lat, lng: distance.lng}}
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
            key={{lat: distance.lat, lng: distance.lng}}
            position={{lat: distance.lat, lng: distance.lng}}
            icon={D50000Cone}
            draggable={false}
          >
            <Circle
              center={{lat: distance.lat, lng: distance.lng}}
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

const ExampleMap = ({ currentPosition  }) => {
  const [adsArea,setAdsArea] = useState([]);
  const account = useSelector(Account);
  const [currentAcc,setCurrentAcc] = useState(account);

  useEffect(()=> {
    loadAdsInfo();
  },[currentAcc])

  async function loadAdsInfo() {
    // const AdsInfo = await axios.post("https://www.yourdserver.store/loadadsinfo", currentAcc)
    const AdsInfo = await axios.post("http://localhost:8000/loadadsinfo", {Account: currentAcc})
    setAdsArea(AdsInfo.data);
    
  }
  
  const center = currentPosition;
  const exist = (adsArea !== "None");
  return (
    <GoogleMap zoom={15} center={center} mapContainerClassName="map-container1">
      {exist && AdsCone(adsArea)}
    </GoogleMap>
  );
};

export default ConeMap;

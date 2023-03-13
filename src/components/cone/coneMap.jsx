// import InitMap from "../../map";
import { GoogleMap, useLoadScript, Marker ,Circle} from "@react-google-maps/api";
import {  useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import D100Cone from "../../assets/D100Cone.svg";
import D200Cone from "../../assets/D200Cone.svg";
import D500Cone from "../../assets/D500Cone.svg";
import D1000Cone from "../../assets/D1000Cone.svg";
import D2000Cone from "../../assets/D2000Cone.svg";
import D5000Cone from "../../assets/D5000Cone.svg";
import { LocationStore } from "../../redux/AdsUploadReducer";
import axios from "axios";
const ServerURL = "http://localhost:8000"

function ConeMap(props) {
  const dispatch = useDispatch();
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API,
  });
  const [currentPosition, setCurrentPosition] = useState(props.Account);
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
  if (!currentPosition) dispatch(LocationStore);
  return <ExampleMap currentPosition={currentPosition} account={props.Account} />;
}
const markerConfig = {
  "100m": { icon: D100Cone, radius: 100 },
  "200m": { icon: D200Cone, radius: 200 },
  "500m": { icon: D500Cone, radius: 500 },
  "1km": { icon: D1000Cone, radius: 1000 },
  "2km": { icon: D2000Cone, radius: 2000 },
  "5km": { icon: D5000Cone, radius: 5000 },
};

const AdsCone = (AdsArea) => {
  return AdsArea.map((distance) => {
    const config = markerConfig[distance.D];
    if (!config) return null;
    return (
      <Marker
        key={distance.lat}
        position={{lat: distance.lat, lng: distance.lng}}
        icon={config.icon}
        draggable={false}
      >
        <Circle
          center={{lat: distance.lat, lng: distance.lng}}
          radius={config.radius}
          strokeOpacity={0.8}
          strokeWeight={2}
          fillOpacity={0.35}
        />
      </Marker>
    );
  }).filter((marker) => marker !== null);
};
const ExampleMap = ({ currentPosition , account }) => {
  const [adsArea,setAdsArea] = useState([]);

  useEffect(()=> {
    loadAdsInfo();
  },[account])

  async function loadAdsInfo() {
    const AdsInfo = await axios.post(`${ServerURL}/loadadsinfo`, {Account: account})
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

import { GoogleMap, useLoadScript, Marker, Circle } from "@react-google-maps/api";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {   SetConeTempValue,ConePositionStore ,ConePositionValue} from "../../redux/ConeAssetsReducer";
import D100Cone from "../../assets/D100Cone.svg";
import D200Cone from "../../assets/D200Cone.svg";
import D500Cone from "../../assets/D500Cone.svg";
import D1000Cone from "../../assets/D1000Cone.svg";
import D2000Cone from "../../assets/D2000Cone.svg";
import D5000Cone from "../../assets/D5000Cone.svg";
import D10000Cone from "../../assets/D10000Cone.svg";
import D20000Cone from "../../assets/D20000Cone.svg";
import D50000Cone from "../../assets/D50000Cone.svg";

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
  let markers =[];
  useEffect(() => {
        let positions = [];
        if (basket[0] !== undefined && currentPosition !== null) {
          if (markerPositions[0] === undefined) {
            positions[0] = currentPosition;
            setMarkerPositions(positions);
          } else {
            positions = [...markerPositions];
            positions[positions.length] = currentPosition;
            setMarkerPositions(positions);
            dispatch(ConePositionStore(positions));
          }
        }
      }, [basket]);

      const handleMarkerDragEnd = (index, event, distance) => {
        if(event.latLng != null ) {
          const { lat, lng } = event.latLng;
          const positions = [...markerPositions];
          positions[index] = { lat: lat(), lng: lng(), D: distance };
          setMarkerPositions(positions);
          dispatch(ConePositionStore(positions));
        }
      };

    
    basket.forEach((distance,index) => {
        let marker;
        switch (distance.distance) {
            case "100m":
              marker = (
                <Marker
                  key={index}
                  position={markerPositions[index]}
                  icon={D100Cone}
                  draggable={true}
                  onDragEnd={(event) => handleMarkerDragEnd(index, event, distance.distance)}
                >
                  <Circle
                    center={markerPositions[index]}
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
                  position={markerPositions[index]}
                  icon={D200Cone}
                  draggable={true}
                  onDragEnd={(event) => handleMarkerDragEnd(index, event, distance.distance)}
                >
                  <Circle
                    center={markerPositions[index]}
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
                  position={markerPositions[index]}
                  icon={D500Cone}
                  draggable={true}
                  onDragEnd={(event) => handleMarkerDragEnd(index, event, distance.distance)}
                >
                  <Circle
                    center={markerPositions[index]}
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
                  position={markerPositions[index]}
                  icon={D1000Cone}
                  draggable={true}
                  onDragEnd={(event) => handleMarkerDragEnd(index, event, distance.distance)}
                >
                  <Circle
                    center={markerPositions[index]}
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
                  position={markerPositions[index]}
                  icon={D2000Cone}
                  draggable={true}
                  onDragEnd={(event) => handleMarkerDragEnd(index, event, distance.distance)}
                >
                  <Circle
                    center={markerPositions[index]}
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
                  position={markerPositions[index]}
                  icon={D5000Cone}
                  draggable={true}
                  onDragEnd={(event) => handleMarkerDragEnd(index, event, distance.distance)}
                >
                  <Circle
                    center={markerPositions[index]}
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
                  position={markerPositions[index]}
                  icon={D10000Cone}
                  draggable={true}
                  onDragEnd={(event) => handleMarkerDragEnd(index, event, distance.distance)}
                >
                  <Circle
                    center={markerPositions[index]}
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
                  position={markerPositions[index]}
                  icon={D20000Cone}
                  draggable={true}
                  onDragEnd={(event) => handleMarkerDragEnd(index, event, distance.distance)}
                >
                  <Circle
                    center={markerPositions[index]}
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
                  position={markerPositions[index]}
                  icon={D50000Cone}
                  draggable={true}
                  onDragEnd={(event) => handleMarkerDragEnd(index, event, distance.distance)}
                >
                  <Circle
                    center={markerPositions[index]}
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
}


export const Map = ({ currentPosition }) => {

  return (
    <GoogleMap zoom={15} center={currentPosition} mapContainerClassName="map-container1">
      {ConeView(currentPosition)}
    </GoogleMap>
  );
};

export default SetConeMap;

import D100Cone from "../../assets/D100Cone.svg";
import D200Cone from "../../assets/D200Cone.svg";
import D500Cone from "../../assets/D500Cone.svg";
import D1000Cone from "../../assets/D1000Cone.svg";
import D2000Cone from "../../assets/D2000Cone.svg";
import D5000Cone from "../../assets/D5000Cone.svg";
import {ExampleConeDistanceValue}from "../../redux/ConeAssetsReducer";
import { GoogleMap, useLoadScript, Marker, Circle, } from "@react-google-maps/api";
import { useState, Fragment, useEffect } from "react";
import { useSelector  } from "react-redux";

const markerConfig = {
  "100m": { icon: D100Cone, radius: 100 },
  "200m": { icon: D200Cone, radius: 200 },
  "500m": { icon: D500Cone, radius: 500 },
  "1km": { icon: D1000Cone, radius: 1000 },
  "2km": { icon: D2000Cone, radius: 2000 },
  "5km": { icon: D5000Cone, radius: 5000 },
};

const ExamMap = () => {
  function ConeMap() {
    const [currentPosition, setCurrentPosition] = useState(null);
    const { isLoaded } = useLoadScript({
      googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API,
    });

    useEffect(() => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentPosition({ lat: latitude, lng: longitude });
        },
        (error) => console.error(error)
      );
    }, []);

    if (!isLoaded) return <div className="loading"/>;

    return <ExampleMap currentPosition={currentPosition} />;
  }

  const ExampleMap = ({ currentPosition }) => {
    const ExamConeDistance = useSelector(ExampleConeDistanceValue);
    const [markerPositions, setMarkerPositions] = useState([]);
    console.log("ExamConeDistance", ExamConeDistance);

    useEffect(() => {
      let positions = [];
      if (ExamConeDistance[0] !== undefined && currentPosition !== null) {
        if (markerPositions[0] === undefined) {
          positions[0] = currentPosition;
          setMarkerPositions(positions);
        } else {
          positions = [...markerPositions];
          positions[positions.length] = currentPosition;
          setMarkerPositions(positions);
        }
      } 
    }, [ExamConeDistance]);

    const handleMarkerDragEnd = (index, event) => {
      if(event.latLng != null ) {
        const { lat, lng } = event.latLng;
        const positions = [...markerPositions];
        positions[index] = { lat: lat(), lng: lng() };
        setMarkerPositions(positions);
      }
    };

    const createCone = () => {
      return ExamConeDistance.map((distance,index) => {
        const config = markerConfig[distance.distance];
        if (!config) return null;
        return (
          <Marker
            key={index}
            position={markerPositions[index]}
            icon={config.icon}
            draggable={true}
            onDragEnd={(event) => handleMarkerDragEnd(index, event)}
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
      }).filter((marker) => marker !== null);
    };

    return (
      <GoogleMap
        zoom={15}
        center={currentPosition}
        mapContainerClassName="map-container1"
      >
        {createCone()}
      </GoogleMap>
    );
  };

  return (
    <Fragment>
      <div className="Example">Example</div>
      <div className="Example_Map">
        <ConeMap />
      </div>
    </Fragment>
  );
};

export default ExamMap;

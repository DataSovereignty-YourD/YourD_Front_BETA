import D100Cone from "../../assets/D100Cone.svg";
import D200Cone from "../../assets/D200Cone.svg";
import D500Cone from "../../assets/D500Cone.svg";
import D1000Cone from "../../assets/D1000Cone.svg";
import D2000Cone from "../../assets/D2000Cone.svg";
import D5000Cone from "../../assets/D5000Cone.svg";
import D10000Cone from "../../assets/D10000Cone.svg";
import D20000Cone from "../../assets/D20000Cone.svg";
import D50000Cone from "../../assets/D50000Cone.svg";
import {ExampleConeDistanceValue}from "../../redux/ConeAssetsReducer";
import { GoogleMap, useLoadScript, Marker, Circle, } from "@react-google-maps/api";
import { useState, Fragment, useEffect } from "react";
import { useSelector  } from "react-redux";

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
      let markers = [];
      // Initialize marker positions
      ExamConeDistance.forEach((distance, index) => {
        let marker;
        switch (distance.distance) {
          case "100m":
            marker = (
              <Marker
                key={index}
                position={markerPositions[index]}
                icon={D100Cone}
                draggable={true}
                onDragEnd={(event) => handleMarkerDragEnd(index, event)}
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
                onDragEnd={(event) => handleMarkerDragEnd(index, event)}
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
                onDragEnd={(event) => handleMarkerDragEnd(index, event)}
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
                onDragEnd={(event) => handleMarkerDragEnd(index, event)}
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
                onDragEnd={(event) => handleMarkerDragEnd(index, event)}
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
                onDragEnd={(event) => handleMarkerDragEnd(index, event)}
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
                onDragEnd={(event) => handleMarkerDragEnd(index, event)}
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
                onDragEnd={(event) => handleMarkerDragEnd(index, event)}
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
                onDragEnd={(event) => handleMarkerDragEnd(index, event)}
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
    };
    return (
      <GoogleMap
      onLoad={()=>console.log("hi")}
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

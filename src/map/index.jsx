import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import {useMemo} from "react";


// Initialize and add the map
function InitMap() {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey : process.env.REACT_APP_GOOGLE_MAP_API,
    })

    if (!isLoaded) return <div>Loading...</div>
    return <Map/>;
  }

export function Map() {
  const center = useMemo(()=>({lat:37.61973258701472,lng: 127.0586734811029}),[]); 
    return <GoogleMap zoom={17} center={center} mapContainerClassName="map-container1">
      <Marker position={center} />
    </GoogleMap>
}

  
  export default InitMap;
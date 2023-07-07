import { useContext, useEffect, useState } from "react";
import { GlobalState } from "../GlobalState";

function LocationAPI(props) {

  const [address, setAddress] = useState([]);
  const [currentPos, setCurrentPos] = useState(false);
  const [directionResults, setDirectionResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [coords, setCoords] = useState({
    lon: 0,
    lat: 0,
  });
  const [mapZoom, setMapZoom] = useState(0);
  const [origin, setOrigin] = useState([]); 
  const [destinations, setDestinations] = useState({})


  return {
    address: [address, setAddress],
    currentPos: [currentPos, setCurrentPos],
    directionResults: [directionResults, setDirectionResults],
    showResults: [showResults, setShowResults],
    coords: [coords, setCoords],
    mapZoom: [mapZoom, setMapZoom],
    origin: [origin, setOrigin],
    destinations: [destinations, setDestinations]
  };
}

export default LocationAPI;

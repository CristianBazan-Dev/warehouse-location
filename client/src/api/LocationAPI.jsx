import { useContext, useState } from "react";
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
  const [destinations, setDestinations] = useState([])
  
  //   const gettingCoordinates = async () => {
  //   const res = await axios.get(
  //     `https://api.tomtom.com/search/2/geocode/${ware.address}, 2568 AR, Morrison.json?key=pYgfQNrQ7qbA3v32SHKsh5L5fvGt4tO4`
  //   );
  //   console.log(res.data.results[0].position.lat, res.data.results[0].position.lon);
  // };

  // gettingCoordinates();

  

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

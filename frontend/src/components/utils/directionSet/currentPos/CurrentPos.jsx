import React, { useContext } from "react";
import { GlobalState } from "../../../../GlobalState";

function CurrentPos(props) {
  const state = useContext(GlobalState);
  const [currentPos, setCurrentPos] = state.locationAPI.currentPos;
  const [coords, setCoords] = state.locationAPI.coords;
  const [mapZoom, setMapZoom] = state.locationAPI.mapZoom;

  // Current position

  const gettingCurrentPos = () => {
    if ("geolocation" in navigator) {
      const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      };

      const success = (position) => {
        setCoords({
          ...coords,
          lon: position.coords.longitude,
          lat: position.coords.latitude,
        });
        setCurrentPos(true);
        setMapZoom(14);
      };
      
      const error = (err) => {
        console.warn(`Error(${err.code}: ${err.message})`);
      };

      navigator.geolocation.getCurrentPosition(success, error, options);
    }
  };

  return (
    <div className="current-pos">
      {!currentPos && (
        <button
          className="bg-blue-500 hover:bg-blue-400 text-white font-bold m-2 py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
          onClick={() => {
            gettingCurrentPos();
          }}
        >
          Get current position
        </button>
      )}
    </div>
  );
}

export default CurrentPos;

import React, { useContext } from "react";
import { GlobalState } from "../../../../GlobalState";

function AddressTable(props) {
  const state = useContext(GlobalState);
  const [showResults, setShowResults] = state.locationAPI.showResults;
  const [directionResults, setDirectionResults] =
    state.locationAPI.directionResults;

  const [coords, setCoords] = state.locationAPI.coords;
  const [mapZoom, setMapZoom] = state.locationAPI.mapZoom;

  return (
    <div className="modal-results">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Address
            </th>
            <th scope="col" className="px-6 py-3">
              Municipality
            </th>
            <th scope="col" className="px-6 py-3">
              Department
            </th>
            <th scope="col" className="px-6 py-3">
              State
            </th>
            <th scope="col" className="px-6 py-3">
              Country
            </th>
          </tr>
        </thead>

        <tbody>
          {directionResults.map((direct, index) => {
            return (
              <tr
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 cursor-pointer hover:bg-gray-600"
                key={index}
                onClick={() => {
                  setCoords({
                    ...coords,
                    lat: direct.position.lat,
                    lon: direct.position.lon,
                  });
                  setMapZoom(14);
                  setShowResults(false);
                }}
              >
                <th className="px-4 py-1">{direct.address.streetName}</th>
                <th className="px-4 py-1">{direct.address.municipality}</th>
                <th className="px-4 py-1">
                  {direct.address.countrySecondarySubdivision ||
                    direct.address.municipalitySubdivision}
                </th>
                <th className="px-4 py-1">
                  {direct.address.countrySubdivision}
                </th>
                <th className="px-4 py-1">{direct.address.country}</th>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default AddressTable;

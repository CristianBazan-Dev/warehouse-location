import React, { useContext, useState } from "react";
import { GlobalState } from "../../../../GlobalState";
import axios from "axios";
import AddressTable from "./AddressTable";

function AddressIntro(props) {
  const state = useContext(GlobalState);
  const [address, setAddress] = state.locationAPI.address;
  const [directionResults, setDirectionResults] =
    state.locationAPI.directionResults;
  const [showResults, setShowResults] = state.locationAPI.showResults;

  const [coords, setCoords] = state.locationAPI.coords;
  const [mapZoom, setMapZoom] = state.locationAPI.mapZoom;

  // Getting coordinates of address
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress({ ...address, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.get(
      `https://api.tomtom.com/search/2/geocode/${address.address}, ${address.zip} AR, ${address.city}.json?key=pYgfQNrQ7qbA3v32SHKsh5L5fvGt4tO4`
    );
    setDirectionResults(res.data.results);
    setShowResults(true);
  };

  console.log(directionResults);

  return (
    <div className="address">
      <h2>Introduce an address</h2>
      <form onSubmit={handleSubmit} className=" ">
        <div className="ml-4">
          <label
            className="block text-gray-200 text-sm font-bold mb-2"
            htmlFor="address"
          >
            Address
          </label>
          <input
            type="text"
            className="border-2 border-gray-700 p-2 rounded-lg bg-zinc-800 block w-full my-2"
            name="address"
            onChange={handleChange}
          />
        </div>

        <div className="ml-4">
          <label
            className="block text-gray-200 text-sm font-bold mb-2"
            htmlFor="zipCode"
          >
            Zip code
          </label>
          <input
            type="number"
            className="border-2 border-gray-700 p-2 rounded-lg bg-zinc-800 block w-full my-2"
            name="zip"
            onChange={handleChange}
          />
        </div>

        <div className="ml-4">
          <label
            className="block text-gray-200 text-sm font-bold mb-2"
            htmlFor="country"
          >
            Country
          </label>
          <input
            type="text"
            className="border-2 border-gray-700 p-2 rounded-lg bg-zinc-800 block w-full my-2"
            name="country"
            onChange={handleChange}
          />
        </div>

        <div className="ml-4 mr-4">
          <label
            className="block text-gray-200 text-sm font-bold mb-2"
            htmlFor="city"
          >
            City
          </label>
          <input
            type="text"
            className="border-2    border-gray-700 p-2 rounded-lg bg-zinc-800 block w-full my-2"
            name="city"
            onChange={handleChange}
          />
        </div>

        <button className="bg-indigo-500 block py-5 px-10">Get coords</button>
      </form>

      {showResults && <AddressTable />}
    </div>
  );
}

export default AddressIntro;

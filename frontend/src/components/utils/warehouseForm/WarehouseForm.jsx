import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { GlobalState } from "../../../GlobalState";
import { IoClose } from "react-icons/io5";

function WarehouseForm(props) {
  const state = useContext(GlobalState);
  const [showModal, setShowModal] = state.showModal;
  const [newWare, setNewWare] = useState([]);

  const [locationsSelection, setLocationsSelection] = useState([]);

  const [locationConfirm, setLocationConfirm] = useState(false);
  const [selectionTable, setSelectionTable] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewWare({ ...newWare, [name]: value });
  };

  const handleSubmit = async (e) => {
    const res = await axios.post("api/create-wares", newWare);
  };

  console.log(newWare);
  useEffect(() => {
    const addingPoints = async () => {
      if (newWare.address && newWare.zip && newWare.state) {
        const searchLocation = await axios.get(
          `https://api.tomtom.com/search/2/geocode/${newWare.address}, ${newWare.zip} AR, ${newWare.state}.json?key=pYgfQNrQ7qbA3v32SHKsh5L5fvGt4tO4`
        );

        if (locationsSelection.length == 0) {
          setSelectionTable(true);
        }

        setLocationsSelection(searchLocation.data.results);
      }
    };
    addingPoints();
  });

  return (
    <div
      className={
        showModal
          ? "w-full h-full absolute top-0 left-0 bg-zinc-900/90"
          : "collapse w-full  fixed top-0 bg-zinc-900/90"
      }
    >
      <IoClose
        className="absolute right-0 w-px-500"
        onClick={() => {
          setShowModal(!showModal);
        }}
      />
      <form
        action=""
        onSubmit={handleSubmit}
        className=" w-full max-w-xs m-auto relative top-10"
      >
        <div className="mb-4">
          <label
            className="block text-gray-200 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Name
          </label>
          <input
            type="text"
            className="border-2 border-gray-700 p-2 rounded-lg bg-zinc-800 block w-full my-2"
            name="name"
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-200 text-sm font-bold mb-2"
            htmlFor="username"
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

        <div className="mb-4">
          <label
            className="block text-gray-200 text-sm font-bold mb-2"
            htmlFor="username"
          >
            State
          </label>
          <input
            type="text"
            className="border-2 border-gray-700 p-2 rounded-lg bg-zinc-800 block w-full my-2"
            name="state"
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-200 text-sm font-bold mb-2"
            htmlFor="username"
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

        <div className="mb-4">
          <label
            className="block text-gray-200 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Zip
          </label>
          <input
            type="number"
            className="border-2 border-gray-700 p-2 rounded-lg bg-zinc-800 block w-full my-2"
            name="zip"
            onChange={handleChange}
          />
        </div>

        {selectionTable && (
          <table className="w-full  justify-center align-middle text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-3 py-3">
                  Address
                </th>
                <th scope="col" className="px-3 py-3">
                  Municipality
                </th>
                <th scope="col" className="px-3 py-3">
                  Department
                </th>
                <th scope="col" className="px-3 py-3">
                  State
                </th>
                <th scope="col" className="px-3 py-3">
                  Country
                </th>
              </tr>
            </thead>

            <tbody>
              {locationsSelection.map((loc, index) => {
                return (
                  <tr
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 cursor-pointer hover:bg-gray-600"
                    key={index}
                    onClick={(e) => {
                      setNewWare({ ...newWare, ["point"]: loc.position });
                      setSelectionTable(false);
                    }}
                  >
                    <th className="px-3 py-1">{loc.address.streetName}</th>
                    <th className="px-3 py-1">{loc.address.municipality}</th>
                    <th className="px-3 py-1">
                      {loc.address.countrySecondarySubdivision ||
                        loc.address.municipalitySubdivision}
                    </th>
                    <th className="px-3 py-1">
                      {loc.address.countrySubdivision}
                    </th>
                    <th className="px-3 py-1">{loc.address.country}</th>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}

        <div className="mb-4">
          <label
            className="block text-gray-200 text-sm font-bold mb-2"
            htmlFor="productsList"
          >
            Products list
          </label>
          <input
            type="file"
            className="border-2 border-gray-700 p-2 rounded-lg bg-zinc-800 block w-full my-2"
            name="productsList"
            onChange={handleChange}
          />
        </div>

        <button className="bg-indigo-500 px-3 block py-2 w-full">Save</button>
      </form>
    </div>
  );
}

export default WarehouseForm;

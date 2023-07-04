import { useContext } from "react";
import { GlobalState } from "../../../../GlobalState";

function CoordsIntro(props) {
  const state = useContext(GlobalState);
  const [coords, setCoords] = state.locationAPI.coords;
  const [mapZoom, setMapZoom] = state.locationAPI.mapZoom;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCoords({ ...coords, [name]: value });
    setMapZoom(14);
  };

  
  return (
    <div className="coords">
      <h2>Introduce coords</h2>
      <form action="" className=" w-50 flex  m-auto">
        <div className="ml-4">
          <label
            className="block text-gray-200 text-sm font-bold mb-2"
            htmlFor="lat"
          >
            Latitude
          </label>
          <input
            type="number"
            className="border-2 border-gray-700 p-2 rounded-lg bg-zinc-800 block w-full my-2"
            name="lat"
            onChange={handleChange}
            value={coords.lat}
          />
        </div>

        <div className="ml-4">
          <label
            className="block text-gray-200 text-sm font-bold mb-2"
            htmlFor="lon"
          >
            Longitude
          </label>
          <input
            type="number"
            className="border-2 border-gray-700 p-2 rounded-lg bg-zinc-800 block w-full my-2"
            name="lon"
            onChange={handleChange}
            value={coords.lon}
          />
        </div>
      </form>
    </div>
  );
}

export default CoordsIntro;

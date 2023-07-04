import React, { useContext } from "react";
import axios from "axios";
import { GlobalState } from "../../../GlobalState";
import { IoTrash } from "react-icons/io5";
function Table(props) {
  const state = useContext(GlobalState);
  const [showModal, setShowModal] = state.showModal;
  const [mapModal, setMapModal] = state.mapModal;
  const [wareSelected, setWareSelected] = state.wareSelected

  const [wares, setWares] = state.wares.wares;
  const [isManag, setIsManag] = state.userAPI.isManag;
  
  const deleteWare = async (id) => {
    const res = await axios.delete(`api/delete-ware/${id}`);

    if (res.status == 204) {
      setWares(wares.filter((ware) => ware._id !== id));
    }
  };

  const showMapModal = async(id) => {
    
  }
  
  return (
    <div
      className={ 
        showModal || mapModal
          ? " blur-sm transition ease-out relative overflow-x-auto"
          : "relative overflow-x-auto"
      }
    >
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Code
            </th>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Address
            </th>
            <th scope="col" className="px-6 py-3">
              State
            </th>
            <th scope="col" className="px-6 py-3">
              Country
            </th>
            <th scope="col" className="px-6 py-3">
              Zip
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {wares.map((ware) => {
            return (
              <tr
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 cursor-pointer hover:bg-gray-600"
                key={ware._id}
                onClick={() => {
                  setMapModal(!mapModal)
                  setWareSelected(ware._id);
                }}
              >
                <th className="px-6 py-4">{ware._id}</th>
                <th className="px-6 py-4">{ware.name}</th>
                <th className="px-6 py-4">{ware.address}</th>
                <th className="px-6 py-4">{ware.state}</th>
                <th className="px-6 py-4">{ware.country}</th>
                <th className="px-6 py-4">{ware.zip}</th>
                <td className="align-middle">
                  <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center mr-2">
                    <svg
                      className="fill-current w-4 h-3  mr-2"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
                    </svg>
                    <span>Download</span>
                  </button>
              
              {isManag && (
                  <button className="bg-red-400 hover:bg-red-700 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center mr-2">
                  <IoTrash
                    onClick={async () => {
                      if (
                        !window.confirm(
                          `Are you sure you want to delete ${ware.name}?`
                        )
                      )
                        return;
                      await deleteWare(ware._id);
                    }}
                  />
                </button>
              )}

                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {isManag && (
        <button
          className="bg-blue-500 hover:bg-blue-400 text-white font-bold m-10 py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
          onClick={() => {
            setShowModal(!showModal);
          }}
        >
          New warehouse
        </button>
      )}
    </div>
  );
}

export default Table;

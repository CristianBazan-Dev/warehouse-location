import { useState, useEffect, createContext } from "react";
import axios from "axios";
import WarehousesAPI from "./api/WarehousesAPI";
import UsersAPI from "./api/UsersAPI";
import LocationAPI from "./api/LocationAPI";

export const GlobalState = createContext();

export const DataProvider = ({ children }) => {
  const [showModal, setShowModal] = useState(false);
  const [mapModal, setMapModal] = useState(false);
  const [wareSelected, setWareSelected] = useState();
  const [token, setToken] = useState(false);
  const [isRegister, setIsRegister] = useState(false);

  const api_key = import.meta.env.VITE_TOM_TOM_KEY;

  useEffect(() => {
    const firstLogin = localStorage.getItem("firstLogin");

    if (firstLogin) {
      const refreshToken = async () => {
        const res = await axios.get("users/refresh_token");
        setToken(res.data.accessToken);

        setTimeout(() => {
          refreshToken();
        }, 10 * 60 * 1000);
      };
      refreshToken();
    }
    
  }, []);

  const state = {
    isRegister: [isRegister, setIsRegister],
    token: [token, setToken],
    showModal: [showModal, setShowModal],
    mapModal: [mapModal, setMapModal],
    wareSelected: [wareSelected, setWareSelected],
    wares: WarehousesAPI(),
    userAPI: UsersAPI(token),
    locationAPI: LocationAPI(), 
    api_key: api_key,
  };

  return <GlobalState.Provider value={state}>{children}</GlobalState.Provider>;
};

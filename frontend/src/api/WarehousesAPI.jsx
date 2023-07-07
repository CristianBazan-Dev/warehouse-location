import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { GlobalState } from "../GlobalState";

function WarehousesAPI(props) {
  const state = useContext(GlobalState)
  const [wares, setWares] = useState([]);
  const [ware, setWare] = useState([]); 
  const [waresLocation, setWaresLocation] = useState([]); 

  useEffect(() => {
    const getWares = async () => {
      const res = await axios.get("api/wares"); 
      setWares(res.data);
    };
    getWares();
  }, []);

  return {
    wares: [wares, setWares],
    ware: [ware, setWare],
    waresLocation: [waresLocation, setWaresLocation], 
  };
}

export default WarehousesAPI;

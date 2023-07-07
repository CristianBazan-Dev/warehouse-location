import React, { useContext } from "react";
import Table from "../../utils/table/Table";
import WarehouseForm from "../../utils/warehouseForm/WarehouseForm";
import MapModal from "../../utils/mapModal/MapModal";
import { GlobalState } from "../../../GlobalState";
import Presentation from "../../utils/presentation/Presentation";
import AboutUs from "../../utils/aboutUs/AboutUs";
import Products from "../../utils/products/Products";
import Contact from "../../utils/contact/Contact";
import './index.css'
function Index(props) {
  const state = useContext(GlobalState);
  const [isLogged, setIsLogged] = state.userAPI.isLogged;
  const [mapModal, setMapModal] = state.mapModal;
  const [wareSelected, setWareSelected] = state.wareSelected;

  return (
    <div>
      {isLogged ? (
        <>
          <Table />
          <WarehouseForm />
          {mapModal && <MapModal id={wareSelected} />}
        </>
      ) : (
        <div className="home-page">
          <Presentation />
          <Products/>
          <AboutUs />
          <Contact/>
        </div>
      )}
    </div>
  );
}

export default Index;

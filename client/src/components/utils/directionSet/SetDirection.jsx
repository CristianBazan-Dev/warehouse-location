import { useContext, useState } from "react";
import axios from "axios";
import { GlobalState } from "../../../GlobalState";
import "./setdirection.css";
import AddressIntro from "./addressIntroduction/AddressIntro";
import CoordsIntro from "./coordsIntroduction/CoordsIntro";
import CurrentPos from "./currentPos/CurrentPos";

function SetDirection(props) {
  // Getting address by coords

 return (
    <div className="address-introduction">
      <AddressIntro />

      <h2>Or</h2>

      <CoordsIntro />

      <h2>Or you cant set your location automatically</h2>
      <CurrentPos/>
    </div>
  );
}

export default SetDirection;

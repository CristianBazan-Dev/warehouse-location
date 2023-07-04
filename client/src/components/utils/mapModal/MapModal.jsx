import { useContext, useEffect, useRef, useState } from "react";
import { GlobalState } from "../../../GlobalState";

import axios from "axios";

import "@tomtom-international/web-sdk-maps/dist/maps.css";
import * as tt from "@tomtom-international/web-sdk-maps";
import * as ttapi from "@tomtom-international/web-sdk-services"

import { IoClose } from "react-icons/io5";
import "./mapmodal.css";

import DirectionSet from "../directionSet/SetDirection";
import SetDirection from "../directionSet/SetDirection";

function MapModal({ id }) {
  const state = useContext(GlobalState);
  const mapElement = useRef();

  const [mapModal, setMapModal] = state.mapModal;
  const [ware, setWare] = state.wares.ware;
  const [wares, setWares] = state.wares.wares;
  const [waresLocation, setWaresLocation] = useState({});

  const [mapView, setMapView] = useState([]);

  const [coords, setCoords] = state.locationAPI.coords;
  const [mapZoom, setMapZoom] = state.locationAPI.mapZoom;

  const [origin, setOrigin] = state.locationAPI.origin;
  const [destinations, setDestinations] = state.locationAPI.destinations;
  const [jobId, setJobId] = useState("");
  const [distanceData, setDistanceData] = useState([]);
  const api_key = state.api_key;

  // useEffect(() => {
  //   const gettingWare = async () => {
  //     const res = await axios.get(`api/wares/${id}`);
  //     setWare(res.data);
  //   };
  //   gettingWare();
  // }, [id]);

  const drawRoute = (geojson) => {
    if(mapStl.getLayer('route')){
      mapStl.removeLayer('route')
      mapStl.removeSource('route')
    }

    mapStl.addLayer({
      id: 'route', 
      type: 'line', 
      source: {
        type: geojson, 
        data: geojson
      },
      paint: {
        'line-color': 'red',
        'line-width': 6, 
      }
    })

  }

  useEffect(() => {
    // Setting origin
    const origins = {
      point: {
        latitude: coords.lat,
        longitude: coords.lon,
      },
    };
    // Setting destinations

    wares.map((ware) => {
      setDestinations({ ...destinations, ["point"]: ware.point });
    });

    // Setting calcRoute request

    const options = {
      departAt: new Date(),
      routeType: "fastest",
      traffic: "historical",
      travelMode: "truck",
      vehicleMaxSpeed: 90,
      vehicleWeight: 12000,
      vehicleAxleWeight: 4000,
      vehicleLength: 13.6,
      vehicleWidth: 2.42,
      vehicleHeight: 2.4,
      vehicleCommercial: true,
      vehicleLoadType: ["otherHazmatExplosive", "otherHazmatGeneral"],
      vehicleAdrTunnelRestrictionCode: "C",
      avoid: ["unpavedRoads"],
    };

    const sendingCalcRequest = async () => {
      const calcRequest = {
        origins: [origins],
        destinations: [destinations],
        options: options,
      };

      const calcArray = JSON.stringify(calcRequest);
      console.log(calcArray);
      const sendCalc = await axios.post(
        `https://api.tomtom.com/routing/matrix/2/async?key=${api_key}`,
        calcArray,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setJobId(sendCalc.data.jobId);

      if (sendCalc.data.jobId) {
        const obtainingCalc = await axios.get(
          `https://api.tomtom.com/routing/matrix/2/async/${sendCalc.data.jobId}/result?key=${api_key}`
        );
        setDistanceData(obtainingCalc.data);
        console.log(obtainingCalc.data);
      }
    };

    sendingCalcRequest();


    // Setting map
    const mapStl = tt.map({
      key: api_key,
      container: mapElement.current,
      stylesVisibility: {
        trafficIncidents: true,
        trafficFlow: true,
      },
      center: coords,
      zoom: mapZoom,
    });
    setMapView(mapStl);

    // Adding position marker
    const element = document.createElement("div");
    element.className = "marker";

    const addMarker = () => {
      const popupOffset = {
        bottom: [0, -25],
      };
      const popup = new tt.Popup({
        offset: popupOffset,
      }).setHTML("This is you!");

      const marker = new tt.Marker({
        draggable: true,
        element: element,
      })
        .setLngLat(coords)
        .addTo(mapStl);

      // Moving the marker
      marker.on("dragend", () => {
        const lngLat = marker.getLngLat();
        setCoords({ ...coords, lat: lngLat.lat, lon: lngLat.lng });
      });

      marker.setPopup(popup).togglePopup();
    };

    addMarker();

    // Adding automatic markers through out click
    const addDeliveryMarker = (lngLat, map) => {
      const element = document.createElement("div");
      element.className = "marker-delivery";
      new tt.Marker({
        element: element,
      })
        .setLngLat(lngLat)
        .addTo(map);
    };

    mapStl.on("click", (e) => {
      setDestinations({
        ...destinations,
        point: { latitude: e.lngLat.lat, longitude: e.lngLat.lng },
      });
      addDeliveryMarker(e.lngLat, mapStl);
    });


    // Drawing the route 


    return () => mapStl.remove();
  }, [coords.lat, coords.lon]);

  return (
    <div
      className={
        mapModal ? "modalMap active fixed top-10 w-full h-full" : "modalMap "
      }
    >
      <IoClose
        className="absolute top-0 right-5 z-20"
        onClick={() => {
          setMapModal(false);
        }}
      />

      <h1>Map</h1>

      <SetDirection />

      <div className="map-container">
        <div className="mapView" ref={mapElement}>
          {/* <div className="storeInfo">
          <h2>{ware._id}</h2>
          <h2>{ware.name}</h2>
          <h2>{ware.address}</h2>
          <h2>{ware.state}</h2>
          <h2>{ware.country}</h2>
          <h2>{ware.zip}</h2>
        </div>  */}
        </div>
      </div>
    </div>
  );
}

export default MapModal;

import { useContext, useEffect, useRef, useState } from "react";
import { GlobalState } from "../../../GlobalState";

import axios from "axios";

import "@tomtom-international/web-sdk-maps/dist/maps.css";
import * as tt from "@tomtom-international/web-sdk-maps";
import * as ttapi from "@tomtom-international/web-sdk-services";

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

  useEffect(() => {
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

    // Drawing the destinations
    const addDestinationsMarkers = (lngLat, map) => {
      const element = document.createElement("div");
      element.className = "marker-destinations";
      new tt.Marker({
        element: element,
      })
        .setLngLat(lngLat)
        .addTo(map);
    };

    addDestinationsMarkers(destinations, mapStl);

    // Drawing the route
    console.log(destinations);

    function findFirstBuildingLayerId() {
      var layers = mapStl.getStyle().layers;
      for (var index in layers) {
        if (layers[index].type === "fill-extrusion") {
          return layers[index].id;
        }
      }

      throw new Error(
        "Map style does not contain any layer with fill-extrusion type."
      );
    }

    mapStl.once("load", () => {
      ttapi.services
        .calculateRoute({
          key: api_key,
          // maxAlternatives: 2,
          traffic: false,
          locations: `${coords.lon},${coords.lat}:${destinations.lon},${destinations.lat}`,
        })
        .then((response) => {
          var geojson = response.toGeoJson();
          mapStl.addLayer(
            {
              id: "route",
              type: "line",
              source: {
                type: "geojson",
                data: geojson,
              },
              paint: {
                "line-color": "#4a90e2",
                "line-width": 8,
              },
            },
            findFirstBuildingLayerId()
          );

          addMarker(geojson.features[0]);

          var bounds = new tt.LngLatBounds();
          geojson.features[0].geometry.coordinates.forEach(function (point) {
            bounds.extend(tt.LngLat.convert(point));
          });
          mapStl.fitBounds(bounds, { duration: 0, padding: 50 });
        });
    });


    

  

    return () => mapStl.remove();
  }, []);

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

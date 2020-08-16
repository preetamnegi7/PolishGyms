import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup, GeolocateControl } from "react-map-gl";
import * as gymData from "../Data/data.json";

export default function Map() {
  const [viewport, setViewport] = useState({
    latitude: 52.2297,
    longitude: 21.0122,
    zoom: 14,
    width: "100vw",
    height: "87vh",
  });

  const [selectedGym, setSelectedGym] = useState(null);

  useEffect(() => {
    const listener = (e) => {
      if (e.key === "Escape") {
        setSelectedGym(null);
      }
    };
    window.addEventListener("keydown", listener);
    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);
  return (
    <div>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        mapStyle="mapbox://styles/preetamnegi7/ckcpzafdy0y5g1il910ddvc5w"
        onViewportChange={(viewport) => {
          setViewport(viewport);
        }}
      >
        {gymData.features.map((gym) => (
          <Marker
            key={gym.properties.GYM_ID}
            latitude={gym.geometry.coordinates[0]}
            longitude={gym.geometry.coordinates[1]}
          >
            <button
              className="gym-logo"
              onClick={(e) => {
                e.preventDefault();
                setSelectedGym(gym);
              }}
            >
              <img src="gym.svg" alt="Gym Icon" />
            </button>
          </Marker>
        ))}
        {selectedGym ? (
          <Popup
            latitude={selectedGym.geometry.coordinates[0]}
            longitude={selectedGym.geometry.coordinates[1]}
            onClose={() => {
              setSelectedGym(null);
            }}
          >
            <div>
              <h2>{selectedGym.properties.NAME}</h2>
              <p>{selectedGym.properties.ADDRESS}</p>
            </div>
          </Popup>
        ) : null}
        <GeolocateControl
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation={true}
        />
      </ReactMapGL>
    </div>
  );
}

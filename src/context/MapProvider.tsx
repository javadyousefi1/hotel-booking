"use client"
import { createContext, useContext, useReducer, useRef } from "react";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Create Context for the map state
const Map = createContext();

// Initial state for the reducer
const INITIAL_STATE = {
  mapInstance: null,  // Store the actual map instance here
};

function reducer(state, action) {
  switch (action.type) {
    case "initialize-map":


      var tl = new L()

      tl.map(action.payload.current).setView([35.714548, 51.360095], 12);

      // If the map is already initialized, don't re-initialize

      // // Initialize the map only once
      // const map = L.map(action.payload.current).setView([35.714548, 51.360095], 12);

      // // Optionally add a tile layer
      // L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      //   attribution: "&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors",
      // }).addTo(map);

      // Store the map instance in state
      return {
        // ...state,
        // mapInstance: map,
      };

    default:
      return state;
  }
}

// MapProvider component to wrap your app and provide map context
const MapProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  return (
    <Map.Provider value={{ state, dispatch }}>
      {children}
    </Map.Provider>
  );
};

export default MapProvider;
export const useMap = () => useContext(Map);

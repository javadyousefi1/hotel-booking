"use client"
import { useMap } from "@/context/MapProvider";
import { useEffect, useRef } from "react";

const Test = () => {
  const mapRef = useRef(null); // Reference to the DOM element where the map will be initialized
  const { state, dispatch } = useMap();

  useEffect(() => {
    // Dispatch to initialize the map only if it's not initialized yet
    if (mapRef.current && !state.mapInstance) {
      dispatch({ type: "initialize-map", payload: mapRef });
    }
  }, [state.mapInstance, dispatch]);  // Run the effect only when the map instance is not initialized

  return (
    <div ref={mapRef} style={{ height: "100vh" }}></div> // Ensure the map container has a size
  );
};

export default Test;

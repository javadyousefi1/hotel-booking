"use client";
import { useEffect, useRef } from "react";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const Map = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current) {
      const map = L.map(mapRef.current).setView([35.714548, 51.360095], 12);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors",
      }).addTo(map);

      L.marker([35.714548, 51.360095]).addTo(map).bindPopup("A pretty CSS3 popup. <br /> Easily customizable.");

      return () => {
        map.remove(); // Clean up when the component unmounts
      };
    }
  }, []);

  return (
    <div className="mt-32" style={{ height: '300px', width: '100%' }} ref={mapRef}></div>
  );
};

export default Map;

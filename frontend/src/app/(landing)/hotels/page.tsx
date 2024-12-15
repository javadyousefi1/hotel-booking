"use client"
import MapProvider from '@/context/MapProvider';
import { MapContainer, TileLayer } from "react-leaflet";

import dynamic from 'next/dynamic';

const Test = dynamic(() => import('./Test'), { ssr: false });
const position = [35.714548, 51.360095];

const Page = () => {
  return (
    <>
      {/* <MapProvider>
      <Test />
    </MapProvider> */}
      <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      </MapContainer>




    </>
  );
};

export default Page;

"use client"
import MapProvider from '@/context/MapProvider';
import dynamic from 'next/dynamic';

const Test = dynamic(() => import('./Test'), { ssr: false });

const Page = () => {
  return (
    <MapProvider>
      <Test />
    </MapProvider>
  );
};

export default Page;

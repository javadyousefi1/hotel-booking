"use client"
import dynamic from 'next/dynamic';
const DynamicMap = dynamic(() => import('@/components/Map'), { ssr: false });

const Page = () => {
  return <>
  <div className="h-[80dvh] w-full">
        <DynamicMap center={[51.404343, 35.715298,].reverse()} zoom={13} />
      </div></>
}

export default Page
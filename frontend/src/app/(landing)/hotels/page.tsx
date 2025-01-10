"use client"
import HotelCarts from '@/components/landing/HotelCarts';
import dynamic from 'next/dynamic';
const DynamicMap = dynamic(() => import('@/components/Map'), { ssr: false });

const Page = () => {
  return <>
    {/* <div className="h-[80dvh] w-full">
        <DynamicMap center={[51.404343, 35.715298,].reverse()} zoom={13} />
      </div>
       */}

    <div className='container mx-auto'>
      <div className='h-[calc(100dvh-90px)] flex  scrollbar'>
        <div className='overflow-y-auto pr-8 min-w-[700px]'>
          <HotelCarts title='Entire home in Bordeaux' subTitle='Bordeaux Getaway' guest={4} beds={2} perNight={320} star={5} baths={3} reviews={12} hasKitchen hasParking hasWifi />
          <HotelCarts title='Entire home in Bordeaux' subTitle='Bordeaux Getaway' guest={4} beds={2} perNight={320} star={5} baths={3} reviews={12} hasKitchen hasParking hasWifi />
          <HotelCarts title='Entire home in Bordeaux' subTitle='Bordeaux Getaway' guest={4} beds={2} perNight={320} star={5} baths={3} reviews={12} hasKitchen hasParking hasWifi />
          <HotelCarts title='Entire home in Bordeaux' subTitle='Bordeaux Getaway' guest={4} beds={2} perNight={320} star={5} baths={3} reviews={12} hasKitchen hasParking hasWifi />
          <HotelCarts title='Entire home in Bordeaux' subTitle='Bordeaux Getaway' guest={4} beds={2} perNight={320} star={5} baths={3} reviews={12} hasKitchen hasParking hasWifi />
          <HotelCarts title='Entire home in Bordeaux' subTitle='Bordeaux Getaway' guest={4} beds={2} perNight={320} star={5} baths={3} reviews={12} hasKitchen hasParking hasWifi />
          <HotelCarts title='Entire home in Bordeaux' subTitle='Bordeaux Getaway' guest={4} beds={2} perNight={320} star={5} baths={3} reviews={12} hasKitchen hasParking hasWifi />
          <HotelCarts title='Entire home in Bordeaux' subTitle='Bordeaux Getaway' guest={4} beds={2} perNight={320} star={5} baths={3} reviews={12} hasKitchen hasParking hasWifi />
          <HotelCarts title='Entire home in Bordeaux' subTitle='Bordeaux Getaway' guest={4} beds={2} perNight={320} star={5} baths={3} reviews={12} hasKitchen hasParking hasWifi />
          <HotelCarts title='Entire home in Bordeaux' subTitle='Bordeaux Getaway' guest={4} beds={2} perNight={320} star={5} baths={3} reviews={12} hasKitchen hasParking hasWifi />
          <HotelCarts title='Entire home in Bordeaux' subTitle='Bordeaux Getaway' guest={4} beds={2} perNight={320} star={5} baths={3} reviews={12} hasKitchen hasParking hasWifi />
          <HotelCarts title='Entire home in Bordeaux' subTitle='Bordeaux Getaway' guest={4} beds={2} perNight={320} star={5} baths={3} reviews={12} hasKitchen hasParking hasWifi />

        </div>

        <div className="h-full w-full p-3">
          <DynamicMap center={[51.404343, 35.715298,].reverse()} zoom={13} />
        </div>
      </div>


    </div>
  </>
}

export default Page
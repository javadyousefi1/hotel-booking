"use client"
import HotelCarts from '@/components/landing/HotelCarts';
import dynamic from 'next/dynamic';
const DynamicMap = dynamic(() => import('@/components/landing/map/Map'), { ssr: false });

// Updated LocType definition
export type LocType = [number, number];

// Fake data for HotelCarts with location as [lat, lng]
const hotelData: {
  title: string;
  subTitle: string;
  guest: number;
  beds: number;
  baths: number;
  perNight: number;
  star: number;
  reviews: number;
  hasWifi: boolean;
  hasParking: boolean;
  hasKitchen: boolean;
  location: LocType;
  coverImage: string;
}[] = [
    {
      title: "Cozy Apartment",
      subTitle: "Luxury Suite in Downtown",
      guest: 2,
      beds: 1,
      baths: 1,
      perNight: 120,
      star: 4.5,
      reviews: 120,
      hasWifi: true,
      hasParking: true,
      hasKitchen: true,
      location: [40.7128, -74.006], // New York
      coverImage: "https://source.unsplash.com/random/320x200/?apartment",
    },
    {
      title: "Beach House",
      subTitle: "Ocean View Retreat",
      guest: 6,
      beds: 3,
      baths: 2,
      perNight: 250,
      star: 4.8,
      reviews: 85,
      hasWifi: true,
      hasParking: true,
      hasKitchen: true,
      location: [34.0522, -118.2437], // Los Angeles
      coverImage: "https://source.unsplash.com/random/320x200/?beach-house",
    },
    {
      title: "Mountain Cabin",
      subTitle: "Charming Cabin in the Woods",
      guest: 4,
      beds: 2,
      baths: 1,
      perNight: 180,
      star: 4.7,
      reviews: 50,
      hasWifi: true,
      hasParking: false,
      hasKitchen: true,
      location: [39.7392, -104.9903], // Denver
      coverImage: "https://source.unsplash.com/random/320x200/?cabin",
    },
    {
      title: "City Loft",
      subTitle: "Modern Loft with Skyline Views",
      guest: 2,
      beds: 1,
      baths: 1,
      perNight: 140,
      star: 4.2,
      reviews: 200,
      hasWifi: true,
      hasParking: false,
      hasKitchen: false,
      location: [51.5074, -0.1278], // London
      coverImage: "https://source.unsplash.com/random/320x200/?loft",
    },
    {
      title: "Countryside Villa",
      subTitle: "Relaxing Getaway in the Countryside",
      guest: 8,
      beds: 4,
      baths: 3,
      perNight: 300,
      star: 4.9,
      reviews: 75,
      hasWifi: true,
      hasParking: true,
      hasKitchen: true,
      location: [48.8566, 2.3522], // Paris
      coverImage: "https://source.unsplash.com/random/320x200/?villa",
    },
  ];


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

          {hotelData?.map((item, index) => <HotelCarts {...item} key={index} />)}
        </div>

        <div className="h-full w-full p-3">
          <DynamicMap center={[51.404343, 35.715298,].reverse()} zoom={13} />
        </div>
      </div>


    </div>
  </>
}

export default Page
import Image from "next/image";
import { Separator } from "../ui/separator";

const starIcon = (<svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M7.00001 0.958252L8.45834 5.54158H13.0417L9.29168 8.45825L10.5417 13.0416L7.00001 10.1249L3.45834 13.0416L4.70834 8.45825L0.958344 5.54158H5.54168L7.00001 0.958252Z" fill="#FCD34D" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
</svg>)

const HotelCarts: React.FC<{ title: string, subTitle: string, guest: number, beds: number, baths: number, perNight: number, star: number, reviews: number, hasWifi: boolean, hasParking: boolean, hasKitchen: boolean }> = ({ title, subTitle, guest, baths, beds, perNight, reviews, star, hasKitchen, hasParking, hasWifi }) => {
    return (<div className="w-full">
        <Separator />
        <div className="flex justify-start gap-x-10 my-6 w-full md:flex-row flex-col gap-y-4">
            <Image src="/assets/images/landing.png" className="md:!w-[320px] aspect-video object-cover object-center rounded-xl !h-[200px]" width={320} height={300} quality={100} alt="sweet home" />
            <div className="flex-1">
                <p className="text-sm text-gray-500">{title}</p>
                <h6 className="text-gray-700 text-2xl font-bold mt-1">{subTitle}</h6>

                <Separator className="w-[40px] my-4" />

                <p className="text-gray-500 text-sm">{guest} guest · {beds} beds · {baths} baths </p>
                <p className="text-gray-500 text-sm">{hasWifi && "Wifi · "} {hasKitchen && "Kitchen ·"} {hasParking && "Free Parking"}</p>

                <Separator className="w-[40px] my-4" />

                <div className="flex justify-between items-center gap-x-20">
                    <div className="flex items-center gap-x-3">
                        <p className="text-lg text-gray-700 flex gap-x-2 items-center">{String(star).padEnd(3, ".0")}{starIcon}</p>
                        <p className="text-sm text-gray-700">({reviews} reviews)</p>
                    </div>

                    <div>
                        <p className="font-bold text-lg">${perNight} <span className="text-sm font-medium">/night</span></p>
                    </div>
                </div>
            </div>
        </div>

    </div>);
}

export default HotelCarts;
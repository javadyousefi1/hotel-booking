import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import Image from "next/image";

const Page = () => {
    return (<div className=" h-[calc(100dvh-0px)]  ">
        <div className="container mx-auto pt-32">

            <Card className="rounded-[34px] py-4 px-2 flex justify-evenly items-center ">
                <CardContent className="pb-0 flex justify-center items-start flex-col">
                    <CardTitle>
                        <p className="font-semibold ">Location</p>
                    </CardTitle>
                    <CardDescription>
                        <p className="text-gray-500">Where are you going?</p>
                    </CardDescription>
                </CardContent>
                <Separator orientation="vertical" />
                <CardContent className="pb-0 flex justify-center items-start flex-col">
                    <CardTitle>

                        <p className="font-semibold">Check in</p>
                    </CardTitle>
                    <CardDescription>
                        <p className="text-gray-500">Add dates</p>
                    </CardDescription>
                </CardContent>
                <Separator orientation="vertical" />

                <CardContent className="pb-0 flex justify-center items-start flex-col">
                    <CardTitle>
                        <p className="font-semibold">Check out</p>
                    </CardTitle>
                    <CardDescription>
                        <p className="text-gray-500">Add dates</p>
                    </CardDescription>
                </CardContent>
                <Separator orientation="vertical" />

                <CardContent className="pb-0 flex justify-center items-start flex-col">
                    <CardTitle>
                        <p className="font-semibold">Guests</p>
                    </CardTitle>
                    <CardDescription>
                        <p className="text-gray-500">Add guests</p>
                    </CardDescription>
                </CardContent>
                <Separator orientation="vertical" />
                <CardContent className="pb-0 flex justify-center items-start flex-col">
                    <Button className="!bg-primary w-14 h-14 rounded-full">Button</Button>
                </CardContent>
            </Card>

            <div className="h-[80dvh]">
                <Image src="/assets/images/landing.png" width={800} height={1900} className="object-cover object-center !w-full mt-4 h-full !rounded-lg" alt="sweet home" />
            </div>
        </div>

    </div>);
}

export default Page;
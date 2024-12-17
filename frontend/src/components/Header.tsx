"use client"
import * as React from "react"
import Link from "next/link"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import Image from "next/image"
import useUserStore from "@/store/userStore"
import { Button } from "./ui/button"
import { LogIn, Menu } from "lucide-react"
import useMediaQuery from "@/hooks/use-media-query"

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

export default function NavigationMenuDemo() {

    const { isAuthenticated } = useUserStore()
    const isDesktop = useMediaQuery('(min-width: 768px)')

    return (
        <header className="py-4  fixed top-0 left-0 right-0  border border-b bg-white px-4">
            <div className="flex justify-between items-center  container mx-auto">

                {/* logo */}
                <Image src="/assets/images/logo.svg" width={100} height={20} alt="logo" className="object-cover" />
                {/* nav menu */}
                <NavigationMenu className="md:block hidden">
                    <NavigationMenuList className="flex gap-x-4">
                        <NavigationMenuItem>
                            <Link href="/home" legacyBehavior passHref>
                                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                    Home
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <Link href="/hotels" legacyBehavior passHref>
                                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                    Hotels
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>


                {/* login | user profile */}
                {isDesktop && (isAuthenticated ?
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    :
                    <Button><LogIn size={44} /></Button>)}


                <Sheet >
                    {!isDesktop &&
                        <SheetTrigger asChild>
                            <Button><Menu size={48} /></Button>

                        </SheetTrigger>
                    }
                    <SheetContent side="left">
                        <SheetHeader>
                            <SheetTitle></SheetTitle>
                            {/* <SheetDescription>
                            Make changes to your profile here. Click save when you're done.
                        </SheetDescription> */}
                        </SheetHeader>

                        {/* nav menu */}
                        <NavigationMenu>
                            <NavigationMenuList className="flex gap-y-4 flex-col">
                                <NavigationMenuItem>
                                    <Link href="/home" legacyBehavior passHref>
                                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                            Home
                                        </NavigationMenuLink>
                                    </Link>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <Link href="/hotels" legacyBehavior passHref>
                                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                            Hotels
                                        </NavigationMenuLink>
                                    </Link>
                                </NavigationMenuItem>
                            </NavigationMenuList>
                        </NavigationMenu>


                        <SheetFooter>
                            <SheetClose asChild>
                                {(isAuthenticated ?
                                    <Avatar>
                                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    :
                                    <Button className="mt-10"><LogIn size={44} />
                                        <span>Login</span>
                                    </Button>)}
                            </SheetClose>
                        </SheetFooter>
                    </SheetContent>
                </Sheet>
            </div>

        </header>
    )
}

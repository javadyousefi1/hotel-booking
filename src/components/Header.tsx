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
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import Image from "next/image"

export default function NavigationMenuDemo() {
    return (
        <header className="flex justify-between items-center py-4 container mx-auto">
            {/* logo */}
            <Image src="/assets/images/logo.svg" width={100} height={20} alt="logo" className="object-cover" />
            {/* nav menu */}
            <NavigationMenu >
                <NavigationMenuList>
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
            <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
        </header>
    )
}

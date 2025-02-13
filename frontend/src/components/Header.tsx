'use client';
import * as React from 'react';
import Link from 'next/link';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import Image from 'next/image';
import { Button } from './ui/button';
import { Menu } from 'lucide-react';

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import Profile from './landing/Profile';

export default function NavigationMenuDemo() {
  return (
    <header className="py-4  fixed top-0 left-0 right-0  border border-b bg-white px-14 z-10">
      <div className="flex justify-between items-center  container mx-auto">
        {/* logo */}
        <Image
          src="/assets/images/logo.svg"
          width={100}
          height={20}
          alt="logo"
          className="object-cover"
        />
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
        <div className="hidden md:block">
          <Profile />
        </div>

        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button>
              <Menu size={48} />
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle></SheetTitle>
            </SheetHeader>

            {/* nav menu */}
            <NavigationMenu>
              <NavigationMenuList className="flex gap-y-4 flex-col">
                <NavigationMenuItem>
                  <Link href="/home" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      Home
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/hotels" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      Hotels
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <SheetFooter>
              <SheetClose asChild>
                <Profile />
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

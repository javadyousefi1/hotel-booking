"use client";

import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Menu, Undo2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const router = useRouter()

    return (
        <main className="h-screen flex justify-center items-center w-full relative">
            <Button onClick={() => router.back()} variant="outline" className="absolute top-6 right-6"><Undo2 size={48} /></Button>
            {children}
        </main>
    );
}

import Header from "@/components/Header";

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className="h-screen flex justify-center items-center w-full">
            {children}
        </main>
    );
}

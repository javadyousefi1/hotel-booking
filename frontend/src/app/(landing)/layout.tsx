import Header from "@/components/Header";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Header />
            <section className="dwedwed pt-[74px]">
                {children}
            </section>
        </>
    );
}

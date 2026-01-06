import { PropsWithChildren } from "react";
import GuestNavbar from "@/Components/Guest/GuestNavbar";
import DotGrid from "@/Components/DotGrid";

export default function GuestLayout({ children }: PropsWithChildren) {
    return (
        <div className="relative min-h-screen overflow-hidden">
            {/* DOT BACKGROUND */}
            <div className="absolute inset-0 -z-10">
                <DotGrid
                    dotSize={3}
                    gap={15}
                    baseColor="#E8E6FF"
                    proximity={0}
                    shockRadius={0}
                />
            </div>

            <GuestNavbar brand="Pera" />

            {/* FOREGROUND CONTENT */}
            <main className="min-h-screen flex flex-col items-center justify-center">
                {children}
            </main>
        </div>
    );
}

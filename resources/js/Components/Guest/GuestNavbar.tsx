import React, { useEffect, useRef, useState } from "react";
import { Link } from "@inertiajs/react";
import { Button } from "@/Components/ui/button"; // or your local Button if not shared

interface GuestNavbarProps {
    brand?: string;
    onSignIn?: () => void;
}

export default function GuestNavbar({
    brand = "SaaS",
    onSignIn,
}: GuestNavbarProps) {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement | null>(null);
    const triggerRef = useRef<HTMLButtonElement | null>(null);

    useEffect(() => {
        if (!menuOpen) return;

        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = prev;
        };
    }, [menuOpen]);

    useEffect(() => {
        const onDoc = (e: MouseEvent) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(e.target as Node) &&
                triggerRef.current &&
                !triggerRef.current.contains(e.target as Node)
            ) {
                setMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", onDoc);
        return () => document.removeEventListener("mousedown", onDoc);
    }, []);

    const navItems = [
        { id: "features", label: "Features" },
        { id: "pricing", label: "Pricing" },
        { id: "about", label: "About" },
    ];

    return (
        <nav className="fixed top-0 inset-x-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Brand */}
                    <Link href="/" className="text-xl font-bold tracking-tight">
                        {brand}
                    </Link>

                    {/* Desktop */}
                    <div className="hidden md:flex items-center gap-8">
                        <Link href={route("login")}>
                            <Button size="sm">Sign In</Button>
                        </Link>
                    </div>

                    {/* Mobile */}
                    <div className="md:hidden relative">
                        <Button
                            ref={triggerRef}
                            size="sm"
                            variant="ghost"
                            onClick={() => setMenuOpen((s) => !s)}
                        >
                            {menuOpen ? "Close" : "Menu"}
                        </Button>

                        {menuOpen && (
                            <div
                                ref={menuRef}
                                className="absolute right-0 mt-2 w-56 rounded-md border bg-background p-3 shadow-lg"
                            >
                                <div className="flex flex-col gap-2">
                                    {navItems.map((item) => (
                                        <a
                                            key={item.id}
                                            href={`#${item.id}`}
                                            className="rounded px-3 py-2 text-sm hover:bg-accent"
                                            onClick={() => setMenuOpen(false)}
                                        >
                                            {item.label}
                                        </a>
                                    ))}

                                    <Button
                                        size="sm"
                                        className="mt-2"
                                        onClick={() => {
                                            setMenuOpen(false);
                                            onSignIn?.();
                                        }}
                                    >
                                        Sign In
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

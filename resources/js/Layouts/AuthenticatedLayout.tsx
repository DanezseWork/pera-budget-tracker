import { PropsWithChildren, useEffect, useState } from "react";
import { usePage } from "@inertiajs/react";
import Sidebar from "@/Components/Layout/Sidebar";
import PageHeader from "@/Components/Layout/PageHeader";
import ToastProvider from "@/Components/ToastProvider";

const PAGE_META: Record<string, { title: string; subtitle?: string }> = {
    Dashboard: {
        title: "Dashboard",
        subtitle: "Welcome back to your dashboard",
    },
    Sales: {
        title: "Sales",
        subtitle: "Track your revenue and transactions",
    },
    Products: {
        title: "Products",
        subtitle: "Manage your inventory and pricing",
    },
    Analytics: {
        title: "Analytics",
        subtitle: "Insights and performance metrics",
    },
    Members: {
        title: "Members",
        subtitle: "Manage users and roles",
    },
    Settings: {
        title: "Settings",
        subtitle: "Configure your preferences",
    },
};

type AuthLayoutProps = PropsWithChildren<{
    pageKey?: string;
}>;

export default function AuthenticatedLayout({
    children,
    pageKey = "Dashboard",
}: AuthLayoutProps) {
    const { auth } = usePage().props as { auth: { user: any } };

    const [selected, setSelected] = useState(pageKey);
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        document.documentElement.classList.toggle("dark", isDark);
    }, [isDark]);

    const page = PAGE_META[selected] ?? { title: selected };

    return (
        <div className={`flex min-h-screen ${isDark ? "dark" : ""}`}>
            <Sidebar selected={selected} onSelect={setSelected} />

            <div className="flex-1 bg-gray-50 dark:bg-gray-950 p-6 overflow-auto">
                <PageHeader
                    title={page.title}
                    subtitle={page.subtitle}
                    isDark={isDark}
                    onToggleDark={() => setIsDark(!isDark)}
                />

                <main>{children}</main>
            </div>

            <ToastProvider />
        </div>
    );
}

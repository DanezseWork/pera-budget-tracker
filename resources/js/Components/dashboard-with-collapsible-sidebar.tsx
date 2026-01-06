import React, { useState, useEffect } from "react";
import { Moon, Sun, Bell, User } from "lucide-react";
import Dropdown from "@/Components/Dropdown";
import AddWalletModal from "@/Components/Wallets/AddWalletModal";
import WalletStatsGrid from "./Wallets/WalletStatsGrid";
import type { WalletModel } from "@/types/wallet";
import Sidebar from "@/Components/Layout/Sidebar";
import PageHeader from "./Layout/PageHeader";

interface DashboardProps {
    wallets: WalletModel[];
}

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

export const Example = ({ wallets }: DashboardProps) => {
    const [isDark, setIsDark] = useState(false);
    const [selected, setSelected] = useState("Dashboard");

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [isDark]);

    return (
        <div className={`flex min-h-screen w-full ${isDark ? "dark" : ""}`}>
            <div className="flex w-full bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
                <Sidebar selected={selected} onSelect={setSelected} />
                <ExampleContent
                    isDark={isDark}
                    setIsDark={setIsDark}
                    wallets={wallets}
                    selected={selected}
                />
            </div>
        </div>
    );
};

type ExampleContentProps = {
    isDark: boolean;
    setIsDark: React.Dispatch<React.SetStateAction<boolean>>;
    wallets: WalletModel[];
    selected: string;
};

const ExampleContent = ({
    isDark,
    setIsDark,
    wallets,
    selected,
}: ExampleContentProps) => {
    const page = PAGE_META[selected] ?? {
        title: selected,
    };

    return (
        <div className="flex-1 bg-gray-50 dark:bg-gray-950 p-6 overflow-auto">
            {/* Header */}
            <PageHeader
                title={page.title}
                subtitle={page.subtitle}
                isDark={isDark}
                onToggleDark={() => setIsDark(!isDark)}
            />

            <div>
                {/* Add Wallet Modal */}
                <AddWalletModal />

                <WalletStatsGrid wallets={wallets} />
            </div>
        </div>
    );
};

export default Example;

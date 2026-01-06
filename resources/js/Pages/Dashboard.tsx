import { Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import WalletStatsGrid from "@/Components/Wallets/WalletStatsGrid";
import type { WalletModel } from "@/types/wallet";
import AddWalletModal from "@/Components/Wallets/AddWalletModal";

interface DashboardProps {
    wallets: WalletModel[];
}

export default function Dashboard({ wallets }: DashboardProps) {
    return (
        <AuthenticatedLayout pageKey="Dashboard">
            <Head title="Dashboard" />

            {/* Add Wallet Modal */}
            <AddWalletModal />

            <WalletStatsGrid wallets={wallets} />
        </AuthenticatedLayout>
    );
}

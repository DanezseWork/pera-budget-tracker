import { Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import WalletStatsGrid from "@/Components/Wallets/WalletStatsGrid";
import type { WalletModel } from "@/types/wallet";
import AddWalletModal from "@/Components/Wallets/AddWalletModal";
import TransactionModal from "@/Components/Wallets/TransactionModal";

interface DashboardProps {
    wallets: WalletModel[];
}

export default function Dashboard({ wallets }: DashboardProps) {
    return (
        <AuthenticatedLayout pageKey="Dashboard">
            <Head title="Dashboard" />

            <div className="flex gap-3 pb-2">
                {/* Add Wallet Modal */}
                <AddWalletModal />

                <TransactionModal wallets={wallets} />  
            </div>

            <WalletStatsGrid wallets={wallets} />
        </AuthenticatedLayout>
    );
}

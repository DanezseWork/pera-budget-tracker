import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import WalletStatsGrid from "@/Components/Wallets/WalletStatsGrid";
import type { WalletModel } from "@/types/wallet";

interface DashboardProps {
    wallets: WalletModel[];
}

export default function Dashboard({ wallets }: DashboardProps) {
    console.log("Wallets from backend:", wallets);

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <WalletStatsGrid wallets={wallets} />

            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            You're logged in!
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

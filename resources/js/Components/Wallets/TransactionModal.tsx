import { useForm } from "@inertiajs/react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose,
} from "@/Components/ui/dialog";
import { useState } from "react";
import { toaster } from "@/Components/ToastProvider";
import type { WalletModel } from "@/types/wallet";

type TransactionType = "add" | "subtract" | "transfer";

interface TransactionForm {
    type: TransactionType;
    from_wallet_id: string;
    to_wallet_id: string;
    amount: string;
    description: string;
}

interface Props {
    wallets: WalletModel[];
}

export default function TransactionModal({ wallets }: Props) {
    const [open, setOpen] = useState(false);

    const { data, setData, post, processing, errors, reset } =
        useForm<TransactionForm>({
            type: "add",
            from_wallet_id: "",
            to_wallet_id: "",
            amount: "",
            description: "",
        });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        post(route("transactions.store"), {
            onSuccess: () => {
                reset();
                setOpen(false);

                toaster.create({
                    title: "Transaction Saved",
                    description: "Wallet balances have been updated.",
                    type: "success",
                });
            },
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <button className="px-4 py-2 bg-primary text-white rounded">
                    New Transaction
                </button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>New Transaction</DialogTitle>
                </DialogHeader>

                <form onSubmit={submit} className="space-y-4 py-2">
                    {/* Transaction Type */}
                    <div>
                        <label className="text-sm font-medium">Type</label>
                        <select
                            value={data.type}
                            onChange={(e) =>
                                setData((prev) => ({
                                    ...prev,
                                    type: e.target.value as TransactionType,
                                }))
                            }
                            className="w-full border rounded p-2 mt-1"
                        >
                            <option value="add">Add</option>
                            <option value="subtract">Subtract</option>
                            <option value="transfer">Transfer</option>
                        </select>
                    </div>

                    {/* From Wallet */}
                    {(data.type === "subtract" || data.type === "transfer") && (
                        <div>
                            <label className="text-sm font-medium">
                                From Wallet
                            </label>
                            <select
                                value={data.from_wallet_id}
                                onChange={(e) =>
                                    setData((prev) => ({
                                        ...prev,
                                        from_wallet_id: e.target.value,
                                    }))
                                }
                                className="w-full border rounded p-2 mt-1"
                            >
                                <option value="">Select wallet</option>
                                {wallets.map((wallet) => (
                                    <option key={wallet.id} value={wallet.id}>
                                        {wallet.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    {/* To Wallet */}
                    {(data.type === "add" || data.type === "transfer") && (
                        <div>
                            <label className="text-sm font-medium">
                                To Wallet
                            </label>
                            <select
                                value={data.to_wallet_id}
                                onChange={(e) =>
                                    setData((prev) => ({
                                        ...prev,
                                        to_wallet_id: e.target.value,
                                    }))
                                }
                                className="w-full border rounded p-2 mt-1"
                            >
                                <option value="">Select wallet</option>
                                {wallets.map((wallet) => (
                                    <option key={wallet.id} value={wallet.id}>
                                        {wallet.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    {/* Amount */}
                    <div>
                        <label className="text-sm font-medium">Amount</label>
                        <input
                            type="number"
                            value={data.amount}
                            onChange={(e) =>
                                setData((prev) => ({
                                    ...prev,
                                    amount: e.target.value,
                                }))
                            }
                            className="w-full border rounded p-2 mt-1"
                            placeholder="₱0.00"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="text-sm font-medium">
                            Description
                        </label>
                        <textarea
                            value={data.description}
                            onChange={(e) =>
                                setData((prev) => ({
                                    ...prev,
                                    description: e.target.value,
                                }))
                            }
                            className="w-full border rounded p-2 mt-1 h-20"
                        />
                    </div>

                    <DialogFooter>
                        <DialogClose className="px-4 py-2 bg-secondary rounded">
                            Cancel
                        </DialogClose>

                        <button
                            type="submit"
                            disabled={processing}
                            className="px-4 py-2 bg-primary text-white rounded"
                        >
                            {processing ? "Saving..." : "Save"}
                        </button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

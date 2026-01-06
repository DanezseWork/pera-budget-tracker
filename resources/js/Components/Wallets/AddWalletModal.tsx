import { useForm } from "@inertiajs/react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose,
} from "@/Components/ui/dialog";
import { toaster } from "@/Components/ToastProvider";
import { useState } from "react";
import { WALLET_ICONS, WalletIconKey } from "@/constants/wallet-icons";

interface WalletForm {
    name: string;
    starting_balance: string;
    icon: WalletIconKey;
    color: string;
    description: string;
}

export default function AddWalletModal() {
    const { data, setData, post, processing, errors, reset } =
        useForm<WalletForm>({
            name: "",
            starting_balance: "",
            icon: "wallet",
            color: "#000000",
            description: "",
        });

    const [open, setOpen] = useState(false);

    const typedErrors = errors as Record<keyof WalletForm, string | undefined>;

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route("wallets.store"), {
            onSuccess: () => {
                reset();
                setOpen(false); // ✅ CLOSE MODAL

                toaster.create({
                    title: "Wallet Created!",
                    description: "Your new wallet has been added successfully.",
                    type: "success",
                });
            },
            onError: () => {
                toaster.create({
                    title: "Error",
                    description: "Please fix the errors and try again.",
                    type: "error",
                });
            },
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <button className="px-4 py-2 mb-2 bg-primary text-white rounded">
                    Add Wallet
                </button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Wallet</DialogTitle>
                    <DialogDescription>
                        Create a new wallet and set up its initial details.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={submit} className="space-y-4 py-2">
                    {/* Wallet Name */}
                    <div>
                        <label className="text-sm font-medium">
                            Wallet Name
                        </label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) =>
                                setData((prev) => ({
                                    ...prev,
                                    name: e.target.value,
                                }))
                            }
                            placeholder="Enter wallet name"
                            className="w-full border rounded p-2 mt-1"
                        />
                        {typedErrors.name && (
                            <p className="text-red-500">{typedErrors.name}</p>
                        )}
                    </div>

                    {/* Initial Value */}
                    <div>
                        <label className="text-sm font-medium">
                            Initial Value
                        </label>
                        <input
                            type="number"
                            value={data.starting_balance}
                            onChange={(e) =>
                                setData((prev) => ({
                                    ...prev,
                                    starting_balance: e.target.value,
                                }))
                            }
                            placeholder="₱0.00"
                            className="w-full border rounded p-2 mt-1"
                        />
                    </div>

                    {/* Wallet Icon */}
                    <div>
                        <label className="text-sm font-medium mb-2 block">
                            Wallet Icon
                        </label>

                        <div className="grid grid-cols-6 gap-3">
                            {Object.entries(WALLET_ICONS).map(([key, Icon]) => {
                                const isSelected = data.icon === key;

                                return (
                                    <button
                                        key={key}
                                        type="button"
                                        onClick={() =>
                                            setData((prev) => ({
                                                ...prev,
                                                icon: key as WalletIconKey,
                                            }))
                                        }
                                        className={`
                                            p-3 rounded-lg border flex items-center justify-center
                                            transition
                                            ${
                                                isSelected
                                                    ? "border-primary bg-primary/10 ring-2 ring-primary/30"
                                                    : "border-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                                            }
                                        `}
                                        title={key}
                                    >
                                        <Icon className="h-5 w-5" />
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Wallet Color */}
                    <div>
                        <label className="text-sm font-medium">
                            Wallet Color
                        </label>
                        <input
                            type="color"
                            value={data.color}
                            onChange={(e) =>
                                setData((prev) => ({
                                    ...prev,
                                    color: e.target.value,
                                }))
                            }
                            className="w-full h-10 border rounded mt-1 cursor-pointer"
                        />
                    </div>

                    {/* Wallet Description */}
                    <div>
                        <label className="text-sm font-medium">
                            Wallet Description
                        </label>
                        <textarea
                            value={data.description}
                            onChange={(e) =>
                                setData((prev) => ({
                                    ...prev,
                                    description: e.target.value,
                                }))
                            }
                            placeholder="Optional description"
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
                            {processing ? "Saving..." : "Save Wallet"}
                        </button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

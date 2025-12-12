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

export default function AddWalletModal() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        starting_balance: "",
        icon: null,
        color: "#000000",
        description: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("wallets.store"), {
            onSuccess: () => {
                reset();

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
        <Dialog>
            <DialogTrigger className="px-4 py-2 bg-primary text-white rounded">
                Add Wallet
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
                            onChange={(e) => setData("name", e.target.value)}
                            placeholder="Enter wallet name"
                            className="w-full border rounded p-2 mt-1"
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm">
                                {errors.name}
                            </p>
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
                                setData("starting_balance", e.target.value)
                            }
                            placeholder="₱0.00"
                            className="w-full border rounded p-2 mt-1"
                        />
                    </div>

                    {/* Wallet Icon */}
                    <div>
                        <label className="text-sm font-medium">
                            Wallet Icon
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setData("icon", e.target.files[0])}
                            className="w-full border rounded p-2 mt-1"
                        />
                    </div>

                    {/* Wallet Color */}
                    <div>
                        <label className="text-sm font-medium">
                            Wallet Color
                        </label>
                        <input
                            type="color"
                            value={data.color}
                            onChange={(e) => setData("color", e.target.value)}
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
                                setData("description", e.target.value)
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

import { Head } from "@inertiajs/react";
import { useMemo, useState } from "react";
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { ArrowUpRight, ArrowDownRight, Search } from "lucide-react";

type Transaction = {
    id: number;
    amount: number;
    type: "add" | "subtract" | "transfer_in" | "transfer_out";
    date: string;
    description?: string;
    created_at: string;
    wallet: {
        name: string;
    };
};

const TYPE_STYLES: Record<
    Transaction["type"],
    { label: string; className: string }
> = {
    add: {
        label: "Added",
        className: "bg-green-50 text-green-700",
    },
    subtract: {
        label: "Subtracted",
        className: "bg-red-50 text-red-700",
    },
    transfer_in: {
        label: "Transfer In",
        className: "bg-blue-50 text-blue-700",
    },
    transfer_out: {
        label: "Transfer Out",
        className: "bg-orange-50 text-orange-700",
    },
};

export default function Index({
    transactions,
}: {
    transactions: Transaction[];
}) {
    const [globalFilter, setGlobalFilter] = useState("");

    const columns = useMemo<ColumnDef<Transaction>[]>(
        () => [
            {
                accessorKey: "date",
                header: "Date",
                cell: ({ row }) => {
                    const date = row.original.date;

                    if (!date) {
                        return <span className="text-sm text-gray-400">—</span>;
                    }

                    return (
                        <span className="text-sm text-gray-700">
                            {new Date(`${date}T00:00:00`).toLocaleDateString()}
                        </span>
                    );
                },
            },
            {
                id: "time",
                header: "Time",
                cell: ({ row }) => {
                    const createdAt = row.original.created_at;

                    console.log(row.original);


                    if (!createdAt) {
                        return <span className="text-sm text-gray-400">—</span>;
                    }

                    return (
                        <span className="text-sm text-gray-500">
                            {new Date(
                                createdAt.replace(" ", "T")
                            ).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                            })}
                        </span>
                    );
                },
            },
            {
                accessorKey: "wallet.name",
                header: "Wallet",
                cell: ({ row }) => (
                    <span className="font-medium text-gray-900">
                        {row.original.wallet.name}
                    </span>
                ),
            },
            {
                accessorKey: "type",
                header: "Type",
                cell: ({ row }) => {
                    const meta = TYPE_STYLES[row.original.type];

                    return (
                        <span
                            className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${meta.className}`}
                        >
                            {meta.label}
                        </span>
                    );
                },
            },
            {
                accessorKey: "description",
                header: "Description",
                cell: ({ row }) => (
                    <span className="text-gray-500">
                        {row.original.description ?? "—"}
                    </span>
                ),
            },
            {
                accessorKey: "amount",
                header: () => <div className="text-right">Amount</div>,
                cell: ({ row }) => {
                    const isAdd =
                        row.original.type === "add" ||
                        row.original.type === "transfer_in";

                    return (
                        <div className="flex justify-end">
                            <span
                                className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium
                ${
                    isAdd
                        ? "bg-green-50 text-green-700"
                        : "bg-red-50 text-red-700"
                }`}
                            >
                                {isAdd ? "+" : "-"}
                                {row.original.amount}
                            </span>
                        </div>
                    );
                },
            },
        ],
        []
    );

    const table = useReactTable({
        data: transactions,
        columns,
        state: {
            globalFilter,
        },
        onGlobalFilterChange: setGlobalFilter,
        globalFilterFn: (row, _, value) => {
            const search = value.toLowerCase();

            return (
                row.original.wallet.name.toLowerCase().includes(search) ||
                row.original.description?.toLowerCase().includes(search) ||
                TYPE_STYLES[row.original.type].label
                    .toLowerCase()
                    .includes(search)
            );
        },

        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: {
            sorting: [{ id: "date", desc: true }],
            pagination: { pageSize: 8 },
        },
    });

    return (
        <AuthenticatedLayout pageKey="Transactions">
            <Head title="Transactions" />

            <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
                {/* Toolbar */}
                <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
                    <div className="relative w-full max-w-sm">
                        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <input
                            value={globalFilter}
                            onChange={(e) => setGlobalFilter(e.target.value)}
                            placeholder="Search transactions..."
                            className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pl-9 pr-3 text-sm text-gray-900 placeholder-gray-400 focus:border-gray-300 focus:bg-white focus:outline-none"
                        />
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead className="sticky top-0 z-10 bg-gray-50">
                            {table.getHeaderGroups().map((headerGroup) => (
                                <tr key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <th
                                            key={header.id}
                                            className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500"
                                        >
                                            {flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>

                        <tbody>
                            {table.getRowModel().rows.map((row) => (
                                <tr
                                    key={row.id}
                                    className="border-t border-gray-100 transition hover:bg-gray-50"
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <td key={cell.id} className="px-6 py-4">
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            ))}

                            {table.getRowModel().rows.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={columns.length}
                                        className="px-6 py-12 text-center text-sm text-gray-500"
                                    >
                                        No results found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between border-t border-gray-100 px-6 py-4">
                    <span className="text-sm text-gray-500">
                        Page {table.getState().pagination.pageIndex + 1} of{" "}
                        {table.getPageCount()}
                    </span>

                    <div className="flex gap-2">
                        <button
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                            className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-40"
                        >
                            Previous
                        </button>
                        <button
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                            className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-40"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

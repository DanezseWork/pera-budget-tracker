import { Head } from "@inertiajs/react";
import { useMemo } from "react";
import {
  ColumnDef,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {
  DataGrid,
  DataGridContainer,
  DataGridTable,
  DataGridPagination,
  DataGridColumnHeader,
} from "@/Components/data-grid-table";

type Transaction = {
  id: number;
  amount: number;
  type: "add" | "subtract";
  date: string;
  description?: string;
  wallet: {
    name: string;
  };
};

export default function Index({ transactions }: { transactions: Transaction[] }) {
  const columns = useMemo<ColumnDef<Transaction>[]>(
    () => [
      {
        accessorKey: "date",
        header: ({ column }) => <DataGridColumnHeader column={column} title="Date" />,
        cell: ({ row }) => new Date(row.original.date).toLocaleDateString(),
      },
      {
        accessorKey: "wallet.name",
        header: ({ column }) => <DataGridColumnHeader column={column} title="Wallet" />,
      },
      {
        accessorKey: "description",
        header: "Description",
        cell: ({ row }) => row.original.description ?? "—",
      },
      {
        accessorKey: "amount",
        header: ({ column }) => <DataGridColumnHeader column={column} title="Amount" />,
        cell: ({ row }) => (
          <span className={row.original.type === "add" ? "text-green-600" : "text-red-600"}>
            {row.original.type === "add" ? "+" : "-"}
            {row.original.amount}
          </span>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data: transactions,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    initialState: {
      sorting: [{ id: "date", desc: true }],
      pagination: { pageSize: 10 },
    },
  });

  return (
    <AuthenticatedLayout pageKey="Transactions">
      <Head title="Transactions" />

      <DataGrid table={table} recordCount={transactions.length}>
        <DataGridContainer>
          <DataGridTable />
        </DataGridContainer>

        <DataGridPagination />
      </DataGrid>
    </AuthenticatedLayout>
  );
}

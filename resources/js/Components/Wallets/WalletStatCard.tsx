import { TrendingUp } from "lucide-react";
import React from "react";

type IconType = React.ComponentType<React.SVGProps<SVGSVGElement>>;

interface WalletStatCardProps {
  name: string;
  current_balance: number;
  starting_balance: number;
  color?: string;
  icon?: IconType; // lucide icon type
  description?: string | null;
}

export default function WalletStatCard({
  name,
  current_balance,
  starting_balance,
  color = "#38bdf8",
  icon: Icon,
  description,
}: WalletStatCardProps) {
  const growth =
    starting_balance && current_balance
      ? ((current_balance - starting_balance) / starting_balance) * 100
      : 0;

  const growthLabel =
    growth > 0 ? `+${growth.toFixed(1)}%` : `${growth.toFixed(1)}%`;

  return (
    <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div
          className="p-2 rounded-lg"
          style={{ backgroundColor: `${color}20` }}
        >
          {Icon && <Icon className="h-5 w-5" style={{ color }} />}
        </div>

        <TrendingUp className="h-4 w-4 text-green-500" />
      </div>

      <h3 className="font-medium text-gray-600 dark:text-gray-400 mb-1">
        {name}
      </h3>

      <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
        ₱{Number(current_balance).toLocaleString()}
      </p>

      <p className="text-sm text-green-600 dark:text-green-400 mt-1">
        {growthLabel} {description ? `• ${description}` : ""}
      </p>
    </div>
  );
}

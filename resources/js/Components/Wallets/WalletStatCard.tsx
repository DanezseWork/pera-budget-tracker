import { TrendingUp, TrendingDown } from "lucide-react";
import React from "react";

type IconType = React.ComponentType<React.SVGProps<SVGSVGElement>>;

interface WalletStatCardProps {
  name: string;
  current_balance: number;
  starting_balance: number;
  color?: string;
  icon?: IconType;
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
  const hasStarting = starting_balance > 0;

  const growth = hasStarting
    ? ((current_balance - starting_balance) / starting_balance) * 100
    : 0;

  const isPositive = growth >= 0;

  const growthLabel = `${isPositive ? "+" : ""}${growth.toFixed(1)}%`;

  const TrendIcon = isPositive ? TrendingUp : TrendingDown;
  const trendColor = isPositive ? "text-green-600" : "text-red-600";
  const trendColorDark = isPositive
    ? "dark:text-green-400"
    : "dark:text-red-400";

  return (
    <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div
          className="p-2 rounded-lg"
          style={{ backgroundColor: `${color}20` }}
        >
          {Icon && <Icon className="h-5 w-5" style={{ color }} />}
        </div>

        <TrendIcon className={`h-4 w-4 ${trendColor}`} />
      </div>

      <h3 className="font-medium text-gray-600 dark:text-gray-400 mb-1">
        {name}
      </h3>

      <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
        ₱{Number(current_balance).toLocaleString()}
      </p>

      <p className={`text-sm mt-1 ${trendColor} ${trendColorDark}`}>
        {growthLabel}
        {description ? ` • ${description}` : ""}
      </p>
    </div>
  );
}

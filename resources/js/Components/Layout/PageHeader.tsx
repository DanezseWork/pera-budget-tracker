import { Moon, Sun, Bell, User, LogOut } from "lucide-react";
import Dropdown from "@/Components/Dropdown";

type PageHeaderProps = {
    title: string;
    subtitle?: string;
    isDark: boolean;
    onToggleDark: () => void;
};

export default function PageHeader({
    title,
    subtitle,
    isDark,
    onToggleDark,
}: PageHeaderProps) {
    return (
        <div className="flex items-center justify-between mb-8">
            {/* Title */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                    {title}
                </h1>
                {subtitle && (
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                        {subtitle}
                    </p>
                )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
                <Dropdown>
                    <Dropdown.Trigger>
                        <button className="p-2 rounded-lg bg-white dark:bg-gray-900
                            border border-gray-200 dark:border-gray-800
                            text-gray-600 dark:text-gray-400">
                            {/* <User className="h-5 w-5" /> */}
                            <LogOut className="h-5 w-5" />
                        </button>
                    </Dropdown.Trigger>

                    <Dropdown.Content>
                        <Dropdown.Link
                            href={route("logout")}
                            method="post"
                            as="button"
                        >
                            Log Out
                        </Dropdown.Link>
                    </Dropdown.Content>
                </Dropdown>
            </div>
        </div>
    );
}

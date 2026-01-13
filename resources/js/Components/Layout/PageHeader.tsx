import { Moon, Sun, Bell, User } from "lucide-react";
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
                {/* <button className="relative p-2 rounded-lg bg-white dark:bg-gray-900
                    border border-gray-200 dark:border-gray-800
                    text-gray-600 dark:text-gray-400
                    hover:text-gray-900 dark:hover:text-gray-100">
                    <Bell className="h-5 w-5" />
                    <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full" />
                </button> */}

                <button
                    onClick={onToggleDark}
                    className="flex h-10 w-10 items-center justify-center rounded-lg
                        border border-gray-200 dark:border-gray-800
                        bg-white dark:bg-gray-900
                        text-gray-600 dark:text-gray-400
                        hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                    {isDark ? (
                        <Sun className="h-4 w-4" />
                    ) : (
                        <Moon className="h-4 w-4" />
                    )}
                </button>

                <Dropdown>
                    <Dropdown.Trigger>
                        <button className="p-2 rounded-lg bg-white dark:bg-gray-900
                            border border-gray-200 dark:border-gray-800
                            text-gray-600 dark:text-gray-400">
                            <User className="h-5 w-5" />
                        </button>
                    </Dropdown.Trigger>

                    <Dropdown.Content>
                        <Dropdown.Link href={route("profile.edit")}>
                            Profile
                        </Dropdown.Link>

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

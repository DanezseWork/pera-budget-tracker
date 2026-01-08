import { useState } from "react";
import {
    Home,
    DollarSign,
    Monitor,
    ShoppingCart,
    Tag,
    BarChart3,
    Users,
    Settings,
    HelpCircle,
    ChevronDown,
    ChevronsRight,
} from "lucide-react";
import { router } from "@inertiajs/react";


/* ================= TYPES ================= */

type SidebarProps = {
    selected: string;
    onSelect: (value: string) => void;
};

type OptionProps = {
    Icon: any;
    title: string;
    selected: string;
    onSelect: (value: string) => void;
    open: boolean;
    notifs?: number;
};

const SIDEBAR_ROUTES: Record<string, string> = {
    Dashboard: route("dashboard"),
    Sales: "/sales",        // placeholder
    "View Site": "/",
    Products: "/products",
    Tags: "/tags",
    Analytics: "/analytics",
    Members: "/members",
    Settings: "/settings",
};

/* ================= COMPONENT ================= */

export default function Sidebar({ selected, onSelect }: SidebarProps) {
    const [open, setOpen] = useState(true);

    return (
        <nav
            className={`sticky top-0 h-screen shrink-0 border-r transition-all duration-300
            ${open ? "w-64" : "w-16"}
            border-gray-200 dark:border-gray-800
            bg-white dark:bg-gray-900 p-2`}
        >
            <TitleSection open={open} />

            <div className="space-y-1 mb-8">
                <Option Icon={Home} title="Dashboard" {...{ selected, onSelect, open }} />
                <Option Icon={DollarSign} title="Transactions" notifs={3} {...{ selected, onSelect, open }} />
                <Option Icon={BarChart3} title="Analytics" {...{ selected, onSelect, open }} />
            </div>

            {open && (
                <div className="border-t border-gray-200 dark:border-gray-800 pt-4 space-y-1">
                    <div className="px-3 py-2 text-xs font-medium text-gray-500 uppercase">
                        Account
                    </div>
                    <Option Icon={Settings} title="Settings" {...{ selected, onSelect, open }} />
                    <Option Icon={HelpCircle} title="Help & Support" {...{ selected, onSelect, open }} />
                </div>
            )}

            <ToggleClose open={open} setOpen={setOpen} />
        </nav>
    );
}

/* ================= SUB COMPONENTS ================= */

function Option({ Icon, title, selected, onSelect, open, notifs }: OptionProps) {
    const isSelected = selected === title;

    return (
        <button
            onClick={() => {
                onSelect(title);

                const href = SIDEBAR_ROUTES[title];
                if (href) {
                    router.visit(href);
                }
            }}
            className={`relative flex h-11 w-full items-center rounded-md transition
                ${isSelected
                    ? "bg-blue-50 text-blue-700 border-l-2 border-blue-500"
                    : "text-gray-600 hover:bg-gray-50"}`}
        >
            <div className="grid h-full w-12 place-content-center">
                <Icon className="h-4 w-4" />
            </div>

            {open && <span className="text-sm font-medium">{title}</span>}

            {notifs && open && (
                <span className="absolute right-3 h-5 w-5 rounded-full bg-blue-500 text-xs text-white grid place-content-center">
                    {notifs}
                </span>
            )}
        </button>
    );
}


function TitleSection({ open }: { open: boolean }) {
    return (
        <div className="mb-6 border-b pb-4">
            <div className="flex items-center justify-between p-2 rounded-md hover:bg-gray-50">
                <div className="flex items-center gap-3">
                    <Logo />
                    {open && (
                        <div>
                            <span className="block text-sm font-semibold">TomIsLoading</span>
                            <span className="block text-xs text-gray-500">Pro Plan</span>
                        </div>
                    )}
                </div>
                {open && <ChevronDown className="h-4 w-4 text-gray-400" />}
            </div>
        </div>
    );
}

function Logo() {
    return (
        <div className="grid size-10 place-content-center rounded-lg bg-blue-600 text-white font-bold">
            T
        </div>
    );
}

function ToggleClose({
    open,
    setOpen,
}: {
    open: boolean;
    setOpen: (v: boolean) => void;
}) {
    return (
        <button
            onClick={() => setOpen(!open)}
            className="absolute bottom-0 left-0 right-0 border-t hover:bg-gray-50"
        >
            <div className="flex items-center p-3">
                <div className="grid size-10 place-content-center">
                    <ChevronsRight
                        className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
                    />
                </div>
                {open && <span className="text-sm">Hide</span>}
            </div>
        </button>
    );
}

"use client";

import { Toast, Toaster, createToaster } from "@ark-ui/react/toast";
import { Portal } from "@ark-ui/react/portal";
import { X } from "lucide-react";

export const toaster = createToaster({
    placement: "bottom-end",
    gap: 16,
    overlap: true,
});

export default function ToastProvider() {
    return (
        <Portal>
            <Toaster toaster={toaster}>
                {(toast) => (
                    <Toast.Root
                        className={`
                            min-w-80 p-4 rounded-lg shadow-md border relative
                            h-(--height) opacity-(--opacity) translate-x-(--x) translate-y-(--y)
                            scale-(--scale) z-(--z-index)
                            ${
                                toast.type === "success"
                                    ? "bg-green-50 border-green-200"
                                    : ""
                            }
                            ${
                                toast.type === "error"
                                    ? "bg-red-50 border-red-200"
                                    : ""
                            }
                            ${
                                toast.type === "warning"
                                    ? "bg-yellow-50 border-yellow-200"
                                    : ""
                            }
                            ${
                                toast.type === "info"
                                    ? "bg-blue-50 border-blue-200"
                                    : ""
                            }
                            ${!toast.type ? "bg-white border-gray-100" : ""}
                        `}
                    >
                        <Toast.Title
                            className={`
                                font-semibold text-sm
                                ${
                                    toast.type === "success"
                                        ? "text-green-700"
                                        : ""
                                }
                                ${toast.type === "error" ? "text-red-700" : ""}
                                ${
                                    toast.type === "warning"
                                        ? "text-yellow-700"
                                        : ""
                                }
                                ${toast.type === "info" ? "text-blue-700" : ""}
                                ${!toast.type ? "text-gray-900" : ""}
                            `}
                        >
                            {toast.title}
                        </Toast.Title>

                        <Toast.Description
                            className={`
                                text-sm mt-1
                                ${
                                    toast.type === "success"
                                        ? "text-green-600"
                                        : ""
                                }
                                ${toast.type === "error" ? "text-red-600" : ""}
                                ${
                                    toast.type === "warning"
                                        ? "text-yellow-600"
                                        : ""
                                }
                                ${toast.type === "info" ? "text-blue-600" : ""}
                                ${!toast.type ? "text-gray-600" : ""}
                            `}
                        >
                            {toast.description}
                        </Toast.Description>

                        <Toast.CloseTrigger className="absolute top-3 right-3 p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-gray-600">
                            <X className="w-3 h-3" />
                        </Toast.CloseTrigger>
                    </Toast.Root>
                )}
            </Toaster>
        </Portal>
    );
}

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

const cn = (...inputs: Array<string | false | null | undefined>) =>
    inputs.filter(Boolean).join(" ");

export const buttonVariants = cva(
    "btn-base inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
            variant: {
                default: "bg-foreground text-background",
                outline: "border-2 border-foreground bg-background text-foreground",
                ghost: "bg-transparent text-foreground",
            },
            size: {
                default: "h-10 px-4 py-2",
                sm: "h-9 rounded-md px-3",
                lg: "h-11 rounded-md px-8",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, onClick, ...props }, ref) => {
        const localRef = React.useRef<HTMLButtonElement | null>(null);

        const mergedRef = (node: HTMLButtonElement | null) => {
            localRef.current = node;
            if (typeof ref === "function") ref(node);
            else if (ref)
                (ref as React.MutableRefObject<HTMLButtonElement | null>).current =
                    node;
        };

        const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
            const btn = localRef.current;
            if (!btn) return;

            btn.classList.add("btn-bounce-anim");
            setTimeout(() => btn.classList.remove("btn-bounce-anim"), 300);

            onClick?.(e);
        };

        return (
            <button
                ref={mergedRef}
                onClick={handleClick}
                className={cn(buttonVariants({ variant, size }) as string, className)}
                {...props}
            />
        );
    }
);

Button.displayName = "Button";

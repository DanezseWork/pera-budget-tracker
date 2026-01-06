import { Link } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";

interface HeroProps {
    heroClassName?: string;
}

export default function Hero({ heroClassName }: HeroProps) {
    return (
        <section
            className="min-h-screen flex items-center justify-center px-4 pt-32 pb-24 md:pt-40 md:pb-32 bg-yellow"
            aria-labelledby="hero-heading"
        >
            <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
                <h1
                    id="hero-heading"
                    className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter leading-tight mb-6"
                >
                    A Simple Budget Tracker
                    <br />
                    <span className="relative inline-block">
                        <span
                            className={`font-normal text-5xl sm:text-6xl md:text-7xl text-green-400 ${heroClassName ?? ""}`}
                        >
                            Pera
                        </span>
                        <svg
                            className="hero-underline text-green-400"
                            viewBox="0 0 170 30"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            preserveAspectRatio="none"
                            aria-hidden="true"
                        >
                            <path
                                d="M2 9C32.8203 5.34032 108.769 -0.881146 166 3.51047"
                                stroke="currentColor"
                                strokeWidth="6"
                                strokeLinecap="round"
                                fill="none"
                                opacity="0.9"
                            />
                        </svg>
                    </span>{" "}
                    Success
                </h1>

                <p className="max-w-2xl mx-auto mb-9 text-base sm:text-lg text-muted-foreground">
                    Track your income and expenses with ease. See where your
                    money goes and stay in control.
                </p>

                <Link href={route("register")}>
                    <Button size="lg" className="px-8 py-6 text-base">
                        Try for Free
                    </Button>
                </Link>
            </div>
        </section>
    );
}

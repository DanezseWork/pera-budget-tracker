import React, { useState } from "react";
import Component from "@/Components/ui/underline-hero-section";
import DotGrid from "@/Components/DotGrid";

export default function Demo() {
    const [message, setMessage] = useState<string>("");

    const onSignIn = () => {
        setMessage("Sign In clicked");
        setTimeout(() => setMessage(""), 3000);
    };

    const onTryForFree = () => {
        setMessage("Try for Free clicked");
        setTimeout(() => setMessage(""), 3000);
    };

    return (
        <>
            {/* Load Lobster font */}
            <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/css2?family=Lobster&display=swap"
            />

            {/* Notification Styles */}
            <style>{`
                .font-lobster { 
                    font-family: 'Lobster', cursive; 
                }

                .demo-container {
                    position: relative;
                    width: 100%;
                    height: 700px; /* Adjust height */
                    overflow: hidden;
                }

                .dot-grid-backdrop {
                    position: absolute;
                    inset: 0;
                    z-index: 0;
                }

                .hero-foreground {
                    position: relative;
                    z-index: 10;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    height: 100%;
                }
            `}</style>

            {message && <div className="demo-message">{message}</div>}

            {/* MAIN WRAPPER */}
            <div className="demo-container">
                {/* BACKGROUND DOTS */}
                <div className="dot-grid-backdrop">
                    <DotGrid
                        dotSize={3}
                        gap={15}
                        baseColor="#E8E6FF"
                        proximity={0}
                        shockRadius={0}
                    />
                </div>

                {/* HERO FOREGROUND */}
                <div className="hero-foreground">
                    <Component
                        brand="Pera"
                        heroClassName="font-lobster"
                        onSignIn={onSignIn}
                        onTryForFree={onTryForFree}
                    />
                </div>
            </div>
        </>
    );
}

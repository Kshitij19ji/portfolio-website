import { useEffect, useRef, useState } from "react";

const CustomCursor = () => {
    const cursorDotRef = useRef<HTMLDivElement>(null);
    const cursorOutlineRef = useRef<HTMLDivElement>(null);
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const cursorDot = cursorDotRef.current;
        const cursorOutline = cursorOutlineRef.current;

        let mouseX = 0;
        let mouseY = 0;
        let outlineX = 0;
        let outlineY = 0;

        const handleMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            // Immediate update for dot
            if (cursorDot) {
                cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
            }
        };

        const animateOutline = () => {
            // Lerp (smooth interpolation) for outline trailing effect
            const ease = 0.15;
            outlineX += (mouseX - outlineX) * ease;
            outlineY += (mouseY - outlineY) * ease;

            if (cursorOutline) {
                cursorOutline.style.transform = `translate(${outlineX}px, ${outlineY}px) translate(-50%, -50%)`;
            }

            requestAnimationFrame(animateOutline);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (
                target.tagName === "A" ||
                target.tagName === "BUTTON" ||
                target.closest("a") ||
                target.closest("button")
            ) {
                setIsHovering(true);
            }
        };

        const handleMouseOut = () => {
            setIsHovering(false);
        };

        window.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseover", handleMouseOver);
        document.addEventListener("mouseout", handleMouseOut);

        // Start animation loop
        const animId = requestAnimationFrame(animateOutline);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseover", handleMouseOver);
            document.removeEventListener("mouseout", handleMouseOut);
            cancelAnimationFrame(animId);
        };
    }, []);

    // Use inline style over classes to prevent heavy reflows mapping to React states
    const outlineStyles: React.CSSProperties = {
        position: "fixed",
        top: 0,
        left: 0,
        width: "40px",
        height: "40px",
        border: "2px solid rgba(8, 145, 178, 0.8)",
        borderRadius: "50%",
        pointerEvents: "none",
        zIndex: 99998,
        transition: "width 0.2s ease, height 0.2s ease, background-color 0.2s ease, margin 0.2s ease, border-color 0.2s ease",
    };

    const outlineHoverStyles: React.CSSProperties = {
        ...outlineStyles,
        width: "70px",
        height: "70px",
        backgroundColor: "rgba(34, 211, 238, 0.2)",
        borderColor: "rgba(34, 211, 238, 0.4)",
        backdropFilter: "blur(2px)"
    };

    return (
        <>
            <div
                ref={cursorDotRef}
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "10px",
                    height: "10px",
                    backgroundColor: "#22d3ee",
                    borderRadius: "50%",
                    pointerEvents: "none",
                    zIndex: 99999,
                    opacity: isHovering ? 0 : 1, // Hide center dot when hovering for magnetic hollow effect
                    transition: "opacity 0.2s ease, transform 0s"
                }}
            />
            <div
                ref={cursorOutlineRef}
                style={isHovering ? outlineHoverStyles : outlineStyles}
            />
        </>
    );
};

export default CustomCursor;

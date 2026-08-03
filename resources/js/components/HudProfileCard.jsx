import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import profileData from "../data/profileData";

export default function HudProfileCard() {
    const navigate = useNavigate();
    const navigatingRef = useRef(false);
    const [isPressed, setIsPressed] = useState(false);
    const [pulsing, setPulsing] = useState(false);

    const handleClick = () => {
        if (navigatingRef.current) return;
        navigatingRef.current = true;
        setIsPressed(true);
        setPulsing(true);
        // Hold the press animation briefly, then navigate
        window.setTimeout(() => {
            navigate("/profile");
        }, 140);
    };

    const handlePointerDown = (e) => {
        if (e.button !== 0) return;
        setIsPressed(true);
    };

    const handlePointerLeave = () => {
        if (navigatingRef.current) return;
        setIsPressed(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleClick();
        }
    };

    return (
        <motion.div
            className="hud-root"
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            {/* Outer glow layer */}
            <div className="hud-glow-bg" aria-hidden="true" />

            {/* Main HUD Frame */}
            <motion.div
                className="hud-frame"
                onClick={handleClick}
                onPointerDown={handlePointerDown}
                onPointerUp={() => !navigatingRef.current && setIsPressed(false)}
                onPointerLeave={handlePointerLeave}
                role="button"
                tabIndex={0}
                aria-label="Open Character Profile"
                onKeyDown={handleKeyDown}
                animate={{ scale: isPressed ? 0.98 : 1 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 500, damping: 30, mass: 0.6 }}
            >
                {/* Click neon pulse */}
                {pulsing && (
                    <motion.span
                        className="hud-neon-pulse"
                        aria-hidden="true"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.45 }}
                        onAnimationComplete={() => setPulsing(false)}
                    />
                )}

                {/* Hover scanning light sweep */}
                <div className="hud-scan-light" aria-hidden="true" />
                {/* Asymmetrical frame layers */}
                <div className="hud-frame-border" aria-hidden="true" />
                <div className="hud-frame-border-inner" aria-hidden="true" />
                <div className="hud-frame-bg" aria-hidden="true" />

                {/* Angled right edge accent */}
                <div className="hud-angle-edge" aria-hidden="true" />

                {/* Extended glowing bottom border */}
                <div className="hud-bottom-glow" aria-hidden="true" />

                {/* Decorative HUD scan lines */}
                <div className="hud-scanlines" aria-hidden="true" />

                {/* Corner brackets */}
                <div className="hud-corner hud-corner--tl" aria-hidden="true" />
                <div className="hud-corner hud-corner--tr" aria-hidden="true" />
                <div className="hud-corner hud-corner--bl" aria-hidden="true" />
                <div className="hud-corner hud-corner--br" aria-hidden="true" />

                {/* Diagonal speed accents (right side) */}
                <div className="hud-diagonal-accents" aria-hidden="true">
                    <span /><span /><span />
                </div>

                {/* HUD node dots */}
                <div className="hud-node-dot hud-node-dot--1" aria-hidden="true" />
                <div className="hud-node-dot hud-node-dot--2" aria-hidden="true" />
                <div className="hud-node-dot hud-node-dot--3" aria-hidden="true" />

                {/* Content */}
                <div className="hud-content">
                    {/* Left: Avatar + Status */}
                    <div className="hud-avatar-section">
                        {/* Online status indicator */}
                        <motion.span
                            className="hud-status-online"
                            aria-label="Online"
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, delay: 0.3 }}
                        />

                        {/* Avatar with hexagonal frame */}
                        <div className="hud-avatar-container">
                            {/* Outer glow ring */}
                            <div className="hud-avatar-glow-ring" aria-hidden="true" />
                            {/* Hexagonal frame layers */}
                            <svg className="hud-avatar-hex" viewBox="0 0 60 76" fill="none" aria-hidden="true">
                                <polygon
                                    points="30,2 56,15 56,61 30,74 4,61 4,15"
                                    stroke="url(#hudHexGradOuter)"
                                    strokeWidth="2.5"
                                    fill="none"
                                    strokeLinejoin="round"
                                />
                                <polygon
                                    points="30,6 52,17 52,59 30,70 8,59 8,17"
                                    stroke="url(#hudHexGradInner)"
                                    strokeWidth="1.2"
                                    fill="none"
                                    strokeLinejoin="round"
                                />
                                <defs>
                                    <linearGradient id="hudHexGradOuter" x1="0" y1="0" x2="60" y2="76">
                                        <stop offset="0%" stopColor="#8B5CF6" />
                                        <stop offset="50%" stopColor="#A855F7" />
                                        <stop offset="100%" stopColor="#7C3AED" />
                                    </linearGradient>
                                    <linearGradient id="hudHexGradInner" x1="0" y1="0" x2="60" y2="76">
                                        <stop offset="0%" stopColor="#C084FC" />
                                        <stop offset="50%" stopColor="#A855F7" />
                                        <stop offset="100%" stopColor="#8B5CF6" />
                                    </linearGradient>
                                </defs>
                            </svg>
                            {/* Animated corner brackets on avatar */}
                            <div className="hud-avatar-brackets" aria-hidden="true">
                                <span className="hud-avatar-bracket hud-avatar-bracket--tl" />
                                <span className="hud-avatar-bracket hud-avatar-bracket--tr" />
                                <span className="hud-avatar-bracket hud-avatar-bracket--bl" />
                                <span className="hud-avatar-bracket hud-avatar-bracket--br" />
                            </div>
                            {/* Avatar image */}
                            <motion.div
                                className="hud-avatar-img"
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.5, ease: "easeOut", delay: 0.35 }}
                            >
                                <img src={profileData.photo} alt={profileData.name} />
                            </motion.div>
                        </div>
                    </div>

                    {/* Right: Identity + EXP */}
                    <div className="hud-identity-section">
                        {/* Name */}
                        <motion.span
                            className="hud-name"
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, ease: "easeOut", delay: 0.45 }}
                        >
                            {profileData.name}
                        </motion.span>

                        {/* Level */}
                        <motion.span
                            className="hud-level"
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, ease: "easeOut", delay: 0.6 }}
                        >
                            {profileData.expLevel}
                        </motion.span>

                        {/* Experience Bar */}
                        <motion.div
                            className="hud-exp-row"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.4, delay: 0.75 }}
                        >
                            <div className="hud-exp-track">
                                <motion.div
                                    className="hud-exp-fill"
                                    initial={{ width: "0%" }}
                                    animate={{ width: `${profileData.expPercentage}%` }}
                                    transition={{ duration: 1.2, ease: "easeOut", delay: 0.85 }}
                                />
                                {/* Shimmer overlay */}
                                <div className="hud-exp-shimmer" aria-hidden="true" />
                            </div>
                            <motion.span
                                className="hud-exp-pct"
                                initial={{ opacity: 0, x: 6 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.4, ease: "easeOut", delay: 1.05 }}
                            >
                                {profileData.expPercentage}% EXP
                            </motion.span>
                        </motion.div>
                    </div>
                </div>

                {/* Decorative interface lines */}
                <div className="hud-interface-lines" aria-hidden="true">
                    <span className="hud-il hud-il--1" />
                    <span className="hud-il hud-il--2" />
                    <span className="hud-il hud-il--3" />
                </div>
            </motion.div>
        </motion.div>
    );
}

import { motion } from 'framer-motion';
import profileData from '../data/profileData';

export default function CharacterCard() {
    return (
        <motion.div
            className="profile-glass-card character-panel aaa-character-panel"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
        >
            {/* Asymmetric corner cuts + HUD accents */}
            <span className="aaa-corner aaa-corner--tl" aria-hidden="true" />
            <span className="aaa-corner aaa-corner--tr" aria-hidden="true" />
            <span className="aaa-corner aaa-corner--bl" aria-hidden="true" />
            <span className="aaa-corner aaa-corner--br" aria-hidden="true" />
            <span className="aaa-hud-bracket aaa-hud-bracket--tl" aria-hidden="true" />
            <span className="aaa-hud-bracket aaa-hud-bracket--tr" aria-hidden="true" />
            <div className="aaa-scanlines" aria-hidden="true" />
            <div className="aaa-corner-indicator aaa-corner-indicator--tl" aria-hidden="true" />
            <div className="aaa-corner-indicator aaa-corner-indicator--br" aria-hidden="true" />

            {/* Animated border */}
            <div className="aaa-char-anim-border" aria-hidden="true" />

            {/* Floating character showcase */}
            <motion.div
                className="character-avatar-wrap aaa-char-wrap"
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 5, ease: 'easeInOut', repeat: Infinity }}
            >
                {/* Purple glow */}
                <div className="character-avatar-glow aaa-char-glow" aria-hidden="true" />

                {/* Holographic floor */}
                <div className="aaa-holo-floor" aria-hidden="true">
                    <div className="aaa-holo-floor-grid" aria-hidden="true" />
                </div>

                <div className="character-avatar-frame aaa-char-frame">
                    <div className="character-avatar-inner aaa-char-inner">
                        <img src={profileData.photo} alt={profileData.name} />
                    </div>
                    <span className="char-bracket char-bracket--tl" aria-hidden="true" />
                    <span className="char-bracket char-bracket--tr" aria-hidden="true" />
                    <span className="char-bracket char-bracket--bl" aria-hidden="true" />
                    <span className="char-bracket char-bracket--br" aria-hidden="true" />
                </div>

                {/* Scan line sweep */}
                <div className="character-scanline aaa-char-scan" aria-hidden="true" />

                {/* Thin rotating border ring */}
                <div className="aaa-char-ring" aria-hidden="true" />
            </motion.div>

            {/* Lore text */}
            <div className="aaa-char-lore">
                <p className="aaa-lore-text aaa-char-lore-text">
                    A rising Full Stack Developer from Taytay, Rizal — one part system guardian,
                    one part digital craftsman. Specializes in crafting clean, efficient web systems
                    while keeping the machines of IT running smoothly. Currently grinding experience
                    across modern frameworks, always ready for the next quest.
                </p>
            </div>

            {/* Hologram flicker */}
            <div className="aaa-holo-flicker" aria-hidden="true" />
        </motion.div>
    );
}

import { motion } from 'framer-motion';
import profileData from '../data/profileData';

export default function PlayerProfileCard() {
    return (
        <motion.div
            className="profile-glass-card aaa-player-panel"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
        >
            {/* Asymmetric corner cuts + HUD accents */}
            <span className="aaa-corner aaa-corner--tl" aria-hidden="true" />
            <span className="aaa-corner aaa-corner--tr" aria-hidden="true" />
            <span className="aaa-corner aaa-corner--bl" aria-hidden="true" />
            <span className="aaa-corner aaa-corner--br" aria-hidden="true" />
            <span className="aaa-hud-bracket aaa-hud-bracket--tl" aria-hidden="true" />
            <span className="aaa-hud-bracket aaa-hud-bracket--br" aria-hidden="true" />
            <div className="aaa-scanlines" aria-hidden="true" />
            <div className="aaa-corner-indicator aaa-corner-indicator--tl" aria-hidden="true" />
            <div className="aaa-corner-indicator aaa-corner-indicator--br" aria-hidden="true" />

            {/* Panel title */}
            <div className="aaa-panel-header">
                <span className="aaa-panel-header-icon" aria-hidden="true">◆</span>
                <h3 className="glass-card-title aaa-panel-title">Player Profile</h3>
                <span className="aaa-panel-header-line" aria-hidden="true" />
            </div>

            <div className="aaa-player-content">
                {/* Name + Level */}
                <div className="aaa-player-name-row">
                    <h2 className="aaa-player-name">{profileData.name}</h2>
                    <span className="aaa-player-level">{profileData.expLevel}</span>
                </div>

                {/* EXP Bar */}
                <div className="aaa-exp-block">
                    <div className="aaa-exp-label-row">
                        <span className="aaa-exp-label">AGE LEVEL</span>
                        <span className="aaa-exp-pct">{profileData.expPercentage}%</span>
                    </div>
                    <div className="aaa-exp-track">
                        <motion.div
                            className="aaa-exp-fill"
                            initial={{ width: '0%' }}
                            animate={{ width: `${profileData.expPercentage}%` }}
                            transition={{ duration: 1.2, ease: 'easeOut', delay: 0.5 }}
                        />
                        <div className="aaa-exp-shimmer" aria-hidden="true" />
                    </div>
                    <div className="aaa-exp-ticks" aria-hidden="true">
                        {[25, 50, 75].map((t) => (
                            <span key={t} style={{ left: `${t}%` }} />
                        ))}
                    </div>
                </div>

                {/* Class */}
                <div className="aaa-class-row">
                    <span className="aaa-class-label">Class</span>
                    <span className="aaa-class-value">Full Stack Developer &amp; IT Support</span>
                </div>

                {/* Status */}
                <div className="aaa-status-row">
                    <span className="aaa-status-dot" />
                    <span className="aaa-status-text">Available for Work</span>
                </div>
            </div>

            {/* Hologram flicker */}
            <div className="aaa-holo-flicker" aria-hidden="true" />
        </motion.div>
    );
}

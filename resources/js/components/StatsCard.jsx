import { motion } from 'framer-motion';

const stats = [
    { label: 'Frontend', value: 80, color: '#3B82F6' },
    { label: 'Backend', value: 90, color: '#8B5CF6' },
    { label: 'IT Support', value: 90, color: '#06B6D4' },
    { label: 'Problem Solving', value: 85, color: '#F59E0B' },
    { label: 'Communication', value: 80, color: '#F472B6' },
    { label: 'Learning', value: 95, color: '#22C55E' },
];

const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08 } },
};

const item = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 },
};

export default function StatsCard() {
    return (
        <motion.div
            className="profile-glass-card stats-panel aaa-stats-panel"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
            {/* Asymmetric corner cuts + HUD accents */}
            <span className="aaa-corner aaa-corner--tl" aria-hidden="true" />
            <span className="aaa-corner aaa-corner--tr" aria-hidden="true" />
            <span className="aaa-corner aaa-corner--bl" aria-hidden="true" />
            <span className="aaa-corner aaa-corner--br" aria-hidden="true" />
            <div className="aaa-scanlines" aria-hidden="true" />
            <div className="aaa-corner-indicator aaa-corner-indicator--tl" aria-hidden="true" />
            <div className="aaa-corner-indicator aaa-corner-indicator--br" aria-hidden="true" />

            {/* Panel title */}
            <div className="aaa-panel-header">
                <span className="aaa-panel-header-icon" aria-hidden="true">◆</span>
                <h3 className="glass-card-title aaa-panel-title">Character Stats</h3>
                <span className="aaa-panel-header-line" aria-hidden="true" />
            </div>

            <motion.div className="stats-list" variants={container} initial="hidden" animate="show">
                {stats.map((s) => (
                    <motion.div key={s.label} className="stat-row" variants={item}>
                        <div className="stat-label-row">
                            <span className="stat-lbl">{s.label}</span>
                            <span className="stat-val">{s.value}</span>
                        </div>
                        <div className="stat-track">
                            <motion.div
                                className="stat-fill"
                                style={{
                                    background: `linear-gradient(90deg, ${s.color}, ${s.color}bb)`,
                                    boxShadow: `0 0 10px ${s.color}55, 0 0 20px ${s.color}33`,
                                }}
                                initial={{ width: 0 }}
                                animate={{ width: `${s.value}%` }}
                                transition={{ duration: 1.2, ease: 'easeOut', delay: 0.35 }}
                                whileHover={{ scaleY: 1.8, filter: 'brightness(1.25)' }}
                            />
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {/* Hologram flicker */}
            <div className="aaa-holo-flicker" aria-hidden="true" />
        </motion.div>
    );
}

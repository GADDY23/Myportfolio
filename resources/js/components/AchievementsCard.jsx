import { motion } from 'framer-motion';

const achievements = [
    { icon: '🏆', text: 'Summa Cum Laude' },
    { icon: '🏆', text: 'BS Information Systems' },
    { icon: '🏆', text: 'Certified IT Support' },
    { icon: '🏆', text: 'Best in capstone' },
];

const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } },
};

const item = {
    hidden: { opacity: 0, x: 20 },
    show: { opacity: 1, x: 0, transition: { duration: 0.45 } },
};

export default function AchievementsCard() {
    return (
        <motion.div
            className="profile-glass-card achievements-panel aaa-achievements-panel"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
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
                <h3 className="glass-card-title aaa-panel-title">Achievements</h3>
                <span className="aaa-panel-header-line" aria-hidden="true" />
            </div>

            <motion.div
                className="achievement-list"
                variants={container}
                initial="hidden"
                animate="show"
            >
                {achievements.map((a) => (
                    <motion.div
                        key={a.text}
                        className="achievement-item"
                        variants={item}
                        whileHover={{ scale: 1.04, y: -2 }}
                    >
                        <span className="achievement-icon">{a.icon}</span>
                        <span className="achievement-text">{a.text}</span>
                    </motion.div>
                ))}
            </motion.div>

            {/* Hologram flicker */}
            <div className="aaa-holo-flicker" aria-hidden="true" />
        </motion.div>
    );
}

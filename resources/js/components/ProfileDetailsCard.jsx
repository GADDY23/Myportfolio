import { motion } from 'framer-motion';
import profileData from '../data/profileData';

const details = [
    { icon: '📍', label: 'Location', value: profileData.location },
    { icon: '💻', label: 'Specialization', value: profileData.specialization },
    { icon: '☎', label: 'Contact', value: profileData.phone },
    { icon: '✉', label: 'Email', value: profileData.email },
];

const itemVar = {
    hidden: { opacity: 0, x: -15 },
    show: (i) => ({ opacity: 1, x: 0, transition: { delay: 0.3 + i * 0.08 } }),
};

export default function ProfileDetailsCard() {
    return (
        <motion.div
            className="profile-glass-card details-panel aaa-details-panel"
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
                <h3 className="glass-card-title aaa-panel-title">Profile Details</h3>
                <span className="aaa-panel-header-line" aria-hidden="true" />
            </div>

            <div className="aaa-details-grid">
                {details.map((d, i) => (
                    <motion.div
                        key={d.label}
                        className="aaa-detail-card"
                        custom={i}
                        variants={itemVar}
                        initial="hidden"
                        animate="show"
                        whileHover={{ y: -3, borderColor: 'rgba(168, 85, 247, 0.6)' }}
                    >
                        <span className="aaa-detail-icon">{d.icon}</span>
                        <div className="aaa-detail-info">
                            <span className="aaa-detail-label">{d.label}</span>
                            <span className="aaa-detail-value">{d.value}</span>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Hologram flicker */}
            <div className="aaa-holo-flicker" aria-hidden="true" />
        </motion.div>
    );
}


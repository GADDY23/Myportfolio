import { motion } from 'framer-motion';
import profileData from '../data/profileData';

const contacts = [
    { label: 'Email Me', href: `mailto:${profileData.email}`, icon: '✉', primary: true },
    { label: 'Download Resume', href: profileData.resume, icon: '📄', primary: true, download: true },
    { label: 'GitHub', href: profileData.github, icon: '💻', primary: false },
    { label: 'LinkedIn', href: profileData.linkedin, icon: '🔗', primary: false },
];

const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } },
};

const item = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function ContactCard() {
    const playClick = () => {
        try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.frequency.value = 800;
            osc.type = 'sine';
            gain.gain.setValueAtTime(0.08, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
            osc.start(ctx.currentTime);
            osc.stop(ctx.currentTime + 0.1);
        } catch {}
    };

    return (
        <motion.div
            className="profile-glass-card contact-panel aaa-contact-panel"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
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
                <h3 className="glass-card-title aaa-panel-title">Available Actions</h3>
                <span className="aaa-panel-header-line" aria-hidden="true" />
            </div>

            <motion.div
                className="aaa-contact-grid"
                variants={container}
                initial="hidden"
                animate="show"
            >
                {contacts.map((c) => (
                    <motion.a
                        key={c.label}
                        href={c.href}
                        {...(c.download ? { download: true } : {})}
                        target={c.href.startsWith('http') ? '_blank' : undefined}
                        rel={c.href.startsWith('http') ? 'noreferrer' : undefined}
                        className={`aaa-contact-btn ${c.primary ? 'aaa-contact-btn--primary' : ''}`}
                        variants={item}
                        whileHover={{ scale: 1.05, y: -4 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={playClick}
                    >
                        <span className="aaa-contact-btn-glow" aria-hidden="true" />
                        <span className="aaa-contact-btn-icon">{c.icon}</span>
                        <span className="aaa-contact-btn-label">{c.label}</span>
                    </motion.a>
                ))}
            </motion.div>

            {/* Hologram flicker */}
            <div className="aaa-holo-flicker" aria-hidden="true" />
        </motion.div>
    );
}

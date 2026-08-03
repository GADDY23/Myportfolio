import { motion } from 'framer-motion';
import profileData from '../data/profileData';

export default function BasicInfoCard() {
    return (
        <motion.div
            className="profile-glass-card basic-panel"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
            <h3 className="glass-card-title">Basic Information</h3>

            <div className="basic-info-content">
                <p className="basic-name">{profileData.name}</p>
                <p className="basic-title">Web Developer · IT Support Specialist</p>
                <p className="basic-intro">
                    Aspiring Full Stack Developer who loves building clean, efficient web systems.
                    Blends frontend polish with backend logic and hands-on IT support experience.
                    Always leveling up with new technologies and real-world projects.
                </p>
            </div>
        </motion.div>
    );
}


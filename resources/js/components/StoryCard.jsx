import { motion } from 'framer-motion';

export default function StoryCard() {
    return (
        <motion.div
            className="profile-glass-card story-panel"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
            <h3 className="glass-card-title">Character Story</h3>
            <p className="story-text">
                Passionate web developer specializing in Laravel and IT support. Enjoys solving technical
                challenges and building efficient web systems while continuously learning modern technologies.
            </p>
        </motion.div>
    );
}


import { motion } from 'framer-motion';

export default function CoreNode({ isActive, onClick }) {
    return (
        <motion.button
            className="skill-core-node"
            type="button"
            onClick={onClick}
            aria-label="Core Skills - Click to view all categories"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
                type: 'spring',
                stiffness: 260,
                damping: 20,
                delay: 0.1,
            }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
        >
            <motion.div
                className="skill-core-node-inner"
                animate={{
                    boxShadow: isActive
                        ? [
                              '0 0 20px rgba(139,92,246,0.4), 0 0 40px rgba(139,92,246,0.2)',
                              '0 0 30px rgba(139,92,246,0.6), 0 0 60px rgba(139,92,246,0.3)',
                              '0 0 20px rgba(139,92,246,0.4), 0 0 40px rgba(139,92,246,0.2)',
                          ]
                        : '0 0 12px rgba(139,92,246,0.2), 0 0 24px rgba(139,92,246,0.1)',
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            >
                <span className="skill-core-icon">✦</span>
            </motion.div>
            <span className="skill-core-label">Core Skills</span>
        </motion.button>
    );
}


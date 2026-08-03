import { motion } from 'framer-motion';
import TextType from './TextType';

const roles = [
    'Web Developer',
    'Laravel Developer',
    'Full Stack Developer',
    'IT Support Specialist',
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.12,
            delayChildren: 0.3,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(4px)' },
    visible: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
};

const ctaVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.5, ease: 'easeOut', delay: 0.8 + i * 0.12 },
    }),
    hover: {
        scale: 1.04,
        y: -3,
        transition: { duration: 0.25, ease: 'easeOut' },
    },
    tap: { scale: 0.97, y: 0 },
};

const floatingParticleVariants = {
    animate: (i) => ({
        y: [0, -12, 0],
        opacity: [0.15, 0.35, 0.15],
        transition: {
            duration: 4 + i * 0.8,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.5,
        },
    }),
};

export default function HomeSection() {
    const handleScrollTo = (section) => {
        // Dispatch a custom event that App.jsx can listen to
        window.dispatchEvent(new CustomEvent('navigate-to-section', { detail: { section } }));
    };

    return (
        <section className="home-section" aria-label="Home">
            {/* Ambient floating particles */}
            <div className="home-ambient" aria-hidden="true">
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="home-particle"
                        custom={i}
                        variants={floatingParticleVariants}
                        animate="animate"
                        style={{
                            left: `${12 + i * 16}%`,
                            top: `${20 + (i % 3) * 28}%`,
                            width: `${4 + (i % 3) * 3}px`,
                            height: `${4 + (i % 3) * 3}px`,
                        }}
                    />
                ))}
            </div>

            <motion.div
                className="home-content"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Greeting */}
                <motion.span className="home-greeting" variants={itemVariants}>
                    Hi, I'm
                </motion.span>

                {/* Name */}
                <motion.h1 className="home-name" variants={itemVariants}>
                    Gerald S. Recaña
                </motion.h1>

                {/* Animated Role Changer */}
                <motion.div className="home-role-wrapper" variants={itemVariants}>
                    <span className="home-role-label">I'm a </span>
                    <TextType
                        text={roles}
                        as="span"
                        className="home-role-typewriter"
                        typingSpeed={60}
                        deletingSpeed={35}
                        pauseDuration={2500}
                        initialDelay={500}
                        loop={true}
                        showCursor={true}
                        cursorCharacter="|"
                        cursorClassName="home-role-cursor"
                    />
                </motion.div>

                {/* Tagline */}
                <motion.p className="home-tagline" variants={itemVariants}>
                    Building reliable, scalable, and user-centered web applications
                    with a passion for continuous learning and clean code.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div className="home-cta-group" variants={itemVariants}>
                    {[
                        { label: 'View My Work', action: () => handleScrollTo('Projects'), primary: true },
                        { label: 'Download Resume', action: () => window.open('/documents/Recana_CV.pdf', '_blank'), primary: false },
                        { label: 'Contact Me', action: () => handleScrollTo('Contact'), primary: false },
                    ].map((btn, i) => (
                        <motion.button
                            key={btn.label}
                            className={`home-cta ${btn.primary ? 'home-cta--primary' : ''}`}
                            custom={i}
                            variants={ctaVariants}
                            initial="hidden"
                            animate="visible"
                            whileHover="hover"
                            whileTap="tap"
                            type="button"
                            onClick={btn.action}
                        >
                            {btn.label}
                        </motion.button>
                    ))}
                </motion.div>

                {/* Scroll indicator */}
                <motion.div
                    className="home-scroll-indicator"
                    variants={itemVariants}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2, duration: 0.6 }}
                >
                    <span className="home-scroll-text">Scroll to explore</span>
                    <motion.span
                        className="home-scroll-arrow"
                        animate={{ y: [0, 6, 0] }}
                        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                        aria-hidden="true"
                    >
                        ↓
                    </motion.span>
                </motion.div>
            </motion.div>
        </section>
    );
}


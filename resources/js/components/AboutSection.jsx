import { motion } from 'framer-motion';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const featureCards = [
    {
        icon: '💻',
        title: 'Building',
        text: 'Transforming ideas into responsive, efficient, and user-friendly web applications.',
    },
    {
        icon: '🧩',
        title: 'Problem Solving',
        text: 'Analyzing technical challenges and developing clean, practical solutions.',
    },
    {
        icon: '📚',
        title: 'Learning',
        text: 'Continuously improving skills by learning new technologies and best practices.',
    },
];

const futureGoals = [
    'Become a Full Stack Developer',
    'Master Laravel & React',
    'Learn Docker',
    'Learn Cloud Deployment',
    'Build meaningful software',
];

export default function AboutSection() {
    return (
        <section className="about-premium" aria-label="About me">
            <motion.div
                className="about-premium-grid"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
            >
                {/* ===== LEFT COLUMN (60%) ===== */}
                <div className="about-premium-left">
                    <motion.span className="about-premium-label" variants={itemVariants}>
                        ABOUT ME
                    </motion.span>

                    <motion.h2 className="about-premium-heading" variants={itemVariants}>
                        Building reliable web applications with a passion for continuous learning.
                    </motion.h2>

                    <motion.div className="about-premium-bio" variants={itemVariants}>
                        <p>
                            I am a Summa Cum Laude graduate with a Bachelor of Science in Information Systems
                            who is passionate about building modern web applications and solving technical challenges.
                            Through academic projects and my internship, I developed hands-on experience in web
                            development, IT support, and troubleshooting while strengthening my problem-solving
                            and analytical skills.
                        </p>
                        <p>
                            I enjoy creating clean, responsive, and user-friendly applications that provide practical
                            solutions to real-world problems. As technology continues to evolve, I am committed to
                            continuously learning new frameworks, tools, and best practices to grow as a developer
                            and deliver better software.
                        </p>
                    </motion.div>

                    {/* 3-column feature cards */}
                    <motion.div className="about-premium-features" variants={itemVariants}>
                        <div className="about-features-grid">
                            {featureCards.map((card) => (
                                <motion.article
                                    key={card.title}
                                    className="about-feature-card"
                                    whileHover={{ scale: 1.02, y: -4 }}
                                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                                >
                                    <span className="about-feature-icon" aria-hidden="true">{card.icon}</span>
                                    <h3 className="about-feature-title">{card.title}</h3>
                                    <p className="about-feature-text">{card.text}</p>
                                </motion.article>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* ===== RIGHT COLUMN (40%) ===== */}
                <div className="about-premium-right">
                    <motion.article
                        className="about-info-card"
                        variants={itemVariants}
                        whileHover={{ scale: 1.02, y: -4 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    >
                        <h3 className="about-info-title">Mission</h3>
                        <p className="about-info-text">
                            To build reliable, scalable, and user-centered web applications that solve
                            real-world problems while continuously improving my technical expertise.
                        </p>
                    </motion.article>

                    <motion.article
                        className="about-info-card"
                        variants={itemVariants}
                        whileHover={{ scale: 1.02, y: -4 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    >
                        <h3 className="about-info-title">Future Goals</h3>
                        <ul className="about-goals-list">
                            {futureGoals.map((goal) => (
                                <li key={goal} className="about-goal-item">
                                    <span className="about-goal-check" aria-hidden="true">✓</span>
                                    <span>{goal}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.article>

                    <motion.article
                        className="about-info-card about-quote-card"
                        variants={itemVariants}
                        whileHover={{ scale: 1.02, y: -4 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    >
                        <h3 className="about-info-title">Development Philosophy</h3>
                        <blockquote className="about-quote-box">
                            <span className="about-quote-mark" aria-hidden="true">❝</span>
                            <p>
                                Every project is an opportunity to learn, every challenge is an opportunity
                                to improve, and every solution is a step toward becoming a better developer.
                            </p>
                            <span className="about-quote-mark about-quote-mark--end" aria-hidden="true">❞</span>
                        </blockquote>
                    </motion.article>
                </div>
            </motion.div>
        </section>
    );
}



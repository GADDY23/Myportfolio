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

const headerVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
};

const chipVariants = {
    hidden: { opacity: 0, scale: 0.85 },
    visible: (i) => ({
        opacity: 1,
        scale: 1,
        transition: { duration: 0.35, ease: 'easeOut', delay: 0.3 + i * 0.04 },
    }),
};

const techVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.35, ease: 'easeOut', delay: 0.5 + i * 0.03 },
    }),
};

const coursework = [
    'Systems Analysis & Design',
    'Software Engineering',
    'Database Management',
    'Web Development',
    'Networking',
    'Human Computer Interaction',
    'Project Management',
    'Information Security',
];

const technicalFoundation = [
    {
        icon: '💻',
        title: 'Software Development',
        text: 'Building modern web applications and software solutions.',
    },
    {
        icon: '🗄️',
        title: 'Database Design',
        text: 'Designing relational databases and efficient data structures.',
    },
    {
        icon: '🔍',
        title: 'System Analysis',
        text: 'Analyzing business requirements and designing effective system solutions.',
    },
    {
        icon: '🛠️',
        title: 'IT Support',
        text: 'Troubleshooting hardware, software, and technical issues.',
    },
];

const technologies = [
    'Laravel',
    'PHP',
    'JavaScript',
    'HTML5',
    'CSS3',
    'Bootstrap',
    'MySQL',
    'Git',
    'GitHub',
];

export default function EducationSection() {
    return (
        <section className="education-premium" aria-label="Education">
            <motion.div
                className="education-premium__container"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
            >
                {/* ===== Section Header ===== */}
                <motion.div className="education-premium__header" variants={headerVariants}>
                    <span className="education-premium__label">EDUCATION</span>
                    <h2 className="education-premium__heading">Academic Foundation</h2>
                    <p className="education-premium__subtitle">
                        My academic journey shaped my foundation in software development, systems analysis, and IT.
                    </p>
                </motion.div>

                {/* ===== Two-Column Layout ===== */}
                <div className="education-premium__layout">
                    {/* ===== LEFT COLUMN (40%) ===== */}
                    <div className="education-premium__left">
                        {/* ─── Education Card ─── */}
                        <motion.article
                            className="education-premium__card education-premium__card--primary"
                            variants={cardVariants}
                            whileHover={{
                                scale: 1.02,
                                y: -6,
                                transition: { duration: 0.25, ease: 'easeOut' },
                            }}
                            onHoverStart={() => {}}
                            onHoverEnd={() => {}}
                        >
                            <div className="education-premium__card-header">
                                <span className="education-premium__card-icon" aria-hidden="true">🎓</span>
                                <div className="education-premium__card-titles">
                                    <h3 className="education-premium__card-degree">
                                        Bachelor of Science in Information Systems
                                    </h3>
                                    <p className="education-premium__card-school">
                                        ACLC College of Taytay
                                    </p>
                                    <span className="education-premium__card-years">2022 – 2026</span>
                                </div>
                            </div>

                            <p className="education-premium__card-description">
                                Graduated with a strong foundation in software development, systems analysis,
                                database management, networking, and information technology. Completed multiple
                                software development projects focused on solving real-world problems.
                            </p>
                        </motion.article>

                        {/* ─── Academic Achievements Card ─── */}
                        <motion.article
                            className="education-premium__card education-premium__card--achievements"
                            variants={cardVariants}
                            whileHover={{
                                scale: 1.02,
                                y: -6,
                                transition: { duration: 0.25, ease: 'easeOut' },
                            }}
                            onHoverStart={() => {}}
                            onHoverEnd={() => {}}
                        >
                            <h3 className="education-premium__card-section-title">Academic Achievements</h3>
                            <div className="education-premium__achievements">
                                <div className="education-premium__achievement-item">
                                    <span className="education-premium__achievement-icon" aria-hidden="true">🏅</span>
                                    <div className="education-premium__achievement-content">
                                        <span className="education-premium__achievement-title">Summa Cum Laude</span>
                                        <p className="education-premium__achievement-text">
                                            Graduated with the highest academic honor.
                                        </p>
                                    </div>
                                </div>
                                <div className="education-premium__achievement-item">
                                    <span className="education-premium__achievement-icon" aria-hidden="true">🏅</span>
                                    <div className="education-premium__achievement-content">
                                        <span className="education-premium__achievement-title">Best in Capstone</span>
                                        <p className="education-premium__achievement-text">
                                            Recognized for developing an outstanding capstone project.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.article>
                    </div>

                    {/* ===== RIGHT COLUMN (60%) ===== */}
                    <div className="education-premium__right">
                        {/* ─── CARD 1: Relevant Coursework ─── */}
                        <motion.article
                            className="education-premium__card education-premium__card--supporting"
                            variants={cardVariants}
                            whileHover={{
                                scale: 1.02,
                                y: -6,
                                transition: { duration: 0.25, ease: 'easeOut' },
                            }}
                            onHoverStart={() => {}}
                            onHoverEnd={() => {}}
                        >
                            <h3 className="education-premium__card-section-title">Relevant Coursework</h3>
                            <div className="education-premium__chips">
                                {coursework.map((item, i) => (
                                    <motion.span
                                        key={item}
                                        className="education-premium__chip"
                                        custom={i}
                                        variants={chipVariants}
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true }}
                                        whileHover={{
                                            scale: 1.05,
                                            y: -2,
                                            transition: { duration: 0.2, ease: 'easeOut' },
                                        }}
                                    >
                                        {item}
                                    </motion.span>
                                ))}
                            </div>
                        </motion.article>

                        {/* ─── CARD 2: Technical Foundation ─── */}
                        <motion.article
                            className="education-premium__card education-premium__card--supporting"
                            variants={cardVariants}
                            whileHover={{
                                scale: 1.02,
                                y: -6,
                                transition: { duration: 0.25, ease: 'easeOut' },
                            }}
                            onHoverStart={() => {}}
                            onHoverEnd={() => {}}
                        >
                            <h3 className="education-premium__card-section-title">Technical Foundation</h3>
                            <div className="education-premium__foundation-grid">
                                {technicalFoundation.map((item, i) => (
                                    <motion.div
                                        key={item.title}
                                        className="education-premium__foundation-card"
                                        custom={i}
                                        variants={chipVariants}
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true }}
                                        whileHover={{
                                            scale: 1.04,
                                            y: -4,
                                            transition: { duration: 0.2, ease: 'easeOut' },
                                        }}
                                    >
                                        <span className="education-premium__foundation-icon" aria-hidden="true">
                                            {item.icon}
                                        </span>
                                        <h4 className="education-premium__foundation-title">{item.title}</h4>
                                        <p className="education-premium__foundation-text">{item.text}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.article>

                        {/* ─── CARD 3: Technical Exposure ─── */}
                        <motion.article
                            className="education-premium__card education-premium__card--supporting education-premium__card--exposure"
                            variants={cardVariants}
                            whileHover={{
                                scale: 1.02,
                                y: -6,
                                transition: { duration: 0.25, ease: 'easeOut' },
                            }}
                            onHoverStart={() => {}}
                            onHoverEnd={() => {}}
                        >
                            <h3 className="education-premium__card-section-title">Technical Exposure</h3>
                            <div className="education-premium__tech-badges">
                                {technologies.map((tech, i) => (
                                    <motion.span
                                        key={tech}
                                        className="education-premium__tech-badge"
                                        custom={i}
                                        variants={techVariants}
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true }}
                                        whileHover={{
                                            scale: 1.06,
                                            y: -2,
                                            transition: { duration: 0.2, ease: 'easeOut' },
                                        }}
                                    >
                                        {tech}
                                    </motion.span>
                                ))}
                            </div>
                        </motion.article>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}


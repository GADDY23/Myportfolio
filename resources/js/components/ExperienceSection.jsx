import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { experienceCards } from '../data/experienceData';

const categoryIcons = {
    Education: '🎓',
    Internship: '💼',
    Capstone: '🚀',
};

const cardVariants = {
    hidden: (isLeft) => ({
        opacity: 0,
        x: isLeft ? -60 : 60,
        filter: 'blur(4px)',
    }),
    visible: {
        opacity: 1,
        x: 0,
        filter: 'blur(0px)',
        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
};

const nodeVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
        scale: 1,
        opacity: 1,
        transition: { duration: 0.4, ease: 'easeOut' },
    },
};

function TimelineCard({ card, index }) {
    const isLeft = index % 2 === 0;
    const cardRef = useRef(null);

    return (
        <motion.article
            ref={cardRef}
            className={`timeline-card ${isLeft ? 'timeline-card--left' : 'timeline-card--right'}`}
            custom={isLeft}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            whileHover={{ y: -4, scale: 1.01 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        >
            <div className="timeline-card-inner">
                {/* Card header */}
                <div className="timeline-card-header">
                    <span className="timeline-card-icon" aria-hidden="true">
                        {card.icon}
                    </span>
                    <div className="timeline-card-titles">
                        <h3 className="timeline-card-title">{card.title}</h3>
                        <p className="timeline-card-subtitle">{card.subtitle}</p>
                    </div>
                </div>

                {/* Badge + Year */}
                <div className="timeline-card-meta">
                    <span
                        className="timeline-card-badge"
                        style={{ '--badge-color': card.badgeColor }}
                    >
                        {card.badge}
                    </span>
                    {card.year && (
                        <span className="timeline-card-year">{card.year}</span>
                    )}
                </div>

                {/* Description */}
                <p className="timeline-card-description">{card.description}</p>

                {/* Achievements */}
                {card.achievements && (
                    <div className="timeline-card-tags">
                        {card.achievements.map((a) => (
                            <span key={a} className="timeline-card-tag timeline-card-tag--achievement">{a}</span>
                        ))}
                    </div>
                )}

                {/* Skills */}
                {card.skills && (
                    <div className="timeline-card-tags">
                        {card.skills.map((s) => (
                            <span key={s} className="timeline-card-tag timeline-card-tag--skill">{s}</span>
                        ))}
                    </div>
                )}

                {/* Projects list */}
                {card.projects && (
                    <ul className="timeline-card-list">
                        {card.projects.map((p) => (
                            <li key={p} className="timeline-card-list-item">
                                <span className="timeline-card-bullet">•</span>
                                {p}
                            </li>
                        ))}
                    </ul>
                )}

                {/* Technologies */}
                {card.technologies && (
                    <div className="timeline-card-tags">
                        {card.technologies.map((t) => (
                            <span key={t} className="timeline-card-tag timeline-card-tag--tech">{t}</span>
                        ))}
                    </div>
                )}

                {/* Highlights */}
                {card.highlights && (
                    <ul className="timeline-card-list">
                        {card.highlights.map((h) => (
                            <li key={h} className="timeline-card-list-item">
                                <span className="timeline-card-check">✔</span>
                                {h}
                            </li>
                        ))}
                    </ul>
                )}

                {/* Currently Learning */}
                {card.currentlyLearning && (
                    <div className="timeline-card-tags">
                        {card.currentlyLearning.map((l) => (
                            <span key={l} className="timeline-card-tag timeline-card-tag--learning">{l}</span>
                        ))}
                    </div>
                )}

                {/* Career Goal */}
                {card.careerGoal && (
                    <p className="timeline-card-goal">{card.careerGoal}</p>
                )}
            </div>
        </motion.article>
    );
}

export default function ExperienceSection() {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start'],
    });

    const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

    // Use a simple progress value for the timeline line within section visibility
    const [lineProgress, setLineProgress] = useState(0);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    const ratio = Math.min(entry.intersectionRatio * 1.5, 1);
                    setLineProgress(ratio);
                }
            },
            { threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1] }
        );
        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }
        return () => observer.disconnect();
    }, []);

    return (
        <section className="timeline-section" aria-label="Experience" ref={sectionRef}>
            <div className="timeline-section-inner">
                {/* Section Header */}
                <motion.div
                    className="timeline-section-header"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                >
                    <span className="timeline-section-label">EXPERIENCE</span>
                    <h2 className="timeline-section-heading">My Professional Journey</h2>
                    <p className="timeline-section-subtitle">
                        A journey of learning, building, and growing through education, real-world
                        experience, and continuous development.
                    </p>
                </motion.div>

                {/* Timeline */}
                <div className="timeline-container">
                    {/* Timeline line */}
                    <div className="timeline-line-track" aria-hidden="true">
                        <motion.div
                            className="timeline-line-fill"
                            style={{ height: lineHeight }}
                        />
                    </div>

                    {/* Timeline nodes + cards */}
                    <div className="timeline-items">
                        {experienceCards.map((card, index) => (
                            <div key={card.id} className="timeline-item-wrapper">
                                {/* Timeline node */}
                                <motion.div
                                    className="timeline-node"
                                    variants={nodeVariants}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, amount: 0.5 }}
                                >
                                    <div className="timeline-node-inner">
                                        <span className="timeline-node-icon" aria-hidden="true">
                                            {categoryIcons[card.id.charAt(0).toUpperCase() + card.id.slice(1)] || card.icon}
                                        </span>
                                    </div>
                                </motion.div>

                                {/* Card */}
                                <TimelineCard card={card} index={index} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}


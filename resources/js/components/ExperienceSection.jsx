import { useRef } from 'react';
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
    const isFeatured = !!card.featured;
    // Show only 3 key features for the featured (Capstone) card
    const visibleHighlights = isFeatured && card.highlights ? card.highlights.slice(0, 3) : card.highlights;

    return (
        <motion.article
            className={`timeline-card ${isLeft ? 'timeline-card--left' : 'timeline-card--right'} ${isFeatured ? 'timeline-card--featured' : ''}`}
            custom={isLeft}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            whileHover={{ y: -4, scale: 1.01 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        >
            {/* Hover shine sweep */}
            <span className="timeline-card-shine" aria-hidden="true" />

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
                    {isFeatured && (
                        <span className="timeline-card-featuretag">★ Featured</span>
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

                {/* Highlights / Metrics */}
                {visibleHighlights && (
                    <ul className={`timeline-card-list ${isFeatured ? 'timeline-card-list--features' : ''}`}>
                        {visibleHighlights.map((h) => (
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

                {/* See more (Education & Capstone only) */}
                {(card.id === 'education' || card.id === 'capstone') && (
                    <span
                        className="timeline-card-seemore timeline-card-seemore--link"
                        role="button"
                        tabIndex={0}
                        onClick={() =>
                            window.dispatchEvent(
                                new CustomEvent('navigate-to-section', {
                                    detail: { section: card.id === 'education' ? 'Education' : 'Projects' },
                                })
                            )
                        }
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                window.dispatchEvent(
                                    new CustomEvent('navigate-to-section', {
                                        detail: { section: card.id === 'education' ? 'Education' : 'Projects' },
                                    })
                                );
                            }
                        }}
                    >
                        See more →
                    </span>
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
                    <span className="timeline-section-label">JOURNEY</span>
                    <h2 className="timeline-section-heading">My Journey</h2>
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

                                {/* Connector from node to card */}
                                <span className="timeline-item-connector" aria-hidden="true" />

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

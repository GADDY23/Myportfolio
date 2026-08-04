import { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Ferrofluid from './components/Ferrofluid';
import LoadingScreen from './components/LoadingScreen';
import HudProfileCard from './components/HudProfileCard';
import AboutSection from './components/AboutSection';
import ExperienceSection from './components/ExperienceSection';
import SkillsSection from './components/SkillsSection';
import EducationSection from './components/EducationSection';
import Profile from './pages/Profile';

const navigation = ['About', 'Experience', 'Skills', 'Projects', 'Education', 'Contact'];

const sectionMessages = {
    About: 'Scroll down to view Experience',
    Experience: 'Scroll down to view Skills',
    Skills: 'Scroll down to view Projects',
    Projects: 'Scroll down to view Education',
    Education: 'Scroll down to view Contact',
    Contact: 'Scroll up to review',
};

const projects = [
    {
        title: 'Job Portfolio',
        category: 'Web',
        summary: 'A recruiter-focused portfolio with a terminal-inspired interface, project proof, skills, and contact paths.',
        tech: ['React', 'Vite', 'Tailwind CSS'],
        accent: 'teal',
    },
    {
        title: 'Management Dashboard',
        category: 'Web',
        summary: 'Admin dashboard concept for tracking records, activity, and important status changes in one clean workspace.',
        tech: ['Laravel', 'MySQL', 'Blade'],
        accent: 'blue',
    },
    {
        title: 'Booking Flow',
        category: 'UI',
        summary: 'A responsive booking interface focused on clear steps, readable forms, and confident user actions.',
        tech: ['React', 'JavaScript', 'CSS'],
        accent: 'amber',
    },
    {
        title: 'API Practice',
        category: 'Backend',
        summary: 'Backend practice project for organizing data, routes, validation, and structured responses.',
        tech: ['Laravel', 'PHP', 'API'],
        accent: 'violet',
    },
];

const filters = ['All', 'Web', 'UI', 'Backend'];

function HomePage() {
    const [activeFilter, setActiveFilter] = useState('All');
    const [activeSection, setActiveSection] = useState('About');
    const wheelLock = useRef(false);
    const [selectedProject, setSelectedProject] = useState(null);

    const activeSectionIndex = navigation.indexOf(activeSection);

    const changeSection = (direction) => {
        const nextIndex = Math.min(Math.max(activeSectionIndex + direction, 0), navigation.length - 1);
        setActiveSection(navigation[nextIndex]);
    };

    const handleSectionWheel = (event) => {
        if (Math.abs(event.deltaY) < 18 || wheelLock.current) {
            return;
        }

        wheelLock.current = true;
        changeSection(event.deltaY > 0 ? 1 : -1);

        window.setTimeout(() => {
            wheelLock.current = false;
        }, 520);
    };

    const handleSectionKeys = (event) => {
        if (['ArrowDown', 'PageDown'].includes(event.key)) {
            event.preventDefault();
            changeSection(1);
        }

        if (['ArrowUp', 'PageUp'].includes(event.key)) {
            event.preventDefault();
            changeSection(-1);
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleSectionKeys);

        return () => {
            window.removeEventListener('keydown', handleSectionKeys);
        };
    }, [activeSectionIndex]);

    // Listen for custom navigation event from HomeSection CTAs
    useEffect(() => {
        const handler = (e) => {
            setActiveSection(e.detail.section);
        };
        window.addEventListener('navigate-to-section', handler);
        return () => window.removeEventListener('navigate-to-section', handler);
    }, []);

    const visibleProjects = useMemo(() => {
        if (activeFilter === 'All') {
            return projects;
        }

        return projects.filter((project) => project.category === activeFilter);
    }, [activeFilter]);

    // Ferrofluid opacity varies by section
    const ferrofluidOpacity = useMemo(() => {
        const opacities = {
            About: 0.5,
            Experience: 0.35,
            Skills: 0.55,
            Projects: 0.8,
            Education: 0.45,
            Contact: 0.4,
        };
        return opacities[activeSection] || 0.6;
    }, [activeSection]);

    // Section entry animation variants
    const sectionAnimation = useMemo(() => {
        switch (activeSection) {
            case 'About':
                return { initial: { opacity: 0, y: 40 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } };
            case 'Experience':
                return { initial: { opacity: 0, x: -30 }, animate: { opacity: 1, x: 0 }, transition: { duration: 0.5, ease: 'easeOut' } };
            case 'Skills':
                return { initial: { opacity: 0, scale: 0.97 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 0.45, ease: 'easeOut' } };
            case 'Projects':
                return { initial: { opacity: 0, scale: 0.95 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 0.5, ease: 'easeOut' } };
            case 'Education':
                return { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, ease: 'easeOut' } };
            case 'Contact':
                return { initial: { opacity: 0, filter: 'blur(4px)' }, animate: { opacity: 1, filter: 'blur(0px)' }, transition: { duration: 0.6, ease: 'easeOut' } };
            default:
                return { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.4 } };
        }
    }, [activeSection]);

    return (
        <main className="site-shell" onWheel={handleSectionWheel}>
            {/* Cyberpunk HUD Profile Card — persists across all home sections */}
            <HudProfileCard />
            <div className="page-grid page-grid--home">
                <div className="ferrofluid-backdrop" aria-hidden="true">
                    <Ferrofluid
                        colors={['#7C3AED', '#A855F7', '#06B6D4']}
                        speed={0.35}
                        scale={1.25}
                        turbulence={0.9}
                        fluidity={0.12}
                        rimWidth={0.18}
                        sharpness={2.3}
                        shimmer={1.1}
                        glow={1.6}
                        flowDirection="down"
                        opacity={ferrofluidOpacity}
                        mouseInteraction={false}
                        dpr={1}
                    />
                </div>
                <section className="content-panel">
                    <motion.div
                        key={activeSection}
                        initial={sectionAnimation.initial}
                        animate={sectionAnimation.animate}
                        transition={sectionAnimation.transition}
                        style={{ height: '100%' }}
                    >
                        {activeSection === 'About' && <AboutSection />}
                        {activeSection === 'Experience' && <ExperienceSection />}
                        {activeSection === 'Skills' && <SkillsSection />}
                        {activeSection === 'Projects' && (
                            <Projects
                                activeFilter={activeFilter}
                                onFilterChange={setActiveFilter}
                                projects={visibleProjects}
                                onSelectProject={setSelectedProject}
                                selectedProject={selectedProject}
                            />
                        )}
                        {activeSection === 'Education' && <EducationSection />}
                        {activeSection === 'Contact' && <Contact />}
                    </motion.div>
                </section>
                <CategoryRail activeSection={activeSection} onSectionChange={setActiveSection} />
                {/* Project Modal */}
                {selectedProject && (
                    <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
                )}
            </div>
        </main>
    );
}

function CategoryRail({ activeSection, onSectionChange }) {
    const activeIndex = navigation.indexOf(activeSection);
    const railOffset = `-${activeIndex * 3.2 + 1.375}rem`;

    return (
        <aside className="category-rail" aria-label="Section selector">
            <p className="rail-kicker">Sections</p>
            <div className="rail-track">
                <div className="rail-list" style={{ '--rail-offset': railOffset }}>
                    {navigation.map((item) => {
                        const isActive = activeSection === item;

                        return (
                            <motion.button
                                key={item}
                                className={isActive ? 'active' : ''}
                                type="button"
                                onClick={() => onSectionChange(item)}
                                animate={{ scale: isActive ? 1.05 : 1, x: isActive ? -6 : 0 }}
                                transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                                whileHover={{ scale: 1.04, x: -4 }}
                                aria-label={`Open ${item} section`}
                            >
                                {item}
                            </motion.button>
                        );
                    })}
                </div>
            </div>
            <div className="scroll-prompt" key={activeSection}>
                <p>{sectionMessages[activeSection]}</p>
            </div>
        </aside>
    );
}

function Projects({ activeFilter, onFilterChange, projects, onSelectProject, selectedProject }) {
    // Featured project = first one in filtered list
    const featured = projects.length > 0 ? projects[0] : null;
    const galleryProjects = projects.slice(1);

    return (
        <section id="projects" className="projects-section">
            <div className="projects-section-inner">
                {/* Section Header */}
                <div className="projects-heading">
                    <SectionTitle eyebrow="Projects" title="Selected Work" />
                    <div className="filter-row" aria-label="Project filters">
                        {filters.map((filter) => (
                            <button
                                key={filter}
                                className={activeFilter === filter ? 'active' : ''}
                                type="button"
                                onClick={() => onFilterChange(filter)}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Featured Project */}
                {featured && (
                    <motion.article
                        className="project-featured"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        onClick={() => onSelectProject(featured)}
                    >
                        <div className={`project-featured-preview ${featured.accent}`}>
                            <div className="project-featured-overlay">
                                <span className="project-featured-badge">Featured Project</span>
                                <h3 className="project-featured-title">{featured.title}</h3>
                                <p className="project-featured-summary">{featured.summary}</p>
                                <div className="project-featured-tech">
                                    {featured.tech.map((t) => (
                                        <span key={t} className="project-featured-tag">{t}</span>
                                    ))}
                                </div>
                                <span className="project-featured-cta">View Case Study →</span>
                            </div>
                        </div>
                    </motion.article>
                )}

                {/* Project Gallery */}
                <div className="project-gallery">
                    {galleryProjects.map((project, i) => (
                        <motion.article
                            key={project.title}
                            className="project-gallery-card"
                            initial={{ opacity: 0, scale: 0.92 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, delay: 0.1 + i * 0.08, ease: 'easeOut' }}
                            whileHover={{ y: -6, scale: 1.02 }}
                            onClick={() => onSelectProject(project)}
                        >
                            <div className={`project-gallery-preview ${project.accent}`}>
                                <div className="project-gallery-badge">{project.category}</div>
                                <div className="project-gallery-lines">
                                    <span></span><span></span><span></span>
                                </div>
                            </div>
                            <div className="project-gallery-content">
                                <h4 className="project-gallery-title">{project.title}</h4>
                                <p className="project-gallery-summary">{project.summary}</p>
                                <div className="project-gallery-tech">
                                    {project.tech.map((t) => (
                                        <span key={t} className="project-gallery-tag">{t}</span>
                                    ))}
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ─── Project Modal ─── */
function ProjectModal({ project, onClose }) {
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        document.body.style.overflow = 'hidden';
        return () => {
            window.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = '';
        };
    }, [onClose]);

    return (
        <motion.div
            className="project-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
        >
            <motion.div
                className="project-modal"
                initial={{ opacity: 0, scale: 0.92, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                onClick={(e) => e.stopPropagation()}
            >
                <button className="project-modal-close" onClick={onClose} aria-label="Close modal" type="button">
                    ✕
                </button>

                <div className="project-modal-header">
                    <span className="project-modal-badge">{project.category}</span>
                    <h2 className="project-modal-title">{project.title}</h2>
                </div>

                <div className="project-modal-body">
                    {/* Overview */}
                    <div className="project-modal-section">
                        <h3 className="project-modal-section-title">Overview</h3>
                        <p className="project-modal-text">{project.summary}</p>
                    </div>

                    {/* Problem */}
                    <div className="project-modal-section">
                        <h3 className="project-modal-section-title">Problem</h3>
                        <p className="project-modal-text">
                            The challenge was to create a modern, recruiter-focused platform that effectively
                            showcases technical skills, project experience, and professional identity in a
                            memorable and interactive way.
                        </p>
                    </div>

                    {/* Solution */}
                    <div className="project-modal-section">
                        <h3 className="project-modal-section-title">Solution</h3>
                        <p className="project-modal-text">
                            Built a terminal-inspired portfolio with a unique navigation system, ferrofluid
                            background effects, and a clean glassmorphism design language that reflects both
                            technical competence and creative thinking.
                        </p>
                    </div>

                    {/* Features */}
                    <div className="project-modal-section">
                        <h3 className="project-modal-section-title">Key Features</h3>
                        <ul className="project-modal-list">
                            <li>Interactive section navigation with wheel and keyboard support</li>
                            <li>Dynamic skill tree with expandable category nodes</li>
                            <li>Animated ferrofluid background with varying intensity</li>
                            <li>Vertical timeline for experience storytelling</li>
                            <li>Responsive glassmorphism design system</li>
                        </ul>
                    </div>

                    {/* Tech Stack */}
                    <div className="project-modal-section">
                        <h3 className="project-modal-section-title">Technology Stack</h3>
                        <div className="project-modal-tech">
                            {project.tech.map((t) => (
                                <span key={t} className="project-modal-tech-tag">{t}</span>
                            ))}
                        </div>
                    </div>

                    {/* Lessons Learned */}
                    <div className="project-modal-section">
                        <h3 className="project-modal-section-title">Lessons Learned</h3>
                        <p className="project-modal-text">
                            This project reinforced the importance of component architecture, animation
                            performance optimization, and creating a cohesive design system that scales
                            across different screen sizes and interaction modes.
                        </p>
                    </div>

                    {/* Actions */}
                    <div className="project-modal-actions">
                        <a
                            href="https://github.com/GADDY23"
                            target="_blank"
                            rel="noreferrer"
                            className="project-modal-btn project-modal-btn--primary"
                        >
                            View on GitHub
                        </a>
                        <a
                            href="#"
                            className="project-modal-btn project-modal-btn--secondary"
                            onClick={(e) => {
                                e.preventDefault();
                                onClose();
                            }}
                        >
                            Close
                        </a>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

function Contact() {
    const contactCards = [
        {
            icon: '✉️',
            label: 'Email',
            value: 'geraldrecana03@gmail.com',
            href: 'mailto:geraldrecana03@gmail.com',
            primary: true,
        },
        {
            icon: '🔗',
            label: 'LinkedIn',
            value: 'Gerald Recaña',
            href: 'https://www.linkedin.com/in/gerald-reca%C3%B1a-203a99414/?trk=public-profile-join-page',
            primary: false,
        },
        {
            icon: '🐙',
            label: 'GitHub',
            value: 'GADDY23',
            href: 'https://github.com/GADDY23',
            primary: false,
        },
        {
            icon: '📄',
            label: 'Resume',
            value: 'Download PDF',
            href: '/documents/Recana_CV.pdf',
            primary: false,
            download: true,
        },
    ];

    return (
        <section id="contact" className="contact-section">
            <motion.div
                className="contact-section-inner"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                {/* Header */}
                <motion.div
                    className="contact-header"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    <div className="contact-availability">
                        <span className="contact-availability-dot" />
                        <span>Available for opportunities</span>
                    </div>
                    <h2 className="contact-heading">Let's Work Together</h2>
                    <p className="contact-message">
                        I'm actively seeking opportunities as a Web Developer, Laravel Developer,
                        Full Stack Developer, or IT Support Specialist. If you think I'd be a good
                        fit for your team, let's connect.
                    </p>
                </motion.div>

                {/* Contact Cards Grid */}
                <div className="contact-cards-grid">
                    {contactCards.map((card, i) => (
                        <motion.a
                            key={card.label}
                            href={card.href}
                            target={card.download ? '_self' : '_blank'}
                            rel={card.download ? '' : 'noreferrer'}
                            className={`contact-card ${card.primary ? 'contact-card--primary' : ''}`}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.2 + i * 0.1, ease: 'easeOut' }}
                            whileHover={{ y: -6, scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <span className="contact-card-ripple" aria-hidden="true" />
                            <span className="contact-card-icon">{card.icon}</span>
                            <div className="contact-card-info">
                                <span className="contact-card-label">{card.label}</span>
                                <span className="contact-card-value">{card.value}</span>
                            </div>
                            <span className="contact-card-arrow" aria-hidden="true">→</span>
                        </motion.a>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}

function SectionTitle({ eyebrow, title }) {
    return (
        <div className="section-title">
            <p>{eyebrow}</p>
            <h2>{title}</h2>
        </div>
    );
}

function PageTransition({ children }) {
    const location = useLocation();
    return (
        <div key={location.pathname} className="page-transition">
            {children}
        </div>
    );
}

function App() {
    const [loading, setLoading] = useState(true);

    return (
        <AnimatePresence mode="wait">
            {loading ? (
                <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: 'easeInOut' }}
                    style={{ position: 'absolute', inset: 0, zIndex: 999 }}
                >
                    <LoadingScreen onDone={() => setLoading(false)} />
                </motion.div>
            ) : (
                <motion.div
                    key="app"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, ease: 'easeInOut' }}
                >
                    <PageTransition>
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/profile" element={<Profile />} />
                        </Routes>
                    </PageTransition>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default App;


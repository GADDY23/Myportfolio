import { useEffect, useMemo, useRef, useState } from 'react';
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
        title: 'Web-Based Scheduling & Assignment System',
        category: 'Web',
        projectType: 'Featured Project · Capstone',
        role: 'Full Stack Developer & Project Lead',
        featured: true,
        summary: 'A capstone system for ACLC College of Taytay that streamlines academic scheduling for rooms, teachers, subjects, and student sections.',
        tech: ['Laravel 12', 'PHP', 'MySQL', 'Blade', 'Tailwind CSS', 'JavaScript'],
        accent: 'teal',
        video: '/videos/schedulingvideo.mp4',
        documentation: '/documents/surena%20(1).pdf',
        problem: 'ACLC College of Taytay relied on manual scheduling and spreadsheet checks, making it time-consuming and prone to double bookings, overlapping classes, uneven teaching loads, and incorrect room assignments.',
        solution: 'Developed a secure, role-based web application that centralizes academic scheduling. Administrators can assign rooms, teachers, subjects, and sections while the system checks for time and resource conflicts before schedules are saved.',
        contribution: 'Led the development of the web-based scheduling system, including system design, database development, backend implementation, scheduling logic, interface development, and testing.',
        features: ['Role-based access for administrators, teachers, and students', 'Management of users, teachers, rooms, subjects, sections, curricula, and academic terms', 'Schedule creation with teacher, room, and section conflict detection', 'Personalized “My Timetable” views for teachers and students', 'Schedules searchable by teacher, section, or room', 'Dashboard notifications for schedule changes and announcements'],
        lessons: 'This capstone strengthened my experience building a full-stack Laravel application, modelling related academic data, validating scheduling constraints, and designing role-specific workflows. The system was tested through user acceptance testing and evaluated using ISO/IEC 25010 quality criteria.',
    },
    {
        title: 'Healthcare Hospital System',
        category: 'Web',
        projectType: 'Academic Project',
        role: 'Full Stack Developer',
        summary: 'A hospital management platform where patients can view services, explore departments, find doctors, schedule appointments, and manage their records online.',
        tech: ['Laravel', 'MySQL', 'Blade', 'Filament'],
        accent: 'blue',
        image: '/images/hp.png',
        gallery: ['/images/hp.png', '/images/hp2.png', '/images/hp3.png', '/images/hp4.png'],
        documentation: '/documents/FINALS%20(1).pdf',
        problem: 'Hospitals often rely on manual and fragmented processes for booking appointments, exploring departments, finding the right doctor, and managing patient records. This makes it difficult and time-consuming for patients to access care and for staff to keep information organized and accurate.',
        solution: 'Built a modern, user-friendly hospital management system that lets patients view services, explore departments, find doctors, and schedule appointments online while centralizing patient information and records for the hospital. An integrated admin panel keeps records, appointments, and system data manageable.',
        contribution: 'Developed the public-facing patient experience and the supporting Laravel and Filament workflows for appointments, patient information, and administration.',
        features: ['Hospital dashboard with Home, Services, Departments, Doctors, Patient Info, Appointments, and Registration', 'Responsive layout with sidebar navigation, quick links, and patient profile access', 'Homepage overview with live capacity, average waiting time, and quick booking actions', 'Service, department, and doctor pages with scheduling and booking options', 'Appointment tracking and patient information management', 'Filament admin panel for managing records, appointments, and system data'],
        lessons: 'This project reinforced the importance of structuring a full-stack Laravel application with clear separation between the public-facing Blade pages and the Filament admin panel. It deepened my understanding of database relationships, appointment workflows, and building responsive, user-friendly healthcare interfaces.',
    },
    {
        title: 'DineTable — Saffron Table',
        category: 'Web',
        projectType: 'Academic Project',
        role: 'Full Stack Developer',
        summary: 'A responsive restaurant reservation platform for Saffron Table, with dining experiences, menu browsing, guest registration, and table booking in one polished flow.',
        tech: ['Laravel', 'MySQL', 'Blade', 'Filament'],
        accent: 'amber',
        image: '/images/table.png',
        gallery: ['/images/table.png', '/images/table1.png', '/images/table2.png', '/images/table3.png', '/images/table5.png'],
        galleryCaptions: ['Home Page', 'Mobile Home Page', 'Menu Page', 'Guest Registration Page', 'Booking / Reserve Page'],
        documentation: '/documents/dinetable.pdf',
        problem: 'Restaurant guests need a clear way to discover dining options, review the menu, create a guest profile, and reserve a table without switching between disconnected pages or manual booking steps.',
        solution: 'Created a responsive Saffron Table reservation platform that guides guests from the restaurant homepage through dining experiences and menu browsing to registration, customer information, and a complete booking flow.',
        contribution: 'Designed and developed the responsive reservation journey, connecting guest information, registration, and table booking workflows.',
        features: ['Restaurant homepage with dining highlights and quick reservation actions', 'Dining Experiences page for exploring available services and setups', 'Menu page for browsing signature plates, house favorites, and drinks', 'Guest Registration page for creating a customer account', 'Customer Info page for saving and managing guest details', 'Booking / Reservation page for selecting guest, table, date, time, and special request details', 'Admin pages for managing users, guest information, and reservations'],
        lessons: 'This project strengthened my understanding of designing a complete reservation journey, connecting customer data to booking records, and building responsive restaurant interfaces that feel consistent from discovery through confirmation.',
    },
    {
        title: 'Booking Flow',
        category: 'UI',
        projectType: 'Practice Project',
        role: 'Frontend Developer',
        summary: 'A responsive booking interface focused on clear steps, readable forms, and confident user actions.',
        tech: ['React', 'JavaScript', 'CSS'],
        accent: 'amber',
    },
    {
        title: 'API Practice',
        category: 'Backend',
        projectType: 'Practice Project',
        role: 'Backend Developer',
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

function Projects({ activeFilter, onFilterChange, projects, onSelectProject }) {
    const featured = projects.find((project) => project.featured) || null;
    const galleryProjects = featured ? projects.filter((project) => project !== featured) : projects;

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
                        <div className={`project-featured-preview ${featured.accent} ${featured.image || featured.video ? 'has-media' : ''}`}>
                            {featured.image && (
                                <img src={featured.image} alt={featured.title} className="project-featured-img" />
                            )}
                            {featured.video && (
                                <video className="project-featured-video" src={featured.video} muted loop autoPlay playsInline aria-label={`${featured.title} demo video`} />
                            )}
                            <div className="project-featured-overlay">
                                <span className="project-featured-badge">Featured Project</span>
                                <h3 className="project-featured-title">{featured.title}</h3>
                                <p className="project-featured-summary">{featured.summary}</p>
                                <p className="project-role"><span>Role</span>{featured.role}</p>
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
                        <div className={`project-gallery-preview ${project.accent} ${project.image ? 'has-image' : ''}`}>
                                {project.image && (
                                    <img src={project.image} alt={project.title} className="project-gallery-img" />
                                )}
                                <div className="project-gallery-badge">{project.projectType || project.category}</div>
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
                                <span className="project-gallery-cta">View Details →</span>
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
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') {
                if (selectedImage) {
                    setSelectedImage(null);
                } else {
                    onClose();
                }
            }
        };
        window.addEventListener('keydown', handleEsc);
        document.body.style.overflow = 'hidden';
        return () => {
            window.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = '';
        };
    }, [onClose, selectedImage]);

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
                    <span className="project-modal-badge">{project.projectType || project.category}</span>
                    <h2 className="project-modal-title">{project.title}</h2>
                    {project.role && <p className="project-modal-role"><span>Role</span>{project.role}</p>}
                </div>

                {/* Project demo video */}
                {project.video && (
                    <div className="project-modal-video-wrap">
                        <video className="project-modal-video" src={project.video} controls playsInline preload="metadata">
                            Your browser does not support embedded video.
                        </video>
                    </div>
                )}

                {/* Project screenshots */}
                {project.gallery && project.gallery.length > 0 && (
                    <div className="project-modal-gallery">
                        {project.gallery.map((src, index) => (
                            <button
                                key={src}
                                type="button"
                                className="project-modal-gallery-item"
                                onClick={() => setSelectedImage(src)}
                                aria-label={`View ${project.title} screenshot in full size`}
                            >
                                <img src={src} alt={`${project.title} screenshot`} className="project-modal-gallery-img" />
                                <span className="project-modal-gallery-caption">{project.galleryCaptions?.[index]}</span>
                                <span className="project-modal-gallery-hint">Click to enlarge</span>
                            </button>
                        ))}
                    </div>
                )}

                <div className="project-modal-body">
                    {/* Overview */}
                    <div className="project-modal-section">
                        <h3 className="project-modal-section-title">Overview</h3>
                        <p className="project-modal-text">{project.summary}</p>
                    </div>

                    {/* Problem */}
                    {project.problem && <div className="project-modal-section">
                        <h3 className="project-modal-section-title">Problem</h3>
                        <p className="project-modal-text">{project.problem}</p>
                    </div>}

                    {project.contribution && <div className="project-modal-section">
                        <h3 className="project-modal-section-title">My Contribution</h3>
                        <p className="project-modal-text">{project.contribution}</p>
                    </div>}

                    {/* Solution */}
                    {project.solution && <div className="project-modal-section">
                        <h3 className="project-modal-section-title">Solution</h3>
                        <p className="project-modal-text">{project.solution}</p>
                    </div>}

                    {/* Features */}
                    {project.features?.length > 0 && <div className="project-modal-section">
                        <h3 className="project-modal-section-title">Key Features</h3>
                        <ul className="project-modal-list">{project.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
                    </div>}

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
                    {project.lessons && <div className="project-modal-section">
                        <h3 className="project-modal-section-title">Lessons Learned</h3>
                        <p className="project-modal-text">{project.lessons}</p>
                    </div>}

                    {/* Actions */}
                    <div className="project-modal-actions">
                        {project.documentation && (
                            <a
                                href={project.documentation}
                                target="_blank"
                                rel="noreferrer"
                                className="project-modal-btn project-modal-btn--primary"
                            >
                                View Documentation
                            </a>
                        )}
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

            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        className="project-image-lightbox"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedImage(null)}
                    >
                        <motion.div
                            className="project-image-lightbox-content"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                type="button"
                                className="project-image-lightbox-close"
                                onClick={() => setSelectedImage(null)}
                                aria-label="Close full-size image"
                            >
                                ×
                            </button>
                            <img src={selectedImage} alt={`${project.title} screenshot in full size`} className="project-image-lightbox-img" />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

function Contact() {
    const primaryContact = {
        icon: '✉️',
        label: 'Send Me an Email',
        value: 'geraldrecana03@gmail.com',
        href: 'mailto:geraldrecana03@gmail.com',
    };

    const contactCards = [
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
            download: true,
            resume: true,
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
                    <span className="contact-label">CONTACT</span>
                    <h2 className="contact-heading">Let's Build Something Together</h2>
                    <p className="contact-message">
                        I'm currently open to opportunities in Web Development, Full Stack Development,
                        Laravel Development, and IT Support.
                    </p>
                </motion.div>

                <motion.a
                    href={primaryContact.href}
                    className="contact-card contact-card--email"
                    aria-label="Send Gerald Recaña an email"
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2, ease: 'easeOut' }}
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <span className="contact-card-ripple" aria-hidden="true" />
                    <span className="contact-card-icon" aria-hidden="true">{primaryContact.icon}</span>
                    <span className="contact-card-info">
                        <span className="contact-card-label">{primaryContact.label}</span>
                        <span className="contact-card-value">{primaryContact.value}</span>
                    </span>
                    <span className="contact-card-arrow" aria-hidden="true">→</span>
                </motion.a>

                <div className="contact-cards-grid">
                    {contactCards.map((card, i) => (
                        <motion.a
                            key={card.label}
                            href={card.href}
                            {...(card.download ? { download: true } : {})}
                            target={card.href.startsWith('http') ? '_blank' : undefined}
                            rel={card.href.startsWith('http') ? 'noreferrer' : undefined}
                            className={`contact-card ${card.resume ? 'contact-card--resume' : ''}`}
                            aria-label={card.resume ? 'Download Gerald Recaña resume PDF' : `Open Gerald Recaña's ${card.label} profile`}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.3 + i * 0.08, ease: 'easeOut' }}
                            whileHover={{ y: -3 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <span className="contact-card-ripple" aria-hidden="true" />
                            <span className="contact-card-icon" aria-hidden="true">{card.icon}</span>
                            <div className="contact-card-info">
                                <span className="contact-card-label">{card.label}</span>
                                <span className="contact-card-value">{card.value}</span>
                            </div>
                            <span className="contact-card-arrow" aria-hidden="true">→</span>
                        </motion.a>
                    ))}
                </div>

                <div className="contact-closing">
                    <p>Have a project, opportunity, or idea in mind?</p>
                    <span>I'd be happy to hear from you.</span>
                </div>
                <footer className="contact-footer">© 2026 Gerald S. Recaña</footer>
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

import { motion } from 'framer-motion';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.12,
            delayChildren: 0.15,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
};

const focusItems = ['Software Development', 'Laravel & Modern Web Tools', 'System Design'];

export default function AboutSection() {
    return (
        <section className="about-me" aria-label="About me">
            <motion.div
                className="h-full w-full max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 pt-24 sm:pt-28 lg:pt-32 flex items-center justify-center"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
            >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 w-full items-center">
                    {/* ─── LEFT COLUMN ─── */}
                    <motion.div variants={itemVariants} className="flex flex-col gap-6 text-left">
                        <span className="text-purple-400 uppercase tracking-widest text-xl font-bold">
                            About Me
                        </span>

                        <h2 className="text-4xl sm:text-5xl font-bold text-white leading-tight tracking-tight">
                            Building reliable and scalable web systems.
                        </h2>

                        <p className="text-gray-300 text-base sm:text-xl leading-relaxed max-w-xl">
                            I'm a BS Information Systems graduate and a Full Stack Developer
                            with hands-on experience in web development and IT support. 
                            I build scalable applications using Laravel and modern frontend tools like React, 
                            focusing on clean design and performance. 
                            I enjoy solving real-world problems by creating efficient and user-friendly systems.
                        </p>
                    </motion.div>

                    {/* ─── RIGHT COLUMN ─── */}
                    <motion.div variants={itemVariants} className="flex flex-col gap-5">
                        {/* Mission */}
                        <motion.article
                            className="rounded-xl border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-purple-500/40"
                            variants={itemVariants}
                        >
                            <h3 className="text-sm font-semibold uppercase tracking-widest text-purple-400 mb-2">
                                Mission
                            </h3>
                            <p className="text-gray-300 text-base leading-relaxed">
                                To build scalable, user-focused systems that solve real-world problems.
                            </p>
                        </motion.article>

                        {/* Focus */}
                        <motion.article
                            className="rounded-xl border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-purple-500/40"
                            variants={itemVariants}
                        >
                            <h3 className="text-sm font-semibold uppercase tracking-widest text-purple-400 mb-3">
                                Focus
                            </h3>
                            <ul className="flex flex-col gap-2.5">
                                {focusItems.map((item) => (
                                    <li
                                        key={item}
                                        className="flex items-center gap-3 text-gray-300 text-base"
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full bg-purple-500/70 flex-shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </motion.article>

                        {/* Growth */}
                        <motion.article
                            className="rounded-xl border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-purple-500/40"
                            variants={itemVariants}
                        >
                            <h3 className="text-sm font-semibold uppercase tracking-widest text-purple-400 mb-2">
                                Growth
                            </h3>
                            <p className="text-gray-300 text-base leading-relaxed">
                                Continuously learning and improving  through real-world projects and new technologies.
                            </p>
                        </motion.article>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}

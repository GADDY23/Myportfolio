import { useEffect, useState, useMemo, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ───────────
   Constants
   ─────────── */

const GREETING = "HI, I'M";
const FULL_NAME = 'GERALD S. RECAÑA';
const SUBTITLE_WORDS = ['WELCOME', 'TO', 'MY', 'PORTFOLIO'];

const PROGRESS_MESSAGES = [
  { threshold: 5,  message: 'Initializing Portfolio...' },
  { threshold: 15, message: 'Loading Developer Profile...' },
  { threshold: 30, message: 'Loading Experience...' },
  { threshold: 45, message: 'Loading Projects...' },
  { threshold: 60, message: 'Loading Skills...' },
  { threshold: 70, message: 'Loading Contact...' },
  { threshold: 82, message: 'Preparing Interface...' },
  { threshold: 92, message: 'Optimizing User Experience...' },
  { threshold: 97, message: 'Almost Ready...' },
];

const FULL_PROGRESS_MESSAGES = [
  ...PROGRESS_MESSAGES,
  { threshold: 100, message: 'System Ready.' },
];

/* ───────────
   Framer Motion Variants
   ─────────── */

const greetingContainerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const greetingCharVariants = {
  hidden: { opacity: 0, x: -6, filter: 'blur(3px)' },
  visible: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.25, ease: 'easeOut' },
  },
};

const nameContainerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.03 },
  },
};

const nameCharVariants = {
  hidden: { opacity: 0, y: 8, filter: 'blur(4px)' },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    textShadow: '0 0 8px rgba(168, 85, 247, 0.6), 0 0 20px rgba(168, 85, 247, 0.3)',
    transition: {
      delay: i === 0 ? 0 : 0,
      duration: 0.35,
      ease: 'easeOut',
    },
  }),
};

const nameAfterVariants = {
  initial: {
    textShadow: '0 0 8px rgba(168, 85, 247, 0.6), 0 0 20px rgba(168, 85, 247, 0.3)',
  },
  pulse: {
    textShadow: [
      '0 0 8px rgba(168, 85, 247, 0.6), 0 0 20px rgba(168, 85, 247, 0.3)',
      '0 0 14px rgba(168, 85, 247, 0.8), 0 0 35px rgba(168, 85, 247, 0.5), 0 0 60px rgba(119, 0, 255, 0.2)',
      '0 0 8px rgba(168, 85, 247, 0.6), 0 0 20px rgba(168, 85, 247, 0.3)',
    ],
    transition: { duration: 1.8, ease: 'easeInOut', repeat: 1 },
  },
};

const lineVariants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

const subtitleContainerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05 },
  },
};

const subtitleWordVariants = {
  hidden: { opacity: 0, y: 16, letterSpacing: '0.5em' },
  visible: {
    opacity: 1,
    y: 0,
    letterSpacing: '0.22em',
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

const accessGrantedVariants = {
  hidden: { opacity: 0, scale: 0.95, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.5, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    scale: 0.97,
    filter: 'blur(8px)',
    transition: { duration: 0.4, ease: 'easeIn' },
  },
};

const cursorVariants = {
  blink: {
    opacity: [1, 0],
    transition: { duration: 0.5, repeat: Infinity, ease: 'easeInOut' },
  },
  hidden: {
    opacity: 0,
    transition: { duration: 0.3 },
  },
};

/* ───────────
   SystemBoot Component
   ─────────── */

export default function SystemBoot({ progress, prefersReducedMotion }) {
  /* ─── Phase State ─── */
  const [phase, setPhase] = useState('initial');
  // 'initial' → 'greeting' → 'name' → 'line' → 'subtitle' → 'loading' → 'accessGranted'

  const [greetingDone, setGreetingDone] = useState(false);
  const [nameDone, setNameDone] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const [glowPulse, setGlowPulse] = useState(false);
  const [namePurplePulse, setNamePurplePulse] = useState(false);

  /* ─── Phase Progression ─── */
  useEffect(() => {
    if (prefersReducedMotion) {
      setPhase('loading');
      setGreetingDone(true);
      setNameDone(true);
      return;
    }

    const t1 = setTimeout(() => setPhase('greeting'), 300);
    const t2 = setTimeout(() => {
      setPhase('name');
      setGreetingDone(true);
      setShowCursor(false);
    }, 300 + GREETING.length * 80 + 300);
    const t3 = setTimeout(() => {
      setPhase('line');
      setNameDone(true);
      setNamePurplePulse(true);
    }, 300 + GREETING.length * 80 + 300 + FULL_NAME.length * 30 + 300 + 400);
    const t4 = setTimeout(() => {
      setPhase('subtitle');
    }, 300 + GREETING.length * 80 + 300 + FULL_NAME.length * 30 + 300 + 400 + 600 + 200);
    const t5 = setTimeout(() => {
      setPhase('loading');
    }, 300 + GREETING.length * 80 + 300 + FULL_NAME.length * 30 + 300 + 400 + 600 + 200 + 600);

    return () => {
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3);
      clearTimeout(t4); clearTimeout(t5);
    };
  }, [prefersReducedMotion]);

  /* ─── Periodic Purple Glow on Name ─── */
  useEffect(() => {
    if (prefersReducedMotion || !nameDone) return;
    const interval = setInterval(() => {
      setNamePurplePulse(true);
      const t = setTimeout(() => setNamePurplePulse(false), 1000);
      return () => clearTimeout(t);
    }, 5000);
    return () => clearInterval(interval);
  }, [prefersReducedMotion, nameDone]);

  /* ─── Access Granted ─── */
  const showAccessGranted = progress >= 100 && (phase === 'loading' || phase === 'accessGranted');

  useEffect(() => {
    if (progress >= 100 && phase === 'loading') {
      setPhase('accessGranted');
    }
  }, [progress, phase]);

  /* ─── Current Progress Message ─── */
  const currentMessage = useMemo(() => {
    if (progress >= 100) return 'System Ready.';
    const matched = [...FULL_PROGRESS_MESSAGES]
      .reverse()
      .find(m => progress >= m.threshold);
    return matched?.message || 'Initializing...';
  }, [progress]);

  /* ─── Periodic Ambient Glow ─── */
  useEffect(() => {
    if (prefersReducedMotion) return;
    const interval = setInterval(() => {
      setGlowPulse(true);
      setTimeout(() => setGlowPulse(false), 1500);
    }, 5000);
    return () => clearInterval(interval);
  }, [prefersReducedMotion]);

  /* ─── Determine if we need the loading block ─── */
  const showLoadingBlock = phase === 'loading' && !showAccessGranted;
  const showTitleSection = phase !== 'initial';

  if (prefersReducedMotion) {
    // Simple static render for reduced motion
    return (
      <div className="system-boot">
        <h1 className="hud-title" aria-label="HI IM GERALD RECANA">
          HI I'M GERALD RECANA
        </h1>
        <div className="hud-subtitle">WELCOME TO MY PORTFOLIO</div>
        {showAccessGranted ? (
          <div className="boot-access-granted">
            <span className="access-check">✔</span>
            <span className="access-text">ACCESS GRANTED</span>
            <span className="access-welcome">Welcome.</span>
          </div>
        ) : (
          <div className="boot-loading-message">{currentMessage}</div>
        )}
      </div>
    );
  }

  return (
    <div className="system-boot">
      {/* ─── Periodic Ambient Glow Overlay ─── */}
      <div className={`boot-glow-overlay ${glowPulse ? 'active' : ''}`} aria-hidden="true" />

      {/* ─── TITLE AREA ─── */}
      <div className="system-boot-title" aria-label="HI IM GERALD RECANA WELCOME TO MY PORTFOLIO">
        {/* ─── STEP 2: Greeting Typewriter ─── */}
        <AnimatePresence mode="wait">
          {showTitleSection && (
            <motion.div
              key="greeting"
              className="system-boot-greeting"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              <motion.span
                className="greeting-text"
                variants={greetingContainerVariants}
                initial="hidden"
                animate={phase === 'greeting' && !greetingDone ? 'visible' : greetingDone ? 'visible' : 'hidden'}
              >
                {GREETING.split('').map((char, i) => (
                  <motion.span
                    key={i}
                    className="greeting-char"
                    variants={greetingCharVariants}
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.span>

              {/* ─── Blinking Cursor ─── */}
              {showCursor && phase === 'greeting' && (
                <motion.span
                  className="boot-cursor"
                  variants={cursorVariants}
                  animate="blink"
                  aria-hidden="true"
                >
                  |
                </motion.span>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ─── STEP 3: Name Reveal ─── */}
        {(phase === 'name' || phase === 'line' || phase === 'subtitle' || phase === 'loading' || phase === 'accessGranted') && (
          <motion.h1
            className="boot-name"
            variants={nameContainerVariants}
            initial="hidden"
            animate="visible"
          >
            {FULL_NAME.split('').map((char, i) => (
              <motion.span
                key={i}
                className="name-char"
                custom={i}
                variants={nameCharVariants}
                animate={
                  nameDone && namePurplePulse
                    ? { textShadow: [
                        '0 0 8px rgba(168, 85, 247, 0.6), 0 0 20px rgba(168, 85, 247, 0.3)',
                        '0 0 14px rgba(168, 85, 247, 0.8), 0 0 35px rgba(168, 85, 247, 0.5), 0 0 60px rgba(119, 0, 255, 0.2)',
                        '0 0 8px rgba(168, 85, 247, 0.6), 0 0 20px rgba(168, 85, 247, 0.3)',
                      ] }
                    : { textShadow: '0 0 8px rgba(168, 85, 247, 0.6), 0 0 20px rgba(168, 85, 247, 0.3)' }
                }
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </motion.h1>
        )}

        {/* ─── STEP 4: Thin Glowing Line ─── */}
        {(phase === 'line' || phase === 'subtitle' || phase === 'loading' || phase === 'accessGranted') && (
          <motion.div
            className="boot-line"
            variants={lineVariants}
            initial="hidden"
            animate="visible"
            aria-hidden="true"
          />
        )}

        {/* ─── STEP 5: Subtitle ─── */}
        {(phase === 'subtitle' || phase === 'loading' || phase === 'accessGranted') && (
          <motion.div
            className="boot-subtitle-wrapper"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            <motion.div
              className="boot-subtitle"
              variants={subtitleContainerVariants}
              initial="hidden"
              animate="visible"
            >
              {SUBTITLE_WORDS.map((word, i) => (
                <motion.span
                  key={i}
                  className="subtitle-word"
                  variants={subtitleWordVariants}
                >
                  {word}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        )}
      </div>

      {/* ─── STEP 6–7: Loading Messages ─── */}
      <AnimatePresence mode="wait">
        {showLoadingBlock && (
          <motion.div
            key="loading-message"
            className="boot-loading-block"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <div className="boot-loading-message">{currentMessage}</div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── STEP 8: Access Granted ─── */}
      <AnimatePresence>
        {showAccessGranted && (
          <motion.div
            key="access-granted"
            className="boot-access-granted"
            variants={accessGrantedVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <span className="access-check">✔</span>
            <span className="access-text">ACCESS GRANTED</span>
            <span className="access-welcome">Welcome.</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}


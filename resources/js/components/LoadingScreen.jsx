import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Ferrofluid from './Ferrofluid';
import SystemBoot from './SystemBoot';

const tipCycle = [
  'Click my profile to learn more.',
  'Scroll down to navigate section',
];

function useInterval(callback, delay, { disabled } = {}) {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    if (disabled) return;
    const id = window.setInterval(() => savedCallback.current(), delay);
    return () => window.clearInterval(id);
  }, [delay, disabled]);
}

const LoadingScreen = ({ onDone }) => {
  const [progress, setProgress] = useState(0);
  const [mountedAt] = useState(() => Date.now());
  const [crossfadeDone, setCrossfadeDone] = useState(false);
  const onDoneRef = useRef(onDone);

  useEffect(() => {
    onDoneRef.current = onDone;
  });

  const prefersReducedMotion = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false;
  }, []);

  const [tipIndex, setTipIndex] = useState(0);

  useInterval(
    () => setTipIndex((i) => (i + 1) % tipCycle.length),
    2400,
    { disabled: prefersReducedMotion }
  );

  useEffect(() => {
    let raf;
    const tick = () => {
      const elapsed = Date.now() - mountedAt;
      // ~10s loading duration
      const target = Math.min(100, (elapsed / 10000) * 100);

      setProgress((p) => (target > p ? target : p));
      if (target >= 100) {
        // Trigger crossfade after a short hold
        setTimeout(() => {
          setCrossfadeDone(true);
          setTimeout(() => {
            onDoneRef.current?.();
          }, 800); // crossfade duration
        }, 1200); // hold time for "ACCESS GRANTED"
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [mountedAt]);

  /* ─── Crossfade: loading screen fades out, home fades in ─── */
  const isLoadingVisible = !crossfadeDone;

  return (
    <>
      {/* ─── Loading Screen ─── */}
      <AnimatePresence>
        {isLoadingVisible && (
          <motion.div
            key="loading-screen"
            className="loading-screen"
            role="status"
            aria-live="polite"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          >
            {/* Corner frame */}
            <div className="hud-frame" aria-hidden="true">
              <span className="corner corner-tl" />
              <span className="corner corner-tr" />
              <span className="corner corner-bl" />
              <span className="corner corner-br" />
              <span className="hud-scan" />
              <span className="hud-scan hud-scan-2" />
              <span className="hud-particles" />
            </div>

            {/* Optional ferrofluid layer */}
            <div className="loading-ferrofluid" aria-hidden="true">
              <Ferrofluid
                paused={prefersReducedMotion}
                colors={['#A855F7', '#8124d8', '#7C3AED']}
                speed={0.25}
                scale={1.15}
                turbulence={0.7}
                fluidity={0.14}
                rimWidth={0.16}
                sharpness={2.2}
                shimmer={1.0}
                glow={1.25}
                flowDirection="down"
                opacity={0.55}
                mouseInteraction={false}
                dpr={1}
                mixBlendMode="screen"
              />
            </div>

            {/* Top-left */}
            <div className="hud-top-left" aria-hidden="true">
              <div className="hud-version">v1.0.0</div>
              <div className="hud-system-label">PORTFOLIO SYSTEM</div>
            </div>

            {/* ─── Center: SystemBoot Animation ─── */}
            <div className="hud-center">
              <SystemBoot
                progress={progress}
                prefersReducedMotion={prefersReducedMotion}
              />
            </div>

            {/* Bottom center */}
            <div className="hud-bottom-center">
              <div className="hud-progress-row">
                <div className="hud-progress" aria-hidden="true">
                  <div
                    className="hud-progress-bar"
                    style={{ width: `${progress}%` }}
                  />
                  <div className="hud-progress-gloss" />
                </div>
                <div className="hud-percent" aria-label={`${Math.round(progress)} percent`}>
                  {Math.round(progress)}%
                </div>
              </div>
              <div className="hud-status">PLEASE WAIT...</div>
            </div>

            {/* Top right */}
            <div className="hud-tip" aria-hidden="true">
              <div className="hud-tip-title">TIP:</div>
              <div className="hud-tip-message">{tipCycle[tipIndex]}</div>
            </div>

            {/* Bottom right */}
            <div className="hud-bottom-right">
              <div className="hud-stay-connected">STAY CONNECTED</div>
              <div className="hud-social-icons" aria-label="Social links">
                <a
                  className="hud-icon"
                  href="https://github.com/GADDY23"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                >
                  <svg viewBox="0 0 24 24" role="img" aria-hidden="true">
                    <path
                      d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.72.5.1.68-.22.68-.49 0-.24-.01-.87-.01-1.71-2.78.62-3.36-1.37-3.36-1.37-.45-1.17-1.11-1.48-1.11-1.48-.91-.64.07-.63.07-.63 1 .07 1.53 1.07 1.53 1.07.9 1.56 2.36 1.11 2.93.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.04 1.03-2.76-.1-.26-.45-1.32.1-2.74 0 0 .84-.28 2.75 1.05.8-.23 1.66-.34 2.51-.35.85.01 1.71.12 2.51.35 1.91-1.33 2.75-1.05 2.75-1.05.55 1.42.2 2.48.1 2.74.64.72 1.03 1.64 1.03 2.76 0 3.93-2.34 4.79-4.57 5.05.36.32.68.95.68 1.92 0 1.38-.01 2.49-.01 2.83 0 .27.18.6.69.49 3.97-1.35 6.84-5.19 6.84-9.72C22 6.58 17.52 2 12 2z"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
                <a
                  className="hud-icon"
                  href="https://www.linkedin.com/in/gerald-reca%C3%B1a-203a99414/?trk=public-profile-join-page"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                >
                  <svg viewBox="0 0 24 24" role="img" aria-hidden="true">
                    <path
                      d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5ZM.5 8h4V23h-4V8Zm7 0h3.83v2.08h.05C12.2 8.89 13.6 8 15.6 8c4.1 0 4.86 2.7 4.86 6.2V23h-4v-7.9c0-1.88-.03-4.3-2.62-4.3-2.62 0-3.02 2.05-3.02 4.16V23h-4V8Z"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
                <a
                  className="hud-icon"
                  href="mailto:geraldrecana03@gmail.com"
                  aria-label="Email"
                >
                  <svg viewBox="0 0 24 24" role="img" aria-hidden="true">
                    <path
                      d="M4 4h16v16H4V4Zm0 2 8 6 8-6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                    />
                  </svg>
                </a>
              </div>
            </div>

            {/* Text flicker overlay */}
            <div className="hud-glow-pulse" aria-hidden="true" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default LoadingScreen;

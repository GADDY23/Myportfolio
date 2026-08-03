import { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { gsap } from 'gsap';
import './TextType.css';

const TextType = ({
  text,
  as: Component = 'div',
  typingSpeed = 50,
  initialDelay = 0,
  pauseDuration = 2000,
  deletingSpeed = 30,
  loop = true,
  className = '',
  showCursor = true,
  hideCursorWhileTyping = false,
  cursorCharacter = '|',
  cursorClassName = '',
  cursorBlinkDuration = 0.5,
  textColors = [],
  variableSpeed,
  onSentenceComplete,
  startOnVisible = false,
  reverseMode = false,
  ...props
}) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(!startOnVisible);
  const cursorRef = useRef(null);
  const containerRef = useRef(null);
  const charsRef = useRef([]);
  const timelineRef = useRef(null);
  const isMountedRef = useRef(true);

  const textArray = useMemo(() => (Array.isArray(text) ? text : [text]), [text]);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const getCurrentTextColor = () => {
    if (textColors.length === 0) return 'inherit';
    return textColors[currentTextIndex % textColors.length];
  };

  // IntersectionObserver for startOnVisible
  useEffect(() => {
    if (!startOnVisible || !containerRef.current) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [startOnVisible]);

  // Cursor blink animation (GPU-accelerated: opacity only)
  useEffect(() => {
    if (showCursor && cursorRef.current) {
      gsap.set(cursorRef.current, { opacity: 1 });
      gsap.to(cursorRef.current, {
        opacity: 0,
        duration: cursorBlinkDuration,
        repeat: -1,
        yoyo: true,
        ease: 'power2.inOut',
        overwrite: true,
      });
    }
  }, [showCursor, cursorBlinkDuration]);

  // Main typing/deleting cycle animation
  useEffect(() => {
    if (!isVisible) return;

    // Kill any previous timeline to avoid overlap
    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    const currentText = textArray[currentTextIndex];
    const processedChars = reverseMode
      ? currentText.split('').reverse()
      : currentText.split('');

    const charElements = charsRef.current;
    if (!charElements || charElements.length === 0) return;

    // Reset all characters to hidden state instantly
    gsap.set(charElements, {
      opacity: 0,
      y: 12,
      willChange: 'transform, opacity',
    });

    // Determine staggering based on typingSpeed (convert ms → seconds for stagger)
    // Cap stagger between 8ms and 25ms for optimal fluid feel
    const revealStagger = Math.min(Math.max(typingSpeed / 1000, 0.008), 0.025);
    const hideStagger = Math.min(Math.max(deletingSpeed / 1000, 0.008), 0.025);

    // Build the full animation timeline
    const tl = gsap.timeline({
      delay: currentTextIndex === 0 ? initialDelay / 1000 : 0,
      onComplete: () => {
        if (!isMountedRef.current) return;

        // When one full cycle completes, move to next text
        if (!loop && currentTextIndex === textArray.length - 1) {
          return; // Stop on last text if not looping
        }

        const nextIndex = (currentTextIndex + 1) % textArray.length;

        if (onSentenceComplete) {
          onSentenceComplete(textArray[currentTextIndex], currentTextIndex);
        }

        setCurrentTextIndex(nextIndex);
      },
    });

    // === PHASE 1: TYPE IN (reveal characters smoothly) ===
    tl.to(charElements, {
      opacity: 1,
      y: 0,
      duration: 0.25,
      stagger: {
        each: revealStagger,
        from: 'start',
      },
      ease: 'cubic-bezier(0.22, 1, 0.36, 1)',
      overwrite: 'auto',
    });

    // === PHASE 2: PAUSE ===
    // Only pause if there's more than one text or loop is enabled
    if (textArray.length > 1 && (loop || currentTextIndex < textArray.length - 1)) {
      tl.to({}, { duration: pauseDuration / 1000 });

      // === PHASE 3: DELETE (hide characters smoothly from the end) ===
      tl.to(charElements, {
        opacity: 0,
        y: -12,
        duration: 0.18,
        stagger: {
          each: hideStagger,
          from: 'end',
        },
        ease: 'cubic-bezier(0.22, 1, 0.36, 1)',
        overwrite: 'auto',
      });
    }

    timelineRef.current = tl;

    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    currentTextIndex,
    isVisible,
    textArray,
    loop,
    initialDelay,
    pauseDuration,
    typingSpeed,
    deletingSpeed,
    reverseMode,
    onSentenceComplete,
  ]);

  const currentText = textArray[currentTextIndex];
  const processedChars = reverseMode
    ? currentText.split('').reverse()
    : currentText.split('');

  const isAnimating =
    charsRef.current && charsRef.current.length > 0;

  const shouldHideCursor =
    hideCursorWhileTyping && isAnimating;

  return (
    <Component
      ref={containerRef}
      className={`text-type ${className}`}
      {...props}
    >
      <span
        className="text-type__content"
        style={{ color: getCurrentTextColor() || 'inherit' }}
      >
        {processedChars.map((char, i) => (
          <span
            key={`${currentTextIndex}-${i}`}
            ref={el => {
              if (el) charsRef.current[i] = el;
            }}
            className="text-type__char"
            aria-hidden="true"
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </span>
      {showCursor && (
        <span
          ref={cursorRef}
          className={`text-type__cursor ${cursorClassName} ${shouldHideCursor ? 'text-type__cursor--hidden' : ''}`}
        >
          {cursorCharacter}
        </span>
      )}
    </Component>
  );
};

export default TextType;


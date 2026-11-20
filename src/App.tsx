import { TypingText, TypingTextCursor } from '@animate-ui/react/primitives/texts/typing';
import { useShouldReduceMotion } from '@animate-ui/react/utils/motion';
import { AnimatePresence, motion } from 'motion/react';
import { useLayoutEffect, useRef, useState } from 'react';
import { Link, Route, Routes, useLocation } from 'react-router';
import { GlyphBackground } from './components/animate-ui/backgrounds/glyph';
import {
  ThemeTogglerButton,
  ThemeTogglerButtonIcon,
  type Resolved,
  type ThemeSelection,
} from './components/animate-ui/buttons/theme-toggler';
import { HeroContactLinks } from './components/HeroContactLinks';
import { HeroCvButton } from './components/HeroCvButton';
import { AboutMe, InternshipExperience, SiteFooter, TechnicalSkills } from './components/PortfolioSections';
import { SelectedProjects } from './components/SelectedProjects';
import { ProjectPage } from './pages/ProjectPage';

const name = 'Chhun Nika';

const portraits = import.meta.glob<string>(
  ['./assets/portrait-cutout.png', './assets/portrait.{avif,jpg,jpeg,png,webp}'],
  { eager: true, import: 'default', query: '?url' },
);
const portraitUrl = portraits['./assets/portrait-cutout.png'] ?? Object.values(portraits)[0];

const themeModes: ThemeSelection[] = ['light', 'dark'];
const navItems = [
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Work' },
  { id: 'projects', label: 'Project' },
  { id: 'about', label: 'About' },
] as const;

type SectionId = typeof navItems[number]['id'];
type SectionChange = (section: SectionId | undefined) => void;

function SiteHeader({ theme, onThemeChange, activeSection }: {
  theme: Resolved;
  onThemeChange: (theme: ThemeSelection) => void;
  activeSection?: SectionId;
}) {
  const { pathname } = useLocation();
  const reduceMotion = useShouldReduceMotion();
  const selectedSection = pathname.startsWith('/projects/') ? 'projects' : activeSection;

  return (
    <motion.header className="site-header" layoutRoot>
      <div className="page-width navbar">
        <Link className="site-name" to="/#top" aria-label={`${name}, home`}>
          <span className="site-wordmark">{'<n/>'}</span>
        </Link>
        <div className="nav-controls">
          <nav className="nav-links" aria-label="Main navigation">
            {navItems.map(({ id, label }) => (
              <Link key={id} to={`/#${id}`} aria-current={selectedSection === id ? 'location' : undefined}>
                {selectedSection === id && (
                  <motion.span
                    className="nav-selection"
                    aria-hidden="true"
                    layoutId={reduceMotion ? undefined : 'nav-selection'}
                    transition={{ layout: { type: 'spring', stiffness: 420, damping: 38 } }}
                  />
                )}
                {label}
              </Link>
            ))}
          </nav>
          <ThemeTogglerButton
            type="button"
            className="theme-toggle"
            theme={theme}
            resolvedTheme={theme}
            setTheme={onThemeChange}
            modes={themeModes}
            aria-label="Dark mode"
            aria-pressed={theme === 'dark'}
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            <ThemeTogglerButtonIcon
              light={
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5" />
                </svg>
              }
              dark={
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.5 15.6A8.6 8.6 0 0 1 8.4 3.5 9 9 0 1 0 20.5 15.6Z" />
                </svg>
              }
            />
          </ThemeTogglerButton>
        </div>
      </div>
    </motion.header>
  );
}

function HomePage({ onSectionChange }: { onSectionChange: SectionChange }) {
  const { hash, key } = useLocation();
  const previousKey = useRef(key);

  useLayoutEffect(() => {
    const samePageNavigation = previousKey.current !== key;
    previousKey.current = key;

    if (!hash) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.getElementById(hash.slice(1))?.scrollIntoView({
      behavior: samePageNavigation && !reduceMotion ? 'smooth' : 'instant',
    });
  }, [hash, key]);

  useLayoutEffect(() => {
    const sections = navItems.flatMap(({ id }) => {
      const element = document.getElementById(id);
      return element ? [{ id, element }] : [];
    });
    const firstSection = sections[0]?.element;
    if (!firstSection) return;
    const lastFirst = sections.reverse();
    let frame = 0;

    const updateSelection = () => {
      frame = 0;
      const selectionLine = parseFloat(getComputedStyle(firstSection).scrollMarginTop) + 8;
      const active = lastFirst.find(({ element }) => element.getBoundingClientRect().top <= selectionLine);
      onSectionChange(active?.id);
    };

    const scheduleUpdate = () => {
      if (!frame) frame = requestAnimationFrame(updateSelection);
    };

    updateSelection();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
    };
  }, [onSectionChange]);

  return (
    <>
      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          <div className="page-width hero-content">
            <div className="hero-copy">
              <p className="hero-greeting">Hi, I’m</p>
              <h1 id="hero-title" data-name={name}>
                <TypingText className="hero-name-typing" text={name} duration={140}>
                  <TypingTextCursor
                    className="hero-name-cursor"
                    style={{ height: '0.76em', width: '0.04em', transform: 'translateY(0.04em)' }}
                  />
                </TypingText>
              </h1>
              <p className="hero-focus">Software Engineer</p>
              <p className="hero-intro">
                I take web and mobile ideas from prototype to product, designing
                the interfaces people use and building the systems that power them.
              </p>
              <div className="hero-actions">
                <Link className="hero-cta" to="/#projects">View Projects</Link>
                <HeroCvButton />
              </div>
              <HeroContactLinks />
            </div>

            <div className="portrait-card">
              <figure className="portrait-frame">
                {portraitUrl ? (
                  <img src={portraitUrl} alt={`Portrait of ${name}`} />
                ) : (
                  <span>Portrait placeholder</span>
                )}
                <figcaption className="portrait-status">Open to Fulltime Work</figcaption>
              </figure>
            </div>
          </div>
        </section>

        <TechnicalSkills />
        <InternshipExperience />
        <SelectedProjects />
        <AboutMe />
      </main>

      <SiteFooter name={name} />
    </>
  );
}

function AnimatedRoutes({ onSectionChange }: { onSectionChange: SectionChange }) {
  const location = useLocation();
  const reduceMotion = useShouldReduceMotion();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={reduceMotion ? false : { opacity: 0, y: location.hash ? 0 : 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={reduceMotion ? undefined : { opacity: 0, y: -4, transition: { duration: 0.14, ease: 'easeIn' } }}
        transition={{ duration: reduceMotion ? 0 : 0.26, ease: 'easeOut' }}
      >
        <Routes location={location}>
          <Route path="/" element={<HomePage onSectionChange={onSectionChange} />} />
          <Route path="/projects/:slug" element={<ProjectPage />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export function App() {
  const [theme, setTheme] = useState<Resolved>(() => (
    document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'
  ));
  const [activeSection, setActiveSection] = useState<SectionId>();
  const dark = theme === 'dark';

  const applyTheme = (nextTheme: ThemeSelection) => {
    if (nextTheme === 'system') return;
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    try {
      localStorage.setItem('portfolio-theme', nextTheme);
    } catch {
      // The current page can still switch themes when storage is unavailable.
    }
  };

  return (
    <div className="site-shell">
      <GlyphBackground
        className="site-glyph-background"
        glowColor={dark ? '#a9b6ff' : '#233b9e'}
        shapeColor={dark ? '#c3a5ff' : undefined}
        fontSize={13}
        clickRipples="subtle"
        trackViewport
        aria-hidden="true"
      />
      <SiteHeader theme={theme} onThemeChange={applyTheme} activeSection={activeSection} />
      <AnimatedRoutes onSectionChange={setActiveSection} />
    </div>
  );
}

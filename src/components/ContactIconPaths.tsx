import { useShouldReduceMotion } from '@animate-ui/react/utils/motion';
import { motion, type Variants } from 'motion/react';

const linkedInVariants: Variants = {
  normal: {
    opacity: 1,
    pathLength: 1,
    pathOffset: 0,
    transition: { duration: 0.4, opacity: { duration: 0.1 } },
  },
  animate: {
    opacity: [0, 1],
    pathLength: [0, 1],
    pathOffset: [1, 0],
    transition: { duration: 0.6, ease: 'linear', opacity: { duration: 0.1 } },
  },
};

const mailCheckVariants: Variants = {
  normal: { pathLength: 1, opacity: 1, transition: { duration: 0.3 } },
  animate: {
    pathLength: [0, 1],
    opacity: [0, 1],
    transition: { duration: 0.4, ease: 'easeInOut' },
  },
};

export function LinkedInIconPaths() {
  return (
    <>
      <motion.path
        d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"
        variants={linkedInVariants}
      />
      <motion.rect height="12" width="4" x="2" y="9" variants={linkedInVariants} />
      <motion.circle cx="4" cy="4" r="2" variants={linkedInVariants} />
    </>
  );
}

export function MailCheckIconPaths() {
  return (
    <>
      <path d="M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      <motion.path d="m16 19 2 2 4-4" variants={mailCheckVariants} />
    </>
  );
}

export function useContactIconAnimation() {
  const reduceMotion = useShouldReduceMotion();

  return {
    initial: 'normal',
    animate: 'normal',
    whileHover: reduceMotion ? undefined : 'animate',
    whileFocus: reduceMotion ? undefined : 'animate',
  };
}

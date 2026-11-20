import { useShouldReduceMotion } from '@animate-ui/react/utils/motion';
import { motion, type HTMLMotionProps } from 'motion/react';

export function SectionReveal(props: HTMLMotionProps<'section'>) {
  const reduceMotion = useShouldReduceMotion();

  return (
    <motion.section
      {...props}
      initial={reduceMotion ? false : { opacity: 0.55 }}
      animate={reduceMotion ? { opacity: 1 } : undefined}
      whileInView={reduceMotion ? undefined : { opacity: 1 }}
      viewport={{ once: true, margin: '0px 0px -32px 0px' }}
      transition={{ duration: reduceMotion ? 0 : 0.35, ease: 'easeOut' }}
    />
  );
}

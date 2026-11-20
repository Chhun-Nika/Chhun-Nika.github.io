import { AnimateIcon } from '@animate-ui/react/icons';
import { useShouldReduceMotion } from '@animate-ui/react/utils/motion';
import { motion } from 'motion/react';
import { Globe02 } from './animate-ui/icons/hugeicons/globe-02';
import { Play } from './animate-ui/icons/hugeicons/play';
import { GitHubIconPaths } from './GitHubIconPaths';

export function ProjectActions({ website, demo, repository, githubOrganization }: {
  website?: string;
  demo?: string;
  repository?: string;
  githubOrganization?: string;
}) {
  const reduceMotion = useShouldReduceMotion();
  const primaryUrl = demo ?? website;
  const actions = [
    ...(primaryUrl ? [{
      label: demo ? 'Watch demo' : 'Live website',
      url: primaryUrl,
      className: 'project-action hero-cta',
      icon: demo ? (
        <Play size={18} aria-hidden="true" />
      ) : (
        <Globe02 size={18} aria-hidden="true" />
      ),
      animatePath: true,
    }] : []),
    {
      label: githubOrganization ? 'GitHub (private)' : 'GitHub repository',
      url: githubOrganization ?? repository,
      className: 'project-action project-action-secondary',
      icon: (
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <GitHubIconPaths />
        </svg>
      ),
      animation: {
        initial: 'normal',
        animate: 'normal',
        whileHover: reduceMotion ? undefined : 'animate',
        whileFocus: reduceMotion ? undefined : 'animate',
      },
    },
  ];

  return (
    <div className="project-actions">
      {actions.map(({ label, url, className, icon, animation, animatePath }) => {
        const content = (
          <>
            {icon}
            {label}
          </>
        );

        if (!url) {
          return (
            <button key={label} className={className} type="button" disabled title="Link to be added">
              {content}
            </button>
          );
        }

        const link = (
          <motion.a
            key={label}
            className={className}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            {...animation}
          >
            {content}
          </motion.a>
        );

        return animatePath ? (
          <AnimateIcon key={label} animateOnHover animation="path" asChild>
            {link}
          </AnimateIcon>
        ) : link;
      })}
    </div>
  );
}

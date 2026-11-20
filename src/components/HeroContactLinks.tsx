import { motion } from 'motion/react';
import type { ReactNode } from 'react';
import { socialProfiles } from '../data/socialProfiles';
import { LinkedInIconPaths, useContactIconAnimation } from './ContactIconPaths';
import { GitHubIconPaths } from './GitHubIconPaths';

const contacts: { label: string; href: string; icon: ReactNode }[] = [
  {
    label: 'GitHub',
    href: socialProfiles.github,
    icon: <GitHubIconPaths />,
  },
  {
    label: 'LinkedIn',
    href: socialProfiles.linkedin,
    icon: <LinkedInIconPaths />,
  },
];

export function HeroContactLinks() {
  const animation = useContactIconAnimation();

  return (
    <ul className="hero-contacts" aria-label="Social profiles">
      {contacts.map(({ label, href, icon }) => {
        const content = (
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {icon}
          </svg>
        );

        return (
          <li key={label}>
            <motion.a className="hero-contact" href={href} aria-label={label} {...animation}>
              {content}
            </motion.a>
          </li>
        );
      })}
    </ul>
  );
}

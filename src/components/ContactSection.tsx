import { motion } from 'motion/react';
import { socialProfiles } from '../data/socialProfiles';
import { LinkedInIconPaths, MailCheckIconPaths, useContactIconAnimation } from './ContactIconPaths';
import { GitHubIconPaths } from './GitHubIconPaths';

function profileLabel(url: string) {
  return url.replace(/^https:\/\/(?:www\.)?/, '').replace(/\/$/, '');
}

const contacts = [
  {
    platform: 'Email',
    value: socialProfiles.email,
    href: `mailto:${socialProfiles.email}`,
    icon: <MailCheckIconPaths />,
  },
  {
    platform: 'LinkedIn',
    value: profileLabel(socialProfiles.linkedin),
    href: socialProfiles.linkedin,
    icon: <LinkedInIconPaths />,
  },
  {
    platform: 'GitHub',
    value: profileLabel(socialProfiles.github),
    href: socialProfiles.github,
    icon: <GitHubIconPaths />,
  },
];

export function ContactSection() {
  const animation = useContactIconAnimation();

  return (
    <section className="about-contact" id="contact" aria-labelledby="contact-title">
      <h3 id="contact-title">Get in touch</h3>
      <p>I’m open to work opportunities and collaborations. Feel free to email me or connect with me on LinkedIn.</p>
      <ul className="contact-links" role="list">
        {contacts.map(({ platform, value, href, icon }) => (
          <li key={platform}>
            <motion.a className="contact-card" href={href} {...animation}>
              <span className="contact-card-icon">
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  {icon}
                </svg>
              </span>
              <span className="contact-card-platform">{platform}</span>
              <span className="contact-card-value">{value}</span>
            </motion.a>
          </li>
        ))}
      </ul>
    </section>
  );
}

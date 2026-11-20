import { useId, type ReactNode } from 'react';
import { Link } from 'react-router';
import classroomPhoto from '../assets/volunteering/khoding-hero-classroom.jpg';
import participantsPhoto from '../assets/volunteering/khoding-hero-participants.jpg';
import hostFamilyPhoto from '../assets/volunteering/khoding-hero-group.jpg';
import { skillGroups } from '../data/skills';
import { ContactSection } from './ContactSection';
import { ContributionCards, type Contribution } from './ContributionCards';
import { ImageGallery } from './ImageGallery';
import { TechnologyChips } from './ProjectStack';
import { RoleBadge } from './RoleBadge';
import { SectionReveal } from './SectionReveal';

const internshipContributions: Contribution[] = [
  {
    title: 'Vendor workflows',
    icon: 'workflow',
    description: 'Built screens and supporting logic that let vendors manage products, update inventory, handle orders, and manage their stores.',
  },
  {
    title: 'UI/UX design in Figma',
    icon: 'design',
    description: 'Designed vendor-facing interfaces in Figma, working through how to organize information, forms, and actions before implementation.',
  },
  {
    title: 'Full-stack integration',
    icon: 'integration',
    description: 'Translated designs into server-rendered Django pages and connected them to the backend and database so vendor actions could read and update data.',
  },
  {
    title: 'Agile and Kanban',
    icon: 'dashboard',
    description: 'Worked in an Agile team and used a Kanban board to track design and development tasks as they moved from planned work to in progress and done.',
  },
];

const volunteerContributions: Contribution[] = [
  {
    title: 'Computer hardware basics',
    icon: 'frontend',
    description: 'Introduced students in rural communities to computer hardware and explained what the main components do.',
  },
  {
    title: 'Programming with Scratch',
    icon: 'code',
    description: 'Taught programming fundamentals with Scratch’s visual blocks and adapted the lessons to different learning levels.',
  },
  {
    title: 'Sharing my university journey',
    icon: 'team',
    description: 'Shared what studying software engineering at university has been like for me and talked about my path as a student.',
  },
];

const volunteerPhotos = [
  { src: classroomPhoto, label: 'KHoding Hero classroom session' },
  { src: participantsPhoto, label: 'KHoding Hero participants gathered outdoors' },
  { src: hostFamilyPhoto, label: 'My host family' },
];

const educationInterests: Contribution[] = [
  {
    title: 'Quantum computing',
    icon: 'atom',
    description: 'I’m exploring how qubits and interference make quantum algorithms work.',
  },
  {
    title: 'Retrieval-augmented generation (RAG) systems',
    icon: 'database',
    description: 'I’m interested in how language models use retrieved documents to ground their answers.',
  },
];

function ExperienceCard({ title, organization, dates, role, summary, contributions, tools, nested, children }: {
  title: string;
  organization: string;
  dates: string;
  role: string;
  summary?: ReactNode;
  contributions: Contribution[];
  tools?: string[];
  nested?: boolean;
  children?: ReactNode;
}) {
  const contributionId = useId();
  const Title = nested ? 'h4' : 'h3';
  const ContributionHeading = nested ? 'h5' : 'h4';

  return (
    <article className="experience-entry">
      <header>
        <div>
          <Title>{title}</Title>
          <p>{organization}</p>
        </div>
        <p>{dates}</p>
      </header>
      <RoleBadge role={role} />
      {summary && <p>{summary}</p>}
      {tools && <TechnologyChips tools={tools} />}
      <section className="experience-contribution" aria-labelledby={contributionId}>
        <ContributionHeading id={contributionId}>My contribution</ContributionHeading>
        <ContributionCards contributions={contributions} titleAs={nested ? 'h6' : 'h5'} />
      </section>
      {children}
    </article>
  );
}

export function TechnicalSkills() {
  return (
    <SectionReveal className="page-width portfolio-section" id="skills" aria-labelledby="skills-title">
      <h2 id="skills-title">Technical Skills</h2>
      <ul className="skill-groups" role="list">
        {skillGroups.map(({ title, skills }) => (
          <li key={title}>
            <h3>{title}</h3>
            <ul className="skill-tags" role="list">
              {skills.map((skill) => <li key={skill}>{skill}</li>)}
            </ul>
          </li>
        ))}
      </ul>
    </SectionReveal>
  );
}

export function InternshipExperience() {
  return (
    <SectionReveal className="page-width portfolio-section" id="experience" aria-labelledby="experience-title">
      <h2 id="experience-title">Internship Experience</h2>
      <ExperienceCard
        title="Kasemall"
        organization="KASEGRO Co., Ltd."
        dates="April – July 2026"
        role="Web developer intern"
        summary="I developed full-stack features for Kasemall, a server-rendered e-commerce platform for multiple vendors."
        tools={['Python', 'Django', 'Figma']}
        contributions={internshipContributions}
      />
    </SectionReveal>
  );
}

function VolunteerExperience() {
  return (
    <section id="volunteering" aria-labelledby="volunteering-title">
      <h3 id="volunteering-title">Volunteering</h3>
      <ExperienceCard
        title="KHoding Hero"
        organization="Cambodia Academy of Digital Technology (CADT)"
        dates="August – September 2024"
        role="Volunteer Instructor"
        summary={
          <>
            I spent a month as a KHoding Hero volunteer instructor at Spean Tnout High School in{' '}
            <strong>Chi Kraeng District</strong>, Siem Reap. Teaching teenagers helped me get better at
            explaining technical ideas and adapting to different learning levels. Living with a host
            family alongside my teammates gave me a firsthand look at daily life in the community.
          </>
        }
        contributions={volunteerContributions}
        nested
      >
        <ImageGallery title="Photos" images={volunteerPhotos} headingAs="h5" />
      </ExperienceCard>
    </section>
  );
}

export function AboutMe() {
  return (
    <SectionReveal className="page-width portfolio-section" id="about" aria-labelledby="about-title">
      <h2 id="about-title">About Me</h2>
      <div className="about-sections">
        <section aria-labelledby="education-title">
          <h3 id="education-title">Education</h3>
          <article className="experience-entry">
            <header>
              <div className="education-heading">
                <p><strong>Cambodia Academy of Digital Technology (CADT)</strong></p>
                <h4>Bachelor of Computer Science</h4>
                <RoleBadge role="Specialization in Software Engineering" icon="code" />
              </div>
              <p>February 2024 – Present</p>
            </header>
            <section className="education-interests" aria-labelledby="education-interests-title">
              <h5 id="education-interests-title">Current interests</h5>
              <ContributionCards contributions={educationInterests} titleAs="h6" />
            </section>
          </article>
        </section>
        <VolunteerExperience />
        <ContactSection />
      </div>
    </SectionReveal>
  );
}

export function SiteFooter({ name }: { name: string }) {
  return (
    <footer className="page-width site-footer">
      <p>© 2026 {name}</p>
      <Link className="back-to-top" to="/#top">
        Back to top
        <svg aria-hidden="true" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 19V5m-6 6 6-6 6 6" />
        </svg>
      </Link>
    </footer>
  );
}

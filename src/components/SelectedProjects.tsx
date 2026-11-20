import { Link } from 'react-router';
import { AnimateIcon } from '@animate-ui/react/icons';
import { getProjectCoverScreens, getProjectImage, projects } from '../data/projects';
import { ArrowRight } from './animate-ui/icons/arrow-right';
import { ProjectScreenshot } from './ProjectScreenshot';
import { RoleBadge } from './RoleBadge';
import { SectionReveal } from './SectionReveal';

export function SelectedProjects() {
  return (
    <SectionReveal className="page-width projects-preview" id="projects" aria-labelledby="projects-title">
      <h2 id="projects-title">Selected Projects</h2>
      <ul className="project-grid" role="list">
        {projects.map(({ slug, title, dateRange, summary, role, coverScreens }) => {
          const cover = getProjectImage(slug);
          const screens = getProjectCoverScreens(coverScreens);

          return (
            <li key={slug}>
              <AnimateIcon animateOnHover animation="path" asChild>
                <Link
                  className="project-card"
                  to={`/projects/${slug}`}
                  aria-labelledby={`details-${slug} title-${slug}`}
                  aria-describedby={`date-${slug} summary-${slug} role-${slug}`}
                >
                  <div className="project-card-media" data-project-cover={slug}>
                    {screens.length ? (
                      screens.map(({ src, label }) => (
                        <ProjectScreenshot key={src} portrait src={src} alt={label} loading="lazy" decoding="async" />
                      ))
                    ) : cover ? (
                      <img src={cover} alt={`${title} project screenshot`} loading="lazy" decoding="async" />
                    ) : (
                      <span>Project image to be added</span>
                    )}
                  </div>
                  <div className="project-card-content">
                    <p className="project-date" id={`date-${slug}`}>{dateRange ?? 'Dates to be added'}</p>
                    <h3 id={`title-${slug}`}>{title}</h3>
                    <p className="project-summary" id={`summary-${slug}`}>{summary}</p>
                    <div className="project-card-footer">
                      <RoleBadge role={role} id={`role-${slug}`} />
                      <span className="project-card-details" id={`details-${slug}`}>
                        <span>View details</span>
                        <ArrowRight size={16} aria-hidden="true" />
                      </span>
                    </div>
                  </div>
                </Link>
              </AnimateIcon>
            </li>
          );
        })}
      </ul>
    </SectionReveal>
  );
}

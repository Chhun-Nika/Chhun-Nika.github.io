import { AnimateIcon } from '@animate-ui/react/icons';
import { useLayoutEffect, useRef } from 'react';
import { Link, useParams } from 'react-router';
import { ArrowLeft } from '../components/animate-ui/icons/arrow-left';
import { ContributionCards } from '../components/ContributionCards';
import { ProjectActions } from '../components/ProjectActions';
import { ImageGallery } from '../components/ImageGallery';
import { ProjectScreenshot } from '../components/ProjectScreenshot';
import { ProjectStack } from '../components/ProjectStack';
import { getProjectCoverScreens, getProjectImage, projects } from '../data/projects';

export function ProjectPage() {
  const { slug } = useParams();
  const project = projects.find((item) => item.slug === slug);
  const cover = project && getProjectImage(project.slug);
  const screens = getProjectCoverScreens(project?.coverScreens);
  const title = project?.title ?? 'Project not found';
  const headingRef = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    const previousTitle = document.title;
    document.title = `${title} | ${previousTitle}`;
    window.scrollTo(0, 0);
    headingRef.current?.focus({ preventScroll: true });

    return () => {
      document.title = previousTitle;
    };
  }, [title]);

  return (
    <main className="page-width project-detail">
      <AnimateIcon animateOnHover animation="path" asChild>
        <Link className="project-link project-back-link" to="/#projects" aria-label="Back to projects">
          <ArrowLeft size={18} aria-hidden="true" />
          Back
        </Link>
      </AnimateIcon>
      <header className="project-detail-header">
        {project && <p className="project-meta">{project.category}</p>}
        <h1 ref={headingRef} tabIndex={-1}>{title}</h1>
        {project && (
          <>
            <p className="project-tagline">{project.summary}</p>
            <ProjectActions
              website={project.website}
              demo={project.demo}
              repository={project.repository}
              githubOrganization={project.githubOrganization}
            />
            <dl className="project-facts">
              <div>
                <dt>Role</dt>
                <dd>{project.role}</dd>
              </div>
              <div>
                <dt>Date</dt>
                <dd>{project.dateRange ?? 'Dates to be added'}</dd>
              </div>
              <div>
                <dt>Team</dt>
                <dd>
                  {project.team
                    ? `${project.team.size} team member${project.team.size === 1 ? '' : 's'}`
                    : 'Team members to be added'}
                </dd>
                {project.team?.members?.length ? (
                  <dd>{project.team.members.join(', ')}</dd>
                ) : null}
              </div>
            </dl>
          </>
        )}
      </header>
      {project ? (
        <div className="project-detail-content">
          {screens.length || cover ? (
            <div className="project-detail-media" data-project-cover={project.slug}>
              {screens.length ? (
                screens.map(({ src, label }) => (
                  <ProjectScreenshot key={src} className="project-detail-cover" portrait src={src} alt={label} />
                ))
              ) : (
                <ProjectScreenshot
                  className="project-detail-cover"
                  portrait={project.screenshots?.orientation === 'portrait'}
                  src={cover}
                  alt={`${title} project screenshot`}
                />
              )}
            </div>
          ) : (
            <div className="project-image-placeholder">Project cover to be added</div>
          )}
          <div>
            <section aria-labelledby="project-overview">
              <h2 id="project-overview">Project overview</h2>
              <p>{project.overview}</p>
            </section>
            <ProjectStack stack={project.stack} />
          </div>
          <section aria-labelledby="project-contribution">
            <h2 id="project-contribution">My contribution</h2>
            <ContributionCards contributions={project.contribution} />
          </section>
          {project.screenshots?.images.length ? (
            <ImageGallery
              title="Screenshots"
              introduction={project.screenshots.introduction}
              orientation={project.screenshots.orientation}
              images={project.screenshots.images.map(({ asset, ...image }) => ({
                ...image,
                src: getProjectImage(asset),
              }))}
            />
          ) : null}
          <footer className="project-detail-footer">
            <span>{project.category} · {project.title}</span>
            <Link className="project-link" to="/#projects">Back to all projects</Link>
          </footer>
        </div>
      ) : (
        <p className="project-detail-empty">This project page could not be found.</p>
      )}
    </main>
  );
}

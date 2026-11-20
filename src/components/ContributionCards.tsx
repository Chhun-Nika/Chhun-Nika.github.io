import { ContributionIcon, type ContributionIconName } from './ContributionIcon';

export type Contribution = {
  title: string;
  description: string;
  icon: ContributionIconName;
};

export function ContributionCards({ contributions, titleAs: Title = 'h3' }: {
  contributions: Contribution[];
  titleAs?: 'h3' | 'h5' | 'h6';
}) {
  return (
    <div className="project-contribution-grid">
      {contributions.map(({ title, description, icon }) => (
        <article key={title}>
          <ContributionIcon name={icon} />
          <Title className="contribution-card-title">{title}</Title>
          <p>{description}</p>
        </article>
      ))}
    </div>
  );
}

export function RoleBadge({ role, id, icon = 'person' }: {
  role: string;
  id?: string;
  icon?: 'person' | 'code';
}) {
  return (
    <p className="project-card-role" id={id}>
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {icon === 'code' ? (
          <path d="m8 6-6 6 6 6m8-12 6 6-6 6m-2-14-4 16" />
        ) : (
          <>
            <circle cx="12" cy="8" r="3.5" />
            <path d="M5 20v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1" />
          </>
        )}
      </svg>
      <span>{role}</span>
    </p>
  );
}

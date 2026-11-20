const paths = {
  team: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2m20 0v-2a4 4 0 0 0-3-3.9M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm8-7.9a4 4 0 0 1 0 7.8',
  design: 'M3 4h18v16H3zM3 9h18m-12 0v11',
  code: 'm8 6-6 6 6 6m8-12 6 6-6 6m-3-14-2 16',
  mobile: 'M8 2h8a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm3 17h2',
  reminders: 'M3 11h18M8 3v4m8-4v4M5 5h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Zm5 11 2 2 3-3',
  workflow: 'M3 3h5v5H3zm13 0h5v5h-5zM9.5 16h5v5h-5zM5.5 8v3h13V8M12 11v5',
  dashboard: 'M3 3h18v18H3zM7 17v-3m5 3v-7m5 7V7',
  frontend: 'M3 4h18v13H3zm9 13v4m-4 0h8',
  server: 'M3 4h18v6H3zm0 10h18v6H3zm4-7h.01M7 17h.01',
  database: 'M20 5a8 3 0 1 1-16 0 8 3 0 1 1 16 0ZM4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3',
  atom: 'M12 12h.01M18.36 5.64c1.56 1.56-.02 5.68-3.54 9.2s-7.64 5.1-9.2 3.54.02-5.68 3.54-9.2 7.64-5.1 9.2-3.54Zm0 12.72c-1.56 1.56-5.68-.02-9.2-3.54s-5.1-7.64-3.54-9.2 5.68.02 9.2 3.54 5.1 7.64 3.54 9.2Z',
  integration: 'M10 7l3-3a5 5 0 0 1 7 7l-3 3m-3 3-3 3a5 5 0 0 1-7-7l3-3m2 5 6-6',
};

export type ContributionIconName = keyof typeof paths;

export function ContributionIcon({ name }: { name: ContributionIconName }) {
  return (
    <svg
      className="project-contribution-icon"
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={paths[name]} />
    </svg>
  );
}

import { MotionGrid, MotionGridCells, type Frames } from '@animate-ui/react/primitives/motion-grid';
import { useShouldReduceMotion } from '@animate-ui/react/utils/motion';

const frames: Frames = [
  [[1, 1]],
  [[0, 1], [1, 0], [1, 2], [2, 1]],
  [[0, 0], [0, 2], [2, 0], [2, 2]],
  [],
];

const cvFiles = import.meta.glob<string>(
  ['../assets/Chhun_Nika-CV.pdf', '../assets/cv.pdf'],
  { eager: true, import: 'default', query: '?url' },
);
const cvUrl = cvFiles['../assets/Chhun_Nika-CV.pdf'] ?? cvFiles['../assets/cv.pdf'];

export function HeroCvButton() {
  const reduceMotion = useShouldReduceMotion();

  return (
    <div className="hero-cv-action">
      {cvUrl ? (
        <a className="hero-cta hero-cta-secondary" href={cvUrl} download="Chhun-Nika-CV.pdf">
          Download CV
        </a>
      ) : (
        <button className="hero-cta hero-cta-secondary" type="button" title="CV coming soon" disabled>
          Download CV
        </button>
      )}
      <MotionGrid
        gridSize={[3, 3]}
        frames={frames}
        animate={!reduceMotion}
        className="hero-cv-grid"
        aria-hidden="true"
      >
        <MotionGridCells className="hero-cv-grid-dot" />
      </MotionGrid>
    </div>
  );
}

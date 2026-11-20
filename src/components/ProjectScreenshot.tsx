import type { ComponentProps } from 'react';
import type { ScreenshotCrop } from '../data/projects';

export function ProjectScreenshot({ portrait, crop, ...props }: ComponentProps<'img'> & {
  portrait?: boolean;
  crop?: ScreenshotCrop;
}) {
  if (crop) {
    const { x, y, width, height, sourceWidth, sourceHeight } = crop;

    return (
      <span className="project-web-crop" style={{ aspectRatio: `${width} / ${height}` }}>
        <img
          {...props}
          style={{
            ...props.style,
            width: `${sourceWidth / width * 100}%`,
            height: `${sourceHeight / height * 100}%`,
            left: `${-x / width * 100}%`,
            top: `${-y / height * 100}%`,
          }}
        />
      </span>
    );
  }

  const image = <img {...props} />;

  return portrait ? <span className="project-phone-screen">{image}</span> : image;
}

import { useId, useRef, useState } from 'react';
import type { ScreenshotCrop } from '../data/projects';
import { ProjectScreenshot } from './ProjectScreenshot';

export function ImageGallery({ title, introduction, images, orientation, headingAs: Heading = 'h2' }: {
  title: string;
  introduction?: string;
  images: { src?: string; label: string; description?: string; crop?: ScreenshotCrop }[];
  orientation?: 'portrait';
  headingAs?: 'h2' | 'h5';
}) {
  const headingId = useId();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [preview, setPreview] = useState<{ src: string; label: string; crop?: ScreenshotCrop }>();

  return (
    <section aria-labelledby={headingId}>
      <Heading id={headingId}>{title}</Heading>
      {introduction && <p className="project-gallery-intro">{introduction}</p>}
      <div className="project-gallery" data-orientation={orientation}>
        {images.map(({ src, label, description, crop }) => (
          <figure key={label}>
            {src ? (
              <button
                className="project-gallery-image"
                type="button"
                aria-label={`Enlarge ${label}`}
                onClick={() => {
                  setPreview({ src, label, crop });
                  dialogRef.current?.showModal();
                }}
              >
                <ProjectScreenshot portrait={orientation === 'portrait'} crop={crop} src={src} alt={label} loading="lazy" />
              </button>
            ) : (
              <div className="project-image-placeholder">Image to be added</div>
            )}
            <figcaption>
              <strong>{label}</strong>
              {description && <p>{description}</p>}
            </figcaption>
          </figure>
        ))}
      </div>
      <dialog
        ref={dialogRef}
        className="project-gallery-dialog"
        aria-label="Image preview"
        onClick={(event) => {
          if (event.target === event.currentTarget) event.currentTarget.close();
        }}
      >
        <button type="button" onClick={() => dialogRef.current?.close()}>Close</button>
        {preview && (
          <ProjectScreenshot
            portrait={orientation === 'portrait'}
            crop={preview.crop}
            src={preview.src}
            alt={preview.label}
          />
        )}
      </dialog>
    </section>
  );
}

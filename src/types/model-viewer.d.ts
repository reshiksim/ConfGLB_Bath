import type { DetailedHTMLProps, HTMLAttributes } from 'react';

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': DetailedHTMLProps<
        HTMLAttributes<HTMLElement> & {
          src?: string;
          alt?: string;
          ar?: boolean | string;
          'ar-modes'?: string;
          'camera-controls'?: boolean | string;
          'auto-rotate'?: boolean | string;
          'touch-action'?: string;
          'environment-image'?: string;
          exposure?: string | number;
          'shadow-intensity'?: string | number;
          'shadow-softness'?: string | number;
          'tone-mapping'?: string;
          'camera-orbit'?: string;
          'camera-target'?: string;
          'field-of-view'?: string;
          poster?: string;
          reveal?: string;
        },
        HTMLElement
      >;
    }
  }
}

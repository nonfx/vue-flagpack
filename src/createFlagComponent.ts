import { defineComponent, h } from 'vue';
import type { FlagSize } from './sizeConfig';
import { SIZE_CONFIG } from './sizeConfig';

export interface FlagComponentProps {
  hasBorder?: boolean;
  hasBorderRadius?: boolean;
  hasDropShadow?: boolean;
  gradient?: 'top-down' | 'real-linear' | 'real-circular';
  className?: string;
}

/**
 * Creates a Vue component for a specific flag
 * @param code - The country code (e.g., 'NL', 'US')
 * @param size - The flag size ('small', 'medium', 'large')
 * @param svgContent - The raw SVG string content
 * @returns A Vue component
 */
export function createFlagComponent(
  code: string,
  size: FlagSize,
  svgContent: string
) {
  const config = SIZE_CONFIG[size];
  const componentName = `Flag${code}${size.charAt(0).toUpperCase() + size.slice(1)}`;

  return defineComponent({
    name: componentName,
    props: {
      hasBorder: {
        type: Boolean,
        default: true,
      },
      hasBorderRadius: {
        type: Boolean,
        default: true,
      },
      hasDropShadow: {
        type: Boolean,
        default: false,
      },
      gradient: {
        type: String as () => 'top-down' | 'real-linear' | 'real-circular' | undefined,
        default: undefined,
      },
      className: {
        type: String,
        default: '',
      },
    },
    setup(props) {
      return () => {
        const styles: Record<string, string> = {
          display: 'inline-block',
          overflow: 'hidden',
          position: 'relative',
          boxSizing: 'border-box',
          width: `${config.width}px`,
          height: `${config.height}px`,
        };

        if (props.hasBorderRadius) {
          styles.borderRadius = `${config.borderRadius}px`;
        }

        if (props.hasDropShadow) {
          styles.boxShadow = config.dropShadow;
        }

        // Create inner wrapper for SVG
        const svgWrapper = h('div', {
          style: {
            width: '100%',
            height: '100%',
            display: 'block',
          },
          innerHTML: svgContent,
        });

        // Create pseudo-element effects using absolute positioned divs
        const overlays: any[] = [];

        // Border overlay
        if (props.hasBorder) {
          overlays.push(
            h('div', {
              style: {
                content: '\'\'',
                width: '100%',
                height: '100%',
                position: 'absolute',
                top: '0',
                left: '0',
                display: 'block',
                mixBlendMode: 'overlay',
                border: '1px solid rgba(0, 0, 0, 0.5)',
                boxSizing: 'border-box',
                pointerEvents: 'none',
                borderRadius: props.hasBorderRadius ? `${config.borderRadius}px` : '0',
              },
            })
          );
        }

        // Gradient overlays
        if (props.gradient) {
          let gradientStyle = '';
          if (props.gradient === 'top-down') {
            gradientStyle = 'linear-gradient(0deg, rgba(0,0,0,0.30) 2%, rgba(255,255,255,0.70) 100%)';
          } else if (props.gradient === 'real-linear') {
            gradientStyle = 'linear-gradient(45deg, rgba(0,0,0,0.20) 0%, rgba(39,39,39,0.22) 11%, rgba(255,255,255,0.30) 27%, rgba(0,0,0,0.24) 41%, rgba(0,0,0,0.55) 52%, rgba(255,255,255,0.26) 63%, rgba(0,0,0,0.27) 74%, rgba(255,255,255,0.30) 100%)';
          } else if (props.gradient === 'real-circular') {
            gradientStyle = 'radial-gradient(50% 36%, rgba(255,255,255,0.30) 0%, rgba(0,0,0,0.24) 11%, rgba(0,0,0,0.55) 17%, rgba(255,255,255,0.26) 22%, rgba(0,0,0,0.17) 27%, rgba(255,255,255,0.28) 31%, rgba(255,255,255,0.00) 37%) center calc(50% - 8px) / 600% 600%, radial-gradient(50% 123%, rgba(255,255,255,0.30) 25%, rgba(0,0,0,0.24) 48%, rgba(0,0,0,0.55) 61%, rgba(255,255,255,0.26) 72%, rgba(0,0,0,0.17) 80%, rgba(255,255,255,0.28) 88%, rgba(255,255,255,0.30) 100%) center calc(50% - 8px) / 600% 600%';
          }

          overlays.push(
            h('div', {
              style: {
                content: '\'\'',
                width: '100%',
                height: '100%',
                position: 'absolute',
                top: '0',
                left: '0',
                display: 'block',
                mixBlendMode: 'overlay',
                boxSizing: 'border-box',
                backgroundImage: gradientStyle,
                pointerEvents: 'none',
                borderRadius: props.hasBorderRadius ? `${config.borderRadius}px` : '0',
              },
            })
          );
        }

        return h(
          'div',
          {
            class: ['vue-flagpack', props.className].filter(Boolean),
            style: styles,
          },
          [svgWrapper, ...overlays]
        );
      };
    },
  });
}

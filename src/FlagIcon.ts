import { type FunctionalComponent, h } from 'vue';
import { SIZE_CONFIG } from './sizeConfig';
import type { FlagProps } from './types';
import type { FlagIconProps } from './createFlagComponent';

const FlagIcon: FunctionalComponent<FlagProps & FlagIconProps> = ({
  svgContent,
  code,
  size = 'medium',
  hasBorder = true,
  hasBorderRadius = true,
  hasDropShadow = false,
  gradient,
  className = '',
  ...props
}) => {
  const config = SIZE_CONFIG[size];

  const styles: Record<string, string> = {
    display: 'inline-block',
    overflow: 'hidden',
    position: 'relative',
    boxSizing: 'border-box',
    width: `${config.width}px`,
    height: `${config.height}px`,
  };

  if (hasBorderRadius) {
    styles.borderRadius = `${config.borderRadius}px`;
  }

  if (hasDropShadow) {
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
  if (hasBorder) {
    overlays.push(
      h('div', {
        style: {
          content: "''",
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
          borderRadius: hasBorderRadius ? `${config.borderRadius}px` : '0',
        },
      })
    );
  }

  // Gradient overlays
  if (gradient) {
    let gradientStyle = '';
    if (gradient === 'top-down') {
      gradientStyle =
        'linear-gradient(0deg, rgba(0,0,0,0.30) 2%, rgba(255,255,255,0.70) 100%)';
    } else if (gradient === 'real-linear') {
      gradientStyle =
        'linear-gradient(45deg, rgba(0,0,0,0.20) 0%, rgba(39,39,39,0.22) 11%, rgba(255,255,255,0.30) 27%, rgba(0,0,0,0.24) 41%, rgba(0,0,0,0.55) 52%, rgba(255,255,255,0.26) 63%, rgba(0,0,0,0.27) 74%, rgba(255,255,255,0.30) 100%)';
    } else if (gradient === 'real-circular') {
      gradientStyle =
        'radial-gradient(50% 36%, rgba(255,255,255,0.30) 0%, rgba(0,0,0,0.24) 11%, rgba(0,0,0,0.55) 17%, rgba(255,255,255,0.26) 22%, rgba(0,0,0,0.17) 27%, rgba(255,255,255,0.28) 31%, rgba(255,255,255,0.00) 37%) center calc(50% - 8px) / 600% 600%, radial-gradient(50% 123%, rgba(255,255,255,0.30) 25%, rgba(0,0,0,0.24) 48%, rgba(0,0,0,0.55) 61%, rgba(255,255,255,0.26) 72%, rgba(0,0,0,0.17) 80%, rgba(255,255,255,0.28) 88%, rgba(255,255,255,0.30) 100%) center calc(50% - 8px) / 600% 600%';
    }

    overlays.push(
      h('div', {
        style: {
          content: "''",
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
          borderRadius: hasBorderRadius ? `${config.borderRadius}px` : '0',
        },
      })
    );
  }

  return h(
    'div',
    {
      ...props,
      class: [
        'vue-flagpack',
        `vue-flagpack-${code.toLowerCase()}`,
        `vue-flagpack-${size}`,
        className,
      ].filter(Boolean),
      style: styles,
    },
    [svgWrapper, ...overlays]
  );
};

export default FlagIcon;

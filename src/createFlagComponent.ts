import { h } from 'vue';
import type { FunctionalComponent } from 'vue';
import FlagIcon from './FlagIcon';
import type { FlagProps } from './types';

export interface FlagComponentProps {
  hasBorder?: boolean;
  hasBorderRadius?: boolean;
  hasDropShadow?: boolean;
  gradient?: 'top-down' | 'real-linear' | 'real-circular';
  className?: string;
}

export interface FlagIconProps {
  svgContent: string;
  code: string;
  size: 'small' | 'medium' | 'large';
}

/**
 * Create a flag component (similar to lucide's createLucideIcon)
 * @param {string} code - The country code
 * @param {string} size - The flag size
 * @param {string} svgContent - The SVG content
 * @returns {FunctionalComponent} FlagComponent
 */
const createFlagComponent = (
  code: string,
  size: 'small' | 'medium' | 'large',
  svgContent: string
): FunctionalComponent<FlagProps> => (props, { slots, attrs }) =>
  h(
    FlagIcon,
    {
      ...attrs,
      ...props,
      svgContent,
      code,
      size,
    },
    slots
  );

export default createFlagComponent;

/**
 * Type definitions for vue-flagpack
 */

export type { FlagSize } from './sizeConfig';
export type { FlagComponentProps } from './createFlagComponent';

export interface FlagProps {
  size?: 'small' | 'medium' | 'large';
  code?: string;
  hasDropShadow?: boolean;
  hasBorder?: boolean;
  hasBorderRadius?: boolean;
  gradient?: 'top-down' | 'real-linear' | 'real-circular';
  className?: string;
}

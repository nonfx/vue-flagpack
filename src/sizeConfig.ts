/**
 * Flag size configuration
 * Maps size names to their viewBox and dimension attributes
 */

export const SIZE_CONFIG = {
  small: {
    viewBox: '0 0 16 12',
    width: 16,
    height: 12,
    borderRadius: 1,
    dropShadow: '0 0 1px 0.5px rgba(0,0,0,0.10)',
  },
  medium: {
    viewBox: '0 0 20 15',
    width: 20,
    height: 15,
    borderRadius: 1.5,
    dropShadow: '0 1px 2px 0 rgba(0,0,0,0.10)',
  },
  large: {
    viewBox: '0 0 32 24',
    width: 32,
    height: 24,
    borderRadius: 2,
    dropShadow: '0 2px 3px 0 rgba(0,0,0,0.10)',
  },
} as const;

export type FlagSize = keyof typeof SIZE_CONFIG;

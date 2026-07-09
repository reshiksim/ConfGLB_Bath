import { DISPLAY_BLACK } from './materials';

export const HARDWARE_FINISHES = {
  chrome: {
    label: 'Chrome',
    color: '#d8d8d8',
    metallic: 1,
    roughness: 0.08,
  },
  black: {
    label: 'Black',
    color: DISPLAY_BLACK,
    metallic: 0,
    roughness: 0.28,
  },
  white: {
    label: 'White',
    color: '#f2f2f0',
    metallic: 0,
    roughness: 0.22,
  },
  gold: {
    label: 'Gold',
    color: '#d4af37',
    metallic: 1,
    roughness: 0.14,
  },
} as const;

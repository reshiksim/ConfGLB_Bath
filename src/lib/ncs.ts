import ncsColors from '../data/ncs-colors.json';
import type { NcsColor, SelectedOuterColor } from '../types/configuration';

const NCS_PATTERN = /^S\s\d{4}-(N|[YRGB](?:\d{2}[YRGB])?)$/i;

const NCS_INDEX = new Map(
  (ncsColors as NcsColor[]).map((color) => [color.code.toUpperCase(), color]),
);

export function normalizeNcsCode(input: string): string {
  const trimmed = input.trim().toUpperCase();

  if (!trimmed) {
    return '';
  }

  const withoutPrefix = trimmed
    .replace(/^NCS\s*/i, '')
    .replace(/^S\s*/i, '')
    .replace(/\s+/g, '');

  return `S ${withoutPrefix}`;
}

export function isValidNcsFormat(input: string): boolean {
  return NCS_PATTERN.test(normalizeNcsCode(input));
}

export function findNcsColor(input: string): NcsColor | null {
  const normalized = normalizeNcsCode(input);

  if (!isValidNcsFormat(normalized)) {
    return null;
  }

  return NCS_INDEX.get(normalized.toUpperCase()) ?? null;
}

export function ncsToSelection(input: string): SelectedOuterColor {
  const normalized = normalizeNcsCode(input);
  const match = findNcsColor(normalized);

  return {
    type: 'custom_ncs',
    code: normalized,
    hex: match?.hex ?? null,
    label: match ? `Custom NCS ${normalized}` : `Custom NCS ${normalized}`,
    previewIsApproximate: true,
  };
}

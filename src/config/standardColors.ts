import type { StandardColor } from '../types/configuration';

const createStandardColor = ({
  label,
  code,
  hex,
  group,
}: {
  label: string;
  code: string;
  hex: string;
  group: string;
}): StandardColor => ({
  label,
  code,
  hex,
  group,
  type: 'standard',
});

export const STANDARD_COLORS = [
  createStandardColor({
    label: 'Cloud White',
    code: 'S 0500-N',
    hex: '#FCFCFB',
    group: 'Warm Whites',
  }),
  createStandardColor({
    label: 'Soft Ivory',
    code: 'S 0502-Y',
    hex: '#FFFDF2',
    group: 'Warm Whites',
  }),
  createStandardColor({
    label: 'Stone White',
    code: 'S 1002-Y',
    hex: '#EAE8DB',
    group: 'Warm Whites',
  }),

  createStandardColor({
    label: 'Light Sand',
    code: 'S 1505-Y50R',
    hex: '#E9DBCB',
    group: 'Sand / Greige',
  }),
  createStandardColor({
    label: 'Warm Greige',
    code: 'S 2005-Y50R',
    hex: '#D1C3B7',
    group: 'Sand / Greige',
  }),
  createStandardColor({
    label: 'Mushroom Taupe',
    code: 'S 3005-Y50R',
    hex: '#A59B8D',
    group: 'Sand / Greige',
  }),

  createStandardColor({
    label: 'Light Mocha',
    code: 'S 3010-Y50R',
    hex: '#B69A7E',
    group: 'Mocha / Taupe',
  }),
  createStandardColor({
    label: 'Mocha Taupe',
    code: 'S 4010-Y50R',
    hex: '#947B66',
    group: 'Mocha / Taupe',
  }),
  createStandardColor({
    label: 'Cocoa Brown',
    code: 'S 5020-Y50R',
    hex: '#85583F',
    group: 'Mocha / Taupe',
  }),

  createStandardColor({
    label: 'Soft Clay',
    code: 'S 3020-Y60R',
    hex: '#B78A6E',
    group: 'Clay / Terracotta',
  }),
  createStandardColor({
    label: 'Terracotta',
    code: 'S 4030-Y60R',
    hex: '#934D33',
    group: 'Clay / Terracotta',
  }),
  createStandardColor({
    label: 'Burnt Clay',
    code: 'S 5030-Y70R',
    hex: '#81402F',
    group: 'Clay / Terracotta',
  }),

  createStandardColor({
    label: 'Soft Sage',
    code: 'S 2010-G30Y',
    hex: '#BCC8AD',
    group: 'Sage / Green',
  }),
  createStandardColor({
    label: 'Olive Grey',
    code: 'S 3010-G30Y',
    hex: '#A3AD91',
    group: 'Sage / Green',
  }),
  createStandardColor({
    label: 'Forest Green',
    code: 'S 5020-G30Y',
    hex: '#4F6C43',
    group: 'Sage / Green',
  }),

  createStandardColor({
    label: 'Dusty Blue',
    code: 'S 3010-B10G',
    hex: '#869799',
    group: 'Blue / Teal',
  }),
  createStandardColor({
    label: 'Blue Grey',
    code: 'S 4020-B10G',
    hex: '#587B82',
    group: 'Blue / Teal',
  }),
  createStandardColor({
    label: 'Deep Teal',
    code: 'S 5020-B30G',
    hex: '#436865',
    group: 'Blue / Teal',
  }),

  createStandardColor({
    label: 'Soft Graphite',
    code: 'S 7000-N',
    hex: '#60605E',
    group: 'Graphite / Black',
  }),
  createStandardColor({
    label: 'Charcoal',
    code: 'S 8000-N',
    hex: '#434241',
    group: 'Graphite / Black',
  }),
  createStandardColor({
    label: 'Black',
    code: 'S 9000-N',
    hex: '#111410',
    group: 'Graphite / Black',
  }),
] as const satisfies readonly StandardColor[];

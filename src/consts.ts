import { withBase } from './utils/base';

const now = new Date();
const year = now.getFullYear();
const startYear = now.getMonth() >= 7 ? year : year - 1;

export const A_S = `${startYear}/${startYear + 1}`;
export const SITE_NAME = 'Marini didattica';
export const SITE_DESCRIPTION = `Dispense e materiale per lezioni in classe e progetti relativi all'a.s. ${A_S}`;

/** A top-bar section, one per class/project. */
export interface Section {
  /** URL segment, e.g. "esempio" -> /esempio (with the deployment base). */
  slug: string;
  /** Label shown in the navigation bar. */
  label: string;
}

/**
 * Sections shown in the top bar. Add an entry here and create the matching
 * page in `src/pages/<slug>.astro` (see `esempio.astro`).
 */
export const SECTIONS: Section[] = [
  { slug: 'prime', label: 'Prime' },
  { slug: 'seconde', label: 'Seconde' },
  { slug: 'olimpiadi', label: 'Olimpiadi' },
];

/** Navigation links shared by every page. */
export const navLinks = [
  { href: withBase('/'), label: 'Home' },
  ...SECTIONS.map((section) => ({
    href: withBase(`/${section.slug}`),
    label: section.label,
  })),
];

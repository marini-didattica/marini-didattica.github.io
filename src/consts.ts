import { withBase } from "./utils/base";

const now = new Date();
const year = now.getFullYear();
const startYear = now.getMonth() >= 7 ? year : year - 1;

export const A_S = `${startYear}/${startYear + 1}`;
export const SITE_NAME = "Marini didattica";
export const SITE_DESCRIPTION = `Dispense e materiale per lezioni in classe e progetti relativi all'a.s. ${A_S}`;

/** Project site that hosts and browses all the material. */
export const MATERIAL_URL = "https://marini-didattica.github.io/materiale/";

/** Public browser root. */
export const PUBLIC_BROWSER_URL = `${MATERIAL_URL}public/`;

/** Public raw files, compiled and served by the material site. */
export const PUBLIC_CONTENT_URL = `${MATERIAL_URL}raw/public/`;

/** Reserved browser base; append `<code>/` to open a student's material. */
export const RESERVED_CONTENT_URL = `${MATERIAL_URL}private/`;

/** Absolute URL of a public material file. */
export function publicMaterialUrl(path: string): string {
	return `${PUBLIC_CONTENT_URL}${path.replace(/^\/+/, "")}`;
}

/** Absolute URL of a browser. */
export function publicBrowserUrl(path: string): string {
	return `${PUBLIC_BROWSER_URL}${path.replace(/^\/+/, "")}`;
}

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
	{ slug: "prime", label: "Prime" },
	{ slug: "seconde", label: "Seconde" },
	{ slug: "olimpiadi", label: "Olimpiadi" },
	{ slug: "area-riservata", label: "Area riservata" },
];

/** Navigation links shared by every page. */
export const navLinks = [
	{ href: withBase("/"), label: "Home" },
	...SECTIONS.map((section) => ({
		href: withBase(`/${section.slug}`),
		label: section.label,
	})),
];

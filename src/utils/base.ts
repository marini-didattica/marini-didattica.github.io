/** Deployment base path with a guaranteed trailing slash, e.g. "/" or "/slide-site/". */
export const base = import.meta.env.BASE_URL.endsWith('/')
  ? import.meta.env.BASE_URL
  : `${import.meta.env.BASE_URL}/`;

/** Prefix a root-relative path with the deployment base. */
export function withBase(path: string): string {
  return `${base}${path.replace(/^\/+/, '')}`;
}

/**
 * Absolute URLs point at another deployment on this origin: the materiale
 * site, the Slidev decks. Those documents belong to a different Astro
 * runtime, so `ClientRouter` must not swap them in client-side.
 */
export function isExternalHref(href: string | undefined): boolean {
  return typeof href === 'string' && /^https?:\/\//i.test(href);
}

import { ui, defaultLocale, locales, type Locale, type UIKey } from './ui';
export type { Locale } from './ui';
export { locales, defaultLocale, localeMeta, regionMeta } from './ui';

export function getLocaleFromUrl(url: URL): Locale {
  const [, segment] = url.pathname.split('/');
  if (segment === 'en' || segment === 'de' || segment === 'fr') return segment;
  return defaultLocale;
}

export function useTranslations(locale: Locale) {
  return function t(key: UIKey): string {
    return ui[locale][key] ?? ui[defaultLocale][key] ?? key;
  };
}

export function localizePath(path: string, locale: Locale): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  if (locale === defaultLocale) return clean === '/' ? '/' : clean;
  return clean === '/' ? `/${locale}` : `/${locale}${clean}`;
}

export function alternateLocale(locale: Locale): Locale {
  return locale === 'pl' ? 'en' : 'pl';
}

/** Strips the locale prefix from a pathname. Returns the canonical PL path. */
export function unlocalizePath(pathname: string): string {
  for (const loc of locales) {
    if (loc === defaultLocale) continue;
    if (pathname === `/${loc}` || pathname === `/${loc}/`) return '/';
    if (pathname.startsWith(`/${loc}/`)) return pathname.slice(loc.length + 1);
  }
  return pathname;
}

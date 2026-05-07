export const locales = ['pl', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'pl';

export const ui = {
  pl: {
    'nav.product': 'Produkt',
    'nav.product.calendar': 'Kalendarz',
    'nav.product.passes': 'Karnety',
    'nav.product.horse-journal': 'Dziennik konia',
    'nav.product.finance': 'Finanse i KSeF',
    'nav.product.online-booking': 'Zapisy online',
    'nav.product.ai': 'AI Copilot',
    'nav.for': 'Dla kogo',
    'nav.for.school': 'Szkółka',
    'nav.for.boarding': 'Pensjonat',
    'nav.for.sport': 'Sport i trening',
    'nav.for.breeding': 'Hodowla',
    'nav.for.network': 'Sieci stajni',
    'nav.pricing': 'Cennik',
    'nav.demo': 'Demo',
    'nav.changelog': 'Co nowego',
    'nav.login': 'Zaloguj',
    'nav.cta': 'Zapytaj o dostęp',

    'hero.eyebrow': 'Operacyjne SaaS dla stajni',
    'hero.title.line1': 'Stajnia działa.',
    'hero.title.line2': 'Ty oddychasz.',
    'hero.subtitle':
      'Grafik, karnety, finanse i opieka nad końmi w jednym narzędziu. Wszystko, czego potrzebuje Twoja stajnia, w jednym ekranie.',
    'hero.cta.primary': 'Wypróbuj za 0 zł',
    'hero.cta.secondary': 'Zobacz demo (3 min)',
    'hero.note': '14 dni za darmo • Bez karty • Bez instalacji',

    'social.title': 'Już używają nas stajnie w Polsce',
    'social.stat1': 'jazd zaplanowanych',
    'social.stat2': 'koni w systemie',
    'social.stat3': 'średnio na fakturę',

    'tour.eyebrow': 'Co Hovera potrafi',
    'tour.title': 'Każda funkcja zaprojektowana z myślą o stajni',
    'tour.subtitle':
      'Nie kolejny CRM. Nie excel z makrami. Narzędzie zbudowane dla codziennej pracy w stajni — od pierwszej jazdy do ostatniej faktury.',
    'tour.learn': 'Dowiedz się więcej',

    'usecase.eyebrow': 'Hovera w 4 rolach',
    'usecase.title': 'Pasuje do Twojej stajni',

    'diff.eyebrow': 'Czego nie znajdziesz nigdzie indziej',
    'diff.title': 'Trzy rzeczy, których nie ma konkurencja',

    'pricing.eyebrow': 'Plan dla każdej skali',
    'pricing.title': 'Transparentne ceny. Bez gier.',
    'pricing.subtitle': 'Zacznij za darmo. Skaluj kiedy będziesz gotowa.',
    'pricing.cta': 'Zobacz pełen cennik',
    'pricing.month': '/ mies.',
    'pricing.choose': 'Zapytaj o ten plan',
    'pricing.popular': 'Najczęściej wybierany',

    'final.title': 'Zacznij dziś. Bez instalacji, bez wdrożenia.',
    'final.subtitle': 'Wypełnij formularz — odpowiemy w 24h i przeprowadzimy Cię przez setup.',
    'final.cta': 'Wyślij zapytanie',

    'footer.product': 'Produkt',
    'footer.for': 'Dla kogo',
    'footer.resources': 'Zasoby',
    'footer.company': 'Firma',
    'footer.copyright': '© 2026 Hovera Sp. z o.o. Wszystkie prawa zastrzeżone.',
    'footer.tagline': 'Stajnia działa. Ty oddychasz.',

    'lang.switch': 'EN',
    'common.read-more': 'Czytaj dalej',
    'common.back': 'Wróć',
  },
  en: {
    'nav.product': 'Product',
    'nav.product.calendar': 'Calendar',
    'nav.product.passes': 'Passes',
    'nav.product.horse-journal': 'Horse journal',
    'nav.product.finance': 'Finance & e-invoicing',
    'nav.product.online-booking': 'Online booking',
    'nav.product.ai': 'AI Copilot',
    'nav.for': 'Solutions',
    'nav.for.school': 'Riding school',
    'nav.for.boarding': 'Boarding',
    'nav.for.sport': 'Sport & training',
    'nav.for.breeding': 'Breeding',
    'nav.for.network': 'Stable networks',
    'nav.pricing': 'Pricing',
    'nav.demo': 'Demo',
    'nav.changelog': "What's new",
    'nav.login': 'Log in',
    'nav.cta': 'Request access',

    'hero.eyebrow': 'Operations SaaS for stables',
    'hero.title.line1': 'Your stable runs.',
    'hero.title.line2': 'You breathe.',
    'hero.subtitle':
      'Schedule, packages, finance and horse care in one tool. Everything your stable needs, on a single screen.',
    'hero.cta.primary': 'Try for free',
    'hero.cta.secondary': 'Watch demo (3 min)',
    'hero.note': '14 days free • No card • No install',

    'social.title': 'Trusted by stables across Europe',
    'social.stat1': 'rides scheduled',
    'social.stat2': 'horses in the system',
    'social.stat3': 'avg. invoice time',

    'tour.eyebrow': 'What Hovera does',
    'tour.title': 'Every feature designed for the stable',
    'tour.subtitle':
      "Not another CRM. Not a spreadsheet with macros. A tool built for the daily reality of running a stable — from first ride to last invoice.",
    'tour.learn': 'Learn more',

    'usecase.eyebrow': 'Hovera in 4 roles',
    'usecase.title': 'Fits the way your stable works',

    'diff.eyebrow': "What you won't find elsewhere",
    'diff.title': "Three things competitors don't have",

    'pricing.eyebrow': 'A plan for every scale',
    'pricing.title': 'Transparent pricing. No games.',
    'pricing.subtitle': 'Start free. Scale when you are ready.',
    'pricing.cta': 'See full pricing',
    'pricing.month': '/ mo',
    'pricing.choose': 'Ask about this plan',
    'pricing.popular': 'Most popular',

    'final.title': 'Start today. No install, no rollout.',
    'final.subtitle': 'Send us a note — we reply within 24h and walk you through setup.',
    'final.cta': 'Send inquiry',

    'footer.product': 'Product',
    'footer.for': 'Solutions',
    'footer.resources': 'Resources',
    'footer.company': 'Company',
    'footer.copyright': '© 2026 Hovera Ltd. All rights reserved.',
    'footer.tagline': 'Lift the weight off your stable.',

    'lang.switch': 'PL',
    'common.read-more': 'Read more',
    'common.back': 'Back',
  },
} as const;

export type UIKey = keyof (typeof ui)['pl'];

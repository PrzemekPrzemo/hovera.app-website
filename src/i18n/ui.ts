export const locales = ['pl', 'en', 'de', 'fr'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'pl';

export const localeMeta: Record<Locale, { label: string; flag: string; short: string }> = {
  pl: { label: 'Polski', flag: '🇵🇱', short: 'PL' },
  en: { label: 'English', flag: '🇬🇧', short: 'EN' },
  de: { label: 'Deutsch', flag: '🇩🇪', short: 'DE' },
  fr: { label: 'Français', flag: '🇫🇷', short: 'FR' },
};

export const regionMeta: Record<string, { label: { pl: string; en: string; de: string; fr: string }; flag: string }> = {
  PL: { label: { pl: 'Polska', en: 'Poland', de: 'Polen', fr: 'Pologne' }, flag: '🇵🇱' },
  DE: { label: { pl: 'Niemcy', en: 'Germany', de: 'Deutschland', fr: 'Allemagne' }, flag: '🇩🇪' },
  FR: { label: { pl: 'Francja', en: 'France', de: 'Frankreich', fr: 'France' }, flag: '🇫🇷' },
  UK: { label: { pl: 'Wielka Brytania', en: 'United Kingdom', de: 'Vereinigtes Königreich', fr: 'Royaume-Uni' }, flag: '🇬🇧' },
};

export const ui = {
  pl: {
    'nav.product': 'Produkt',
    'nav.product.calendar': 'Kalendarz',
    'nav.product.passes': 'Karnety',
    'nav.product.horse-journal': 'Dziennik konia',
    'nav.product.finance': 'Faktury i finanse',
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
    'nav.blog': 'Blog',
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
    'final.subtitle': 'Napisz do nas — odpiszemy w 24h, osobiście, bez formularzy ani chatbotów.',
    'final.cta': 'Napisz do nas',

    'footer.product': 'Produkt',
    'footer.for': 'Dla kogo',
    'footer.resources': 'Zasoby',
    'footer.company': 'Firma',
    'footer.copyright': '© 2026 Sendormeco Holding sp. z o.o. Wszystkie prawa zastrzeżone.',
    'footer.tagline': 'Stajnia działa. Ty oddychasz.',

    'lang.switch': 'EN',
    'common.read-more': 'Czytaj dalej',
    'common.back': 'Wróć',
    'region.banner': 'Ten artykuł dotyczy:',
  },
  en: {
    'nav.product': 'Product',
    'nav.product.calendar': 'Calendar',
    'nav.product.passes': 'Passes',
    'nav.product.horse-journal': 'Horse journal',
    'nav.product.finance': 'Invoicing & finance',
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
    'nav.blog': 'Blog',
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
    'final.subtitle': 'Drop us an email — we reply within 24h, personally. No forms, no chatbots.',
    'final.cta': 'Email us',

    'footer.product': 'Product',
    'footer.for': 'Solutions',
    'footer.resources': 'Resources',
    'footer.company': 'Company',
    'footer.copyright': '© 2026 Sendormeco Holding sp. z o.o. All rights reserved.',
    'footer.tagline': 'Lift the weight off your stable.',

    'lang.switch': 'PL',
    'common.read-more': 'Read more',
    'common.back': 'Back',
    'region.banner': 'This article is about:',
  },
  de: {
    'nav.product': 'Produkt',
    'nav.product.calendar': 'Kalender',
    'nav.product.passes': 'Reitkarten',
    'nav.product.horse-journal': 'Pferdetagebuch',
    'nav.product.finance': 'Rechnungen & Finanzen',
    'nav.product.online-booking': 'Online-Buchung',
    'nav.product.ai': 'KI-Copilot',
    'nav.for': 'Für wen',
    'nav.for.school': 'Reitschule',
    'nav.for.boarding': 'Pensionsstall',
    'nav.for.sport': 'Sport & Training',
    'nav.for.breeding': 'Zucht',
    'nav.for.network': 'Stallnetzwerke',
    'nav.pricing': 'Preise',
    'nav.demo': 'Demo',
    'nav.blog': 'Blog',
    'nav.changelog': 'Neuigkeiten',
    'nav.login': 'Anmelden',
    'nav.cta': 'Zugang anfragen',

    'hero.eyebrow': 'Operations-SaaS für Reitställe',
    'hero.title.line1': 'Der Stall läuft.',
    'hero.title.line2': 'Du atmest auf.',
    'hero.subtitle':
      'Stundenplan, Reitkarten, Finanzen und Pferdebetreuung in einem Tool. Alles, was dein Stall braucht — auf einem Bildschirm.',
    'hero.cta.primary': 'Kostenlos testen',
    'hero.cta.secondary': 'Demo ansehen (3 Min.)',
    'hero.note': '14 Tage gratis • Keine Karte • Keine Installation',

    'social.title': 'Vertraut von Reitställen in ganz Europa',
    'social.stat1': 'geplante Ritte',
    'social.stat2': 'Pferde im System',
    'social.stat3': 'Durchschn. Rechnungszeit',

    'tour.eyebrow': 'Was Hovera kann',
    'tour.title': 'Jede Funktion für den Stall gemacht',
    'tour.subtitle':
      'Kein weiteres CRM. Keine Excel-Tabelle mit Makros. Ein Werkzeug für den Alltag im Stall — vom ersten Ritt bis zur letzten Rechnung.',
    'tour.learn': 'Mehr erfahren',

    'usecase.eyebrow': 'Hovera in 4 Rollen',
    'usecase.title': 'Passt zu deinem Stall',

    'diff.eyebrow': 'Was du sonst nirgends findest',
    'diff.title': 'Drei Dinge, die die Konkurrenz nicht hat',

    'pricing.eyebrow': 'Ein Plan für jede Größe',
    'pricing.title': 'Transparente Preise. Keine Spielchen.',
    'pricing.subtitle': 'Starte kostenlos. Skaliere, wenn du bereit bist.',
    'pricing.cta': 'Vollständige Preisliste',
    'pricing.month': '/ Monat',
    'pricing.choose': 'Diesen Plan anfragen',
    'pricing.popular': 'Am beliebtesten',

    'final.title': 'Starte heute. Keine Installation, kein Rollout.',
    'final.subtitle': 'Schreib uns eine E-Mail — wir antworten innerhalb von 24h, persönlich. Keine Formulare, keine Chatbots.',
    'final.cta': 'E-Mail schreiben',

    'footer.product': 'Produkt',
    'footer.for': 'Für wen',
    'footer.resources': 'Ressourcen',
    'footer.company': 'Unternehmen',
    'footer.copyright': '© 2026 Sendormeco Holding sp. z o.o. Alle Rechte vorbehalten.',
    'footer.tagline': 'Der Stall läuft. Du atmest auf.',

    'lang.switch': 'DE',
    'common.read-more': 'Weiterlesen',
    'common.back': 'Zurück',
    'region.banner': 'Dieser Artikel betrifft:',
  },
  fr: {
    'nav.product': 'Produit',
    'nav.product.calendar': 'Calendrier',
    'nav.product.passes': 'Forfaits',
    'nav.product.horse-journal': 'Carnet du cheval',
    'nav.product.finance': 'Facturation & finances',
    'nav.product.online-booking': 'Réservation en ligne',
    'nav.product.ai': 'Copilote IA',
    'nav.for': 'Solutions',
    'nav.for.school': 'Centre équestre',
    'nav.for.boarding': 'Pension',
    'nav.for.sport': 'Sport & entraînement',
    'nav.for.breeding': 'Élevage',
    'nav.for.network': "Réseaux d'écuries",
    'nav.pricing': 'Tarifs',
    'nav.demo': 'Démo',
    'nav.blog': 'Blog',
    'nav.changelog': 'Nouveautés',
    'nav.login': 'Connexion',
    'nav.cta': "Demander l'accès",

    'hero.eyebrow': 'SaaS opérationnel pour écuries',
    'hero.title.line1': "L'écurie tourne.",
    'hero.title.line2': 'Tu respires.',
    'hero.subtitle':
      "Planning, forfaits, finances et soins des chevaux dans un seul outil. Tout ce dont votre écurie a besoin, sur un écran unique.",
    'hero.cta.primary': 'Essai gratuit',
    'hero.cta.secondary': 'Voir la démo (3 min)',
    'hero.note': '14 jours gratuits • Sans carte • Sans installation',

    'social.title': 'Utilisé par des écuries partout en Europe',
    'social.stat1': 'séances planifiées',
    'social.stat2': 'chevaux dans le système',
    'social.stat3': 'temps moyen par facture',

    'tour.eyebrow': 'Ce que Hovera fait',
    'tour.title': "Chaque fonction pensée pour l'écurie",
    'tour.subtitle':
      "Pas un CRM de plus. Pas un Excel avec des macros. Un outil conçu pour la réalité quotidienne d'une écurie — du premier cours à la dernière facture.",
    'tour.learn': 'En savoir plus',

    'usecase.eyebrow': 'Hovera dans 4 rôles',
    'usecase.title': "S'adapte à votre écurie",

    'diff.eyebrow': "Ce que vous ne trouverez pas ailleurs",
    'diff.title': "Trois choses que la concurrence n'a pas",

    'pricing.eyebrow': 'Un plan pour chaque taille',
    'pricing.title': 'Tarifs transparents. Sans jeu.',
    'pricing.subtitle': 'Commencez gratuitement. Évoluez quand vous êtes prêt.',
    'pricing.cta': 'Tarifs complets',
    'pricing.month': '/ mois',
    'pricing.choose': 'Demander ce plan',
    'pricing.popular': 'Le plus choisi',

    'final.title': "Commencez aujourd'hui. Sans installation, sans déploiement.",
    'final.subtitle': "Écrivez-nous — nous répondons en 24h, personnellement. Pas de formulaires, pas de chatbots.",
    'final.cta': 'Nous écrire',

    'footer.product': 'Produit',
    'footer.for': 'Solutions',
    'footer.resources': 'Ressources',
    'footer.company': 'Entreprise',
    'footer.copyright': '© 2026 Sendormeco Holding sp. z o.o. Tous droits réservés.',
    'footer.tagline': "L'écurie tourne. Vous respirez.",

    'lang.switch': 'FR',
    'common.read-more': 'Lire la suite',
    'common.back': 'Retour',
    'region.banner': 'Cet article concerne :',
  },
} as const;

export type UIKey = keyof (typeof ui)['pl'];

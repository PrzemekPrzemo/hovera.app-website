import { config, fields, collection } from '@keystatic/core';

const locales = ['pl', 'en', 'de', 'fr'] as const;
type Locale = (typeof locales)[number];

const accentOptions = [
  { label: 'Calendar', value: 'calendar' },
  { label: 'Passes', value: 'passes' },
  { label: 'Invoice', value: 'invoice' },
  { label: 'Journal', value: 'journal' },
  { label: 'Mobile', value: 'mobile' },
  { label: 'Booking', value: 'booking' },
  { label: 'AI', value: 'ai' },
];

const changelogTypes = [
  { label: 'Feature', value: 'Feature' },
  { label: 'Improvement', value: 'Improvement' },
  { label: 'Fix', value: 'Fix' },
  { label: 'Mobile', value: 'Mobile' },
  { label: 'API', value: 'API' },
  { label: 'Integration', value: 'Integration' },
];

function productCollection(locale: Locale) {
  return collection({
    label: `Produkt — ${locale.toUpperCase()}`,
    slugField: 'slug',
    path: `src/content/product/${locale}/*`,
    format: { contentField: 'body' },
    schema: {
      slug: fields.slug({ name: { label: 'Slug (filename)' } }),
      locale: fields.select({
        label: 'Locale',
        options: locales.map((l) => ({ label: l, value: l })),
        defaultValue: locale,
      }),
      title: fields.text({ label: 'SEO title', validation: { length: { min: 1 } } }),
      eyebrow: fields.text({ label: 'Eyebrow' }),
      headline: fields.text({ label: 'Headline (H1)', multiline: true }),
      subtitle: fields.text({ label: 'Subtitle', multiline: true }),
      description: fields.text({ label: 'Meta description', multiline: true }),
      accent: fields.select({ label: 'Visual accent', options: accentOptions, defaultValue: 'calendar' }),
      heroImage: fields.text({ label: 'Hero image path (optional)', description: 'e.g. /og/transport-banner-en.png' }),
      bullets: fields.array(fields.text({ label: 'Bullet' }), { label: 'Bullets', itemLabel: (p) => p.value || 'Bullet' }),
      subFeatures: fields.array(
        fields.object({
          title: fields.text({ label: 'Title' }),
          body: fields.text({ label: 'Body', multiline: true }),
        }),
        { label: 'Sub-features', itemLabel: (p) => p.fields.title.value || 'Sub-feature' }
      ),
      integrations: fields.array(fields.text({ label: 'Integration' }), { label: 'Integrations', itemLabel: (p) => p.value || 'Integration' }),
      pricingNote: fields.text({ label: 'Pricing note', multiline: true }),
      body: fields.markdoc({ label: 'Long-form body (optional)' }),
    },
  });
}

function postCollection(locale: Locale) {
  return collection({
    label: `Blog — ${locale.toUpperCase()}`,
    slugField: 'slug',
    path: `src/content/blog/${locale}/*`,
    format: { contentField: 'body' },
    schema: {
      slug: fields.slug({ name: { label: 'Slug (filename)' } }),
      locale: fields.select({
        label: 'Locale',
        options: locales.map((l) => ({ label: l, value: l })),
        defaultValue: locale,
      }),
      title: fields.text({ label: 'Title' }),
      description: fields.text({ label: 'Meta description', multiline: true }),
      date: fields.date({ label: 'Date' }),
      author: fields.text({ label: 'Author', defaultValue: 'Przemek' }),
      tags: fields.array(fields.text({ label: 'Tag' }), { label: 'Tags', itemLabel: (p) => p.value || 'Tag' }),
      body: fields.markdoc({ label: 'Body' }),
    },
  });
}

function changelogCollection(locale: Locale) {
  return collection({
    label: `Changelog — ${locale.toUpperCase()}`,
    slugField: 'slug',
    path: `src/content/changelog/${locale}/*`,
    format: { contentField: 'body' },
    schema: {
      slug: fields.slug({ name: { label: 'Slug (filename — e.g. 2026-05-18-foo)' } }),
      locale: fields.select({
        label: 'Locale',
        options: locales.map((l) => ({ label: l, value: l })),
        defaultValue: locale,
      }),
      date: fields.date({ label: 'Date' }),
      type: fields.select({ label: 'Type', options: changelogTypes, defaultValue: 'Feature' }),
      title: fields.text({ label: 'Title' }),
      summary: fields.text({ label: 'Summary', multiline: true }),
      body: fields.markdoc({ label: 'Body' }),
    },
  });
}

function useCaseCollection(locale: Locale) {
  return collection({
    label: `Use case — ${locale.toUpperCase()}`,
    slugField: 'slug',
    path: `src/content/usecase/${locale}/*`,
    format: { contentField: 'body' },
    schema: {
      slug: fields.slug({ name: { label: 'Slug (filename)' } }),
      locale: fields.select({
        label: 'Locale',
        options: locales.map((l) => ({ label: l, value: l })),
        defaultValue: locale,
      }),
      title: fields.text({ label: 'Title' }),
      eyebrow: fields.text({ label: 'Eyebrow' }),
      headline: fields.text({ label: 'Headline', multiline: true }),
      description: fields.text({ label: 'Meta description', multiline: true }),
      plan: fields.text({ label: 'Recommended plan' }),
      scenarios: fields.array(
        fields.object({
          title: fields.text({ label: 'Title' }),
          body: fields.text({ label: 'Body', multiline: true }),
        }),
        { label: 'Scenarios', itemLabel: (p) => p.fields.title.value || 'Scenario' }
      ),
      features: fields.array(fields.text({ label: 'Feature' }), { label: 'Features', itemLabel: (p) => p.value || 'Feature' }),
      quote: fields.object({
        text: fields.text({ label: 'Quote', multiline: true }),
        name: fields.text({ label: 'Name' }),
        role: fields.text({ label: 'Role / stable' }),
      }, { label: 'Customer quote' }),
      body: fields.markdoc({ label: 'Long-form body (optional)' }),
    },
  });
}

function versusCollection(locale: Locale) {
  return collection({
    label: `Versus — ${locale.toUpperCase()}`,
    slugField: 'slug',
    path: `src/content/versus/${locale}/*`,
    format: { contentField: 'body' },
    schema: {
      slug: fields.slug({ name: { label: 'Slug (filename)' } }),
      locale: fields.select({
        label: 'Locale',
        options: locales.map((l) => ({ label: l, value: l })),
        defaultValue: locale,
      }),
      competitor: fields.text({ label: 'Competitor name' }),
      title: fields.text({ label: 'SEO title' }),
      description: fields.text({ label: 'Meta description', multiline: true }),
      tldr: fields.text({ label: 'TL;DR', multiline: true }),
      table: fields.array(
        fields.object({
          feature: fields.text({ label: 'Feature' }),
          hovera: fields.text({ label: 'Hovera' }),
          them: fields.text({ label: 'Competitor' }),
        }),
        { label: 'Comparison table', itemLabel: (p) => p.fields.feature.value || 'Row' }
      ),
      chooseHovera: fields.array(fields.text({ label: 'Reason' }), { label: 'Choose Hovera if', itemLabel: (p) => p.value || 'Reason' }),
      chooseThem: fields.array(fields.text({ label: 'Reason' }), { label: 'Choose competitor if', itemLabel: (p) => p.value || 'Reason' }),
      body: fields.markdoc({ label: 'Long-form body (optional)' }),
    },
  });
}

const collections: Record<string, ReturnType<typeof collection>> = {};
for (const l of locales) {
  collections[`product_${l}`] = productCollection(l);
  collections[`post_${l}`] = postCollection(l);
  collections[`changelog_${l}`] = changelogCollection(l);
  collections[`usecase_${l}`] = useCaseCollection(l);
  collections[`versus_${l}`] = versusCollection(l);
}

export default config({
  storage: { kind: 'local' },
  ui: {
    brand: { name: 'Hovera CMS' },
    navigation: {
      'Polski (PL)': ['product_pl', 'post_pl', 'changelog_pl', 'usecase_pl', 'versus_pl'],
      'English (EN)': ['product_en', 'post_en', 'changelog_en', 'usecase_en', 'versus_en'],
      'Deutsch (DE)': ['product_de', 'post_de', 'changelog_de', 'usecase_de', 'versus_de'],
      'Français (FR)': ['product_fr', 'post_fr', 'changelog_fr', 'usecase_fr', 'versus_fr'],
    },
  },
  collections,
});

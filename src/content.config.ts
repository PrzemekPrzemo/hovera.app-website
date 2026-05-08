import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const idFromPath = ({ entry }: { entry: string }) => entry.replace(/\.[^.]+$/, '');
const localeEnum = z.enum(['pl', 'en', 'de', 'fr']);
const regionEnum = z.enum(['PL', 'DE', 'FR', 'UK']);

const product = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: 'src/content/product', generateId: idFromPath }),
  schema: z.object({
    locale: localeEnum,
    slug: z.string(),
    title: z.string(),
    eyebrow: z.string(),
    headline: z.string(),
    subtitle: z.string(),
    description: z.string(),
    accent: z.enum(['calendar', 'passes', 'invoice', 'journal', 'mobile', 'booking', 'ai']),
    bullets: z.array(z.string()),
    subFeatures: z.array(z.object({
      title: z.string(),
      body: z.string(),
    })),
    integrations: z.array(z.string()).optional(),
    pricingNote: z.string(),
  }),
});

const useCase = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: 'src/content/usecase', generateId: idFromPath }),
  schema: z.object({
    locale: localeEnum,
    slug: z.string(),
    title: z.string(),
    eyebrow: z.string(),
    headline: z.string(),
    description: z.string(),
    plan: z.string(),
    scenarios: z.array(z.object({
      title: z.string(),
      body: z.string(),
    })),
    features: z.array(z.string()),
    quote: z.object({
      text: z.string(),
      name: z.string(),
      role: z.string(),
    }),
  }),
});

const versus = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: 'src/content/versus', generateId: idFromPath }),
  schema: z.object({
    locale: localeEnum,
    slug: z.string(),
    competitor: z.string(),
    title: z.string(),
    description: z.string(),
    tldr: z.string(),
    table: z.array(z.object({
      feature: z.string(),
      hovera: z.string(),
      them: z.string(),
    })),
    chooseHovera: z.array(z.string()),
    chooseThem: z.array(z.string()),
  }),
});

const changelog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: 'src/content/changelog', generateId: idFromPath }),
  schema: z.object({
    locale: localeEnum,
    date: z.string(),
    type: z.enum(['Feature', 'Improvement', 'Fix', 'Mobile', 'API', 'Integration']),
    title: z.string(),
    summary: z.string(),
  }),
});

const post = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: 'src/content/blog', generateId: idFromPath }),
  schema: z.object({
    locale: localeEnum,
    slug: z.string(),
    title: z.string(),
    description: z.string(),
    date: z.string(),
    author: z.string(),
    tags: z.array(z.string()).optional(),
    regions: z.array(regionEnum).optional(),
  }),
});

export const collections = { product, useCase, versus, changelog, post };

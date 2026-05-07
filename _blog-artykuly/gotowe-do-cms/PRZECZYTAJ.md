# 📤 Tu trafiają gotowe artykuły

Po przerobieniu Twoich surowych plików z `do-przerobienia/` wrzucam tu **draft markdown** z pełnym frontmatterem, wewnętrznymi linkami i optymalizacją SEO — według [`../TEMPLATE.md`](../TEMPLATE.md).

Każdy gotowy plik ma format:

```
gotowe-do-cms/
├── ksef-dla-szkolki-2026.pl.md     ← polska wersja
├── ksef-dla-szkolki-2026.en.md     ← angielska wersja (jeśli zamówiona)
└── ...
```

## Co dalej

Po Twojej akceptacji w PR (możesz coś poprawić w komentarzu lub bezpośrednio w pliku) plik trafia do:

- `src/content/blog/pl/{slug}.md` — wersja PL
- `src/content/blog/en/{slug}.md` — wersja EN

i pojawia się na `https://hovera.app/blog`.

## Workflow akceptacji

1. Otwórz draft w `gotowe-do-cms/`
2. Przeczytaj
3. Komentujesz / poprawiasz / akceptujesz w PR
4. Po akceptacji robię move do `src/content/blog/` i mergujemy

# 📝 Artykuły do przerobienia

Folder roboczy. Wrzucaj tu surowe artykuły do przerobienia, zaplanowania i wstawienia na `https://hovera.app/blog`.

**Branch:** `blog-artykuly`

## Jak to działa

```
_blog-artykuly/
├── README.md             ← ten plik
├── do-przerobienia/      ← Ty wrzucasz tu surowe pliki
└── gotowe-do-cms/        ← ja wrzucam tu sformatowane drafty PL/EN
```

## Co możesz wrzucić do `do-przerobienia/`

Dowolny format — sformatuję pod blog Hovery:

| Format | Uwagi |
|---|---|
| `.md` | Markdown — najszybsza ścieżka |
| `.txt` | Czysty tekst — dodam strukturę |
| `.docx` | Word — eksport z formatowaniem |
| `.pdf` | OCR jeśli skan, copy-paste jeśli tekstowy |
| `.html` | Eksport z Notion / Google Docs |
| `.md` z notatkami | Może być surowy draft, brudnopis, bullet points — wszystko OK |

Nie trzeba nic formatować. Wrzuć i napisz mi w PR / mailu / na czym wam tam wygodnie:

> „W `_blog-artykuly/do-przerobienia/` jest 5 artykułów. Przerobione, zoptymalizowane SEO, dodaj do bloga."

## Co dostaję jako input — jak ułatwić sobie pracę

Idealny input ma:

- **Nazwa pliku** opisowa (np. `ksef-dla-szkolki-2026.md`, nie `Document1.docx`)
- **Tytuł** — pierwsza linia albo na początku pliku
- **Cel artykułu** w jednym zdaniu (np. „edukacja księgowych jeździeckich nt. KSeF" albo „SEO pod keyword 'karnety stajnia'")
- **Twoja preferencja** — czy ma być po polsku tylko, czy też przetłumaczony EN

Ale jeśli czegoś brakuje — i tak ogarnę. Po prostu wolniej.

## Co zrobię z każdym artykułem

1. **Przeczytam i ocenię** — czy temat pasuje do jednej z 5 kategorii w [`docs/BLOG-PLAN.md`](../docs/BLOG-PLAN.md), czy ma keyword pod SEO
2. **Dopytam** jeśli coś jest niejasne (np. „dla kogo to jest?", „jaki cel?")
3. **Zoptymalizuję pod SEO**:
   - Tytuł zawierający keyword, ≤ 60 znaków
   - Meta description ≤ 160 znaków, z keywordem
   - Slug URL bez polskich znaków
   - H2/H3 z keywordami i wariantami
   - Internal linki do `/produkt/*`, `/cennik`, `/kalkulator-roi`
   - Zewnętrzny link do autorytetu (np. gov.pl, FEI)
   - CTA na końcu
4. **Sformatuję jako markdown** zgodnie z szablonem (patrz [`TEMPLATE.md`](./TEMPLATE.md))
5. **Przetłumaczę na EN** jeśli zaznaczyłeś
6. **Wrzucę PR** do gałęzi developerskiej, oznaczę Cię do akceptacji
7. **Po akceptacji** plik trafi do `src/content/blog/{pl,en}/` i zostanie opublikowany na stronie

## Workflow Twój

1. Klonujesz tę gałąź lokalnie albo edytujesz przez GitHub web UI:
   ```bash
   git fetch origin
   git checkout blog-artykuly
   git pull origin blog-artykuly
   ```
2. Wrzucasz pliki do `do-przerobienia/`
3. Pushujesz:
   ```bash
   git add _blog-artykuly/do-przerobienia/
   git commit -m "Dodaję 3 artykuły do przerobienia"
   git push origin blog-artykuly
   ```
4. Piszesz mi (Claude) co tam jest — przerabiam, robię PR, mergujesz

## Workflow alternatywny (przez GitHub web)

Jeśli nie chcesz git CLI:

1. Otwórz: <https://github.com/PrzemekPrzemo/hovera.app-website/tree/blog-artykuly/_blog-artykuly/do-przerobienia>
2. Kliknij **„Add file" → „Upload files"**
3. Wgraj swoje pliki (przeciągnij i upuść)
4. Na dole **„Commit changes"** → opcja „Commit directly to the `blog-artykuly` branch"

Tyle. Reszta jest po mojej stronie.

## Co jest w planie blogu już zaplanowane

Patrz [`docs/BLOG-PLAN.md`](../docs/BLOG-PLAN.md) — 25 pomysłów na artykuły w 5 klastrach. Twoje artykuły dopasuję do tej struktury, a luki uzupełnimy razem.

Aktualnie opublikowane (w `src/content/blog/`):

- 🇵🇱 KSeF 2026 dla stajni: co musisz wiedzieć przed 1 lutego
- 🇵🇱 Karnety w stajni: 5 częstych błędów (i jak ich unikać)
- 🇵🇱 Jak wybrać SaaS dla stajni: 8 pytań
- 🇬🇧 Choosing a SaaS for your stable: 8 questions worth asking

## FAQ

**Mogę wrzucić artykuł, który już jest na innej stronie / blogu?**
Tak, ale — Google nie lubi duplicate content. W takim przypadku: albo dodajemy `<link rel="canonical">` na oryginał, albo wykasowujemy oryginał, albo sporo modyfikujemy treść, żeby była „nowa".

**Mogę wrzucić tłumaczenie istniejącego polskiego artykułu na EN?**
Tak, idealnie — zwiększa zasięg na rynki UE. Po prostu wrzuć obie wersje albo tylko PL i napisz „przetłumacz".

**Co jeśli mam artykuł z innego źródła (cytat, źródło)?**
Linkuj do oryginału. Cytaty oznaczamy `>` w markdownie, źródła linkujemy.

**Czy artykuły mogą być długie?**
Im dłuższy tym lepiej dla SEO — pod warunkiem, że są wartościowe. 1500-3000 słów = idealnie. Ale 600-słowowy konkret jest lepszy niż 3000-słowowa ściana ogólników.

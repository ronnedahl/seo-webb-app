# SEO Sökordsanalys

En webbapplikation för att analysera sökvolym och konkurrens för nyckelord med hjälp av DataForSEO API.

![Next.js](https://img.shields.io/badge/Next.js-16-black)
![React](https://img.shields.io/badge/React-19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8)

## Funktioner

- **Sökordsanalys** - Sök på valfritt nyckelord och få detaljerad statistik
   **Flera länder** - Stöd för Sverige, USA, Storbritannien, Tyskland, Danmark, Norge och Finland
-  **Sökvolym** - Se hur många som söker på ett specifikt nyckelord per månad
-  **Månadshistorik** - Visualisera sökvolym över de senaste 12 månaderna
-  **Konkurrensanalys** - Se konkurrensnivå (Låg/Medel/Hög) och konkurrensindex
-   **CPC-data** - Kostnad per klick för annonsering

## Kom igång

### Förutsättningar

- Node.js 18+
- Ett [DataForSEO](https://dataforseo.com/) konto

### Installation

1. Klona repot:
```bash
git clone https://github.com/ditt-användarnamn/seo-webb-app-new.git
cd seo-webb-app-new
```

2. Installera beroenden:
```bash
npm install
```

3. Skapa en `.env.local` fil med dina DataForSEO-credentials:
```env
DATAFORSEO_LOGIN=din_email@example.com
DATAFORSEO_PASSWORD=ditt_api_lösenord
```

> **OBS:** API-lösenordet hittar du på https://app.dataforseo.com/api-access (det är inte samma som ditt kontolösenord)

4. Starta utvecklingsservern:
```bash
npm run dev
```

5. Öppna [http://localhost:3000](http://localhost:3000) i din webbläsare.

## Teknikstack

- **Framework:** Next.js 16 (App Router)
- **UI:** React 19 + Tailwind CSS 4
- **Språk:** TypeScript
- **API:** DataForSEO Keywords Data API

## Projektstruktur

```
├── app/
│   ├── api/
│   │   └── keyword-search/
│   │       └── route.ts      # API-endpoint för sökordsdata
│   ├── components/
│   │   └── KeywordSearch.tsx # Sökformulär och resultatvisning
│   ├── globals.css           # Globala stilar
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Startsida
├── public/                   # Statiska filer
└── .env.local               # Miljövariabler (skapa själv)
```

## Scripts

| Kommando | Beskrivning |
|----------|-------------|
| `npm run dev` | Starta utvecklingsserver |
| `npm run build` | Bygg för produktion |
| `npm run start` | Starta produktionsserver |
| `npm run lint` | Kör ESLint |

## Licens

MIT

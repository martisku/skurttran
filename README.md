# Bryllupsside for skurtran.no

En enkel, rask bryllupsside med program, praktisk info, transport, gaveliste og
påmelding. Bygget som ren HTML, CSS og JavaScript – uten rammeverk og uten en
eneste npm-pakke å holde oppdatert.

## Kom i gang

```bash
npm start
```

Åpne <http://localhost:3000>. Siden bygges på nytt automatisk hver gang du
lagrer en fil.

For å bygge den ferdige siden inn i `dist/`:

```bash
npm run build
```

Du trenger Node 18 eller nyere. Ingen `npm install` – prosjektet har ingen
avhengigheter.

## Slik endrer du innholdet

**Alt innhold ligger i [`src/content.js`](src/content.js).** Navn, datoer,
program, transport, kontonummer, spørsmål og svar – alt sammen. Du trenger
ikke å røre HTML eller CSS for å endre teksten på siden.

Hver seksjon har et `vis`-felt. Setter du det til `false`, forsvinner seksjonen
både fra siden og fra menyen:

```js
gaver: {
  vis: false,   // skjuler hele gavelisten
  ...
}
```

Teksten rundt innholdet – skjemaetiketter, feilmeldinger, nedtellingen –
ligger i `ui`-blokken nederst i `content.js`.

Vil du bytte farger, ligger de øverst i
[`src/static/styles.css`](src/static/styles.css) som variabler under `:root`.

## Språk

Siden finnes på norsk bokmål, nynorsk, engelsk og vietnamesisk. Alt ligger
på én og samme side, og gjestene bytter språk øverst til høyre.

- **`src/content.js` er bokmål** og det eneste stedet felles ting står:
  datoer, telefonnumre, kontonummer, lenker og skjema-IDer.
- **Oversettelsene ligger i [`src/sprak/`](src/sprak/)** (`nn.js`, `en.js`,
  `vi.js`) og inneholder bare tekst. Mangler en tekst i en oversettelse,
  vises bokmålsteksten.
- **Lister slås sammen etter plassering.** Legger du til et punkt i
  programmet på bokmål, legg det til på samme plass i oversettelsene.
  `npm run build` advarer hvis listene ikke er like lange.
- **Vil du fjerne et språk**, sletter du linjen i
  [`src/sprak/index.js`](src/sprak/index.js).

Hvilket språk gjesten får:

1. Språket i lenken, hvis det er med (se under).
2. Ellers språket gjesten valgte sist (huskes i nettleseren).
3. Ved første besøk: nettleserens språk. Norsk, svensk og dansk gir bokmål,
   nynorsk gir nynorsk, vietnamesisk gir vietnamesisk, og alt annet gir
   engelsk.

For å sende noen rett til et bestemt språk:

```
https://skurtran.no/en      eller   https://skurtran.no/?lang=en
https://skurtran.no/nn               https://skurtran.no/?lang=nn
https://skurtran.no/vi               https://skurtran.no/?lang=vi
https://skurtran.no/nb               https://skurtran.no/?lang=nb
```

Påmeldingsskjemaet sender alltid de norske svaralternativene til Google
Skjema, uansett hvilket språk gjesten ser. Alle svarene havner derfor i det
samme regnearket.

> Den vietnamesiske oversettelsen er et utkast og bør leses gjennom av noen
> som har vietnamesisk som morsmål før siden publiseres.

## Påmelding

Skjemaet på siden er vårt eget, men svarene lagres i et Google Skjema dere
eier – ingen server, ingen database, ingen månedspris. Svarene kan leses rett
i et Google Regneark.

Oppsettet er beskrevet steg for steg i
[`docs/rsvp-google-skjema.md`](docs/rsvp-google-skjema.md). Fram til det er på
plass viser siden en tydelig beskjed om at påmeldingen ikke er koblet opp
ennå, og `npm run build` advarer om det samme.

## Publisering

Siden er klar for både Vercel og Netlify, og oppsettet av domenet hos
Domeneshop er beskrevet i
[`docs/publisering.md`](docs/publisering.md).

Kort fortalt: koble repoet til Vercel eller Netlify, legg inn `skurtran.no`
som domene, og lag de DNS-pekerne de oppgir i Domeneshops kontrollpanel.
Etter det publiseres siden automatisk hver gang du pusher til GitHub.

## Hva ligger hvor

```
src/content.js          Alt innhold på siden (bokmål) – det er her du redigerer
src/sprak/              Oversettelser (nynorsk, engelsk, vietnamesisk)
src/template.js         Bygger HTML-en ut fra innholdet
src/static/styles.css   Utseende (farger ligger øverst)
src/static/main.js      Språkvalg, meny, nedtelling, innfading og påmeldingsskjema
src/static/favicon.svg  Ikonet i nettleserfanen
build.mjs               Bygger alt sammen til dist/
scripts/dev.mjs         Lokal utviklingsserver med automatisk oppdatering
docs/                   Oppskrifter for påmelding og publisering
```

Mappen `dist/` genereres og er ikke sjekket inn i Git.

## Verdt å vite

- **Siden fungerer uten JavaScript.** Alt innhold er ekte HTML. Uten
  JavaScript mister man kun nedtellingen, innfadingen, påmeldingsskjemaet og
  språkvalget (siden vises da på bokmål).
- **Tilgjengelighet.** Siden kan brukes med tastatur og skjermleser, har
  «hopp til innhold»-lenke, og respekterer innstillingen for redusert
  bevegelse.
- **Utskrift.** Trykker en gjest Ctrl+P, skrives programmet og den praktiske
  informasjonen ut uten meny og skjema.
- **Skrifttyper** hentes fra brukerens egen maskin, så det lastes ingenting
  fra Google eller andre tredjeparter. Siden setter ingen informasjonskapsler;
  språkvalget huskes i nettleserens lokale lagring.

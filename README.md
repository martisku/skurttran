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

Vil du bytte farger, ligger de øverst i
[`src/static/styles.css`](src/static/styles.css) som variabler under `:root`.

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
src/content.js          Alt innhold på siden – det er her du redigerer
src/template.js         Bygger HTML-en ut fra innholdet
src/static/styles.css   Utseende (farger ligger øverst)
src/static/main.js      Meny, nedtelling, innfading og påmeldingsskjema
src/static/favicon.svg  Ikonet i nettleserfanen
build.mjs               Bygger alt sammen til dist/
scripts/dev.mjs         Lokal utviklingsserver med automatisk oppdatering
docs/                   Oppskrifter for påmelding og publisering
```

Mappen `dist/` genereres og er ikke sjekket inn i Git.

## Verdt å vite

- **Siden fungerer uten JavaScript.** Alt innhold er ekte HTML. Uten
  JavaScript mister man kun nedtellingen, innfadingen og påmeldingsskjemaet.
- **Tilgjengelighet.** Siden kan brukes med tastatur og skjermleser, har
  «hopp til innhold»-lenke, og respekterer innstillingen for redusert
  bevegelse.
- **Utskrift.** Trykker en gjest Ctrl+P, skrives programmet og den praktiske
  informasjonen ut uten meny og skjema.
- **Skrifttyper** hentes fra brukerens egen maskin, så det lastes ingenting
  fra Google eller andre tredjeparter. Siden setter ingen informasjonskapsler.

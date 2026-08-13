# Publisering på skurtran.no

Siden er statisk, så den kan hostes gratis. Under er oppskriften for både
Vercel og Netlify, og deretter hvordan domenet settes opp hos Domeneshop.

Velg **én** av dem – ikke begge.

---

## Alternativ A: Vercel

### 1. Koble til repoet

1. Logg inn på [vercel.com](https://vercel.com) med GitHub-kontoen din.
2. **Add New → Project**, og velg repoet `martisku/skurttran`.
3. Vercel leser `vercel.json` og finner byggeoppsettet selv:
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Trykk **Deploy**.

Etter et halvt minutt ligger siden på en `*.vercel.app`-adresse. Hver gang du
pusher til GitHub bygges siden på nytt automatisk.

### 2. Legg til domenet

Gå til **Project → Settings → Domains**, legg inn `skurtran.no` og
`www.skurtran.no`.

Vercel viser da nøyaktig hvilke DNS-oppføringer du skal lage. **Bruk verdiene
Vercel viser deg** – IP-adressen for rot-domenet tildeles per prosjekt fra en
pool, så den er ikke lik for alle. Den ser typisk slik ut:

| Type  | Navn / vert | Verdi                     |
|-------|-------------|---------------------------|
| A     | `@` (tom)   | IP-adressen Vercel oppgir |
| CNAME | `www`       | `cname.vercel-dns.com`    |

Hopp så ned til [DNS hos Domeneshop](#dns-hos-domeneshop).

---

## Alternativ B: Netlify

### 1. Koble til repoet

1. Logg inn på [netlify.com](https://netlify.com) med GitHub-kontoen din.
2. **Add new site → Import an existing project → GitHub**, velg
   `martisku/skurttran`.
3. Netlify leser `netlify.toml`:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Trykk **Deploy site**.

### 2. Legg til domenet

Gå til **Site configuration → Domain management → Add a domain**, og legg inn
`skurtran.no`.

Velg **«Add domain» → «Use an external DNS provider»** (altså *ikke* «Use
Netlify DNS», med mindre du vil flytte hele DNS-en bort fra Domeneshop).

Netlify oppgir da:

| Type            | Navn / vert | Verdi                          |
|-----------------|-------------|--------------------------------|
| ANAME (eller A) | `@` (tom)   | `apex-loadbalancer.netlify.com` (ANAME) eller `75.2.60.5` (A) |
| CNAME           | `www`       | `<sidenavn>.netlify.app`       |

Domeneshop støtter ANAME, så bruk den for rot-domenet – da slipper du å bytte
IP-adresse hvis Netlify endrer den senere.

---

## DNS hos Domeneshop

1. Logg inn på [domene.shop](https://domene.shop).
2. Velg domenet `skurtran.no`.
3. Gå til **DNS-innstillinger** (kalles også «Pekere» / «DNS-pekere»).
4. **Slett** eventuelle eksisterende A-, AAAA-, ANAME- eller CNAME-pekere for
   `@` og `www` som peker til Domeneshops parkeringsside eller webhotell.
   La MX-pekere (e-post) og TXT-pekere stå i fred.
5. Legg inn pekerne du fikk fra Vercel eller Netlify:
   - **Rot-domenet:** la «Subdomene»-feltet stå **tomt** (det betyr `@`, altså
     `skurtran.no` selv).
   - **www:** skriv `www` i subdomene-feltet.
6. Lagre.

### Hvor lang tid tar det?

Domeneshop bruker som regel få minutter på å oppdatere sine navnetjenere, men
gamle svar kan ligge cachet hos internettleverandører i inntil 24–48 timer.
Vercel og Netlify utsteder SSL-sertifikat (HTTPS) automatisk så snart de ser at
DNS-en peker riktig – det tar vanligvis noen minutter etter at DNS er på plass.

Sjekk status underveis:

```bash
dig +short skurtran.no
dig +short www.skurtran.no
```

### Bør www eller skurtran.no være hovedadressen?

Vi anbefaler `skurtran.no` uten `www` – det er kortere å skrive på en
invitasjon. Både Vercel og Netlify setter automatisk opp videresending fra den
andre varianten, så begge adressene virker uansett. Velg hovedvarianten i
kontrollpanelet (Vercel: «Redirect to» ved siden av domenet. Netlify:
**Domain management → Primary domain**).

---

## Etter publisering

Gå gjennom denne lista før invitasjonene sendes ut:

- [ ] Alle plassholdere i `src/content.js` er byttet ut med ekte innhold
      (navn, dato, sted, program, kontonummer, telefonnumre).
- [ ] `side.url` i `src/content.js` er satt til `https://skurtran.no`.
- [ ] Påmeldingen er koblet til Google Skjema, og et testsvar har kommet inn
      (se [rsvp-google-skjema.md](rsvp-google-skjema.md)).
- [ ] Testsvaret er slettet fra regnearket.
- [ ] Siden er testet på mobil.
- [ ] Lenken er delt i en melding til deg selv, slik at du ser at tittel og
      beskrivelse ser riktig ut.
- [ ] Vurder `side.skjulFraSokemotorer: true` hvis dere ikke vil at siden skal
      dukke opp i Google-søk.

---

## Endre innhold senere

```bash
# 1. Rediger src/content.js
# 2. Se hvordan det ble:
npm start

# 3. Publiser:
git add -A
git commit -m "Oppdater program"
git push
```

Vercel/Netlify bygger og publiserer automatisk innen et minutt etter push.

# Koble påmeldingen til Google Skjema

Påmeldingsskjemaet på nettsiden er vårt eget – det ser ut som resten av siden,
men svarene havner i et Google Skjema dere eier. Da slipper dere både server,
database og månedspris, og dere får svarene rett i et regneark.

Denne oppskriften tar cirka 15 minutter, og gjøres bare én gang.

---

## 1. Lag skjemaet i Google Skjema

Gå til [forms.google.com](https://forms.google.com) og lag et nytt, tomt skjema.
Kall det for eksempel «Påmelding bryllup».

Legg inn nøyaktig disse sju spørsmålene, i denne rekkefølgen:

| # | Spørsmål             | Type i Google Skjema  | Alternativer                                              |
|---|----------------------|-----------------------|-----------------------------------------------------------|
| 1 | Navn                 | Kort svar             | –                                                          |
| 2 | E-post               | Kort svar             | –                                                          |
| 3 | Kommer du?           | Flervalg              | `Ja, jeg kommer` og `Nei, jeg kan dessverre ikke`          |
| 4 | Hvor mange er dere?  | Kort svar             | –                                                          |
| 5 | Allergier            | Avsnitt               | –                                                          |
| 6 | Buss                 | Flervalg              | `Ja, jeg vil sitte på bussen` og `Nei, jeg ordner transport selv` |
| 7 | Melding til oss      | Avsnitt               | –                                                          |

> **Viktig:** Ikke huk av for «Obligatorisk» på noen av spørsmålene i Google
> Skjema. Nettsiden gjør valideringen selv, og et obligatorisk felt i Google
> vil avvise svaret hvis gjesten hopper over det.
>
> Teksten på flervalgs-alternativene må skrives helt likt både her og i
> `src/content.js`. Er det minste avvik – en ekstra mellomrom, stor forbokstav
> – forkaster Google svaret uten å si fra.
>
> Skjemaet trenger bare finnes på norsk. Gjester som ser siden på et annet
> språk, får alternativene oversatt på skjermen, men det er de norske
> verdiene som sendes inn. Oversettelsene endres i `rsvp.alternativer` i
> `src/sprak/`.

---

## 2. Finn skjema-IDen

Trykk **Send** øverst til høyre, velg lenke-ikonet (🔗) og kopier lenken.
Den ser slik ut:

```
https://docs.google.com/forms/d/e/1FAIpQLSd9Xa...lang streng.../viewform
```

Delen mellom `/d/e/` og `/viewform` er skjema-IDen. Lim den inn i
`src/content.js`:

```js
googleSkjema: {
  skjemaId: '1FAIpQLSd9Xa...lang streng...',
```

---

## 3. Finn IDen til hvert spørsmål

Hvert spørsmål i Google Skjema har en intern ID på formen `entry.123456789`.
Slik finner du dem:

1. Åpne forhåndsvisningen av skjemaet (øye-ikonet 👁 øverst).
2. Høyreklikk på siden og velg **Vis kildekode** / **View page source**.
3. Søk i kildekoden (Ctrl+F / Cmd+F) etter `entry.`

Du vil finne treff som ser slik ut:

```
[null,123456789,["Navn"],0,[[987654321,null,0
```

Tallet rett etter spørsmålsteksten – eller i `entry.987654321` – er IDen.
Treffene kommer i samme rekkefølge som spørsmålene i skjemaet.

**Enklere alternativ:** Trykk **Send → lenke → Forhåndsutfyll** (velg
«Få forhåndsutfylt lenke» i trepunktsmenyen ⋮ øverst til høyre). Fyll inn en
tulleverdi i hvert felt, trykk **Få lenke**, og kopier resultatet. Lenken
inneholder da alle IDene i klartekst:

```
...viewform?usp=pp_url&entry.123456789=test&entry.987654321=test@test.no&...
```

Dette er den metoden vi anbefaler – den er mye lettere å lese.

---

## 4. Fyll inn IDene i `src/content.js`

Rekkefølgen i lenken over samsvarer med spørsmålene i skjemaet:

```js
felt: {
  navn: 'entry.123456789',       // spørsmål 1
  epost: 'entry.987654321',      // spørsmål 2
  kommer: 'entry.111111111',     // spørsmål 3
  antall: 'entry.222222222',     // spørsmål 4
  allergier: 'entry.333333333',  // spørsmål 5
  buss: 'entry.444444444',       // spørsmål 6
  melding: 'entry.555555555',    // spørsmål 7
},

svar: {
  kommerJa: 'Ja, jeg kommer',
  kommerNei: 'Nei, jeg kan dessverre ikke',
  bussJa: 'Ja, jeg vil sitte på bussen',
  bussNei: 'Nei, jeg ordner transport selv',
},
```

---

## 5. Test at det virker

Kjør siden lokalt:

```bash
npm start
```

Åpne <http://localhost:3000>, fyll ut påmeldingen og send den inn. Gå deretter
til Google Skjema og trykk **Svar**. Testsvaret skal ligge der.

Husk å slette testsvaret før dere sender ut invitasjonene.

---

## 6. Få svarene i et regneark

I Google Skjema, under **Svar**, trykk på regneark-ikonet for å koble skjemaet
til et Google Regneark. Da kan dere sortere, telle og lage bordkart direkte fra
svarene.

Vil dere ha e-postvarsel for hvert svar: trykk trepunktsmenyen (⋮) under
**Svar** og velg **Få e-postvarsler om nye svar**.

---

## Vanlige problemer

**«Svarene kommer ikke inn.»**
Sjekk at ingen spørsmål i Google Skjema er merket som obligatoriske, og at
skjemaet er åpent for svar (bryteren «Tar imot svar» under **Svar**).

**«Alt kommer inn bortsett fra «Kommer du?».»**
Da stemmer ikke alternativteksten. Kopier teksten rett fra Google Skjema og lim
den inn i `svar`-blokka i `content.js` – ikke skriv den på nytt for hånd.

**«Må gjestene ha Google-konto?»**
Nei, så lenge skjemaet ikke er begrenset til organisasjonen deres. Sjekk under
**Innstillinger → Svar** at «Begrens til brukere i …» er slått av, og at
«Samle inn e-postadresser» er slått **av** (vi spør om e-post selv).

**«Kan noen fylle ut skjemaet flere ganger?»**
Ja, og det er med vilje – gjester som ombestemmer seg kan svare på nytt. Sorter
på tidspunkt i regnearket og bruk det siste svaret per person.

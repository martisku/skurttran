/* ---------------------------------------------------------------------------
 * ALT INNHOLD PÅ NETTSIDEN REDIGERES HER.
 *
 * Du trenger ikke å røre noen andre filer for å endre tekst, datoer, program,
 * transport eller gaveliste. Endre verdiene under, kjør `npm run build`
 * (eller bare push til GitHub hvis du har koblet på Vercel/Netlify), så er
 * siden oppdatert.
 *
 * Alle seksjoner har et `vis`-felt. Sett det til `false` for å skjule
 * seksjonen helt – den forsvinner da også fra menyen.
 *
 * FLERE SPRÅK: Denne fila er bokmålsversjonen, og alt som er felles for alle
 * språk (datoer, telefonnumre, kontonummer, lenker, skjema-IDer) står bare
 * her. Oversettelsene ligger i src/sprak/ og inneholder kun teksten. Endrer du
 * en tekst her, husk å endre den i oversettelsene også.
 * ------------------------------------------------------------------------- */

export const innhold = {
  /* ---------------------------------------------------------------- SIDEN */
  side: {
    domene: 'skurtran.no',
    url: 'https://skurtran.no',
    // Vises i fanen i nettleseren og når lenken deles.
    tittel: 'Kari & Ola – 12. juni 2027',
    beskrivelse:
      'Vi gifter oss! Her finner du all praktisk informasjon om dagen, ' +
      'og her melder du deg på.',
    // Sett til true hvis du ikke vil at siden skal dukke opp i Google.
    skjulFraSokemotorer: false,
    // Bildet som vises når lenken deles i meldinger/sosiale medier.
    // Legg bildet i src/static/ og skriv filnavnet her, f.eks. 'delebilde.jpg'.
    delebilde: '',
  },

  /* ---------------------------------------------------------------- PARET */
  paret: {
    navnEn: 'Kari',
    navnTo: 'Ola',
    // Vises i bunnteksten. La stå tom for å skjule.
    emneknagg: '#kariogola2027',
  },

  /* -------------------------------------------------------------- BRYLLUP */
  bryllup: {
    // Brukes til nedtellingen. Format: ÅÅÅÅ-MM-DDTTT:MM:SS+02:00
    // (+02:00 er norsk sommertid, +01:00 er norsk vintertid.)
    datoISO: '2027-06-12T13:00:00+02:00',
    // Vises som tekst på siden.
    datoTekst: 'Lørdag 12. juni 2027',
    klokkeslett: 'Vielsen starter kl. 13.00',
    sted: 'Skurtran Gård, Trøndelag',
  },

  /* ----------------------------------------------------------------- HERO */
  hero: {
    overtittel: 'Vi gifter oss',
    // Kort setning under navnene.
    ingress: 'Vi vil så gjerne feire dagen sammen med dere.',
    // Teksten på knappen som sender folk til RSVP.
    knapp: 'Meld deg på',
    visNedtelling: true,
  },

  /* -------------------------------------------------------------- VELKOMMEN */
  velkommen: {
    vis: true,
    menytittel: 'Velkommen',
    tittel: 'Velkommen til bryllupet vårt',
    // Hvert element i lista blir et eget avsnitt.
    avsnitt: [
      'Etter mange år sammen har vi endelig bestemt oss for å gjøre det ' +
        'offisielt. Det betyr utrolig mye for oss at nettopp du vil være med ' +
        'på å feire dagen.',
      'På denne siden finner du all praktisk informasjon du trenger: program ' +
        'for dagen, hvordan du kommer deg dit, hvor du kan overnatte og hva ' +
        'vi ønsker oss. Finner du ikke svaret her, er det bare å ta kontakt.',
    ],
    // Valgfritt sitat nederst i seksjonen. La stå tom for å skjule.
    sitat: 'Vi gleder oss til å se dere!',
  },

  /* ------------------------------------------------------------- PROGRAM */
  program: {
    vis: true,
    menytittel: 'Program',
    tittel: 'Program for dagen',
    ingress: 'Slik ser dagen ut. Vi tar forbehold om små justeringer.',
    poster: [
      {
        tid: '12.30',
        tittel: 'Ankomst',
        sted: 'Skurtran kirke',
        tekst: 'Vi ber alle om å være på plass i god tid før vielsen.',
      },
      {
        tid: '13.00',
        tittel: 'Vielse',
        sted: 'Skurtran kirke',
        tekst: 'Seremonien varer omtrent en time.',
      },
      {
        tid: '14.15',
        tittel: 'Mingling og fotografering',
        sted: 'Utenfor kirken',
        tekst: 'Bobler i hagen mens vi tar bilder.',
      },
      {
        tid: '16.00',
        tittel: 'Middag',
        sted: 'Låven på Skurtran Gård',
        tekst: 'Bordplassering henger ved inngangen.',
      },
      {
        tid: '20.00',
        tittel: 'Kaffe, kake og taler',
        sted: 'Låven',
        tekst: 'Ønsker du å holde tale? Gi beskjed til toastmaster.',
      },
      {
        tid: '22.00',
        tittel: 'Fest og dans',
        sted: 'Låven',
        tekst: 'Baren er åpen til 02.00. Siste buss går 01.30.',
      },
    ],
  },

  /* -------------------------------------------------------------- PRAKTISK */
  praktisk: {
    vis: true,
    menytittel: 'Praktisk',
    tittel: 'Praktisk informasjon',
    ingress: 'Det viktigste å vite før du drar hjemmefra.',
    kort: [
      {
        tittel: 'Antrekk',
        tekst:
          'Mørk dress. Vi anbefaler sko du tåler å gå litt i – deler av ' +
          'arrangementet er utendørs på gress.',
      },
      {
        tittel: 'Overnatting',
        tekst:
          'Vi har reservert rom på Skurtran Hotell til redusert pris. ' +
          'Oppgi «Kari & Ola» ved booking innen 1. mai.',
      },
      {
        tittel: 'Barn',
        tekst:
          'Vi elsker barna deres, men har valgt å ha et voksent selskap. ' +
          'Ammende spedbarn er selvsagt hjertelig velkomne.',
      },
      {
        tittel: 'Toastmaster',
        tekst:
          'Per Persen holder i trådene. Kontakt ham på 900 00 000 hvis du ' +
          'vil holde tale eller ha et innslag.',
      },
      {
        tittel: 'Bilder',
        tekst:
          'Vi har egen fotograf under vielsen, og ber om at mobiler legges ' +
          'bort under seremonien. Del gjerne bilder etterpå!',
      },
      {
        tittel: 'Allergier',
        tekst:
          'Gi beskjed om allergier og matpreferanser i påmeldingsskjemaet, ' +
          'så ordner kjøkkenet resten.',
      },
    ],
  },

  /* ------------------------------------------------------------ TRANSPORT */
  transport: {
    vis: true,
    menytittel: 'Transport',
    tittel: 'Slik kommer du deg dit',
    ingress: 'Vi setter opp buss, og det er god plass til å parkere.',
    alternativer: [
      {
        tittel: 'Buss',
        tekst:
          'Felles buss fra Skurtran Hotell kl. 12.00, og retur fra låven ' +
          'kl. 00.30 og 01.30. Bussen er gratis – kryss av i påmeldingen ' +
          'så vi vet hvor mange seter vi trenger.',
      },
      {
        tittel: 'Bil',
        tekst:
          'Det er gratis parkering rett ved låven. Bilen kan stå natten ' +
          'over og hentes dagen etter.',
      },
      {
        tittel: 'Tog og fly',
        tekst:
          'Nærmeste togstasjon er Skurtran stasjon, ti minutter unna med ' +
          'taxi. Nærmeste flyplass er Værnes, omtrent én time med bil.',
      },
      {
        tittel: 'Taxi',
        tekst:
          'Bestill i god tid på kvelden – det er begrenset med biler i ' +
          'området. Lokal taxisentral: 07000.',
      },
    ],
    // Adressen brukes til kart-lenken. La stå tom for å skjule knappen.
    kartAdresse: 'Skurtran Gård, 7500 Stjørdal',
    kartKnapp: 'Åpne i kart',
  },

  /* -------------------------------------------------------------- GAVER */
  gaver: {
    vis: true,
    menytittel: 'Gaveliste',
    tittel: 'Ønskeliste',
    ingress: [
      'Den aller største gaven er at dere kommer. Skulle dere likevel ha lyst ' +
        'til å gi noe, setter vi stor pris på et bidrag til bryllupsreisen.',
    ],
    // Kontonummer/Vipps. La feltene stå tomme for å skjule dem.
    vipps: {
      nummer: '000000',
      tekst: 'Vipps til «Kari & Ola»',
    },
    konto: {
      nummer: '0000.00.00000',
      tekst: 'Bankkonto',
    },
    // Lenker til ønskelister hos butikker o.l. Tom liste skjuler delen.
    lenker: [
      { tittel: 'Ønskeliste hos Christiania Glasmagasin', url: 'https://example.com' },
    ],
  },

  /* --------------------------------------------------------------- RSVP */
  rsvp: {
    vis: true,
    menytittel: 'Påmelding',
    tittel: 'Påmelding',
    ingress: 'Vi trenger svar fra deg innen 1. april 2027.',
    frist: '1. april 2027',
    takketekst: {
      tittel: 'Tusen takk!',
      tekst:
        'Svaret ditt er registrert. Vi gleder oss allerede. Har du glemt noe, ' +
        'er det bare å sende inn skjemaet på nytt.',
    },

    /* ---------------------------------------------------------------------
     * KOBLING MOT GOOGLE SKJEMA
     *
     * Se docs/rsvp-google-skjema.md for en steg-for-steg-oppskrift på hvordan
     * du finner disse verdiene. Kort fortalt:
     *   1. Lag et Google Skjema med spørsmålene under.
     *   2. Åpne skjemaet som gjest, høyreklikk > "Vis kildekode".
     *   3. Søk etter `entry.` for å finne IDen til hvert spørsmål.
     *
     * Så lenge `skjemaId` er tom, viser siden en tydelig melding om at
     * påmeldingen ikke er koblet opp ennå (kun synlig for dere som tester).
     * ------------------------------------------------------------------- */
    googleSkjema: {
      // Den lange IDen i URLen til skjemaet ditt:
      // docs.google.com/forms/d/e/HER_STÅR_IDEN/viewform
      skjemaId: '',

      // IDen til hvert spørsmål i Google Skjema.
      felt: {
        navn: 'entry.0000000000',
        epost: 'entry.0000000001',
        kommer: 'entry.0000000002',
        antall: 'entry.0000000003',
        allergier: 'entry.0000000004',
        buss: 'entry.0000000005',
        melding: 'entry.0000000006',
      },

      // Disse tekstene MÅ være nøyaktig like alternativene i Google Skjema,
      // ellers blir svaret forkastet av Google. De sendes alltid på norsk;
      // på andre språk vises teksten fra `rsvp.alternativer` i src/sprak/.
      svar: {
        kommerJa: 'Ja, jeg kommer',
        kommerNei: 'Nei, jeg kan dessverre ikke',
        bussJa: 'Ja, jeg vil sitte på bussen',
        bussNei: 'Nei, jeg ordner transport selv',
      },
    },
  },

  /* ---------------------------------------------------------------- FAQ */
  faq: {
    vis: true,
    menytittel: 'Spørsmål',
    tittel: 'Ofte stilte spørsmål',
    sporsmal: [
      {
        sporsmal: 'Kan jeg ta med følge?',
        svar:
          'Invitasjonen gjelder for de som står navngitt i den. Er du usikker, ' +
          'er det bare å spørre oss.',
      },
      {
        sporsmal: 'Når må jeg svare?',
        svar: 'Vi trenger svar innen 1. april 2027 av hensyn til kjøkkenet.',
      },
      {
        sporsmal: 'Kan jeg holde tale?',
        svar:
          'Ja! Ta kontakt med toastmaster i god tid, så setter han opp ' +
          'rekkefølgen.',
      },
      {
        sporsmal: 'Hva gjør jeg hvis planene endrer seg?',
        svar:
          'Send oss en melding så fort du vet det. Det er helt uproblematisk ' +
          'så lenge vi får beskjed i god tid.',
      },
    ],
  },

  /* ------------------------------------------------------------- KONTAKT */
  kontakt: {
    vis: true,
    menytittel: 'Kontakt',
    tittel: 'Har du spørsmål?',
    ingress: 'Ta gjerne kontakt med en av oss.',
    personer: [
      { navn: 'Kari', rolle: 'Brud', telefon: '900 00 000', epost: 'kari@example.com' },
      { navn: 'Ola', rolle: 'Brudgom', telefon: '900 00 001', epost: 'ola@example.com' },
      { navn: 'Per Persen', rolle: 'Toastmaster', telefon: '900 00 002', epost: '' },
    ],
  },

  /* ------------------------------------------------------------ SMÅTEKSTER */
  // Knapper, skjemaetiketter, feilmeldinger og annen tekst rundt innholdet.
  ui: {
    hoppTilInnhold: 'Hopp til innhold',
    meny: 'Meny',
    hovedmeny: 'Hovedmeny',
    sprakvalg: 'Velg språk',
    nedtelling: {
      dager: 'dager',
      timer: 'timer',
      minutter: 'minutter',
      sekunder: 'sekunder',
      ferdig: 'I dag er dagen! Vi gleder oss til å se dere.',
    },
    skjema: {
      navn: 'Navn',
      navnFeil: 'Fyll inn navnet ditt.',
      epost: 'E-post',
      epostFeil: 'Fyll inn en gyldig e-postadresse.',
      kommer: 'Kommer du?',
      kommerFeil: 'Velg ett alternativ.',
      antall: 'Hvor mange er dere?',
      allergier: 'Allergier eller matpreferanser',
      allergierHjelp: 'F.eks. nøtteallergi, vegetar, glutenfri',
      buss: 'Vil du sitte på bussen?',
      melding: 'Melding til oss',
      meldingHjelp: 'Sangønske, taleønske eller bare en hilsen',
      send: 'Send påmelding',
      sender: 'Sender …',
      svarfrist: 'Svarfrist:',
      sjekkFelt: 'Se over feltene som er merket.',
      ikkeKoblet: 'Påmeldingen er ikke koblet opp ennå, så svaret ble ikke sendt.',
      sendIgjen: 'Send inn et svar til',
      skjultMottaker: 'Skjult mottaker for påmelding',
    },
  },
}

export default innhold

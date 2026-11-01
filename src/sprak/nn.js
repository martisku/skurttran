/* ---------------------------------------------------------------------------
 * NYNORSK
 *
 * Berre teksten står her. Alt anna (datoar, telefonnummer, lenker, kontonummer,
 * skjema-ID-ar) blir henta frå src/content.js. Manglar ein tekst her, blir
 * bokmålsteksten vist i staden. Sjå src/sprak/index.js for korleis det verkar.
 * ------------------------------------------------------------------------- */

export default {
  side: {
    tittel: 'Kari & Ola – 12. juni 2027',
    beskrivelse:
      'Vi giftar oss! Her finn du all praktisk informasjon om dagen, ' +
      'og her melder du deg på.',
  },

  bryllup: {
    datoTekst: 'Laurdag 12. juni 2027',
    klokkeslett: 'Vigsla startar kl. 13.00',
    sted: 'Skurtran Gard, Trøndelag',
  },

  hero: {
    overtittel: 'Vi giftar oss',
    ingress: 'Vi vil så gjerne feire dagen saman med dykk.',
    knapp: 'Meld deg på',
  },

  velkommen: {
    menytittel: 'Velkomen',
    tittel: 'Velkomen til bryllaupet vårt',
    avsnitt: [
      'Etter mange år saman har vi endeleg bestemt oss for å gjere det ' +
        'offisielt. Det betyr utruleg mykje for oss at nettopp du vil vere med ' +
        'og feire dagen.',
      'På denne sida finn du all praktisk informasjon du treng: program ' +
        'for dagen, korleis du kjem deg dit, kvar du kan overnatte og kva ' +
        'vi ønskjer oss. Finn du ikkje svaret her, er det berre å ta kontakt.',
    ],
    sitat: 'Vi gler oss til å sjå dykk!',
  },

  program: {
    menytittel: 'Program',
    tittel: 'Program for dagen',
    ingress: 'Slik ser dagen ut. Vi tek atterhald om små justeringar.',
    poster: [
      {
        tittel: 'Kome fram',
        sted: 'Skurtran kyrkje',
        tekst: 'Vi ber alle om å vere på plass i god tid før vigsla.',
      },
      {
        tittel: 'Vigsle',
        sted: 'Skurtran kyrkje',
        tekst: 'Seremonien varer omtrent ein time.',
      },
      {
        tittel: 'Mingling og fotografering',
        sted: 'Utanfor kyrkja',
        tekst: 'Bobler i hagen medan vi tek bilete.',
      },
      {
        tittel: 'Middag',
        sted: 'Låven på Skurtran Gard',
        tekst: 'Bordplasseringa heng ved inngangen.',
      },
      {
        tittel: 'Kaffi, kake og talar',
        sted: 'Låven',
        tekst: 'Ønskjer du å halde tale? Gje beskjed til toastmaster.',
      },
      {
        tittel: 'Fest og dans',
        sted: 'Låven',
        tekst: 'Baren er open til 02.00. Siste buss går 01.30.',
      },
    ],
  },

  praktisk: {
    menytittel: 'Praktisk',
    tittel: 'Praktisk informasjon',
    ingress: 'Det viktigaste å vite før du dreg heimanfrå.',
    kort: [
      {
        tittel: 'Antrekk',
        tekst:
          'Mørk dress. Vi tilrår sko du toler å gå litt i – delar av ' +
          'arrangementet er utandørs på gras.',
      },
      {
        tittel: 'Overnatting',
        tekst:
          'Vi har reservert rom på Skurtran Hotell til redusert pris. ' +
          'Oppgje «Kari & Ola» ved bestilling innan 1. mai.',
      },
      {
        tittel: 'Born',
        tekst:
          'Vi elskar borna dykkar, men har valt å ha eit vakse selskap. ' +
          'Ammande spedborn er sjølvsagt hjarteleg velkomne.',
      },
      {
        tittel: 'Toastmaster',
        tekst:
          'Per Persen held i trådane. Kontakt han på 900 00 000 om du ' +
          'vil halde tale eller ha eit innslag.',
      },
      {
        tittel: 'Bilete',
        tekst:
          'Vi har eigen fotograf under vigsla, og ber om at mobilane blir lagde ' +
          'bort under seremonien. Del gjerne bilete etterpå!',
      },
      {
        tittel: 'Allergiar',
        tekst:
          'Gje beskjed om allergiar og matpreferansar i påmeldingsskjemaet, ' +
          'så ordnar kjøkkenet resten.',
      },
    ],
  },

  transport: {
    menytittel: 'Transport',
    tittel: 'Slik kjem du deg dit',
    ingress: 'Vi set opp buss, og det er god plass til å parkere.',
    alternativer: [
      {
        tittel: 'Buss',
        tekst:
          'Felles buss frå Skurtran Hotell kl. 12.00, og retur frå låven ' +
          'kl. 00.30 og 01.30. Bussen er gratis – kryss av i påmeldinga ' +
          'så vi veit kor mange sete vi treng.',
      },
      {
        tittel: 'Bil',
        tekst:
          'Det er gratis parkering rett ved låven. Bilen kan stå natta ' +
          'over og bli henta dagen etter.',
      },
      {
        tittel: 'Tog og fly',
        tekst:
          'Næraste togstasjon er Skurtran stasjon, ti minutt unna med ' +
          'taxi. Næraste flyplass er Værnes, omtrent ein time med bil.',
      },
      {
        tittel: 'Taxi',
        tekst:
          'Bestill i god tid på kvelden – det er avgrensa med bilar i ' +
          'området. Lokal taxisentral: 07000.',
      },
    ],
    kartKnapp: 'Opne i kart',
  },

  gaver: {
    menytittel: 'Gåveliste',
    tittel: 'Ønskjeliste',
    ingress: [
      'Den aller største gåva er at de kjem. Skulle de likevel ha lyst ' +
        'til å gje noko, set vi stor pris på eit bidrag til bryllaupsreisa.',
    ],
    vipps: { tekst: 'Vipps til «Kari & Ola»' },
    konto: { tekst: 'Bankkonto' },
    lenker: [{ tittel: 'Ønskjeliste hos Christiania Glasmagasin' }],
  },

  rsvp: {
    menytittel: 'Påmelding',
    tittel: 'Påmelding',
    ingress: 'Vi treng svar frå deg innan 1. april 2027.',
    frist: '1. april 2027',
    takketekst: {
      tittel: 'Tusen takk!',
      tekst:
        'Svaret ditt er registrert. Vi gler oss allereie. Har du gløymt noko, ' +
        'er det berre å sende inn skjemaet på nytt.',
    },
    // Det gjesten ser. Det som blir sendt til Google Skjema, er alltid
    // bokmålsverdiane i content.js.
    alternativer: {
      kommerJa: 'Ja, eg kjem',
      kommerNei: 'Nei, eg kan dessverre ikkje',
      bussJa: 'Ja, eg vil sitje på bussen',
      bussNei: 'Nei, eg ordnar transport sjølv',
    },
  },

  faq: {
    menytittel: 'Spørsmål',
    tittel: 'Ofte stilte spørsmål',
    sporsmal: [
      {
        sporsmal: 'Kan eg ta med følgje?',
        svar:
          'Invitasjonen gjeld for dei som står namngitt i han. Er du usikker, ' +
          'er det berre å spørje oss.',
      },
      {
        sporsmal: 'Når må eg svare?',
        svar: 'Vi treng svar innan 1. april 2027 av omsyn til kjøkkenet.',
      },
      {
        sporsmal: 'Kan eg halde tale?',
        svar:
          'Ja! Ta kontakt med toastmaster i god tid, så set han opp ' +
          'rekkjefølgja.',
      },
      {
        sporsmal: 'Kva gjer eg om planane endrar seg?',
        svar:
          'Send oss ei melding så fort du veit det. Det er heilt uproblematisk ' +
          'så lenge vi får beskjed i god tid.',
      },
    ],
  },

  kontakt: {
    menytittel: 'Kontakt',
    tittel: 'Har du spørsmål?',
    ingress: 'Ta gjerne kontakt med ein av oss.',
    personer: [{ rolle: 'Brur' }, { rolle: 'Brudgom' }, { rolle: 'Toastmaster' }],
  },

  ui: {
    hoppTilInnhold: 'Hopp til innhaldet',
    meny: 'Meny',
    hovedmeny: 'Hovudmeny',
    sprakvalg: 'Vel språk',
    nedtelling: {
      dager: 'dagar',
      timer: 'timar',
      minutter: 'minutt',
      sekunder: 'sekund',
      ferdig: 'I dag er dagen! Vi gler oss til å sjå dykk.',
    },
    skjema: {
      navn: 'Namn',
      navnFeil: 'Fyll inn namnet ditt.',
      epost: 'E-post',
      epostFeil: 'Fyll inn ei gyldig e-postadresse.',
      kommer: 'Kjem du?',
      kommerFeil: 'Vel eitt alternativ.',
      antall: 'Kor mange er de?',
      allergier: 'Allergiar eller matpreferansar',
      allergierHjelp: 'T.d. nøtteallergi, vegetar, glutenfri',
      buss: 'Vil du sitje på bussen?',
      melding: 'Melding til oss',
      meldingHjelp: 'Songønske, taleønske eller berre ei helsing',
      send: 'Send påmelding',
      sender: 'Sender …',
      svarfrist: 'Svarfrist:',
      sjekkFelt: 'Sjå over felta som er merkte.',
      ikkeKoblet: 'Påmeldinga er ikkje kopla opp enno, så svaret vart ikkje sendt.',
      sendIgjen: 'Send inn eit svar til',
      skjultMottaker: 'Skjult mottakar for påmelding',
    },
  },
}

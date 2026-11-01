/* ---------------------------------------------------------------------------
 * ENGELSK
 *
 * Kun teksten står her. Alt annet (datoer, telefonnumre, lenker, kontonummer,
 * skjema-IDer) hentes fra src/content.js. Mangler en tekst her, vises
 * bokmålsteksten i stedet. Se src/sprak/index.js for hvordan det virker.
 * ------------------------------------------------------------------------- */

export default {
  side: {
    tittel: 'Kari & Ola – 12 June 2027',
    beskrivelse:
      "We're getting married! Here you'll find everything you need to know " +
      'about the day, and this is where you RSVP.',
  },

  bryllup: {
    datoTekst: 'Saturday 12 June 2027',
    klokkeslett: 'The ceremony begins at 1 pm',
    sted: 'Skurtran Farm, Trøndelag, Norway',
  },

  hero: {
    overtittel: "We're getting married",
    ingress: "We'd love to celebrate the day with you.",
    knapp: 'RSVP',
  },

  velkommen: {
    menytittel: 'Welcome',
    tittel: 'Welcome to our wedding',
    avsnitt: [
      "After many years together, we've finally decided to make it official. " +
        'It means the world to us that you want to celebrate the day with us.',
      "On this page you'll find all the practical information you need: the " +
        'programme for the day, how to get there, where to stay and what we ' +
        "would like as gifts. If you can't find the answer here, just get in touch.",
    ],
    sitat: "We can't wait to see you!",
  },

  program: {
    menytittel: 'Programme',
    tittel: 'Programme for the day',
    ingress: 'This is the plan for the day. Times may change slightly.',
    poster: [
      {
        tittel: 'Arrival',
        sted: 'Skurtran Church',
        tekst: 'Please arrive in good time before the ceremony.',
      },
      {
        tittel: 'Ceremony',
        sted: 'Skurtran Church',
        tekst: 'The ceremony lasts about an hour.',
      },
      {
        tittel: 'Drinks and photos',
        sted: 'Outside the church',
        tekst: 'Bubbles in the garden while we take photos.',
      },
      {
        tittel: 'Dinner',
        sted: 'The barn at Skurtran Farm',
        tekst: 'The seating plan is by the entrance.',
      },
      {
        tittel: 'Coffee, cake and speeches',
        sted: 'The barn',
        tekst: 'Would you like to give a speech? Let the toastmaster know.',
      },
      {
        tittel: 'Party and dancing',
        sted: 'The barn',
        tekst: 'The bar is open until 2 am. The last bus leaves at 1:30 am.',
      },
    ],
  },

  praktisk: {
    menytittel: 'Info',
    tittel: 'Practical information',
    ingress: 'The most important things to know before you leave home.',
    kort: [
      {
        tittel: 'Dress code',
        tekst:
          'Dark suit. We recommend shoes you can walk in – parts of the day ' +
          'are outdoors on grass.',
      },
      {
        tittel: 'Accommodation',
        tekst:
          "We've reserved rooms at Skurtran Hotel at a reduced rate. " +
          'Mention "Kari & Ola" when booking before 1 May.',
      },
      {
        tittel: 'Children',
        tekst:
          "We love your children, but we've chosen to make this an adults-only " +
          'celebration. Nursing babies are of course very welcome.',
      },
      {
        tittel: 'Toastmaster',
        tekst:
          'Per Persen is in charge of the evening. Call him on +47 900 00 000 ' +
          "if you'd like to give a speech or perform.",
      },
      {
        tittel: 'Photos',
        tekst:
          'We have our own photographer for the ceremony, and ask that you put ' +
          'your phone away during it. Feel free to share photos afterwards!',
      },
      {
        tittel: 'Allergies',
        tekst:
          'Let us know about allergies and dietary needs in the RSVP form, ' +
          'and the kitchen will take care of the rest.',
      },
    ],
  },

  transport: {
    menytittel: 'Travel',
    tittel: 'Getting there',
    ingress: "We're arranging a bus, and there's plenty of parking.",
    alternativer: [
      {
        tittel: 'Bus',
        tekst:
          'A shared bus leaves Skurtran Hotel at 12 noon, and returns from the ' +
          'barn at 12:30 am and 1:30 am. The bus is free – tick the box in the ' +
          'RSVP form so we know how many seats we need.',
      },
      {
        tittel: 'Car',
        tekst:
          'There is free parking right by the barn. You can leave your car ' +
          'overnight and pick it up the next day.',
      },
      {
        tittel: 'Train and plane',
        tekst:
          'The nearest train station is Skurtran Station, ten minutes away by ' +
          'taxi. The nearest airport is Trondheim Airport Værnes, about an hour by car.',
      },
      {
        tittel: 'Taxi',
        tekst:
          'Book early in the evening – there are only a few taxis in the area. ' +
          'Local taxi service: +47 07000.',
      },
    ],
    kartKnapp: 'Open in maps',
  },

  gaver: {
    menytittel: 'Gifts',
    tittel: 'Wish list',
    ingress: [
      'Having you there is the greatest gift of all. If you would still like ' +
        'to give something, a contribution to our honeymoon would be much appreciated.',
    ],
    vipps: { tekst: 'Vipps to "Kari & Ola"' },
    konto: { tekst: 'Bank account' },
    lenker: [{ tittel: 'Wish list at Christiania Glasmagasin' }],
  },

  rsvp: {
    menytittel: 'RSVP',
    tittel: 'RSVP',
    ingress: 'Please reply by 1 April 2027.',
    frist: '1 April 2027',
    takketekst: {
      tittel: 'Thank you!',
      tekst:
        "We've received your reply and are already looking forward to it. If " +
        'you forgot something, just send the form again.',
    },
    // What the guest sees. What is sent to Google Forms is always the
    // Norwegian values in content.js.
    alternativer: {
      kommerJa: "Yes, I'll be there",
      kommerNei: "No, unfortunately I can't make it",
      bussJa: "Yes, I'd like a seat on the bus",
      bussNei: "No, I'll arrange my own transport",
    },
  },

  faq: {
    menytittel: 'FAQ',
    tittel: 'Frequently asked questions',
    sporsmal: [
      {
        sporsmal: 'Can I bring a plus-one?',
        svar:
          "The invitation is for the people named on it. If you're unsure, " +
          'just ask us.',
      },
      {
        sporsmal: 'When do I need to reply?',
        svar: 'We need your reply by 1 April 2027 so we can plan the catering.',
      },
      {
        sporsmal: 'Can I give a speech?',
        svar:
          'Yes! Contact the toastmaster in good time, and he will put you on ' +
          'the list.',
      },
      {
        sporsmal: 'What if my plans change?',
        svar:
          "Send us a message as soon as you know. It's no problem at all as " +
          'long as you let us know in good time.',
      },
    ],
  },

  kontakt: {
    menytittel: 'Contact',
    tittel: 'Any questions?',
    ingress: 'Feel free to contact either of us.',
    personer: [{ rolle: 'Bride' }, { rolle: 'Groom' }, { rolle: 'Toastmaster' }],
  },

  ui: {
    hoppTilInnhold: 'Skip to content',
    meny: 'Menu',
    hovedmeny: 'Main menu',
    sprakvalg: 'Choose language',
    nedtelling: {
      dager: 'days',
      timer: 'hours',
      minutter: 'minutes',
      sekunder: 'seconds',
      ferdig: "Today's the day! We can't wait to see you.",
    },
    skjema: {
      navn: 'Name',
      navnFeil: 'Please enter your name.',
      epost: 'Email',
      epostFeil: 'Please enter a valid email address.',
      kommer: 'Will you be coming?',
      kommerFeil: 'Please choose an option.',
      antall: 'How many of you are coming?',
      allergier: 'Allergies or dietary requirements',
      allergierHjelp: 'E.g. nut allergy, vegetarian, gluten-free',
      buss: 'Would you like a seat on the bus?',
      melding: 'Message to us',
      meldingHjelp: 'A song request, a speech, or just a hello',
      send: 'Send RSVP',
      sender: 'Sending …',
      svarfrist: 'Reply by:',
      sjekkFelt: 'Please check the highlighted fields.',
      ikkeKoblet: "The RSVP form isn't connected yet, so your reply was not sent.",
      sendIgjen: 'Send another reply',
      skjultMottaker: 'Hidden receiver for the RSVP form',
    },
  },
}

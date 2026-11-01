/* ---------------------------------------------------------------------------
 * Genererer HTML-siden ut fra innholdet i src/content.js.
 *
 * Du trenger normalt ikke å endre noe her – all tekst ligger i content.js
 * (bokmål) og src/sprak/ (oversettelsene).
 *
 * Alle språkene havner i én og samme index.html: standardspråket som vanlig
 * HTML, de andre ferdig rendret i <template>-elementer som main.js bytter inn.
 * ------------------------------------------------------------------------- */

/** Escaper tekst som skal settes inn i HTML. */
const e = (verdi) =>
  String(verdi ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')

/** Fjerner tomme innslag slik at tomme lister ikke lager tomme elementer. */
const liste = (verdi) => (Array.isArray(verdi) ? verdi.filter(Boolean) : [])

/** Enkel sjekk på om en tekstverdi faktisk er fylt ut. */
const satt = (verdi) => typeof verdi === 'string' && verdi.trim() !== ''

/* ------------------------------------------------------------------ SEKSJONER */

const seksjonVelkommen = (d) => `
<section class="seksjon seksjon--smal" id="velkommen">
  <div class="innhold">
    <p class="seksjon__merkelapp reveal">${e(d.menytittel)}</p>
    <h2 class="seksjon__tittel reveal">${e(d.tittel)}</h2>
    <div class="brodtekst reveal">
      ${liste(d.avsnitt).map((a) => `<p>${e(a)}</p>`).join('\n      ')}
    </div>
    ${satt(d.sitat) ? `<p class="sitat reveal">${e(d.sitat)}</p>` : ''}
  </div>
</section>`

const seksjonProgram = (d) => `
<section class="seksjon" id="program">
  <div class="innhold">
    <p class="seksjon__merkelapp reveal">${e(d.menytittel)}</p>
    <h2 class="seksjon__tittel reveal">${e(d.tittel)}</h2>
    ${satt(d.ingress) ? `<p class="seksjon__ingress reveal">${e(d.ingress)}</p>` : ''}
    <ol class="tidslinje">
      ${liste(d.poster)
        .map(
          (post) => `<li class="tidslinje__post reveal">
        <div class="tidslinje__tid">${e(post.tid)}</div>
        <div class="tidslinje__tekst">
          <h3>${e(post.tittel)}</h3>
          ${satt(post.sted) ? `<p class="tidslinje__sted">${e(post.sted)}</p>` : ''}
          ${satt(post.tekst) ? `<p>${e(post.tekst)}</p>` : ''}
        </div>
      </li>`,
        )
        .join('\n      ')}
    </ol>
  </div>
</section>`

const seksjonPraktisk = (d) => `
<section class="seksjon seksjon--tonet" id="praktisk">
  <div class="innhold">
    <p class="seksjon__merkelapp reveal">${e(d.menytittel)}</p>
    <h2 class="seksjon__tittel reveal">${e(d.tittel)}</h2>
    ${satt(d.ingress) ? `<p class="seksjon__ingress reveal">${e(d.ingress)}</p>` : ''}
    <div class="kortrutenett">
      ${liste(d.kort)
        .map(
          (kort) => `<article class="kort reveal">
        <h3>${e(kort.tittel)}</h3>
        <p>${e(kort.tekst)}</p>
      </article>`,
        )
        .join('\n      ')}
    </div>
  </div>
</section>`

const seksjonTransport = (d) => {
  const kartUrl = satt(d.kartAdresse)
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(d.kartAdresse)}`
    : ''
  return `
<section class="seksjon" id="transport">
  <div class="innhold">
    <p class="seksjon__merkelapp reveal">${e(d.menytittel)}</p>
    <h2 class="seksjon__tittel reveal">${e(d.tittel)}</h2>
    ${satt(d.ingress) ? `<p class="seksjon__ingress reveal">${e(d.ingress)}</p>` : ''}
    <div class="kortrutenett kortrutenett--to">
      ${liste(d.alternativer)
        .map(
          (alt) => `<article class="kort reveal">
        <h3>${e(alt.tittel)}</h3>
        <p>${e(alt.tekst)}</p>
      </article>`,
        )
        .join('\n      ')}
    </div>
    ${
      kartUrl
        ? `<p class="midtstilt reveal">
      <a class="knapp knapp--sekundar" href="${e(kartUrl)}" target="_blank" rel="noopener">
        ${e(d.kartKnapp || 'Åpne i kart')}
      </a>
      <span class="adresse">${e(d.kartAdresse)}</span>
    </p>`
        : ''
    }
  </div>
</section>`
}

const seksjonGaver = (d) => {
  const harVipps = satt(d.vipps?.nummer)
  const harKonto = satt(d.konto?.nummer)
  const lenker = liste(d.lenker).filter((l) => satt(l.url) && satt(l.tittel))
  return `
<section class="seksjon seksjon--tonet seksjon--smal" id="gaver">
  <div class="innhold">
    <p class="seksjon__merkelapp reveal">${e(d.menytittel)}</p>
    <h2 class="seksjon__tittel reveal">${e(d.tittel)}</h2>
    <div class="brodtekst reveal">
      ${liste(d.ingress).map((a) => `<p>${e(a)}</p>`).join('\n      ')}
    </div>
    ${
      harVipps || harKonto
        ? `<div class="betaling reveal">
      ${
        harVipps
          ? `<div class="betaling__post">
        <span class="betaling__merkelapp">${e(d.vipps.tekst || 'Vipps')}</span>
        <span class="betaling__verdi">${e(d.vipps.nummer)}</span>
      </div>`
          : ''
      }
      ${
        harKonto
          ? `<div class="betaling__post">
        <span class="betaling__merkelapp">${e(d.konto.tekst || 'Kontonummer')}</span>
        <span class="betaling__verdi">${e(d.konto.nummer)}</span>
      </div>`
          : ''
      }
    </div>`
        : ''
    }
    ${
      lenker.length
        ? `<ul class="lenkeliste reveal">
      ${lenker
        .map(
          (l) =>
            `<li><a href="${e(l.url)}" target="_blank" rel="noopener">${e(l.tittel)}</a></li>`,
        )
        .join('\n      ')}
    </ul>`
        : ''
    }
  </div>
</section>`
}

const seksjonRsvp = (d, ui) => {
  const g = d.googleSkjema || {}
  const felt = g.felt || {}
  const svar = g.svar || {}
  // Verdiene som sendes er alltid de fra Google Skjema; teksten gjesten ser
  // kan være oversatt.
  const vis = { ...svar, ...(d.alternativer || {}) }
  const t = ui.skjema || {}
  const koblet = satt(g.skjemaId)
  const handling = koblet
    ? `https://docs.google.com/forms/d/e/${g.skjemaId}/formResponse`
    : ''

  return `
<section class="seksjon" id="rsvp">
  <div class="innhold innhold--smal">
    <p class="seksjon__merkelapp reveal">${e(d.menytittel)}</p>
    <h2 class="seksjon__tittel reveal">${e(d.tittel)}</h2>
    ${satt(d.ingress) ? `<p class="seksjon__ingress reveal">${e(d.ingress)}</p>` : ''}

    ${
      koblet
        ? ''
        : `<p class="varsel" role="status">
      <strong>Påmeldingen er ikke koblet til Google Skjema ennå.</strong>
      Fyll inn <code>skjemaId</code> og felt-IDene i <code>src/content.js</code>.
      Oppskrift ligger i <code>docs/rsvp-google-skjema.md</code>.
    </p>`
    }

    <form
      class="skjema reveal"
      id="rsvp-skjema"
      method="post"
      action="${e(handling)}"
      target="rsvp-mottaker"
      data-koblet="${koblet ? 'ja' : 'nei'}"
      data-kommer-ja="${e(svar.kommerJa || '')}"
      data-tekst-sjekk-felt="${e(t.sjekkFelt)}"
      data-tekst-ikke-koblet="${e(t.ikkeKoblet)}"
      data-tekst-sender="${e(t.sender)}"
      novalidate
    >
      <div class="skjema__felt">
        <label for="rsvp-navn">${e(t.navn)} <span aria-hidden="true">*</span></label>
        <input id="rsvp-navn" name="${e(felt.navn || '')}" type="text"
               autocomplete="name" required />
        <p class="skjema__feil" data-feil-for="rsvp-navn" hidden>${e(t.navnFeil)}</p>
      </div>

      <div class="skjema__felt">
        <label for="rsvp-epost">${e(t.epost)} <span aria-hidden="true">*</span></label>
        <input id="rsvp-epost" name="${e(felt.epost || '')}" type="email"
               autocomplete="email" required />
        <p class="skjema__feil" data-feil-for="rsvp-epost" hidden>${e(t.epostFeil)}</p>
      </div>

      <fieldset class="skjema__felt">
        <legend>${e(t.kommer)} <span aria-hidden="true">*</span></legend>
        <div class="valg">
          <label class="valg__alternativ">
            <input type="radio" name="${e(felt.kommer || '')}" id="rsvp-kommer-ja"
                   value="${e(svar.kommerJa || '')}" required />
            <span>${e(vis.kommerJa || 'Ja, jeg kommer')}</span>
          </label>
          <label class="valg__alternativ">
            <input type="radio" name="${e(felt.kommer || '')}" id="rsvp-kommer-nei"
                   value="${e(svar.kommerNei || '')}" />
            <span>${e(vis.kommerNei || 'Nei, jeg kan dessverre ikke')}</span>
          </label>
        </div>
        <p class="skjema__feil" data-feil-for="rsvp-kommer-ja" hidden>${e(t.kommerFeil)}</p>
      </fieldset>

      <div class="skjema__betinget" data-vis-nar-kommer>
        <div class="skjema__felt">
          <label for="rsvp-antall">${e(t.antall)}</label>
          <input id="rsvp-antall" name="${e(felt.antall || '')}" type="number"
                 min="1" max="10" step="1" value="1" inputmode="numeric" />
        </div>

        <div class="skjema__felt">
          <label for="rsvp-allergier">${e(t.allergier)}</label>
          <textarea id="rsvp-allergier" name="${e(felt.allergier || '')}" rows="2"
                    placeholder="${e(t.allergierHjelp)}"></textarea>
        </div>

        <fieldset class="skjema__felt">
          <legend>${e(t.buss)}</legend>
          <div class="valg">
            <label class="valg__alternativ">
              <input type="radio" name="${e(felt.buss || '')}" value="${e(svar.bussJa || '')}" />
              <span>${e(vis.bussJa || 'Ja')}</span>
            </label>
            <label class="valg__alternativ">
              <input type="radio" name="${e(felt.buss || '')}" value="${e(svar.bussNei || '')}" />
              <span>${e(vis.bussNei || 'Nei')}</span>
            </label>
          </div>
        </fieldset>
      </div>

      <div class="skjema__felt">
        <label for="rsvp-melding">${e(t.melding)}</label>
        <textarea id="rsvp-melding" name="${e(felt.melding || '')}" rows="3"
                  placeholder="${e(t.meldingHjelp)}"></textarea>
      </div>

      <button class="knapp knapp--primar" type="submit">${e(t.send)}</button>
      <p class="skjema__status" role="status" aria-live="polite"></p>
      ${satt(d.frist) ? `<p class="skjema__frist">${e(t.svarfrist)} ${e(d.frist)}</p>` : ''}
    </form>

    <div class="takk" id="rsvp-takk" hidden>
      <h3>${e(d.takketekst?.tittel || 'Tusen takk!')}</h3>
      <p>${e(d.takketekst?.tekst || '')}</p>
      <button class="knapp knapp--sekundar" type="button" id="rsvp-igjen">
        ${e(t.sendIgjen)}
      </button>
    </div>

    <iframe name="rsvp-mottaker" title="${e(t.skjultMottaker)}"
            class="skjult-ramme" aria-hidden="true" tabindex="-1"></iframe>
  </div>
</section>`
}

const seksjonFaq = (d) => `
<section class="seksjon seksjon--tonet seksjon--smal" id="faq">
  <div class="innhold innhold--smal">
    <p class="seksjon__merkelapp reveal">${e(d.menytittel)}</p>
    <h2 class="seksjon__tittel reveal">${e(d.tittel)}</h2>
    <div class="faq">
      ${liste(d.sporsmal)
        .map(
          (post) => `<details class="faq__post reveal">
        <summary>${e(post.sporsmal)}</summary>
        <p>${e(post.svar)}</p>
      </details>`,
        )
        .join('\n      ')}
    </div>
  </div>
</section>`

const seksjonKontakt = (d) => `
<section class="seksjon" id="kontakt">
  <div class="innhold">
    <p class="seksjon__merkelapp reveal">${e(d.menytittel)}</p>
    <h2 class="seksjon__tittel reveal">${e(d.tittel)}</h2>
    ${satt(d.ingress) ? `<p class="seksjon__ingress reveal">${e(d.ingress)}</p>` : ''}
    <div class="kortrutenett kortrutenett--tre">
      ${liste(d.personer)
        .map(
          (p) => `<article class="kort kort--midtstilt reveal">
        <h3>${e(p.navn)}</h3>
        ${satt(p.rolle) ? `<p class="kort__rolle">${e(p.rolle)}</p>` : ''}
        ${
          satt(p.telefon)
            ? `<p><a href="tel:${e(p.telefon.replace(/\s/g, ''))}">${e(p.telefon)}</a></p>`
            : ''
        }
        ${satt(p.epost) ? `<p><a href="mailto:${e(p.epost)}">${e(p.epost)}</a></p>` : ''}
      </article>`,
        )
        .join('\n      ')}
    </div>
  </div>
</section>`

/* ------------------------------------------------------------- SPRÅKVALG */

const sprakvelger = (sprakListe, aktiv, ui) => `
    <nav class="sprakvalg" aria-label="${e(ui.sprakvalg)}">
      <ul>
        ${sprakListe
          .map(
            (s) => `<li><a class="sprakvalg__lenke" href="?lang=${e(s.kode)}" hreflang="${e(s.kode)}"
               lang="${e(s.kode)}" aria-label="${e(s.navn)}" title="${e(s.navn)}"
               data-velg-sprak="${e(s.kode)}"${s.kode === aktiv ? ' aria-current="true"' : ''}>${e(s.kort)}</a></li>`,
          )
          .join('\n        ')}
      </ul>
    </nav>`

/* Kjører i <head> før siden vises, og bestemmer språket:
     1. ?lang=xx i lenken
     2. det gjesten valgte sist (lagret i nettleseren)
     3. nettleserens språk ved første besøk
   Er det noe annet enn standardspråket, skjules siden til main.js har byttet
   inn riktig språk, så man slipper å se bokmål blinke forbi. */
const sprakskript = (sprakListe) => {
  const koder = JSON.stringify(sprakListe.map((s) => s.kode))
  const standard = JSON.stringify(sprakListe[0].kode)
  return `<script>
(function () {
  var d = document.documentElement, koder = ${koder}, valgt = null, n = 'skurtran-sprak'
  d.classList.add('har-js')
  var gyldig = function (k) { return koder.indexOf(k) > -1 ? k : null }
  try { valgt = gyldig(new URLSearchParams(location.search).get('lang')) } catch (x) {}
  if (!valgt) try { valgt = gyldig(localStorage.getItem(n)) } catch (x) {}
  if (!valgt) {
    var liste = navigator.languages || [navigator.language || '']
    for (var i = 0; i < liste.length && !valgt; i++) {
      var k = String(liste[i]).toLowerCase().split('-')[0]
      valgt = gyldig({ no: 'nb', sv: 'nb', da: 'nb' }[k] || k)
    }
    valgt = valgt || gyldig('en') || ${standard}
  }
  try { localStorage.setItem(n, valgt) } catch (x) {}
  d.setAttribute('data-sprak', valgt)
  if (valgt !== ${standard}) d.classList.add('sprak-venter')
})()
</script>`
}

/* ------------------------------------------------------------------- SIDEN */

/** Alt som ligger i <body> for ett språk: topplinje, innhold og bunntekst. */
function lagSide(innhold, sprakListe, aktiv) {
  const { paret, bryllup, hero } = innhold
  const ui = innhold.ui || {}
  const ned = ui.nedtelling || {}

  // Rekkefølgen her styrer både rekkefølgen på siden og i menyen.
  const seksjoner = [
    { id: 'velkommen', data: innhold.velkommen, mal: seksjonVelkommen },
    { id: 'program', data: innhold.program, mal: seksjonProgram },
    { id: 'praktisk', data: innhold.praktisk, mal: seksjonPraktisk },
    { id: 'transport', data: innhold.transport, mal: seksjonTransport },
    { id: 'gaver', data: innhold.gaver, mal: seksjonGaver },
    { id: 'rsvp', data: innhold.rsvp, mal: seksjonRsvp },
    { id: 'faq', data: innhold.faq, mal: seksjonFaq },
    { id: 'kontakt', data: innhold.kontakt, mal: seksjonKontakt },
  ].filter((s) => s.data && s.data.vis !== false)

  const meny = seksjoner
    .map(
      (s) =>
        `<li><a class="meny__lenke" href="#${e(s.id)}">${e(s.data.menytittel)}</a></li>`,
    )
    .join('\n          ')

  const navnelinje = `${e(paret.navnEn)} <span class="og">&amp;</span> ${e(paret.navnTo)}`
  const kortNavn = `${paret.navnEn} & ${paret.navnTo}`
  const nedtellingPost = (nokkel) =>
    `<div class="nedtelling__post"><span class="nedtelling__tall" data-nedtelling="${nokkel}">–</span><span class="nedtelling__navn">${e(ned[nokkel])}</span></div>`

  return `
<a class="hopp-lenke" href="#hovedinnhold">${e(ui.hoppTilInnhold)}</a>

<header class="topplinje" id="topplinje">
  <div class="topplinje__innhold">
    <a class="topplinje__navn" href="#topp">${e(kortNavn)}</a>
    <nav class="meny" id="hovedmeny" aria-label="${e(ui.hovedmeny)}">
      <ul>
          ${meny}
      </ul>
    </nav>
    ${sprakListe.length > 1 ? sprakvelger(sprakListe, aktiv, ui) : ''}
    <button class="meny__knapp" type="button" aria-expanded="false" aria-controls="hovedmeny">
      <span class="meny__knapp-strek" aria-hidden="true"></span>
      <span class="skjult-tekst">${e(ui.meny)}</span>
    </button>
  </div>
</header>

<main id="hovedinnhold">
  <section class="hero" id="topp">
    <div class="hero__innhold">
      ${satt(hero.overtittel) ? `<p class="hero__overtittel">${e(hero.overtittel)}</p>` : ''}
      <h1 class="hero__navn">${navnelinje}</h1>
      <p class="hero__dato">
        <span>${e(bryllup.datoTekst)}</span>
        ${satt(bryllup.sted) ? `<span class="hero__skille" aria-hidden="true">·</span><span>${e(bryllup.sted)}</span>` : ''}
      </p>
      ${satt(bryllup.klokkeslett) ? `<p class="hero__klokke">${e(bryllup.klokkeslett)}</p>` : ''}
      ${satt(hero.ingress) ? `<p class="hero__ingress">${e(hero.ingress)}</p>` : ''}
      ${
        hero.visNedtelling
          ? `<div class="nedtelling" id="nedtelling" data-dato="${e(bryllup.datoISO)}"
           data-tekst-ferdig="${e(ned.ferdig)}" hidden>
        ${['dager', 'timer', 'minutter', 'sekunder'].map(nedtellingPost).join('\n        ')}
      </div>`
          : ''
      }
      ${
        innhold.rsvp?.vis !== false && satt(hero.knapp)
          ? `<a class="knapp knapp--primar hero__knapp" href="#rsvp">${e(hero.knapp)}</a>`
          : ''
      }
    </div>
  </section>

${seksjoner.map((s) => s.mal(s.data, ui)).join('\n')}
</main>

<footer class="bunn">
  <p class="bunn__navn">${navnelinje}</p>
  <p class="bunn__dato">${e(bryllup.datoTekst)}</p>
  ${satt(paret.emneknagg) ? `<p class="bunn__emneknagg">${e(paret.emneknagg)}</p>` : ''}
</footer>
`
}

/**
 * Hele index.html.
 *
 * @param versjoner  [{ sprak, innhold }] – første er standardspråket.
 */
export function lagHtml(versjoner) {
  const [standard, ...andre] = versjoner
  const { side } = standard.innhold
  const sprakListe = versjoner.map((v) => v.sprak)
  const url = String(side.url || '').replace(/\/$/, '')
  const delebildeUrl = satt(side.delebilde) ? `${url}/${side.delebilde}` : ''

  // Tittel og beskrivelse per språk, slik at main.js kan bytte dem i <head>.
  const metadata = (v) =>
    `data-lang="${e(v.sprak.kode)}" data-tittel="${e(v.innhold.side.tittel)}" ` +
    `data-beskrivelse="${e(v.innhold.side.beskrivelse)}"`

  return `<!doctype html>
<html lang="${e(standard.sprak.kode)}">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${e(side.tittel)}</title>
<meta name="description" content="${e(side.beskrivelse)}" />
${side.skjulFraSokemotorer ? '<meta name="robots" content="noindex, nofollow" />' : ''}
<link rel="canonical" href="${e(side.url)}" />
${
  andre.length
    ? [
        `<link rel="alternate" hreflang="x-default" href="${e(url)}/" />`,
        ...versjoner.map(
          (v) =>
            `<link rel="alternate" hreflang="${e(v.sprak.kode)}" href="${e(url)}/?lang=${e(v.sprak.kode)}" />`,
        ),
      ].join('\n')
    : ''
}
<meta property="og:type" content="website" />
<meta property="og:locale" content="${e(standard.sprak.locale)}" />
${andre.map((v) => `<meta property="og:locale:alternate" content="${e(v.sprak.locale)}" />`).join('\n')}
<meta property="og:title" content="${e(side.tittel)}" />
<meta property="og:description" content="${e(side.beskrivelse)}" />
<meta property="og:url" content="${e(side.url)}" />
${delebildeUrl ? `<meta property="og:image" content="${e(delebildeUrl)}" />` : ''}
<meta name="twitter:card" content="${delebildeUrl ? 'summary_large_image' : 'summary'}" />
<meta name="theme-color" content="#f7f3ec" />
<link rel="icon" href="favicon.svg" type="image/svg+xml" />
<link rel="stylesheet" href="styles.css" />
${sprakskript(sprakListe)}
</head>
<body>
<div id="side" ${metadata(standard)}>
${lagSide(standard.innhold, sprakListe, standard.sprak.kode)}
</div>

${andre
  .map(
    (v) => `<template ${metadata(v)}>
${lagSide(v.innhold, sprakListe, v.sprak.kode)}
</template>`,
  )
  .join('\n\n')}

<!-- Lastes uten defer med vilje: språket byttes før siden vises. -->
<script src="main.js"></script>
</body>
</html>
`
}

export default lagHtml

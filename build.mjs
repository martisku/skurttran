/* ---------------------------------------------------------------------------
 * Bygger den ferdige nettsiden inn i dist/.
 *
 *   npm run build
 *
 * Skriptet bruker kun Node sitt standardbibliotek – ingen pakker å installere,
 * ingenting som ruster på seg over tid.
 * ------------------------------------------------------------------------- */

import { mkdir, rm, cp, writeFile, rename } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { innhold } from './src/content.js'
import { lagHtml } from './src/template.js'
import { sprak, innholdFor, finnUlikeLister } from './src/sprak/index.js'

const rot = dirname(fileURLToPath(import.meta.url))
const dist = join(rot, 'dist')
const statisk = join(rot, 'src', 'static')

/* Vi bygger til en midlertidig mappe og bytter den inn til slutt. Da finnes
   det aldri en halvferdig dist/ – verken for utviklingsserveren som leser
   fra den samtidig, eller hvis to bygg skulle kjøre på én gang. */
const midlertidig = join(rot, `.dist-bygg-${process.pid}`)

/** Sjekker at det viktigste er fylt ut, og advarer heller enn å feile. */
function sjekkInnhold() {
  const advarsler = []

  if (!innhold.bryllup?.datoISO || isNaN(new Date(innhold.bryllup.datoISO))) {
    advarsler.push('bryllup.datoISO er ikke en gyldig dato – nedtellingen vises ikke.')
  }

  if (innhold.rsvp?.vis !== false && !innhold.rsvp?.googleSkjema?.skjemaId) {
    advarsler.push(
      'rsvp.googleSkjema.skjemaId er tom – påmeldingsskjemaet sender ingenting ennå. ' +
        'Se docs/rsvp-google-skjema.md.',
    )
  }

  const feltverdier = Object.values(innhold.rsvp?.googleSkjema?.felt || {})
  if (innhold.rsvp?.googleSkjema?.skjemaId && feltverdier.some((v) => /entry\.0{6,}/.test(v))) {
    advarsler.push(
      'Noen felt-IDer i rsvp.googleSkjema.felt ser ut som plassholdere (entry.0000000000). ' +
        'De svarene blir forkastet av Google.',
    )
  }

  // Lister som er ulikt lange gir oversettelser som ikke passer sammen.
  for (const s of sprak.slice(1)) {
    for (const funn of finnUlikeLister(innhold, s.tekster)) {
      advarsler.push(
        `${s.navn}: lista ${funn} har ikke like mange punkter som på bokmål. ` +
          'Punktene slås sammen etter plassering, så de kan ha forskjøvet seg.',
      )
    }
  }

  return advarsler
}

async function bygg() {
  await rm(midlertidig, { recursive: true, force: true })
  await mkdir(midlertidig, { recursive: true })

  // Kopier alt som ligger i src/static/ rett inn i utdatamappa.
  await cp(statisk, midlertidig, { recursive: true })

  const versjoner = sprak.map((s) => ({ sprak: s, innhold: innholdFor(s.kode) }))
  await writeFile(join(midlertidig, 'index.html'), lagHtml(versjoner), 'utf8')

  const url = String(innhold.side.url || '').replace(/\/$/, '')

  await writeFile(
    join(midlertidig, 'robots.txt'),
    innhold.side.skjulFraSokemotorer
      ? 'User-agent: *\nDisallow: /\n'
      : `User-agent: *\nAllow: /\n\nSitemap: ${url}/sitemap.xml\n`,
    'utf8',
  )

  if (!innhold.side.skjulFraSokemotorer) {
    await writeFile(
      join(midlertidig, 'sitemap.xml'),
      `<?xml version="1.0" encoding="UTF-8"?>\n` +
        `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
        `  <url><loc>${url}/</loc></url>\n` +
        `</urlset>\n`,
      'utf8',
    )
  }

  // Bytt inn den ferdige mappa til slutt.
  await rm(dist, { recursive: true, force: true })
  await rename(midlertidig, dist)

  const advarsler = sjekkInnhold()
  console.log('Bygget dist/ ferdig.')
  advarsler.forEach((advarsel) => console.warn('  Merk: ' + advarsel))
}

bygg().catch(async (feil) => {
  await rm(midlertidig, { recursive: true, force: true }).catch(() => {})
  console.error('Byggingen feilet:', feil)
  process.exit(1)
})

/* ---------------------------------------------------------------------------
 * Språkene på siden.
 *
 * Bokmål (src/content.js) er grunnlaget. Hver oversettelse i denne mappa
 * inneholder bare teksten – alt den ikke har med (datoer, telefonnumre,
 * lenker, kontonummer, skjema-IDer, `vis`-felt) hentes fra bokmål. Mangler en
 * tekst i en oversettelse, vises bokmålsteksten i stedet.
 *
 * Lister (program, kort, spørsmål osv.) slås sammen etter plassering: punkt
 * nummer to i oversettelsen hører til punkt nummer to på bokmål. Legger du til
 * eller fjerner et punkt i content.js, gjør det samme i oversettelsene.
 * `npm run build` advarer hvis listene ikke er like lange.
 *
 * Vil du fjerne et språk, sletter du linjen i lista under.
 * ------------------------------------------------------------------------- */

import { innhold as bokmal } from '../content.js'
import nynorsk from './nn.js'
import engelsk from './en.js'
import vietnamesisk from './vi.js'

/** Første språk i lista er standard og vises uten JavaScript. */
export const sprak = [
  { kode: 'nb', navn: 'Norsk bokmål', kort: 'NB', locale: 'nb_NO', tekster: {} },
  { kode: 'nn', navn: 'Norsk nynorsk', kort: 'NN', locale: 'nn_NO', tekster: nynorsk },
  { kode: 'en', navn: 'English', kort: 'EN', locale: 'en_GB', tekster: engelsk },
  { kode: 'vi', navn: 'Tiếng Việt', kort: 'VI', locale: 'vi_VN', tekster: vietnamesisk },
]

/* Disse delene av innholdet er felles og kan ikke overstyres av en
   oversettelse – ellers kunne et skrivefeil der ødelegge påmeldingen. */
const fellesNokler = new Set(['googleSkjema', 'vis', 'datoISO', 'url', 'domene', 'skjulFraSokemotorer'])

const erObjekt = (verdi) => verdi !== null && typeof verdi === 'object' && !Array.isArray(verdi)

/** Legger oversettelsen oppå bokmål. Det oversettelsen ikke har, beholdes. */
export function slaSammen(grunnlag, oversettelse) {
  if (oversettelse === undefined) return grunnlag

  if (Array.isArray(grunnlag) && Array.isArray(oversettelse)) {
    const lengde = Math.max(grunnlag.length, oversettelse.length)
    return Array.from({ length: lengde }, (_, i) => slaSammen(grunnlag[i], oversettelse[i]))
  }

  if (erObjekt(grunnlag) && erObjekt(oversettelse)) {
    const resultat = { ...grunnlag }
    for (const [nokkel, verdi] of Object.entries(oversettelse)) {
      if (fellesNokler.has(nokkel)) continue
      resultat[nokkel] = slaSammen(grunnlag[nokkel], verdi)
    }
    return resultat
  }

  return oversettelse
}

/** Det ferdige innholdet for ett språk. */
export function innholdFor(kode) {
  const valgt = sprak.find((s) => s.kode === kode)
  if (!valgt) throw new Error(`Ukjent språk: ${kode}`)
  return slaSammen(bokmal, valgt.tekster)
}

/** Finner lister som ikke er like lange på bokmål og i en oversettelse. */
export function finnUlikeLister(grunnlag, oversettelse, sti = '') {
  const funn = []
  if (Array.isArray(grunnlag) && Array.isArray(oversettelse)) {
    if (grunnlag.length !== oversettelse.length) {
      funn.push(`${sti} (bokmål: ${grunnlag.length}, oversettelse: ${oversettelse.length})`)
    }
    oversettelse.forEach((verdi, i) => {
      funn.push(...finnUlikeLister(grunnlag[i], verdi, `${sti}[${i}]`))
    })
  } else if (erObjekt(grunnlag) && erObjekt(oversettelse)) {
    for (const [nokkel, verdi] of Object.entries(oversettelse)) {
      funn.push(...finnUlikeLister(grunnlag[nokkel], verdi, sti ? `${sti}.${nokkel}` : nokkel))
    }
  }
  return funn
}

export { bokmal }

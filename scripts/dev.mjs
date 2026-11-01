/* ---------------------------------------------------------------------------
 * Lokal utviklingsserver.
 *
 *   npm start
 *
 * Bygger siden, serverer den på http://localhost:3000 og bygger på nytt
 * automatisk når du lagrer en fil i src/.
 * ------------------------------------------------------------------------- */

import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { watch } from 'node:fs'
import { extname, join, normalize, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawn } from 'node:child_process'

const rot = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(rot, 'dist')
const port = Number(process.env.PORT) || 3000

const mimetyper = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.woff2': 'font/woff2',
}

/* Kjører build.mjs som et eget Node-kall. Bare ett bygg om gangen – blir det
   bedt om et nytt mens ett pågår, kjøres det etterpå i stedet for samtidig. */
let pågår = null
let ventende = false

function bygg() {
  if (pågår) {
    ventende = true
    return pågår
  }

  pågår = new Promise((resolve) => {
    const prosess = spawn(process.execPath, [join(rot, 'build.mjs')], { stdio: 'inherit' })
    prosess.on('close', resolve)
  }).then(async () => {
    pågår = null
    if (ventende) {
      ventende = false
      await bygg()
    }
  })

  return pågår
}

await bygg()

createServer(async (forespørsel, svar) => {
  // normalize() hindrer at «../» i URLen slipper ut av dist/.
  const sti = decodeURIComponent(new URL(forespørsel.url, 'http://localhost').pathname)

  // Korte lenker til hvert språk, som på Vercel/Netlify: /en → /?lang=en
  const kortlenke = sti.match(/^\/(nb|nn|en|vi)\/?$/)
  if (kortlenke) {
    svar.writeHead(302, { location: `/?lang=${kortlenke[1]}` })
    svar.end()
    return
  }

  let fil = join(dist, normalize(sti).replace(/^(\.\.[/\\])+/, ''))

  try {
    const info = await stat(fil).catch(() => null)
    if (!info || info.isDirectory()) fil = join(fil, 'index.html')

    const innhold = await readFile(fil)
    svar.writeHead(200, {
      'content-type': mimetyper[extname(fil)] || 'application/octet-stream',
      'cache-control': 'no-store',
    })
    svar.end(innhold)
  } catch {
    svar.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' })
    svar.end('Fant ikke siden')
  }
}).listen(port, () => {
  console.log(`\n  Siden kjører på http://localhost:${port}\n`)
})

/* Bygg på nytt når noe endres i src/. Flere lagringer på rad slås sammen
   til én bygging med en liten forsinkelse. */
let planlagt = null
watch(join(rot, 'src'), { recursive: true }, () => {
  clearTimeout(planlagt)
  planlagt = setTimeout(async () => {
    await bygg()
    console.log('  Oppdatert – last siden på nytt i nettleseren.')
  }, 120)
})

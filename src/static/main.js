/* ---------------------------------------------------------------------------
 * Oppførselen på siden: meny, nedtelling, innfading og påmeldingsskjema.
 * Ingen rammeverk, ingen avhengigheter.
 * ------------------------------------------------------------------------- */

;(function () {
  'use strict'

  /* --------------------------------------------------------------- MENY */

  const topplinje = document.getElementById('topplinje')
  const menyknapp = document.querySelector('.meny__knapp')
  const meny = document.getElementById('hovedmeny')

  function lukkMeny() {
    if (!meny || !menyknapp) return
    meny.classList.remove('er-apen')
    menyknapp.setAttribute('aria-expanded', 'false')
  }

  if (menyknapp && meny) {
    menyknapp.addEventListener('click', function () {
      const apen = meny.classList.toggle('er-apen')
      menyknapp.setAttribute('aria-expanded', apen ? 'true' : 'false')
    })

    // Lukk menyen når man velger et menypunkt, eller trykker Escape.
    meny.addEventListener('click', function (hendelse) {
      if (hendelse.target.closest('a')) lukkMeny()
    })

    document.addEventListener('keydown', function (hendelse) {
      if (hendelse.key === 'Escape') lukkMeny()
    })
  }

  // Skygge/strek under topplinja så snart man har scrollet litt.
  if (topplinje) {
    const oppdaterTopplinje = function () {
      topplinje.classList.toggle('er-scrollet', window.scrollY > 12)
    }
    oppdaterTopplinje()
    window.addEventListener('scroll', oppdaterTopplinje, { passive: true })
  }

  /* ------------------------------------------------- AKTIVT MENYPUNKT */

  const menylenker = Array.prototype.slice.call(document.querySelectorAll('.meny__lenke'))
  const seksjoner = menylenker
    .map(function (lenke) {
      const id = lenke.getAttribute('href').slice(1)
      return document.getElementById(id)
    })
    .filter(Boolean)

  if (seksjoner.length && 'IntersectionObserver' in window) {
    const merkAktiv = function (id) {
      menylenker.forEach(function (lenke) {
        lenke.classList.toggle('er-aktiv', lenke.getAttribute('href') === '#' + id)
      })
    }

    const observator = new IntersectionObserver(
      function (innslag) {
        // Den øverste seksjonen som er synlig vinner.
        const synlige = innslag
          .filter(function (i) {
            return i.isIntersecting
          })
          .sort(function (a, b) {
            return a.boundingClientRect.top - b.boundingClientRect.top
          })
        if (synlige.length) merkAktiv(synlige[0].target.id)
      },
      { rootMargin: '-30% 0px -60% 0px' },
    )

    seksjoner.forEach(function (seksjon) {
      observator.observe(seksjon)
    })
  }

  /* ------------------------------------------------------------ INNFADING */

  const skalTones = Array.prototype.slice.call(document.querySelectorAll('.reveal'))

  if (skalTones.length && 'IntersectionObserver' in window) {
    const toner = new IntersectionObserver(
      function (innslag, selv) {
        innslag.forEach(function (i) {
          if (!i.isIntersecting) return
          i.target.classList.add('er-synlig')
          selv.unobserve(i.target)
        })
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0 },
    )
    skalTones.forEach(function (element) {
      toner.observe(element)
    })
  } else {
    skalTones.forEach(function (element) {
      element.classList.add('er-synlig')
    })
  }

  /* ----------------------------------------------------------- NEDTELLING */

  const nedtelling = document.getElementById('nedtelling')

  if (nedtelling) {
    const maal = new Date(nedtelling.dataset.dato).getTime()

    if (!isNaN(maal)) {
      const tall = {
        dager: nedtelling.querySelector('[data-nedtelling="dager"]'),
        timer: nedtelling.querySelector('[data-nedtelling="timer"]'),
        minutter: nedtelling.querySelector('[data-nedtelling="minutter"]'),
        sekunder: nedtelling.querySelector('[data-nedtelling="sekunder"]'),
      }

      const topad = function (verdi) {
        return verdi < 10 ? '0' + verdi : String(verdi)
      }

      const tikk = function () {
        const igjen = maal - Date.now()

        if (igjen <= 0) {
          nedtelling.innerHTML =
            '<p class="nedtelling__ferdig">I dag er dagen! Vi gleder oss til å se dere.</p>'
          clearInterval(intervall)
          return
        }

        const sekunderTotalt = Math.floor(igjen / 1000)
        tall.dager.textContent = String(Math.floor(sekunderTotalt / 86400))
        tall.timer.textContent = topad(Math.floor(sekunderTotalt / 3600) % 24)
        tall.minutter.textContent = topad(Math.floor(sekunderTotalt / 60) % 60)
        tall.sekunder.textContent = topad(sekunderTotalt % 60)
      }

      nedtelling.hidden = false
      tikk()
      var intervall = setInterval(tikk, 1000)
    }
  }

  /* --------------------------------------------------------------- SKJEMA */

  const skjema = document.getElementById('rsvp-skjema')

  if (skjema) {
    const status = skjema.querySelector('.skjema__status')
    const sendknapp = skjema.querySelector('button[type="submit"]')
    const takk = document.getElementById('rsvp-takk')
    const igjenknapp = document.getElementById('rsvp-igjen')
    const betinget = skjema.querySelector('[data-vis-nar-kommer]')
    const kommerJa = document.getElementById('rsvp-kommer-ja')
    const koblet = skjema.dataset.koblet === 'ja'
    const ramme = document.getElementsByName('rsvp-mottaker')[0]

    /* Vis bare buss/allergi-spørsmålene til dem som faktisk kommer. Feltene
       slås også av, slik at de ikke sendes med når de er skjult. */
    const oppdaterBetinget = function () {
      if (!betinget) return
      const svartNei = Boolean(skjema.querySelector('#rsvp-kommer-nei:checked'))
      betinget.hidden = svartNei
      betinget.querySelectorAll('input, textarea').forEach(function (felt) {
        felt.disabled = svartNei
      })
    }

    skjema.addEventListener('change', function (hendelse) {
      if (hendelse.target.name && hendelse.target.type === 'radio') oppdaterBetinget()
    })
    oppdaterBetinget()

    /* Enkel validering med egne feilmeldinger på norsk. */
    const visFeil = function (element, synlig) {
      const feil = skjema.querySelector('[data-feil-for="' + element.id + '"]')
      if (feil) feil.hidden = !synlig
    }

    const valider = function () {
      let gyldig = true
      const navn = document.getElementById('rsvp-navn')
      const epost = document.getElementById('rsvp-epost')

      const navnOk = navn.value.trim() !== ''
      visFeil(navn, !navnOk)
      if (!navnOk) gyldig = false

      const epostOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(epost.value.trim())
      visFeil(epost, !epostOk)
      if (!epostOk) gyldig = false

      const kommerOk = Boolean(
        document.querySelector('#rsvp-kommer-ja:checked, #rsvp-kommer-nei:checked'),
      )
      if (kommerJa) visFeil(kommerJa, !kommerOk)
      if (!kommerOk) gyldig = false

      return gyldig
    }

    /* Google Skjema svarer med en side vi ikke får lese (annet domene).
       At den skjulte rammen laster er derfor kvitteringen på at svaret gikk
       inn – vi venter på den, med en timeout som sikkerhetsnett. */
    let venter = false
    let tidsavbrudd = null

    const fullfor = function () {
      if (!venter) return
      venter = false
      clearTimeout(tidsavbrudd)
      sendknapp.disabled = false
      status.textContent = ''
      if (takk) {
        skjema.hidden = true
        takk.hidden = false
        takk.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    }

    if (ramme) ramme.addEventListener('load', fullfor)

    skjema.addEventListener('submit', function (hendelse) {
      if (!valider()) {
        hendelse.preventDefault()
        status.textContent = 'Se over feltene som er merket.'
        status.classList.add('er-feil')
        return
      }

      status.classList.remove('er-feil')

      if (!koblet) {
        hendelse.preventDefault()
        status.textContent =
          'Påmeldingen er ikke koblet til Google Skjema ennå, så svaret ble ikke sendt.'
        status.classList.add('er-feil')
        return
      }

      // Selve innsendingen gjøres av nettleseren mot den skjulte rammen.
      venter = true
      sendknapp.disabled = true
      status.textContent = 'Sender …'

      tidsavbrudd = setTimeout(fullfor, 6000)
    })

    if (igjenknapp) {
      igjenknapp.addEventListener('click', function () {
        skjema.reset()
        oppdaterBetinget()
        takk.hidden = true
        skjema.hidden = false
        skjema.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
    }
  }
})()

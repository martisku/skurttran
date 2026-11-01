/* ---------------------------------------------------------------------------
 * Oppførselen på siden: språkvalg, meny, nedtelling, innfading og
 * påmeldingsskjema. Ingen rammeverk, ingen avhengigheter.
 *
 * Alle språkene ligger ferdig i index.html. Standardspråket står i #side, de
 * andre i <template data-lang="…">. Ved språkbytte byttes innholdet i #side
 * ut, og alt under start() kjøres på nytt for det nye innholdet.
 *
 * All tekst som vises herfra leses fra data-attributter i HTML-en, så denne
 * fila trenger ingen oversettelse.
 * ------------------------------------------------------------------------- */

;(function () {
  'use strict'

  var LAGRINGSNOKKEL = 'skurtran-sprak'
  var html = document.documentElement
  var side = document.getElementById('side')
  if (!side) return

  /* ------------------------------------------------------------ SPRÅK */

  // Standardspråket tas vare på før noe annet rører innholdet, slik at man
  // kan bytte tilbake til det.
  var maler = {}
  var standard = document.createElement('template')
  standard.innerHTML = side.innerHTML
  Array.prototype.forEach.call(side.attributes, function (a) {
    if (a.name.indexOf('data-') === 0) standard.setAttribute(a.name, a.value)
  })
  maler[side.dataset.lang] = standard
  Array.prototype.forEach.call(document.querySelectorAll('template[data-lang]'), function (mal) {
    maler[mal.dataset.lang] = mal
  })

  var aktivtSprak = side.dataset.lang

  function lagreSprak(kode) {
    try {
      localStorage.setItem(LAGRINGSNOKKEL, kode)
    } catch (x) {
      /* Privat modus o.l. – valget huskes bare ikke. */
    }
  }

  /** Bytter innholdet i #side til et annet språk. */
  function byttSprak(kode, valg) {
    var mal = maler[kode]
    if (!mal) return false
    valg = valg || {}

    if (kode !== aktivtSprak) {
      if (stopp) stopp()
      side.replaceChildren(mal.content.cloneNode(true))
      aktivtSprak = kode

      html.lang = kode
      if (mal.dataset.tittel) document.title = mal.dataset.tittel
      var beskrivelse = document.querySelector('meta[name="description"]')
      if (beskrivelse && mal.dataset.beskrivelse) {
        beskrivelse.setAttribute('content', mal.dataset.beskrivelse)
      }

      stopp = start({ visAltMedEnGang: valg.visAltMedEnGang })
    }

    html.setAttribute('data-sprak', kode)
    lagreSprak(kode)

    // Oppdater adressen, så lenken man kopierer viser riktig språk.
    if (valg.oppdaterAdresse && window.history && history.replaceState) {
      try {
        var adresse = new URL(location.href)
        adresse.searchParams.set('lang', kode)
        history.replaceState(history.state, '', adresse.pathname + adresse.search + adresse.hash)
      } catch (x) {
        /* Eldre nettlesere: adressen blir stående. */
      }
    }
    return true
  }

  // Klikk på et språk i språkvelgeren.
  document.addEventListener('click', function (hendelse) {
    var lenke = hendelse.target.closest && hendelse.target.closest('[data-velg-sprak]')
    if (!lenke || hendelse.metaKey || hendelse.ctrlKey || hendelse.shiftKey) return
    var kode = lenke.getAttribute('data-velg-sprak')
    if (!maler[kode]) return

    hendelse.preventDefault()
    byttSprak(kode, { oppdaterAdresse: true, visAltMedEnGang: true })

    // Behold fokus i språkvelgeren for dem som bruker tastatur.
    var ny = side.querySelector('[data-velg-sprak="' + kode + '"]')
    if (ny) ny.focus({ preventScroll: true })
  })

  /* ------------------------------------------- MENY OG TOPPLINJE (globalt) */

  function lukkMeny() {
    var meny = document.getElementById('hovedmeny')
    var knapp = document.querySelector('.meny__knapp')
    if (!meny || !knapp) return
    meny.classList.remove('er-apen')
    knapp.setAttribute('aria-expanded', 'false')
  }

  document.addEventListener('keydown', function (hendelse) {
    if (hendelse.key === 'Escape') lukkMeny()
  })

  // Skygge/strek under topplinja så snart man har scrollet litt.
  function oppdaterTopplinje() {
    var topplinje = document.getElementById('topplinje')
    if (topplinje) topplinje.classList.toggle('er-scrollet', window.scrollY > 12)
  }
  window.addEventListener('scroll', oppdaterTopplinje, { passive: true })

  /* Hamburgermeny på smale skjermer, og ellers når menyen ikke får plass på
     én linje. Hvor mye plass den trenger, varierer med språket. */
  var SMAL_SKJERM = 832 // 52rem

  function tilpassTopplinje() {
    var topplinje = document.getElementById('topplinje')
    var innhold = topplinje && topplinje.querySelector('.topplinje__innhold')
    if (!innhold) return

    topplinje.classList.remove('topplinje--kompakt')
    var kompakt =
      window.innerWidth <= SMAL_SKJERM || innhold.scrollWidth > innhold.clientWidth + 1
    topplinje.classList.toggle('topplinje--kompakt', kompakt)
    if (!kompakt) lukkMeny()
  }

  var tilpassPlanlagt = false
  window.addEventListener('resize', function () {
    if (tilpassPlanlagt) return
    tilpassPlanlagt = true
    requestAnimationFrame(function () {
      tilpassPlanlagt = false
      tilpassTopplinje()
    })
  })

  /* ------------------------------------------------------------- START */

  /**
   * Kobler oppførselen til innholdet som står i #side nå. Returnerer en
   * funksjon som rydder opp igjen før innholdet byttes ut.
   */
  function start(valg) {
    valg = valg || {}
    var opprydding = []

    /* ------------------------------------------------------------ MENY */

    var menyknapp = side.querySelector('.meny__knapp')
    var meny = side.querySelector('#hovedmeny')

    if (menyknapp && meny) {
      menyknapp.addEventListener('click', function () {
        var apen = meny.classList.toggle('er-apen')
        menyknapp.setAttribute('aria-expanded', apen ? 'true' : 'false')
      })

      // Lukk menyen når man velger et menypunkt.
      meny.addEventListener('click', function (hendelse) {
        if (hendelse.target.closest('a')) lukkMeny()
      })
    }

    oppdaterTopplinje()
    tilpassTopplinje()

    /* ---------------------------------------------- AKTIVT MENYPUNKT */

    var menylenker = Array.prototype.slice.call(side.querySelectorAll('.meny__lenke'))
    var seksjoner = menylenker
      .map(function (lenke) {
        return document.getElementById(lenke.getAttribute('href').slice(1))
      })
      .filter(Boolean)

    if (seksjoner.length && 'IntersectionObserver' in window) {
      var merkAktiv = function (id) {
        menylenker.forEach(function (lenke) {
          lenke.classList.toggle('er-aktiv', lenke.getAttribute('href') === '#' + id)
        })
      }

      var observator = new IntersectionObserver(
        function (innslag) {
          // Den øverste seksjonen som er synlig vinner.
          var synlige = innslag
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
      opprydding.push(function () {
        observator.disconnect()
      })
    }

    /* --------------------------------------------------------- INNFADING */

    var skalTones = Array.prototype.slice.call(side.querySelectorAll('.reveal'))
    var visAlt = function () {
      skalTones.forEach(function (element) {
        element.classList.add('er-synlig')
      })
    }

    // Ved språkbytte vises alt med en gang – det skal ikke tones inn på nytt.
    if (valg.visAltMedEnGang || !('IntersectionObserver' in window)) {
      visAlt()
    } else if (skalTones.length) {
      var toner = new IntersectionObserver(
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
      opprydding.push(function () {
        toner.disconnect()
      })
    }

    /* -------------------------------------------------------- NEDTELLING */

    var nedtelling = side.querySelector('#nedtelling')

    if (nedtelling) {
      var maal = new Date(nedtelling.dataset.dato).getTime()

      if (!isNaN(maal)) {
        var tall = {
          dager: nedtelling.querySelector('[data-nedtelling="dager"]'),
          timer: nedtelling.querySelector('[data-nedtelling="timer"]'),
          minutter: nedtelling.querySelector('[data-nedtelling="minutter"]'),
          sekunder: nedtelling.querySelector('[data-nedtelling="sekunder"]'),
        }

        var topad = function (verdi) {
          return verdi < 10 ? '0' + verdi : String(verdi)
        }

        var intervall = null

        var tikk = function () {
          var igjen = maal - Date.now()

          if (igjen <= 0) {
            var ferdig = document.createElement('p')
            ferdig.className = 'nedtelling__ferdig'
            ferdig.textContent = nedtelling.dataset.tekstFerdig || ''
            nedtelling.replaceChildren(ferdig)
            clearInterval(intervall)
            return
          }

          var sekunderTotalt = Math.floor(igjen / 1000)
          tall.dager.textContent = String(Math.floor(sekunderTotalt / 86400))
          tall.timer.textContent = topad(Math.floor(sekunderTotalt / 3600) % 24)
          tall.minutter.textContent = topad(Math.floor(sekunderTotalt / 60) % 60)
          tall.sekunder.textContent = topad(sekunderTotalt % 60)
        }

        nedtelling.hidden = false
        intervall = setInterval(tikk, 1000)
        tikk()
        opprydding.push(function () {
          clearInterval(intervall)
        })
      }
    }

    /* ------------------------------------------------------------ SKJEMA */

    var skjema = side.querySelector('#rsvp-skjema')

    if (skjema) {
      var status = skjema.querySelector('.skjema__status')
      var sendknapp = skjema.querySelector('button[type="submit"]')
      var takk = side.querySelector('#rsvp-takk')
      var igjenknapp = side.querySelector('#rsvp-igjen')
      var betinget = skjema.querySelector('[data-vis-nar-kommer]')
      var kommerJa = skjema.querySelector('#rsvp-kommer-ja')
      var koblet = skjema.dataset.koblet === 'ja'
      var ramme = side.querySelector('iframe[name="rsvp-mottaker"]')
      var tekst = skjema.dataset

      /* Vis bare buss/allergi-spørsmålene til dem som faktisk kommer. Feltene
         slås også av, slik at de ikke sendes med når de er skjult. */
      var oppdaterBetinget = function () {
        if (!betinget) return
        var svartNei = Boolean(skjema.querySelector('#rsvp-kommer-nei:checked'))
        betinget.hidden = svartNei
        betinget.querySelectorAll('input, textarea').forEach(function (felt) {
          felt.disabled = svartNei
        })
      }

      skjema.addEventListener('change', function (hendelse) {
        if (hendelse.target.name && hendelse.target.type === 'radio') oppdaterBetinget()
      })
      oppdaterBetinget()

      /* Enkel validering med egne feilmeldinger på riktig språk. */
      var visFeil = function (element, synlig) {
        var feil = skjema.querySelector('[data-feil-for="' + element.id + '"]')
        if (feil) feil.hidden = !synlig
      }

      var valider = function () {
        var gyldig = true
        var navn = skjema.querySelector('#rsvp-navn')
        var epost = skjema.querySelector('#rsvp-epost')

        var navnOk = navn.value.trim() !== ''
        visFeil(navn, !navnOk)
        if (!navnOk) gyldig = false

        var epostOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(epost.value.trim())
        visFeil(epost, !epostOk)
        if (!epostOk) gyldig = false

        var kommerOk = Boolean(
          skjema.querySelector('#rsvp-kommer-ja:checked, #rsvp-kommer-nei:checked'),
        )
        if (kommerJa) visFeil(kommerJa, !kommerOk)
        if (!kommerOk) gyldig = false

        return gyldig
      }

      /* Google Skjema svarer med en side vi ikke får lese (annet domene).
         At den skjulte rammen laster er derfor kvitteringen på at svaret gikk
         inn – vi venter på den, med en timeout som sikkerhetsnett. */
      var venter = false
      var tidsavbrudd = null

      var fullfor = function () {
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
      opprydding.push(function () {
        clearTimeout(tidsavbrudd)
      })

      skjema.addEventListener('submit', function (hendelse) {
        if (!valider()) {
          hendelse.preventDefault()
          status.textContent = tekst.tekstSjekkFelt || ''
          status.classList.add('er-feil')
          return
        }

        status.classList.remove('er-feil')

        if (!koblet) {
          hendelse.preventDefault()
          status.textContent = tekst.tekstIkkeKoblet || ''
          status.classList.add('er-feil')
          return
        }

        // Selve innsendingen gjøres av nettleseren mot den skjulte rammen.
        venter = true
        sendknapp.disabled = true
        status.textContent = tekst.tekstSender || ''

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

    return function () {
      opprydding.forEach(function (rydd) {
        rydd()
      })
    }
  }

  /* --------------------------------------------------------- OPPSTART */

  // Skriptet i <head> har allerede bestemt språket.
  var stopp = null
  var onsket = html.getAttribute('data-sprak')

  if (onsket && onsket !== aktivtSprak && maler[onsket]) {
    byttSprak(onsket)

    // Ankerlenker (#program o.l.) pekte på det gamle innholdet.
    if (location.hash.length > 1) {
      var maal = document.getElementById(decodeURIComponent(location.hash.slice(1)))
      if (maal) maal.scrollIntoView({ behavior: 'instant' })
    }
  } else {
    lagreSprak(aktivtSprak)
  }

  if (!stopp) stopp = start()
  html.classList.remove('sprak-venter')
})()

import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'discovery-of-x-rays',
  names: [
    { text: 'Discovery of X-rays', lang: 'en', role: 'primary' },
    { text: 'Entdeckung der Röntgenstrahlen', lang: 'de', role: 'native' },
    {
      text: 'X-Strahlen',
      lang: 'de',
      role: 'alternative',
      cites: [
        { source: 'lemo-chronik-1895', loc: { section: 'Chronik 1895', para: '56' } }
      ]
    }
  ],
  researched: '2026-10-07',
  type: 'discovery',
  start: {
    alts: [
      {
        value: { d: '1895-11-08' },
        cites: [
          { source: 'lemo-chronik-1895', loc: { section: 'Chronik 1895', para: '55' } },
          {
            source: 'lemo-biografie-wilhelm-conrad-roentgen',
            loc: { section: 'Wilhelm Conrad Röntgen 1845-1923', para: '30' }
          }
        ]
      }
    ]
  },
  regions: ['europe', 'global'],
  prominence: 2,
  places: [
    {
      ref: 'place:wurzburg',
      cites: [
        { source: 'lemo-chronik-1895', loc: { section: 'Chronik 1895', para: '56' } }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:wilhelm-rontgen',
      role: 'participant',
      cites: [
        { source: 'lemo-chronik-1895', loc: { section: 'Chronik 1895', para: '56' } },
        {
          source: 'lemo-biografie-wilhelm-conrad-roentgen',
          loc: { section: 'Wilhelm Conrad Röntgen 1845-1923', para: '30' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q8',
          text: 'W. K. Röntgen discovered in 1895 (Wied. Ann. 64, p. 1) that when the electric discharge passes through a tube exhausted so that the glass of the tube is brightly phosphorescent, phosphorescent substances such as potassium platinocyanide became luminous when brought near to the tube.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-rontgen-rays',
            loc: { section: 'RÖNTGEN RAYS', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/R%C3%B6ntgen_Rays'
          }
        },
        {
          id: 'q1',
          text: 'Der Würzburger Physikprofessor Wilhelm Conrad Röntgen entdeckt die später nach ihm benannten X-Strahlen.',
          lang: 'de',
          cite: { source: 'lemo-chronik-1895', loc: { section: 'Chronik 1895', para: '56' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.dhm.de/lemo/jahreschronik/1895.html'
          }
        },
        {
          id: 'q2',
          text: 'Röntgen entdeckt bei der Untersuchung der Leitung von Elektrizität in Gasen eine unsichtbare Strahlung, mit der das bisher verborgene Innere eines Organismus betrachtet werden kann. Die Röntgenstrahlung, die nach ihm benannt werden wird, nennt er vorab "X-Strahlen".',
          lang: 'de',
          cite: {
            source: 'lemo-biografie-wilhelm-conrad-roentgen',
            loc: { section: 'Wilhelm Conrad Röntgen 1845-1923', para: '30' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.dhm.de/lemo/biografie/wilhelm-conrad-roentgen'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q3',
          text: 'Die Publikation treibt die Entwicklung der Röntgenologie entscheidend voran.',
          lang: 'de',
          cite: {
            source: 'lemo-biografie-wilhelm-conrad-roentgen',
            loc: { section: 'Wilhelm Conrad Röntgen 1845-1923', para: '34' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.dhm.de/lemo/biografie/wilhelm-conrad-roentgen'
          }
        },
        {
          id: 'q4',
          text: 'Die oft tödlichen Nebenwirkungen der Röntgenstrahlung bleiben noch lange Zeit unbekannt und kosten viele der Röntgenpioniere das Leben.',
          lang: 'de',
          cite: {
            source: 'lemo-biografie-wilhelm-conrad-roentgen',
            loc: { section: 'Wilhelm Conrad Röntgen 1845-1923', para: '31' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.dhm.de/lemo/biografie/wilhelm-conrad-roentgen'
          }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1895-12-28' },
            cites: [
              {
                source: 'lemo-biografie-wilhelm-conrad-roentgen',
                loc: { section: 'Wilhelm Conrad Röntgen 1845-1923', para: '31' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q5',
        text: 'Einreichung des Manuskripts "Eine neue Art von Strahlen" an der Physikalisch-Medizinischen Gesellschaft in Würzburg. In seiner Publikation gibt Röntgen bereits Hinweise auf die medizinische Anwendbarkeit.',
        lang: 'de',
        cite: {
          source: 'lemo-biografie-wilhelm-conrad-roentgen',
          loc: { section: 'Wilhelm Conrad Röntgen 1845-1923', para: '31' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.dhm.de/lemo/biografie/wilhelm-conrad-roentgen'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1896-01-12' },
            cites: [
              {
                source: 'lemo-biografie-wilhelm-conrad-roentgen',
                loc: { section: 'Wilhelm Conrad Röntgen 1845-1923', para: '33' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q6',
        text: 'Röntgen berichtet in einem Vortrag in Berlin Kaiser Wilhelm II. von seiner Entdeckung.',
        lang: 'de',
        cite: {
          source: 'lemo-biografie-wilhelm-conrad-roentgen',
          loc: { section: 'Wilhelm Conrad Röntgen 1845-1923', para: '33' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.dhm.de/lemo/biografie/wilhelm-conrad-roentgen'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1896-01' },
            cites: [
              {
                source: 'lemo-biografie-wilhelm-conrad-roentgen',
                loc: { section: 'Wilhelm Conrad Röntgen 1845-1923', para: '34' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q7',
        text: 'Ende Januar veröffentlicht die "Wiener Klinische Wochenschrift" die erste Abbildung eines Röntgenbilds.',
        lang: 'de',
        cite: {
          source: 'lemo-biografie-wilhelm-conrad-roentgen',
          loc: { section: 'Wilhelm Conrad Röntgen 1845-1923', para: '34' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.dhm.de/lemo/biografie/wilhelm-conrad-roentgen'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/7/79/First_medical_X-ray_by_Wilhelm_R%C3%B6ntgen_of_his_wife_Anna_Bertha_Ludwig%27s_hand_-_18951222.jpg/1280px-First_medical_X-ray_by_Wilhelm_R%C3%B6ntgen_of_his_wife_Anna_Bertha_Ludwig%27s_hand_-_18951222.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:First_medical_X-ray_by_Wilhelm_R%C3%B6ntgen_of_his_wife_Anna_Bertha_Ludwig%27s_hand_-_18951222.jpg',
    credit: { creator: 'Wilhelm Röntgen' },
    license: { id: 'public-domain' }
  },
  archive: [
    {
      id: 'rontgen-neue-art-von-strahlen',
      mediaKind: 'document',
      title: 'Eine neue Art von Strahlen',
      date: { d: '1895' },
      url: 'https://archive.org/download/b30475697/b30475697.pdf',
      page: 'https://archive.org/details/b30475697',
      credit: {
        institution: 'Wellcome Library (Internet Archive)',
        creator: 'Röntgen, Wilhelm Conrad, 1845-1923'
      },
      license: { id: 'public-domain' },
      bytes: 1359079
    }
  ]
})

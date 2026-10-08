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
  researched: '2026-10-08',
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
          id: 'q9',
          text: 'In 1879 he was chosen ordinary professor of physics and director of the Physical Institute at Giessen, whence in 1885 he removed in the same capacity to Würzburg. It was at the latter place that he made the discovery for which his name is chiefly known, the Röntgen rays.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-rontgen-wilhelm-konrad',
            loc: { section: 'RÖNTGEN, WILHELM KONRAD', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/R%C3%B6ntgen,_Wilhelm_Konrad'
          }
        },
        {
          id: 'q10',
          text: 'In 1895, while experimenting with a highly exhausted vacuum tube on the conduction of electricity through gases, he noticed that a paper screen covered with barium platinocyanide, which happened to be lying near, became fluorescent under the action of some radiation emitted from the tube, which at the time was enclosed in a box of black cardboard. Further investigation showed that this radiation had the power of passing through various substances which are opaque to ordinary light, and also of affecting a photographic plate. Its behaviour being curious in several respects, particularly in regard to reflection and refraction, doubt arose in his mind whether it was to be looked upon as light or not, and he was led to put forward the hypothesis that it was due to longitudinal vibrations in the ether, not to transverse ones like ordinary light; but in view of the uncertainty existing as to its nature, he called it X-rays.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-rontgen-wilhelm-konrad',
            loc: { section: 'RÖNTGEN, WILHELM KONRAD', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/R%C3%B6ntgen,_Wilhelm_Konrad'
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
        id: 'q11',
        text: 'Prof. Röntgen reported his investigations in a paper before the Physico-Medical Society of Würzburg, in December, 1895.',
        lang: 'en',
        cite: {
          source: 'hering-1897-year-of-the-x-rays',
          loc: { section: 'A YEAR OF THE X RAYS', para: '2' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-07',
          url: 'https://en.wikisource.org/wiki/Popular_Science_Monthly/Volume_50/March_1897/The_Year_of_the_X_Rays'
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
  ],
  furtherReading: [
    { source: 'folsing-1995-wilhelm-conrad-rontgen', perspective: 'european' }
  ]
})

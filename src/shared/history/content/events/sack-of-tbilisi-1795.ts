import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'sack-of-tbilisi-1795',
  names: [
    { text: 'Sack of Tbilisi', lang: 'en', role: 'primary' },
    {
      text: 'Sack of Tiflis',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-perry-aga-mohammad-khan-qajar',
          loc: { section: 'ĀḠĀ MOḤAMMAD KHAN QĀJĀR', para: '6' }
        }
      ]
    }
  ],
  researched: '2026-10-13',
  type: 'invasion',
  start: {
    alts: [
      {
        value: { d: '1795-09-11' },
        cites: [
          { source: 'iranica-hitchins-erekle-ii', loc: { section: 'EREKLE II', para: '8' } },
          {
            source: 'iranica-hitchins-georgia-ii-iranian-georgian-relations',
            loc: { section: 'GEORGIA ii. History of Iranian-Georgian Relations', para: '26' }
          }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Keith Hitchins', discipline: 'historian' }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1795-09-11' },
        cites: [
          { source: 'iranica-hitchins-erekle-ii', loc: { section: 'EREKLE II', para: '8' } }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Keith Hitchins', discipline: 'historian' }
        ]
      }
    ]
  },
  regions: ['iran', 'russia-central-asia'],
  prominence: 2,
  places: [
    {
      ref: 'place:tbilisi',
      cites: [
        {
          source: 'iranica-perry-aga-mohammad-khan-qajar',
          loc: { section: 'ĀḠĀ MOḤAMMAD KHAN QĀJĀR', para: '6' }
        }
      ]
    }
  ],
  sides: [
    {
      key: 'qajars',
      name: 'Qajars',
      polity: 'polity:qajar-iran',
      cites: [
        {
          source: 'iranica-perry-aga-mohammad-khan-qajar',
          loc: { section: 'ĀḠĀ MOḤAMMAD KHAN QĀJĀR', para: '6' }
        }
      ]
    },
    {
      key: 'georgians',
      name: 'Georgians',
      cites: [
        {
          source: 'iranica-perry-aga-mohammad-khan-qajar',
          loc: { section: 'ĀḠĀ MOḤAMMAD KHAN QĀJĀR', para: '6' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:agha-mohammad-khan-qajar',
      role: 'leader',
      side: 'qajars',
      cites: [
        {
          source: 'iranica-perry-aga-mohammad-khan-qajar',
          loc: { section: 'ĀḠĀ MOḤAMMAD KHAN QĀJĀR', para: '6' }
        }
      ]
    },
    {
      ref: 'person:erekle-ii',
      role: 'leader',
      side: 'georgians',
      cites: [
        {
          source: 'iranica-perry-aga-mohammad-khan-qajar',
          loc: { section: 'ĀḠĀ MOḤAMMAD KHAN QĀJĀR', para: '6' }
        }
      ]
    }
  ],
  figures: [
    {
      key: 'displaced',
      side: 'georgians',
      value: {
        alts: [
          {
            value: { min: 15000, qualifier: 'about' },
            cites: [
              {
                source: 'iranica-hitchins-georgia-ii-iranian-georgian-relations',
                loc: { section: 'GEORGIA ii. History of Iranian-Georgian Relations', para: '26' }
              }
            ],
            heldBy: [
              { kind: 'scholar', name: 'Keith Hitchins', discipline: 'historian' }
            ]
          }
        ]
      }
    }
  ],
  related: [
    {
      ref: 'event:russian-expedition-to-the-caucasus-1796',
      rel: 'led-to',
      cites: [
        {
          source: 'iranica-andreeva-russia-relations',
          loc: {
            section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
            para: '11'
          }
        }
      ]
    },
    {
      ref: 'event:coronation-of-agha-mohammad-khan-qajar',
      rel: 'preceded-by',
      cites: [
        {
          source: 'iranica-perry-aga-mohammad-khan-qajar',
          loc: { section: 'ĀḠĀ MOḤAMMAD KHAN QĀJĀR', para: '6' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Erekli’s army, heavily outnumbered, was defeated, and Tiflis savagely sacked; the old and infirm and the priests were massacred, and at least 15,000 able-bodied men and women taken into slavery.',
          lang: 'en',
          cite: {
            source: 'iranica-perry-aga-mohammad-khan-qajar',
            loc: { section: 'ĀḠĀ MOḤAMMAD KHAN QĀJĀR', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/aga-mohammad-khan'
          }
        },
        {
          id: 'q2',
          text: 'In 1795, Āḡā Moḥammad Khan, trying to reunify the Iranian empire, attacked Georgia and sacked Tbilisi.',
          lang: 'en',
          cite: {
            source: 'iranica-andreeva-russia-relations',
            loc: {
              section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
              para: '11'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/russia-i-relations/'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'Āḡā Moḥammad Khan Qājār, who had become master of the central Iranian plateau by 1794, was determined to recover provinces in the north that had once belonged to the Safavid empire.',
          lang: 'en',
          cite: { source: 'iranica-hitchins-erekle-ii', loc: { section: 'EREKLE II', para: '8' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/erekle-ii'
          }
        },
        {
          id: 'q4',
          text: 'Georgia was the special object of his ambitions.',
          lang: 'en',
          cite: {
            source: 'iranica-hitchins-georgia-ii-iranian-georgian-relations',
            loc: { section: 'GEORGIA ii. History of Iranian-Georgian Relations', para: '26' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/georgia-ii-history'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q5',
          text: 'The Russians, having underestimated Āḡā Moḥammad’s determination and generalship, had no troops south of the Caucasus to help their new protectorate.',
          lang: 'en',
          cite: {
            source: 'iranica-perry-aga-mohammad-khan-qajar',
            loc: { section: 'ĀḠĀ MOḤAMMAD KHAN QĀJĀR', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/aga-mohammad-khan'
          }
        },
        {
          id: 'q6',
          text: 'The assassination of Āḡā Moḥammad in 1797 spared Kartli-Kakheti more devastation.',
          lang: 'en',
          cite: { source: 'iranica-hitchins-erekle-ii', loc: { section: 'EREKLE II', para: '8' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/erekle-ii'
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
            value: { d: '1783' },
            cites: [
              {
                source: 'iranica-perry-aga-mohammad-khan-qajar',
                loc: { section: 'ĀḠĀ MOḤAMMAD KHAN QĀJĀR', para: '6' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q7',
        text: 'In 1783 King Erekli II of the Georgian provinces of Kartli-Kakheti (the Safavid tributary of Gorǰestān), having secured virtual autonomy since 1747, sought to preserve this through an offensive and defensive alliance with Russia concluded at Giorgievsk',
        lang: 'en',
        cite: {
          source: 'iranica-perry-aga-mohammad-khan-qajar',
          loc: { section: 'ĀḠĀ MOḤAMMAD KHAN QĀJĀR', para: '6' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.iranicaonline.org/articles/aga-mohammad-khan'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1795-09-11' },
            cites: [
              {
                source: 'iranica-hitchins-erekle-ii',
                loc: { section: 'EREKLE II', para: '8' }
              }
            ],
            heldBy: [
              { kind: 'scholar', name: 'Keith Hitchins', discipline: 'historian' }
            ]
          }
        ]
      },
      quote: {
        id: 'q8',
        text: 'Āḡā Moḥammad responded by attacking the country, capturing Tbilisi in September 1795 and deporting some 15,000 of its inhabitants to Persia as slaves',
        lang: 'en',
        cite: {
          source: 'iranica-hitchins-georgia-ii-iranian-georgian-relations',
          loc: { section: 'GEORGIA ii. History of Iranian-Georgian Relations', para: '26' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.iranicaonline.org/articles/georgia-ii-history'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3d/Metekhi_church%2C_Tbilisi._An_1748_inscription_of_King_Heraclius_II_on_the_eastern_wall.jpg/1280px-Metekhi_church%2C_Tbilisi._An_1748_inscription_of_King_Heraclius_II_on_the_eastern_wall.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Metekhi_church,_Tbilisi._An_1748_inscription_of_King_Heraclius_II_on_the_eastern_wall.jpg',
    credit: { creator: 'Kober' },
    license: { id: 'cc0' }
  }
})

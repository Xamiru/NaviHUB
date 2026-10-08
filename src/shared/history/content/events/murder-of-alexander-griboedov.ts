import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'murder-of-alexander-griboedov',
  names: [
    { text: 'Murder of Alexander Griboedov', lang: 'en', role: 'primary' },
    { text: 'قتل گریبایدوف', lang: 'fa', role: 'native' }
  ],
  researched: '2026-10-08',
  type: 'massacre',
  start: {
    alts: [
      {
        value: { d: '1829-02-11' },
        cites: [
          {
            source: 'iranica-bournoutian-griboedov',
            loc: { section: 'GRIBOEDOV, ALEXANDER SERGEEVICH', para: '1' }
          },
          {
            source: 'iranica-andreeva-russia-relations',
            loc: {
              section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
              para: '25'
            }
          }
        ],
        heldBy: [
          { kind: 'scholar', name: 'George A. Bournoutian' },
          { kind: 'scholar', name: 'Elena Andreeva' }
        ]
      },
      {
        value: { d: '1829-02-08' },
        cites: [
          {
            source: 'iranica-busse-abbas-mirza',
            loc: { section: 'ʿABBĀS MĪRZĀ QAJAR', para: '6' }
          }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Heribert Busse' }
        ]
      }
    ]
  },
  regions: ['iran', 'russia-central-asia'],
  prominence: 2,
  places: [
    {
      ref: 'place:tehran',
      cites: [
        {
          source: 'iranica-andreeva-russia-relations',
          loc: {
            section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
            para: '25'
          }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'period:qajar-dynasty' }
  ],
  related: [
    {
      ref: 'event:khosrow-mirza-mission-to-saint-petersburg',
      rel: 'led-to',
      cites: [
        {
          source: 'iranica-bournoutian-khosrow-mirza',
          loc: { section: 'ḴOSROW MIRZĀ QĀJĀR', para: '2' }
        }
      ]
    }
  ],
  polities: [
    { ref: 'polity:qajar-iran' },
    { ref: 'polity:russian-empire' }
  ],
  participants: [
    {
      ref: 'person:alexander-griboedov',
      role: 'victim',
      cites: [
        {
          source: 'iranica-andreeva-russia-relations',
          loc: {
            section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
            para: '25'
          }
        }
      ]
    },
    {
      name: 'Ḥāji Mirzā Masiḥ Astarābādi',
      role: 'organizer',
      cites: [
        {
          source: 'iranica-andreeva-russia-relations',
          loc: {
            section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
            para: '25'
          }
        }
      ]
    },
    {
      name: 'Āḡā Yaʿqub Khan',
      role: 'participant',
      cites: [
        {
          source: 'iranica-andreeva-russia-relations',
          loc: {
            section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
            para: '25'
          }
        }
      ]
    },
    {
      name: 'Allāhyār Khan Āṣaf-al-Dawla',
      role: 'participant',
      cites: [
        {
          source: 'iranica-andreeva-russia-relations',
          loc: {
            section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
            para: '25'
          }
        }
      ]
    },
    {
      ref: 'person:fath-ali-shah-qajar',
      role: 'head-of-state',
      cites: [
        {
          source: 'iranica-bournoutian-griboedov',
          loc: { section: 'GRIBOEDOV, ALEXANDER SERGEEVICH', para: '1' }
        }
      ]
    },
    {
      ref: 'person:abbas-mirza',
      role: 'participant',
      cites: [
        {
          source: 'iranica-busse-abbas-mirza',
          loc: { section: 'ʿABBĀS MĪRZĀ QAJAR', para: '6' }
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
          text: 'Anti-Russian feeling was tragically demonstrated in the murder of Russian ambassador Alexander Griboedov (Figure 1) and his whole embassy (with one exception).',
          lang: 'en',
          cite: {
            source: 'iranica-andreeva-russia-relations',
            loc: {
              section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
              para: '25'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/russia-i-relations/'
          }
        },
        {
          id: 'q2',
          text: 'On 11 February 1829, a mob instigated by Ḥāji Mirzā Masiḥ Astarābādi, a prominent religious authority (mojtahed) in Tehran, stormed the Russian legation and murdered all the members of the mission except for one man who was able to hide.',
          lang: 'en',
          cite: {
            source: 'iranica-andreeva-russia-relations',
            loc: {
              section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
              para: '25'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
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
          text: 'The author of the famous comedy Woe from Wit, Griboedov was appointed Russian minister to Tehran in 1828 and charged with implementing the treaty of Torkmānčāy, including the indemnity and return of Russian prisoners of war.',
          lang: 'en',
          cite: {
            source: 'iranica-andreeva-russia-relations',
            loc: {
              section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
              para: '25'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/russia-i-relations/'
          }
        },
        {
          id: 'q4',
          text: 'He also attempted to impose on Iran a war against the Ottoman empire to support the Russians.',
          lang: 'en',
          cite: {
            source: 'iranica-andreeva-russia-relations',
            loc: {
              section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
              para: '25'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/russia-i-relations/'
          }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q5',
          text: 'When the Russian envoy Griboedov was assassinated in Tehran (8 February 1829), the crown prince declared a three-day period of public mourning and sent his son, Ḵosrow Mīrzā , on a mission of atonement to Russia.',
          lang: 'en',
          cite: {
            source: 'iranica-busse-abbas-mirza',
            loc: { section: 'ʿABBĀS MĪRZĀ QAJAR', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/abbas-mirza'
          }
        },
        {
          id: 'q6',
          text: 'The prince received a cordial welcome in St. Petersburg and was granted forgiveness, since Russia, which was then at war with the Ottomans, was not prepared to start another war with Iran',
          lang: 'en',
          cite: {
            source: 'iranica-andreeva-russia-relations',
            loc: {
              section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
              para: '25'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/russia-i-relations/'
          }
        },
        {
          id: 'q7',
          text: 'The death of Griboedov, who was a liberal and who advocated regional autonomy for the Christians in Transcaucasia, was probably not a great loss for Tsar Nicholas or General Paskevich, both of whom wished to Russianize the minorities in the Caucasus.',
          lang: 'en',
          cite: {
            source: 'iranica-bournoutian-griboedov',
            loc: { section: 'GRIBOEDOV, ALEXANDER SERGEEVICH', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/griboedov-alexander-sergeevich/'
          }
        },
        {
          id: 'q8',
          text: 'The Russo-Turkish War of 1828-29 might have been another reason for the Russian inaction.',
          lang: 'en',
          cite: {
            source: 'iranica-bournoutian-griboedov',
            loc: { section: 'GRIBOEDOV, ALEXANDER SERGEEVICH', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/griboedov-alexander-sergeevich/'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/be/Ivan_Nikolayevich_Kramskoi_-_Portrait_of_Alexander_Sergeyevich_Griboyedov%2C_1873.jpg/1280px-Ivan_Nikolayevich_Kramskoi_-_Portrait_of_Alexander_Sergeyevich_Griboyedov%2C_1873.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Ivan_Nikolayevich_Kramskoi_-_Portrait_of_Alexander_Sergeyevich_Griboyedov,_1873.jpg',
    credit: { creator: 'Ivan Kramskoi' },
    license: { id: 'public-domain' }
  },
  furtherReading: [
    { source: 'potto-1885-kavkazskaia-voina', perspective: 'russian-soviet' }
  ]
})

import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'russian-expedition-to-the-caucasus-1796',
  names: [
    { text: 'Russian expedition to the Caucasus', lang: 'en', role: 'primary' },
    {
      text: 'Zubov expedition',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-andreeva-russia-relations',
          loc: {
            section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
            para: '11'
          }
        }
      ]
    }
  ],
  researched: '2026-10-13',
  type: 'expedition',
  start: {
    alts: [
      {
        value: { d: '1796' },
        cites: [
          {
            source: 'iranica-andreeva-russia-relations',
            loc: {
              section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
              para: '11'
            }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1796-11' },
        cites: [
          {
            source: 'iranica-andreeva-russia-relations',
            loc: {
              section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
              para: '11'
            }
          }
        ]
      }
    ]
  },
  regions: ['russia-central-asia', 'iran'],
  prominence: 3,
  sides: [
    {
      key: 'russia',
      name: 'Russians',
      polity: 'polity:russian-empire',
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
      key: 'qajars',
      name: 'Qajars',
      polity: 'polity:qajar-iran',
      cites: [
        {
          source: 'iranica-andreeva-russia-relations',
          loc: {
            section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
            para: '11'
          }
        }
      ]
    }
  ],
  participants: [
    {
      name: 'Valerian Zubov',
      role: 'commander',
      side: 'russia',
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
      ref: 'person:catherine-the-great',
      role: 'leader',
      side: 'russia',
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
      ref: 'person:agha-mohammad-khan-qajar',
      role: 'leader',
      side: 'qajars',
      cites: [
        {
          source: 'iranica-andreeva-russia-relations',
          loc: {
            section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
            para: '11'
          }
        }
      ]
    }
  ],
  figures: [
    {
      key: 'combatants',
      side: 'russia',
      value: {
        alts: [
          {
            value: { min: 10000, max: 30000 },
            cites: [
              {
                source: 'iranica-andreeva-russia-relations',
                loc: {
                  section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
                  para: '11'
                }
              }
            ],
            heldBy: [
              { kind: 'scholar', name: 'Elena Andreeva', discipline: 'historian' }
            ]
          }
        ]
      }
    }
  ],
  related: [
    {
      ref: 'event:sack-of-tbilisi-1795',
      rel: 'response-to',
      cites: [
        {
          source: 'iranica-andreeva-russia-relations',
          loc: {
            section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
            para: '11'
          }
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
          text: 'Āḡā Moḥammad’s ability to enforce all these demands was not put to the test, for that autumn the Empress Catherine II, to avenge the sack of Tiflis, dispatched an army under the twenty-four-year-old Valerian Zubov which, by the end of the season, had subjugated all the Caspian littoral up to the Moḡān steppe and appeared poised for a march on Tehran.',
          lang: 'en',
          cite: {
            source: 'iranica-perry-aga-mohammad-khan-qajar',
            loc: { section: 'ĀḠĀ MOḤAMMAD KHAN QĀJĀR', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/aga-mohammad-khan'
          }
        },
        {
          id: 'q2',
          text: 'Valerian Zubov, who led the army, obtained submission of most khans in the eastern Caucasus, but the occupation lasted less than a year.',
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
      kind: 'course',
      quotes: [
        {
          id: 'q3',
          text: 'Derbent was taken possession of by Imhov, Baku and Shumakhy were occupied and Gilan was threatened.',
          lang: 'en',
          cite: { source: 'britannica-1911-persia', loc: { section: 'PERSIA', para: '1123' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Persia'
          }
        },
        {
          id: 'q4',
          text: 'Erivan surrendered, but Shusha continued to hold out.',
          lang: 'en',
          cite: { source: 'britannica-1911-persia', loc: { section: 'PERSIA', para: '1123' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Persia'
          }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q5',
          text: 'The Russian and Iranian armies never met on a battlefield; in November 1796, Catherine the Great died, and her son and new Russian emperor Paul (r. 1796-1801) immediately ordered the troops back from the Caucasus.',
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
        },
        {
          id: 'q6',
          text: 'The whole campaign was an embarrassing failure for the Russians.',
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
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/f/f3/Valerian_Zubov_by_A.C.Ritt.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Valerian_Zubov_by_A.C.Ritt.jpg',
    credit: { institution: 'Hermitage Museum', creator: 'Augustin Ritt' },
    license: { id: 'public-domain' }
  }
})

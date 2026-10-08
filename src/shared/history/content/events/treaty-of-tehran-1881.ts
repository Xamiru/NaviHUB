import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'treaty-of-tehran-1881',
  names: [
    { text: 'Treaty of Tehran (1881)', lang: 'en', role: 'primary' },
    { text: 'عهدنامه آخال', lang: 'fa', role: 'native' },
    {
      text: 'Convention of 1881',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-andreeva-russia-relations',
          loc: {
            section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
            para: '33'
          }
        }
      ]
    },
    { text: 'Akhal-Khorasan boundary convention', lang: 'en', role: 'alternative' }
  ],
  researched: '2026-10-08',
  type: 'treaty',
  start: {
    alts: [
      {
        value: { d: '1881' },
        cites: [
          {
            source: 'iranica-de-planhol-boundaries-russia',
            loc: { section: 'BOUNDARIES ii. With Russia', para: '7' }
          },
          {
            source: 'iranica-andreeva-russia-relations',
            loc: {
              section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
              para: '33'
            }
          }
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
          source: 'iranica-de-planhol-boundaries-russia',
          loc: { section: 'BOUNDARIES ii. With Russia', para: '7' }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'period:qajar-dynasty' },
    { ref: 'period:reign-of-naser-al-din-shah-qajar' }
  ],
  related: [
    { ref: 'event:russian-conquest-of-central-asia', rel: 'related' }
  ],
  sides: [
    {
      key: 'persia',
      name: 'Iran',
      polity: 'polity:qajar-iran',
      cites: [
        {
          source: 'iranica-andreeva-russia-relations',
          loc: {
            section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
            para: '33'
          }
        }
      ]
    },
    {
      key: 'russia',
      name: 'Russia',
      polity: 'polity:russian-empire',
      cites: [
        {
          source: 'iranica-andreeva-russia-relations',
          loc: {
            section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
            para: '33'
          }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:naser-al-din-shah-qajar',
      role: 'head-of-state',
      side: 'persia',
      cites: [
        {
          source: 'iranica-andreeva-russia-relations',
          loc: {
            section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
            para: '32'
          }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'background',
      quotes: [
        {
          id: 'q1',
          text: 'After the fall of Geok Tepe in 1881, most of the Turcoman territories of Transcaspia fell under the Russian rule.',
          lang: 'en',
          cite: {
            source: 'iranica-andreeva-russia-relations',
            loc: {
              section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
              para: '32'
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
          text: 'The second phase of defining the land frontier was linked to the pacification of the Turkman population.',
          lang: 'en',
          cite: {
            source: 'iranica-de-planhol-boundaries-russia',
            loc: { section: 'BOUNDARIES ii. With Russia', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/boundaries-ii'
          }
        }
      ]
    },
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q4',
          text: 'The pacification of the Teke by Russian troops in the 1880s naturally established the frontier at the foot of the mountains of Khorasan. The Treaty of Tehran in 1881 (text in Krausse, pp. 360-62) defined the line precisely, first along the Atrak as far as Čāt, from there following the base of the mountains to Loṭfābād in the Daragaz.',
          lang: 'en',
          cite: {
            source: 'iranica-de-planhol-boundaries-russia',
            loc: { section: 'BOUNDARIES ii. With Russia', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.iranicaonline.org/articles/boundaries-ii'
          }
        },
        {
          id: 'q5',
          text: 'In the same year, a convention relating to Russo-Iranian border east of the Caspian Sea was signed, which drew the border mainly along the Atrak River (text in Krausse, pp. 360-62).',
          lang: 'en',
          cite: {
            source: 'iranica-andreeva-russia-relations',
            loc: {
              section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
              para: '33'
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
      kind: 'consequences',
      quotes: [
        {
          id: 'q6',
          text: 'It incorporated into the Russian empire almost all the Turkman populations in the latter region.',
          lang: 'en',
          cite: {
            source: 'iranica-de-planhol-boundaries-russia',
            loc: { section: 'BOUNDARIES ii. With Russia', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/boundaries-ii'
          }
        },
        {
          id: 'q7',
          text: 'According to the Convention of 1881, Russia appointed its representatives to the Iranian border towns Qučān, Bojnurd, and Moḥammadābād.',
          lang: 'en',
          cite: {
            source: 'iranica-andreeva-russia-relations',
            loc: {
              section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
              para: '33'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/russia-i-relations/'
          }
        },
        {
          id: 'q8',
          text: 'The treaty forbade populations subject to Iran to attempt any new agricultural undertaking that would draw on waters flowing down the northeastern slopes of these mountains.',
          lang: 'en',
          cite: {
            source: 'iranica-de-planhol-boundaries-russia',
            loc: { section: 'BOUNDARIES ii. With Russia', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/boundaries-ii'
          }
        },
        {
          id: 'q9',
          text: 'The frontier was immediately effective along the whole mountain sector.',
          lang: 'en',
          cite: {
            source: 'iranica-de-planhol-boundaries-russia',
            loc: { section: 'BOUNDARIES ii. With Russia', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/boundaries-ii'
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
            value: { d: '1883' },
            cites: [
              {
                source: 'iranica-andreeva-russia-relations',
                loc: {
                  section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
                  para: '33'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'In 1883, in addition to the Convention of 1881, a secret agreement was signed, which granted Russia the right to occupy Khorasan in case of a threat to the Transcaspian railroad.',
        lang: 'en',
        cite: {
          source: 'iranica-andreeva-russia-relations',
          loc: {
            section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
            para: '33'
          }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/russia-i-relations/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1884-02' },
            cites: [
              {
                source: 'iranica-balland-boundaries-afghanistan',
                loc: { section: 'BOUNDARIES iii. Boundaries of Afghanistan', para: '8' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'In the absence of any physical feature on which to fix the line, it was soon agreed that the latter would follow as closely as possible the property and pastoral rights of the local populations: on one side, Turkmen who had been under Russian protection since the submission of Merv (Mary) in February, 1884, and, on the other, Uzbeks, Aymāq, and Pashtun, who were Afghan subjects.',
        lang: 'en',
        cite: {
          source: 'iranica-balland-boundaries-afghanistan',
          loc: { section: 'BOUNDARIES iii. Boundaries of Afghanistan', para: '8' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/boundaries-iii'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1884' },
            cites: [
              {
                source: 'iranica-de-planhol-boundaries-russia',
                loc: { section: 'BOUNDARIES ii. With Russia', para: '8' }
              }
            ]
          },
          {
            value: { d: '1885' },
            cites: [
              {
                source: 'iranica-andreeva-russia-relations',
                loc: {
                  section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
                  para: '33'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'Farther east a single point of contact was established: at Saraḵs, where in 1884 the Russians had occupied the old city on the eastern bank of the Tajan, facing the Iranian post on the western bank, thus fixing the frontier de facto on the river as far as Afghanistan.',
        lang: 'en',
        cite: {
          source: 'iranica-de-planhol-boundaries-russia',
          loc: { section: 'BOUNDARIES ii. With Russia', para: '8' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/boundaries-ii'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/6/60/Antoin_Sevruguin_51_8_SI.jpg/1280px-Antoin_Sevruguin_51_8_SI.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Antoin_Sevruguin_51_8_SI.jpg',
    credit: {
      institution: 'Freer Gallery of Art and Arthur M. Sackler Gallery Archives, Smithsonian Institution',
      creator: 'Antoin Sevruguin'
    },
    license: { id: 'public-domain' }
  },
  furtherReading: [
    { source: 'sheikholeslami-1991-elal-e-afzayesh-e-nofuz', perspective: 'iranian' }
  ]
})

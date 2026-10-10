import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'manjil-rudbar-earthquake',
  names: [
    { text: 'Manjil–Rudbar earthquake', lang: 'en', role: 'primary' },
    { text: 'زمین‌لرزه منجیل و رودبار', lang: 'fa', role: 'native' },
    {
      text: 'Manjil-Rudbār earthquake',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'iranica-bazin-bromberger-rudbar', loc: { section: 'RUDBĀR', para: '8' } }
      ]
    }
  ],
  researched: '2026-10-10',
  type: 'disaster',
  start: {
    alts: [
      {
        value: { d: '1990-06-21' },
        cites: [
          { source: 'iranica-bazin-manjil', loc: { section: 'MANJIL', para: '5' } },
          { source: 'iranica-bazin-bromberger-rudbar', loc: { section: 'RUDBĀR', para: '8' } }
        ]
      },
      {
        value: { d: '1990-06-20' },
        cites: [
          { source: 'iranica-bazin-manjil', loc: { section: 'MANJIL', para: '7' } }
        ],
        heldBy: [
          { kind: 'organization', name: 'Association Française de Génie Parasismique' }
        ]
      }
    ]
  },
  regions: ['iran'],
  prominence: 2,
  places: [
    {
      ref: 'place:manjil',
      cites: [
        { source: 'iranica-bazin-manjil', loc: { section: 'MANJIL', para: '5' } }
      ]
    },
    {
      ref: 'place:rudbar',
      cites: [
        { source: 'iranica-bazin-bromberger-rudbar', loc: { section: 'RUDBĀR', para: '8' } }
      ]
    },
    {
      ref: 'place:gilan',
      cites: [
        { source: 'iranica-bazin-bromberger-rudbar', loc: { section: 'RUDBĀR', para: '1' } }
      ]
    }
  ],
  figures: [
    {
      key: 'deaths',
      value: {
        alts: [
          {
            value: { min: 40000 },
            cites: [
              {
                source: 'iranica-bazin-bromberger-rudbar',
                loc: { section: 'RUDBĀR', para: '8' }
              },
              { source: 'iranica-bazin-manjil', loc: { section: 'MANJIL', para: '5' } },
              {
                source: 'iranica-yarshater-chronology-part-4',
                loc: { section: 'Chronology of Iranian History Part 4, 1990' }
              }
            ]
          }
        ]
      }
    },
    {
      key: 'wounded',
      value: {
        alts: [
          {
            value: { min: 60000 },
            cites: [
              {
                source: 'iranica-bazin-bromberger-rudbar',
                loc: { section: 'RUDBĀR', para: '8' }
              }
            ]
          }
        ]
      }
    },
    {
      key: 'displaced',
      value: {
        alts: [
          {
            value: { min: 500000 },
            cites: [
              { source: 'iranica-bazin-manjil', loc: { section: 'MANJIL', para: '5' } },
              {
                source: 'iranica-bazin-bromberger-rudbar',
                loc: { section: 'RUDBĀR', para: '8' }
              }
            ]
          }
        ]
      }
    }
  ],
  related: [
    {
      ref: 'period:presidency-of-akbar-hashemi-rafsanjani',
      rel: 'related',
      cites: [
        {
          source: 'iranica-yarshater-chronology-part-4',
          loc: { section: 'Chronology of Iranian History Part 4, 1989–97' }
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
          text: 'The whole region was severely damaged by the Manjil-Rudbār earthquake of 21 June 1990, with a magnitude of 7.4 on Richter’s scale',
          lang: 'en',
          cite: { source: 'iranica-bazin-bromberger-rudbar', loc: { section: 'RUDBĀR', para: '8' } },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.iranicaonline.org/articles/rudbar/'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q2',
          text: 'RUDBĀR, town and district in southwestern Gilān.',
          lang: 'en',
          cite: { source: 'iranica-bazin-bromberger-rudbar', loc: { section: 'RUDBĀR', para: '1' } },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.iranicaonline.org/articles/rudbar/'
          }
        },
        {
          id: 'q3',
          text: 'In the 1950s a large reservoir dam was constructed just below the confluence of Qezel-owzan and Šāhrud, where a deep gorge in granitic rock offered a favorable site.',
          lang: 'en',
          cite: { source: 'iranica-bazin-manjil', loc: { section: 'MANJIL', para: '3' } },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.iranicaonline.org/articles/manjil/'
          }
        },
        {
          id: 'q4',
          text: 'Together with this hydraulic function of fostering paddy cultivation in the Gilān plain, the dam has been equipped with a hydroelectric plant with an installed power of 87.5 megawatt.',
          lang: 'en',
          cite: { source: 'iranica-bazin-manjil', loc: { section: 'MANJIL', para: '4' } },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.iranicaonline.org/articles/manjil/'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q5',
          text: 'The town was nearly destroyed by the Manjil-Rudbār earthquake on 21 June 1990, at half past midnight, with a magnitude of 7.4 on the Richter scale',
          lang: 'en',
          cite: { source: 'iranica-bazin-manjil', loc: { section: 'MANJIL', para: '5' } },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.iranicaonline.org/articles/manjil/'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q6',
          text: 'The Manjil dam was damaged too, with a number of repairable splits; the dam was subsequently retrofitted.',
          lang: 'en',
          cite: { source: 'iranica-bazin-manjil', loc: { section: 'MANJIL', para: '5' } },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.iranicaonline.org/articles/manjil/'
          }
        },
        {
          id: 'q7',
          text: 'Reconstruction of the infrastructure and residential and commercial buildings, installation of windmills since 2003, and construction of a new Qazvin-Rašt highway allowed a quick revival of the town, whose population surpassed 16,000 in 2006.',
          lang: 'en',
          cite: { source: 'iranica-bazin-manjil', loc: { section: 'MANJIL', para: '5' } },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.iranicaonline.org/articles/manjil/'
          }
        },
        {
          id: 'q8',
          text: 'In spite of a rapid reconstruction and of the building of a Qazvin-Rašt freeway, which doubled the preexistent highway, Rudbār did not recover its previous population',
          lang: 'en',
          cite: { source: 'iranica-bazin-bromberger-rudbar', loc: { section: 'RUDBĀR', para: '8' } },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.iranicaonline.org/articles/rudbar/'
          }
        }
      ]
    },
    {
      kind: 'casualties',
      quotes: [
        {
          id: 'q9',
          text: 'The three towns of Rudbār, Manjil, and Lowšān and some 700 villages were destroyed; 40,000 people were killed, 60,000 injured, and 500,000 left homeless, far beyond the limits of Rudbār šahrestān.',
          lang: 'en',
          cite: { source: 'iranica-bazin-bromberger-rudbar', loc: { section: 'RUDBĀR', para: '8' } },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.iranicaonline.org/articles/rudbar/'
          }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q10',
          text: 'The filmmaker ʿAbbās Kiārostami has devoted three of his best-known films to the region of Rudbār before and after the earthquake',
          lang: 'en',
          cite: { source: 'iranica-bazin-bromberger-rudbar', loc: { section: 'RUDBĀR', para: '9' } },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.iranicaonline.org/articles/rudbar/'
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
            value: { d: '1990-06-21' },
            cites: [
              { source: 'iranica-bazin-manjil', loc: { section: 'MANJIL', para: '5' } }
            ]
          },
          {
            value: { d: '1990-06-20' },
            cites: [
              { source: 'iranica-bazin-manjil', loc: { section: 'MANJIL', para: '7' } }
            ],
            heldBy: [
              { kind: 'organization', name: 'Association Française de Génie Parasismique' }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'A major earthquake strikes western Iran, killing over 40,000 people, with Zanjan and Gilan provinces particularly hard hit.',
        lang: 'en',
        cite: {
          source: 'iranica-yarshater-chronology-part-4',
          loc: { section: 'Chronology of Iranian History Part 4, 1990' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-10',
          url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-4/'
        }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/1990_Manjil%E2%80%93Rudbar_earthquake_shakemap.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:1990_Manjil%E2%80%93Rudbar_earthquake_shakemap.jpg',
    credit: { institution: 'United States Geological Survey' },
    license: { id: 'public-domain' }
  }
})

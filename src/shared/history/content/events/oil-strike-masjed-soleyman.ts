import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'oil-strike-masjed-soleyman',
  names: [
    { text: 'Oil strike at Masjed Soleyman', lang: 'en', role: 'primary' },
    { text: 'کشف نفت در مسجد سلیمان', lang: 'fa', role: 'native' }
  ],
  researched: '2026-10-08',
  type: 'discovery',
  start: {
    alts: [
      {
        value: { d: '1908-05-26' },
        cites: [
          {
            source: 'iranica-mina-oil-agreements',
            loc: { section: 'OIL AGREEMENTS IN IRAN', para: '5' }
          }
        ]
      }
    ]
  },
  regions: ['iran'],
  prominence: 1,
  places: [
    { ref: 'place:masjed-soleyman' }
  ],
  related: [
    {
      ref: 'event:anglo-persian-oil-company-formation',
      rel: 'led-to',
      cites: [
        {
          source: 'iranica-mina-oil-agreements',
          loc: { section: 'OIL AGREEMENTS IN IRAN', para: '6' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q2',
          text: 'Shortly after 4.00 A.M. on the 26th of May 1908, a gusher of petroleum, rising perhaps fifty feet above the top of the drilling rig, was smothering the drillers and oil had been at last struck in Persia.',
          lang: 'en',
          cite: {
            source: 'iranica-mina-oil-agreements',
            loc: { section: 'OIL AGREEMENTS IN IRAN', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/oil-agreements-in-iran/'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'The first site chosen for exploration was at Čiā Sorḵ, an almost inaccessible plateau in the mountains of western Persia, north of Qaṣr-e Širin. Work proceeded but mounting expenditure forced D’Arcy to seek financial backing in order to keep the concession afloat. By April 1904, less than three years after its inception, the venture was on the verge of collapse',
          lang: 'en',
          cite: {
            source: 'iranica-mina-oil-agreements',
            loc: { section: 'OIL AGREEMENTS IN IRAN', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/oil-agreements-in-iran/'
          }
        },
        {
          id: 'q1',
          text: 'The specific well location, Masjed-e Soleymān, was named after a nearby fire temple.',
          lang: 'en',
          cite: {
            source: 'iranica-mina-oil-agreements',
            loc: { section: 'OIL AGREEMENTS IN IRAN', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/oil-agreements-in-iran/'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q6',
          text: 'A major new source of oil had been secured under British protection.',
          lang: 'en',
          cite: {
            source: 'iranica-mina-oil-agreements',
            loc: { section: 'OIL AGREEMENTS IN IRAN', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/oil-agreements-in-iran/'
          }
        },
        {
          id: 'q7',
          text: 'British government involvement in the oil concession was intimately connected with the imminent conversion of the Royal Navy to oil fuel. The British provided indirect financial assistance and political backing to D’Arcy’s company, and in 1909, through complicated financial arrangements and intricate political maneuvers, the original D’Arcy concession became the Anglo-Persian Oil Company',
          lang: 'en',
          cite: {
            source: 'iranica-kazemi-anglo-persian-oil-company',
            loc: { section: 'ANGLO-PERSIAN OIL COMPANY', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/anglo-persian-oil-company/'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/9/94/FirstoildrillingMIS.jpg/1280px-FirstoildrillingMIS.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:FirstoildrillingMIS.jpg',
    credit: {
      institution: 'National Iranian Oil Company (Oil and Economic Development of Iran, 1967)'
    },
    license: { id: 'public-domain' }
  },
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1905' },
            cites: [
              {
                source: 'iranica-mina-oil-agreements',
                loc: { section: 'OIL AGREEMENTS IN IRAN', para: '4' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q4',
        text: 'Finally, in 1905, almost exactly four years to the day when the Shah had initialed the concession in Tehran, the match was consummated between D’Arcy and Burma Oil in London. Their agreement established the so-called concession syndicate.',
        lang: 'en',
        cite: {
          source: 'iranica-mina-oil-agreements',
          loc: { section: 'OIL AGREEMENTS IN IRAN', para: '4' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://www.iranicaonline.org/articles/oil-agreements-in-iran/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1905' },
            cites: [
              {
                source: 'iranica-mina-oil-agreements',
                loc: { section: 'OIL AGREEMENTS IN IRAN', para: '4' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q5',
        text: 'The establishment of the concession syndicate was followed by a shift in the location of the exploration to a site in southwestern Persia at Maidān-e-Naftān (the plain of oil).',
        lang: 'en',
        cite: {
          source: 'iranica-mina-oil-agreements',
          loc: { section: 'OIL AGREEMENTS IN IRAN', para: '5' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://www.iranicaonline.org/articles/oil-agreements-in-iran/'
        }
      }
    }
  ],
  participants: [
    {
      ref: 'person:william-knox-darcy',
      role: 'organizer',
      cites: [
        {
          source: 'iranica-mina-oil-agreements',
          loc: { section: 'OIL AGREEMENTS IN IRAN', para: '3' }
        },
        {
          source: 'iranica-mina-oil-agreements',
          loc: { section: 'OIL AGREEMENTS IN IRAN', para: '4' }
        }
      ]
    },
    {
      name: 'George Reynolds',
      role: 'participant',
      cites: [
        {
          source: 'iranica-mina-oil-agreements',
          loc: { section: 'OIL AGREEMENTS IN IRAN', para: '3' }
        }
      ]
    },
    {
      name: 'Burma Oil',
      role: 'participant',
      cites: [
        {
          source: 'iranica-mina-oil-agreements',
          loc: { section: 'OIL AGREEMENTS IN IRAN', para: '4' }
        }
      ]
    }
  ],
  furtherReading: [
    { source: 'fateh-1979-panjah-sal-naft-e-iran', perspective: 'iranian' },
    { source: 'rouhani-1973-tarikh-e-melli-shodan-e-sanat-e-naft', perspective: 'iranian' }
  ]
})

import { definePerson } from '../../schema'

export default definePerson({
  id: 'alexander-griboedov',
  names: [
    { text: 'Alexander Griboedov', lang: 'en', role: 'primary' },
    { text: 'Александр Сергеевич Грибоедов', lang: 'ru', role: 'native' },
    { text: 'Griboyedov', lang: 'en', role: 'alternative' }
  ],
  researched: '2026-10-06',
  born: {
    alts: [
      {
        value: { d: '1794-01-15' },
        cites: [
          {
            source: 'iranica-bournoutian-griboedov',
            loc: { section: 'GRIBOEDOV, ALEXANDER SERGEEVICH', para: '1' }
          }
        ]
      }
    ]
  },
  died: {
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
  bornIn: {
    ref: 'place:moscow',
    cites: [
      {
        source: 'iranica-bournoutian-griboedov',
        loc: { section: 'GRIBOEDOV, ALEXANDER SERGEEVICH', para: '1' }
      }
    ]
  },
  diedIn: {
    ref: 'place:tehran',
    cites: [
      {
        source: 'iranica-bournoutian-griboedov',
        loc: { section: 'GRIBOEDOV, ALEXANDER SERGEEVICH', para: '1' }
      }
    ]
  },
  regions: ['russia-central-asia', 'iran'],
  roles: ['diplomat', 'writer'],
  offices: [
    {
      title: 'ambassador plenipotentiary (wazir-e moḵtār) to Persia',
      start: {
        alts: [
          {
            value: { d: '1828-04' },
            cites: [
              {
                source: 'iranica-bournoutian-griboedov',
                loc: { section: 'GRIBOEDOV, ALEXANDER SERGEEVICH', para: '1' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'iranica-bournoutian-griboedov',
          loc: { section: 'GRIBOEDOV, ALEXANDER SERGEEVICH', para: '1' }
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
          text: 'GRIBOEDOV, ALEXANDER SERGEEVICH (b. Moscow, 15 January 1794; killed in Tehran, 11 February 1829; Figure 1), Russian writer, poet, and playwright, whose most famous work is the play Gore ot uma (Woe from wit).',
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
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q2',
          text: 'Griboedov joined the Russian administration in Transcaucasia in early 1819 and was sent by the Chief Administrator, General Ermolov, to Persia to establish the Russian Mission in Tehran. He remained in Persia until the end of 1821.',
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
          id: 'q3',
          text: 'Between 1823 and 1825 Griboedov lived in St. Petersburg, where he made the acquaintance of reformists (later Decembrists), but did not join their ranks.',
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
          id: 'q4',
          text: 'Following the Decembrist revolt he was arrested in Grozny (Chechnia) and sent to St. Petersburg, where he was personally questioned by Tsar Nicholas I in June 1826.',
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
          id: 'q5',
          text: 'He took part in the siege of Erevan by General Ivan Paskevich.',
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
          id: 'q6',
          text: 'Griboedov’s knowledge of Persia was instrumental in his active role during negotiations of the Treaty of Torkamānčāy in February 1828.',
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
          id: 'q7',
          text: 'Following its ratification, Griboedov was appointed ambassador plenipotentiary (wazir-e moḵtār) to Persia in April 1828.',
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
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q8',
          text: 'Griboedov’s body was transported to Tbilisi, where it was buried near the church in the St. David Monastery on Mtsaminda Hill.',
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
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/be/Ivan_Nikolayevich_Kramskoi_-_Portrait_of_Alexander_Sergeyevich_Griboyedov%2C_1873.jpg/1280px-Ivan_Nikolayevich_Kramskoi_-_Portrait_of_Alexander_Sergeyevich_Griboyedov%2C_1873.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Ivan_Nikolayevich_Kramskoi_-_Portrait_of_Alexander_Sergeyevich_Griboyedov,_1873.jpg',
    credit: { creator: 'Ivan Kramskoi' },
    license: { id: 'public-domain' }
  }
})

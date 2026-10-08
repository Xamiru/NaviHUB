import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'russian-annexation-of-georgia',
  names: [
    { text: 'Russian annexation of Georgia', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-08',
  type: 'occupation',
  start: {
    alts: [
      {
        value: { d: '1800' },
        cites: [
          {
            source: 'iranica-amanat-fath-ali-shah',
            loc: { section: 'FATḤ-ʿALĪ SHAH QĀJĀR', para: '10' }
          }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Abbas Amanat' }
        ]
      },
      {
        value: { d: '1801' },
        cites: [
          {
            source: 'iranica-busse-abbas-mirza',
            loc: { section: 'ʿABBĀS MĪRZĀ QAJAR', para: '4' }
          },
          {
            source: 'iranica-andreeva-russia-relations',
            loc: {
              section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
              para: '15'
            }
          },
          {
            source: 'loc-georgia-country-study-1994',
            loc: {
              section: 'Within the Russian Empire: Russian Influence in the Nineteenth Century',
              para: '3'
            }
          }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Heribert Busse' },
          { kind: 'scholar', name: 'Elena Andreeva' },
          { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
        ]
      },
      {
        value: { d: '1803' },
        cites: [
          {
            source: 'iranica-cronin-army-qajar',
            loc: { section: 'ARMY v. Qajar Period', para: '6' }
          }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Stephanie Cronin' }
        ]
      }
    ]
  },
  regions: ['russia-central-asia', 'iran'],
  prominence: 2,
  polities: [
    { ref: 'polity:russian-empire' },
    { ref: 'polity:qajar-iran' }
  ],
  participants: [
    {
      ref: 'person:alexander-i-of-russia',
      role: 'head-of-state',
      cites: [
        {
          source: 'iranica-andreeva-russia-relations',
          loc: {
            section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
            para: '15'
          }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:russo-persian-war-1804-1813',
      rel: 'contributed-to',
      cites: [
        {
          source: 'iranica-busse-abbas-mirza',
          loc: { section: 'ʿABBĀS MĪRZĀ QAJAR', para: '4' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q4',
          text: 'In 1801 Tsar Alexander I summarily abolished the kingdom of Kartli-Kakhetia, and the heir to the Bagratid throne was forced to abdicate. In the next decade, the Russian Empire gradually annexed Georgia\'s entire territory. Eastern Georgia (the regions of Kartli and Kakhetia) became part of the Russian Empire in 1801, and western Georgia (Imeretia) was incorporated in 1804.',
          lang: 'en',
          cite: {
            source: 'loc-georgia-country-study-1994',
            loc: {
              section: 'Within the Russian Empire: Russian Influence in the Nineteenth Century',
              para: '3'
            }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/georgia/5.htm' }
        },
        {
          id: 'q1',
          text: 'Simultaneously, a confrontation was impending, since Iran and Russia both claimed the same territories in the eastern Caucasus. Threatened by Fatḥ-ʿAli Shah, Georgia asked Russia for protection in 1799, and the following year Georgia became a part of the Russian empire.',
          lang: 'en',
          cite: {
            source: 'iranica-andreeva-russia-relations',
            loc: {
              section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
              para: '15'
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
          text: 'In 1801, he signed the manifesto of Emperor Paul, according to which territories under the two Georgian Georgian kingdoms became parts of the Russian empire',
          lang: 'en',
          cite: {
            source: 'iranica-andreeva-russia-relations',
            loc: {
              section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
              para: '15'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/russia-i-relations/'
          }
        },
        {
          id: 'q3',
          text: 'However in 1803 Russia invaded and annexed Georgia, considered by Iran a vassal state, and continued to push southwards.',
          lang: 'en',
          cite: {
            source: 'iranica-cronin-army-qajar',
            loc: { section: 'ARMY v. Qajar Period', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/army-v/'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q5',
          text: 'Russia’s inexorable pressure forced Fatḥ-ʿAli Shah and especially the crown prince and governor of Azarbaijan, ʿAbbās Mirzā (1789-1833), to embark on a major military reorganization in the hope of increasing Iran’s defensive capacity',
          lang: 'en',
          cite: {
            source: 'iranica-cronin-army-qajar',
            loc: { section: 'ARMY v. Qajar Period', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/army-v/'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/0/08/George_XII_of_Georgia%2C_copy_by_Grigory_Gagarin.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:George_XII_of_Georgia,_copy_by_Grigory_Gagarin.jpg',
    credit: { institution: 'Art Palace of Georgia', creator: 'Grigory Gagarin' },
    license: { id: 'cc0' }
  },
  furtherReading: [
    {
      source: 'dubrovin-2019-istoriia-voiny-i-vladychestva-russkikh-na-kavkaze',
      perspective: 'russian-soviet'
    }
  ]
})

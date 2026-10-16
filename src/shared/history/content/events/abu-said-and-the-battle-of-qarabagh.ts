import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'abu-said-and-the-battle-of-qarabagh',
  names: [
    { text: 'Abu Said and the battle of Qarabagh', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-16',
  type: 'battle',
  start: {
    alts: [
      {
        value: { d: '1469-01' },
        cites: [
          {
            source: 'iranica-quiring-zoche-aq-qoyunlu',
            loc: { section: 'AQ QOYUNLŪ', para: '12' }
          }
        ]
      },
      {
        value: { d: '1468' },
        cites: [
          { source: 'britannica-1911-persia', loc: { section: 'PERSIA', para: '1046' } }
        ],
        heldBy: [
          { kind: 'organization', name: 'Encyclopædia Britannica (11th edition, 1911)' }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1469-02-05' },
        cites: [
          {
            source: 'iranica-manz-gowhar-sad-aga',
            loc: { section: 'GOWHAR-ŠĀD ĀḠĀ', para: '6' }
          }
        ]
      }
    ]
  },
  regions: ['iran'],
  prominence: 3,
  places: [
    {
      ref: 'place:qarabagh',
      cites: [
        {
          source: 'iranica-quiring-zoche-aq-qoyunlu',
          loc: { section: 'AQ QOYUNLŪ', para: '12' }
        }
      ]
    },
    {
      ref: 'place:herat',
      cites: [
        {
          source: 'iranica-quiring-zoche-aq-qoyunlu',
          loc: { section: 'AQ QOYUNLŪ', para: '12' }
        }
      ]
    }
  ],
  polities: [
    {
      ref: 'polity:timurid-empire',
      cites: [
        {
          source: 'iranica-quiring-zoche-aq-qoyunlu',
          loc: { section: 'AQ QOYUNLŪ', para: '12' }
        }
      ]
    },
    {
      ref: 'polity:aq-qoyunlu',
      cites: [
        {
          source: 'iranica-quiring-zoche-aq-qoyunlu',
          loc: { section: 'AQ QOYUNLŪ', para: '12' }
        }
      ]
    }
  ],
  sides: [
    {
      key: 'timurid',
      name: 'Timurids',
      polity: 'polity:timurid-empire',
      cites: [
        {
          source: 'iranica-quiring-zoche-aq-qoyunlu',
          loc: { section: 'AQ QOYUNLŪ', para: '12' }
        }
      ]
    },
    {
      key: 'aq-qoyunlu',
      name: 'Aq Qoyunlu',
      polity: 'polity:aq-qoyunlu',
      cites: [
        {
          source: 'iranica-quiring-zoche-aq-qoyunlu',
          loc: { section: 'AQ QOYUNLŪ', para: '12' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:abu-said-mirza',
      role: 'commander',
      side: 'timurid',
      cites: [
        {
          source: 'iranica-quiring-zoche-aq-qoyunlu',
          loc: { section: 'AQ QOYUNLŪ', para: '12' }
        }
      ]
    },
    {
      ref: 'person:uzun-hasan',
      role: 'commander',
      side: 'aq-qoyunlu',
      cites: [
        {
          source: 'iranica-quiring-zoche-aq-qoyunlu',
          loc: { section: 'AQ QOYUNLŪ', para: '12' }
        }
      ]
    },
    {
      name: 'Yādgār Moḥammad',
      role: 'perpetrator',
      side: 'timurid',
      cites: [
        {
          source: 'iranica-manz-gowhar-sad-aga',
          loc: { section: 'GOWHAR-ŠĀD ĀḠĀ', para: '6' }
        }
      ]
    }
  ],
  related: [
    { ref: 'event:death-of-shahrukh-and-the-timurid-crisis', rel: 'preceded-by' }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The Timurid Abū Saʿīd, ruling in Herat since 855/1451, saw the Qara Qoyunlū chief’s death as a good occasion for recovery of the Iranian provinces that had been lost to the Turkmans.',
          lang: 'en',
          cite: {
            source: 'iranica-quiring-zoche-aq-qoyunlu',
            loc: { section: 'AQ QOYUNLŪ', para: '12' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/aq-qoyunlu-confederation'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q6',
          text: 'With his last rival for hegemony over western Iran eliminated, Uzun Ḥasan immediately annexed the Iranian provinces up to the borders of Khorasan and moved his government from Āmed to Tabrīz, the traditional seat of authority that had been the capital of not only the Qara Qoyunlū and the Jalayerids but also the Il-khans.',
          lang: 'en',
          cite: {
            source: 'iranica-quiring-zoche-aq-qoyunlu',
            loc: { section: 'AQ QOYUNLŪ', para: '12' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/aq-qoyunlu-confederation'
          }
        },
        {
          id: 'q7',
          text: 'Uzun Ḥasan also attempted to assert suzerainty over the Timurids of Khorasan, but without success; Prince Yādgār Moḥammad, whom he enthroned at Herat, could not hold out for long against the local notables, who supported another Timurid prince, Ḥosayn Bāyqarā (r. 875-912/1470-1506).',
          lang: 'en',
          cite: {
            source: 'iranica-quiring-zoche-aq-qoyunlu',
            loc: { section: 'AQ QOYUNLŪ', para: '12' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/aq-qoyunlu-confederation'
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
            value: { d: '1469-01' },
            cites: [
              {
                source: 'iranica-quiring-zoche-aq-qoyunlu',
                loc: { section: 'AQ QOYUNLŪ', para: '12' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'Hastily advancing from Khorasan, he overran ʿErāq-e ʿAǰam but lacked adequate reinforcements and had to seek shelter in winter quarters in Qarabāḡ, where the Āq Qoyunlū besieged him. He was taken prisoner in an attempted breakout in Raǰab, 873/January, 1469, and put to death soon afterward.',
        lang: 'en',
        cite: {
          source: 'iranica-quiring-zoche-aq-qoyunlu',
          loc: { section: 'AQ QOYUNLŪ', para: '12' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-16',
          url: 'https://www.iranicaonline.org/articles/aq-qoyunlu-confederation'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1469-02-05' },
            cites: [
              {
                source: 'iranica-manz-gowhar-sad-aga',
                loc: { section: 'GOWHAR-ŠĀD ĀḠĀ', para: '6' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'On 22 Rajab 873/5 February 1469, Uzun Ḥasan Āq Qoyunlu handed over Sultan Abu Saʿid to Gowhar-šād’s great-grandson, Yādgār Moḥammad, who killed him',
        lang: 'en',
        cite: {
          source: 'iranica-manz-gowhar-sad-aga',
          loc: { section: 'GOWHAR-ŠĀD ĀḠĀ', para: '6' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-16',
          url: 'https://www.iranicaonline.org/articles/gowhar-sad-aga'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8c/Timurid_and_Qara_Qoyunlu_domains%2C_1458.png/1280px-Timurid_and_Qara_Qoyunlu_domains%2C_1458.png',
    page: 'https://commons.wikimedia.org/wiki/File:Timurid_and_Qara_Qoyunlu_domains,_1458.png',
    credit: { creator: 'Demis Map Server' },
    license: { id: 'cc-by-sa', version: '4.0', url: 'https://creativecommons.org/licenses/by-sa/4.0' }
  }
})

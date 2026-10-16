import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'jahan-shahs-conquests',
  names: [
    { text: 'Conquests of Jahan Shah', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-16',
  type: 'war',
  start: {
    alts: [
      {
        value: { d: '1447' },
        cites: [
          {
            source: 'iranica-quiring-zoche-aq-qoyunlu',
            loc: { section: 'AQ QOYUNLŪ', para: '10' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1458' },
        cites: [
          {
            source: 'iranica-herat-iii-history-medieval-period',
            loc: { section: 'HERAT iii. HISTORY, MEDIEVAL PERIOD', para: '19' }
          }
        ]
      }
    ]
  },
  regions: ['iran'],
  prominence: 3,
  places: [
    {
      ref: 'place:herat',
      cites: [
        {
          source: 'iranica-herat-iii-history-medieval-period',
          loc: { section: 'HERAT iii. HISTORY, MEDIEVAL PERIOD', para: '19' }
        }
      ]
    },
    {
      ref: 'place:tabriz',
      cites: [
        {
          source: 'iranica-bosworth-azarbaijan-iv',
          loc: { section: 'Azarbaijan iv. Islamic History to 1941', para: '20' }
        }
      ]
    }
  ],
  polities: [
    {
      ref: 'polity:qara-qoyunlu',
      cites: [
        {
          source: 'iranica-quiring-zoche-aq-qoyunlu',
          loc: { section: 'AQ QOYUNLŪ', para: '10' }
        }
      ]
    },
    {
      ref: 'polity:timurid-empire',
      cites: [
        {
          source: 'iranica-herat-iii-history-medieval-period',
          loc: { section: 'HERAT iii. HISTORY, MEDIEVAL PERIOD', para: '19' }
        }
      ]
    },
    {
      ref: 'polity:aq-qoyunlu',
      cites: [
        {
          source: 'iranica-quiring-zoche-aq-qoyunlu',
          loc: { section: 'AQ QOYUNLŪ', para: '10' }
        }
      ]
    }
  ],
  sides: [
    {
      key: 'qara-qoyunlu',
      name: 'Qara Qoyunlu',
      polity: 'polity:qara-qoyunlu',
      cites: [
        {
          source: 'iranica-quiring-zoche-aq-qoyunlu',
          loc: { section: 'AQ QOYUNLŪ', para: '10' }
        }
      ]
    },
    {
      key: 'timurids',
      name: 'Timurids',
      polity: 'polity:timurid-empire',
      cites: [
        {
          source: 'iranica-herat-iii-history-medieval-period',
          loc: { section: 'HERAT iii. HISTORY, MEDIEVAL PERIOD', para: '19' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:jahan-shah',
      role: 'leader',
      side: 'qara-qoyunlu',
      cites: [
        {
          source: 'iranica-quiring-zoche-aq-qoyunlu',
          loc: { section: 'AQ QOYUNLŪ', para: '10' }
        }
      ]
    },
    {
      ref: 'person:abu-said-mirza',
      role: 'leader',
      side: 'timurids',
      cites: [
        {
          source: 'iranica-herat-iii-history-medieval-period',
          loc: { section: 'HERAT iii. HISTORY, MEDIEVAL PERIOD', para: '19' }
        }
      ]
    }
  ],
  related: [
    { ref: 'event:qara-qoyunlu-take-tabriz', rel: 'preceded-by' },
    { ref: 'event:fall-of-jahan-shah', rel: 'followed-by' }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Succession disputes in Herat gave the Qara Qoyunlū chief, Jahānšāh b. Qara Yūsof, the chance to secede from the Timurid empire and proclaim himself sovereign.',
          lang: 'en',
          cite: {
            source: 'iranica-quiring-zoche-aq-qoyunlu',
            loc: { section: 'AQ QOYUNLŪ', para: '10' }
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
      kind: 'background',
      quotes: [
        {
          id: 'q2',
          text: 'The situation in eastern Anatolia became critical when Šāhroḵ, the Āq Qoyunlū’s protector and the Qara Qoyunlū’s nominal suzerain, died in 850/1447.',
          lang: 'en',
          cite: {
            source: 'iranica-quiring-zoche-aq-qoyunlu',
            loc: { section: 'AQ QOYUNLŪ', para: '10' }
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
            value: { d: '1452' },
            cites: [
              {
                source: 'iranica-quiring-zoche-aq-qoyunlu',
                loc: { section: 'AQ QOYUNLŪ', para: '10' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q3',
        text: 'Jahāngīr surrendered in the spring of 856/1452 and acknowledged Jahānšāh’s suzerainty.',
        lang: 'en',
        cite: {
          source: 'iranica-quiring-zoche-aq-qoyunlu',
          loc: { section: 'AQ QOYUNLŪ', para: '10' }
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
            value: { d: '1458' },
            cites: [
              {
                source: 'iranica-herat-iii-history-medieval-period',
                loc: { section: 'HERAT iii. HISTORY, MEDIEVAL PERIOD', para: '19' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q4',
        text: 'Herat suffered a brief occupation by the armies of Jahānšāh Qarā Qoyunlu, ruler of the western Persia and Azarbaijan',
        lang: 'en',
        cite: {
          source: 'iranica-herat-iii-history-medieval-period',
          loc: { section: 'HERAT iii. HISTORY, MEDIEVAL PERIOD', para: '19' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-16',
          url: 'https://www.iranicaonline.org/articles/herat-iii'
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
